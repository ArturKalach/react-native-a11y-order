import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type SlideData = {
  index: string;
  title: string;
  desc: string;
  color: string;
  accent: string;
};

export const Slide = ({ index, title, desc, color, accent }: SlideData) => {
  return (
    <View
      collapsable={false}
      style={[styles.slide, { backgroundColor: color }]}
    >
      <View style={[styles.badge, { backgroundColor: accent }]}>
        <Text style={styles.badgeText}>{index}</Text>
      </View>
      <Text style={[styles.title, { color: accent }]}>{title}</Text>
      <Text style={styles.desc}>{desc}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    width: 220,
    borderRadius: 20,
    padding: 20,
    marginRight: 12,
    gap: 10,
  },
  badge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  title: { fontSize: 16, fontWeight: '700' },
  desc: { fontSize: 13, color: '#475569', lineHeight: 19 },
});
