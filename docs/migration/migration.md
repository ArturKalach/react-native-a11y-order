# Migration Guide

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

`A11y.Group` was already marked as legacy in 0.9.x and is fully removed in 1.0. For horizontal scroll accessibility, wrap items in `<View collapsable={false}>` or use `A11y.View` with `a11yUIContainer="group"`.

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

← [A11yModule.announce](../leftovers/announce.md)
