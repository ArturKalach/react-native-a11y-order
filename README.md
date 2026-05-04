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


## Installation

```sh
npm install react-native-a11y-order
```

```sh
yarn add react-native-a11y-order
```

## Usage

#### A11y.Order, A11y.Index

To set the focus order for a screen reader in React Native, you can use the following components:
- `A11y.Order`: A container component that creates an ordering group for focusable elements.
- `A11y.Index`: A wrapper component that defines the position of an element within the ordering group.

Using these components together simplifies the process of managing focus order in complex UI structures.

To illustrate, let's look at an example:

```js
import { A11y } from 'react-native-a11y-order';

// ...

export default function App() {
  return (
    <View style={styles.container}>
      <A11y.Order>
        <A11y.Index index={1}>
          <Text style={styles.font}>
            First
          </Text>
        </A11y.Index>
        <A11y.Index index={3}>
          <Text style={styles.font}>
            Third
          </Text>
        </A11y.Index>
        <A11y.Index index={2}>
          <Text style={styles.font}>
            Second
          </Text>
        </A11y.Index>
      </A11y.Order>
      <Text style={styles.font}>Fourth</Text>
      <Text style={styles.font}>Fifth</Text>
      <Text style={styles.font}>Sixth</Text>
    </View>
  );
}
```

Additionally, for dynamic interaction scenarios, programmatically setting focus can be highly effective. You can achieve this by using the focus method through a component reference.

```js
import { A11y, IndexCommands } from 'react-native-a11y-order';

// ...

export default function App() {
  const ref = React.useRef<IndexCommands>(null);

  return (
    <View style={styles.container}>
      <A11y.Order>
        <A11y.Index ref={ref} index={1}>
          <Text style={styles.font}>
            First
          </Text>
        </A11y.Index>
      </A11y.Order>
      <Button onPress={() => ref.current?.focus()}>
    </View>
  );
}
```
A11y.Index Props:
| Prop | Description |
| :-- | :-- |
| ViewProps | Standard React Native View properties, including style, testID, etc. |
| index | (number) The position of the component in the order sequence. |
| ref: focus | Reference to a focus command, used to set accessibility focus programmatically. |
| orderType | Specifies the algorithm used for view ordering (see details below). |
| onScreenReaderSubViewFocused | Triggered when a subview within the component is focused by the screen reader. |
| onScreenReaderSubViewBlurred | Triggered when the screen reader focus moves away or is blurred from a subview. |
| onScreenReaderSubViewFocusChange | Triggered when the focus status of a subview changes (either focused or blurred). |


| Value | Description |
| :-- | :-- |
| default | Treats the root component as an orderable element. This can be a group or a single element. If multiple elements are present, navigation moves through the inner elements before proceeding to the next index. |
| legacy | Uses the previous implementation for element search, selecting the first child as the accessibility element for ordering. |
| search | Searches the child tree for the first accessible element to use in the order. |


A11y.Order Props:

| Prop | Description |
| :-- | :-- |
| ...ViewProps | Standard React Native View props, including style, testID, etc. |

## A11y.Container
| View                                                      | A11y.Container                                                    |
| --------------------------------------------------------- | ------------------------------------------------------------- |
| <img src="/.github/images/horizontal-scroll-view.gif" height="500" /> | <img src="/.github/images/horizontal-scroll-group.gif" height="500" /> |

The `A11y.Container` component for configuration `UIAccessibilityContainerType` feature on iOS.
| Props | Description |
| :-- | :-- |
| ViewProps | Default view props, including style, testID, etc. |
| type?: | `none` \| `table` \| `list` \| `landmark` \| `group` — representation of `UIAccessibilityContainerType`. The default value is `group`. |


## A11y.View
`The A11y.View` component can be used to handle and track screen reader focus independently of the `A11y.Index` component.

