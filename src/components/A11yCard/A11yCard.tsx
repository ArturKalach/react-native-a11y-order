import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
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
    <View collapsable={false} {...containerProps}>
      <Pressable
        {...pressableProps}
        accessibilityRole="button"
        {...accessibility}
        accessible
        onPress={onPress}
        testID={testID}
        style={[style, styles.container]}
      >
        {children}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'relative' },
});
