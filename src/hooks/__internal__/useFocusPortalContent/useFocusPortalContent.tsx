import { RefObject, useEffect } from "react";
import Events from "../../../__internal__/utils/helpers/events";
import { defaultFocusableSelectors } from "../../../__internal__/focus-trap/focus-trap-utils";

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

        if (target?.current === document.activeElement) {
          if (
            Events.isTabKey(ev) &&
            !Events.isShiftKey(ev) &&
            focusableElementsInContainer[0]
          ) {
            ev.preventDefault();
            focusableElementsInContainer[0]?.focus();
          }

          return;
        }

        /* istanbul ignore if */
        if (!focusableElementsInContainer.length) {
          return;
        }

        const lastElementFocused =
          focusableElementsInContainer[
            focusableElementsInContainer.length - 1
          ] === document.activeElement;
        const firstElementFocused =
          focusableElementsInContainer[0] === document.activeElement;

        if (Events.isTabKey(ev)) {
          // last element focused inside portal navigate to next element in DOM after the target/ trigger element
          if (lastElementFocused && !Events.isShiftKey(ev)) {
            ev.preventDefault();

            const allFocusableElements: HTMLElement[] = Array.from(
              document.querySelectorAll(defaultFocusableSelectors) ||
                /* istanbul ignore next */ [],
            );
            const filteredElements = allFocusableElements.filter(
              (el) => el === target.current || Number(el.tabIndex) !== -1,
            );
            const nextIndex = filteredElements.indexOf(target.current) + 1;

            focusCallback?.(ev);
            filteredElements[nextIndex]?.focus();

            return;
          }
          // first element focused inside portal navigate back to the target/ trigger element
          if (firstElementFocused && Events.isShiftKey(ev)) {
            ev.preventDefault();

            focusCallback?.(ev);

            /* istanbul ignore else */
            if (target.current !== document.activeElement) {
              target.current?.focus();
            }
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
