# Contributing

Contributions are always welcome — no matter how large or small, and in any form.

Every issue, feature request, and pull request is important and will be read, investigated, and responded to. Don't hesitate to open something even if you're not sure how to describe it or don't have a reproduction yet — that's completely fine. Any information you can share helps.

Since this is a maintenance-only library (bug fixes and new React Native version support), the most valuable contributions are:

- **Bug reports** — especially ones with a screen reader reproduction (VoiceOver or TalkBack)
- **Fixes for issues on newer React Native versions**
- **Docs and type improvements**
- **Pull requests** — fixes, RN version support, docs, tests

If you can, it's helpful to include:

- A minimal code example or steps to reproduce
- The library version, React Native version, and platform (iOS / Android)
- Architecture (New Arch / Old Arch) and screen reader (VoiceOver / TalkBack)

None of these are required — a rough description or even just a question is enough to get started. The more context you provide, the faster the fix, but something is always better than nothing.

Before contributing, please read the [code of conduct](./CODE_OF_CONDUCT.md).

---

## Development workflow

Install dependencies from the root:

```sh
yarn
```

> Use `yarn`. The tooling (Lefthook, builder-bob, release-it) is built around it.

Run the example app to test changes. JS changes reflect immediately; native changes require a rebuild.

```sh
yarn example start      # Metro bundler
yarn example android    # Android
yarn example ios        # iOS
```

### New Architecture

The example defaults to Old Architecture. To test New Arch:

**Android:**
```sh
yarn example android
```

**iOS:**
```sh
RCT_NEW_ARCH_ENABLED=1 yarn example pods
yarn example ios
```

Check Metro logs for `"fabric":true` to confirm New Arch is active.

When switching architectures, clean first:

```sh
yarn clean
```

### Native code

- **iOS** — open `example/ios/A11yOrderExample.xcworkspace` in Xcode. Source files are under `Pods > Development Pods > react-native-a11y-order`.
- **Android** — open `example/android` in Android Studio. Source files are under `react-native-a11y-order`.

### Verification

```sh
yarn typecheck   # TypeScript
yarn lint        # ESLint + Prettier
yarn lint --fix  # Auto-fix formatting
yarn test        # Jest unit tests
```

Pre-commit hooks (Lefthook) run typecheck, lint, and tests automatically on commit.

---

## Commit messages

This project follows [Conventional Commits](https://www.conventionalcommits.org/en):

| Prefix | Use for |
| :-- | :-- |
| `fix` | Bug fixes |
| `feat` | New functionality |
| `refactor` | Code changes with no behaviour change |
| `docs` | Documentation only |
| `test` | Adding or updating tests |
| `chore` | Tooling, CI, dependencies |

---

## Pull requests

Use the [PR template](.github/PULL_REQUEST_TEMPLATE.md). Key points:

- Keep PRs focused on one change
- For native changes (iOS / Android), note which screen reader and architecture you tested on
- For API or behaviour changes, open an issue first to align with the maintainer
- Make sure `typecheck`, `lint`, and `test` all pass

---

## Publishing

Releases are managed with [release-it](https://github.com/release-it/release-it):

```sh
yarn release
```
