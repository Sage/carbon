const defaultFocusableSelectors =
  'button:not([disabled]), [href], input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]';

const INTERVAL = 10;
const MAX_TIME = 100;

const setElementFocus = (element: HTMLElement) => {
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

const isRadio = (element: HTMLElement) => {
  return (
    element.hasAttribute("type") && element.getAttribute("type") === "radio"
  );
};

const getRadioElementToFocus = (groupName: string, shiftKey: boolean) => {
  const buttonsInGroup = document.querySelectorAll(
    `input[type="radio"][name="${groupName}"]`
  );
  const selectedButton = [...buttonsInGroup].find(
    (button) => (button as HTMLInputElement).checked
  );

  if (selectedButton) {
    return selectedButton as HTMLElement;
  }
  return buttonsInGroup[
    shiftKey ? buttonsInGroup.length - 1 : 0
  ] as HTMLElement;
};

const getNextElement = (
  element: HTMLElement,
  focusableElements: HTMLElement[],
  shiftKey: boolean
) => {
  const currentIndex = focusableElements.indexOf(element);

  if (currentIndex === -1) {
    // we're not currently on a focusable element - most likely because the focusableElements come from a different focus trap!
    // So we need to leave focus where it is.
    // The exception is when the focus is on the document body - perhaps because the previously-focused element was dynamically removed.
    // In that case focus the first element.
    if (element === document.body) {
      return focusableElements[0];
    }
    return element;
  }

  const increment = shiftKey ? -1 : 1;
  let nextIndex = currentIndex;
  let foundElement;

  while (!foundElement) {
    nextIndex += increment;
    if (nextIndex < 0) {
      nextIndex += focusableElements.length;
    }
    if (nextIndex >= focusableElements.length) {
      nextIndex -= focusableElements.length;
    }

    const nextElement = focusableElements[nextIndex];

    if (nextElement === element) {
      // guard in case there is only one focusable element (or only a single radio group) in the trap.
      // If this happens we don't want to freeze the browser by looping forever, and it's OK to just focus
      // the same element we're already on.
      // There is an exception though: if we're in a single radio group, we need to ensure we focus on
      // the correct one. This may not be "element" if it's not currently focused (due to the focus actually
      // being on a wrapper element and this function being called with the first/last element as "element").
      if (isRadio(element) && document.activeElement !== element) {
        return getRadioElementToFocus(
          element.getAttribute("name") as string,
          shiftKey
        );
      }
      return element;
    }

    if (isRadio(nextElement)) {
      // if we've reached a radio element we need to ensure we focus the correct button in its group
      const nextElementGroupName = nextElement.getAttribute("name") as string;

      if (isRadio(element)) {
        const groupName = element.getAttribute("name");

        // if the name is different we're in a new group so can focus the appropriate button in it*/
        if (nextElementGroupName !== groupName) {
          foundElement = getRadioElementToFocus(nextElementGroupName, shiftKey);
        }

        // otherwise we're still in the same radio group so need to continue the loop
      } else {
        // if we've moved into a radio group from a non-radio starting point, we still have to ensure we focus
        // the correct button in the group
        foundElement = getRadioElementToFocus(nextElementGroupName, shiftKey);
      }
    } else {
      // if we've reached a non-radio element, we can focus it with no issues
      foundElement = nextElement;
    }
  }

  return foundElement as HTMLElement;
};

export { defaultFocusableSelectors, getNextElement, setElementFocus };
