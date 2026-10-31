# Architecture and integration

## Repository layout

```text
bencica-ui/
  AGENTS.md
  README.md
  CONTRIBUTING.md
  CHANGELOG.md
  FONT-NOTICE.md
  docs/
    components.md
    theming.md
    architecture.md
  src/lib/
    actions/       Button, LinkButton
    surfaces/      Card, CardHeader, CardBody, CardFooter, Modal
    layout/        PageShell, Stack, Grid, Divider, FloatingAction
    typography/    Heading, Text
    forms/         Field, Input, Textarea
    feedback/      Badge, Progress, Skeleton, EmptyState
    media/         Avatar, Icon, MediaItem, PlaybackProgress
    data/          StatusItem, Profile, ProjectCard
    styles/        CSS entry points and fonts/
    utils/         Numeric clamping, time formatting, scroll locking
    index.ts       Public runtime/type exports
    types.ts       Shared prop unions
  package.json
  package-lock.json
  svelte.config.js
  tsconfig.json
```

This is a library-only repository. There is no application router, demo, HTML entry point, test suite, Playwright dependency, Vite configuration, or hosted preview. Examples live in Markdown. Use a separate consuming Svelte app for interactive development.

## Boundaries

Primitives own presentation and native interaction. Composed patterns assemble primitives through props and snippets. The library does not fetch data, run analytics, manage secrets, own navigation, or integrate with music, battery, transport, or profile services. `PlaybackProgress` receives elapsed/duration values rather than owning a clock. Project and profile content is provided by consumers.

Components never require SvelteKit aliases such as `$lib` or `$app`. Internal modules use relative imports. An application can use SvelteKit, plain Svelte with a compatible bundler, or another Svelte-aware setup.

## Public API

`src/lib/index.ts` re-exports each category's `index.ts`. The package root exposes all 28 components, `formatTime`, and the shared `ButtonVariant`, `ButtonSize`, `Tone`, and `Space` types. Only these package paths are supported:

```text
bencica-ui
bencica-ui/styles.css
bencica-ui/theme.css
bencica-ui/base.css
bencica-ui/font.css
```

Category and utility directories are implementation details, even though they appear in `dist/`. Do not deep-import them from consuming apps. CSS is marked as having side effects so bundlers retain explicitly imported styles; unused component exports can be tree-shaken.

## Package generation

`@sveltejs/package` reads `src/lib` and generates `dist/`:

- Svelte components, preserving Svelte 5's native type-only TypeScript support.
- JavaScript built from `.ts` modules.
- Generated `.d.ts` declarations beside components and modules.
- CSS and font assets, preserving their relative URLs.

The Svelte configuration is intentionally empty. No app bundler or TypeScript preprocessor is needed for the type-only syntax used here. Avoid TypeScript features requiring runtime transpilation inside component scripts unless the build strategy is deliberately changed.

`prepare` builds the package for source/Git installs. `prepack` checks and rebuilds it before creating an archive. `files` includes `dist/`, documentation, the changelog, and the font notice. npm automatically includes `README.md` and `package.json`; contributor/agent instructions remain repository documents. Build output, dependencies, environment files, and archives are ignored by Git.

The repository and package are private. `private: true` prevents npm registry publication while still allowing authenticated Git installation and local archive installation. Keep GitHub visibility private unless the owner explicitly requests otherwise.

## SSR and browser behavior

Components can be imported and rendered during SSR. Browser-only modal work runs inside effects; no DOM access happens at module import. Unique dialog title IDs use `$props.id()`. Supply deterministic initial state for hydration.

A `Modal` without a bound visibility value defaults to open when mounted in the browser. For normal application use, initialize `let open = $state(false)` and pass `bind:open`. Keep the component mounted while changing the flag for exit animation.

The native dialog provides top-layer behavior and opener focus restoration. Additional Tab handling keeps focus cycling inside; background scroll locks are reference counted for stacked dialogs. Focusable content should have normal native semantics. The component has no portal dependency.

Modern CSS features include custom properties, `color-mix`, safe-area environment variables, and dynamic viewport units. Dialog transitions additionally use `@starting-style` and `allow-discrete` for `display` and `overlay`. If those transition features are unsupported, exit motion may be absent; the native dialog itself is still required. Components honor reduced-motion preferences.

## Accessibility responsibilities

The library uses native buttons, anchors, form controls, landmarks, and dialogs. Consumers still provide meaningful headings and accessible labels, connect field descriptions, avoid nested interactive controls, and choose appropriate `Profile`/`ProjectCard` heading placement. `Button variant="tab"` styles a choice; it does not implement a full tablist/panel interaction model.

Static containers have no hover response. Whole-card actions render as native buttons or links, rather than clickable divs. Icons without labels and skeletons are decorative. Touch users see actionable status hints without needing a hover state.

## Validation

Run `npm run check`, `npm run build`, and `npm pack --dry-run`. For changes to interactivity or packaging, install an archive or Git checkout in a separate consuming Svelte app and verify the affected behavior, types, and SSR there. Temporary validation applications belong outside this repository. This keeps the package independent of demo/test tooling.
