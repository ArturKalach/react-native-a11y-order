# ScreenReader — Reliable announcements

`ScreenReader` sends messages to the screen reader. Unlike `AccessibilityInfo.announceForAccessibility`, it uses a native queue on iOS to ensure messages are delivered even during transitions.

## Import

```tsx
import { ScreenReader } from 'react-native-a11y-order';

// Or import functions directly
import { announce, cancel, cancelAll } from 'react-native-a11y-order';
```

## The problem with the built-in API

`AccessibilityInfo.announceForAccessibility` can be interrupted or dropped when a focus change happens at the same time — for example, when a screen transition fires immediately before or after the announce call. This is common when navigating between screens or opening modals.

## Usage

```tsx
// ScreenReader.announce uses calm mode by default (navigation-aware)
await ScreenReader.announce('Changes saved successfully');

// Direct announce — posts immediately, more control over timing
await announce('Item added to cart');

// With options
await announce('Action completed', { priority: 'high', delayMs: 300 });

// Cancel a specific announcement
const result = await ScreenReader.announce('Loading…');
await ScreenReader.cancel(result.id);

// Cancel all pending announcements
await ScreenReader.cancelAll();
```

## Announcement modes

### Calm mode (`calm: true`)

Navigation-aware. Waits for:
- Active navigation transitions to finish (1 s lock after screen change)
- The screen reader to have a focused element
- A 300 ms debounce to prevent overlap with focus changes

`ScreenReader.announce` always uses calm mode. The returned Promise resolves when the announcement is **actually fired**, not just enqueued.

### Direct mode (`calm: false`, default for `announce()`)

Posts immediately with the given speech attributes. On iOS, the Promise resolves when VoiceOver confirms speech finished (`status: 'spoken'`) or was interrupted (`status: 'fired'`). On Android, always resolves immediately with `status: 'fired'`.

## API

### `ScreenReader` namespace

| Function | Description |
| :-- | :-- |
| `ScreenReader.announce(message, options?)` | Calm-mode announcement. Navigation-aware, waits for transitions to settle. |
| `ScreenReader.cancel(id)` | Cancels the announcement with the given `id`. |
| `ScreenReader.cancelAll()` | Cancels all pending and active announcements. |

### Standalone functions

| Function | Description |
| :-- | :-- |
| `announce(message, options?)` | Posts an announcement. Direct mode by default unless `calm: true` is passed. |
| `cancel(id)` | Cancels the announcement with the given `id`. |
| `cancelAll()` | Cancels all pending and active announcements. |

### `AnnounceOptions`

| Option | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `priority` | `AnnouncePriority` | `'default'` | Controls urgency and queue insertion order. |
| `queue` | `boolean` | `true` | When `true`, waits for current speech before speaking. When `false`, may interrupt. |
| `calm` | `boolean` | `false` | Navigation-aware mode. Waits for transitions and a focused element before speaking. |
| `delayMs` | `number` | `0` | Explicit delay in ms before the announcement is posted. Ignored in calm mode. |
| `speech` | `SpeechOptions` | — | iOS-only speech characteristics. No-op on Android. |

### `AnnouncePriority`

| Value | Behaviour |
| :-- | :-- |
| `'low'` | Spoken only when the screen reader is fully idle. |
| `'default'` | Standard queued announcement. |
| `'high'` | May preempt lower-priority pending items. |

iOS 17+: maps to `UIAccessibilityPriority`.

### `SpeechOptions` (iOS only)

| Option | Type | Description |
| :-- | :-- | :-- |
| `language` | `string` | BCP-47 language tag (e.g. `'fr-FR'`). Defaults to the system language. |
| `pitch` | `number` | Voice pitch multiplier, range `0.0`–`2.0`. Default: `1.0`. |
| `spellOut` | `boolean` | Spell each character individually. Useful for codes, CAPTCHAs, or abbreviations. |
| `punctuation` | `boolean` | Read punctuation marks aloud (e.g. "comma", "period"). |
| `ipaNotation` | `string` | IPA pronunciation hint applied to the entire string. |

### `AnnouncementResult`

| Field | Type | Description |
| :-- | :-- | :-- |
| `id` | `string` | UUID assigned at enqueue time. Use it with `cancel()`. |
| `status` | `AnnounceStatus` | Outcome of the announcement. |

### `AnnounceStatus`

| Value | Description |
| :-- | :-- |
| `'spoken'` | VoiceOver confirmed full speech (iOS direct mode only). |
| `'fired'` | Posted to the screen reader; completion not confirmed. Always the case on Android. iOS calm mode resolves here once the service actually fires the announcement. |
| `'cancelled'` | Explicitly cancelled via `cancel()` or `cancelAll()`. |

## When to use

- After a form submission to confirm success or report an error
- When opening or closing a modal that isn't handled by `A11y.ScreenChange`
- For status updates that happen independently of navigation

## For navigation transitions

Prefer `A11y.ScreenChange` or `A11y.PaneTitle` for screen-change announcements — they integrate with the native accessibility transition system.

```tsx
// Prefer this for navigation
<A11y.ScreenChange title="Home Screen" displayed={isFocused} />

// Use announce for one-off status messages
ScreenReader.announce('Item added to cart');
```

## Related

- [A11y.PaneTitle / ScreenChange API reference](./A11yPaneTitle.md)
