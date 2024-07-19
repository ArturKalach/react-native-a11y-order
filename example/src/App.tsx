import * as React from 'react';

import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { A11ySequence, A11yDirection } from 'react-native-a11y-order';

const R = () => {
  const id = React.useId();
  return (
    <A11yDirection style={{ flex: 1 }}>
      <View>
        <View>
          <Text>{id}</Text>
        </View>
        <View>
          <Text>-{id}</Text>
        </View>
      </View>
    </A11yDirection>
  );
};

export default function App() {
  // const { a11yOrder, refs } = useFocusOrder<Text>(3);

  return (
    <View style={styles.container}>
      <View style={{ height: 100, width: 20 }} />
      <ScrollView contentContainerStyle={{ flex: 1 }} horizontal>
        <R />
        <R />
        <R />
        <R />
        <R />
        <R />
        <R />
        <R />
      </ScrollView>

      <A11ySequence.Container>
        <A11ySequence.Index index={1}>
          <Text style={styles.font}>First</Text>
        </A11ySequence.Index>
        <A11ySequence.Index index={3}>
          <Text style={styles.font}>Third</Text>
        </A11ySequence.Index>
        <A11ySequence.Index index={2}>
          <Text style={styles.font}>Second</Text>
        </A11ySequence.Index>
        <A11ySequence.Index index={4}>
          <View>
            <Text style={styles.font}>Fourth</Text>
            <Text style={styles.font}>Fifth</Text>
          </View>
        </A11ySequence.Index>
      </A11ySequence.Container>
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
