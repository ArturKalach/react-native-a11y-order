# iOS Native Layer

Objective-C implementation of the accessibility order library. **New Architecture only** (Fabric/TurboModules); Old Architecture (Bridge/RCTView) support was removed in `2.0.0`.

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
│   └── RNAOFabricEventHelper/          # Typed event emission for Fabric
├── modules/
│   └── RNAOA11yAnnounceModule          # TurboModule for announcements
├── services/                           # Singletons and data structures
│   ├── RNAOA11yAnnounceService/        # VoiceOver-aware announcement queue
│   │   ├── RNAOA11yAnnounceService     # Entry point: announce/cancel/cancelAll + lock
│   │   ├── RNAOA11yAnnounceQueue       # FIFO NSString queue
│   │   └── RNAOA11yAnnounceHelper      # Posts UIAccessibilityAnnouncementNotification
│   ├── RNAOA11yFocusService/           # Global focus change tracker + subscriber registry
│   ├── RNAOA11yItemDelegate/           # Ordered item lifecycle (position, orderKey, focusType)
│   ├── RNAOA11yOrderLinking/           # Registry: orderKey → RNAOA11yRelationship
│   ├── RNAOA11yRelationship/           # Maps positions → accessibilityElements on a container
│   └── RNAOSortedMap/                  # Weak-ref sorted map (position → object)
└── views/
    ├── base/                           # Inheritance chain base classes
    │   ├── RNAOA11yViewGroup           # Base (RCTViewComponentView)
    │   ├── RNAOA11yScreenReaderView    # ↳ screen reader focus delegation
    │   ├── RNAOA11yGroupChildrenView   # ↳ shouldGroupAccessibilityChildren override (groupChildrenMode)
    │   ├── RNAOA11yManagedFocusView    # ↳ focus events, autoFocus prop, focus() command, FocusServiceSubscriber
    │   └── RNAOA11yViewOrder           # ↳ position/orderKey/focusType + RNAOA11yItemDelegate
    ├── RNAOA11yIndexView/              # A11y.Index — positioned item in an order
    ├── RNAOA11yOrderView/              # A11y.Order — registers as accessibility container
    ├── RNAOA11yCardView/               # A11y.Card — full-cover overlay for card + nested buttons pattern
    ├── RNAOA11yLockView/               # A11y.FocusTrap — traps VoiceOver focus
    └── RNAOA11yPaneTitleView/          # A11y.PaneTitle — pane announcement + focus restore
```

## View Inheritance Chain

```
RNAOA11yViewGroup             base (RCTViewComponentView)
  └─ RNAOA11yScreenReaderView     screen reader focus delegation (RNAOScreenReaderFocusDelegate)
       └─ RNAOA11yGroupChildrenView   shouldGroupAccessibilityChildren override (groupChildrenMode: -1/0/1)
            └─ RNAOA11yManagedFocusView  focus events, RNAOA11yFocusServiceSubscriber, descendantFocusChangedEnabled
                 └─ RNAOA11yViewOrder position/orderKey/focusType + RNAOA11yItemDelegate
                      └─ RNAOA11yIndexView  leaf — no extra logic
