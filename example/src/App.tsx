import * as React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  NavigationContainer,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { A11y } from 'react-native-a11y-order';
import { HomeScreen } from './components/HomeScreen';
import { CircleExample } from './components/CircleExample';
import { SliderExample } from './components/SliderExample';
import { ReorderExample } from './components/ReorderExample';
import { GroupOrder } from './components/GroupOrder';
import { CustomHeader } from './components/CustomHeader';
import { ScreenReaderFocus } from './components/ScreenReaderFocus';
import { FocusLockExample } from './components/FocusLockExample';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AnnounceExample } from './components/AnnounceExample';
import { CardExample } from './components/CardExample';
import { NAV_ITEMS } from './constants/navigation';

const ScreenChangeAnnounce = ({ title }: { title: string }) => {
  const isFocused = useIsFocused();
  return <A11y.ScreenChange title={title} displayed={isFocused} />;
};

export const PushButton = ({ to }: { to: string }) => {
  const navigation = useNavigation();
  const push = (navigation as any).push as (name: string) => void;
  return (
    <View style={styles.pushBar}>
      <TouchableOpacity
        style={styles.pushBtn}
        onPress={() => push(to)}
        accessibilityRole="button"
        accessibilityLabel={`Push ${to} screen onto stack`}
      >
        <Text style={styles.pushBtnText}>Push → {to}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const NavigationButtons = ({ ignore }: { ignore: string }) => {
  const navigation = useNavigation();
  const navigate = navigation.navigate as (value: string) => void;
  const currentIndex = NAV_ITEMS.findIndex((i) => i.id === ignore);
  const prev = currentIndex > 0 ? NAV_ITEMS[currentIndex - 1] : null;
  const next =
    currentIndex < NAV_ITEMS.length - 1 ? NAV_ITEMS[currentIndex + 1] : null;

  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        style={styles.navBtn}
        onPress={() => prev && navigate(prev.id)}
        disabled={!prev}
        accessibilityRole="button"
        accessibilityLabel={prev ? `Previous: ${prev.label}` : undefined}
        accessibilityState={{ disabled: !prev }}
      >
        <Text
          style={[styles.navBtnLabel, { color: prev ? prev.color : '#cbd5e1' }]}
        >
          ‹ {prev?.label ?? ''}
        </Text>
      </TouchableOpacity>
      <View style={styles.navDivider} />
      <TouchableOpacity
        style={[styles.navBtn, styles.navBtnRight]}
        onPress={() => next && navigate(next.id)}
        disabled={!next}
        accessibilityRole="button"
        accessibilityLabel={next ? `Next: ${next.label}` : undefined}
        accessibilityState={{ disabled: !next }}
      >
        <Text
          style={[styles.navBtnLabel, { color: next ? next.color : '#cbd5e1' }]}
        >
          {next?.label ?? ''} ›
        </Text>
      </TouchableOpacity>
    </View>
  );
};

function HomeNav() {
  return (
    <View style={styles.flex}>
      <HomeScreen />
    </View>
  );
}

function CircleScreen() {
  return (
    <View style={styles.flex}>
      <ScreenChangeAnnounce title="Circle Screen" />
      <ScrollView contentContainerStyle={styles.screenContent}>
        <CircleExample />
      </ScrollView>
      <PushButton to="Reorder" />
      <NavigationButtons ignore="Circle" />
    </View>
  );
}

function SliderScreen() {
  return (
    <View style={styles.flex}>
      <ScreenChangeAnnounce title="Slider Screen" />
      <View style={styles.sliderScreen}>
        <SliderExample />
      </View>
      <NavigationButtons ignore="Slider" />
    </View>
  );
}

function AutoFocusScreen() {
  const [showModal, setShowModal] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);

  return (
    <View style={styles.flex}>
      <ScreenChangeAnnounce title="Auto Focus Screen" />
      <ScrollView contentContainerStyle={styles.screenContent}>
        <Text style={styles.screenTitle}>Auto Focus</Text>
        <A11y.View autoFocus>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setShowModal((v) => !v)}
            accessibilityRole="button"
          >
            <Text style={styles.btnText}>Open Modal</Text>
          </TouchableOpacity>
        </A11y.View>
        <TouchableOpacity
          style={[styles.btn, styles.btnSecondary]}
          onPress={() => setShowMessage((v) => !v)}
          accessibilityRole="button"
        >
          <Text style={styles.btnSecondaryText}>Show Message</Text>
        </TouchableOpacity>
        {showMessage && (
          <A11y.View autoFocus>
            <View style={styles.messageBox}>
              <Text style={styles.messageText}>Auto-focused message</Text>
            </View>
          </A11y.View>
        )}
        <Modal visible={showModal}>
          <ScreenChangeAnnounce title="Auto Focus Modal" />
          <View style={styles.modalContent}>
            <Text style={styles.screenTitle}>Modal Content</Text>
            <A11y.View autoFocus>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => setShowModal(false)}
                accessibilityRole="button"
              >
                <Text style={styles.btnText}>Close</Text>
              </TouchableOpacity>
            </A11y.View>
          </View>
        </Modal>
      </ScrollView>
      <NavigationButtons ignore="AutoFocus" />
    </View>
  );
}

