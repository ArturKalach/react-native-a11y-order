import * as React from 'react';
import { View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { A11y } from 'react-native-a11y-order';
import { CircleExample } from './components/CircleExample';
import { SliderExample } from './components/SliderExample';
import { ReorderExample } from './components/ReorderExample';
import { GroupOrder } from './components/GroupOrder';

function CircleScreen({
  navigation,
}: {
  navigation: { navigate: (screen: string) => void };
}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <A11y.ScreenChange title="Circle Screen" />
      <CircleExample />
      <Button title="Slider" onPress={() => navigation.navigate('Slider')} />
      <A11y.View autoFocus>
        <Button
          title="Shuffle"
          onPress={() => navigation.navigate('Reorder')}
        />
      </A11y.View>
      <Button
        title="Group Order"
        onPress={() => navigation.navigate('Group')}
      />
    </View>
  );
}

function SliderScreen({
  navigation,
}: {
  navigation: { navigate: (screen: string) => void };
}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <A11y.ScreenChange title="Slider Screen" />
      <SliderExample />
      <Button title="Circle" onPress={() => navigation.navigate('Circle')} />
      <A11y.View autoFocus>
        <Button
          title="Shuffle"
          onPress={() => navigation.navigate('Reorder')}
        />
      </A11y.View>
      <Button
        title="Group Order"
        onPress={() => navigation.navigate('Group')}
      />
    </View>
  );
}

function ReorderScreen({
  navigation,
}: {
  navigation: { navigate: (screen: string) => void };
}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <A11y.ScreenChange title="Reorder Screen" />
      <ReorderExample />
      <Button title="Circle" onPress={() => navigation.navigate('Circle')} />
      <A11y.View autoFocus>
        <Button title="Slider" onPress={() => navigation.navigate('Slider')} />
      </A11y.View>
      <Button
        title="Group Order"
        onPress={() => navigation.navigate('Group')}
      />
    </View>
  );
}

function GroupScreen({
  navigation,
}: {
  navigation: { navigate: (screen: string) => void };
}) {
  return (
    <View style={{ flex: 1 }}>
      <A11y.ScreenChange title="Group Screen" />
      <GroupOrder>
        <Button title="Circle" onPress={() => navigation.navigate('Circle')} />
        <A11y.View autoFocus>
          <Button
            title="Slider"
            onPress={() => navigation.navigate('Slider')}
          />
        </A11y.View>
        <Button
          title="Shuffle"
          onPress={() => navigation.navigate('Reorder')}
        />
      </GroupOrder>
    </View>
  );
}

const Stack = createNativeStackNavigator();

const HEADER_OPTIONS = {
  header: () => null,
};

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Circle"
        options={{
          header: () => null,
        }}
        component={CircleScreen}
      />
      <Stack.Screen
        options={HEADER_OPTIONS}
        name="Slider"
        component={SliderScreen}
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
