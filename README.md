# React Native A11y Order

React Native A11y Order Library: Enhance screen reader functionality with advanced control.

Managing screen reader focus order can be challenging, especially in complex or unconventional scenarios. The react-native-a11y-order library is built with a native-first approach to resolve issues related to screen reader focus order and provide additional accessibility features on both Android and iOS platforms.

| iOS reader                                                | Android reader                                                |
| --------------------------------------------------------- | ------------------------------------------------------------- |
| <img src="/.github/images/ios-reader.gif" height="500" /> | <img src="/.github/images/android-reader.gif" height="500" /> |


- Bridgeless
- New architecture
- Old architecture
- Backward compatibility
- Compatible with Expo prebuild

> [!TIP]
> If you need to adjust the horizontal or vertical focus order, consider using `<View collapsable={false}>` as a quick fix.
> By default, React Native optimizes views, which can sometimes impact the focus order unintentionally.
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

## Recent Updates

#### Screen Reader Focus Events

| iOS | Android |
| :-- | :-- |
| <img src="/.github/images/screen-reader-focus-ios.gif" height="500" /> |  <img src="/.github/images/screen-reader-focus-android.gif" height="500" />  |

<details>
  <summary>More Information</summary>
To enhance accessibility and provide better focus management, screen reader focus handlers have been added. These handlers allow you to capture and respond to screen reader focus events effectively, enabling features like managing animations, timers, and other interactions based on focus changes.


A11y.View Props:
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
</details>

#### Focus Lock Functionality
The focus lock functionality has been introduced with two new components: `A11y.FocusFrame` and `A11y.FocusTrap`. These components enable more robust accessibility by managing and restricting focus within specific areas of the screen.

| iOS | Android |
| :-- | :-- |
| <img src="/.github/images/focus-lock-ios.gif" height="500" /> |  <img src="/.github/images/focus-lock-android.gif" height="500" />  |

<details>
  <summary>More Information</summary>

- On iOS, `A11y.FocusTrap` uses the native `accessibilityViewIsModal` property to keep the focus within a defined area.
- On Android, where no equivalent to `accessibilityViewIsModal` exists, custom logic has been implemented as a workaround. By default, Android uses a custom Activity or Modal to limit focus. While using a Modal is considered the best practice for focus locking on Android, some scenarios—such as issues with React Native's Modal or library-specific constraints—may require alternative implementations.

#### How It Works

The focus lock functionality should be used as a pair:

- `A11y.FocusFrame`: This component is used at the root level of a "screen" to detect focus leaks and ensure that focus remains contained.
- `A11y.FocusTrap`: This component wraps the content area where focus should be explicitly locked.

| Prop | Description |
| :-- | :-- |
| ViewProps | Includes all standard React Native View properties, such as style, testID, etc. |

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

</details>

#### A11y.PaneTitle and A11y.ScreenChange
The components `A11y.PaneTitle` and `A11y.ScreenChange` have been introduced to enhance accessibility by providing robust support for announcing screen changes and their states.

| iOS | Android |
| :-- | :-- |
| <img src="/.github/images/announce-ios.gif" height="500" /> |  <img src="/.github/images/announce-android.gif" height="500" />  |

<details>
  <summary>More Information</summary>

Platform-Specific Behavior
-On Android, `A11y.PaneTitle` and `A11y.ScreenChange` utilize native properties, specifically: `activity.setTitle` and `setAccessibilityPaneTitle`.
- On iOS, due to the lack of equivalent native functionality, `A11yModule.announce` is used as a workaround to announce screen changes (see the `A11yModule.announce` section for details).

##### When to Use:

Currently, React Native doesn't provide APIs for announcing modal or screen transitions. To address this and improve accessibility, you can use `A11y.PaneTitle` or `A11y.ScreenChange` to announce:
- Screen transitions, such as navigating to a new screen (e.g., "Login Screen").
- Modal presentations, such as when a modal appears (e.g., "Confirm Modal").


A11y.PaneTitle Props
| Prop | Description |
| :-- | :-- |
| title | The title message to be announced for the screen or modal. |
| detachMessage | The message to be announced when this component is detached (e.g., when leaving the screen). |
| type | The type of announcement for Android. Options: activity, pane, or announce. |
| displayed | A trigger for screen focus changes, used to properly update the Android Activity title when switching screens. |
| withFocusRestore | Ensures that the screen reader focus is preserved and restored appropriately after a screen change. (iOS-specific) |

The A11y.ScreenChange component is a specialized implementation of A11y.PaneTitle. It is preconfigured with `type="activity"` for screen change announcements on Android and works identically to `A11y.PaneTitle`.

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
</details>

#### A11yModule.announce - Alternative Announcement Function
The `A11yModule.announce` function has been introduced to improve accessibility announcement behavior on iOS.

<details>
  <summary>More Information</summary>
Why Use `A11yModule.announce`?

On iOS, the default `AccessibilityInfo.announceForAccessibility` function can be interrupted by focus changes. This means that if you attempt to announce a message, the announcement could be prematurely cut off due to various events, such as screen navigation or the display of a modal.

To address this limitation, `A11yModule.announce` uses a custom solution built on native events to ensure that announcements are made reliably and are less likely to be interrupted.

A11yModule API:
| Function | Description |
| :-- | :-- |
| announce(message: string): void | Posts a string to be announced by the screen reader, ensuring improved reliability on iOS. |

```tsx
A11yModule.announce('This is a custom announcement, now more reliable on iOS!');
```
</details>


## Usage

#### A11y.Order, A11y.Index

There is always a question about how to set the focus order for a screen reader in React Native. `A11y.Order` and `A11y.Index` are designed to assist with this task. `A11y.Order` is a container component that defines an ordering group, while `A11y.Index` is a wrapper component that helps define a position within the order.

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

Additionally, for dynamic interaction scenarios, setting focus programmatically can be very useful. This can be achieved using the focus command via a component ref.

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