```

`RNAOA11yOrderView`, `RNAOA11yCardView`, `RNAOA11yLockView`, and `RNAOA11yPaneTitleView` extend `RCTViewComponentView` directly and are **not** part of the inheritance chain above.

## Core Protocols

| Protocol | Defined in | Purpose |
|---|---|---|
| `RNAOScreenReaderFocusDelegate` | delegates/ | Notifies component of VoiceOver focus gain/loss |
| `RNAOViewItemProtocol` | delegates/RNAOViewItemDelegate/ | Item lifecycle: `onFocusItemLinked:` / `onFocusItemRemoved:` callbacks |
| `RNAOA11yItemProtocol` | services/RNAOA11yItemDelegate/ | `getFocusView:` — returns actual focusable view for a subview |
| `RNAOA11yFocusServiceSubscriber` | services/RNAOA11yFocusService/ | Global focus change subscriber: `accessibilityElementDidBecomeFocused:` / `accessibilityElementDidUnfocused:` |
| `RNAOFocusChangeListenerDelegate` | helpers/RNAOFocusChangeListener/ | VoiceOver notification callback: `voiceOverFocusChanged:` |

## Singleton Services

### RNAOA11yOrderLinking
Registry mapping `orderKey` (NSString) → `RNAOA11yRelationship`. The main coordination point between `RNAOA11yOrderView` (container) and `RNAOA11yIndexView` (items). Exposes an optional debounce path (`setContainer:withView:withDebounce:`); the 2-arg `setContainer:withView:` routes through it with `debounced: NO`, which is the only path used today.

### RNAOA11yRelationship
Owns an `RNAOSortedMap` for one order group. When the map changes it calls `setAccessibilityElements:` on the registered container view. Holds a `debouncer` for batching updates.

### RNAOSortedMap
NSMapTable (strong→weak) + sorted NSNumber key array. Weak references mean removed views are automatically dropped. Binary search for O(log n) insertion point.

### RNAOA11yFocusService
Listens to `UIAccessibilityElementFocusedNotification` and fans out to a weak-hash-table of subscribers (`RNAOA11yFocusServiceSubscriber`). Views subscribe/unsubscribe on mount/unmount via `subscribe:` / `unsubscribe:`.

### RNAOA11yAnnounceService
VoiceOver-aware announcement queue with two announcement modes and a navigation lock.

**Calm mode** (`calm: true`, default): routes through the queue and `RNAODebouncer` (0.3s). Only fires when VoiceOver is active, the lock is off, and the queue is non-empty. Handles rapid-fire announcements gracefully.

**Direct mode** (`calm: false`): posts immediately via `UIAccessibilityPostNotification(UIAccessibilityAnnouncementNotification, …)` and tracks promise resolution via `UIAccessibilityAnnouncementDidFinishNotification`.

Lock mechanism: `temporarilyLockAnnounce` (default 1.0s) suppresses the queue during navigation transitions. Called at 1.0s on `viewWillDisappear`, 0.5s on `viewDidAppear`, and 0.1s on modal present/dismiss.

Sub-components:
- `RNAOA11yAnnounceQueue` — FIFO `NSArray<NSString*>` wrapper (`add:`, `clear`, `isEmpty`, `list`)
- `RNAOA11yAnnounceHelper` — static `announce:` / `announceWithList:` that calls `UIAccessibilityPostNotification`

## A11yCard Pattern (RNAOA11yCardView)

Places a full-cover invisible `accessibilityElement` overlay on top of the card view. VoiceOver focuses the overlay (fires `onAccessibilityTap` → `onPress`); sighted users tap through to the underlying `Pressable`. On iOS 15.0+, `focusGroupIdentifier` is used to keep the overlay and card content in separate focus groups, preventing VoiceOver from jumping between them unexpectedly. There is no Android counterpart — TalkBack does not need the overlay trick.

## Focus Type (`orderFocusType`) in RNAOA11yItemDelegate

| Value | Mode | What gets linked |
|---|---|---|
| 0 | Default | The `RNAOA11yIndexView` itself |
| 1 | Child | First accessible child subview |
| 2 | Legacy | First accessible child (older traversal logic) |

## A11yIndex Props

Props handled by `RNAOA11yIndexView`'s `updateProps:oldProps:`:

| Prop | Type | Purpose |
|---|---|---|
| `orderIndex` | number | Position in the order group |
| `orderKey` | string | Order group ID (must match parent A11y.Order) |
| `orderFocusType` | 0/1/2 | Which view gets linked (see table above) |
| `shouldGroupAccessibilityChildren` | bool | Groups children into a single VoiceOver element |
| `descendantFocusChangedEnabled` | bool | Enables `onScreenReaderDescendantFocusChanged` events |
| `containerType` | int | Maps to `UIAccessibilityContainerType` (semantics for the accessibility container) |

## Swizzling Strategy

Swizzles are installed via `RNAOSwizzleInstall.h` macros that choose between `+load` (static linking) and `__attribute__((constructor))` (dynamic frameworks) based on `RCT_DYNAMIC_FRAMEWORKS`.

Three UIKit classes are swizzled:
- **UIView** — `accessibilityElementDidBecomeFocused` / `DidLoseFocus` → delegates to `RNAOScreenReaderFocusDelegate` via associated object
- **UIViewController** — `viewWillDisappear` saves focused element + locks announcements 1.0s; `viewDidAppear` restores focus via `UIAccessibilityLayoutChangedNotification` + locks 0.5s
- **RCTModalHostViewComponentView** — present/dismiss locks announcements 0.1s

## Fabric Integration

All views extend `RCTViewComponentView` and use Fabric component descriptors,
`updateProps:oldProps:`, `SharedViewEventEmitter` and `prepareForRecycle`. Components are
registered through `codegenConfig.ios.componentProvider` in `package.json`; there are no
`RCTViewManager` subclasses. The `focus` command arrives via `handleCommand:args:` on
`RNAOA11yScreenReaderView`.

`RNAOFabricEventHelper` emits four typed Fabric events: `onIndexViewFocusChange`, `onA11yViewFocusChange`, `onA11yViewFocused`, `onA11yViewScreenReaderDescendantFocusChanged`.

`RNAOPropsHelper` is used in `updateProps:oldProps:` to detect changed props from C++ structs (`isPropChanged:stringValue:`, `isPropChanged:intValue:`, `unwrapStringValue:`, `unwrapIntValue:`).

## Announcement Flow

```
React JS
  → RNAOA11yAnnounceModule (TurboModule)
  → calm=true:  RNAOA11yAnnounceService → RNAOA11yAnnounceQueue → RNAODebouncer (0.3s)
                → RNAOFocusChangeListener (VoiceOver must be active, lock off)
                → RNAOA11yAnnounceHelper → UIAccessibilityPostNotification(AnnouncementNotification)
  → calm=false: UIAccessibilityPostNotification directly
                → UIAccessibilityAnnouncementDidFinishNotification → resolve promise

cancel/cancelAll: clears queue + pending debouncer, resolves pending promises
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
  → UIAccessibilityFocusedElement() saved to rnaoFocusRestore
  → RNAOA11yAnnounceService.temporarilyLockAnnounce (1.0s)

viewDidAppear (UIViewController swizzle)
  → UIAccessibilityPostNotification(LayoutChanged, savedElement)
  → RNAOA11yAnnounceService.temporarilyLockAnnounce (0.5s)
```

`RNAOA11yPaneTitleView` also triggers focus restore independently when `withFocusRestore=true` is set — it announces the title on `didMoveToWindow` and restores focus on the next `viewDidAppear` cycle.
