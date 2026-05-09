# React Native A11y Order

React Native A11y Order Library: Enhance screen reader functionality with advanced control.

Managing screen reader focus order can be challenging, especially in complex or unconventional scenarios. The `react-native-a11y-order` library is built with a native-first approach to resolve issues related to screen reader focus order and provide additional accessibility features on both Android and iOS platforms.

| iOS reader                                                | Android reader                                                |
| --------------------------------------------------------- | ------------------------------------------------------------- |
| <img src="/.github/images/ios_example.gif" height="500" /> | <img src="/.github/images/android_example.gif" height="500" /> |


- Bridgeless
- New architecture
- Old architecture
- Backward compatibility
- Compatible with Expo prebuild

> [!TIP]
> If you need to adjust the horizontal or vertical focus order, consider using `<View collapsable={false}>` as a quick fix.
> By default, React Native optimizes views, which can sometimes impact the focus order unintentionally.
>
> While this library is designed to handle complex or unusual focus scenarios, in many cases, using `<View collapsable={false}>` can resolve focus issues without requiring additional work.

> [!IMPORTANT]
> Starting from React Native v0.8.2, an experimental feature `experimental_accessibilityOrder` is available for setting the correct focus order.
> You can find more information in the [Accessibility documentation](https://reactnative.dev/docs/accessibility).

---

## Installation

```sh
yarn add react-native-a11y-order
```

```sh
npm install react-native-a11y-order
```

### iOS

```sh
cd ios && pod install
```

---

## Quick reference

| Export | Purpose |
| :-- | :-- |
| `A11y.Order` | Container that defines a named focus-order sequence. |
| `A11y.Index` | Positioned slot within an `A11y.Order` sequence. |
| `A11y.View` | Focus-event observer with no ordering requirement. |
| `A11y.Card` | Card that keeps both a card-level action and nested buttons accessible simultaneously. |
| `A11y.FocusTrap` | Confines screen reader focus to a subtree (modal/overlay). |
| `A11y.FocusFrame` | Root boundary required by `A11y.FocusTrap`. |
| `A11y.PaneTitle` | Announces screen or panel transitions to VoiceOver/TalkBack. |
| `A11y.ScreenChange` | Shorthand for `A11y.PaneTitle` with `type="activity"` pre-set. |
| `A11yModule` | Reliable programmatic announcements on iOS. |

---

## Documentation

Full guides and API reference are in the [`/docs`](./docs/README.md) folder:

- [Getting started](./docs/getting-started/getting-started.md)
- [Component overview](./docs/guides/overview.md)
- [Guides](./docs/README.md#guides) — ordering, cards, focus lock, UI containers, focus events
- [Component API reference](./docs/components/overview.md)
- [Troubleshooting](./docs/troubleshooting/troubleshooting.md)
- [Migration guide](./docs/migration/migration.md)

---

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
