
function blockTabbing(ev) {
  if (ev.keyCode === 9) {
    ev.preventDefault();
  }
}

function trap(firstFocusableElement, lastFocusableElement, ev) {
  if (ev.key === 'Tab' || ev.keyCode === 9) {
    if (ev.shiftKey) /* shift + tab */ {
      if (typeof firstFocusableElement === 'function') {
        ev.preventDefault();
        if (document.activeElement !== lastFocusableElement) {
          lastFocusableElement.focus();
        } else {
          firstFocusableElement();
        }
      } else if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        ev.preventDefault();
      }
    } else if (document.activeElement === lastFocusableElement) {
      if (typeof firstFocusableElement === 'function') {
        firstFocusableElement();
      } else {
        firstFocusableElement.focus();
      }
      ev.preventDefault();
    }
  }
}
// eslint-disable-next-line max-len
const defaultFocusableSelectors = 'button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])';

const focusTrap = (element, focusFirstElement) => {
  const focusableElements = element.querySelectorAll(defaultFocusableSelectors);
  let firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  if (focusFirstElement) {
    firstFocusableElement = focusFirstElement;
  }

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
