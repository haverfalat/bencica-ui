# Component reference

All imports below come from `bencica-ui`. The implementation uses Svelte 5 runes, `Snippet` props, and native events such as `onclick`. Exported `.d.ts` files provide the exact attribute and event types.

Unless stated otherwise, `children` is an optional `Snippet`. An empty string default means the prop may be omitted. Props listed as **required** must be provided.

## Native attributes and composition

`Button`, `LinkButton`, `Card`, `CardHeader`, `CardBody`, `CardFooter`, `PageShell`, `Stack`, `Grid`, `Divider`, `Input`, `Textarea`, `Badge`, `Progress`, `Skeleton`, `Avatar`, `Icon`, and `FloatingAction` accept `class` and their declared native HTML/SVG attributes. Known component props are consumed; remaining attributes are forwarded to the root element.

`Modal` and `StatusItem` accept `class` but have a narrower explicit API. `Field`, `EmptyState`, `Profile`, `MediaItem`, `PlaybackProgress`, and `ProjectCard` accept only their documented props. Do not assume these patterns forward arbitrary HTML attributes.

## Actions

### Button

Native `<button>`, with a raised face and a stable base. Default `type` is `button`.

| Prop | Default | Values / purpose |
| --- | --- | --- |
| `variant` | `default` | `default`, `small`, `next`, `trigger`, `projects`, `icon`, `tab` |
| `size` | `default` | `default`, `small`; compact sizing affects `icon` |
| `selected` | `false` | Selected styling for `tab`; does not set ARIA state |
| `disabled` | `false` | Native disabled behavior; suppresses hover |
| `ariaLabel` | unset | Convenience alias for `aria-label` |
| `type` | `button` | Native button type; use `submit` explicitly in forms |
| `children` | unset | Button content |

| Variant | Appearance | Hover |
| --- | --- | --- |
| `default` | 13px type, 8px × 16px padding | Lighter surface and border |
| `small` | 11px type, 4px × 10px padding | Lighter surface and border |
| `next` | 14px bold accent text, 10px × 24px padding | Accent border |
| `trigger` | 42px circular face | Accent text/icon and border |
| `projects` | Pill, minimum 46px face height | Accent text/icon and border |
| `icon` | 44px square face; 28px with `size="small"` | Accent text/icon and border |
| `tab` | 10px bold type, compact padding | Lighter surface and border |

All enabled variants sit 2px above the base, lift to 3px with a hover-capable pointer, and press down to 0px. Theme tokens control the depths. Reduced-motion preferences remove the transitions.

```svelte
<Button onclick={save}>Save</Button>
<Button type="submit" disabled={saving}>Submit</Button>
<Button variant="icon" size="small" ariaLabel="Listening history" onclick={showHistory}>
  {@render historyIcon()}
</Button>
<Button variant="tab" selected={active} aria-pressed={active} onclick={select}>NP3</Button>
```

Provide an accessible name for icon-only buttons. The `tab` variant is a visual primitive, not a full ARIA tabs widget; the consuming app owns tab roles, panels, and arrow-key navigation when needed.

### LinkButton

Native `<a>` with the same physical raised/pressed interaction.

| Prop | Default | Purpose |
| --- | --- | --- |
| `variant` | `default` | `default`, `primary`, `icon` |
| `href` | unset | Native link destination |
| `target`, `rel` | unset | For `_blank`, defaults `rel` to `noopener noreferrer` |
| `children` | unset | Link content |

Use links for navigation and buttons for actions. Supply `href` to make a navigable link; there is no disabled-link API.

## Surfaces

### Card

| Prop | Default | Purpose |
| --- | --- | --- |
| `padding` | `default` | `default` or `none` |
| `href` | unset | Render an `<a>` |
| `onclick` | unset | Without `href`, render a `<button type="button">` |
| `target`, `rel` | unset | Forwarded only for link cards; `_blank` gets a safe default `rel` |
| `disabled` | `false` | Native disabling for button cards only |
| `children` | unset | Content |

Without a destination or action, renders a static `<div>` with no hover. `href` takes precedence over `onclick` when choosing the element; the event can still observe a link click. `disabled` does not disable link cards. Static padding is 24px, reduced to 20px at widths of 600px and below. `padding="none"` removes padding and clips content to the corners.

```svelte
<Card><Text>A static content container.</Text></Card>
<Card href="/projects">Open projects →</Card>
<Card onclick={() => detailsOpen = true}>Open details</Card>
```

Action cards receive subtle hover and focus feedback. Keep cards containing forms or separate buttons/links static. There is no `interactive` prop: the action determines the behavior.

### CardHeader, CardBody, CardFooter

Separate native `<div>` primitives for flush cards. All accept `children` and native div attributes. `CardHeader` also accepts an optional `actions` snippet. Headers and footers have dashed separators; the header shares its enclosing card's surface. `CardBody` supplies 24px padding. The footer aligns its content toward the end and wraps when needed.

```svelte
<Card padding="none">
  <CardHeader>
    <Heading level={2} size="section">Title</Heading>
    {#snippet actions()}<Button variant="small" onclick={open}>Details</Button>{/snippet}
  </CardHeader>
  <CardBody><Text>Content</Text></CardBody>
  <CardFooter><Text size="xs">Metadata</Text></CardFooter>
</Card>
```

