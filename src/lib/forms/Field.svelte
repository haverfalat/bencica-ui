<script lang="ts">
 import type { Snippet } from 'svelte';
 type Props = { id: string; label: string; hint?: string; error?: string; required?: boolean; children: Snippet<[{ id: string; describedby: string | undefined; invalid: boolean }]> };
 let { id, label, hint = '', error = '', required = false, children }: Props = $props();
 let descriptionId = $derived(error || hint ? `${id}-description` : undefined);
</script>
<div class="field">
 <label for={id}>{label}{#if required}<span aria-hidden="true"> *</span>{/if}</label>
 {@render children({ id, describedby: descriptionId, invalid: !!error })}
 {#if error}<p id={descriptionId} class="error" role="alert">{error}</p>{:else if hint}<p id={descriptionId}>{hint}</p>{/if}
</div>
<style>
 .field { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
 label { font: 12px var(--font-mono); color: var(--text-dim); }
 label span, .error { color: var(--danger); }
 p { margin: 0; font: 11px/1.4 var(--font-mono); color: var(--text-muted); }
</style>
