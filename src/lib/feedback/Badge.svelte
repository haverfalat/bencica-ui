<script lang="ts">
 import type { Snippet } from 'svelte';
 import type { HTMLAttributes } from 'svelte/elements';
 import type { Tone } from '../types.js';
 type Props = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & { children?: Snippet; tone?: Tone; dot?: boolean };
 let { children, tone = 'neutral', dot = false, class: className = '', ...rest }: Props = $props();
</script>
<span class="badge {tone} {className}" {...rest}>{#if dot}<span class="dot" aria-hidden="true"></span>{/if}{@render children?.()}</span>
<style>
 .badge { display: inline-flex; align-items: center; gap: 6px; padding: 3px 8px; border: 1px solid color-mix(in srgb, var(--tone) 35%, var(--border)); border-radius: var(--radius-sm); color: var(--tone); background: color-mix(in srgb, var(--tone) 6%, var(--bg-subtle)); font: 11px var(--font-mono); white-space: nowrap; }
 .neutral { --tone: var(--text-dim); } .accent { --tone: var(--accent-1); } .success { --tone: var(--accent-2); } .warning { --tone: var(--warning); } .danger { --tone: var(--danger); }
 .dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
</style>
