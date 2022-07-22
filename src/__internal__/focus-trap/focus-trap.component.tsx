import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  defaultFocusableSelectors,
  getNextElement,
  setElementFocus,
} from "./focus-trap-utils";
import {
  ModalContext,
  ModalContextProps,
} from "../../components/modal/modal.component";
import usePrevious from "../../hooks/__internal__/usePrevious";

// TODO investigate why React.RefObject<T> produces a failed prop type when current = null
type CustomRefObject<T> = {
  current?: T | null;
};

export interface FocusTrapProps {
  children: React.ReactNode;
  autoFocus?: boolean;
  /** provide a custom first element to focus */
  focusFirstElement?: CustomRefObject<HTMLElement> | HTMLElement;
  /** a custom callback that will override the default focus trap behaviour */
  bespokeTrap?: (
    ev: KeyboardEvent,
    firstElement?: HTMLElement,
    lastElement?: HTMLElement
  ) => void;
  /** a ref to the container wrapping the focusable elements */
  wrapperRef?: CustomRefObject<HTMLElement>;
  /* whether the modal (etc.) component that the focus trap is inside is open or not */
  isOpen?: boolean;
  /** an optional array of refs to containers whose content should also be reachable from the FocusTrap */
  additionalWrapperRefs?: CustomRefObject<HTMLElement>[];
}

