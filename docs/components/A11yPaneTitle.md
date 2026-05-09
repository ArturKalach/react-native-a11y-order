# A11y.PaneTitle + A11y.ScreenChange

Announce screen or panel transitions to VoiceOver and TalkBack.

## Import

```tsx
import { A11y } from 'react-native-a11y-order';
// <A11y.PaneTitle /> <A11y.ScreenChange />

import { type A11yPaneTitleProps, type A11yScreenChangeProps } from 'react-native-a11y-order';
```

## A11y.PaneTitle props

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `title` | `string` | — | Announcement text when this component mounts. |
| `detachMessage` | `string` | — | Announcement when this component unmounts (e.g. `"Drawer closed"`). |
| `type` | `'activity' \| 'pane' \| 'announce'` | `'pane'` | Native announcement mechanism. |
| `withFocusRestore` | `boolean` | `true` | When `true`, restores screen reader focus to the previously focused element on unmount. |
| `displayed` | `boolean` | `true` | When `false`, renders nothing and posts no announcement. |

## type values

| Value | Behavior |
| :-- | :-- |
| `'pane'` | Layout-changed notification with title. Use for panels, sheets, and secondary screens. |
| `'activity'` | Full-screen transition notification. Use for top-level navigation. |
| `'announce'` | Plain announcement only — no focus shift. |

## A11y.ScreenChange

Shorthand for `<A11y.PaneTitle type="activity" />`. The `type` prop is omitted — it is always `'activity'`.

Accepts all `A11y.PaneTitle` props except `type`.

## Usage with React Navigation

```tsx
import { useIsFocused } from '@react-navigation/native';
import { A11y } from 'react-native-a11y-order';

const MyScreen = () => {
  const isFocused = useIsFocused();
  return (
    <View>
      <A11y.ScreenChange title="My Screen" displayed={isFocused} />
      {/* screen content */}
    </View>
  );
};
```

`displayed={isFocused}` ensures the announcement fires on screen enter and the `detachMessage` fires on screen leave.

## Guide

- [Focus Lock guide](../guides/focus-lock.md)
- [Announce guide](../leftovers/announce.md)
