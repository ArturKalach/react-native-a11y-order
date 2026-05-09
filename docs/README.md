# react-native-a11y-order — Documentation

Native-first React Native library for screen reader focus order, focus trapping, cards with inner buttons, and accessibility announcements on iOS and Android.

---

## Getting started

→ [Installation and quick start](./getting-started/getting-started.md)

---

## Guides

Practical walkthroughs for specific accessibility problems.

| Guide | What it covers |
| :-- | :-- |
| [collapsable={false}](./guides/collapsable.md) | The quick fix before reaching for this library |
| [A11y Order](./guides/a11y-order.md) | Custom focus sequences with `A11y.Order` + `A11y.Index` |
| [A11y Card](./guides/a11y-card.md) | Cards that keep inner buttons accessible |
| [A11y UI Container](./guides/a11y-ui-container.md) | iOS semantic grouping (list, table, landmark, group) |
| [Focus Events](./guides/focus-events.md) | Screen reader focus and blur callbacks |
| [Focus Lock](./guides/focus-lock.md) | Trap focus in modals and overlays |

---

## Component API reference

Full props tables for every component.

| Component | Description |
| :-- | :-- |
| [A11y.Index](./components/A11yIndex.md) | Positioned slot within a focus sequence |
| [A11y.View](./components/A11yView.md) | Standalone view with focus events; no ordering |
| [A11y.Card](./components/A11yCard.md) | Card with accessible inner interactive elements |
| [A11y.FocusTrap + A11y.FocusFrame](./components/A11yFocusTrap.md) | Focus confinement for modals and overlays |
| [A11y.PaneTitle + A11y.ScreenChange](./components/A11yPaneTitle.md) | Screen and panel transition announcements |

---

## Additional features

Smaller utilities that solve specific problems.

| Page | Description |
| :-- | :-- |
| [autoFocus](./leftovers/autofocus.md) | Move screen reader focus on mount |
| [A11yModule.announce](./leftovers/announce.md) | Reliable programmatic announcements on iOS |

---

## Migration

→ [Migrating to 1.0 from 0.9.x](./migration/migration.md)

