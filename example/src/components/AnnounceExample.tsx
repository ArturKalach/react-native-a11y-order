import React, { useRef, useState } from 'react';
import {
  AccessibilityInfo,
  Modal,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { A11yModule } from 'react-native-a11y-order';

const defaultAnnounce = (message: string) =>
  AccessibilityInfo.announceForAccessibilityWithOptions(message, {
    queue: true,
  });

const libraryAnnounce = (message: string) => A11yModule.announce(message);

export const AnnounceExample = () => {
  const ref = useRef(null);
  const [isLibrary, setIsLibrary] = useState(true);
  const [isModalShown, setIsModalShown] = useState(false);
  const navigation = useNavigation<any>();

  const announce = isLibrary ? libraryAnnounce : defaultAnnounce;
  const modeLabel = isLibrary
    ? 'Library (A11yModule)'
    : 'Default (AccessibilityInfo)';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Announce</Text>
        <Text style={styles.subtitle}>
          Send messages to the screen reader programmatically
        </Text>
      </View>

      {/* Mode toggle */}
      <View style={styles.card}>
        <View style={styles.cardAccent} />
        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>Announce method</Text>
          <Text style={styles.cardDesc}>
            Switch between the library implementation and the default React
            Native API to compare behavior
          </Text>
          <View style={styles.toggle}>
            <Switch
              trackColor={{ false: '#cbd5e1', true: '#65a30d' }}
              thumbColor="#ffffff"
              onValueChange={setIsLibrary}
              value={isLibrary}
              accessibilityLabel="Toggle announce method"
            />
            <Text
              style={[
                styles.toggleLabel,
                { color: isLibrary ? '#65a30d' : '#64748b' },
              ]}
            >
              {modeLabel}
            </Text>
          </View>
        </View>
      </View>

      {/* Modal announce */}
      <View style={styles.actionCard}>
        <View style={styles.actionInfo}>
          <Text style={styles.actionTitle}>Modal Announce</Text>
          <Text style={styles.actionDesc}>
            Opens a modal and announces the event to the screen reader
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            announce('Modal has been opened');
            setIsModalShown(true);
          }}
          accessibilityRole="button"
          accessibilityLabel="Open modal announce"
        >
          <Text style={styles.btnText}>Open Modal</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation announce */}
      <View style={styles.actionCard}>
        <View style={styles.actionInfo}>
          <Text style={styles.actionTitle}>Navigation Announce</Text>
          <Text style={styles.actionDesc}>
            Navigates to the Circle screen and announces the transition
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.btn, styles.btnOutline]}
          onPress={() => {
            announce('Navigated to Unit Circle');
            navigation.navigate('Circle');
          }}
          accessibilityRole="button"
          accessibilityLabel="Navigate to Circle with announcement"
        >
          <Text style={styles.btnOutlineText}>Navigate</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isModalShown} animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Modal Content</Text>
          <Text style={styles.modalDesc}>
            The screen reader was announced when this modal opened.
          </Text>
          <TouchableOpacity
            style={styles.btn}
            ref={ref}
            onPress={() => {
              setIsModalShown(false);
              announce('Modal has been closed');
            }}
            accessibilityRole="button"
          >
            <Text style={styles.btnText}>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 16, padding: 20 },

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
  cardAccent: { width: 5, backgroundColor: '#65a30d' },
  cardBody: { flex: 1, padding: 14, gap: 10 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#1e293b' },
  cardDesc: { fontSize: 13, color: '#64748b', lineHeight: 18 },
  toggle: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  toggleLabel: { fontSize: 13, fontWeight: '600' },

  actionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  actionInfo: { gap: 4 },
  actionTitle: { fontSize: 15, fontWeight: '700', color: '#1e293b' },
  actionDesc: { fontSize: 13, color: '#64748b', lineHeight: 18 },

  btn: {
    backgroundColor: '#65a30d',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnText: { color: '#ffffff', fontWeight: '700', fontSize: 15 },
  btnOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#65a30d',
  },
  btnOutlineText: { color: '#65a30d', fontWeight: '700', fontSize: 15 },

  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 16,
    backgroundColor: '#f8fafc',
  },
  modalTitle: { fontSize: 22, fontWeight: '700', color: '#1e293b' },
  modalDesc: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
});
