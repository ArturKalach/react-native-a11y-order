import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Card from '../../nativeSpecs/A11yCardNativeComponent';
import type { A11yCardProps } from './A11yCard.types';

export type { A11yCardProps };

export const A11yCard = ({
  containerProps,
  style,
  testID,
  onPress,
  accessibility,
  pressableProps,
  children,
}: A11yCardProps) => {
  return (
    <Card {...containerProps} style={[styles.container, containerProps?.style]}>
      <View
        testID={`${testID}-overlay`}
        accessibilityRole="button"
        {...accessibility}
        accessible
        pointerEvents="none"
        onAccessibilityTap={onPress}
        style={styles.overlay}
      />
      <Pressable
        {...pressableProps}
        accessible={false}
        onPress={onPress}
        testID={testID}
        style={style}
      >
        {children}
      </Pressable>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: { position: 'relative' },
  overlay: StyleSheet.absoluteFillObject,
});
