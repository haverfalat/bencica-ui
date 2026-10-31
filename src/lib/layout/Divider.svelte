<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  let { class: className = '', ...rest }: HTMLAttributes<HTMLHRElement> =
    $props();
</script>

<hr class="divider {className}" {...rest} />

<style>
  .divider {
    width: 100%;
    height: 1px;
    border: 0;
    margin: 0;
    background: var(--border-subtle);
    flex-shrink: 0;
  }
</style>
