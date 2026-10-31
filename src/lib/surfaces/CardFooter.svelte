<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    children?: Snippet;
  };
  let { children, class: className = '', ...rest }: Props = $props();
</script>

<div class="part {className}" {...rest}>{@render children?.()}</div>

<style>
  .part {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: var(--space-3);
    padding: 14px 18px;
    border-top: 1px dashed var(--border);
  }
</style>
