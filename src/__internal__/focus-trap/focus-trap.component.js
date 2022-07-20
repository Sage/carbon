import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";

import {
  defaultFocusableSelectors,
  getNextElement,
  setElementFocus,
} from "./focus-trap-utils";
import { ModalContext } from "../../components/modal/modal.component";
import usePrevious from "../../hooks/__internal__/usePrevious";

const FocusTrap = ({
  children,
  autoFocus = true,
  focusFirstElement,
  bespokeTrap,
  wrapperRef,
  isOpen,
  additionalWrapperRefs,
}) => {
  const trapRef = useRef(null);
  const [focusableElements, setFocusableElements] = useState();
  const [firstElement, setFirstElement] = useState();
  const [lastElement, setLastElement] = useState();
  const [currentFocusedElement, setCurrentFocusedElement] = useState();
  const { isAnimationComplete = true, triggerRefocusFlag } = useContext(
    ModalContext
  );

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
    const elements = [];
    allRefs.forEach((ref) => {
      if (ref) {
        elements.push(
          ...Array.from(ref.querySelectorAll(defaultFocusableSelectors)).filter(
            (el) => Number(el.tabIndex) !== -1
          )
        );
      }
    });

    if (hasNewInputs(elements)) {
      setFocusableElements(Array.from(elements));
      setFirstElement(elements[0]);
      setLastElement(elements[elements.length - 1]);
    }
  }, [hasNewInputs, allRefs]);

  useEffect(() => {
    const observer = new MutationObserver(updateFocusableElements);

    trapWrappers.forEach((wrapper) => {
      if (wrapper?.current) {
        observer.observe(wrapper?.current, {
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
      setElementFocus(focusFirstElement || wrapperRef?.current);
    }
  }, [shouldSetFocus, prevShouldSetFocus, focusFirstElement, wrapperRef]);

  useEffect(() => {
    const trapFn = (ev) => {
      if (bespokeTrap) {
        bespokeTrap(ev, firstElement, lastElement);
        return;
      }

      const { activeElement } = document;

      if (ev.key === "Tab") {
        if (!focusableElements.length) {
          /* Block the trap */
          ev.preventDefault();
        } else if (ev.shiftKey) {
          /* shift + tab */
          let elementToFocus;
          if (activeElement === wrapperRef.current) {
            elementToFocus = getNextElement(
              firstElement,
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

  const [tabIndex, setTabIndex] = useState(0);

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

  const focusProps = (hasNoTabIndex) => ({
    ...(hasNoTabIndex && { tabIndex, onBlur }),
    onFocus: updateCurrentFocusedElement,
  });

  // passes focusProps, sets tabIndex and onBlur if no tabIndex has been expicitly set on child
  const clonedChildren = React.Children.map(children, (child) => {
    return React.cloneElement(
      child,
      focusProps(child.props.tabIndex === undefined)
    );
  });

  return <div ref={trapRef}>{clonedChildren}</div>;
};

FocusTrap.propTypes = {
  children: PropTypes.node.isRequired,
  /** flag to set focus automatically on first render */
  autoFocus: PropTypes.bool,
  /** provide a custom first element to focus */
  focusFirstElement: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  /** a custom callback that will override the default focus trap behaviour */
  bespokeTrap: PropTypes.func,
  /** a ref to the container wrapping the focusable elements */
  wrapperRef: PropTypes.shape({ current: PropTypes.any }),
  /* whether the modal (etc.) component that the focus trap is inside is open or not */
  isOpen: PropTypes.bool,
  /** an optional array of refs to containers whose content should also be reachable from the FocusTrap */
  additionalWrapperRefs: PropTypes.arrayOf(
    PropTypes.shape({ current: PropTypes.any })
  ),
};

FocusTrap.defaultProps = {
  additionalWrapperRefs: [],
};

export default FocusTrap;
