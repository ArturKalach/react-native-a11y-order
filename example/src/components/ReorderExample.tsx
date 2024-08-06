import React, { useCallback, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { A11y } from 'react-native-a11y-order';

const elements = [
  {
    index: 4,
    text: 'Fifth',
  },
  {
    index: 5,
    text: 'Sixth',
  },
  {
    index: 6,
    text: 'Seventh',
  },
];

const defaultNumbers = [
  {
    index: 0,
    text: 'First',
  },
  {
    index: 1,
    text: 'Second',
  },
  {
    index: 2,
    text: 'Third',
  },
  {
    index: 3,
    text: 'Fourth',
  },
];

const shuffleArray = <T extends object>(prevArray: T[]) => {
  const array = [...prevArray];
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j] as T;
    array[j] = temp as T;
  }
  return array;
};

export const ReorderExample = () => {
  const [numbers, setNumbers] = useState(defaultNumbers);
  const [showAdd, setShowAdd] = useState(true);

  const onPressHandler = useCallback(() => {
    setNumbers(shuffleArray(numbers));
  }, [numbers]);

  const onAddHandler = useCallback(() => {
    setShowAdd(false);
    setNumbers([...elements, ...numbers]);
  }, [numbers]);

  return (
    <View>
      <View style={styles.titleBox}>
        <Text style={styles.title}>Shuffle</Text>
      </View>
      <A11y.Order>
        {numbers.map((item) => (
          <A11y.Index key={item.index} index={item.index}>
            <Text>{item.text}</Text>
          </A11y.Index>
        ))}
      </A11y.Order>
      <View style={styles.btns}>
        <Button title="Randomize" onPress={onPressHandler} />
        {showAdd && <Button title="Add" onPress={onAddHandler} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 25, color: 'black' },
  titleBox: { marginBottom: 40 },
  btns: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
