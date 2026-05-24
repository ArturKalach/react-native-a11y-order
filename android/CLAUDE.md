# Android Native Layer

Java implementation of the accessibility order library. Supports both New Architecture (Fabric/TurboModules) and Old Architecture (Bridge).

## Directory Structure

```
android/src/
├── main/java/com/a11yorder/
│   ├── A11yOrderPackage.java               # TurboReactPackage — registers 5 view managers (Index, Order, PaneTitle, Lock, Card) + AnnounceModule
│   ├── core/                               # Inheritance chain (bottom → top):
│   │   ├── A11yViewGroup.java              #   Base — weak-ref first-child tracking (onChildAttached/onChildRemoved)
│   │   ├── A11yScreenReaderView.java       #   ↳ screen reader events (focused/focusChanged/descendantFocusChanged)
│   │   ├── A11yManagedFocusView.java       #   ↳ autoFocus prop, focus() command, A11yFocusProtocol
│   │   └── A11yViewOrder.java              #   ↳ A11yOrderService wiring (index/key/focusType, child linking)
│   ├── events/
│   │   ├── EventHelper.java                # Dispatch utilities for all custom events
│   │   ├── ScreenReaderFocusChangedEvent   # isFocused boolean event payload
│   │   ├── ScreenReaderFocusedEvent        # View focused (no payload)
│   │   └── ScreenReaderDescendantFocusChangedEvent  # status + nativeId payload
│   ├── modules/
│   │   └── A11yAnnounceModule.java         # TurboModule for screen reader announcements (announce/cancel/cancelAll)
│   ├── services/
│   │   ├── focus/
│   │   │   ├── A11yFocusDelegate.java      # Coordinates focus with fragment lifecycle
│   │   │   ├── A11yFocusProtocol.java      # Interface: isViewFocused()
│   │   │   └── A11yFocusService.java       # Singleton focus manager with retry logic + view ref storage
│   │   └── order/
│   │       ├── A11yOrderService.java       # Per-IndexView: position/key/focusType management
│   │       └── linking/
│   │           ├── A11yOrderLinking.java   # Singleton: orderKey → A11yLinkingQueue registry
│   │           ├── A11yLinkingQueue.java   # Per-group: sorted view chain via TalkBack APIs
│   │           └── WeakTreeMap.java        # Sorted weak-ref map (position → View)
│   ├── utils/
│   │   ├── A11yHelper.java                 # Static: a11y checks, DFS find, focus/keyboard helpers
│   │   ├── ChoreographerUtils.java         # Frame-based task scheduling (2-frame delay)
│   │   └── FragmentUtils.java             # Fragment lifecycle observer utilities
│   └── views/
│       ├── A11yCardView/                   # A11y.Card — card with accessible inner elements (TalkBack-compatible)
│       ├── A11yIndexView/                  # A11y.Index — positioned item in an order
│       ├── A11yOrderView/                  # A11y.Order — registers as order group container (extends ReactViewGroup directly)
│       ├── A11yLockView/                   # A11y.FocusTrap — traps TalkBack focus (modal pattern); includes A11yLockService
│       └── A11yPaneTitle/                  # A11y.PaneTitle — pane/screen transition announcements
├── newarch/                                # Fabric/TurboModule spec wrappers (Codegen): 6 files
└── oldarch/                                # Bridge spec wrappers: 6 files
```

## Core Protocols / Interfaces

| Interface | Defined in | Purpose |
|---|---|---|
| `A11yFocusProtocol` | services/focus/ | Contract for focusable views: `isViewFocused()`, extends `ViewParent`/`ViewManager` |

## Singleton Services

### A11yOrderLinking
Global registry mapping `orderKey` (String) → `A11yLinkingQueue`. The main coordination point between `A11yOrderView` (container) and `A11yIndexView` (items). Synchronized singleton; queues are auto-pruned when empty.

### A11yLinkingQueue
Owns a `WeakTreeMap` for one order group. When the map changes it links views via:
- `View.setNextFocusForwardId()` — keyboard navigation order
- `View.setAccessibilityTraversalBefore()` (API 22+) — TalkBack traversal order

### WeakTreeMap
`TreeMap<Integer, WeakReference<View>>`. Sorted by position. Dead references are auto-purged on `remove()`. Provides `getNext()` / `getPrev()` that skip GC'd entries, `forEachLive()` for iteration over live entries. Binary search via `NavigableMap`.

### A11yFocusService
Manages focus requests with retry logic. Uses `View.postDelayed()` for 300ms retries (max 3). Uses a `volatile boolean lock` to cancel pending retries once focus is acquired. Delegates actual focus posting to `ChoreographerUtils` to ensure layout stability. Also stores a weak reference to the last focused view via `storeViewReference()` / `getStoredView()`.

### A11yLockService
Stores weak references to the modal trap view and keyboard-focusable view. Used by `A11yLockView` to redirect out-of-bounds focus attempts.

## Focus Type (`orderFocusType`) in A11yOrderService

| Value | Constant | What gets linked |
|---|---|---|
| 0 | `ORDER_FOCUS_TYPE_DEFAULT` | The `A11yIndexView` itself |
| 1 | `ORDER_FOCUS_TYPE_CHILD` | First accessible descendant (DFS) |
| 2 | `ORDER_FOCUS_TYPE_LEGACY` | Stored child view or first subview |

## Dual Architecture

Source sets are merged at build time via Gradle. `newarch/` and `oldarch/` provide alternative `*Spec` base classes:

- **New arch:** Spec classes extend Codegen-generated `Native*Spec` interfaces (Fabric/TurboModule)
- **Old arch:** Spec classes extend `ReactContextBaseJavaModule` / `SimpleViewManager` directly

Concrete implementations in `main/` are architecture-agnostic — they extend whichever spec is active.

