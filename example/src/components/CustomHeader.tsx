import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NAV_ITEMS } from '../constants/navigation';

const getTitle = (routeName: string): string =>
  NAV_ITEMS.find((i) => i.id === routeName)?.label ?? routeName;

export const CustomHeader = (props: NativeStackHeaderProps) => {
  const navigation = useNavigation<any>();
  const [canGoBack, setCanGoBack] = useState(navigation.canGoBack());
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      setCanGoBack(navigation.canGoBack());
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.row}>
        {canGoBack ? (
          <Pressable
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={styles.chevron}>‹</Text>
            <Text style={styles.backText}>Back</Text>
          </Pressable>
        ) : (
          <View style={styles.side} />
        )}
        <Text style={styles.title} numberOfLines={1}>
          {getTitle(props.route.name)}
        </Text>
        <View style={styles.side} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingRight: 8,
    minWidth: 60,
  },
  chevron: {
    fontSize: 28,
    color: '#2563eb',
    lineHeight: 28,
    marginRight: 2,
  },
  backText: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '500',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1e293b',
    flex: 1,
    textAlign: 'center',
  },
  side: { minWidth: 60 },
});
