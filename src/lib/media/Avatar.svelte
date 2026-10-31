<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  type Props = HTMLAttributes<HTMLDivElement> & {
    src?: string;
    alt?: string;
    size?: number;
    fallback?: string;
    shape?: 'circle' | 'square';
  };
  let {
    src = '',
    alt = 'Avatar',
    size = 80,
    fallback = '?',
    shape = 'circle',
    class: className = '',
    ...rest
  }: Props = $props();
  let failed = $state(false);
  $effect(() => {
    src;
    failed = false;
  });
</script>

<div
  class="avatar {shape} {className}"
  style:width={`${size}px`}
  style:height={`${size}px`}
  {...rest}
>
  {#if src && !failed}<img
      {src}
      {alt}
      onerror={() => (failed = true)}
    />{:else}<span role="img" aria-label={alt}>{fallback}</span>{/if}
</div>

<style>
  .avatar {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
    border: 1px solid var(--border);
    background: var(--bg-subtle);
  }
  .circle {
    border-radius: 50%;
  }
  .square {
    border-radius: var(--radius-sm);
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  span {
    font: 24px var(--font-pixel);
    color: var(--text-dim);
    opacity: 0.5;
  }
</style>
