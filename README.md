# React Native A11y Order

React Native A11y Order Library for modifying screen reader order.

Sometimes we need change reader order, some time we need group components for better reading. `react-native-a11y-order` is native first library for solving problems with ordering of screen readers on Android and iOS.

## Installation

```sh
npm install react-native-a11y-order
```

## Usage

#### A11y.Order, A11y.Index

The order system include two native based view components: A11y.Order and A11y.Index

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
      <Text style={styles.font}>Four</Text>
      <Text style={styles.font}>Five</Text>
      <Text style={styles.font}>Six</Text>
    </View>
  );
}
```

Additionaly, `A11y.Index` includes posibility to focus content programaticaly:


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

> [!NOTE]
> Becouse of native nature, it is better to wrap all component inside `A11y.Order` with `A11y.Index`. The component which is not wrapped inside `A11y.Index` can be skiped from reading order (iOS), or readed at the end (Android). If you need to manage lot's of element try to group them with view and then controle via the ordering system, you can find example below.

<details>
  <summary>Group with order example</summary>

Don't: 

```js
export default function App() {
  return (
    <Viw style={styles.container}>
      <A11y.Order>
        <A11y.Index index={1}>
          <Text style={styles.font}>
            First
          </Text>
        </A11y.Index>
        <Text style={styles.font}>
          Third
        </Text> // <===== don't left unwrap components
        <A11y.Index index={2}>
          <Text style={styles.font}>
            Second
          </Text>
        </A11y.Index>
        <Text style={styles.font}>Four</Text>  // <===== this is also wrong
        <Text style={styles.font}>Five</Text>
      </A11y.Order>
      <Text style={styles.font}>Six</Text> // <===== this is correct becouse it is out of `A11y.Order`
    </View>
  );
}
```

Do

```js
export default function App() {
  return (
    <Viw style={styles.container}>
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
        <A11y.Index index={4}>  // <===== attention here, we group four and five to manage correct order flow
          <View>
            <Text style={styles.font}>Four</Text> 
          </View>
          <View>
            <Text style={styles.font}>Five</Text>
          </View>
        </A11y.Index>
        <A11y.Index index={2}>
          <Text style={styles.font}>
            Second
          </Text>
        </A11y.Index>
      </A11y.Order>
      <Text style={styles.font}>Six</Text>
    </View>
  );
}
```

</details>



| Props          | Description                                      |
| -------------- | ------------------------------------------------ |
| ViewProps      | Default View props includin style, testID, etc   |
| index          | `number`, position in order                      |
| ref: focus     | focus command for setting accessibility focus    |


#### A11y.Group

A11y.Group is created to solve problem with reading components in `ScrollView` or `FlatList` with `horizontal={true}` mode. In the new architecture this issue has been partionaly fixed, but application which are not used new architecture yet could came across with order problem.

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
          <Text>Desctiption: 1</Text>
        </View>
      </A11y.Group>
      <A11y.Group style={styles.slide}>
        <View>
          <Text>Title: 2</Text>
        </View>
        <View>
          <Text>Desctiption: 2</Text>
        </View>
      </A11y.Group>
    </ScrollView>
  );
}
```


| Props          | Description                                      |
| -------------- | ------------------------------------------------ |
| ViewProps      | Default View props includin style, testID, etc   |


## Migration

<details>
  <summary>Why?</summary>


The privious versions of this library used native modules to update order, but in the world with Fabric components and new architecture there are no future visible future for managing native components via modules or findNodeHandler.  

I thought a lot about keeping previous API for support and capability, but after investigation it has been decided to depricate "old" API and remove it future releases.

The new approach is better, we don't need manage refs, worry about attaching nodes to the screen, and it works on native, additionaly new approach is follow ReactNative concept what would make it easier to support in future (hello there: bridgeles).


</details>

1. Update: `A11yOrder` with `A11y.Order`

```js
  Privious: <A11yOrder a11yOrder={a11yOrder}>
  Now: <A11y.Order>
```

2. Wrap components into `A11y.Index`

```js
  Privious: <Text style={styles.font} ref={refs[0]}>
    First
  </Text>
  Now: <A11y.Index index={1}>
    <Text style={styles.font} ref={refs[0]}>
      First
    </Text>
  </A11y.Index>
```

3. Remove unesesary refs

```js
<A11y.Index index={1}>
  <Text style={styles.font}>
    First
  </Text>
</A11y.Index>
```

This is all, the index changes, removements, etc... should work out of the box.


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
