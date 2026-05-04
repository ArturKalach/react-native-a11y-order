import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  A11y,
  type ScreenReaderDescendantFocusChangedEvent,
} from 'react-native-a11y-order';

const alpha = 'α';
const beta = 'β';
const gamma = 'γ';

const SYMBOL_COLORS: Record<string, string> = {
  [alpha]: '#2563eb',
  [beta]: '#059669',
  [gamma]: '#d97706',
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue} numberOfLines={1}>
      {value}
    </Text>
  </View>
);

export const ScreenReaderFocus = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [focused, setFocused] = React.useState('—');
  const [blurred, setBlurred] = React.useState('—');
  const [info, setInfo] = React.useState('—');

  const onDescendantChanged = useCallback(
    (e: ScreenReaderDescendantFocusChangedEvent) => {
      setInfo(JSON.stringify(e.nativeEvent));
    },
    []
  );

  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Focus Event Tracker</Text>
          <Text style={styles.subtitle}>
            Navigate with your screen reader — callbacks fire on focus and blur
          </Text>
        </View>

        {/* Tracked text element */}
        <A11y.View
          onScreenReaderSubViewFocused={() => setFocused('Header')}
          onScreenReaderSubViewBlurred={() => setBlurred('Header')}
        >
          <View accessible style={styles.card}>
            <View style={styles.cardAccent} />
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>
                Screen Reader Focus and Blur Events
              </Text>
              <Text style={styles.cardDesc}>
                Focus this element — watch the tracker update below
              </Text>
            </View>
          </View>
        </A11y.View>

        {/* Reordered symbols: visual β α γ → focus α β γ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Focus Order</Text>
          <Text style={styles.sectionSub}>
            Visual order: β α γ · Focus order: α → β → γ
          </Text>
          <View collapsable={false} style={styles.symbolsWrapper}>
            <A11y.Order style={styles.symbols}>
              <A11y.Index
                index={1}
                onScreenReaderSubViewFocused={() => setFocused(beta)}
                onScreenReaderSubViewBlurred={() => setBlurred(beta)}
              >
                <View
                  style={[
                    styles.symbolBtn,
                    { borderColor: SYMBOL_COLORS[beta] },
                  ]}
                  accessible
                  accessibilityLabel={`Symbol ${beta}`}
                >
                  <Text
                    aria-hidden
                    style={[styles.symbolText, { color: SYMBOL_COLORS[beta] }]}
                  >
                    {beta}
                  </Text>
                  <Text aria-hidden style={styles.symbolOrder}>
                    Focus 2
                  </Text>
                </View>
              </A11y.Index>
              <A11y.Index
                index={0}
                onScreenReaderSubViewFocused={() => setFocused(alpha)}
                onScreenReaderSubViewBlurred={() => setBlurred(alpha)}
              >
                <View
                  style={[
                    styles.symbolBtn,
                    { borderColor: SYMBOL_COLORS[alpha] },
                  ]}
                  accessible
                  accessibilityLabel={`Symbol ${alpha}`}
                >
                  <Text
                    aria-hidden
                    style={[styles.symbolText, { color: SYMBOL_COLORS[alpha] }]}
                  >
                    {alpha}
                  </Text>
                  <Text aria-hidden style={styles.symbolOrder}>
                    Focus 1
                  </Text>
                </View>
              </A11y.Index>
              <A11y.Index
                index={2}
                onScreenReaderSubViewFocused={() => setFocused(gamma)}
                onScreenReaderSubViewBlurred={() => setBlurred(gamma)}
              >
                <View
                  style={[
                    styles.symbolBtn,
                    { borderColor: SYMBOL_COLORS[gamma] },
                  ]}
                  accessible
                  accessibilityLabel={`Symbol ${gamma}`}
                >
                  <Text
                    aria-hidden
                    style={[styles.symbolText, { color: SYMBOL_COLORS[gamma] }]}
                  >
                    {gamma}
                  </Text>
                  <Text aria-hidden style={styles.symbolOrder}>
                    Focus 3
                  </Text>
                </View>
              </A11y.Index>
            </A11y.Order>
          </View>
        </View>

        {/* Color squares with descendant focus tracking */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descendant Focus Tracking</Text>
          <Text style={styles.sectionSub}>
            Each color fires a descendant focus change event
          </Text>
          <A11y.View
            onScreenReaderDescendantFocusChanged={onDescendantChanged}
            onScreenReaderSubViewFocused={() => setFocused('Colors')}
            onScreenReaderSubViewBlurred={() => setBlurred('Colors')}
            accessibilityLabel="Colors"
            style={styles.colors}
          >
            {[
              { id: 'Red', color: '#ef4444', label: 'Red' },
              { id: 'Green', color: '#22c55e', label: 'Green' },
              { id: 'Blue', color: '#3b82f6', label: 'Blue' },
            ].map((c) => (
              <A11y.View
                key={c.id}
                nativeID={c.id}
                accessibilityLabel={`${c.label} Color`}
                style={[styles.colorBlock, { backgroundColor: c.color }]}
                accessible
              >
                <Text style={styles.colorLabel}>{c.label}</Text>
              </A11y.View>
            ))}
          </A11y.View>
        </View>

        {/* Live tracker panel */}
        <View style={styles.monitor}>
          <Text style={styles.monitorTitle}>Live Tracker</Text>
          <Row label="Focused" value={focused} />
          <View style={styles.divider} />
          <Row label="Blurred" value={blurred} />
          <View style={styles.divider} />
          <Row label="Info" value={info} />
        </View>
      </ScrollView>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: 20, gap: 20, paddingBottom: 40 },

  header: { gap: 6 },
  title: { fontSize: 22, fontWeight: '700', color: '#1e293b' },
  subtitle: { fontSize: 13, color: '#64748b', lineHeight: 19 },

  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardAccent: { width: 5, backgroundColor: '#dc2626' },
  cardBody: { flex: 1, padding: 16, gap: 4 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#1e293b' },
  cardDesc: { fontSize: 13, color: '#64748b' },

  section: { gap: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1e293b' },
  sectionSub: { fontSize: 12, color: '#64748b' },

  symbolsWrapper: { alignItems: 'center' },
  symbols: {
    flexDirection: 'row',
    gap: 12,
    padding: 4,
  },
  symbolBtn: {
    width: 80,
    height: 80,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    gap: 4,
  },
  symbolText: { fontSize: 28, fontWeight: '700' },
  symbolOrder: { fontSize: 10, color: '#94a3b8', fontWeight: '500' },

  colors: { flexDirection: 'row', gap: 10 },
  colorBlock: {
    flex: 1,
    height: 80,
    borderRadius: 14,
    justifyContent: 'flex-end',
    padding: 10,
  },
  colorLabel: { fontSize: 13, fontWeight: '700', color: '#ffffff' },

  monitor: {
    backgroundColor: '#0f172a',
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  monitorTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  row: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  rowLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94a3b8',
    width: 60,
  },
  rowValue: { fontSize: 13, color: '#e2e8f0', flex: 1 },
  divider: { height: 1, backgroundColor: '#1e293b' },
});
