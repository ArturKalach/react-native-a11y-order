# A11y.Index

Positioned slot within an `A11y.Order` focus sequence. Must always be a descendant of `A11y.Order`.

## Import

```tsx
import { A11y } from 'react-native-a11y-order';
// <A11y.Index />

import { type IndexCommands, type A11yIndexProps } from 'react-native-a11y-order';
```

## Props

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `index` | `number` | — | Position in the focus sequence. Lower numbers are focused first; ties resolved by render order. |
| `orderType` | `'default' \| 'child' \| 'subview'` | `'default'` | Controls which element receives screen reader focus. |
| `autoFocus` | `boolean` | `false` | Moves screen reader focus to this element on mount. |
| `a11yUIContainer` | `'none' \| 'table' \| 'list' \| 'landmark' \| 'group'` | — | *(iOS only)* Sets `UIAccessibilityContainerType`. |
| `shouldGroupAccessibilityChildren` | `boolean` | — | *(iOS only)* When `true`, VoiceOver reads all descendants as one combined element. When `false`, forces individual navigation. Omit to use system default. |
| `onScreenReaderFocused` | `() => void` | — | Fires when this element receives screen reader focus. |
| `onScreenReaderSubViewFocused` | `() => void` | — | Fires when screen reader focus enters any descendant. |
| `onScreenReaderSubViewBlurred` | `() => void` | — | Fires when screen reader focus leaves any descendant. |
| `onScreenReaderSubViewFocusChange` | `(isFocused: boolean) => void` | — | Fires on any descendant focus state change. |
| `onScreenReaderDescendantFocusChanged` | `(e: ScreenReaderDescendantFocusChangedEvent) => void` | — | Fires when any descendant gains or loses focus. Payload: `{ status: 'focused' \| 'blurred', nativeId?: string }`. |
| `ref` | `React.Ref<IndexCommands>` | — | Exposes `focus()` and all native view methods. |
| `...ViewProps` | — | — | All standard React Native View properties. |

## orderType values

| Value | Behavior |
| :-- | :-- |
| `'default'` | The `A11y.Index` container itself is the ordered element. |
| `'child'` | Uses the first accessible child in the subtree. |
| `'subview'` | Uses the first accessible subview via legacy traversal. |

## IndexCommands ref

```tsx
import { type IndexCommands } from 'react-native-a11y-order';

const ref = React.useRef<IndexCommands>(null);

// Move screen reader focus programmatically
ref.current?.focus();

// Standard native view methods are also available
ref.current?.measure((x, y, width, height) => {});
```

## Guides

- [A11y Order guide](../guides/a11y-order.md)
- [Focus Events guide](../guides/focus-events.md)
- [autoFocus](../leftovers/autofocus.md)
