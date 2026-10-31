<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & { children?: Snippet; sidebar?: Snippet; maxWidth?: string };
  let { children, sidebar, maxWidth = 'var(--content-width)', class: className = '', ...rest }: Props = $props();
</script>
<div class="shell {className}" {...rest}>
  <div class="grid" class:with-sidebar={!!sidebar} style:max-width={maxWidth}>
    {#if sidebar}<aside class="sidebar">{@render sidebar()}</aside>{/if}
    <main class="content">{@render children?.()}</main>
  </div>
</div>
<style>
 .shell { box-sizing: border-box; min-height: 100vh; min-height: 100dvh; display: flex; justify-content: center; padding: 24px 12px calc(88px + env(safe-area-inset-bottom, 0px)); }
 .grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 24px; width: 100%; align-items: start; align-content: start; }
 .sidebar { display: flex; flex-direction: column; gap: 24px; align-items: center; text-align: center; min-width: 0; }
 .content { display: flex; flex-direction: column; gap: 20px; min-width: 0; }
 @media (min-width: 900px) { .shell { padding: 80px 40px; } .with-sidebar { grid-template-columns: 340px minmax(0, 1fr); gap: 72px; } .sidebar { position: sticky; top: 80px; align-items: stretch; text-align: left; } }
</style>
