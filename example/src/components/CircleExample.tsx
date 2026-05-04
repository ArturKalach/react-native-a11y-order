import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { type IndexCommands, A11y } from 'react-native-a11y-order';
import { CircleNode } from './CircleNode';
import {
  ANGLES,
  CIRCLE_RADIUS,
  CIRCLE_SIZE,
  type Formula,
  FORMULAS,
  WRAPPER_SIZE,
} from '../constants/circle';

export const CircleExample = () => {
  const ref0 = React.useRef<IndexCommands>(null);
  const [formula, setFormula] = useState<Formula>('cos');

  const cycleFormula = useCallback(() => {
    setFormula((prev) => {
      const idx = FORMULAS.indexOf(prev);
      return FORMULAS[(idx + 1) % FORMULAS.length]!;
    });
  }, []);

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Unit Circle</Text>
        <Text style={styles.subtitle}>
          θ in radians · tap a node to cycle formula
        </Text>
      </View>

      <View style={styles.wrapper}>
        {/* Axes */}
        <View style={styles.axisH} />
        <View style={styles.axisV} />

        {/* Origin dot */}
        <View style={styles.origin} />

        <A11y.Order style={styles.circle}>
          {ANGLES.map((angle, i) => (
            <CircleNode
              key={angle}
              ref={i === 0 ? ref0 : undefined}
              angle={angle}
              index={i + 1}
              formula={formula}
              onPress={cycleFormula}
            />
          ))}
        </A11y.Order>
      </View>

      {/* Formula selector */}
      <View style={styles.formulaBar}>
        {FORMULAS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[
              styles.formulaBtn,
              formula === f && styles.formulaBtnActive,
            ]}
            onPress={() => setFormula(f)}
            accessibilityRole="button"
            accessibilityLabel={f}
            accessibilityState={{ selected: formula === f }}
          >
            <Text
              style={[
                styles.formulaBtnText,
                formula === f && styles.formulaBtnTextActive,
              ]}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => ref0.current?.focus()}
        accessibilityRole="button"
        accessibilityLabel="Focus θ equals 0 node"
      >
        <Text style={styles.buttonText}>Focus θ = 0</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
    fontStyle: 'italic',
  },
  wrapper: {
    width: WRAPPER_SIZE,
    height: WRAPPER_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  axisH: {
    position: 'absolute',
    width: WRAPPER_SIZE,
    height: 1,
    backgroundColor: '#94a3b8',
  },
  axisV: {
    position: 'absolute',
    width: 1,
    height: WRAPPER_SIZE,
    backgroundColor: '#94a3b8',
  },
  origin: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#94a3b8',
  },
  axisLabel: {
    position: 'absolute',
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
    fontStyle: 'italic',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 2,
    borderColor: '#334155',
  },
  formulaBar: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
    width: WRAPPER_SIZE,
  },
  formulaBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 100,
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
  },
  formulaBtnActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  formulaBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748b',
  },
  formulaBtnTextActive: {
    color: '#ffffff',
  },
  button: {
    marginTop: 12,
    backgroundColor: '#2563eb',
    paddingHorizontal: 28,
    paddingVertical: 11,
    borderRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
});
