let count = 0;
let previous = '';
/** Reference counted so stacked dialogs do not unlock each other's page. Browser only. */
export function lockScroll(): () => void {
  if (count++ === 0) {
    previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--count === 0) document.body.style.overflow = previous;
  };
}
