# React Native A11y Order

React Native A11y Order Library: Advanced control of screen reader order.

Setting the right reading order can be a challenge, but there is a way to do it. The react-native-a11y-order is a native-first library designed to solve problems with the ordering of screen readers on both Android and iOS platforms.

| iOS reader                                                | Android reader                                                |
| --------------------------------------------------------- | ------------------------------------------------------------- |
| <img src="/.github/images/ios-reader.gif" height="500" /> | <img src="/.github/images/android-reader.gif" height="500" /> |


- Bridgeless
- New architecture
- Old architecture
- Backward compatibility
- Compatible with Expo prebuild

## Installation

```sh
npm install react-native-a11y-order
```

```sh
yarn add react-native-a11y-order
```

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
