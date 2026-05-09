# React Native A11y Order

React Native A11y Order Library: Enhance screen reader functionality with advanced control.

Managing screen reader focus order can be challenging, especially in complex or unconventional scenarios. The `react-native-a11y-order` library is built with a native-first approach to resolve issues related to screen reader focus order and provide additional accessibility features on both Android and iOS platforms.

| iOS reader                                                | Android reader                                                |
| --------------------------------------------------------- | ------------------------------------------------------------- |
| <img src="/.github/images/ios_example.gif" height="500" /> | <img src="/.github/images/android_example.gif" height="500" /> |


- Bridgeless
- New architecture
- Old architecture
- Backward compatibility
- Compatible with Expo prebuild

> [!TIP]
> If you need to adjust the horizontal or vertical focus order, consider using `<View collapsable={false}>` as a quick fix.
> By default, React Native optimizes views, which can sometimes impact the focus order unintentionally.
>
> While this library is designed to handle complex or unusual focus scenarios, in many cases, using `<View collapsable={false}>` can resolve focus issues without requiring additional work.

> [!IMPORTANT]
> Starting from React Native v0.8.2, an experimental feature `experimental_accessibilityOrder` is available for setting the correct focus order.
> You can find more information in the [Accessibility documentation](https://reactnative.dev/docs/accessibility).


## Documentation

Full guides and API reference are in the [`/docs`](./docs/README.md) folder:

- [Getting started](./docs/getting-started/getting-started.md)
- [Guides](./docs/README.md#guides) — ordering, cards, focus lock, UI containers, focus events
- [Component API reference](./docs/README.md#component-api-reference)
- [Troubleshooting](./docs/troubleshooting/troubleshooting.md)
- [Migration guide](./docs/migration/migration.md)

---

## Installation

```sh
npm install react-native-a11y-order
```

```sh
yarn add react-native-a11y-order
```

## Quick reference

| Component | Purpose |
| :-- | :-- |
| `A11y.Order` | Container that defines a named focus-order sequence. |
| `A11y.Index` | Positioned slot within an `A11y.Order` sequence. |
| `A11y.View` | Focus-event observer with no ordering requirement. |
| `A11y.Card` | Card that exposes both a card-level action and nested interactive elements to the screen reader simultaneously. |
| `A11y.FocusTrap` | Confines screen reader focus to a subtree (modal/overlay). |
| `A11y.FocusFrame` | Root boundary required by `A11y.FocusTrap`; detects focus escaping the region. |
| `A11y.PaneTitle` | Announces screen or panel transitions to VoiceOver/TalkBack. |
| `A11y.ScreenChange` | Shorthand for `A11y.PaneTitle` with `type="activity"` pre-set. |
| `A11yModule` | Reliable programmatic announcements on iOS. |

---

## Usage

### A11y.Order + A11y.Index

`A11y.Order` creates an ordering group. `A11y.Index` defines the position of an element within that group.

```tsx
import { A11y } from 'react-native-a11y-order';

export default function App() {
  return (
    <View style={styles.container}>
      <A11y.Order>
        <A11y.Index index={1}>
          <Text>First</Text>
        </A11y.Index>
        <A11y.Index index={3}>
          <Text>Third</Text>
        </A11y.Index>
        <A11y.Index index={2}>
          <Text>Second</Text>
        </A11y.Index>
      </A11y.Order>
    </View>
  );
}
```

#### Programmatic focus

The ref exposes `focus()` for screen reader focus plus all standard native view methods (`measure`, `measureInWindow`, etc.):

```tsx
import { A11y } from 'react-native-a11y-order';
import type { IndexCommands } from 'react-native-a11y-order';

export default function App() {
  const ref = React.useRef<IndexCommands>(null);

  return (
    <View>
      <A11y.Order>
        <A11y.Index ref={ref} index={1}>
          <Text>First</Text>
        </A11y.Index>
      </A11y.Order>
      <Button onPress={() => ref.current?.focus()} title="Focus first" />
    </View>
  );
}
```

#### Auto focus

Move screen reader focus to the element when it mounts:

```tsx
<A11y.Order>
  <A11y.Index index={1} autoFocus>
    <Text>Focused on mount</Text>
  </A11y.Index>
</A11y.Order>
```

#### A11y.Index props

| Prop | Type | Description |
| :-- | :-- | :-- |
| `...ViewProps` | — | All standard React Native View properties. |
| `index` | `number` | Position in the ordering sequence. Lower numbers are focused first; ties are resolved by render order. |
| `orderType` | `'default' \| 'child' \| 'subview'` | Algorithm used to select the focusable element (see below). |
| `autoFocus` | `boolean` | Moves screen reader focus to this element on mount. |
| `a11yUIContainer` | `'none' \| 'table' \| 'list' \| 'landmark' \| 'group'` | *(iOS only)* Sets `UIAccessibilityContainerType` so VoiceOver announces the right semantic grouping. |
| `shouldGroupAccessibilityChildren` | `boolean` | *(iOS only)* `true` — VoiceOver reads all descendants as one combined element. `false` — forces each descendant to be navigated individually. Omit to defer to the system default. |
| `onScreenReaderFocused` | `() => void` | Fires when this element receives screen reader focus. |
| `onScreenReaderSubViewFocused` | `() => void` | Fires when screen reader focus enters any descendant. |
| `onScreenReaderSubViewBlurred` | `() => void` | Fires when screen reader focus leaves any descendant. |
| `onScreenReaderSubViewFocusChange` | `(isFocused: boolean) => void` | Fires on any focus state change for a descendant. |
| `onScreenReaderDescendantFocusChanged` | `(e: ScreenReaderDescendantFocusChangedEvent) => void` | Fires when any descendant gains or loses screen reader focus. Payload: `{ status: 'focused' \| 'blurred', nativeId?: string }`. |
| `ref` | `React.Ref<IndexCommands>` | Exposes `focus()` + all native view methods (`measure`, `measureInWindow`, …). |

#### `orderType` values

| Value | Description |
| :-- | :-- |
| `default` | The `A11y.Index` container itself is the ordered element. Navigation moves through inner elements before advancing to the next index. |
| `child` | Searches the child tree for the first accessible element to use in the ordering. |
| `subview` | Uses the first accessible subview via the platform's legacy traversal path. |

#### A11y.Order props

| Prop | Description |
| :-- | :-- |
| `...ViewProps` | All standard React Native View props. |

---

### A11y.View

`A11y.View` tracks screen reader focus on a standalone element — use it when you need focus events or iOS container semantics but have no ordering requirements. Unlike `A11y.Index`, it does not need to be inside an `A11y.Order` container and carries no `index` or `orderType` props.

> Use `A11y.Index` when position in a sequence matters. Use `A11y.View` when you only need to observe or react to screen reader focus, or to apply `a11yUIContainer` semantics.

| Prop | Type | Description |
| :-- | :-- | :-- |
| `...ViewProps` | — | All standard React Native View properties. |
| `autoFocus` | `boolean` | Moves screen reader focus to this element on mount. |
| `a11yUIContainer` | `'none' \| 'table' \| 'list' \| 'landmark' \| 'group'` | *(iOS only)* Sets `UIAccessibilityContainerType` so VoiceOver announces the right semantic grouping — e.g. `"list"` causes VoiceOver to say "list, N items". |
| `shouldGroupAccessibilityChildren` | `boolean` | *(iOS only)* `true` — VoiceOver reads all descendants as one combined element. `false` — forces each descendant to be navigated individually. Omit to defer to the system default. |
| `onScreenReaderFocused` | `() => void` | Fires when this element receives screen reader focus. |
| `onScreenReaderSubViewFocused` | `() => void` | Fires when screen reader focus enters any descendant. |
| `onScreenReaderSubViewBlurred` | `() => void` | Fires when screen reader focus leaves any descendant. |
| `onScreenReaderSubViewFocusChange` | `(isFocused: boolean) => void` | Fires on any focus state change for a descendant. |
| `onScreenReaderDescendantFocusChanged` | `(e: ScreenReaderDescendantFocusChangedEvent) => void` | Fires when any descendant gains or loses screen reader focus. |

```tsx
// Focus events
<A11y.View
  onScreenReaderFocused={() => console.log('focused')}
  onScreenReaderSubViewFocused={() => console.log('child focused')}
  onScreenReaderSubViewBlurred={() => console.log('child blurred')}
  onScreenReaderDescendantFocusChanged={(e) => console.log(e.nativeEvent)}
>
  ...
</A11y.View>

// iOS container semantics — VoiceOver announces "list, 3 items"
<A11y.View a11yUIContainer="list">
  <View accessible accessibilityLabel="Espresso"><Text>Espresso</Text></View>
  <View accessible accessibilityLabel="Latte"><Text>Latte</Text></View>
  <View accessible accessibilityLabel="Americano"><Text>Americano</Text></View>
</A11y.View>
```

#### `a11yUIContainer` values

| Value | VoiceOver behavior |
| :-- | :-- |
| `'list'` | Announces "list, N items" on entry; reads position ("2 of 4") on each row. |
| `'table'` | Treats the area as tabular data; reads row and column context. |
| `'landmark'` | Marks a major page region; users can jump between landmarks via the VoiceOver rotor. |
| `'group'` | Generic semantic grouping for related items that don't fit another category. |
| `'none'` | Removes any previously set container type. |

---

### A11y.Card

`A11y.Card` solves the "card with inner interactive elements" accessibility problem. A plain `Pressable` with nested buttons or links breaks VoiceOver: it acts as a leaf node and hides its children from the screen reader.

`A11y.Card` exposes the card itself **and** its inner elements to the screen reader simultaneously:

- **iOS** — places a full-cover invisible overlay as the first `accessibilityElement`. VoiceOver focuses the overlay (triggers `onPress` via `onAccessibilityTap`) while sighted users tap through to the `Pressable` normally. The native view assigns separate `focusGroupIdentifier` values to the overlay and the content subtree so Full Keyboard Access can navigate from the card label into the inner buttons with arrow keys.
- **Android** — no overlay is needed. TalkBack does not block child focus, so the card acts as a standard accessible `Pressable`.

```tsx
import { A11y } from 'react-native-a11y-order';

<A11y.Card
  onPress={() => navigation.navigate('Detail')}
  accessibility={{
    accessibilityLabel: 'Product card',
    accessibilityHint: 'Opens product detail',
  }}
>
  <Text>Product name</Text>
  <Button title="Add to cart" onPress={addToCart} />
</A11y.Card>
```

Nesting `A11y.Card` inside another `A11y.Card` works — inner cards are independently focusable:

```tsx
<A11y.Card onPress={openDetail} accessibility={{ accessibilityLabel: 'Matcha Latte, $5.50' }}>
  <Text>Matcha Latte</Text>
  <A11y.Card onPress={addToCart} accessibility={{ accessibilityLabel: 'Add to cart' }}>
    <Button title="+" onPress={addToCart} />
  </A11y.Card>
</A11y.Card>
```

#### A11y.Card props

| Prop | Type | Description |
| :-- | :-- | :-- |
| `onPress` | `() => void` | Called when the card is pressed (sighted users) or activated by the screen reader (VoiceOver double-tap / TalkBack double-tap). |
| `onLongPress` | `() => void` | Called on long-press for sighted users. For VoiceOver, add a custom action via `accessibility.accessibilityActions` — VoiceOver does not fire long-press. |
| `accessibility` | `ViewProps` | All screen-reader-facing props (`accessibilityLabel`, `accessibilityHint`, `accessibilityRole`, `accessibilityState`, etc.). Applied to the overlay on iOS and to the `Pressable` on Android. |
| `disabled` | `boolean` | Disables the card. Automatically merged into `accessibility.accessibilityState.disabled` — set it once here rather than inside `accessibility`. |
| `style` | `StyleProp<ViewStyle>` | Visual style for the inner `Pressable` (background, border, shadow…). |
| `containerProps` | `ViewProps` | Layout props for the outer container — use for margins, flex, and positioning in the parent layout. |
| `pressableProps` | `PressableProps` | Escape hatch for `Pressable`-specific props not covered above (`hitSlop`, `android_ripple`, …). |
| `testID` | `string` | Test identifier forwarded to the inner `Pressable`. |
| `children` | `React.ReactNode` | Card content. Interactive children (buttons, links) remain fully accessible to the screen reader. |

---

### A11y.FocusFrame + A11y.FocusTrap

Confine screen reader focus to a region — for modals and overlays.

- `A11y.FocusFrame`: place at the root of the screen or overlay. Provides the boundary context that `A11y.FocusTrap` requires — **`A11y.FocusTrap` must always be a descendant of `A11y.FocusFrame`**.
- `A11y.FocusTrap`: wraps the content that should hold focus. Only one `FocusTrap` should be active inside a `FocusFrame` at a time.

On iOS, `A11y.FocusTrap` uses `accessibilityViewIsModal`. With `forceLock`, it also actively redirects VoiceOver back into the trap when focus escapes.

On Android, `A11y.FocusTrap` intercepts TalkBack navigation to keep focus within the defined boundary.

#### A11y.FocusTrap props

| Prop | Type | Description |
| :-- | :-- | :-- |
| `...ViewProps` | — | All standard React Native View props. |
| `lockDisabled` | `boolean` | Disables the focus lock when `true`. Defaults to `false`. |
| `forceLock` | `boolean` | *(iOS only)* Actively redirects VoiceOver back into the trap when focus escapes. Defaults to `false`. Use for programmatically-opened modals where `accessibilityViewIsModal` alone is insufficient. |

```tsx
<A11y.FocusFrame>
  <A11y.FocusTrap>
    <Text accessibilityRole="header">Modal Title</Text>
    <Button title="Confirm" accessibilityLabel="Confirm action" />
  </A11y.FocusTrap>
</A11y.FocusFrame>
```

Use `forceLock` when `accessibilityViewIsModal` alone is insufficient:

```tsx
<A11y.FocusTrap forceLock>
  ...
</A11y.FocusTrap>
```

---

### A11y.PaneTitle + A11y.ScreenChange

Announce screen or modal transitions to the screen reader.

React Native lacks built-in APIs for announcing navigation transitions. These components fill that gap:

| Prop | Type | Description |
| :-- | :-- | :-- |
| `title` | `string` | Announcement text for the screen or modal. |
| `detachMessage` | `string` | Announcement when this component unmounts (e.g. `"Drawer closed"`). |
| `type` | `'activity' \| 'pane' \| 'announce'` | Android announcement mechanism. Defaults to `'pane'`. |
| `displayed` | `boolean` | When `false`, renders nothing and posts no announcement. Use to conditionally suppress without unmounting. |
| `withFocusRestore` | `boolean` | Preserves and restores screen reader focus after a screen change. Defaults to `true`. |

`A11y.ScreenChange` is a convenience wrapper for `A11y.PaneTitle` preconfigured with `type="activity"` (the `type` prop is omitted).

#### `type` values

| Value | Behavior |
| :-- | :-- |
| `'pane'` | Layout-changed notification with title announcement. Default. |
| `'activity'` | Full-screen transition announcement. Use for top-level screen navigation. |
| `'announce'` | Plain announcement only — no focus shift. |

```tsx
export const LoginScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  return (
    <View>
      <A11y.ScreenChange title="Login Screen" displayed={isFocused} />
      <Text>Welcome to the Login Screen</Text>
      <Button title="Continue" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};
```

---

### A11yModule

Reliable screen reader announcements on iOS.

The built-in `AccessibilityInfo.announceForAccessibility` can be interrupted by focus changes (e.g. screen navigation, modals). `A11yModule.announce` uses a native queue to ensure announcements are delivered even during transitions.

| Function | Description |
| :-- | :-- |
| `announce(message: string): void` | Posts a message to the screen reader with improved reliability on iOS. |

```tsx
import { A11yModule } from 'react-native-a11y-order';

A11yModule.announce('Changes saved successfully');
```

---

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
