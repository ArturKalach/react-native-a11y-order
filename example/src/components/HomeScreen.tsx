import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NAV_ITEMS, type NavItem } from '../constants/navigation';

const ExampleCard = ({
  item,
  onPress,
}: {
  item: NavItem;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={styles.card}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={item.label}
    accessibilityHint={item.desc}
  >
    <View style={[styles.accent, { backgroundColor: item.color }]} />
    <View style={styles.cardBody}>
      <Text style={styles.cardLabel}>{item.label}</Text>
      <Text style={styles.cardDesc}>{item.desc}</Text>
    </View>
  </TouchableOpacity>
);

export const HomeScreen = () => {
  const navigation = useNavigation();
  const navigate = navigation.navigate as (id: string) => void;

  return (
    <FlatList
      data={NAV_ITEMS}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}>A11y Order</Text>
          <Text style={styles.subtitle}>
            Accessibility focus order examples
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <ExampleCard item={item} onPress={() => navigate(item.id)} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: { padding: 16, paddingBottom: 40 },
  separator: { height: 10 },
  header: { alignItems: 'center', paddingVertical: 32 },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1e293b',
    letterSpacing: -0.5,
  },
  subtitle: { fontSize: 14, color: '#64748b', marginTop: 6 },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  accent: { width: 5 },
  cardBody: { flex: 1, padding: 14 },
  cardLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  cardDesc: { fontSize: 12, color: '#64748b', lineHeight: 17 },
});