function ReorderScreen() {
  return (
    <View style={styles.flex}>
      <ScreenChangeAnnounce title="Reorder Screen" />
      <ScrollView>
        <ReorderExample />
      </ScrollView>
      <PushButton to="Circle" />
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

function AnnounceScreen() {
  return (
    <View style={styles.flex}>
      <ScreenChangeAnnounce title="Announce Screen" />
      <ScrollView>
        <AnnounceExample />
      </ScrollView>
      <NavigationButtons ignore="AnnounceExamples" />
    </View>
  );
}

function CardScreen() {
  return (
    <View style={styles.flex}>
      <ScreenChangeAnnounce title="Card Screen" />
      <ScrollView>
        <CardExample />
      </ScrollView>
      <NavigationButtons ignore="Card" />
    </View>
  );
}

const Stack = createNativeStackNavigator();

const HEADER_OPTIONS = { header: CustomHeader };

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomeNav}
      />
      <Stack.Screen
        name="Circle"
        options={HEADER_OPTIONS}
        component={CircleScreen}
      />
      <Stack.Screen
        name="Slider"
        options={HEADER_OPTIONS}
        component={SliderScreen}
      />
      <Stack.Screen
        name="AutoFocus"
        options={HEADER_OPTIONS}
        component={AutoFocusScreen}
      />
      <Stack.Screen
        name="Reorder"
        options={HEADER_OPTIONS}
        component={ReorderScreen}
      />
      <Stack.Screen
        name="Group"
        options={HEADER_OPTIONS}
        component={GroupScreen}
      />
      <Stack.Screen
        name="ScreenReaderFocus"
        options={HEADER_OPTIONS}
        component={ScreenReaderFocusScreen}
      />
      <Stack.Screen
        name="FocusLock"
        options={HEADER_OPTIONS}
        component={FocusLockScreen}
      />
      <Stack.Screen
        name="AnnounceExamples"
        options={HEADER_OPTIONS}
        component={AnnounceScreen}
      />
      <Stack.Screen
        name="Card"
        options={HEADER_OPTIONS}
        component={CardScreen}
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
  flex: { flex: 1 },
  sliderScreen: { flex: 1, justifyContent: 'center' },
  screenContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 20,
  },
  navBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    backgroundColor: '#ffffff',
  },
  navBtn: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  navBtnRight: { alignItems: 'flex-end' },
  navBtnLabel: { fontSize: 17, fontWeight: '700' },
  navDivider: { width: 1, backgroundColor: '#f1f5f9', marginVertical: 12 },
  pushBar: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e2e8f0',
  },
  pushBtn: {
    backgroundColor: '#0f172a',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  pushBtnText: {
    color: '#f8fafc',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.4,
  },
  btn: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  btnText: { color: '#ffffff', fontWeight: '600', fontSize: 15 },
  btnSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#2563eb',
  },
  btnSecondaryText: { color: '#2563eb', fontWeight: '600', fontSize: 15 },
  messageBox: {
    marginTop: 12,
    padding: 16,
    backgroundColor: '#eff6ff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  messageText: { color: '#1d4ed8', fontWeight: '500' },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
});