const FocusTrap = ({
  children,
  autoFocus = true,
  focusFirstElement,
  bespokeTrap,
  wrapperRef,
  isOpen,
  additionalWrapperRefs,
}: FocusTrapProps) => {
  const trapRef = useRef<HTMLDivElement>(null);
  const [focusableElements, setFocusableElements] = useState<
    HTMLElement[] | undefined
  >();
  const [firstElement, setFirstElement] = useState<HTMLElement | undefined>();
  const [lastElement, setLastElement] = useState<HTMLElement | undefined>();
  const [currentFocusedElement, setCurrentFocusedElement] = useState<
    HTMLElement | undefined
  >();
  const {
    isAnimationComplete = true,
    triggerRefocusFlag,
  } = useContext<ModalContextProps>(ModalContext);

  const hasNewInputs = useCallback(
    (candidate) => {
      if (!focusableElements || candidate.length !== focusableElements.length) {
        return true;
      }

      return Array.from(candidate).some((el, i) => el !== focusableElements[i]);
    },
    [focusableElements]
  );

  const trapWrappers = useMemo(
    () =>
      additionalWrapperRefs?.length
        ? [wrapperRef, ...additionalWrapperRefs]
        : [wrapperRef],
    [additionalWrapperRefs, wrapperRef]
  );

  const allRefs = trapWrappers.map((ref) => ref?.current);

  const updateFocusableElements = useCallback(() => {
    const elements: Element[] = [];
    allRefs.forEach((ref) => {
      if (ref) {
        elements.push(
          ...Array.from(ref.querySelectorAll(defaultFocusableSelectors)).filter(
            (el) => Number((el as HTMLElement).tabIndex) !== -1
          )
        );
      }
    });

    if (hasNewInputs(elements)) {
      setFocusableElements(Array.from(elements) as HTMLElement[]);
      setFirstElement(elements[0] as HTMLElement);
      setLastElement(elements[elements.length - 1] as HTMLElement);
    }
  }, [hasNewInputs, allRefs]);

  useEffect(() => {
    const observer = new MutationObserver(updateFocusableElements);

    trapWrappers.forEach((wrapper) => {
      if (wrapper?.current) {
        observer.observe(wrapper?.current as Node, {
          subtree: true,
          childList: true,
          attributes: true,
          characterData: true,
        });
      }
    });

    return () => observer.disconnect();
  }, [updateFocusableElements, trapWrappers]);

  useLayoutEffect(() => {
    updateFocusableElements();
  }, [children, updateFocusableElements]);

  const shouldSetFocus =
    autoFocus &&
    isOpen &&
    isAnimationComplete &&
    (focusFirstElement || wrapperRef?.current);

  const prevShouldSetFocus = usePrevious(shouldSetFocus);

  useEffect(() => {
    if (shouldSetFocus && !prevShouldSetFocus) {
      const candidateFirstElement =
        focusFirstElement && "current" in focusFirstElement
          ? focusFirstElement.current
          : focusFirstElement;
      setElementFocus(
        (candidateFirstElement || wrapperRef?.current) as HTMLElement
      );
    }
  }, [shouldSetFocus, prevShouldSetFocus, focusFirstElement, wrapperRef]);

  useEffect(() => {
    const trapFn = (ev: KeyboardEvent) => {
      if (bespokeTrap) {
        bespokeTrap(ev, firstElement, lastElement);
        return;
      }

      const activeElement = document.activeElement as HTMLElement;

      if (ev.key === "Tab") {
        if (!focusableElements?.length) {
          /* Block the trap */
          ev.preventDefault();
        } else if (ev.shiftKey) {
          /* shift + tab */
          let elementToFocus;
          if (activeElement === wrapperRef?.current) {
            elementToFocus = getNextElement(
              firstElement as HTMLElement,
              focusableElements,
              ev.shiftKey
            );
          } else {
            elementToFocus = getNextElement(
              activeElement,
              focusableElements,
              ev.shiftKey
            );
          }
          setElementFocus(elementToFocus);
          ev.preventDefault();
        } else {
          const elementToFocus = getNextElement(
            activeElement,
            focusableElements,
            ev.shiftKey
          );
          setElementFocus(elementToFocus);
          ev.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", trapFn, true);

    return function cleanup() {
      document.removeEventListener("keydown", trapFn, true);
    };
  }, [firstElement, lastElement, focusableElements, bespokeTrap, wrapperRef]);

  const updateCurrentFocusedElement = useCallback(() => {
    const element = focusableElements?.find(
      (el) => el === document.activeElement
    );

    if (element) {
      setCurrentFocusedElement(element);
    }
  }, [focusableElements]);

  const refocusTrap = useCallback(() => {
    /* istanbul ignore else */
    if (
      currentFocusedElement &&
      !currentFocusedElement.hasAttribute("disabled")
    ) {
      // the trap breaks if it tries to refocus a disabled element
      setElementFocus(currentFocusedElement);
    } else if (wrapperRef?.current?.hasAttribute("tabindex")) {
      setElementFocus(wrapperRef.current);
    } else if (firstElement) {
      setElementFocus(firstElement);
    }
  }, [currentFocusedElement, firstElement, wrapperRef]);

  useEffect(() => {
    if (triggerRefocusFlag) {
      refocusTrap();
    }
  }, [triggerRefocusFlag, refocusTrap]);

  const [tabIndex, setTabIndex] = useState<number | undefined>(0);

  useEffect(() => {
    // issue in cypress prevents setting tabIndex to -1, instead tabIndex is set to 0 and removed on blur.
    if (!isOpen) {
      setTabIndex(0);
    }
  }, [isOpen]);

  const onBlur = () => {
    /* istanbul ignore else */
    if (isOpen) {
      setTabIndex(undefined);
    }
  };

  const focusProps = (hasNoTabIndex: boolean) => ({
    ...(hasNoTabIndex && { tabIndex, onBlur }),
    onFocus: updateCurrentFocusedElement,
  });

  // passes focusProps, sets tabIndex and onBlur if no tabIndex has been expicitly set on child
  const clonedChildren = React.Children.map(children, (child) => {
    const focusableChild = child as React.ReactElement;
    return React.cloneElement(
      focusableChild,
      focusProps(focusableChild?.props?.tabIndex === undefined)
    );
  });

  return <div ref={trapRef}>{clonedChildren}</div>;
};

export default FocusTrap;
