import { useContext, useEffect } from "react";
import TopModalContext from "../../../components/carbon-provider/top-modal-context";

export default function useModalAria(
  containerRef: React.RefObject<HTMLDivElement>
) {
  const { topModal } = useContext(TopModalContext);
  const isTopModal = topModal?.contains(containerRef.current);

  useEffect(() => {
    const originalValues: {
      element: Element;
      "aria-hidden": string | null;
      inert: string | null;
    }[] = [];
    const hideNonTopModalElements = (rootElement: Element) => {
      if (!rootElement.contains(topModal)) {
        originalValues.push({
          element: rootElement,
          "aria-hidden": rootElement.getAttribute("aria-hidden"),
          inert: rootElement.getAttribute("inert"),
        });
        // need to manually call the blur event on any currently-focused element that might be inside the element
        // we're making inert, since Firefox fails to do this, which can result in the focus styles remaining on
        // an input that is no longer focused
        if (rootElement.contains(document.activeElement)) {
          (document.activeElement as HTMLElement | null)?.blur();
        }
        rootElement.setAttribute("aria-hidden", "true");
        rootElement.setAttribute("inert", "");
      } else if (rootElement !== topModal) {
        Array.from(rootElement.children).forEach(hideNonTopModalElements);
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
        }
      );
  }, [topModal, isTopModal]);

  return isTopModal;
}
