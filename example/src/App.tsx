import * as React from 'react';
import { View, Button, Text, Modal, StyleSheet } from 'react-native';
import {
  NavigationContainer,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { A11y } from 'react-native-a11y-order';
import { CircleExample } from './components/CircleExample';
import { SliderExample } from './components/SliderExample';
import { ReorderExample } from './components/ReorderExample';
import { GroupOrder } from './components/GroupOrder';
import { CustomHeader } from './components/CustomHeader';
import { ScreenReaderFocus } from './components/ScreenReaderFocus';
import { FocusLockExample } from './components/FocusLockExample';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AnnounceExample } from './components/AnnounceExample';

const ScreenChangeAnnounce = ({ title }: { title: string }) => {
  const isFocused = useIsFocused();
  return <A11y.ScreenChange title={title} displayed={isFocused} />;
};

const navigationButtons = [
  {
    id: 'AutoFocus',
    label: 'Auto Focus',
  },
  {
    id: 'Circle',
    label: 'Circle',
  },
  {
    id: 'Slider',
    label: 'Slider',
  },
  {
    id: 'Reorder',
    label: 'Reorder',
  },
  {
    id: 'Group',
    label: 'Group',
  },
  {
    id: 'ScreenReaderFocus',
    label: 'Screen Reader Focus',
  },
  {
    id: 'FocusLock',
    label: 'Focus Lock',
  },
];

function groupByTwo<T>(array: T[]) {
  const result = [];
  for (let i = 0; i < array.length; i += 2) {
    result.push(array.slice(i, i + 2));
  }
  return result;
}

export const NavigationButtons = ({ ignore }: { ignore: string }) => {
  const navigation = useNavigation();
  const btns = groupByTwo(navigationButtons.filter((i) => i.id !== ignore));
  const navigate = navigation.navigate as (value: string) => void;
  return (
    <View style={styles.btnContainer}>
      {btns.map((group, index) => (
        <View key={index} style={styles.buttons}>
          {group.map((btn) => (
            <Button
              key={btn.id}
              title={btn.label}
              onPress={() => navigate(btn.id)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

function CircleScreen() {
  return (
    <View style={styles.screen}>
      <ScreenChangeAnnounce title="Circle Screen" />
      <CircleExample />
      <NavigationButtons ignore="Circle" />
    </View>
  );
}

function SliderScreen() {
  return (
    <View style={styles.screen}>
      <ScreenChangeAnnounce title="Slider Screen" />
      <SliderExample />
      <NavigationButtons ignore="Slider" />
    </View>
  );
}

function AutoFocusScreen() {
  const [showModal, setShowModal] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);

  return (
    <View style={styles.screen}>
      <ScreenChangeAnnounce title="Auto Focus Screen" />
      <Text>Auto Focus</Text>
      <A11y.View autoFocus>
        <Button
          title="Open Modal"
          onPress={() => setShowModal((v: boolean) => !v)}
        />
      </A11y.View>
      <Button
        title="Show Message"
        onPress={() => setShowMessage((v: boolean) => !v)}
      />
      {showMessage && (
        <A11y.View autoFocus>
          <Button title="Message for auto focus" />
        </A11y.View>
      )}
      <Modal visible={showModal}>
        <ScreenChangeAnnounce title="Auto Focus Modal" />
        <View style={styles.screen}>
          <Text>Modal Content</Text>
          <A11y.View autoFocus>
            <Button title="Close" onPress={() => setShowModal(false)} />
          </A11y.View>
        </View>
      </Modal>

      <NavigationButtons ignore="AutoFocus" />
    </View>
  );
}

function ReorderScreen() {
  return (
    <View style={styles.screen}>
      <ScreenChangeAnnounce title="Reorder Screen" />
      <ReorderExample />
      <NavigationButtons ignore="Reorder" />
    </View>
  );
}

function GroupScreen() {
  return (
    <View style={styles.flex}>
      <ScreenChangeAnnounce title="Group Screen" />
      <GroupOrder>
        <NavigationButtons ignore="Group" />
      </GroupOrder>
    </View>
  );
}

function FocusLockScreen() {
  return (
    <View collapsable={false} style={styles.flex}>
      <ScreenChangeAnnounce title="Focus Lock Screen" />
      <FocusLockExample>
        <NavigationButtons ignore="FocusLock" />
      </FocusLockExample>
    </View>
  );
}

function ScreenReaderFocusScreen() {
  return (
    <ScreenReaderFocus>
      <NavigationButtons ignore="ScreenReaderFocus" />
    </ScreenReaderFocus>
  );
}

const Stack = createNativeStackNavigator();

const HEADER_OPTIONS = {
  header: CustomHeader,
};

const AnnounceScreen = () => {
  return (
    <View style={styles.screen}>
      <ScreenChangeAnnounce title="Announce Examples Screen" />
      <AnnounceExample />
      <NavigationButtons ignore="AnnounceExamples" />
    </View>
  );
};

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Circle"
        options={HEADER_OPTIONS}
        component={CircleScreen}
      />
      <Stack.Screen
        name="AnnounceExamples"
        options={HEADER_OPTIONS}
        component={AnnounceScreen}
      />
      <Stack.Screen
        options={HEADER_OPTIONS}
        name="Slider"
        component={SliderScreen}
      />
      <Stack.Screen
        options={HEADER_OPTIONS}
        name="AutoFocus"
        component={AutoFocusScreen}
      />
      <Stack.Screen
        options={HEADER_OPTIONS}
        name="Group"
        component={GroupScreen}
      />
      <Stack.Screen
        options={HEADER_OPTIONS}
        name="Reorder"
        component={ReorderScreen}
      />
      <Stack.Screen
        options={HEADER_OPTIONS}
        name="ScreenReaderFocus"
        component={ScreenReaderFocusScreen}
      />
      <Stack.Screen
        options={HEADER_OPTIONS}
        name="FocusLock"
        component={FocusLockScreen}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  buttons: { flexDirection: 'row', gap: 20 },
  flex: { flex: 1 },
  btnContainer: {
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
