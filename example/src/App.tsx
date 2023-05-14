import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { A11yOrder, useFocusOrder } from 'react-native-a11y-order';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  font: { fontSize: 25 },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
