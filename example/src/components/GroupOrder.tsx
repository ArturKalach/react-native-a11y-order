import React from 'react';
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { A11y } from 'react-native-a11y-order';

export const GroupOrder = ({ onClose }: { onClose: () => void }) => {
  return (
    <View style={styles.container}>
      <A11y.Order style={styles.order}>
        <A11y.Index index={1}>
          <View
            accessible={Platform.OS === 'android' ? true : undefined}
            accessibilityLabel="Header Group"
            collapsable={false}
            style={styles.headerGroup}
          >
            <Button onPress={onClose} title="Back" />
            <View accessible>
              <Text>Header</Text>
              <Text>Subheader</Text>
            </View>
          </View>
        </A11y.Index>
        <A11y.Index index={2} style={styles.chatBtn}>
          <Button title="Chat" />
        </A11y.Index>
        <A11y.Index index={3}>
          <ScrollView scrollEventThrottle={1}>
            <View
              accessible
              accessibilityLabel="Mindaro"
              style={[styles.colorBlock, { backgroundColor: '#CEEC97' }]}
            />
            <View
              accessible
              accessibilityLabel="Peach"
              style={[styles.colorBlock, { backgroundColor: '#F4B393' }]}
            />
            <View
              accessible
              accessibilityLabel="Hot pink"
              style={[styles.colorBlock, { backgroundColor: '#FC60A8' }]}
            />
            <View
              accessible
              accessibilityLabel="French Violet"
              style={[styles.colorBlock, { backgroundColor: '#7A28CB' }]}
            />
            <View
              accessible
              accessibilityLabel="English Violet"
              style={[styles.colorBlock, { backgroundColor: '#494368' }]}
            />
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
