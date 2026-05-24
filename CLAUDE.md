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
A11y.Order        // Container that defines a focus order sequence
A11y.Index        // Positioned element within an Order sequence
A11y.View         // Standalone view with screen reader focus events, no ordering
A11y.Card         // Card with press handler that keeps inner interactive elements accessible
A11y.FocusTrap    // Confines focus to a subtree (modal/overlay pattern)
A11y.FocusFrame   // Detects focus escaping a subtree
A11y.PaneTitle    // Announces screen/panel transitions to VoiceOver/TalkBack
A11y.ScreenChange // Shorthand for PaneTitle with type="activity" (full-screen nav)
```

### Context-based ordering

`A11y.Order` creates a context via [src/context/A11ySequenceOrderContext.ts](src/context/A11ySequenceOrderContext.ts) that provides a unique `orderKey`. Child `A11y.Index` components consume this context to register with the correct order group. Using `A11y.Index` outside an `A11y.Order` throws an error by design.

### A11y.Card — nested interaction pattern

`A11y.Card` solves the "card with inner buttons" accessibility problem. A plain `Pressable` with interactive children breaks VoiceOver by acting as a leaf node and swallowing its children.

**iOS**: a native `RNAOA11yCardView` overrides `accessibilityElements` to put a full-cover overlay `View` first. VoiceOver focuses the overlay (fires `onPress` via `onAccessibilityTap`); sighted users tap through to the `Pressable` directly. The `Pressable` is `accessible={false}`.

**Android**: the overlay is not needed — TalkBack does not block child focus. A plain `Pressable` with `accessible` carries the a11y props directly.

Key props:
- `accessibility` — `Pick<ViewProps, accessibilityKeys>` object. Routed to the overlay on iOS, to the Pressable on Android. `disabled` auto-merges into `accessibilityState.disabled`.
- `style` — visual style for the inner Pressable.
- `containerProps` — layout props for the outer container view.
- `pressableProps` — escape hatch for Pressable-specific props (hitSlop, ripple, etc.).

### Platform variants

Platform-specific files follow the React Native convention:
- `.ios.tsx` — iOS-only logic
- `.android.tsx` — Android-only logic
- `.web.tsx` — Web stubs (no-ops for components that require native)

Components with platform splits: `A11yCard`, `A11yFocusTrap`, `A11yFocusFrame`, `A11yBaseLock`, `A11yAnnounceModule`.

### Native bridge

Codegen specs live in [src/nativeSpecs/](src/nativeSpecs/) and define the TypeScript interface for each native component and module. The library supports both New Architecture (Fabric/Turbo Modules) and Old Architecture (Bridge). Native implementations:

- **iOS** ([ios/](ios/)): Objective-C with method swizzling (`RNAOSwizzleInstanceMethod`), a focus service (`RNAOA11yFocusService`), sorted map for order tracking (`RNAOSortedMap`), and per-component view classes. See [ios/CLAUDE.md](ios/CLAUDE.md).
- **Android** ([android/](android/)): Java with separate `newarch/` and `oldarch/` source sets merged via Gradle. See [android/CLAUDE.md](android/CLAUDE.md).

The Codegen config name is `RNA11yOrderSpec` (see `codegenConfig` in [package.json](package.json)).

### Build output

`react-native-builder-bob` builds three targets into `lib/`:
- `lib/commonjs/` — CJS (Node/bundlers)
- `lib/module/` — ESM
- `lib/typescript/` — `.d.ts` type declarations

The package.json `exports` map routes `react-native` and `source` fields to `src/index.ts` directly, so the native bundler always gets TypeScript source.

### Type system

Each component owns its props type in a co-located `*.types.ts` file:

```
src/components/
  A11yCard/        A11yCard.types.ts
  A11yIndex/       A11yIndex.types.ts
  A11yLock/        A11yLock.types.ts
  A11yPaneTitle/   A11yPaneTitle.types.ts
  A11ySequence/    A11ySequence.types.ts
  A11yView/        A11yView.types.ts
```

All `*Props` types are re-exported from `src/index.ts`. There is no `src/types/` directory.

`A11yOrderTypeEnum` is exported as a plain `as const` object (not a TypeScript enum) to avoid runtime IIFE overhead.

### Imperative API

`A11y.Index` exposes a `focus()` command via ref. Type the ref as `React.RefObject<IndexCommands>` and call `ref.current?.focus()` to move screen reader focus programmatically.

## Conventions

- **Package manager**: Yarn 4 (PnP off, nodeLinker: node-modules). Never use npm or pnpm.
- **Commits**: Conventional Commits enforced by commitlint + Lefthook git hooks.
- **Prettier**: Single quotes, 2-space indent, trailing commas (ES5), no semicolons at statement level (props/types).
- **TypeScript**: Strict mode. Path alias `react-native-a11y-order` resolves to `./src/index` in development (see [tsconfig.json](tsconfig.json)).
