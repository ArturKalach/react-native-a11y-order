import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { A11y, A11yModule } from 'react-native-a11y-order';

const FocusTrapContent = ({ onClose }: { onClose: () => void }) => (
  <A11y.FocusTrap style={styles.focusTrap}>
    <Text accessibilityRole="header">Locked Area</Text>
    <Text>Keyboard and ScreenReader focus is now trapped in this area.</Text>
    <Button
      title="Confirm"
      onPress={() => A11yModule.announce('Action confirmed')}
      accessibilityLabel="Confirm action"
    />
    <Button
      title="Cancel"
      onPress={onClose}
      accessibilityLabel="Close locked area"
    />
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
      <View style={styles.screen}>
        <Text accessibilityRole="header">Focus Lock Demo</Text>
        <Text>
          This example demonstrates how to keep keyboard focus within a specific
          area for improved accessibility.
        </Text>
        <Button
          title={shown ? 'Hide Locked Area' : 'Show Locked Area'}
          onPress={() => setShown(!shown)}
          accessibilityLabel={shown ? 'Hide locked area' : 'Show locked area'}
        />
        {shown && <FocusTrapContent onClose={() => setShown(false)} />}
        <Text>
          You can interact with the rest of the screen when the locked area is
          hidden.
        </Text>
        <Button
          title="Outside Button"
          onPress={() =>
            A11yModule.announce('Button outside locked area pressed')
          }
          accessibilityLabel="Button outside locked area"
        />

        {children}
      </View>
    </A11y.FocusFrame>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 10,
  },
  buttons: { flexDirection: 'row', gap: 20 },
  flex: { flex: 1 },
  focusTrap: {
    padding: 10,
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 10,
    gap: 10,
  },
});