| Prop | Description |
| :-- | :-- |
| onScreenReaderFocused | Triggered when the view gets focus from the screen reader. |
| onScreenReaderSubViewFocused | Triggered when a subview within the component is focused by the screen reader. |
| onScreenReaderSubViewBlurred | Triggered when the screen reader focus moves away or is blurred from a subview. |
| onScreenReaderSubViewFocusChange | Triggered when the focus status of a subview changes (either focused or blurred). |
| onScreenReaderDescendantFocusChanged | Triggered when any descendant subview is focused by the screen reader. Provides an object containing the focus status and the nativeId of the focused subview, if applicable. Example: < { status: string, nativeId?: string } >. |

```tsx
<A11y.View
  onScreenReaderDescendantFocusChanged={(e) => console.log(e)}
  onScreenReaderSubViewFocused={() => console.log('List has been focused')}
  onScreenReaderSubViewBlurred={() => console.log('List has been blurred')}
  onScreenReaderFocused={() => console.log('Focused')}
>
  ...
</A11y.View>
```

## A11y.FocusFrame, A11y.FocusTrap

These components enhance accessibility by providing better control over focus management within specific areas of the screen.

- `A11y.FocusFrame`: Used at the root level of a "screen" to detect and prevent focus leaks, ensuring focus remains contained.
- `A11y.FocusTrap`: Wraps the content area to explicitly enforce focus confinement within a defined region.

On iOS, `A11y.FocusTrap` uses `accessibilityViewIsModal` to keep focus within the defined area. When `forceLock` is enabled, it additionally uses active enforcement — redirecting VoiceOver back into the trap whenever focus escapes and blocking focus from leaving at the system level.

On Android, `A11y.FocusTrap` uses a custom Activity or Modal to limit focus.

`A11y.FocusTrap` Props:

| Prop | Description |
| :-- | :-- |
| ViewProps | Includes all standard React Native View properties, such as style, testID, etc. |
| lockDisabled? | Disables the focus lock when `true`. |
| forceLock? | (iOS only) Enables active focus enforcement — VoiceOver is redirected back into the trap whenever focus escapes. Use when `accessibilityViewIsModal` alone is not sufficient. |

```tsx
<A11y.FocusFrame>
  ...
  <A11y.FocusTrap>
    <Text accessibilityRole="header">Locked Area</Text>
    <Button
      title="Confirm"
      accessibilityLabel="Confirm action"
    />
  </A11y.FocusTrap>
  ...
</A11y.FocusFrame>
```

Use `forceLock` when the standard lock is not enough to keep VoiceOver inside the trap:

```tsx
<A11y.FocusFrame>
  ...
  <A11y.FocusTrap forceLock>
    <Text accessibilityRole="header">Locked Area</Text>
    <Button
      title="Confirm"
      accessibilityLabel="Confirm action"
    />
  </A11y.FocusTrap>
  ...
</A11y.FocusFrame>
```

## A11y.PaneTitle, A11y.ScreenChange

Components for screen change announcements


React Native currently lacks built-in APIs for announcing modal or screen transitions. To enhance accessibility, you can use A11y.PaneTitle or A11y.ScreenChange:
- Screen transitions: Announce navigation to a new screen (e.g., "Login Screen").
- Modal presentations: Announce when a modal appears (e.g., "Confirm Modal").

| Prop | Description |
| :-- | :-- |
| title | The title message to be announced for the screen or modal. |
| detachMessage | The message to be announced when this component is detached (e.g., when leaving the screen). |
| type | The type of announcement for Android. Options: activity, pane, or announce. |
| displayed | A trigger for screen focus changes, used to properly update the Android Activity title when switching screens. |
| withFocusRestore | Ensures that the screen reader focus is preserved and restored appropriately after a screen change. (iOS-specific) |

The `A11y.ScreenChange` component is a simplified version of `A11y.PaneTitle`. It is preconfigured with `type="activity"` to handle screen change announcements on Android. Beyond that, it behaves identically to `A11y.PaneTitle`.

