# Bencica UI

A modular Svelte 5 component library extracted from **bencica.hu**: dark surfaces, fine borders, compact corners, blue and green accents, and tactile buttons. Use the bundled **Minecraft Regular** font, normal system fonts, or your own typeface.

This public repository contains the library and documentation. It has no demo app, HTML entry point, test suite, browser automation, analytics, API integrations, or runtime icon dependency. Svelte is its only runtime peer dependency.

## Documentation

- [Component reference](docs/components.md) — all 28 components, props, defaults, snippets, and examples.
- [Theming and fonts](docs/theming.md) — CSS imports, every public theme token, font presets, and motion.
- [Architecture and integration](docs/architecture.md) — package layout, SSR, application responsibilities, and compatibility.
- [Contributing](CONTRIBUTING.md) — development and package validation.
- [Agent instructions](AGENTS.md) — repository rules for coding agents.
- [Changelog](CHANGELOG.md) and [font notice](FONT-NOTICE.md).

## Requirements

- Svelte `^5.46.4` and a Svelte-aware application bundler; SvelteKit is optional.
- Node `^20.19.0 || >=22.12.0` for development and source installation.
- A modern browser. Modals use native `<dialog>`; their exit transitions use CSS `@starting-style`, `overlay`, and discrete transitions.

## Installation

The repository is public. The package is not published to npm; install it directly from GitHub or a local checkout. GitHub authentication is not required for HTTPS installation.

### From GitHub

```sh
npm install git+https://github.com/haverfalat/bencica-ui.git
```

The `prepare` script builds `dist/` when npm installs from Git. For reproducible deployments, pin the Git dependency to a reviewed commit with `#<commit-sha>`.

### From a local checkout

```sh
git clone https://github.com/haverfalat/bencica-ui.git
cd bencica-ui
npm ci
npm run check
```

`npm ci` also runs `prepare`, generating `dist/`. In your consuming app:

```sh
npm install /absolute/path/to/bencica-ui
```

To install an archive instead, run `npm pack` in the checkout, then `npm install /path/to/bencica-ui-0.1.0.tgz` in the app. `npm pack` runs the type check and build automatically. `private: true` prevents npm registry publication; it does not prevent Git or archive installation.

## Quick start

Import styles once in your application entry point or SvelteKit root layout. The combined stylesheet includes the Minecraft font, theme tokens, and global base styles.

```svelte
<script>
  import 'bencica-ui/styles.css';
  import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Heading,
    Text,
    Button,
    Modal,
  } from 'bencica-ui';

  let open = $state(false);
</script>

<Card padding="none">
  <CardHeader>
    <Heading level={2} size="section">Recently Played</Heading>
    {#snippet actions()}
      <Button variant="small" onclick={() => (open = true)}>History</Button>
    {/snippet}
  </CardHeader>
  <CardBody>
    <Text>Content stays still. The History button advertises its action.</Text>
  </CardBody>
  <CardFooter>
    <Text size="xs">Your own data, composed with shared primitives.</Text>
  </CardFooter>
</Card>

<Modal title="Listening history" bind:open>
  <Text>Keep the modal mounted so its closing animation can finish.</Text>
  {#snippet footer()}
    <Button onclick={() => (open = false)}>Done</Button>
  {/snippet}
</Modal>
```

### Normal fonts or Minecraft Regular

```svelte
<div data-bencica-font="system">
  <Heading>Normal system font</Heading>
  <Button>System font throughout</Button>
</div>

<div data-bencica-font="minecraft">
  <Heading>Minecraft Regular</Heading>
</div>
```

For a system-font-only app, import `theme.css` and optionally `base.css` instead of `styles.css`; no font asset is then imported. Use a `data-bencica-font="system"` wrapper or set `:root { --font-family: var(--font-system); }` after importing the theme. Custom font families work through `--font-family` as well. See [fonts](docs/theming.md#fonts).

### Hover means an action

- `Card` is a static `<div>` by default. Forms, media containers, and content groups do not change on hover.
- `Card href="…"` becomes a native link; `Card onclick={…}` becomes a native button. These receive hover and focus feedback.
- `StatusItem` is static unless it has `onclick`. Action hints slide in on hover or keyboard focus and stay visible on touch screens.
- `Profile` and `Avatar` have no decorative hover.
- Buttons, links, and editable controls retain their own interaction feedback.

Keep a container static when it contains separate buttons or links. Do not nest controls inside a whole-card button or link.

## Components

| Group      | Exports                                                   |
| ---------- | --------------------------------------------------------- |
| Actions    | `Button`, `LinkButton`                                    |
| Surfaces   | `Card`, `CardHeader`, `CardBody`, `CardFooter`, `Modal`   |
| Layout     | `PageShell`, `Stack`, `Grid`, `Divider`, `FloatingAction` |
| Typography | `Heading`, `Text`                                         |
| Forms      | `Field`, `Input`, `Textarea`                              |
| Feedback   | `Badge`, `Progress`, `Skeleton`, `EmptyState`             |
| Media      | `Avatar`, `Icon`, `MediaItem`, `PlaybackProgress`         |
| Data       | `StatusItem`, `Profile`, `ProjectCard`                    |

The root also exports `formatTime` and the types `ButtonVariant`, `ButtonSize`, `Tone`, and `Space`. Import components from `bencica-ui`; internal category paths are not public package exports.

## Styles

| Import                  | Includes                                                            |
| ----------------------- | ------------------------------------------------------------------- |
| `bencica-ui/styles.css` | Font + theme + global base styles                                   |
| `bencica-ui/theme.css`  | Theme tokens and font preset selectors                              |
| `bencica-ui/base.css`   | Optional global reset, body styling, scrollbars, and focus defaults |
| `bencica-ui/font.css`   | Optional bundled Minecraft Regular `@font-face`                     |

Component styles are scoped. The optional base stylesheet is global. Import theme overrides after the library styles, and use `data-bencica-theme` for a local theme scope. See the [full token reference](docs/theming.md).

## Development

```sh
npm ci
npm run format       # write formatting, including .svelte files
npm run format:check
npm run check
npm run build
npm run watch  # rebuild the package as src/lib changes
npm pack --dry-run
```

`dist/` contains Svelte components, JavaScript utilities, generated TypeScript declarations, CSS, and the local font. Generated output and dependencies are not committed. Validate interactive changes in a consuming Svelte app; this repository intentionally has no bundled demo or test runner.

## License

`UNLICENSED`. The source repository is public; npm registry publication remains disabled with `private: true`. The bundled font remains a third-party asset; see [FONT-NOTICE.md](FONT-NOTICE.md). No new license is granted to it by this repository.
