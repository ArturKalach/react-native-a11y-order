import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Slide, type SlideData } from './Slide';

const SLIDES: SlideData[] = [
  {
    index: '1',
    title: 'Focus Order',
    desc: 'Control the screen reader focus sequence with A11y.Order',
    color: '#eff6ff',
    accent: '#2563eb',
  },
  {
    index: '2',
    title: 'Grouping',
    desc: 'Group related elements so TalkBack reads them as one',
    color: '#f0fdf4',
    accent: '#059669',
  },
  {
    index: '3',
    title: 'Reordering',
    desc: 'Dynamically change focus order at runtime',
    color: '#fef3c7',
    accent: '#d97706',
  },
  {
    index: '4',
    title: 'Focus Lock',
    desc: 'Trap focus inside a modal or overlay area',
    color: '#fdf4ff',
    accent: '#9333ea',
  },
  {
    index: '5',
    title: 'Auto Focus',
    desc: 'Move focus automatically when a view mounts',
    color: '#fff1f2',
    accent: '#dc2626',
  },
  {
    index: '6',
    title: 'Announce',
    desc: 'Reliably send announcements to screen reader users',
    color: '#f0fdfa',
    accent: '#0d9488',
  },
  {
    index: '7',
    title: 'Focus Events',
    desc: 'React to screen reader focus and blur callbacks',
    color: '#fefce8',
    accent: '#ca8a04',
  },
  {
    index: '8',
    title: 'UI Container',
    desc: 'Set iOS UIAccessibilityContainerType on views',
    color: '#faf5ff',
    accent: '#7c3aed',
  },
];

const SLIDE_WIDTH = 220;
const SLIDE_GAP = 12;

export const SliderExample = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Grouped Slides</Text>
        <Text style={styles.subtitle}>
          Each slide is a single accessible group
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        snapToInterval={SLIDE_WIDTH + SLIDE_GAP}
        snapToAlignment="start"
      >
        {SLIDES.map((slide) => (
          <Slide key={slide.index} {...slide} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 20 },
  header: { paddingHorizontal: 20 },
  title: { fontSize: 22, fontWeight: '700', color: '#1e293b' },
  subtitle: { fontSize: 13, color: '#64748b', marginTop: 4 },
  scrollContent: { paddingHorizontal: 20 },
});
