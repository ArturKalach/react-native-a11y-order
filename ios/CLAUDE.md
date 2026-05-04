# iOS Native Layer

Objective-C implementation of the accessibility order library. Supports both New Architecture (Fabric/TurboModules) and Old Architecture (Bridge/RCTView).

## Directory Structure

```
ios/
├── delegates/                          # Protocols and focus-delegate implementations
│   ├── RNAOScreenReaderFocusDelegate.h # Protocol: onScreenReaderFocusChanged:(BOOL)
│   └── RNAOViewItemDelegate/           # Focus handler for basic views (no ordering)
├── extensions/                         # Swizzled UIKit classes
│   ├── UIView+RNAOA11yOrder            # Hooks accessibilityElementDidBecomeFocused/DidLoseFocus
│   ├── UIViewController+RNAOA11yOrder  # Hooks viewDidAppear/viewWillDisappear (focus restore)
│   └── RCTModalHostViewComponentView+RNAOA11yOrder  # Hooks present/dismiss (announcement lock)
├── helpers/                            # Utilities
│   ├── RNAODebouncer                   # Cancellable dispatch_after wrapper
│   ├── RNAOFocusChangeListener         # UIAccessibilityElementFocusedNotification observer
│   ├── RNAOPropsHelper                 # Fabric C++ ↔ ObjC prop comparison/unwrapping
│   ├── RNAOSwizzleInstanceMethod       # Safe method_exchangeImplementations wrapper
│   ├── RNAOSwizzleInstall.h            # Macros for +load vs __attribute__((constructor))
│   └── RNAOFabricEventHelper/          # Typed event emission for Fabric (RCT_NEW_ARCH only)
├── modules/
│   └── RNAOA11yAnnounceModule          # RCT_EXPORT_MODULE bridge for announcements
├── services/                           # Singletons and data structures
│   ├── RNAOA11yAnnounceService/        # VoiceOver-aware announcement queue
│   ├── RNAOA11yFocusService/           # Global focus change tracker + subscriber registry
│   ├── RNAOA11yItemDelegate/           # Ordered item lifecycle (position, orderKey, focusType)
│   ├── RNAOA11yOrderLinking/           # Registry: orderKey → RNAOA11yRelationship
│   ├── RNAOA11yRelationship/           # Maps positions → accessibilityElements on a container
│   └── RNAOSortedMap/                  # Weak-ref sorted map (position → object)
└── views/                              # Native view components
    ├── RNAOA11yView/                   # A11y.View — focus tracking, autoFocus, descendant events
    ├── RNAOA11yOrderView/              # A11y.Order — registers as accessibility container
    ├── RNAOA11yIndexView/              # A11y.Index — positioned item in an order
    ├── RNAOA11yGroupView/              # A11y.Group — shouldGroupAccessibilityChildren = YES
    ├── RNAOA11yLockView/               # A11y.FocusTrap — traps VoiceOver focus
    ├── RNAOA11yUIContainerView/        # A11y.Container — UIAccessibilityContainerType wrapper
    └── RNAOA11yPaneTitleView/          # A11y.PaneTitle — pane announcement + focus restore
```

## Core Protocols

| Protocol | Defined in | Purpose |
|---|---|---|
| `RNAOScreenReaderFocusDelegate` | delegates/ | Notifies component of VoiceOver focus gain/loss |
| `RNAOViewItemProtocol` | delegates/RNAOViewItemDelegate/ | Item lifecycle: linked/removed callbacks |
| `RNAOA11yItemProtocol` | services/RNAOA11yItemDelegate/ | `getFocusView:` — returns actual focusable view |
| `RNAOA11yFocusServiceSubscriber` | services/RNAOA11yFocusService/ | Global focus change subscriber |
| `RNAOFocusChangeListenerDelegate` | helpers/RNAOFocusChangeListener/ | VoiceOver notification callback |

## Singleton Services

