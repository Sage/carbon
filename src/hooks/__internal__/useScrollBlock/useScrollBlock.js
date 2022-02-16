import { useRef, useCallback, useMemo } from "react";

import guid from "../../../__internal__/utils/helpers/guid";
import ScrollBlockManager from "./scroll-block-manager";

const scrollBlockManager = new ScrollBlockManager();

/* istanbul ignore next */
const safeDocument = typeof document !== "undefined" ? document : {};

const useScrollBlock = () => {
  const { current: containerGuid } = useRef(guid());

  const rules = useMemo(() => {
    const { documentElement, body } = safeDocument;
    const scrollBarWidth = window.innerWidth - documentElement.clientWidth;
    const bodyPaddingRight =
      parseInt(
        window.getComputedStyle(body).getPropertyValue("padding-right")
      ) || 0;

    return [
      {
        element: documentElement,
        property: "position",
        blockingValue: "relative",
      },
      {
        element: documentElement,
        property: "overflow",
        blockingValue: "hidden",
      },
      {
        element: body,
        property: "position",
        blockingValue: "relative",
      },
      {
        element: body,
        property: "overflow",
        blockingValue: "hidden",
      },
      {
        element: body,
        property: "paddingRight",
        blockingValue: `${bodyPaddingRight + scrollBarWidth}px`,
      },
    ];
  }, []);

  const blockScroll = useCallback(() => {
    const isBlocked = scrollBlockManager.isBlocked();
    scrollBlockManager.registerComponent(containerGuid);

    if (isBlocked) {
      return;
    }
    const originalValues = rules.map(
      ({ element, property }) => element.style[property]
    );

    scrollBlockManager.saveOriginalValues(originalValues);

    rules.forEach(({ element, property, blockingValue }) => {
      element.style[property] = blockingValue;
    });
  }, [containerGuid, rules]);

  const allowScroll = useCallback(() => {
    scrollBlockManager.unregisterComponent(containerGuid);
    const isBlocked = scrollBlockManager.isBlocked();

    if (isBlocked) return;
    const originalValues = scrollBlockManager.getOriginalValues();

    rules.forEach(({ element, property }, index) => {
      element.style[property] = originalValues[index];
    });

    scrollBlockManager.saveOriginalValues([]);
  }, [containerGuid, rules]);

  return { blockScroll, allowScroll };
};

export default useScrollBlock;
