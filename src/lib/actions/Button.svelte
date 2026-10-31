<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { ButtonVariant, ButtonSize } from '../types.js';
  type Props = Omit<HTMLButtonAttributes, 'children'> & {
    children?: Snippet;
    variant?: ButtonVariant;
    size?: ButtonSize;
    ariaLabel?: string;
    selected?: boolean;
  };
  let {
    onclick,
    children,
    variant = 'default',
    size = 'default',
    disabled = false,
    ariaLabel,
    selected = false,
    type = 'button',
    class: className = '',
    ...rest
  }: Props = $props();
</script>

<button
  class="btn {variant} {className}"
  class:selected
  class:compact={size === 'small'}
  {type}
  {onclick}
  {disabled}
  aria-label={ariaLabel}
  {...rest}
>
  <span class="btn-face">
    {@render children?.()}
  </span>
</button>

<style>
  .btn,
  .btn-face {
    box-sizing: border-box;
  }
  .btn {
    background: var(--border-hover);
    border: none;
    border-radius: 4px;
    color: var(--text-dim);
    cursor: pointer;
    display: inline-flex;
    padding: 0;
    text-decoration: none;
    user-select: none;
    position: relative;
    font-family: var(--font-mono);
    flex-shrink: 0;
    -webkit-tap-highlight-color: transparent;
  }

  .btn-face {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 4px;
    color: var(--text);
    width: 100%;
    height: 100%;
    transform: translateY(calc(-1 * var(--button-depth)));
    transition:
      transform 0.12s ease,
      border-color var(--transition-fast),
      background var(--transition-fast),
      color var(--transition-fast);
  }

  .btn:hover:not(:disabled) .btn-face {
    border-color: var(--border-hover);
    background: var(--surface-hover);
    color: var(--text);
  }

  @media (hover: hover) {
    .btn:hover:not(:disabled) .btn-face {
      transform: translateY(calc(-1 * var(--button-hover-depth)));
    }
  }

  .btn:active:not(:disabled) .btn-face {
    transform: translateY(0px);
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn:focus-visible {
    outline: 2px solid var(--accent-1);
    outline-offset: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    .btn-face {
      transition: none;
    }
  }

  .default .btn-face {
    font-family: var(--font-mono);
    font-size: 13px;
    padding: 8px 16px;
  }

  .small .btn-face {
    font-family: var(--font-mono);
    font-size: 11px;
    padding: 4px 10px;
  }

  .next .btn-face {
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 700;
    padding: 10px 24px;
    color: var(--accent-1);
    border-color: var(--border);
  }

  .next:hover:not(:disabled) .btn-face {
    border-color: var(--accent-1);
  }

  .trigger {
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.04);
  }

  .trigger .btn-face {
    border-radius: 50%;
    width: 42px;
    height: 42px;
    font-family: var(--font-mono);
    font-size: 16px;
    padding: 0;
    border: 1px solid var(--border);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .trigger:hover:not(:disabled) .btn-face {
    border-color: var(--accent-1);
    color: var(--accent-1);
  }

  .projects,
  .projects .btn-face {
    border-radius: 999px;
  }

  .projects .btn-face {
    min-height: 46px;
    padding: 10px 18px;
    font-size: 14px;
    border-color: color-mix(in srgb, var(--accent-1) 45%, var(--border));
    box-shadow: var(--shadow-floating);
  }

  .projects .btn-face :global(svg) {
    color: var(--accent-1);
  }

  .icon .btn-face {
    width: 44px;
    height: 44px;
    color: var(--text-dim);
  }

  .icon.compact .btn-face {
    width: 28px;
    height: 28px;
  }

  .projects:hover:not(:disabled) .btn-face,
  .icon:hover:not(:disabled) .btn-face {
    border-color: var(--accent-1);
    color: var(--accent-1);
  }

  .tab,
  .tab .btn-face {
    border-radius: var(--radius-sm);
  }

  .tab .btn-face {
    font-size: 10px;
    font-weight: bold;
    padding: 3px 8px;
    color: var(--text-dim);
    background: var(--bg-subtle);
  }

  .tab.selected .btn-face {
    background: var(--surface);
    border-color: var(--border-hover);
    color: var(--text);
  }
</style>
