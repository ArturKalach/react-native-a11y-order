# A11y Order — Custom focus order

`A11y.Order` and `A11y.Index` let you define an explicit focus sequence that is independent of the visual render order.

## The problem

Sometimes the layout your designer wants and the focus order your users need are different things. A common case: a grid where focus should sweep left-to-right top-to-bottom, but the flex layout renders columns first. Or a form where a summary row appears at the top visually but must be read last.

## Basic usage

Wrap elements in `A11y.Order` and give each one an `A11y.Index` with a numeric position. Lower numbers are focused first; ties are broken by render order.

```tsx
import { A11y } from 'react-native-a11y-order';

<A11y.Order>
  <A11y.Index index={1}>
    <Text>Focused first</Text>
  </A11y.Index>
  <A11y.Index index={3}>
    <Text>Focused third</Text>
  </A11y.Index>
  <A11y.Index index={2}>
    <Text>Focused second</Text>
  </A11y.Index>
</A11y.Order>
```

## Rules

- Every `A11y.Index` must be inside an `A11y.Order`. Using `A11y.Index` outside an order container throws a runtime error.
- `index` values do not need to be consecutive — gaps are fine.
- Fractional values work if you need to insert an element between two existing positions.

## Programmatic focus

The ref on `A11y.Index` exposes a `focus()` method that moves screen reader focus programmatically.

```tsx
import { A11y, type IndexCommands } from 'react-native-a11y-order';

const ref = React.useRef<IndexCommands>(null);

<A11y.Order>
  <A11y.Index ref={ref} index={1}>
    <Text>Target</Text>
  </A11y.Index>
</A11y.Order>

<Button title="Focus target" onPress={() => ref.current?.focus()} />
```

The ref also exposes all standard native view methods (`measure`, `measureInWindow`, etc.).

## Dynamic reordering

`A11y.Order` re-evaluates the sequence whenever `index` values change. You can reorder elements at runtime by updating state.

```tsx
const [reverse, setReverse] = React.useState(false);

<A11y.Order>
  <A11y.Index index={reverse ? 2 : 1}>
    <Text>Item A</Text>
  </A11y.Index>
  <A11y.Index index={reverse ? 1 : 2}>
    <Text>Item B</Text>
  </A11y.Index>
</A11y.Order>
```

## orderType

Controls which element within the `A11y.Index` subtree actually receives focus.

| Value | Behavior |
| :-- | :-- |
| `'default'` | The `A11y.Index` view itself is the focused element. Navigation moves through inner elements before advancing to the next index. |
| `'child'` | Searches the child tree for the first accessible element. Useful when the index wrapper has no visual presence. |
| `'subview'` | Targets the first direct child view of the `A11y.Index` wrapper without checking accessibility properties or traversing deeper. |

```tsx
<A11y.Index index={1} orderType="child">
  <View>
    <Text accessible accessibilityLabel="The actual element">Label</Text>
  </View>
</A11y.Index>
```

## A11y.Index props

| Prop | Type | Description |
| :-- | :-- | :-- |
| `index` | `number` | Position in the focus sequence. Lower = focused first. |
| `orderType` | `'default' \| 'child' \| 'subview'` | Which element receives focus. Defaults to `'default'`. |
| `autoFocus` | `boolean` | Moves screen reader focus to this element on mount. |
| `a11yUIContainer` | `'none' \| 'table' \| 'list' \| 'landmark' \| 'group'` | *(iOS only)* Sets `UIAccessibilityContainerType`. |
| `shouldGroupAccessibilityChildren` | `boolean` | *(iOS only)* When `true`, VoiceOver reads all descendants as one combined element. When `false`, forces individual navigation. |
| `onScreenReaderFocused` | `() => void` | Fires when this element receives screen reader focus. |
| `onScreenReaderSubViewFocused` | `() => void` | Fires when screen reader focus enters any descendant. |
| `onScreenReaderSubViewBlurred` | `() => void` | Fires when screen reader focus leaves any descendant. |
| `onScreenReaderSubViewFocusChange` | `(isFocused: boolean) => void` | Fires on any focus state change for a descendant. |
| `onScreenReaderDescendantFocusChanged` | `(e: ScreenReaderDescendantFocusChangedEvent) => void` | Fires when any descendant gains or loses screen reader focus. Payload includes `{ status: 'focused' \| 'blurred', nativeId?: string }`. |
| `ref` | `React.Ref<IndexCommands>` | Exposes `focus()` and all native view methods. |
| `...ViewProps` | — | All standard React Native View properties. |

## A11y.Order props

`A11y.Order` accepts all standard React Native `ViewProps`. No additional props.

## Related

- [Focus Events guide](./focus-events.md)
- [collapsable={false} guide](./collapsable.md)

---

← [collapsable={false}](./collapsable.md) | [A11y Card](./a11y-card.md) →
