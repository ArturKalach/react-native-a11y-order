import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { type IndexCommands, A11y } from 'react-native-a11y-order';
import {
  NODE_SIZE,
  type Formula,
  getPosition,
  getRadianLabel,
  getValue,
} from '../constants/circle';

type Props = {
  angle: number;
  index: number;
  formula: Formula;
  onPress: () => void;
};

export const CircleNode = React.forwardRef<IndexCommands, Props>(
  ({ angle, index, formula, onPress }, ref) => {
    const { left, top } = getPosition(angle);
    const radian = getRadianLabel(angle);
    const value = getValue(angle, formula);
    const a11yValue = value === '∞' ? 'undefined' : value;

    const indexRef = React.useRef<IndexCommands>(null);

    React.useImperativeHandle(ref, () => indexRef.current!, []);

    return (
      <A11y.Index
        ref={indexRef}
        index={index}
        style={[styles.node, { left, top }]}
      >
        <TouchableOpacity
          style={styles.card}
          onPress={onPress}
          activeOpacity={0.7}
          accessibilityLanguage="en-US"
          accessibilityLabel={`${radian}, ${formula} ${a11yValue}`}
          accessibilityRole="button"
        >
          <Text style={styles.radian} adjustsFontSizeToFit numberOfLines={1}>
            {radian}
          </Text>
          <View style={styles.divider} />
          <Text
            style={[styles.value, value === '∞' && styles.valueUndefined]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
          >
            {value}
          </Text>
        </TouchableOpacity>
      </A11y.Index>
    );
  }
);

const styles = StyleSheet.create({
  node: {
    position: 'absolute',
    width: NODE_SIZE,
    height: NODE_SIZE,
  },
  card: {
    flex: 1,
    borderRadius: NODE_SIZE / 2,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#dde6f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 6,
    gap: 3,
    shadowColor: '#1e3a8a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  radian: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2563eb',
    letterSpacing: -0.3,
  },
  divider: {
    width: '75%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e2e8f0',
  },
  value: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1e293b',
    maxWidth: NODE_SIZE - 8,
  },
  valueUndefined: {
    color: '#94a3b8',
  },
});
