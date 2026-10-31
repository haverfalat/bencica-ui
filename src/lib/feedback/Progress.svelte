<script lang="ts">
 import type { HTMLAttributes } from 'svelte/elements';
 import { clampProgress } from '../utils/numbers.js';
 type Props = HTMLAttributes<HTMLDivElement> & { value?: number; label?: string; height?: string; color?: string; glow?: boolean };
 let { value = 0, label = 'Progress', height = '4px', color = 'var(--accent-1)', glow = false, class: className = '', ...rest }: Props = $props();
 let percent = $derived(clampProgress(value));
</script>
<div class="track {className}" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} style:height style:--fill={color} {...rest}>
 <div class="fill" class:glow style:width={`${percent}%`}></div>
</div>
<style>
 .track { width: 100%; background: rgba(255,255,255,0.04); border-radius: var(--radius-sm); overflow: hidden; position: relative; }
 .fill { height: 100%; border-radius: inherit; background: var(--fill); transition: width 0.3s ease; }
 .glow { box-shadow: 0 0 8px var(--fill); opacity: 0.9; }
 @media (prefers-reduced-motion: reduce) { .fill { transition: none; } }
</style>
