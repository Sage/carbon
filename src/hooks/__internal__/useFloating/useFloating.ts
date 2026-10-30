import { useRef, useLayoutEffect, RefObject } from "react";

import {
  computePosition,
  autoUpdate,
  Strategy,
  Middleware,
  Placement,
} from "@floating-ui/dom";

export interface UseFloatingProps {
  isOpen?: boolean;
  reference: RefObject<HTMLElement | null>;
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
  width: string;
  height: string;
  visibility: string;
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
  const focusedBeforeHide = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    let cleanup: null | (() => void);
    let disposed = false;

    const referenceElement = reference.current;
    const floatingElement = floating.current;
    const ownerDocument = floatingElement?.ownerDocument;
    const handleFocusIn = (event: FocusEvent) => {
      if (
        event.target !== ownerDocument?.body &&
        !floatingElement?.contains(event.target as Node)
      ) {
        focusedBeforeHide.current = null;
      }
    };

    if (!isOpen) focusedBeforeHide.current = null;

    if (referenceElement && floatingElement && isOpen) {
      ownerDocument?.addEventListener("focusin", handleFocusIn);
      const { left, top, position, width, height, visibility } =
        floatingElement.style;
      originalValues.current = {
        left,
        top,
        position,
        width,
        height,
        visibility,
      };

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
        }).then(({ x, y, placement: currentPlacement, middlewareData }) => {
          if (disposed) {
            return;
          }

          Object.assign(floatingElement.style, {
            left: `${x}px`,
            top: `${y}px`,
            position: strategy,
          });

          if (middlewareData.hide?.referenceHidden !== undefined) {
            const activeElement = ownerDocument?.activeElement;

            if (
              middlewareData.hide.referenceHidden &&
              activeElement instanceof HTMLElement &&
              floatingElement.contains(activeElement)
            ) {
              focusedBeforeHide.current = activeElement;
            }

            floatingElement.style.visibility = middlewareData.hide
              .referenceHidden
              ? "hidden"
              : visibility;

            if (
              !middlewareData.hide.referenceHidden &&
              focusedBeforeHide.current
            ) {
              const item = focusedBeforeHide.current;
              focusedBeforeHide.current = null;

              if (
                floatingElement.contains(item) &&
                item.isConnected &&
                !item.matches(":disabled, [aria-disabled='true']") &&
                (activeElement === ownerDocument?.body ||
                  activeElement === item)
              ) {
                item.focus({ preventScroll: true });
              }
            }
          }

          floatingElement.setAttribute(
            "data-floating-placement",
            currentPlacement,
          );
        });
      };

      cleanup = autoUpdate(referenceElement, floatingElement, update, {
        animationFrame,
      });
    }

    return () => {
      disposed = true;
      ownerDocument?.removeEventListener("focusin", handleFocusIn);
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
