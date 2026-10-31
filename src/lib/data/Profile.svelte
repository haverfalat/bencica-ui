<script lang="ts">
 import Avatar from '../media/Avatar.svelte';
 import Heading from '../typography/Heading.svelte';
 import Text from '../typography/Text.svelte';
 import type { Snippet } from 'svelte';
 let { name, tagline = '', src = '', size = 80, children }: { name: string; tagline?: string; src?: string; size?: number; children?: Snippet } = $props();
</script>
<div class="profile"><div class="info"><Avatar {src} alt={name} {size} /><div class="text"><Heading>{name}</Heading><Text>{tagline}</Text></div></div>{@render children?.()}</div>
<style>
 .profile { box-sizing: border-box; display: flex; flex-direction: column; gap: 20px; width: 100%; padding: 24px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md); }
 .info { display: flex; flex-direction: column; align-items: center; gap: 20px; min-width: 0; } .text { display: flex; flex-direction: column; align-items: center; gap: 6px; min-width: 0; }
 @media (min-width: 900px) { .info { flex-direction: row; } .text { align-items: flex-start; } }
</style>
