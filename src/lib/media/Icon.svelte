<script lang="ts">
 import type { SVGAttributes } from 'svelte/elements';
 type Props = Omit<SVGAttributes<SVGSVGElement>, 'path'> & { path: string; label?: string; size?: number };
 let { path, label, size = 20, class: className = '', ...rest }: Props = $props();
</script>
<svg class="icon {className}" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} {...rest}><path d={path} /></svg>
<style>.icon { flex-shrink: 0; opacity: 0.85; vertical-align: middle; }</style>
