# Roadmap

## Before 1.0.0 release

# Add Card
Add card for ios nested views order...

### Must fix
- [ ] Verify `A11y.View` works standalone (outside `A11y.Order`) on both architectures — it currently delegates to `A11yIndex` which reads the order context; confirm it degrades gracefully when context is absent
- [ ] Verify `IndexCommands` Proxy (`measure`, `measureInWindow`, etc.) works on Hermes — Proxy support landed in Hermes 0.11 / RN 0.64; add minimum RN version note if needed
- [ ] Confirm `autoFocus` works reliably on both old and new architecture on iOS and Android
- [ ] Confirm `descendantFocusChangedEnabled` + `onScreenReaderDescendantFocusChanged` fires correctly when nested views change focus
- [ ] Remove or export `A11yGroup` / `A11yUIContainer` deliberately — they are no longer in `src/index.ts` but the native components are still compiled; decide if they ship silently or get removed from native too

### Verification
- [ ] `yarn typecheck` passes clean
- [ ] `yarn lint` passes clean
- [ ] `yarn test` passes
- [ ] Build example app on iOS simulator (new arch + old arch)
- [ ] Build example app on Android emulator (new arch + old arch)
- [ ] Test Expo prebuild workflow
- [ ] Smoke test: `A11y.Order` + `A11y.Index` ordering
- [ ] Smoke test: `A11y.View` standalone focus events
- [ ] Smoke test: `A11y.FocusTrap` confines TalkBack and VoiceOver
- [ ] Smoke test: `A11y.ScreenChange` announces screen title on both platforms
- [ ] Smoke test: `autoFocus` moves focus on mount
- [ ] Smoke test: programmatic `ref.current.focus()` via button press

### Release housekeeping
- [ ] Bump version to `1.0.0` in `package.json`
- [ ] Write `CHANGELOG.md` — highlight: autoFocus, descendantFocusChanged, IndexCommands native methods, A11y.View semantic split
- [ ] Confirm `peerDependencies` range covers the minimum supported RN version
- [ ] Confirm `exports` map in `package.json` is correct for CJS / ESM / source
- [ ] Check ProGuard / R8 rules — `A11yFocusDelegate`, `A11yOrderService`, reflection-based nativeId lookup on Android
- [ ] Review all public exports from `src/index.ts` are intentional

---

## API ideas for post-1.0

### Naming simplification

The current event prop names are verbose and inconsistent between `A11y.Index` and `A11y.View`. Consider aligning them in a future major:

| Current | Proposed | Reason |
|---|---|---|
| `onScreenReaderSubViewFocused` | `onSubFocused` | Shorter, less repetition |
| `onScreenReaderSubViewBlurred` | `onSubBlurred` | — |
| `onScreenReaderSubViewFocusChange` | `onSubFocusChange` | — |
| `onScreenReaderFocused` | `onFocused` | Closer to native naming |
| `onScreenReaderDescendantFocusChanged` | `onDescendantFocusChange` | — |
| `a11yUIContainer` | `containerType` | Matches iOS API name, drops abbreviation |

### Component naming

| Current | Proposed | Reason |
|---|---|---|
| `A11y.FocusTrap` | `A11y.Trap` | Shorter, clearer intent |
| `A11y.FocusFrame` | `A11y.Frame` | — |
| `A11y.ScreenChange` | `A11y.Screen` | Less redundancy |
| `A11y.PaneTitle` | `A11y.Pane` | — |

### Merge `A11y.FocusFrame` into `A11y.FocusTrap`

`FocusFrame` and `FocusTrap` always appear together. Consider collapsing them:

```tsx
// Before
<A11y.FocusFrame>
  <A11y.FocusTrap>...</A11y.FocusTrap>
</A11y.FocusFrame>

// Proposed
<A11y.Trap root>   {/* root=true enables the leak-detection layer */}
  ...
</A11y.Trap>
```

### Hooks API

Expose a `useA11yFocus` hook for programmatic focus without needing a ref:

```tsx
const { ref, focus } = useA11yFocus();

return (
  <A11y.Order>
    <A11y.Index ref={ref} index={1}>
      <Text>Target</Text>
    </A11y.Index>
  </A11y.Order>
);
// focus() callable anywhere in the component
```

### `A11y.Announce` component

A declarative wrapper over `A11yModule.announce` — announces when it mounts or when `message` changes:

```tsx
<A11y.Announce message="Loading complete" />
```

### Required `index` with dev warning

`index` is currently optional but omitting it silently disables ordering. Consider a dev-mode warning when `A11y.Index` is inside an `A11y.Order` without an `index`.

### Easier ordering with `auto` index

Allow `index="auto"` to use DOM insertion order, removing the need to assign numbers manually for simple linear sequences:

```tsx
<A11y.Order>
  <A11y.Index>First</A11y.Index>   {/* auto: 0 */}
  <A11y.Index>Second</A11y.Index>  {/* auto: 1 */}
</A11y.Order>
```

### Keyboard focus command

Extend `IndexCommands` with a `keyboardFocus()` command (hardware keyboard / TV remote) alongside the existing `focus()` (screen reader focus):

```tsx
ref.current?.focus()          // screen reader
ref.current?.keyboardFocus()  // hardware keyboard
```

---

## Platform improvements

### Android
- Investigate whether `setAccessibilityTraversalBefore` (API 22) can be replaced with `setAccessibilityTraversalAfter` for a more natural link model
- Add an optional `orderGroup` auto-detection — use nearest `A11y.Order` ancestor without an explicit `orderKey` prop
- Profile `A11yLinkingQueue` under large lists (100+ items) — consider debouncing `WeakTreeMap` updates

### iOS
- Investigate replacing `UIAccessibilityLayoutChangedNotification` with `UIAccessibilityScreenChangedNotification` for more reliable focus on major transitions
- Expose `accessibilityActivate` as an optional override for custom activation behavior
- Consider `UIAccessibilityCustomAction` integration via `A11y.Index`

### Web
- Current web stubs are no-ops — consider a lightweight DOM-based ordering implementation using `tabIndex` and `aria-flowto`
