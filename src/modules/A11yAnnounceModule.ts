import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-external-keyboard' doesn't seem to be linked. Make sure: \n\n${Platform.select(
    { ios: "- You have run 'pod install'\n", default: '' }
  )}- You rebuilt the app after installing the package\n` +
  `- You are not using Expo Go\n`;

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;
const A11yAnnounceModule = isTurboModuleEnabled
  ? require('../nativeSpecs/NativeA11yAnnounceModule').default
  : NativeModules.A11yAnnounceModule;

export const A11yAnnounce =
  A11yAnnounceModule ||
  new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    }
  );

export function announce(message: string) {
  A11yAnnounce.announce(message);
}

export const A11yModule = {
  announce,
};
