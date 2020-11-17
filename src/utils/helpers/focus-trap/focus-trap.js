function blockTabbing(ev) {
  if (ev.key === "Tab") {
    ev.preventDefault();
  }
}

function setElementFocus(element) {
  if (typeof element === "function") {
    element();
  } else {
    element.focus();
  }
}

function trap(firstFocusableElement, lastFocusableElement, bespokeTrap, ev) {
  if (bespokeTrap) {
    bespokeTrap(ev, firstFocusableElement, lastFocusableElement);
    return;
  }

  if (ev.key === "Tab") {
    if (ev.shiftKey) {
      /* shift + tab */ if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        ev.preventDefault();
      }
    } else if (document.activeElement === lastFocusableElement) {
      setElementFocus(firstFocusableElement);
      ev.preventDefault();
    }
  }
}

// eslint-disable-next-line max-len
const defaultFocusableSelectors =
  'button, [href], input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])';

const focusTrap = (
  element,
  autoFocus = true,
  focusFirstElement,
  bespokeTrap
) => {
  const focusableElements = element.querySelectorAll(defaultFocusableSelectors);
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  if (focusableElements.length <= 0) {
    document.addEventListener("keydown", blockTabbing);
    return () => document.removeEventListener("keydown", blockTabbing);
  }

  if (autoFocus) {
    setElementFocus(focusFirstElement || firstFocusableElement);
  }

  const trapFn = trap.bind(
    null,
    firstFocusableElement,
    lastFocusableElement,
    bespokeTrap
  );
  document.addEventListener("keydown", trapFn);

  return () => {
    document.activeElement.blur();
    document.removeEventListener("keydown", trapFn);
  };
};

export default focusTrap;
