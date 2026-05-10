# Getting Started

## Requirements

- React Native 0.71 or later
- iOS 13+ / Android API 21+
- Expo SDK 49+ (with prebuild — bare workflow)

## Installation

```sh
yarn add react-native-a11y-order
```

```sh
npm install react-native-a11y-order
```

### iOS

Run pod install after adding the package:

```sh
cd ios && pod install
```

### Expo

The library is compatible with Expo prebuild. Add it to your project and run:

```sh
npx expo prebuild
```

No config plugin is required.

## Architecture support

| Architecture | Supported |
| :-- | :-- |
| New Architecture (Fabric / Turbo Modules) | Yes |
| Old Architecture (Bridge) | Yes |
| Bridgeless mode | Yes |

## Quick start

```tsx
import { A11y } from 'react-native-a11y-order';

export default function App() {
  return (
    <A11y.Order>
      <A11y.Index index={1}>
        <Text>First</Text>
      </A11y.Index>
      <A11y.Index index={3}>
        <Text>Third</Text>
      </A11y.Index>
      <A11y.Index index={2}>
        <Text>Second</Text>
      </A11y.Index>
    </A11y.Order>
  );
}
```

## What's available

| Export | Purpose |
| :-- | :-- |
| [`A11y.Order`](../guides/a11y-order.md) | Container that defines a named focus-order sequence |
| [`A11y.Index`](../components/A11yIndex.md) | Positioned slot within an `A11y.Order` sequence |
| [`A11y.View`](../components/A11yView.md) | Standalone view with screen reader focus events; no ordering |
| [`A11y.Card`](../components/A11yCard.md) | Card that keeps both a card-level action and nested buttons accessible simultaneously |
| [`A11y.FocusTrap`](../components/A11yFocusTrap.md) | Confines screen reader focus to a subtree (modal/overlay) |
| [`A11y.FocusFrame`](../components/A11yFocusTrap.md) | Root boundary required by `A11y.FocusTrap`; detects focus escaping the region |
| [`A11y.PaneTitle`](../components/A11yPaneTitle.md) | Announces screen or panel transitions to VoiceOver/TalkBack |
| [`A11y.ScreenChange`](../components/A11yPaneTitle.md) | Shorthand for `A11y.PaneTitle` with `type="activity"` pre-set |
| [`A11yModule`](../leftovers/announce.md) | Reliable programmatic announcements on iOS |

## Before you reach for this library

Most simple focus order problems can be fixed with a single prop:

```tsx
<View collapsable={false}>
  {/* children will follow render order */}
</View>
```

React Native optimises away views that have no visual effect. This can scramble focus order when the native tree differs from the React tree. `collapsable={false}` prevents the optimisation.

Use this library when `collapsable={false}` is not enough — complex reordering, cards with inner buttons, modal focus trapping, or programmatic focus management.

---

[Component overview](../guides/overview.md) →
