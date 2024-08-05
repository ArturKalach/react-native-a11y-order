import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { A11y } from 'react-native-a11y-order';

export const Slide = ({ index }: { index: string }) => {
  return (
    <A11y.Group style={styles.slide}>
      <View>
        <Text>Title {index}</Text>
      </View>
      <View>
        <Text>Desctiption {index}</Text>
      </View>
    </A11y.Group>
  );
};

const styles = StyleSheet.create({
  slide: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginLeft: 10,
  },
});
