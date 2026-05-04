import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { A11y, A11yModule } from 'react-native-a11y-order';

const FocusTrapContent = ({ onClose }: { onClose: () => void }) => (
  <A11y.FocusTrap forceLock style={styles.trap}>
    <View style={styles.trapHeader}>
      <Text style={styles.trapTitle}>Focus is locked here</Text>
      <Text style={styles.trapSub}>
        Screen reader cannot leave this area until dismissed
      </Text>
    </View>
    <TouchableOpacity
      style={styles.btn}
      onPress={() => A11yModule.announce('Action confirmed')}
      accessibilityRole="button"
      accessibilityLabel="Confirm action"
    >
      <Text style={styles.btnText}>Confirm</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.btn, styles.btnOutline]}
      onPress={onClose}
      accessibilityRole="button"
      accessibilityLabel="Close locked area"
    >
      <Text style={styles.btnOutlineText}>Dismiss</Text>
    </TouchableOpacity>
  </A11y.FocusTrap>
);

export const FocusLockExample = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [shown, setShown] = React.useState(false);

  return (
    <A11y.FocusFrame style={styles.flex}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Focus Lock</Text>
          <Text style={styles.subtitle}>
            Traps screen reader focus inside a defined area — useful for modals
            and confirmation dialogs
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardAccent} />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>How it works</Text>
            <Text style={styles.cardDesc}>
              When the locked area is shown, TalkBack and VoiceOver cannot focus
              elements outside it. Dismissing restores normal navigation.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.btn, shown && styles.btnOutline]}
          onPress={() => setShown(!shown)}
          accessibilityRole="button"
          accessibilityLabel={shown ? 'Hide locked area' : 'Show locked area'}
        >
          <Text style={shown ? styles.btnOutlineText : styles.btnText}>
            {shown ? 'Hide Locked Area' : 'Show Locked Area'}
          </Text>
        </TouchableOpacity>

        {shown && <FocusTrapContent onClose={() => setShown(false)} />}

        <View style={styles.divider} />

        <Text style={styles.outsideLabel}>Outside the locked area</Text>
        <TouchableOpacity
          style={[styles.btn, styles.btnGhost]}
          onPress={() =>
            A11yModule.announce('Button outside locked area pressed')
          }
          accessibilityRole="button"
          accessibilityLabel="Button outside locked area"
        >
          <Text style={styles.btnGhostText}>Outside Button</Text>
        </TouchableOpacity>
      </View>
      {children}
    </A11y.FocusFrame>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    flex: 1,
    padding: 20,
    gap: 16,
    justifyContent: 'center',
  },

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
  cardAccent: { width: 5, backgroundColor: '#9333ea' },
  cardBody: { flex: 1, padding: 14, gap: 4 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#1e293b' },
  cardDesc: { fontSize: 13, color: '#64748b', lineHeight: 18 },

  trap: {
    borderWidth: 2,
    borderColor: '#9333ea',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    backgroundColor: '#faf5ff',
  },
  trapHeader: { gap: 4 },
  trapTitle: { fontSize: 15, fontWeight: '700', color: '#6b21a8' },
  trapSub: { fontSize: 12, color: '#9333ea', lineHeight: 17 },

  btn: {
    backgroundColor: '#9333ea',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnText: { color: '#ffffff', fontWeight: '700', fontSize: 15 },
  btnOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#9333ea',
  },
  btnOutlineText: { color: '#9333ea', fontWeight: '700', fontSize: 15 },
  btnGhost: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  btnGhostText: { color: '#64748b', fontWeight: '600', fontSize: 15 },

  divider: { height: 1, backgroundColor: '#e2e8f0' },
  outsideLabel: { fontSize: 12, color: '#94a3b8', fontWeight: '500' },
});
