import {
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import {
  autoUpdate,
  Middleware,
  Placement,
  Strategy,
  useFloating as useFloatingUi,
} from "@floating-ui/react-dom";

type OriginalFloatingStyles = Pick<
  CSSStyleDeclaration,
  "height" | "left" | "position" | "top" | "transform" | "visibility" | "width"
>;

export interface UseFloatingProps {
  reference: RefObject<HTMLElement>;
  floating: RefObject<HTMLElement>;
  isOpen?: boolean;
  placement?: Placement;
  middleware?: Middleware[];
  animationFrame?: boolean;
  strategy?: Strategy;
}

const disableAutomaticUpdate = () => () => {};

const useFloating = ({
  reference,
  floating,
  isOpen = true,
  placement,
  middleware,
  animationFrame,
  strategy = "absolute",
}: UseFloatingProps) => {
  const originalFloatingStyles = useRef<OriginalFloatingStyles | null>(null);
  const focusedBeforeHide = useRef<HTMLElement | null>(null);
  const {
    elements,
    isPositioned,
    middlewareData,
    placement: currentPlacement,
    refs,
    update,
    x,
    y,
  } = useFloatingUi({
    open: isOpen,
    placement,
    middleware,
    strategy,
    whileElementsMounted: disableAutomaticUpdate,
  });
  const referenceHidden = middlewareData.hide?.referenceHidden;
  const setFloating = useCallback(
    (element: HTMLElement | null) => refs.setFloating(element),
    [refs],
  );

  const floatingStyles = useMemo<React.CSSProperties>(
    () => ({
      position: strategy,
      left: Number.isFinite(x) ? (x as number) : 0,
      top: Number.isFinite(y) ? (y as number) : 0,
    }),
    [strategy, x, y],
  );

  useLayoutEffect(() => {
    refs.setReference(reference.current);
    refs.setFloating(floating.current);
  }, [floating, reference, refs]);

  useEffect(() => {
    if (!isOpen || !elements.reference || !elements.floating) return;

    return autoUpdate(elements.reference, elements.floating, update, {
      animationFrame,
    });
  }, [animationFrame, elements.floating, elements.reference, isOpen, update]);

  useLayoutEffect(() => {
    const floatingElement = floating.current;

    if (!isOpen || !floatingElement) return;

    const { height, left, position, top, transform, visibility, width } =
      floatingElement.style;
    originalFloatingStyles.current = {
      height,
      left,
      position,
      top,
      transform,
      visibility,
      width,
    };

    return () => {
      Object.assign(floatingElement.style, originalFloatingStyles.current);
      floatingElement.removeAttribute("data-floating-placement");
      originalFloatingStyles.current = null;
    };
  }, [elements.floating, floating, isOpen]);

  useLayoutEffect(() => {
    const floatingElement = floating.current;

    if (!isOpen || !floatingElement || !originalFloatingStyles.current) return;

    const originalVisibility = originalFloatingStyles.current.visibility;

    Object.assign(floatingElement.style, {
      ...floatingStyles,
      left: `${floatingStyles.left}px`,
      top: `${floatingStyles.top}px`,
      ...(referenceHidden === undefined
        ? {}
        : {
            visibility: referenceHidden ? "hidden" : originalVisibility,
          }),
    });

    if (isPositioned) {
      floatingElement.setAttribute("data-floating-placement", currentPlacement);
    }
  }, [
    currentPlacement,
    elements.floating,
    floating,
    floatingStyles,
    isOpen,
    isPositioned,
    referenceHidden,
  ]);

  useEffect(() => {
    const floatingElement = elements.floating;
    const ownerDocument = floatingElement?.ownerDocument;

    if (!isOpen || !floatingElement || !ownerDocument) {
      focusedBeforeHide.current = null;

      return;
    }

    const handleFocusIn = (event: FocusEvent) => {
      if (
        event.target !== ownerDocument.body &&
        !floatingElement.contains(event.target as Node)
      ) {
        focusedBeforeHide.current = null;
      }
    };

    ownerDocument.addEventListener("focusin", handleFocusIn);

    return () => ownerDocument.removeEventListener("focusin", handleFocusIn);
  }, [elements.floating, isOpen]);

  useEffect(() => {
    const floatingElement = elements.floating;
    const ownerDocument = floatingElement?.ownerDocument;

    if (
      !isOpen ||
      !floatingElement ||
      !ownerDocument ||
      referenceHidden === undefined
    ) {
      return;
    }

    const { activeElement } = ownerDocument;

    if (
      referenceHidden &&
      activeElement instanceof HTMLElement &&
      floatingElement.contains(activeElement)
    ) {
      focusedBeforeHide.current = activeElement;

      return;
    }

    if (!referenceHidden && focusedBeforeHide.current) {
      const item = focusedBeforeHide.current;
      focusedBeforeHide.current = null;

      if (
        floatingElement.contains(item) &&
        item.isConnected &&
        !item.matches(":disabled, [aria-disabled='true']") &&
        (activeElement === ownerDocument.body || activeElement === item)
      ) {
        item.focus({ preventScroll: true });
      }
    }
  }, [elements.floating, isOpen, referenceHidden]);

  return setFloating;
};

export default useFloating;
