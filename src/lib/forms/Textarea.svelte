<script lang="ts">
  import type { HTMLTextareaAttributes } from 'svelte/elements';
  type Props = HTMLTextareaAttributes & { invalid?: boolean };
  let {
    value = $bindable(''),
    rows = 4,
    invalid = false,
    class: className = '',
    ...rest
  }: Props = $props();
</script>

<textarea
  class="input {className}"
  class:invalid
  bind:value
  {rows}
  aria-invalid={invalid || undefined}
  {...rest}></textarea>

<style>
  .input {
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    padding: 10px 12px;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--bg-subtle);
    color: var(--text);
    font: 13px/1.6 var(--font-mono);
    resize: vertical;
    transition: border-color var(--transition);
  }
  .input::placeholder {
    color: var(--text-muted);
  }
  .input:hover:not(:disabled) {
    border-color: var(--border-hover);
  }
  .input:focus {
    border-color: var(--accent-1);
    outline: 2px solid color-mix(in srgb, var(--accent-1) 25%, transparent);
    outline-offset: 2px;
  }
  .input.invalid {
    border-color: var(--danger);
  }
  .input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  @media (prefers-reduced-motion: reduce) {
    .input {
      transition: none;
    }
  }
</style>
