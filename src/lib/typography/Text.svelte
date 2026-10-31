<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  type Props = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    children?: Snippet;
    as?: 'p' | 'span' | 'div';
    tone?: 'default' | 'dim' | 'muted' | 'accent';
    size?: 'xs' | 'sm' | 'base';
  };
  let {
    children,
    as = 'p',
    tone = 'dim',
    size = 'sm',
    class: className = '',
    ...rest
  }: Props = $props();
</script>

<svelte:element this={as} class="text {tone} {size} {className}" {...rest}
  >{@render children?.()}</svelte:element
>

<style>
  .text {
    margin: 0;
    font-family: var(--font-body);
    line-height: 1.4;
    overflow-wrap: anywhere;
  }
  .default {
    color: var(--text);
  }
  .dim {
    color: var(--text-dim);
  }
  .muted {
    color: var(--text-muted);
  }
  .accent {
    color: var(--accent-1);
  }
  .xs {
    font-size: var(--text-xs);
  }
  .sm {
    font-size: var(--text-sm);
  }
  .base {
    font-size: var(--text-base);
  }
</style>
