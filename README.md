![react-native-a11y-order](/.github/images/react_native_a11y_order.png)

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

Get started with the [getting started guide](./docs/getting-started/getting-started.md) or jump straight to the [component overview](./docs/guides/overview.md).

## React Native compatibility

| Library version | React Native |
| :-- | :-- |
| `1.0.0` | ≥ 0.80 |
| `0.11.0` | ≤ 0.79 |

## What's available

| Export | Purpose |
| :-- | :-- |
| [`A11y.Order`](./docs/guides/a11y-order.md) | Container that defines a named focus-order sequence. |
| [`A11y.Index`](./docs/components/A11yIndex.md) | Positioned slot within an `A11y.Order` sequence. |
| [`A11y.View`](./docs/components/A11yView.md) | Standalone view with screen reader focus events; no ordering. |
| [`A11y.Card`](./docs/components/A11yCard.md) | Card that keeps both a card-level action and nested buttons accessible simultaneously. |
| [`A11y.FocusTrap`](./docs/components/A11yFocusTrap.md) | Confines screen reader focus to a subtree (modal/overlay). |
| [`A11y.FocusFrame`](./docs/components/A11yFocusTrap.md) | Root boundary required by `A11y.FocusTrap`; detects focus escaping the region. |
| [`A11y.PaneTitle`](./docs/components/A11yPaneTitle.md) | Announces screen or panel transitions to VoiceOver/TalkBack. |
| [`A11y.ScreenChange`](./docs/components/A11yPaneTitle.md) | Shorthand for `A11y.PaneTitle` with `type="activity"` pre-set. |
| [`A11yModule`](./docs/leftovers/announce.md) | Reliable programmatic announcements on iOS. |

---

## Documentation

- [Getting started](./docs/getting-started/getting-started.md)
- [Component overview](./docs/guides/overview.md)
- [Guides](./docs/README.md#guides)
- [Component API reference](./docs/components/overview.md)
- [Migration guide](./docs/migration/migration.md)

---

## Roadmap

All planned features are implemented and released. No new functionality or API changes are planned.

Future work is limited to:
- React Native version support (new releases)
- Bug fixes and issue resolution

Both active versions receive fixes:

| Version | React Native | Status |
| :-- | :-- | :-- |
| `1.0.0` | ≥ 0.80 | Active — bug fixes and new RN support |
| `0.11.0` | ≤ 0.79 | Active — bug fixes only |

---

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
