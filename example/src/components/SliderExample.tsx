import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Slide } from './Slide';

export const SliderExample = () => {
  return (
    <>
      <Text style={styles.title}>Horizontal scroll</Text>
      <View style={styles.slider}>
        <ScrollView
          style={styles.slider}
          contentContainerStyle={styles.sliderContainer}
          horizontal
        >
          <Slide index="1" />
          <Slide index="2" />
          <Slide index="3" />
          <Slide index="4" />
          <Slide index="5" />
          <Slide index="6" />
          <Slide index="7" />
          <Slide index="8" />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  titleBox: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginLeft: 10,
  },
  sliderContainer: { alignItems: 'center' },
  slider: { height: 125 },
  title: { fontSize: 25, color: 'black' },
});
