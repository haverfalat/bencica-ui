<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Space } from '../types.js';
  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    children?: Snippet;
    gap?: Space;
    direction?: 'vertical' | 'horizontal';
    align?: 'stretch' | 'start' | 'center' | 'end';
    justify?: 'start' | 'center' | 'end' | 'space-between';
    wrap?: boolean;
  };
  let {
    children,
    gap = '4',
    direction = 'vertical',
    align = 'stretch',
    justify = 'start',
    wrap = false,
    class: className = '',
    ...rest
  }: Props = $props();
</script>

<div
  class="stack {className}"
  style:gap={gap === '0' ? '0' : `var(--space-${gap})`}
  style:flex-direction={direction === 'vertical' ? 'column' : 'row'}
  style:align-items={align}
  style:justify-content={justify}
  style:flex-wrap={wrap ? 'wrap' : 'nowrap'}
  {...rest}
>
  {@render children?.()}
</div>

<style>
  .stack {
    display: flex;
    min-width: 0;
  }
</style>