### Modal

Native `<dialog>` opened through `showModal()`.

| Prop | Default | Purpose |
| --- | --- | --- |
| `title` | **required** | Accessible title and visible heading |
| `open` | `true` | Bindable visibility; initialize your bound state to `false` |
| `onclose` | unset | Notification for a user/native close request |
| `maxWidth` | `520px` | CSS width cap |
| `closeOnBackdrop` | `true` | Close on clicks outside the dialog bounds |
| `closeLabel` | `Close` | Accessible name of the close icon button |
| `children` | unset | Scrollable body |
| `footer` | unset | Optional footer snippet |
| `class` | empty | Extra dialog classes |

```svelte
<script>
  import { Button, Modal, Text } from 'bencica-ui';
  let open = $state(false);
</script>
<Button onclick={() => open = true}>Open</Button>
<Modal title="Details" bind:open>
  <Text>Dialog content.</Text>
  {#snippet footer()}<Button onclick={() => open = false}>Done</Button>{/snippet}
</Modal>
```

Focus remains inside the dialog; Escape, the close button, and optional backdrop clicks close it. The browser restores focus to the opener. The background scroll lock is reference counted for stacked dialogs. On narrow screens (480px and below), the dialog sits near the bottom with safe-area spacing.

Opening takes 360ms and closing 240ms by default, including the backdrop. Keep the component mounted and control `open` for the exit transition; immediately unmounting it prevents that animation. Reduced-motion preferences disable transitions. Browsers without discrete CSS dialog-transition support may close without the exit effect; native dialog behavior still applies.

User close requests set `open = false` and call `onclose`. Setting the bound state to `false` from outside closes it without a separate callback. The default `open=true` also supports conditional rendering, when a closing animation is not needed.

## Layout

| Component | Props and defaults | Behavior |
| --- | --- | --- |
| `PageShell` | `sidebar?: Snippet`, `children`, `maxWidth="var(--content-width)"` | Root div, optional aside and one main element. At 900px+, 340px sidebar and 72px column gap; otherwise stacked. |
| `Stack` | `direction="vertical"`, `gap="4"`, `align="stretch"`, `justify="start"`, `wrap=false`, `children` | Flex layout. Direction: `vertical` / `horizontal`; align: `stretch` / `start` / `center` / `end`; justify: `start` / `center` / `end` / `space-between`. |
| `Grid` | `minColumnWidth="240px"`, `gap="4"`, `children` | Auto-fit columns; minimum column width is capped at container width. |
| `Divider` | Native `<hr>` attributes | 1px separator. |
| `FloatingAction` | `placement="right"`, `offset="14px"`, `children` | Fixed bottom-left/right container, safe-area offsets, z-index 50. |

`gap` uses the `Space` string union: `"0"`, `"1"`, `"2"`, `"3"`, `"4"`, `"5"`, `"6"`, `"8"`, `"12"`. These map to the spacing tokens. `PageShell` contains `<main>`; use it once for the main page rather than nesting it inside another main landmark.

```svelte
<PageShell>
  {#snippet sidebar()}<Profile name="Bence" tagline="Personal site" />{/snippet}
  <Grid minColumnWidth="220px" gap="4">
    <Card>First</Card><Card>Second</Card>
  </Grid>
</PageShell>
```

## Typography

### Heading

`level=1` accepts `1` through `6`. `size="display"` accepts `display`, `title`, or `section`; semantic level and visual size are independent. `children` is optional. Display size is 2.6rem (2.2rem at 600px and below), title 1.4rem, and section 1rem. Uses `--font-pixel`, which follows the chosen font preset rather than forcing a pixel typeface.

### Text

`as="p"` accepts `p`, `span`, or `div`. `tone="dim"` accepts `default`, `dim`, `muted`, or `accent`. `size="sm"` accepts `xs`, `sm`, or `base`. Uses `--font-body` and a 1.4 line height.

```svelte
<Heading level={2} size="title">Section</Heading>
<Text>Supporting text</Text>
<Text as="span" size="xs" tone="muted">Metadata</Text>
```

## Forms

### Field

| Prop | Default | Purpose |
| --- | --- | --- |
| `id`, `label` | **required** | Control ID and associated visible label |
| `hint`, `error` | empty | Description; error takes precedence and uses `role="alert"` |
| `required` | `false` | Visual required marker; also set native `required` on the control |
| `children` | **required** | `Snippet<[{ id, describedby, invalid }]>` |

The snippet receives `id`, optional `describedby` (the generated description ID), and `invalid` (whether an error is present). Forward these to the actual control.

```svelte
<script>
  import { Field, Input } from 'bencica-ui';
  let name = $state('');
</script>
<Field id="name" label="Name" hint="Public display name" required>
  {#snippet children({ id, describedby, invalid })}
    <Input {id} bind:value={name} aria-describedby={describedby} {invalid} required />
  {/snippet}
</Field>
```

### Input

