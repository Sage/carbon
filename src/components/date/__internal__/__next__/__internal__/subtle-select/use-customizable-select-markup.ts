import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";

import { getWindow } from "../../../../../../__internal__/dom/globals";

const useIsomorphicLayoutEffect = getWindow() ? useLayoutEffect : useEffect;

const useCustomizableSelectMarkup = (
  forwardedRef: React.ForwardedRef<HTMLSelectElement>,
) => {
  const selectRef = useRef<HTMLSelectElement | null>(null);

  const setSelectRef = useCallback(
    (select: HTMLSelectElement | null) => {
      selectRef.current = select;

      if (typeof forwardedRef === "function") {
        forwardedRef(select);
      } else if (forwardedRef) {
        forwardedRef.current = select;
      }
    },
    [forwardedRef],
  );

  useIsomorphicLayoutEffect(() => {
    const select = selectRef.current;
    const selectButton = select?.firstElementChild;

    if (
      !select ||
      (selectButton?.tagName === "BUTTON" &&
        selectButton.firstElementChild?.tagName === "SELECTEDCONTENT")
    ) {
      return;
    }

    // React 18 does not yet accept the customizable-select button in JSX.
    // Insert the standardized markup before paint until React supports it.
    const button = select.ownerDocument.createElement("button");
    const selectedContent =
      select.ownerDocument.createElement("selectedcontent");
    // Use an attribute selector while CSS tooling lacks <selectedcontent> support.
    selectedContent.dataset.subtleSelectSelectedContent = "";
    button.type = "button";
    button.tabIndex = -1;
    button.appendChild(selectedContent);
    select.insertBefore(button, select.firstChild);
  }, []);

  return setSelectRef;
};

export default useCustomizableSelectMarkup;
