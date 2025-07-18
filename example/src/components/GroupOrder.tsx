import React from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { A11y } from 'react-native-a11y-order';

const colorItems = [
  { style: { backgroundColor: '#CEEC97' }, label: 'Mindaro' },
  { style: { backgroundColor: '#F4B393' }, label: 'Peach' },
  { style: { backgroundColor: '#FC60A8' }, label: 'Hot Pink' },
  { style: { backgroundColor: '#7A28CB' }, label: 'French Violet' },
  { style: { backgroundColor: '#494368' }, label: 'English Violet' },
];

export const GroupOrder = ({ onClose }: { onClose: () => void }) => {
  return (
    <View style={styles.container}>
      <A11y.Order style={styles.order}>
        <A11y.Index index={1}>
          <Button onPress={onClose} title="Back" />
          <View accessible>
            <Text>Header</Text>
            <Text>Subheader</Text>
          </View>
        </A11y.Index>
        <A11y.Index index={2} style={styles.chatBtn}>
          <Button title="Chat" />
        </A11y.Index>
        <A11y.Index index={3}>
          <ScrollView scrollEventThrottle={1}>
            {colorItems.map((item) => (
              <View
                key={item.label}
                accessible
                accessibilityLabel={item.label}
                style={[styles.colorBlock, item.style]}
              />
            ))}
          </ScrollView>
        </A11y.Index>
      </A11y.Order>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, position: 'relative' },
  order: { flex: 1 },
  headerGroup: { flexDirection: 'row', gap: 10, padding: 5 },
  chatBtn: { position: 'absolute', right: 20, bottom: 50, zIndex: 1 },
  colorBlock: { width: '100%', height: 200 },
});
