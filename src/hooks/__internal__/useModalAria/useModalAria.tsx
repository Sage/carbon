import { useContext, useEffect } from "react";
import TopModalContext from "../../../components/carbon-provider/__internal__/top-modal.context";

export default function useModalAria(
  containerRef: React.RefObject<HTMLDivElement>,
  hidden?: boolean,
) {
  const { topModal } = useContext(TopModalContext);
  const isTopModal = topModal?.contains(containerRef.current);

  useEffect(() => {
    const originalValues: {
      element: Element;
      "aria-hidden": string | null;
      inert: string | null;
    }[] = [];
    const hideNonTopModalElements = (rootElement: HTMLElement) => {
      if (hidden || rootElement.dataset.notInert === "true") {
        // stop recursing, and do nothing, if the container has the "data-not-inert" flag
        return;
      }
      if (!rootElement.contains(topModal)) {
        /* Only mark this element if it does not already have the data-modal-hidden attribute (prevents this instance of the hook marking elements already marked by other instances).
        Without this check, separate instances of useModalAria can cause two critical problems:
        1) During opening: One instance might redundantly mark elements already marked by another instance, 
        then capture the already-modified state as the "original" state to restore later.
        2) During closing: One instance might restore elements that another instance still needs to keep hidden,
        or another instance might blindly restore elements to the incorrectly state, leaving everything inert + aria-hidden even when all modals are closed.
        This prevents both issues by ensuring only the first instance to encounter an element takes ownership of managing it. */
        if (!rootElement.hasAttribute("data-modal-hidden")) {
          originalValues.push({
            element: rootElement,
            "aria-hidden": rootElement.getAttribute("aria-hidden"),
            inert: rootElement.getAttribute("inert"),
          });
          // need to manually call the blur event on any currently-focused element that might be inside the element
          // we're making inert, since Firefox fails to do this, which can result in the focus styles remaining on
          // an input that is no longer focused
          if (
            rootElement.contains(document.activeElement) &&
            document.activeElement instanceof HTMLElement
          ) {
            document.activeElement.blur();
          }
          rootElement.setAttribute("aria-hidden", "true");
          rootElement.setAttribute("inert", "");
          rootElement.setAttribute("data-modal-hidden", "true");
        }
      } else if (rootElement !== topModal) {
        Array.from(rootElement.children).forEach((node) => {
          // istanbul ignore else
          if (node instanceof HTMLElement) {
            hideNonTopModalElements(node);
          }
        });
      }
    };

    if (isTopModal) {
      hideNonTopModalElements(document.body);
    }

    return () =>
      originalValues.forEach(
        ({ element, "aria-hidden": ariaHidden, inert }) => {
          if (ariaHidden === null) {
            element.removeAttribute("aria-hidden");
          } else {
            element.setAttribute("aria-hidden", ariaHidden);
          }
          if (inert === null) {
            element.removeAttribute("inert");
          } else {
            element.setAttribute("inert", inert);
          }
          element.removeAttribute("data-modal-hidden");
        },
      );
  }, [topModal, isTopModal]);

  return isTopModal;
}
