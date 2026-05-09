# A11y.FocusTrap + A11y.FocusFrame

Confine screen reader focus to a subtree.

## Import

```tsx
import { A11y } from 'react-native-a11y-order';
// <A11y.FocusTrap /> <A11y.FocusFrame />

import { type A11yFocusTrapProps, type A11yFocusFrameProps } from 'react-native-a11y-order';
```

## A11y.FocusTrap props

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `lockDisabled` | `boolean` | `false` | When `true`, the focus trap is inactive. |
| `forceLock` | `boolean` | `false` | *(iOS only)* Actively redirects VoiceOver back into the trap when focus escapes. |
| `...ViewProps` | — | — | All standard React Native View properties. |

## A11y.FocusFrame props

Accepts all standard React Native `ViewProps`. No additional props.

## Guide

- [Focus Lock guide](../guides/focus-lock.md)
