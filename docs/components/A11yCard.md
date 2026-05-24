# A11y.Card

Card component that exposes both a card-level action and nested interactive elements to the screen reader simultaneously.

## Import

```tsx
import { A11y } from 'react-native-a11y-order';
// <A11y.Card />

import { type A11yCardProps } from 'react-native-a11y-order';
```

## Props

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `onPress` | `() => void` | — | Called when the card is pressed or activated by the screen reader. |
| `onLongPress` | `() => void` | — | Called on long-press for sighted users. VoiceOver does not fire long-press — use `accessibilityActions` instead. |
| `accessibility` | `ViewProps` | — | All screen-reader-facing props applied to the overlay (iOS) or Pressable (Android). |
| `disabled` | `boolean` | `false` | Disables the card. Automatically merged into `accessibility.accessibilityState.disabled`. |
| `style` | `StyleProp<ViewStyle>` | — | Visual style for the inner `Pressable`. |
| `containerProps` | `ViewProps` | — | Layout props for the outer container (margins, flex, positioning). |
| `pressableProps` | `PressableProps` | — | Escape hatch for `Pressable`-specific props (`hitSlop`, `android_ripple`, …). |
| `testID` | `string` | — | Test identifier forwarded to the inner `Pressable`. |
| `children` | `React.ReactNode` | — | Card content. Interactive children remain fully accessible. |

## Guide

- [A11y.Card guide](../guides/a11y-card.md)
