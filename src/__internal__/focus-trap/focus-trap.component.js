import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";

import {
  defaultFocusableSelectors,
  nextNonRadioElementIndex,
  isRadio,
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

  const updateFocusableElements = useCallback(() => {
    const ref = wrapperRef?.current;
    if (ref) {
      const elements = Array.from(
        ref.querySelectorAll(defaultFocusableSelectors)
      ).filter((el) => Number(el.tabIndex) !== -1);

      if (hasNewInputs(elements)) {
        setFocusableElements(Array.from(elements));
        setFirstElement(elements[0]);
        setLastElement(elements[elements.length - 1]);
      }
    }
  }, [hasNewInputs, wrapperRef]);

  useEffect(() => {
    const observer = new MutationObserver(updateFocusableElements);

    observer.observe(trapRef.current, {
      subtree: true,
      childList: true,
      attributes: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [updateFocusableElements]);

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
          if (
            activeElement === firstElement ||
            activeElement === wrapperRef.current
          ) {
            lastElement.focus();
            ev.preventDefault();
          }

          // If current element is radio button -
          // find next non radio button element
          if (isRadio(activeElement)) {
            const nextIndex = nextNonRadioElementIndex(
              activeElement,
              focusableElements
            );

            setElementFocus(focusableElements[nextIndex]);
            ev.preventDefault();
          }
        } else if (activeElement === lastElement) {
          firstElement.focus();
          ev.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", trapFn);

    return function cleanup() {
      document.removeEventListener("keydown", trapFn);
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

  useEffect(() => {
    document.addEventListener("focusin", updateCurrentFocusedElement);

    return () => {
      document.removeEventListener("focusin", updateCurrentFocusedElement);
    };
  }, [updateCurrentFocusedElement]);

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

  const focusProps = { tabIndex, onBlur };

  // passes focusProps if no tabindex has been explicitly set on the wrapper
  const clonedChildren = React.Children.map(children, (child) => {
    return child.props.tabIndex === undefined
      ? React.cloneElement(child, focusProps)
      : child;
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
};

export default FocusTrap;
