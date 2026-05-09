# collapsable={false} — the quick fix

Before adding the library to your project, try this first.

## The problem

React Native optimises the native view tree by collapsing views that have no visual effect (no background, no border, no transforms). This is great for performance but can cause the screen reader focus order to differ from what you see on screen — elements appear in the wrong order, or some are skipped entirely.

## The fix

```tsx
<View collapsable={false}>
  <Text>First</Text>
  <Text>Second</Text>
  <Text>Third</Text>
</View>
```

`collapsable={false}` tells React Native not to remove this view during the native tree optimisation pass. The view's children keep their render order in the accessibility tree.

## When this is enough

- Horizontal or vertical lists where elements appear out of order
- Sibling elements that get reordered by the optimiser
- Flex layouts where the visual and DOM order are the same but focus jumps around

## When this is not enough

| Scenario | Use instead |
| :-- | :-- |
| Elements need a custom order different from render order | `A11y.Order` + `A11y.Index` |
| Order changes at runtime | `A11y.Order` + `A11y.Index` |
| Card with nested interactive elements | `A11y.Card` |
| Focus must not leave a modal | `A11y.FocusTrap` + `A11y.FocusFrame` |
| Need to react to screen reader focus | `A11y.View` or `A11y.Index` focus events |

## Related

- [A11y Order guide](./a11y-order.md)