Bindable `value` defaults to `''`; `type` defaults to `text`; `invalid` defaults to `false` and sets `aria-invalid`. Supports native input attributes and events except native `size`, which is deliberately omitted. Provide a label through `Field`, a native label, or `aria-label`. Native `type="number"` bindings follow Svelte's numeric/empty-value behavior; use a compatible number/undefined state.

### Textarea

Bindable `value` defaults to `''`, `rows=4`, `invalid=false`. Native textarea attributes and events are forwarded. Vertically resizable. Required, disabled, form association, validation, and submission remain native/application responsibilities.

## Feedback

| Component | Props and defaults | Behavior |
| --- | --- | --- |
| `Badge` | `tone="neutral"`, `dot=false`, `children` | Tones: `neutral`, `accent`, `success`, `warning`, `danger`. Optional decorative dot. |
| `Progress` | `value=0`, `label="Progress"`, `height="4px"`, `color="var(--accent-1)"`, `glow=false` | Value is a percentage, clamped to 0–100; non-finite values become zero. Exposes `role="progressbar"` and ARIA values. |
| `Skeleton` | `width="100%"`, `height="14px"`, `radius="var(--radius-sm)"` | Decorative, `aria-hidden`, shimmer disabled for reduced motion. |
| `EmptyState` | `title` **required**, `description=''`, `icon?: Snippet`, `children` | Dashed static container with optional icon and action content. |

```svelte
<Badge tone="success" dot>Online</Badge>
<Progress value={67} label="Battery level" color="var(--accent-2)" />
<Skeleton width="150px" height="12px" />
<EmptyState title="No history" description="Your recent items will appear here.">
  <Button onclick={refresh}>Refresh</Button>
</EmptyState>
```

## Media

### Avatar

`src=''`, `alt='Avatar'`, `size=80` (pixels), `fallback='?'`, `shape='circle'` (`circle` / `square`). Shows the fallback when the source is missing or fails to load. A changed source resets the failure state. Image and fallback use the supplied accessible name. Static surface with no hover effect.

### Icon

`path` is **required**. `size=20`, optional `label`. Renders a filled SVG path in a `0 0 24 24` viewBox using `currentColor`. Without a label it is decorative; with a label it has an image role and accessible name. Native SVG props are forwarded.

This primitive is for supplied filled icon paths. For stroked icons, use a component from the icon library chosen by the consuming app directly inside a button or snippet. The package does not bundle an external icon library.

### MediaItem

`title` is **required**; `subtitle=''`, `src=''`, optional `href`, `actions` snippet, and `children`. Composes a 52px square Avatar, a truncating title/subtitle, and optional actions. With `href`, the title is an external link (`target="_blank"`, safe `rel`); the container stays static. The placeholder is `♪`.

### PlaybackProgress

`elapsedMs=0`, `durationMs=0`, `label='Playback progress'`. Renders elapsed/total `m:ss` times and a glowing progress bar only for a finite positive duration. Clamps elapsed time to the duration. The consuming app owns timing; no hidden clock, polling, or playback integration is included.

## Data patterns

### StatusItem

`title` is **required**. `value=''`, optional `icon` snippet, `children`, `onclick`, `clickHint=''`, and `class`.

Without `onclick`, renders a static div. With `onclick`, renders a native button with subtle accent hover and keyboard focus feedback. A nonempty `clickHint` is rendered only for the actionable version. It slides upward into view on hover/focus and stays visible on touch screens. Keep its text short. `children` is rendered inside the value span; use inline content there, not nested controls.

```svelte
<StatusItem title="Device" value="NP3" />
<StatusItem title="Battery" value="67%" clickHint="Open details" onclick={openBattery}>
  {#snippet icon()}{@render batteryIcon()}{/snippet}
</StatusItem>
```

### Profile

`name` is **required**; `tagline=''`, `src=''`, `size=80`, optional `children`. Composes Avatar, a level-1 display Heading, and Text in a static profile surface. Changes from a centered column to a row at 900px. Supply your own image URL; no personal image or service integration is built in. Since the pattern includes an h1, use it where that heading level fits your page.

### ProjectCard

`title` is **required**; `description=''`, `platforms=[]`, optional `features`, `actions`, and `children` snippets. Static `<article>` with a level-3 title, platform metadata, descriptive text, optional feature list content, and wrapping action row.

```svelte
<ProjectCard title="My project" description="What it does." platforms={['Web', 'Mobile']}>
  {#snippet features()}<span>Live updates</span><span>Offline access</span>{/snippet}
  {#snippet actions()}<LinkButton href="/project">Open project →</LinkButton>{/snippet}
</ProjectCard>
```

## Utility and types

`formatTime(milliseconds: number): string` formats a duration as `m:ss`, allowing minute values above 59. Negative and non-finite inputs become `0:00`.

```ts
import { formatTime } from 'bencica-ui';
import type { ButtonVariant, ButtonSize, Tone, Space } from 'bencica-ui';

formatTime(61000); // '1:01'
```

`ButtonVariant` and `ButtonSize` match the button tables; `Tone` is the Badge tone union; `Space` is the layout spacing union. Scroll locking and numeric clamping are internal utilities, not public exports.
