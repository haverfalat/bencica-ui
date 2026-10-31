# Contributing

## Setup

```sh
npm ci
npm run check
npm run build
```

`npm ci` runs `prepare` and creates `dist/`. `npm run watch` rebuilds it as library source changes. The repository intentionally contains no application, HTML entry point, test suite, or browser automation. Develop visual behavior in a separate consuming Svelte app.

## Component changes

1. Put each component in the appropriate `src/lib/<category>/` directory. Keep one clear responsibility per file.
2. Use Svelte 5 runes, type-only TypeScript in component scripts, semantic native HTML, typed attributes, and standard events. Use `Snippet` for composition and `$bindable` for consumer-owned values.
3. Keep reusable primitives open to native attributes and `class`. Keep composed patterns explicit; document any forwarding differences.
4. Reuse theme tokens for colors, typography, spacing, corners, and motion. Preserve the existing dark visual language and both system/custom and Minecraft font support.
5. Hover must indicate a real action. Static forms, content cards, profiles, media containers, and status values stay still. Whole-card actions must remain native links/buttons. Disabled controls must not advertise active hover.
6. Keep API clients, analytics, app routes, personal data, and service-specific behavior in consuming applications. The only runtime peer is Svelte; consumers can supply their own icon components through snippets.
7. Export a new component through its category `index.ts`; the root re-exports categories. Keep the package export map intentional.
8. Update `docs/components.md` for API changes, `docs/theming.md` for theme changes, and `CHANGELOG.md` for meaningful behavior changes. Keep README examples working and current.

## Validation

```sh
npm run check
npm run build
npm pack --dry-run
```

Review the package contents: declarations, CSS, the font asset, and documentation should be included; dependencies, credentials, generated app output, and unrelated files should not be included. For a package or interaction change, install the archive in an external consuming app and verify the affected behavior. Check keyboard focus, reduced motion, touch hints, narrow layouts, and SSR when relevant.

Do not commit `dist/`, `node_modules/`, package archives, local environment files, or temporary validation apps. The source and lockfile must be enough for `npm ci` to rebuild a fresh checkout.

## Distribution

`haverfalat/bencica-ui` is a private repository. This package is `private: true` and `UNLICENSED`; Git/archive installation is supported, npm registry publication is disabled. Do not change repository visibility, choose a new source license, or alter the third-party font's licensing metadata as a routine maintenance step.
