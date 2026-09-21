# Migration Guide

## Migrating to 2.0 from 1.x

**There are no public API changes.** Every component, prop, type and function exported in `1.x`
behaves identically in `2.0`. The upgrade is entirely about platform requirements — if your app
already meets them, `yarn add react-native-a11y-order@2` and a rebuild is the whole migration.

### Old Architecture support removed

`2.0` is New Architecture only (Fabric + TurboModules). Removed in this release:

- the Android `oldarch` source set and the `newArchEnabled` / `IS_NEW_ARCHITECTURE_ENABLED` switches
- the iOS legacy `*ViewManager` classes and the bridge announce module
- the `NativeModules` fallback and `LINKING_ERROR` proxy in `ScreenReader` — the TurboModule is now
  imported directly

If your app runs on the Old Architecture, stay on `1.x`. It remains supported for bug fixes.

---

## Migrating to 1.0 from 0.9.x

### `orderType` value renames

The `orderType` prop values have been renamed for clarity. The behaviour is unchanged.

| 0.9.x | 1.0 |
| :-- | :-- |
| `'legacy'` | `'subview'` — first direct child view, no accessibility check |
| `'search'` | `'child'` — depth-first search for first accessible element |
| `'default'` | `'default'` (unchanged) |

### `A11y.Container` removed

`A11y.Container` no longer exists as a standalone component. Use the `a11yUIContainer` prop on `A11y.View` or `A11y.Index` instead.

```tsx
// Before (0.9.x)
import { A11yContainer } from 'react-native-a11y-order';
<A11yContainer type="list">
  {items}
</A11yContainer>

// After (1.0)
import { A11y } from 'react-native-a11y-order';
<A11y.View a11yUIContainer="list">
  {items}
</A11y.View>
```

The `type` values map directly — `list`, `table`, `landmark`, `group`, `none` are all unchanged. The `legacy` type value is removed.

### `A11y.Group` removed

`A11y.Group` was already marked as legacy in 0.9.x and is fully removed in 1.0. For horizontal scroll accessibility, wrap items in `<View collapsable={false}>` or use `A11y.View` / `A11y.Index` with `shouldGroupAccessibilityChildren`.

### `A11yModule` renamed to `ScreenReader`

The announcement API has been renamed and expanded. `A11yModule` no longer exists — use `ScreenReader` (or the standalone functions) instead. The new API returns a `Promise<AnnouncementResult>` and accepts options for priority, queueing, calm mode, delay, and iOS speech attributes.

```tsx
// Before (0.9.x)
import { A11yModule } from 'react-native-a11y-order';
A11yModule.announce('Saved');

// After (1.0)
import { ScreenReader } from 'react-native-a11y-order';
await ScreenReader.announce('Saved');

// Or import the functions directly
import { announce, cancel, cancelAll } from 'react-native-a11y-order';
await announce('Saved', { priority: 'high' });
```

`ScreenReader.announce` defaults to **calm mode** (navigation-aware, waits for transitions to settle). The standalone `announce()` defaults to **direct mode** (posts immediately). See [ScreenReader.announce](../api/ScreenReader.md) for the full options and cancellation API.

### `autoFocus` prop removed from `A11y.Index`

The `autoFocus` prop on `A11y.Index` has been removed. Use the imperative `focus()` command via ref instead — it gives explicit control over when and where screen reader focus moves.

```tsx
// Before (0.9.x)
<A11y.Index autoFocus />

// After (1.0)
import { useRef, useEffect } from 'react';
import type { IndexCommands } from 'react-native-a11y-order';

const ref = useRef<IndexCommands>(null);

useEffect(() => {
  ref.current?.focus();
}, []);

<A11y.Index ref={ref} />
```

### New props in 1.0

These props did not exist in 0.9.x and require no migration — add them only if you need the functionality.

| Component | New prop | Description |
| :-- | :-- | :-- |
| `A11y.Index` | `shouldGroupAccessibilityChildren` | iOS only. Controls VoiceOver grouping of descendants. |
| `A11y.View` | `shouldGroupAccessibilityChildren` | iOS only. Same as above. |
| `A11y.Index` | `a11yUIContainer` | iOS only. Sets `UIAccessibilityContainerType`. |
| `A11y.View` | `a11yUIContainer` | iOS only. Sets `UIAccessibilityContainerType`. |
| `A11y.Index` | `onScreenReaderDescendantFocusChanged` | Fires when any descendant gains or loses screen reader focus. |
| `A11y.View` | `onScreenReaderDescendantFocusChanged` | Same as above. |
| `A11y.PaneTitle` | `withFocusRestore` | Restores focus on unmount. Defaults to `true`. |

---

← [ScreenReader.announce](../api/ScreenReader.md)