Both source sets have 6 spec files each: `A11yAnnounceModuleSpec`, `A11yCardViewManagerSpec`, `A11yIndexViewManagerSpec`, `A11yLockViewManagerSpec`, `A11yOrderViewManagerSpec`, `A11yPaneTitleSpec`.

## Event System

All events are dispatched via `EventHelper` which fetches `EventDispatcher` from `UIManagerHelper`.

| Event class | JS event name | Payload | Fired from |
|---|---|---|---|
| `ScreenReaderFocusChangedEvent` | `topScreenReaderFocusChange` | `{isFocused: boolean}` | `A11yIndexView` (via `A11yScreenReaderView`) |
| `ScreenReaderFocusedEvent` | `topScreenReaderFocused` | none | `A11yIndexView` (via `A11yScreenReaderView`) |
| `ScreenReaderDescendantFocusChangedEvent` | `topScreenReaderDescendantFocusChanged` | `{status: "focused"\|"blurred", nativeId: String}` | `A11yIndexView` (via `A11yScreenReaderView`) |

Events are triggered by overriding `onRequestSendAccessibilityEvent(child, event)` and filtering `TYPE_VIEW_ACCESSIBILITY_FOCUSED` / `TYPE_VIEW_ACCESSIBILITY_FOCUS_CLEARED`. Descendant events can be enabled/disabled per-view via `setDescendantFocusChangedEnabled`.

## Focus Trap Pattern (A11yLockView)

Two component types work together:
- `componentType=0` — Modal container: intercepts `focusSearch()` to return trapped view if focus would escape; stores itself in `A11yLockService`
- `componentType=1` — Trapped content: redirects focus back to the modal's stored view

`onRequestSendAccessibilityEvent` blocks `TYPE_VIEW_ACCESSIBILITY_FOCUSED` for non-target views when locked. The `setForceLock` prop allows bypassing the `lockDisabled` flag for edge cases where the lock must remain active regardless.

## A11yCard Pattern (A11yCardView)

`A11yCardView` is a thin `ReactViewGroup`-based manager that registers a view for the "card with interactive children" pattern on Android. Unlike iOS (which needs a native overlay), TalkBack does not block child focus, so the Android implementation is a simple pass-through — the `accessible` prop and a11y attributes are carried directly by the underlying `Pressable`. The `A11yCardViewManager` has no extra prop setters beyond the default view group behaviour.

## Accessibility Order Flow

```
A11yOrderView sets orderKey
  → stores key (children read it via context)

A11yIndexView receives orderKey + orderIndex props
  → A11yOrderService.register()
  → A11yOrderLinking.addViewRelationship(view, key, position)
  → A11yLinkingQueue updates WeakTreeMap
  → links prev.setAccessibilityTraversalBefore(view) + view.setAccessibilityTraversalBefore(next)
```

## View Inheritance Chain

```
A11yViewGroup                 weak-ref first-child tracking
  └─ A11yScreenReaderView     screen reader events (focused / focusChanged / descendantFocusChanged)
       └─ A11yManagedFocusView   autoFocus prop + focus() + A11yFocusProtocol
            └─ A11yViewOrder  A11yOrderService wiring (index / key / focusType)
                 └─ A11yIndexView  leaf — no extra logic
```

`A11yOrderView`, `A11yLockView`, `A11yCardView`, and `A11yPaneTitle` extend `ReactViewGroup` directly and are **not** part of the core inheritance chain above.

## Auto-Focus Flow (A11yManagedFocusView — applies to A11yIndexView)

```
onAttachedToWindow() with autoFocus=true
  → A11yFocusDelegate.requestFocus()
  → checks isA11yServiceEnabled()
  → finds fragment via FragmentUtils
  → if resumed: A11yFocusService.simpleFocus()
  → else: FragmentUtils.waitForFragmentResume → simpleFocus()
  → A11yFocusService retry loop (300ms × 3)
  → ChoreographerUtils.run() posts after 2 frames
  → view.sendAccessibilityEvent(TYPE_VIEW_ACCESSIBILITY_FOCUSED)
```

## Pane/Screen Transition Flow (A11yPaneTitle)

```
onAttachedToWindow()
  → type=ACTIVITY_TYPE (0): sets Activity window title
  → type=PANE_TYPE (1): setAccessibilityPaneTitle() (API 28+) or announceForAccessibility()

onDetachedFromWindow()
  → announces detachMessage if set
```

`setWithFocusRestore` prop: if enabled, the manager saves and restores TalkBack focus around the transition announcement.

## Announcement Module (A11yAnnounceModule)

Methods: `announce(text, options)`, `cancel(id)`, `cancelAll()`. A "calm" strategy (`cancelPendingCalm`) debounces rapid announcements using a 300ms delay (`CALM_DELAY_MS`) to avoid TalkBack queue flooding. The module name constant is `"A11yAnnounceModule"`.

## Utilities

- **A11yHelper**: `findFirstAccessible(viewGroup)` — DFS skipping non-important views. `findFirstFocusable()` — DFS for first keyboard-focusable descendant. `focus(view)` — posts accessibility event via Choreographer (avoids double-focus race). `isA11yServiceEnabled()` — checks both enabled and touch-exploration-enabled. `isAccessible(view)` / `isFocused(view)` / `isKeyboardFocusable(view)` — predicate helpers.
- **ChoreographerUtils**: `run(task)` / `runAfterFrames(n, task)` schedules after 2 `Choreographer` frames to ensure layout is stable before focus is attempted.
- **FragmentUtils**: `waitForFragmentResume(fragment, cb)` attaches a one-shot `LifecycleObserver` that fires `cb` on `ON_RESUME` and immediately removes itself. `findFragmentSafely()` wraps fragment lookup with null-safety.
