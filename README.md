# React Native A11y Order

React Native A11y Order Library for ordering screen reader order.


## Installation

```sh
npm install react-native-a11y-order
```

## Usage

```js
import { A11yOrder, useFocusOrder } from 'react-native-a11y-order';

// ...

export default function App() {
  const { a11yOrder, refs } = useFocusOrder<Text>(3);

  return (
    <View style={styles.container}>
      <A11yOrder a11yOrder={a11yOrder}>
        <Text style={styles.font} ref={refs[0]}>
          First
        </Text>
        <Text style={styles.font} ref={refs[2]}>
          Third
        </Text>
        <Text style={styles.font} ref={refs[1]}>
          Second
        </Text>
      </A11yOrder>
      <Text style={styles.font}>Four</Text>
      <Text style={styles.font}>Five</Text>
      <Text style={styles.font}>Six</Text>
    </View>
  );
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
