<script lang="ts">
  import type { Snippet } from 'svelte';
  type Props = {
    title: string;
    value?: string;
    icon?: Snippet;
    children?: Snippet;
    onclick?: (event: MouseEvent) => void;
    clickHint?: string;
    class?: string;
  };
  let {
    title,
    value = '',
    icon,
    children,
    onclick,
    clickHint = '',
    class: className = '',
  }: Props = $props();
</script>

{#snippet content()}
  {#if icon}<span class="icon">{@render icon()}</span>{/if}
  <span class="details"
    ><span class="title">{title}</span><span class="value"
      >{value}{@render children?.()}</span
    ></span
  >
  {#if clickHint && onclick}<span class="hint">{clickHint}</span>{/if}
{/snippet}
{#if onclick}<button type="button" class="item clickable {className}" {onclick}
    >{@render content()}</button
  >{:else}<div class="item {className}">{@render content()}</div>{/if}

<style>
  .item {
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    min-width: 0;
    text-align: left;
    background: var(--bg-subtle);
    border: 1px solid var(--border-subtle);
    padding: 12px 16px;
    border-radius: var(--radius-md);
    color: var(--text);
    transition:
      border-color var(--transition),
      background var(--transition);
  }
  .clickable {
    cursor: pointer;
    overflow: hidden;
  }
  .clickable:hover {
    background: color-mix(in srgb, var(--accent-1) 5%, var(--bg-subtle));
    border-color: color-mix(in srgb, var(--accent-1) 50%, var(--border));
  }
  .clickable:focus-visible {
    outline: 2px solid var(--accent-1);
    outline-offset: 3px;
  }
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--accent-1);
    flex-shrink: 0;
  }
  .details {
    display: flex;
    flex-direction: column;
    min-width: 0;
    flex: 1;
  }
  .title {
    font: 600 var(--text-xs)/1.6 var(--font-mono);
    color: var(--text-dim);
  }
  .value {
    font: var(--text-sm)/1.6 var(--font-mono);
    color: var(--text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .hint {
    position: absolute;
    bottom: 4px;
    right: 8px;
    font: 9px var(--font-mono);
    color: var(--text-dim);
    opacity: 0;
    transform: translateY(5px);
    transition:
      opacity 180ms ease,
      transform 220ms ease;
    pointer-events: none;
  }
  .clickable:hover .hint,
  .clickable:focus-visible .hint {
    opacity: 0.85;
    transform: translateY(0);
  }
  @media (hover: none) {
    .clickable .hint {
      opacity: 0.75;
      transform: none;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .item,
    .hint {
      transition: none;
    }
    .hint {
      transform: none;
    }
  }
</style>
