# Overview — Components at a glance

`react-native-a11y-order` is a React Native library for controlling screen reader behaviour on iOS (VoiceOver) and Android (TalkBack). All components are accessed through the `A11y` namespace.

```tsx
import { A11y } from 'react-native-a11y-order';
```

---

## Focus order

### `A11y.Order` + `A11y.Index`

**Problem:** React Native exposes elements to the screen reader in render order. When your visual layout differs from the logical reading order — columns, grids, pinned headers — users hear content in the wrong sequence.

**Solution:** `A11y.Order` defines a group; `A11y.Index` assigns each element a numeric position within it. Lower index = focused first, regardless of where it sits in the tree.

```tsx
<A11y.Order>
  <A11y.Index index={1}><Text>Read first</Text></A11y.Index>
  <A11y.Index index={2}><Text>Read second</Text></A11y.Index>
</A11y.Order>
```

→ [Full guide](./a11y-order.md)

---

## Cards with inner buttons

### `A11y.Card`

**Problem:** On iOS, a tappable card that contains other interactive elements (buttons, links) breaks VoiceOver — the outer `Pressable` acts as a leaf and hides its children.

**Solution:** `A11y.Card` places an invisible overlay as the first accessibility element. VoiceOver focuses the overlay (fires the card action); then navigates into the inner buttons individually. TalkBack handles this correctly without any changes.

```tsx
<A11y.Card onPress={openDetail} accessibility={{ accessibilityLabel: 'Article' }}>
  <Text>Title</Text>
  <Button title="Save" onPress={save} />
</A11y.Card>
```

→ [Full guide](./a11y-card.md)

---

## Focus events

### `A11y.View`

**Problem:** React Native provides no built-in way to know when a screen reader moves focus to or away from an element or its descendants.

**Solution:** `A11y.View` exposes `onScreenReaderFocused` and related callbacks for both the element itself and any descendant. Use it to show/hide UI or fire analytics when focus arrives.

```tsx
<A11y.View onScreenReaderFocused={() => setHighlighted(true)}>
  <Text>Section header</Text>
</A11y.View>
```

→ [Full guide](./focus-events.md)

---

## Focus trap

### `A11y.FocusTrap` + `A11y.FocusFrame`

**Problem:** When a modal or bottom sheet opens, VoiceOver and TalkBack can still navigate to content behind it.

**Solution:** `A11y.FocusFrame` marks the screen boundary; `A11y.FocusTrap` confines the screen reader to the active overlay. On iOS this sets `accessibilityViewIsModal`; on Android it intercepts navigation gestures.

```tsx
<A11y.FocusFrame>
  <ScreenContent />
  {modalVisible && (
    <A11y.FocusTrap>
      <Modal />
    </A11y.FocusTrap>
  )}
</A11y.FocusFrame>
```

→ [Full guide](./focus-lock.md)

---

## Screen and panel transitions

### `A11y.PaneTitle` / `A11y.ScreenChange`

**Problem:** When navigating between screens or switching panels, the screen reader does not automatically announce the new context.

**Solution:** `A11y.PaneTitle` announces the transition when its `title` prop changes. `A11y.ScreenChange` is a shorthand for full-screen navigation (`type="activity"`).

```tsx
// Panel switch
<A11y.PaneTitle title={activeTab} />

// Screen navigation
<A11y.ScreenChange title={screenTitle} />
```

---

## iOS semantic grouping

### `a11yUIContainer` prop

**Problem:** VoiceOver on iOS does not know whether a region is a list, table, or landmark — items are read as plain elements with no context.

**Solution:** The `a11yUIContainer` prop (available on `A11y.View` and `A11y.Index`) sets `UIAccessibilityContainerType`. VoiceOver then announces "list, 4 items" on entry and "2 of 4" on each row automatically.

```tsx
<A11y.View a11yUIContainer="list">
  {items.map(item => <Row key={item.id} />)}
</A11y.View>
```

→ [Full guide](./a11y-ui-container.md)

---

## Additional features

The features below are included as supplementary tools. They can help in specific situations, but their behaviour varies across OS versions and device configurations — **always verify on real devices before shipping**.

### `autoFocus` prop

**Problem:** When a modal opens or a new section appears, the screen reader stays on whatever it was focused on before — users may not notice the change.

**Solution:** The `autoFocus` prop on `A11y.View` and `A11y.Index` moves screen reader focus to the element as soon as it mounts. For event-driven focus (not mount-driven), use the ref API: `ref.current?.focus()` on `A11y.Index`.

```tsx
{showError && (
  <A11y.View autoFocus>
    <Text>Something went wrong</Text>
  </A11y.View>
)}
```

→ [Full guide](../leftovers/autofocus.md)

### `A11yModule.announce`

**Problem:** React Native's built-in `AccessibilityInfo.announceForAccessibility` can be dropped when a focus change happens at the same time — common during screen transitions.

**Solution:** `A11yModule.announce` uses a native queue on iOS to ensure the message is delivered even mid-transition. On Android, behaviour is similar to the built-in API.

```tsx
import { A11yModule } from 'react-native-a11y-order';

A11yModule.announce('Changes saved successfully');
```

→ [Full guide](../leftovers/announce.md)

---

← [Getting started](../getting-started/getting-started.md) | [collapsable={false}](./collapsable.md) →