### RNAOA11yOrderLinking
Registry mapping `orderKey` (NSString) → `RNAOA11yRelationship`. The main coordination point between `RNAOA11yOrderView` (container) and `RNAOA11yIndexView` (items). All items register/update/remove themselves here.

### RNAOA11yRelationship
Owns an `RNAOSortedMap` for one order group. When the map changes it calls `setAccessibilityElements:` on the registered container view. Supports debounced updates to avoid excessive accessibility tree rebuilds.

### RNAOSortedMap
NSMapTable (strong→weak) + sorted NSNumber key array. Weak references mean removed views are automatically dropped. Binary search for O(log n) insertion point.

### RNAOA11yFocusService
Listens to `UIAccessibilityElementFocusedNotification` and fans out to a weak-hash-table of subscribers. Views subscribe/unsubscribe on mount/unmount.

### RNAOA11yAnnounceService
VoiceOver-aware announcement queue. Only fires when: VoiceOver is active + lock is off + queue non-empty. Uses a 0.3s debounce to batch announcements and a 1s lock during navigation transitions.

## Focus Type (`orderFocusType`) in RNAOA11yItemDelegate

| Value | Mode | What gets linked |
|---|---|---|
| 0 | Default | The `RNAOA11yIndexView` itself |
| 1 | Child | First accessible child subview |
| 2 | Legacy | First accessible child (older traversal logic) |

## Swizzling Strategy

Swizzles are installed via `RNAOSwizzleInstall.h` macros that choose between `+load` (static linking) and `__attribute__((constructor))` (dynamic frameworks) based on `RCT_DYNAMIC_FRAMEWORKS`.

Three UIKit classes are swizzled:
- **UIView** — `accessibilityElementDidBecomeFocused` / `DidLoseFocus` → delegates to `RNAOScreenReaderFocusDelegate` via associated object
- **UIViewController** — `viewWillDisappear` saves focused element + locks announcements 1s; `viewDidAppear` restores focus + locks 0.5s
- **RCTModalHostViewComponentView** — present/dismiss locks announcements 0.1s

## Dual Architecture

Files conditionally compile with `#ifdef RCT_NEW_ARCH_ENABLED`:
- **New arch:** Fabric component descriptors, `updateProps`, `SharedViewEventEmitter`, TurboModule spec
- **Old arch:** `RCTView`/`RCTViewManager`, `RCT_EXPORT_VIEW_PROPERTY`, direct block callbacks

`RNAOFabricEventHelper` is entirely new-arch only and emits typed Fabric events.
`RNAOPropsHelper` is used in `updateProps` to detect changed props from C++ structs.

## Announcement Flow

```
React JS
  → RNAOA11yAnnounceModule (RCT_EXPORT_METHOD)
  → RNAOA11yAnnounceService.announce:
  → RNAOA11yAnnounceQueue (batch)
  → RNAODebouncer (0.3s)
  → RNAOFocusChangeListener (VoiceOver must be active)
  → RNAOA11yAnnounceHelper
  → UIAccessibilityPostNotification(UIAccessibilityAnnouncementNotification, …)
```

## Accessibility Order Flow

```
RNAOA11yOrderView sets orderKey
  → registers itself as container via RNAOA11yOrderLinking

RNAOA11yIndexView sets position + orderKey
  → RNAOA11yItemDelegate.finalizeUpdates
  → RNAOA11yOrderLinking.add:withOrderKey:withObject:
  → RNAOA11yRelationship updates RNAOSortedMap
  → container.accessibilityElements = sortedValues
```

## Focus Restore Flow

```
viewWillDisappear (UIViewController swizzle)
  → UIAccessibilityFocusedElement() saved
  → RNAOA11yAnnounceService.temporarilyLockAnnounce (1s)

viewDidAppear (UIViewController swizzle)
  → UIAccessibilityPostNotification(LayoutChanged, savedElement)
  → RNAOA11yAnnounceService.temporarilyLockAnnounce (0.5s)
```
