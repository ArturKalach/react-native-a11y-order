> **Note:** This feature is a leftover — useful in practice but not part of the core focus-order API. See [Leftovers](./README.md).

# autoFocus — Move focus on mount

`autoFocus` is a boolean prop available on both `A11y.View` and `A11y.Index`. When `true`, it moves screen reader focus to the element immediately after it mounts.

## When to use

- Moving focus into a modal or dialog when it opens
- Directing the user's attention to a newly appeared message or error
- Restoring focus to a specific element after a state change

## Usage with A11y.View

```tsx
import { A11y } from 'react-native-a11y-order';

{showMessage && (
  <A11y.View autoFocus>
    <View style={styles.messageBox}>
      <Text>Operation completed successfully</Text>
    </View>
  </A11y.View>
)}
```

When `showMessage` becomes `true`, screen reader focus moves to the message box automatically.

## Usage with A11y.Index

```tsx
<A11y.Order>
  <A11y.Index index={1} autoFocus>
    <Text>Focused on mount</Text>
  </A11y.Index>
  <A11y.Index index={2}>
    <Text>Not auto-focused</Text>
  </A11y.Index>
</A11y.Order>
```

## In modals

```tsx
<Modal visible={visible} onRequestClose={onClose}>
  <A11y.View autoFocus>
    <TouchableOpacity onPress={onClose} accessibilityRole="button">
      <Text>Close</Text>
    </TouchableOpacity>
  </A11y.View>
  {/* modal content */}
</Modal>
```

The `autoFocus` element receives screen reader focus when the modal becomes visible.

## Programmatic focus

For cases where you need to trigger focus in response to an event rather than on mount, use the ref API instead:

```tsx
const ref = React.useRef<IndexCommands>(null);

// Focus on button press
<Button onPress={() => ref.current?.focus()} title="Move focus" />

<A11y.Order>
  <A11y.Index ref={ref} index={1}>
    <Text>Target element</Text>
  </A11y.Index>
</A11y.Order>
```

## Related

- [A11y.View API reference](../components/A11yView.md)
- [A11y.Index API reference](../components/A11yIndex.md)
- [A11y Order guide](../guides/a11y-order.md)

---

← [A11y UI Container](../guides/a11y-ui-container.md) | [A11yModule.announce](./announce.md) →
