<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  type Props = HTMLAttributes<HTMLDivElement> & {
    width?: string;
    height?: string;
    radius?: string;
  };
  let {
    width = '100%',
    height = '14px',
    radius = 'var(--radius-sm)',
    class: className = '',
    ...rest
  }: Props = $props();
</script>

<div
  class="skeleton shimmer {className}"
  style:width
  style:height
  style:border-radius={radius}
  aria-hidden="true"
  {...rest}
></div>

<style>
  .skeleton {
    background: rgba(255, 255, 255, 0.03);
    position: relative;
    overflow: hidden;
  }

  .shimmer::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.02) 20%,
      rgba(255, 255, 255, 0.05) 60%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: loading-shimmer 2s infinite;
    content: '';
  }

  @keyframes loading-shimmer {
    100% {
      transform: translateX(100%);
    }
  }
  .skeleton {
    flex-shrink: 0;
  }
  @media (prefers-reduced-motion: reduce) {
    .shimmer::after {
      animation: none;
    }
  }
</style>
