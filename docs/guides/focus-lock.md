# Focus Lock — Trap screen reader focus

`A11y.FocusTrap` and `A11y.FocusFrame` confine screen reader focus to a region. Use them for modals, bottom sheets, confirmation dialogs, and any overlay where focus must not leak to content behind.

## Components

- **`A11y.FocusFrame`** — place at the root of the screen or overlay. It provides the boundary context that `A11y.FocusTrap` relies on. **Always required** — `A11y.FocusTrap` must be a descendant of `A11y.FocusFrame`.
- **`A11y.FocusTrap`** — wraps the content that should hold focus. Only one `FocusTrap` should be active inside a `FocusFrame` at a time.

## Platform behavior

**iOS**: `A11y.FocusTrap` sets `accessibilityViewIsModal = true` on the wrapping view. With `forceLock`, it also actively redirects VoiceOver back into the trap when focus escapes.

**Android**: `A11y.FocusTrap` intercepts TalkBack navigation gestures to keep focus within the defined boundary.

## Basic usage

```tsx
import { A11y } from 'react-native-a11y-order';

<A11y.FocusFrame style={{ flex: 1 }}>
  <MainContent />

  {isModalVisible && (
    <A11y.FocusTrap>
      <Text accessibilityRole="header">Confirm action</Text>
      <Button title="Confirm" onPress={confirm} />
      <Button title="Cancel" onPress={dismiss} />
    </A11y.FocusTrap>
  )}
</A11y.FocusFrame>
```

When `isModalVisible` is `true`, the screen reader cannot navigate to `MainContent` until the trap is dismissed.

## forceLock

Use `forceLock` when `accessibilityViewIsModal` alone is not enough to prevent focus from escaping. This is common with programmatically-opened modals or complex overlays.

```tsx
<A11y.FocusTrap forceLock>
  <Text accessibilityRole="header">Modal Title</Text>
  <Button title="Close" onPress={onClose} />
</A11y.FocusTrap>
```

`forceLock` actively redirects VoiceOver back into the trap when focus escapes. Use it when you notice VoiceOver jumping outside the modal.

## Disabling the trap

Set `lockDisabled` to temporarily release the focus constraint without unmounting:

```tsx
<A11y.FocusTrap lockDisabled={isDeactivated}>
  {children}
</A11y.FocusTrap>
```

## FocusTrap props

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `lockDisabled` | `boolean` | `false` | When `true`, the focus trap is inactive. |
| `forceLock` | `boolean` | `false` | *(iOS only)* Actively redirects VoiceOver back into the trap when focus escapes. |
| `...ViewProps` | — | — | All standard React Native View props. |

## FocusFrame props

`A11y.FocusFrame` accepts all standard React Native `ViewProps`. No additional props.

## Common pattern: modal with focus restore

```tsx
const Modal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  if (!visible) return null;
  return (
    <A11y.FocusTrap forceLock style={styles.modal}>
      <A11y.ScreenChange title="Confirmation dialog" />
      <Text accessibilityRole="header">Are you sure?</Text>
      <Button title="Confirm" onPress={onClose} />
      <Button title="Cancel" onPress={onClose} />
    </A11y.FocusTrap>
  );
};

export const Screen = () => (
  <A11y.FocusFrame style={{ flex: 1 }}>
    <ScreenContent />
    <Modal visible={showModal} onClose={() => setShowModal(false)} />
  </A11y.FocusFrame>
);
```

## Related

- [A11y.PaneTitle / ScreenChange guide](../components/A11yPaneTitle.md)

---

← [A11y Card](./a11y-card.md) | [Focus Events](./focus-events.md) →
