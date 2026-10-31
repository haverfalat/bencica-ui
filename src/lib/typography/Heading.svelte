<script lang="ts">
 import type { Snippet } from 'svelte';
 import type { HTMLAttributes } from 'svelte/elements';
 type Props = Omit<HTMLAttributes<HTMLHeadingElement>, 'children'> & { children?: Snippet; level?: 1 | 2 | 3 | 4 | 5 | 6; size?: 'display' | 'title' | 'section' };
 let { children, level = 1, size = 'display', class: className = '', ...rest }: Props = $props();
</script>
<svelte:element this={`h${level}`} class="heading {size} {className}" {...rest}>{@render children?.()}</svelte:element>
<style>
 .heading { margin: 0; font-family: var(--font-pixel); font-weight: normal; color: var(--text); overflow-wrap: anywhere; }
 .display { font-size: var(--text-display); line-height: 1; letter-spacing: 0.04em; }
 .title { font-size: 1.4rem; line-height: 1.2; letter-spacing: 0.05em; }
 .section { font-size: 1rem; line-height: 1.4; }
 @media (max-width: 600px) { .display { font-size: 2.2rem; } }
</style>
