import { useContext, useEffect } from "react";
import TopModalContext from "../../../components/carbon-provider/__internal__/top-modal.context";

export default function useModalAria(
  containerRef: React.RefObject<HTMLDivElement>,
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
      if (rootElement.dataset.notInert === "true") {
        // stop recursing, and do nothing, if the container has the "data-not-inert" flag
        return;
      }
      if (!rootElement.contains(topModal)) {
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
        },
      );
  }, [topModal, isTopModal]);

  return isTopModal;
}
