<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  type Props = Omit<HTMLInputAttributes, 'size'> & { invalid?: boolean };
  let {
    value = $bindable(''),
    type = 'text',
    invalid = false,
    class: className = '',
    ...rest
  }: Props = $props();
</script>

<input
  class="input {className}"
  class:invalid
  {type}
  bind:value
  aria-invalid={invalid || undefined}
  {...rest}
/>

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
    font: 13px var(--font-mono);
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
