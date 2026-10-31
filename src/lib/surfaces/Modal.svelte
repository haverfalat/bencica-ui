<script lang="ts">
  import type { Snippet } from 'svelte';
  import Button from '../actions/Button.svelte';
  import Heading from '../typography/Heading.svelte';
  import { lockScroll } from '../utils/scroll-lock.js';
  type Props = {
    title: string;
    open?: boolean;
    onclose?: () => void;
    children?: Snippet;
    footer?: Snippet;
    maxWidth?: string;
    closeOnBackdrop?: boolean;
    closeLabel?: string;
    class?: string;
  };
  let {
    title,
    open = $bindable(true),
    onclose,
    children,
    footer,
    maxWidth = '520px',
    closeOnBackdrop = true,
    closeLabel = 'Close',
    class: className = '',
  }: Props = $props();
  let dialog: HTMLDialogElement;
  const id = $props.id();
  function close() {
    if (!open) return;
    open = false;
    onclose?.();
  }
  $effect(() => {
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
      return lockScroll();
    }
    if (dialog.open) dialog.close();
  });
  function backdrop(event: MouseEvent) {
    if (!closeOnBackdrop || event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    )
      close();
  }
  function trapFocus(event: KeyboardEvent) {
    if (event.key !== 'Tab') return;
    const targets = Array.from(
      dialog.querySelectorAll<HTMLElement>(
        'a[href], button, input, select, textarea, [tabindex], [contenteditable="true"]',
      ),
    ).filter(
      (element) =>
        element.tabIndex >= 0 &&
        !element.matches(':disabled') &&
        element.getClientRects().length > 0,
    );
    const first = targets[0];
    const last = targets[targets.length - 1];
    if (!first) {
      event.preventDefault();
      return;
    }
    if (
      event.shiftKey &&
      (document.activeElement === first || document.activeElement === dialog)
    ) {
      event.preventDefault();
      last.focus();
    } else if (
      !event.shiftKey &&
      (document.activeElement === last || document.activeElement === dialog)
    ) {
      event.preventDefault();
      first.focus();
    }
  }
</script>

<dialog
  bind:this={dialog}
  class="modal {className}"
  aria-labelledby={`${id}-title`}
  style:--modal-width={maxWidth}
  onclick={backdrop}
  onkeydown={trapFocus}
  oncancel={(event) => {
    event.preventDefault();
    close();
  }}
  onclose={close}
>
  <div class="window">
    <header>
      <Heading level={2} size="title" id={`${id}-title`}>{title}</Heading
      ><Button variant="icon" onclick={close} ariaLabel={closeLabel}
        ><svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg
        ></Button
      >
    </header>
    <div class="body">{@render children?.()}</div>
    {#if footer}<footer>{@render footer()}</footer>{/if}
  </div>
</dialog>

<style>
  .modal {
    box-sizing: border-box;
    width: min(var(--modal-width), calc(100% - 40px));
    max-width: none;
    max-height: calc(100dvh - 40px);
    margin: auto;
    padding: 0;
    border: 1px solid var(--border-hover);
    border-radius: var(--radius-md);
    background: var(--bg-subtle);
    color: var(--text);
    box-shadow: var(--shadow-modal);
    overflow: hidden;
  }
  .modal {
    opacity: 0;
    transform: translateY(12px) scale(0.97);
    transition:
      opacity var(--modal-close-duration) ease,
      transform var(--modal-close-duration) ease,
      display var(--modal-close-duration) allow-discrete,
      overlay var(--modal-close-duration) allow-discrete;
  }
  .modal[open] {
    display: flex;
    opacity: 1;
    transform: translateY(0) scale(1);
    transition-duration: var(--modal-open-duration);
    transition-timing-function: var(--modal-easing);
  }
  .modal::backdrop {
    background: transparent;
    transition:
      background-color var(--modal-close-duration) ease,
      display var(--modal-close-duration) allow-discrete,
      overlay var(--modal-close-duration) allow-discrete;
  }
  .modal[open]::backdrop {
    background: var(--overlay);
    transition-duration: var(--modal-open-duration);
  }
  @starting-style {
    .modal[open] {
      opacity: 0;
      transform: translateY(12px) scale(0.97);
    }
    .modal[open]::backdrop {
      background: transparent;
    }
  }
  .window {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 0;
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 18px;
    border-bottom: 1px dashed var(--border);
    background: var(--surface);
    flex-shrink: 0;
  }
  .body {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 24px;
    overflow-y: auto;
    overscroll-behavior: contain;
    min-height: 0;
  }
  .body > :global(*) {
    flex-shrink: 0;
  }
  footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 12px;
    padding: 14px 18px;
    border-top: 1px dashed var(--border);
    flex-shrink: 0;
  }
  @media (max-width: 480px) {
    .modal {
      width: calc(100% - 24px);
      max-height: calc(100dvh - 24px - env(safe-area-inset-bottom, 0px));
      margin: auto auto max(12px, env(safe-area-inset-bottom, 0px));
      border-radius: 8px 8px 0 0;
    }
    .body {
      padding: 20px 16px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .modal,
    .modal[open],
    .modal::backdrop,
    .modal[open]::backdrop {
      transition: none;
      transform: none;
    }
  }
</style>
