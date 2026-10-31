# Instructions for coding agents

## Scope

This repository is the standalone **Bencica UI** Svelte 5 library. Read `README.md`, the relevant `docs/` reference, and component source before changing APIs. `src/lib/index.ts` is the public entry point.

Maintain the library-only shape. The owner explicitly removed the demo, tests, Playwright, Vite app tooling, and `index.html`. Do not reintroduce them unless the user asks. Keep temporary consumer apps and validation scripts outside this repository. Do not modify another application's files as part of library maintenance without a request.

## Code and dependencies

- Use Svelte 5 runes, typed props, snippets, native events, and type-only TypeScript in `.svelte` scripts. The build has no preprocessor.
- Use native HTML semantics. `Card` chooses div/link/button from its action; `StatusItem` uses a button only with `onclick`. Preserve keyboard, focus, accessible naming, and disabled behavior.
- Hover is reserved for actual actions. Static containers, forms, profiles, avatars, media surfaces, and passive statuses must not gain decorative hover.
- Preserve reduced-motion support, modal entry/exit, focus cycling/restoration, and reference-counted scroll locking. Keep modals mounted for closing transitions.
- Keep CSS tokens shared and components modular. Support Minecraft Regular, system fonts, and custom font scopes. Do not hardcode an application font in components.
- Keep Svelte as the only runtime peer dependency. Do not add analytics, network clients, app/service logic, or mandatory icon libraries.
- Use relative internal imports, category exports, and the documented root/CSS entry points. Do not introduce SvelteKit aliases or browser DOM access at module import.

## Documentation

Update README examples and the appropriate `docs/components.md`, `docs/theming.md`, or `docs/architecture.md` alongside changes. Document defaults, native attribute forwarding, snippet parameters, and relevant limitations accurately. Record meaningful changes in `CHANGELOG.md`. Preserve `FONT-NOTICE.md` and do not invent a license for bundled assets.

## Verification

Run `npm run check`, `npm run build`, and `npm pack --dry-run` for package/code changes. For affected runtime behavior or installation, validate with a separate consuming Svelte app outside this repository; verify SSR when relevant. Do not add a test runner or demo just to perform verification. Do not commit `dist/`, dependencies, archives, secrets, or validation output.

## Git and publishing

The intended remote is `https://github.com/haverfalat/bencica-ui`, with public visibility, explicitly authorized by the owner. Preserve that visibility and the package's `private: true` setting (which prevents npm registry publication). Keep `UNLICENSED` unless the owner requests a license change. Push or publish only within the user's authorized scope; npm registry publishing is intentionally disabled.
