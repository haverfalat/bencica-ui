# Theming and fonts

## Stylesheet entry points

```js
import 'bencica-ui/styles.css';
```

The combined stylesheet imports, in order, `font.css`, `theme.css`, and `base.css`. Components do not automatically import the theme or reset; the application decides which global styles to load.

For an app with its own reset:

```js
import 'bencica-ui/theme.css';
import 'bencica-ui/font.css'; // only when using the bundled font
```

For a system-font-only app:

```js
import 'bencica-ui/theme.css';
import 'bencica-ui/base.css'; // optional
```

The optional base stylesheet resets margins/padding and box sizing globally, styles `body` with the dark theme and 14px type, and adds scrollbar, selection, native control font, and focus defaults. Omit it when the host application already owns those choices. Component styles remain scoped.

## Fonts

### Minecraft Regular

The actual bundled asset is `MinecraftRegular-Bmg3.otf`, loaded locally under the font-family **Minecraft Regular**. It is the font used by the original site, not a new custom typeface. There are no font-CDN requests.

```svelte
<div data-bencica-font="minecraft">
  <Heading>Minecraft Regular</Heading>
  <Text>The same font is used for body text and controls.</Text>
</div>
```

Import `font.css` or the combined `styles.css` to make the asset available. Without the font stylesheet, the Minecraft stack falls back to monospace.

### Normal system font

```svelte
<div data-bencica-font="system">
  <Heading>Normal system typography</Heading>
  <Button>System font</Button>
</div>
```

Uses `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`. To select it globally, place this after the theme import:

```css
:root { --font-family: var(--font-system); }
```

Font scopes include all descendant components, including native dialog content. Presets can be nested. A `data-bencica-theme` scope resets the theme's default tokens, including the font family; set the desired font preset on that scope if needed.

### Your own font

Load your own font through the host application's stylesheet or `@font-face`, then set the family:

```css
:root { --font-family: 'Inter', sans-serif; }
```

Or scope it to a region:

```svelte
<div data-bencica-font="custom" style="--font-family: 'Your Font', sans-serif;">
  <Heading>Custom type</Heading>
  <Button>Custom font</Button>
</div>
```

The `data-bencica-font` attribute re-evaluates the font aliases inside that scope. Use the `custom` value with a local `--font-family` override; merely changing the underlying variable on an arbitrary descendant does not re-evaluate aliases already inherited from an ancestor.

The legacy `--font-ndot` variable is an alias, not a bundled Ndot font. `--font-sans`, `--font-body`, `--font-mono`, and `--font-pixel` follow it by default. They are semantic roles: selecting a system font also changes the pixel/mono roles. Override the role itself if you intentionally want mixed typography:

```css
:root {
  --font-family: var(--font-system);
  --font-pixel: 'Minecraft Regular', monospace;
}
```

See [FONT-NOTICE.md](../FONT-NOTICE.md) for the bundled asset's provenance and licensing status.

## Theme scopes

The default tokens are declared on `:root` and `[data-bencica-theme]`. Override them after the theme import for a global change:

```css
:root { --accent-1: #a78bfa; --radius-md: 6px; }
```

Or use a local theme:

```svelte
<div data-bencica-theme data-bencica-font="system" style="--accent-1: #e879f9; --radius-md: 6px;">
  <Button variant="next">Local accent</Button>
</div>
```

A theme scope defines component tokens; it does not itself paint a page background. Apply `background: var(--bg); color: var(--text)` to your own wrapper when building an embedded themed region.

## Token reference

The values below match `src/lib/styles/theme.css`.

### Color and surfaces

| Token | Default |
| --- | --- |
| `--bg` | `#0d0d0f` |
| `--bg-subtle` | `#09090b` |
| `--surface` | `#16161a` |
| `--surface-hover` | `#1c1c22` |
| `--border` | `rgba(255, 255, 255, 0.08)` |
| `--border-subtle` | `rgba(255, 255, 255, 0.1)` |
| `--border-hover` | `rgba(255, 255, 255, 0.15)` |
| `--text` | `#f0f0f2` |
| `--text-dim` | `#a1a1aa` |
| `--text-muted` | `#52525b` |
| `--accent-1` | `#3b82f6` |
| `--accent-2` | `#10b981` |
| `--danger` | `#ff7070` |
| `--warning` | `#fbbf24` |
| `--overlay` | `rgba(4, 4, 5, 0.85)` |

### Shape, spacing, and layout

| Token | Default |
| --- | --- |
| `--radius-sm` | `2px` |
| `--radius-md` | `4px` |
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-5` | `20px` |
| `--space-6` | `24px` |
| `--space-8` | `32px` |
| `--space-12` | `48px` |
| `--content-width` | `1050px` |

`gap="0"` maps directly to zero, without a `--space-0` token. Breakpoints are component CSS rules (480px, 600px, 900px), not configurable theme variables.

### Typography

| Token | Default |
| --- | --- |
| `--font-family` | `'Minecraft Regular', monospace` |
| `--font-system` | `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| `--font-ndot` | `var(--font-family)` |
| `--font-sans`, `--font-body`, `--font-mono`, `--font-pixel` | `var(--font-ndot)` |
| `--text-xs` | `0.72rem` |
| `--text-sm` | `0.85rem` |
| `--text-base` | `14px` |
| `--text-display` | `2.6rem` |

### Motion and elevation

| Token | Default |
| --- | --- |
| `--button-depth` | `2px` |
| `--button-hover-depth` | `3px` |
| `--shadow-floating` | `0 4px 20px rgba(0, 0, 0, 0.35)` |
| `--shadow-modal` | `0 10px 30px rgba(0, 0, 0, 0.5)` |
| `--modal-open-duration` | `360ms` |
| `--modal-close-duration` | `240ms` |
| `--modal-easing` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--transition` | `0.15s ease` |
| `--transition-fast` | `0.08s ease` |

Modal entry and exit include a subtle translation, scale, opacity, and backdrop transition. Keep the modal mounted to see the exit. Reduced-motion preferences remove the component transitions and skeleton shimmer.

## Interaction rules

A surface is not an action. Static cards, forms, media containers, profiles, avatars, and status values remain still. Only a whole-card `href` or `onclick` enables card hover. A clickable `StatusItem` uses a 5% accent tint and a soft accent border; its hint is readable on hover/focus and visible on touch screens. Card headers inherit the enclosing card's surface so composed sections stay consistent.

The internal `--card-background` variable coordinates card sections; it is not a public theme token. Prefer the documented surface tokens for application theming.
