# Troubleshooting

## Screen reader focus order is wrong even with A11y.Order

**Check `collapsable`**: React Native may collapse the `A11y.Order` container or its parent. Wrap the container with `collapsable={false}`:

```tsx
<View collapsable={false}>
  <A11y.Order>
    {/* ... */}
  </A11y.Order>
</View>
```

**Check nesting**: `A11y.Index` must be a direct child of `A11y.Order` at any depth — but do not place an `A11y.Order` inside another `A11y.Order` without intention; nested orders create independent sequences.

---

## A11y.Index throws "must be used inside an A11y.Order"

`A11y.Index` requires an `A11y.Order` ancestor. This is enforced at runtime. Add the `A11y.Order` wrapper:

```tsx
// Wrong
<A11y.Index index={1}>...</A11y.Index>

// Correct
<A11y.Order>
  <A11y.Index index={1}>...</A11y.Index>
</A11y.Order>
```

---

## VoiceOver doesn't read inner buttons in A11y.Card

On iOS, the inner `Pressable` inside `A11y.Card` is `accessible={false}` intentionally — VoiceOver is supposed to navigate to children directly after the overlay. If children are still unreachable:

1. Make sure children have `accessible={true}` (or `accessible` prop without a value) and `accessibilityLabel` set.
2. Avoid wrapping children in another `Pressable` that is `accessible={true}` without an `accessibilityLabel` — VoiceOver may swallow it.

---

## A11y.Card overlay is visible on screen

The overlay is a transparent view with `pointerEvents="none"` positioned absolutely. If you see an unexpected colored rectangle:

- Make sure the card's outer container clips correctly (`overflow: 'hidden'` or `borderRadius` on the container).
- Check that the card does not have `backgroundColor` on `containerProps` instead of `style`.

---

## Focus trap does not prevent VoiceOver from leaving

For programmatically-opened modals or complex layered UIs, `accessibilityViewIsModal` alone is sometimes insufficient. Add `forceLock`:

```tsx
<A11y.FocusTrap forceLock>
  {children}
</A11y.FocusTrap>
```

Also confirm `A11y.FocusTrap` is inside an `A11y.FocusFrame`.

---

## Screen announcements are dropped during navigation

The built-in `AccessibilityInfo.announceForAccessibility` can be interrupted by focus changes. Use `A11yModule.announce` instead:

```tsx
import { A11yModule } from 'react-native-a11y-order';
A11yModule.announce('Navigation complete');
```

For screen transitions, prefer `A11y.ScreenChange` which integrates with the native announcement system.

---

## a11yUIContainer has no effect

`a11yUIContainer` is iOS only. It has no effect on Android. Confirm you are testing on a physical iOS device or simulator with VoiceOver enabled.

---

## autoFocus does not move focus on Android

`autoFocus` uses the native accessibility focus API. On Android, TalkBack must be active for this to work. If TalkBack is off, the prop has no visible effect.

---

## Build error: "RNAOSortedMap / RNAOA11y... not found"

This usually means `pod install` was not run after adding the package:

```sh
cd ios && pod install
```

If you are using Expo, run:

```sh
npx expo prebuild
```

---

## TypeScript error: "Property 'focus' does not exist on type..."

The `focus()` method is exposed through the `IndexCommands` type. Use it when typing the ref:

```tsx
import { type IndexCommands } from 'react-native-a11y-order';

const ref = React.useRef<IndexCommands>(null);
```
