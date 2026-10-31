<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes, HTMLAnchorAttributes } from 'svelte/elements';
  type Props = Omit<HTMLAttributes<HTMLElement>, 'children' | 'onclick'> & {
    children?: Snippet;
    padding?: 'default' | 'none';
    href?: string;
    target?: HTMLAnchorAttributes['target'];
    rel?: string;
    onclick?: (event: MouseEvent) => void;
    disabled?: boolean;
  };
  let {
    children,
    padding = 'default',
    href,
    target,
    rel,
    onclick,
    disabled = false,
    class: className = '',
    ...rest
  }: Props = $props();
  let actionable = $derived(!!(href || onclick));
</script>

<svelte:element
  this={href ? 'a' : onclick ? 'button' : 'div'}
  class="card {className}"
  class:interactive={actionable}
  class:flush={padding === 'none'}
  type={onclick && !href ? 'button' : undefined}
  {href}
  target={href ? target : undefined}
  rel={href
    ? (rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined))
    : undefined}
  disabled={onclick && !href ? disabled : undefined}
  {onclick}
  {...rest}
>
  {@render children?.()}
</svelte:element>

<style>
  .card {
    --card-background: var(--surface);
    box-sizing: border-box;
    display: block;
    width: 100%;
    color: inherit;
    font: inherit;
    text-align: inherit;
    text-decoration: none;
    position: relative;
    min-width: 0;
    padding: var(--space-6);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--card-background);
    transition:
      border-color var(--transition),
      background var(--transition);
  }
  .interactive {
    cursor: pointer;
  }
  .interactive:focus-visible {
    outline: 2px solid var(--accent-1);
    outline-offset: 3px;
  }
  .interactive:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .interactive:hover:not(:disabled) {
    --card-background: color-mix(
      in srgb,
      var(--surface-hover) 35%,
      var(--surface)
    );
    border-color: color-mix(in srgb, var(--border-hover) 40%, var(--border));
  }
  @media (max-width: 600px) {
    .card {
      padding: var(--space-5);
    }
  }
  .card.flush {
    padding: 0;
    overflow: hidden;
  }
  @media (prefers-reduced-motion: reduce) {
    .card {
      transition: none;
    }
  }
</style>
