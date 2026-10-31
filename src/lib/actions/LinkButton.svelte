<script lang="ts">
 import type { Snippet } from 'svelte';
 import type { HTMLAnchorAttributes } from 'svelte/elements';
 type Props = Omit<HTMLAnchorAttributes, 'children'> & { children?: Snippet; variant?: 'default' | 'primary' | 'icon' };
 let { children, variant = 'default', target, rel, class: className = '', ...rest }: Props = $props();
</script>
<a class="link {variant} {className}" {target} rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)} {...rest}><span class="face">{@render children?.()}</span></a>
<style>
 .link, .face { box-sizing: border-box; border-radius: var(--radius-sm); }
 .link { display: inline-flex; padding: 0; background: var(--border-hover); color: var(--text-dim); text-decoration: none; font: 12px var(--font-mono); }
 .face { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 9px 12px; border: 1px solid var(--border); background: var(--surface); transform: translateY(calc(-1 * var(--button-depth))); transition: transform 0.12s ease, border-color var(--transition), color var(--transition), background var(--transition); }
 .primary .face { background: var(--bg-subtle); color: var(--text); } .icon .face { padding: 14px; }
 .link:hover .face { color: var(--accent-1); border-color: var(--accent-1); background: var(--surface-hover); }
 @media (hover: hover) { .link:hover .face { transform: translateY(calc(-1 * var(--button-hover-depth))); } }
 .link:active .face { transform: translateY(0); }
 .link:focus-visible { outline: 2px solid var(--accent-1); outline-offset: 4px; }
 @media (prefers-reduced-motion: reduce) { .face { transition: none; } }
</style>
