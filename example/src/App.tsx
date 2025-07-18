import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { SliderExample } from './components/SliderExample';
import { CircleExample } from './components/CircleExample';
import { ReorderExample } from './components/ReorderExample';
import { Button } from 'react-native';
import { GroupOrder } from './components/GroupOrder';
import { A11y } from 'react-native-a11y-order';

enum Examples {
  Circle = 'circle',
  Slider = 'slider',
  Shuffle = 'shuffle',
  GOrder = 'groupOrder',
}

export default function App() {
  const [example, setExample] = React.useState(Examples.Circle);

  if (example === Examples.GOrder) {
    return <GroupOrder onClose={() => setExample(Examples.Circle)} />;
  }

  return (
    <View style={styles.container}>
      {example === Examples.Circle && <CircleExample />}
      {example === Examples.Slider && <SliderExample />}
      {example === Examples.Shuffle && <ReorderExample />}

      <View style={styles.btns}>
        <A11y.Container type="group">
          <Button title="Circle" onPress={() => setExample(Examples.Circle)} />
          <Button title="Slider" onPress={() => setExample(Examples.Slider)} />
          <Button
            title="Shuffle"
            onPress={() => setExample(Examples.Shuffle)}
          />
          <Button
            title="Group Order"
            onPress={() => setExample(Examples.GOrder)}
          />
        </A11y.Container>
      </View>
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
  btns: { flexDirection: 'row', marginTop: 10 },
});
