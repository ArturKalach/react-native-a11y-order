# Migration Guide

## Migrating to 1.0 from 0.9.x

Version 1.0 introduces a unified `A11y` namespace and renames several components. The underlying behavior is unchanged — this is a naming and export restructure only.

### Import changes

```tsx
// Before (0.9.x)
import {
  A11yOrder,
  A11yIndex,
  A11yView,
  A11yCard,
  A11yFocusTrap,
  A11yFocusFrame,
  A11yPaneTitle,
  A11yScreenChange,
} from 'react-native-a11y-order';

// After (1.0)
import { A11y } from 'react-native-a11y-order';
// A11y.Order, A11y.Index, A11y.View, A11y.Card,
// A11y.FocusTrap, A11y.FocusFrame, A11y.PaneTitle, A11y.ScreenChange
```

### Component name mapping

| 0.9.x | 1.0 |
| :-- | :-- |
| `<A11yOrder>` | `<A11y.Order>` |
| `<A11yIndex>` | `<A11y.Index>` |
| `<A11yView>` | `<A11y.View>` |
| `<A11yCard>` | `<A11y.Card>` |
| `<A11yFocusTrap>` | `<A11y.FocusTrap>` |
| `<A11yFocusFrame>` | `<A11y.FocusFrame>` |
| `<A11yPaneTitle>` | `<A11y.PaneTitle>` |
| `<A11yScreenChange>` | `<A11y.ScreenChange>` |

### Type name changes

| 0.9.x | 1.0 |
| :-- | :-- |
| `A11yIndexProps` | `A11yIndexProps` (unchanged) |
| `A11yViewProps` | `A11yViewProps` (unchanged) |
| `A11yCardProps` | `A11yCardProps` (unchanged) |
| `A11yFocusTrapProps` | `A11yFocusTrapProps` (unchanged) |
| `A11yPaneTitleProps` | `A11yPaneTitleProps` (unchanged) |

All `*Props` types are still re-exported from the package root.

### Module

`A11yModule` is unchanged:

```tsx
import { A11yModule } from 'react-native-a11y-order';
A11yModule.announce('message');
```

### New props in 1.0

These props did not exist in 0.9.x and require no migration — add them only if you need the functionality.

| Component | New prop | Description |
| :-- | :-- | :-- |
| `A11y.Index` | `shouldGroupAccessibilityChildren` | iOS only. Controls VoiceOver grouping of descendants. |
| `A11y.View` | `shouldGroupAccessibilityChildren` | iOS only. Same as above. |
| `A11y.Index` | `a11yUIContainer` | iOS only. Sets `UIAccessibilityContainerType`. |
| `A11y.View` | `a11yUIContainer` | iOS only. Sets `UIAccessibilityContainerType`. |
| `A11y.FocusTrap` | `lockDisabled` | Disables the focus trap without unmounting. |
| `A11y.PaneTitle` | `withFocusRestore` | Restores focus on unmount. Defaults to `true`. |
