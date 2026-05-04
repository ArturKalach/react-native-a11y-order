import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { A11y } from 'react-native-a11y-order';

const colorItems = [
  { color: '#CEEC97', label: 'Mindaro', textColor: '#3a5200' },
  { color: '#F4B393', label: 'Peach', textColor: '#7a3500' },
  { color: '#FC60A8', label: 'Hot Pink', textColor: '#6b0036' },
  { color: '#7A28CB', label: 'French Violet', textColor: '#ffffff' },
  { color: '#494368', label: 'English Violet', textColor: '#ffffff' },
];

export const GroupOrder = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <View style={styles.container}>
      <A11y.Order style={styles.order}>
        {/* Index 1: header — focused first */}
        <A11y.Index index={1}>
          <View style={styles.header} accessible>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Design System</Text>
              <Text style={styles.headerSub}>Color palette showcase</Text>
            </View>
            <View style={styles.focusBadge}>
              <Text style={styles.focusBadgeText}>Focus 1</Text>
            </View>
          </View>
        </A11y.Index>

        {/* Index 2: Chat FAB — focused second despite being visually at bottom-right */}
        <A11y.Index index={2} style={styles.fab}>
          <TouchableOpacity
            style={styles.fabBtn}
            accessibilityRole="button"
            accessibilityLabel="Chat, focus order 2"
          >
            <Text style={styles.fabText}>💬 Chat</Text>
            <View style={styles.fabBadge}>
              <Text style={styles.fabBadgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </A11y.Index>

        {/* Index 3: color list — focused third */}
        <A11y.Index index={3} style={styles.listWrapper}>
          <ScrollView
            scrollEventThrottle={1}
            contentContainerStyle={styles.list}
          >
            {colorItems.map((item) => (
              <View
                key={item.label}
                accessible
                accessibilityLabel={item.label}
                style={[styles.colorBlock, { backgroundColor: item.color }]}
              >
                <Text style={[styles.colorLabel, { color: item.textColor }]}>
                  {item.label}
                </Text>
              </View>
            ))}
          </ScrollView>
        </A11y.Index>
      </A11y.Order>

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  order: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerText: { gap: 2 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1e293b' },
  headerSub: { fontSize: 13, color: '#64748b' },
  focusBadge: {
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  focusBadgeText: { fontSize: 12, fontWeight: '600', color: '#2563eb' },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    zIndex: 1,
  },
  fabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  fabText: { color: '#ffffff', fontWeight: '700', fontSize: 15 },
  fabBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabBadgeText: { fontSize: 11, fontWeight: '800', color: '#2563eb' },

  listWrapper: { flex: 1 },
  list: { gap: 2 },
  colorBlock: {
    height: 130,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  colorLabel: { fontSize: 16, fontWeight: '700' },
});
