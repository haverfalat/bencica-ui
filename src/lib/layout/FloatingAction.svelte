<script lang="ts">
 import type { Snippet } from 'svelte';
 import type { HTMLAttributes } from 'svelte/elements';
 type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & { children?: Snippet; placement?: 'left' | 'right'; offset?: string };
 let { children, placement = 'right', offset = '14px', class: className = '', ...rest }: Props = $props();
</script>
<div class="floating {placement} {className}" style:--offset={offset} {...rest}>{@render children?.()}</div>
<style>.floating { position: fixed; bottom: calc(var(--offset) + env(safe-area-inset-bottom, 0px)); z-index: 50; display: flex; align-items: center; gap: 12px; }.left { left: calc(var(--offset) + env(safe-area-inset-left, 0px)); }.right { right: calc(var(--offset) + env(safe-area-inset-right, 0px)); }</style>
