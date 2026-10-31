<script lang="ts">
  import Progress from '../feedback/Progress.svelte';
  import { formatTime } from '../utils/time.js';
  let {
    elapsedMs = 0,
    durationMs = 0,
    label = 'Playback progress',
  }: { elapsedMs?: number; durationMs?: number; label?: string } = $props();
  let duration = $derived(
    Number.isFinite(durationMs) ? Math.max(0, durationMs) : 0,
  );
  let elapsed = $derived(
    Number.isFinite(elapsedMs) ? Math.min(duration, Math.max(0, elapsedMs)) : 0,
  );
</script>

{#if duration > 0}<div class="playback">
    <span class="time">{formatTime(elapsed)}</span>
    <div class="bar">
      <Progress value={(elapsed / duration) * 100} {label} glow />
    </div>
    <span class="time">{formatTime(duration)}</span>
  </div>{/if}

<style>
  .playback {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
  }
  .time {
    font: 15px var(--font-pixel);
    color: var(--text-dim);
    flex-shrink: 0;
    min-width: 32px;
  }
  .bar {
    flex: 1;
    min-width: 0;
  }
</style>