Example:
```tsx
export const LoginScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  return (
    <View>
      <A11y.ScreenChange
        title="Login Screen"
        displayed={isFocused}
      />
      <View style={styles.container}>
        <Text>Welcome to the Login Screen</Text>
        <Button title="Continue" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
};
```

## A11yModule
`A11yModule` provides an alternative solution for reliably announcing information on iOS.

The default `AccessibilityInfo.announceForAccessibility` function on iOS can often be disrupted by focus changes. For instance, announcements might get interrupted by actions such as navigating between screens or opening a modal.

To overcome this limitation, `A11yModule.announce` is implemented with a custom solution that leverages native events, ensuring that announcements are delivered reliably and are less likely to be interrupted.

| Function | Description |
| :-- | :-- |
| announce(message: string): void | Posts a message to be announced by the screen reader with improved reliability on iOS. |

```tsx
A11yModule.announce('This is a custom announcement, now more reliable on iOS!');
```

## Migration

<details>
  <summary>Why?</summary>

The previous versions of this library used native modules to update order, but in a world with Fabric components and new architecture, there is no visible future for managing native components via modules or `findNodeHandler`.

I thought a lot about retaining the previous API for support and compatibility, but after investigation, it was decided to deprecate the 'old' API and remove it in future releases.

The new approach is better: we no longer need to manage refs, worry about attaching nodes to the screen, and it works natively. Additionally, this new approach follows the React Native concept, which will make it easier to support in the future (hello there: bridgeless).

</details>

1. Update: `A11yOrder` to `A11y.Order`

```js
  Previous: <A11yOrder a11yOrder={a11yOrder}>
  Now: <A11y.Order>
```

2. Wrap components in `A11y.Index`

```js
  Previous: <Text style={styles.font} ref={refs[0]}>
    First
  </Text>
  Now: <A11y.Index index={1}>
    <Text style={styles.font} ref={refs[0]}>
      First
    </Text>
  </A11y.Index>
```

3. Remove unnecessary refs

```js
<A11y.Index index={1}>
  <Text style={styles.font}>
    First
  </Text>
</A11y.Index>
```

4. Remove deprecated hooks and utilities: `useFocusOrder`, `useDynamicFocusOrder`, `useA11yOrderManager`.

That's all. The index changes, removals, etc., should work out of the box.

## Legacy
#### A11y.Group

`A11y.Group` (`A11y.Container`) can be used to enhance the experience of screen readers navigating through `ScrollView` or `FlatList` with the horizontal property enabled. You can skip this if you are using the new architecture; however, it is the best for applications that have not yet migrated.

| View                                                      | A11y.Group                                                    |
| --------------------------------------------------------- | ------------------------------------------------------------- |
| <img src="/.github/images/horizontal-scroll-view.gif" height="500" /> | <img src="/.github/images/horizontal-scroll-group.gif" height="500" /> |

```js
import { A11y, IndexCommands } from 'react-native-a11y-order';

// ...

export default function App() {
  return (
    <ScrollView
      style={styles.slider}
      contentContainerStyle={styles.sliderContainer}
      horizontal
    >
      <A11y.Group style={styles.slide}>
        <View>
          <Text>Title: 1</Text>
        </View>
        <View>
          <Text>Description: 1</Text>
        </View>
      </A11y.Group>
      <A11y.Group style={styles.slide}>
        <View>
          <Text>Title: 2</Text>
        </View>
        <View>
          <Text>Description: 2</Text>
        </View>
      </A11y.Group>
    </ScrollView>
  );
}
```


| Props | Description |
| :-- | :-- |
| ViewProps | Default view props, including style, testID, etc. |
| type?: | `legacy` or `none` \| `table` \| `list` \| `landmark` \| `group` — representation of `UIAccessibilityContainerType`. The default value is `none`. |


## Roadmap
* Add autofocus prop
* Refactor and optimize performance
* Add documentation and descriptive examples

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
