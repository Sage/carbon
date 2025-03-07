type CustomRefObject<T> = {
  current?: T | null;
};

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
    `input[type="radio"][name="${groupName}"]`,
  );
  const selectedButton = [...buttonsInGroup].find(
    (button) => (button as HTMLInputElement).checked,
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
  shiftKey: boolean,
) => {
  const currentIndex = focusableElements.indexOf(element);

  if (currentIndex === -1) {
    // we're not currently on a focusable element - most likely because the focusableElements come from a different focus trap!
    // So we need to leave focus where it is.
    return undefined;
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
          shiftKey,
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

const onTabGuardFocus =
  (
    trapWrappers: CustomRefObject<HTMLElement>[],
    focusableSelectors: string | undefined,
    position: "top" | "bottom",
  ) =>
  (guardWrapperRef: CustomRefObject<HTMLElement>) =>
  () => {
    const isTop = position === "top";
    const currentIndex = trapWrappers.indexOf(guardWrapperRef);
    let index = currentIndex;
    let nextWrapper;
    let allFocusableElementsInNextWrapper: Element[] | undefined;

    /* istanbul ignore next */
    do {
      index += isTop ? -1 : 1;
      if (index < 0) {
        index += trapWrappers.length;
      }
      if (index >= trapWrappers.length) {
        index -= trapWrappers.length;
      }
      nextWrapper = trapWrappers[index];
      allFocusableElementsInNextWrapper = Array.from(
        nextWrapper?.current?.querySelectorAll(
          focusableSelectors || defaultFocusableSelectors,
        ) || /* istanbul ignore next */ [],
      ).filter((el) => Number((el as HTMLElement).tabIndex) !== -1);
    } while (
      index !== currentIndex &&
      !allFocusableElementsInNextWrapper?.length
    );

    const toFocus = allFocusableElementsInNextWrapper?.[
      isTop ? allFocusableElementsInNextWrapper.length - 1 : 0
    ] as HTMLElement;

    /* istanbul ignore next */
    if (isRadio(toFocus)) {
      const radioToFocus = getRadioElementToFocus(
        toFocus.getAttribute("name") as string,
        isTop,
      );
      setElementFocus(radioToFocus);
    } else {
      setElementFocus(toFocus);
    }
  };

const trapFunction = (
  ev: KeyboardEvent,
  defaultFocusableElements: HTMLElement[],
  isWrapperFocused: boolean,
  focusableSelectors?: string,
  bespokeTrap?: (
    event: KeyboardEvent,
    firstElement?: HTMLElement,
    lastElement?: HTMLElement,
  ) => void,
) => {
  const customFocusableElements = focusableSelectors
    ? defaultFocusableElements.filter((element) =>
        element.matches(focusableSelectors),
      )
    : defaultFocusableElements;

  const firstElement = customFocusableElements[0];
  const lastElement =
    customFocusableElements[customFocusableElements.length - 1];

  if (bespokeTrap) {
    bespokeTrap(ev, firstElement, lastElement);
    return;
  }

  if (ev.key !== "Tab") return;

  if (!customFocusableElements?.length) {
    /* Block the trap */
    ev.preventDefault();
    return;
  }

  const activeElement = document.activeElement as HTMLElement;

  // special case if focus is on document body
  if (activeElement === document.body) {
    ev.preventDefault();
    setElementFocus(firstElement as HTMLElement);
    return;
  }

  const elementWhenWrapperFocused = ev.shiftKey
    ? (firstElement as HTMLElement)
    : (lastElement as HTMLElement);

  const elementToFocus = getNextElement(
    isWrapperFocused ? elementWhenWrapperFocused : activeElement,
    customFocusableElements,
    ev.shiftKey,
  );

  const defaultNextElement = getNextElement(
    isWrapperFocused ? elementWhenWrapperFocused : activeElement,
    defaultFocusableElements as HTMLElement[],
    ev.shiftKey,
  );

  if (elementToFocus && elementToFocus !== defaultNextElement) {
    // if next element would match the custom selector anyway, then no need to prevent default
    setElementFocus(elementToFocus);
    ev.preventDefault();
  } else if (defaultNextElement) {
    ev.preventDefault();
    setElementFocus(defaultNextElement);
  }
};

export {
  defaultFocusableSelectors,
  getNextElement,
  setElementFocus,
  onTabGuardFocus,
  trapFunction,
};
