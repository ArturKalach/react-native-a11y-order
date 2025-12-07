import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  announce(message: string): void;
}

export default TurboModuleRegistry.get<Spec>('A11yAnnounceModule');
