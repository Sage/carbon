import { RefObject, useEffect } from "react";
import Events from "../../../__internal__/utils/helpers/events";
import { defaultFocusableSelectors } from "../../../__internal__/focus-trap/focus-trap-utils";

export const nextElementToFocus = (
  target: HTMLElement,
  container: HTMLElement,
) => {
  const focusableElements: Element[] = Array.from(
    document.querySelectorAll(defaultFocusableSelectors) ||
      /* istanbul ignore next */ [],
  ).filter(
    (el) =>
      Number((el as HTMLElement).tabIndex) !== -1 &&
      !el.hasAttribute("data-focus-guard"),
  );
  const index = focusableElements.indexOf(target);
  const nextElementOutsideContainer = focusableElements
    .slice(index + 1)
    .find((el) => !container.contains(el));

  return nextElementOutsideContainer;
};

export default (
  container?: RefObject<HTMLElement>,
  target?: RefObject<HTMLElement>,
  focusCallback?: (ev: KeyboardEvent) => void,
) => {
  useEffect(() => {
    const handleFocusPortalContent = (ev: KeyboardEvent) => {
      if (container?.current && target?.current) {
        const focusableElementsInContainer: HTMLElement[] = Array.from(
          container.current?.querySelectorAll(defaultFocusableSelectors) ||
            /* istanbul ignore next */ [],
        );

        const filteredFocusableElements = focusableElementsInContainer.filter(
          (el) => Number(el.tabIndex) !== -1,
        );

        /* istanbul ignore if */
        if (!filteredFocusableElements.length) {
          return;
        }

        const lastElementFocused =
          filteredFocusableElements[filteredFocusableElements.length - 1] ===
          document.activeElement;
        const firstElementFocused =
          filteredFocusableElements[0] === document.activeElement;

        if (Events.isTabKey(ev)) {
          // last element focused inside portal navigate to next element in DOM after the target/ trigger element
          if (lastElementFocused && !Events.isShiftKey(ev)) {
            focusCallback?.(ev);
            /* istanbul ignore else */
            if (!nextElementToFocus(target.current, container.current)) {
              ev.preventDefault();
              target.current.focus();
            }

            return;
          }
          // first element focused inside portal navigate back to the target/ trigger element
          if (firstElementFocused && Events.isShiftKey(ev)) {
            focusCallback?.(ev);
          }
        }
      }
    };

    document.addEventListener("keydown", handleFocusPortalContent);

    return () => {
      document.removeEventListener("keydown", handleFocusPortalContent);
    };
  }, [target, container, focusCallback]);
};
