import * as React from 'react';
import { View, Button, Text, Modal, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { A11y } from 'react-native-a11y-order';
import { CircleExample } from './components/CircleExample';
import { SliderExample } from './components/SliderExample';
import { ReorderExample } from './components/ReorderExample';
import { GroupOrder } from './components/GroupOrder';
import { CustomHeader } from './components/CustomHeader';

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
    <View>
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
      <A11y.ScreenChange title="Circle Screen" />
      <CircleExample />
      <NavigationButtons ignore="Circle" />
    </View>
  );
}

function SliderScreen() {
  return (
    <View style={styles.screen}>
      <A11y.ScreenChange title="Slider Screen" />
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
      <A11y.ScreenChange title="Auto Focus Screen" />
      <Text> Auto Focus</Text>
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
        <A11y.ScreenChange title="Auto Focus Modal" />
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
      <A11y.ScreenChange title="Reorder Screen" />
      <ReorderExample />
      <NavigationButtons ignore="Reorder" />
    </View>
  );
}

function GroupScreen() {
  return (
    <View style={styles.flex}>
      <A11y.ScreenChange title="Group Screen" />
      <GroupOrder>
        <NavigationButtons ignore="Group" />
      </GroupOrder>
    </View>
  );
}

const Stack = createNativeStackNavigator();

const HEADER_OPTIONS = {
  header: CustomHeader,
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
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  buttons: { flexDirection: 'row', gap: 20 },
  flex: { flex: 1 },
});
