# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies (use yarn, not npm)
yarn install

# Build the library
yarn prepare

# Type checking
yarn typecheck

# Lint (ESLint + Prettier)
yarn lint

# Run tests
yarn test

# Run a single test file
yarn jest src/__tests__/index.test.tsx

# Clean build artifacts
yarn clean
```

### Example app

The `example/` app is a separate workspace. Run it via the root:

```bash
yarn example start          # Metro bundler
yarn example android        # Android
yarn example ios            # iOS
```

Or navigate to `example/` and use standard React Native CLI commands.

## Architecture

### Library structure

This is a React Native accessibility library that controls screen reader focus order on Android (TalkBack) and iOS (VoiceOver). The public API is a single `A11y` namespace object exported from [src/index.ts](src/index.ts):

```typescript
A11y.Order      // Container that defines a focus order sequence
A11y.Index      // Wrapped element with a numeric position in the sequence
A11y.View       // Standalone view with screen reader focus tracking events
A11y.FocusTrap  // Confines focus to a subtree (modal/overlay pattern)
A11y.FocusFrame // Root-level focus leak detector
A11y.Container  // iOS UIAccessibilityContainerType wrapper
A11y.PaneTitle  // Screen/modal transition announcements
A11y.ScreenChange // Specialized PaneTitle for screen transitions
A11y.Group      // Legacy (deprecated) container
```

### Context-based ordering

`A11yOrder` creates a context via [src/context/A11ySequenceOrderContext.ts](src/context/A11ySequenceOrderContext.ts) that provides a unique `orderKey`. Child `A11yIndex` components consume this context to register with the correct order group. Using `A11yIndex` outside an `A11yOrder` throws an error by design.

### Platform variants

Platform-specific files follow the React Native convention:
- `.ios.tsx` — iOS-only logic
- `.android.tsx` — Android-only logic
- `.web.tsx` — Web stubs (no-ops for components that require native)

Key components with platform splits: `A11yGroup`, `A11yUIContainer`, `A11yFocusTrap`, `A11yFocusFrame`, `A11yBaseLock`, `A11yAnnounceModule`.

### Native bridge

Codegen specs live in [src/nativeSpecs/](src/nativeSpecs/) and define the TypeScript interface for each native component and module. The library supports both New Architecture (Fabric/Turbo Modules) and Old Architecture (Bridge). Native implementations:

- **iOS** ([ios/](ios/)): Objective-C with method swizzling (`RNAOSwizzleInstanceMethod`), a focus service (`RNAOA11yFocusService`), sorted map for order tracking (`RNAOSortedMap`), and per-component view classes.
- **Android** ([android/](android/)): Java with separate `newarch/` and `oldarch/` source sets merged via Gradle. `A11yViewGroup.java` is the core view implementation.

The Codegen config name is `RNA11yOrderSpec` (see `codegenConfig` in [package.json](package.json)).

### Build output

`react-native-builder-bob` builds three targets into `lib/`:
- `lib/commonjs/` — CJS (Node/bundlers)
- `lib/module/` — ESM
- `lib/typescript/` — `.d.ts` type declarations

The package.json `exports` map routes `react-native` and `source` fields to `src/index.ts` directly, so the native bundler always gets TypeScript source.

### Imperative API

`A11yIndex` exposes a `focus()` command via ref. Pass a ref typed as `React.RefObject<IndexCommands>` to call `ref.current?.focus()` programmatically.

## Conventions

- **Package manager**: Yarn 4 (PnP off, nodeLinker: node-modules). Never use npm or pnpm.
- **Commits**: Conventional Commits enforced by commitlint + Lefthook git hooks.
- **Prettier**: Single quotes, 2-space indent, trailing commas (ES5), no semicolons at statement level (props/types).
- **TypeScript**: Strict mode. Path alias `react-native-a11y-order` resolves to `./src/index` in development (see [tsconfig.json](tsconfig.json)).
