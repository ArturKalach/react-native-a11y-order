import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-a11y-order' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const A11yOrderModule = isTurboModuleEnabled
  ? require('./NativeA11yOrder').default
  : NativeModules.A11yOrder;

const A11yOrder = A11yOrderModule
  ? A11yOrderModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return A11yOrder.multiply(a, b);
}
