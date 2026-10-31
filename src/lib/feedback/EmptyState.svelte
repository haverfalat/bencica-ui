<script lang="ts">
  import type { Snippet } from 'svelte';
  import Heading from '../typography/Heading.svelte';
  import Text from '../typography/Text.svelte';
  let {
    title,
    description = '',
    icon,
    children,
  }: {
    title: string;
    description?: string;
    icon?: Snippet;
    children?: Snippet;
  } = $props();
</script>

<div class="empty">
  {#if icon}<div class="icon">{@render icon()}</div>{/if}<Heading
    level={3}
    size="section">{title}</Heading
  >{#if description}<Text>{description}</Text>{/if}{@render children?.()}
</div>

<style>
  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 32px 20px;
    border: 1px dashed var(--border);
    border-radius: var(--radius-md);
    text-align: center;
  }
  .icon {
    color: var(--text-muted);
  }
</style>
