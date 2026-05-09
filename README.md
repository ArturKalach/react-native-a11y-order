# React Native A11y Order

<div>
  <img align="right" width="35%" src="/.github/images/ios_example.gif">
</div>

Native-first React Native library for controlling screen reader focus order on iOS (VoiceOver) and Android (TalkBack).

- 🔢 **Custom focus order** — define the exact sequence, independent of render order
- 🃏 **Cards with inner buttons** — card action and nested controls, both accessible at once
- 🔒 **Focus trap** — keep VoiceOver and TalkBack inside modals, no leaking
- 📣 **Transition announcements** — notify the screen reader on screen and panel changes
- ⚡ New Architecture · Old Architecture · Bridgeless · Expo prebuild

> [!TIP]
> Before adding this library, try `<View collapsable={false}>` — it fixes most simple focus order issues with no extra dependencies. [Learn more](./docs/guides/collapsable.md)

> [!IMPORTANT]
> React Native v0.8.2+ includes an experimental `experimental_accessibilityOrder` prop — see [Accessibility docs](https://reactnative.dev/docs/accessibility).

</br>

## Installation

```sh
yarn add react-native-a11y-order
cd ios && pod install
```

Get started with the [documentation](./docs/README.md) or jump straight to the [component overview](./docs/guides/overview.md).

---

## Documentation

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
