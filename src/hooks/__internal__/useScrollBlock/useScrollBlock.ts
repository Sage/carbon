import { useRef, useCallback, useMemo } from "react";

import guid from "../../../__internal__/utils/helpers/guid";
import ScrollBlockManager from "./scroll-block-manager";

// TODO: This component can be refactored to remove redundant code after
// we can confirm that all Sage products use version 105.0.0^
const scrollBlockManager = new ScrollBlockManager();

type Rule = {
  element: HTMLElement;
  property: "position" | "overflow" | "paddingRight";
  blockingValue: string;
};

const useScrollBlock = (): {
  blockScroll: () => void;
  allowScroll: () => void;
} => {
  const { current: containerGuid } = useRef(guid());
  const originalValuesRef = useRef<string[]>([]);

  const rules: Rule[] = useMemo(() => {
    /* istanbul ignore next */
    const { documentElement, body } = document || {};
    const scrollBarWidth = window.innerWidth - documentElement.clientWidth;
    const bodyPaddingRight =
      parseInt(
        window.getComputedStyle(body).getPropertyValue("padding-right")
      ) || 0;

    return [
      // TODO: First two entries of this array with the documentElement can be removed
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

  const restoreValues = useCallback(() => {
    rules.forEach(({ element, property }, index) => {
      element.style[property] = originalValuesRef.current[index];
    });
  }, [rules]);

  const blockScroll = useCallback(() => {
    const isBlocked = scrollBlockManager.isBlocked();
    scrollBlockManager.registerComponent(containerGuid);

    if (isBlocked) {
      return;
    }
    const originalValues = rules.map(
      ({ element, property }) => element.style[property]
    );

    originalValuesRef.current = originalValues;
    scrollBlockManager.saveRestoreValuesCallback(restoreValues);
    // TODO: saveOriginalValues can be removed
    scrollBlockManager.saveOriginalValues(originalValues);
    // TODO: slice san be removed
    rules.slice(-3).forEach(({ element, property, blockingValue }) => {
      element.style[property] = blockingValue;
    });
  }, [restoreValues, containerGuid, rules]);

  const allowScroll = useCallback(() => {
    scrollBlockManager.unregisterComponent(containerGuid);
    const isBlocked = scrollBlockManager.isBlocked();

    if (isBlocked) return;

    const restoreValuesCallback = scrollBlockManager.getRestoreValuesCallback();

    if (restoreValuesCallback) {
      restoreValuesCallback();
      scrollBlockManager.saveRestoreValuesCallback(null);
      return;
    }

    // TODO: all of the code below can be removed from this block
    const originalValues = scrollBlockManager.getOriginalValues();

    rules.forEach(({ element, property }, index) => {
      element.style[property] = originalValues[index];
    });

    scrollBlockManager.saveOriginalValues([]);
  }, [containerGuid, rules]);

  return { blockScroll, allowScroll };
};

export default useScrollBlock;
