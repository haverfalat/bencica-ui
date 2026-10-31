<script lang="ts">
 import type { Snippet } from 'svelte';
 import type { HTMLAttributes } from 'svelte/elements';
 type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & { children?: Snippet;  };
 let { children, class: className = '', ...rest }: Props = $props();
</script>
<div class="part {className}" {...rest}>{@render children?.()}</div>
<style>
 .part { box-sizing: border-box; padding: var(--space-6); min-width: 0; }

</style>
