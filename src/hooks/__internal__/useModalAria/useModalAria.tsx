import { useContext, useEffect } from "react";
import TopModalContext from "../../../components/carbon-provider/__internal__/top-modal.context";

export default function useModalAria(
  containerRef: React.RefObject<HTMLDivElement>,
) {
  const { topModal } = useContext(TopModalContext);
  const isTopModal = topModal?.contains(containerRef.current);

  useEffect(() => {
    // If this modal is not the top modal, do not process aria-hidden or inert attributes
    if (!isTopModal) {
      return () => {};
    }

    // Store original aria-hidden and inert values for elements that are not the top modal
    const originalValuesAsMap = new Map();

    // Function to hide all elements that are not the top modal
    const hideNonTopModalElements = (rootElement: HTMLElement) => {
      // If the root element has a data-not-inert attribute set to true, skip it
      if (rootElement.dataset.notInert === "true") {
        return;
      }

      // If the root element is not the top modal, hide it
      if (!rootElement.contains(topModal)) {
        // Store original aria-hidden and inert values
        originalValuesAsMap.set(rootElement, {
          "aria-hidden": rootElement.getAttribute("aria-hidden"),
          inert: rootElement.getAttribute("inert"),
        });

        // Blur the active element if it is inside the root element
        if (
          rootElement.contains(document.activeElement) &&
          document.activeElement instanceof HTMLElement
        ) {
          document.activeElement.blur();
        }

        // Set aria-hidden and inert attributes to hide the element
        rootElement.setAttribute("aria-hidden", "true");
        rootElement.setAttribute("inert", "");
      } else if (rootElement !== topModal) {
        // If the root element isn't the top modal, do not hide it, but still process its children
        Array.from(rootElement.children).forEach((node) => {
          // istanbul ignore else
          if (node instanceof HTMLElement) {
            hideNonTopModalElements(node);
          }
        });
      }
    };

    // Start hiding elements from the body
    hideNonTopModalElements(document.body);

    // Cleanup function to restore original aria-hidden and inert values
    return () => {
      originalValuesAsMap.forEach((values, element) => {
        if (values["aria-hidden"] === null) {
          element.removeAttribute("aria-hidden");
        } else {
          element.setAttribute("aria-hidden", values["aria-hidden"]);
        }

        if (values.inert === null) {
          element.removeAttribute("inert");
        } else {
          element.setAttribute("inert", values.inert);
        }
      });
    };
  }, [isTopModal, topModal]);

  return isTopModal;
}
