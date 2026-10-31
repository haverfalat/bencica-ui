<script lang="ts">
 import type { Snippet } from 'svelte';
 import Avatar from './Avatar.svelte';
 let { title, subtitle = '', src = '', href, actions, children }: { title: string; subtitle?: string; src?: string; href?: string; actions?: Snippet; children?: Snippet } = $props();
</script>
<div class="media">
 <Avatar {src} alt={title} size={52} shape="square" fallback="♪" />
 <div class="info">{#if href}<a class="name" href={href} target="_blank" rel="noopener noreferrer">{title}</a>{:else}<span class="name">{title}</span>{/if}<span class="subtitle">{subtitle}</span>{@render children?.()}</div>
 {#if actions}<div class="actions">{@render actions()}</div>{/if}
</div>
<style>
 .media { box-sizing: border-box; display: flex; align-items: center; gap: 16px; min-width: 0; background: var(--bg-subtle); border: 1px solid var(--border-subtle); padding: 12px; border-radius: var(--radius-md); }
 .info { display: flex; flex-direction: column; gap: 3px; min-width: 0; flex: 1; }
 .name { font: 700 0.9rem/1.6 var(--font-mono); color: var(--text); text-decoration: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
 a.name:hover { color: var(--accent-1); } .subtitle { font: 0.78rem/1.6 var(--font-mono); color: var(--text-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .actions { display: flex; flex-shrink: 0; }
</style>
