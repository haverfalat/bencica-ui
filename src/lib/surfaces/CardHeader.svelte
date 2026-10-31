<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    children?: Snippet;
    actions?: Snippet;
  };
  let { children, actions, class: className = '', ...rest }: Props = $props();
</script>

<div class="part {className}" {...rest}>
  <div class="heading">{@render children?.()}</div>
  {#if actions}<div class="actions">{@render actions()}</div>{/if}
</div>

<style>
  .part {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--space-3);
    padding: 14px 18px;
    background: var(--card-background, var(--surface));
    border-bottom: 1px dashed var(--border);
    transition: background var(--transition);
  }
  @media (prefers-reduced-motion: reduce) {
    .part {
      transition: none;
    }
  }
  .heading {
    min-width: 0;
    overflow-wrap: anywhere;
  }
  .actions {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }
</style>
