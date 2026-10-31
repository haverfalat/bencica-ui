<script lang="ts">
  import type { Snippet } from 'svelte';
  import Heading from '../typography/Heading.svelte';
  import Text from '../typography/Text.svelte';
  let {
    title,
    description = '',
    platforms = [],
    features,
    actions,
    children,
  }: {
    title: string;
    description?: string;
    platforms?: string[];
    features?: Snippet;
    actions?: Snippet;
    children?: Snippet;
  } = $props();
</script>

<article class="project">
  <div class="heading">
    <Heading level={3} size="title">{title}</Heading>{#if platforms.length}<span
        class="platforms">{platforms.join(', ')}</span
      >{/if}
  </div>
  {#if description}<Text>{description}</Text>{/if}{#if features}<div
      class="features"
    >
      {@render features()}
    </div>{/if}{@render children?.()}{#if actions}<div class="links">
      {@render actions()}
    </div>{/if}
</article>

<style>
  .project {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 18px;
    min-width: 0;
    width: 100%;
    padding: 20px;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface);
  }
  .heading {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px 16px;
  }
  .platforms {
    font: 0.7rem var(--font-mono);
    color: var(--text-dim);
  }
  .features {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: var(--text-dim);
    font: var(--text-sm)/1.6 var(--font-mono);
  }
  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding-top: 4px;
  }
  @media (max-width: 480px) {
    .project {
      padding: 16px;
    }
  }
</style>
