import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  setA11yOrder: (tags: number[], nativeTag?: number) => void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('A11yOrder');
