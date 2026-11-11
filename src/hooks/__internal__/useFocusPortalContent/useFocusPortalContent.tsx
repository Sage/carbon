import { RefObject, useEffect } from "react";
import Events from "../../../__internal__/utils/helpers/events";
import { defaultFocusableSelectors } from "../../../__internal__/focus-trap/focus-trap-utils";

const isTabStop = (element: HTMLElement) => {
  if (
    element.tabIndex < 0 ||
    element.matches(":disabled") ||
    element.closest("[hidden], [inert]")
  ) {
    return false;
  }

  const { visibility } = getComputedStyle(element);
  if (visibility === "hidden" || visibility === "collapse") return false;

  // A child's computed display does not reflect a display:none ancestor.
  let ancestor: HTMLElement | null = element;
  while (ancestor) {
    if (getComputedStyle(ancestor).display === "none") return false;
    ancestor = ancestor.parentElement;
  }

  return true;
};

export const nextElementToFocus = (
  target: HTMLElement,
  container: HTMLElement,
  additionalContainers: HTMLElement[] = [],
) => {
  const focusableElements = Array.from(
    target.ownerDocument.querySelectorAll<HTMLElement>(
      defaultFocusableSelectors,
    ) || /* istanbul ignore next */ [],
  ).filter(
    (el) =>
      (el === target || isTabStop(el)) && !el.hasAttribute("data-focus-guard"),
  );
  const index = focusableElements.indexOf(target);
  const nextElementOutsideContainer = focusableElements
    .slice(index + 1)
    .find(
      (el) =>
        !container.contains(el) &&
        !additionalContainers.some((menu) => menu.contains(el)),
    );

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
          container.current?.querySelectorAll(defaultFocusableSelectors),
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
          // last element focused inside portal → move to the next element after the trigger
          if (lastElementFocused && !Events.isShiftKey(ev)) {
            focusCallback?.(ev);
            const next = nextElementToFocus(target.current, container.current);
            ev.preventDefault();
            ((next ?? target.current) as HTMLElement).focus();
            return;
          }
          // first element focused inside portal, shift+tab → back to the trigger
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
