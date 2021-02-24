const defaultFocusableSelectors =
  'button:not([disabled]), [href], input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]';

function setElementFocus(element) {
  if (typeof element === "function") {
    element();
  } else {
    const el = element.current || element;
    el.focus();
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
