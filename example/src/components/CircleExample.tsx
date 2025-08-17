import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { type IndexCommands, A11y } from 'react-native-a11y-order';
import { CircleNode } from './CircleNode';
import { CIRCLE_RADIUS } from '../constants/circle';

export const CircleExample = () => {
  const ref0 = React.useRef<IndexCommands>(null);
  return (
    <>
      <View style={styles.titleBox}>
        <Text style={styles.title}>Focus Order</Text>
      </View>

      <A11y.Order style={styles.circle}>
        <CircleNode ref={ref0} angle={0} index={1} />
        <CircleNode angle={30} index={2} />
        <CircleNode angle={45} index={3} />
        <CircleNode angle={60} index={4} />
        <CircleNode angle={90} index={5} />
        <CircleNode angle={180} index={6} />
        <CircleNode angle={270} index={7} />
      </A11y.Order>
    </>
  );
};

const styles = StyleSheet.create({
  titleBox: { marginBottom: 40 },
  title: { fontSize: 25, color: 'black' },
  circle: {
    borderWidth: 3,
    borderColor: 'black',
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
  },
  buttons: { marginTop: 40 },
  button: { marginBottom: 10 },
});
