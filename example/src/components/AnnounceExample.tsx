import React, { useRef, useState } from 'react';
import {
  AccessibilityInfo,
  Button,
  Modal,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { A11yModule } from 'react-native-a11y-order';

const defaultAnnounce = (message: string) =>
  AccessibilityInfo.announceForAccessibilityWithOptions(message, {
    queue: true,
  });
const announce = (message: string) => A11yModule.announce(message);

export const AnnounceExample = () => {
  const ref = useRef(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [isShown, setIsShown] = useState(false);
  const announceMessage = isEnabled ? announce : defaultAnnounce;
  const navigation = useNavigation<any>();

  return (
    <View>
      <Text>Welcome to Announce Examples</Text>
      <View style={styles.box}>
        <View style={styles.line}>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text>{isEnabled ? 'Library based' : 'Default'}</Text>
        </View>
        <View>
          <Button
            title="Modal announce"
            onPress={() => {
              announceMessage('Modal has been opened ans shown');
              setIsShown(true);
            }}
          />
          <Modal visible={isShown} animationType="slide">
            <View style={styles.modal}>
              <View style={styles.box}>
                <Text>Modal Content</Text>
                <Button
                  title="Close Modal"
                  onPress={() => {
                    setIsShown(false);
                    announceMessage('Modal has been closed');
                  }}
                  ref={ref}
                />
              </View>
            </View>
          </Modal>
        </View>
        <View>
          <Button
            title="Navigation announce"
            onPress={() => {
              announceMessage('Navigated from Announce Examples to Circle');
              navigation.navigate('Circle');
            }}
            accessibilityLabel="Navigation announce"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  line: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  modal: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  box: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginVertical: 8,
    width: '90%',
    alignItems: 'center',
    borderRadius: 8,
  },
});
