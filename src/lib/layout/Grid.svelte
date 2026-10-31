<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Space } from '../types.js';
  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    children?: Snippet;
    minColumnWidth?: string;
    gap?: Space;
  };
  let {
    children,
    minColumnWidth = '240px',
    gap = '4',
    class: className = '',
    ...rest
  }: Props = $props();
</script>

<div
  class="grid {className}"
  style:--column-min={minColumnWidth}
  style:gap={gap === '0' ? '0' : `var(--space-${gap})`}
  {...rest}
>
  {@render children?.()}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(min(100%, var(--column-min)), 1fr)
    );
    min-width: 0;
    align-items: start;
  }
</style>
