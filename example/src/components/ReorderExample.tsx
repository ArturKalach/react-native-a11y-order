import React, { useCallback, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { A11y } from 'react-native-a11y-order';

const COLS = 6;
const PADDING = 20;
const GAP = 6;
const CELL_SIZE = Math.floor(
  (Dimensions.get('window').width - PADDING * 2 - GAP * (COLS - 1)) / COLS
);

const PALETTE = [
  '#2563eb',
  '#059669',
  '#d97706',
  '#dc2626',
  '#9333ea',
  '#0891b2',
  '#65a30d',
  '#db2777',
  '#ea580c',
];

const LABELS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

type Item = { id: number; label: string; focusOrder: number };

const makeItem = (id: number): Item => ({
  id,
  label: LABELS[id % LABELS.length]!,
  focusOrder: id,
});

const defaultItems = [0, 1, 2, 3, 4, 5].map(makeItem);

const shuffleArray = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j] as T, a[i] as T];
  }
  return a;
};

export const ReorderExample = () => {
  const [items, setItems] = useState(defaultItems);
  const [nextId, setNextId] = useState(defaultItems.length);

  const onShuffle = useCallback(
    () => setItems((prev) => shuffleArray(prev)),
    []
  );

  const onAdd = useCallback(() => {
    setItems((prev) => [...prev, makeItem(nextId)]);
    setNextId((n) => n + 1);
  }, [nextId]);

  const onRemove = useCallback((id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Focus Reorder</Text>
        <Text style={styles.subtitle}>
          Shuffle changes visual positions — screen reader always follows the
          focus order badge, not the grid position
        </Text>
      </View>

      {items.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No items</Text>
          <Text style={styles.emptyHint}>Tap + Add to create one</Text>
        </View>
      ) : (
        <A11y.Order style={styles.grid}>
          {items.map((item) => (
            <A11y.Index key={item.id} index={item.focusOrder}>
              <TouchableOpacity
                onPress={() => onRemove(item.id)}
                accessibilityRole="button"
                style={styles.cell}
                accessibilityLabel={`${item.label}, focus order ${
                  item.focusOrder + 1
                }`}
              >
                <View
                  style={[
                    styles.cellInner,
                    { backgroundColor: PALETTE[item.id % PALETTE.length] },
                  ]}
                >
                  <View style={styles.focusBadge}>
                    <Text style={styles.focusBadgeText}>
                      {item.focusOrder + 1}
                    </Text>
                  </View>
                  <Text style={styles.cellLabel}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            </A11y.Index>
          ))}
        </A11y.Order>
      )}

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.btn}
          onPress={onShuffle}
          accessibilityRole="button"
          accessibilityLabel="Shuffle visual order"
        >
          <Text style={styles.btnText}>Shuffle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.btnOutline]}
          onPress={onAdd}
          accessibilityRole="button"
          accessibilityLabel="Add item"
        >
          <Text style={styles.btnOutlineText}>+ Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 20, padding: PADDING },
  header: { gap: 6 },
  title: { fontSize: 22, fontWeight: '700', color: '#1e293b' },
  subtitle: { fontSize: 13, color: '#64748b', lineHeight: 19 },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
  },
  cellInner: {
    flex: 1,
    borderRadius: 12,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusBadgeText: { fontSize: 10, fontWeight: '800', color: '#1e293b' },
  cellLabel: { fontSize: 18, fontWeight: '800', color: '#ffffff' },
  removeBtn: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeBtnText: { fontSize: 8, color: '#ffffff', fontWeight: '700' },

  empty: {
    height: CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
    gap: 4,
  },
  emptyText: { fontSize: 16, fontWeight: '600', color: '#94a3b8' },
  emptyHint: { fontSize: 13, color: '#cbd5e1' },

  buttons: { flexDirection: 'row', gap: 12 },
  btn: {
    flex: 1,
    backgroundColor: '#2563eb',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnText: { color: '#ffffff', fontWeight: '700', fontSize: 15 },
  btnOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#2563eb',
  },
  btnOutlineText: { color: '#2563eb', fontWeight: '700', fontSize: 15 },
});
