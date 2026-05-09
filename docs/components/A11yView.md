# A11y.View

Standalone focus-tracking view with no ordering context. Use when you need screen reader focus events or iOS container semantics but do not need to control position in a focus sequence.

## Import

```tsx
import { A11y } from 'react-native-a11y-order';
// <A11y.View />

import { type A11yViewProps } from 'react-native-a11y-order';
```

## When to use A11y.View vs A11y.Index

| Use case | Component |
| :-- | :-- |
| Element must appear at a specific position in a focus sequence | `A11y.Index` inside `A11y.Order` |
| Only need to observe focus events | `A11y.View` |
| Only need iOS container semantics (`a11yUIContainer`) | `A11y.View` |
| autoFocus without ordering | `A11y.View` |

## Props

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `autoFocus` | `boolean` | `false` | Moves screen reader focus to this element on mount. |
| `a11yUIContainer` | `'none' \| 'table' \| 'list' \| 'landmark' \| 'group'` | — | *(iOS only)* Sets `UIAccessibilityContainerType`. |
| `shouldGroupAccessibilityChildren` | `boolean` | — | *(iOS only)* When `true`, VoiceOver reads all descendants as one combined element. When `false`, forces individual navigation. Omit to use system default. |
| `onScreenReaderFocused` | `() => void` | — | Fires when this element receives screen reader focus. |
| `onScreenReaderSubViewFocused` | `() => void` | — | Fires when screen reader focus enters any descendant. |
| `onScreenReaderSubViewBlurred` | `() => void` | — | Fires when screen reader focus leaves any descendant. |
| `onScreenReaderSubViewFocusChange` | `(isFocused: boolean) => void` | — | Fires on any descendant focus state change. |
| `onScreenReaderDescendantFocusChanged` | `(e: ScreenReaderDescendantFocusChangedEvent) => void` | — | Fires when any descendant gains or loses focus. |
| `...ViewProps` | — | — | All standard React Native View properties. |

## Examples

### Focus events

```tsx
<A11y.View
  onScreenReaderFocused={() => console.log('focused')}
  onScreenReaderSubViewFocused={() => console.log('child focused')}
  onScreenReaderSubViewBlurred={() => console.log('child blurred')}
>
  <View accessible accessibilityLabel="Content">
    <Text>Some content</Text>
  </View>
</A11y.View>
```

### iOS list container

```tsx
<A11y.View a11yUIContainer="list" accessibilityLabel="Menu. 4 items.">
  {['Espresso', 'Cappuccino', 'Latte', 'Americano'].map((item) => (
    <View key={item} accessible accessibilityLabel={item}>
      <Text>{item}</Text>
    </View>
  ))}
</A11y.View>
```

VoiceOver announces: "Menu. 4 items. list"

### autoFocus

```tsx
{showMessage && (
  <A11y.View autoFocus>
    <Text>Success message</Text>
  </A11y.View>
)}
```

## Guides

- [Focus Events guide](../guides/focus-events.md)
- [A11y UI Container guide](../guides/a11y-ui-container.md)
- [autoFocus](../leftovers/autofocus.md)
