# A11yModule.announce — Reliable announcements

`A11yModule.announce` sends a message to the screen reader. Unlike the built-in `AccessibilityInfo.announceForAccessibility`, it uses a native queue on iOS to ensure the message is delivered even during transitions.

## The problem with the built-in API

`AccessibilityInfo.announceForAccessibility` can be interrupted or dropped when a focus change happens at the same time — for example, when a screen transition fires immediately before or after the announce call. This is common when navigating between screens or opening modals.

## Usage

```tsx
import { A11yModule } from 'react-native-a11y-order';

A11yModule.announce('Changes saved successfully');
```

## When to use

- After a form submission to confirm success or report an error
- When opening or closing a modal that isn't handled by `A11y.ScreenChange`
- For status updates that happen independently of navigation

## Comparison

```tsx
// Built-in — may be dropped during navigation
AccessibilityInfo.announceForAccessibility('Action completed');

// Library — queued natively on iOS, more reliable during transitions
A11yModule.announce('Action completed');
```

The improvement is most noticeable on iOS/VoiceOver. On Android/TalkBack, both approaches behave similarly.

## API

| Function | Description |
| :-- | :-- |
| `announce(message: string): void` | Posts a message to the screen reader. |

## For navigation transitions

If you need to announce a screen change during navigation, prefer `A11y.ScreenChange` or `A11y.PaneTitle` — they integrate with the native accessibility transition system rather than posting a plain announcement.

```tsx
// Prefer this for navigation
<A11y.ScreenChange title="Home Screen" displayed={isFocused} />

// Use announce for one-off status messages
A11yModule.announce('Item added to cart');
```

## Related

- [A11y.PaneTitle / ScreenChange API reference](../components/A11yPaneTitle.md)

---

← [autoFocus](./autofocus.md) | [Migration guide](../migration/migration.md) →
