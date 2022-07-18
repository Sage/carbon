const defaultFocusableSelectors =
  'button:not([disabled]), [href], input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]';

const waitForVisibleAndFocus = (element) => {
  const INTERVAL = 10;
  const MAX_TIME = 100;
  let timeSoFar = 0;

  const stylesMatch = () => {
    const actualStyles = window.getComputedStyle(element);
    return actualStyles.visibility === "visible";
  };

  const check = () => {
    /* istanbul ignore else */
    if (stylesMatch()) {
      element.focus();
    } else if (timeSoFar < MAX_TIME) {
      setTimeout(check, INTERVAL);
      timeSoFar += INTERVAL;
    }
    // just "fail" silently if maxTime exceeded - callback will never be called
  };

  check();
};

function setElementFocus(element) {
  if (typeof element === "function") {
    element();
  } else {
    const el = element.current || element;
    waitForVisibleAndFocus(el);
  }
}

const isRadio = (element) => {
  return (
    element.hasAttribute("type") && element.getAttribute("type") === "radio"
  );
};

const nextNonRadioElementIndex = (element, focusableElements) => {
  const currentIndex = focusableElements.indexOf(element);
  let nextIndex = currentIndex - 1;

  if (currentIndex === 0) return focusableElements.length - 1;

  const isNextRadio = isRadio(focusableElements[nextIndex]);

  if (isNextRadio) {
    nextIndex = nextNonRadioElementIndex(
      focusableElements[nextIndex],
      focusableElements
    );
  }

  return nextIndex;
};

export {
  defaultFocusableSelectors,
  nextNonRadioElementIndex,
  isRadio,
  setElementFocus,
};
