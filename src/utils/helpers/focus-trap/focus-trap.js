
function blockTabbing(ev) {
  if (ev.keyCode === 9) {
    ev.preventDefault();
  }
}

function trap(firstFocusableElement, lastFocusableElement, ev) {
  if (ev.key === 'Tab' || ev.keyCode === 9) {
    if (ev.shiftKey) /* shift + tab */ {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        ev.preventDefault();
      }
    } else if (document.activeElement === lastFocusableElement) {
      firstFocusableElement.focus();
      ev.preventDefault();
    }
  }
}
// eslint-disable-next-line max-len
const defaultFocusableSelectors = 'button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])';

const focusTrap = (element, fs = defaultFocusableSelectors) => {
  const focusableElements = element.querySelectorAll(fs);
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  if (focusableElements.length <= 0) {
    document.addEventListener('keydown', blockTabbing);
    return () => document.removeEventListener('keydown', blockTabbing);
  }

  const trapFn = trap.bind(null, firstFocusableElement, lastFocusableElement);
  document.addEventListener('keydown', trapFn);

  return () => {
    document.activeElement.blur();
    document.removeEventListener('keydown', trapFn);
  };
};

export default focusTrap;
