/** Display a non-negative millisecond duration as m:ss. */
export function formatTime(milliseconds: number): string {
 const seconds = Number.isFinite(milliseconds) ? Math.max(0, Math.floor(milliseconds / 1000)) : 0;
 return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}
