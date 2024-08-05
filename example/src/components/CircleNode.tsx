import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { IndexCommands, A11y } from 'react-native-a11y-order';
import { getPosition } from '../constants/circle';

export const CircleNode = React.forwardRef(
  ({ angle, index }: { angle: number; index: number }, ref) => {
    const position = getPosition(angle);

    const indexRef = React.useRef<IndexCommands>(null);

    React.useImperativeHandle(ref, () => ({
      focus: () => indexRef.current?.focus(),
    }));

    return (
      <A11y.Index
        style={[
          styles.circle,
          {
            bottom: position.x,
            left: position.y,
          },
        ]}
        ref={indexRef}
        index={index}
      >
        <Text style={styles.text}>{angle}</Text>
      </A11y.Index>
    );
  }
);

const styles = StyleSheet.create({
  text: { fontSize: 15, color: 'black' },
  circle: {
    borderWidth: 3,
    borderColor: 'black',
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
