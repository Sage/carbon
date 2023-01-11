import { useRef, useLayoutEffect } from "react";

import {
  computePosition,
  autoUpdate,
  Strategy,
  Middleware,
  Placement,
} from "@floating-ui/dom";

export interface UseFloatingProps {
  isOpen?: boolean;
  reference: React.RefObject<HTMLElement | null>;
  floating: React.RefObject<HTMLElement | null>;
  strategy?: Strategy;
  middleware?: Middleware[];
  placement?: Placement;
  animationFrame?: boolean;
}

type OriginalValues = {
  top: string | null;
  left: string | null;
  position: string;
};

const useFloating = ({
  isOpen,
  reference,
  floating,
  strategy = "absolute",
  placement,
  middleware,
  animationFrame,
}: UseFloatingProps) => {
  const originalValues = useRef<OriginalValues | null>(null);

  useLayoutEffect(() => {
    let cleanup: null | (() => void);

    const referenceElement = reference.current;
    const floatingElement = floating.current;

    if (referenceElement && floatingElement && isOpen) {
      const { left, top, position } = floatingElement.style;
      originalValues.current = { left, top, position };

      Object.assign(floatingElement.style, {
        position: strategy,
        top: 0,
        left: 0,
      });

      const update = () => {
        computePosition(referenceElement, floatingElement, {
          strategy,
          middleware,
          placement,
        }).then(({ x, y, placement: currentPlacement }) => {
          Object.assign(floatingElement.style, {
            left: `${x}px`,
            top: `${y}px`,
            position: strategy,
          });

          floatingElement.setAttribute(
            "data-floating-placement",
            currentPlacement
          );
        });
      };

      cleanup = autoUpdate(referenceElement, floatingElement, update, {
        animationFrame,
      });
    }

    return () => {
      if (cleanup && floatingElement) {
        cleanup();
        cleanup = null;
        Object.assign(floatingElement.style, originalValues.current);
        floatingElement.removeAttribute("data-floating-placement");
      }
    };
  }, [
    isOpen,
    reference,
    floating,
    strategy,
    middleware,
    placement,
    animationFrame,
  ]);
};

export default useFloating;
