import {
  useCallback,
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

const FocusTrap = ({
  children,
  autoFocus = true,
  focusFirstElement,
  bespokeTrap,
  wrapperRef,
}) => {
  const firstOpen = useRef(true);
  const [focusableElements, setFocusableElements] = useState();
  const [firstElement, setFirstElement] = useState();
  const [lastElement, setLastElement] = useState();

  const hasNewInputs = useCallback(
    (candidate) => {
      if (!focusableElements || candidate.length !== focusableElements.length) {
        return true;
      }

      return Array.from(candidate).some((el, i) => el !== focusableElements[i]);
    },
    [focusableElements]
  );

  useLayoutEffect(() => {
    if (wrapperRef) {
      const ref = wrapperRef.current;

      const elements = Array.from(
        ref.querySelectorAll(defaultFocusableSelectors)
      ).filter((el) => Number(el.tabIndex) !== -1);

      if (hasNewInputs(elements)) {
        setFocusableElements(Array.from(elements));
        setFirstElement(elements[0]);
        setLastElement(elements[elements.length - 1]);
      }
    }
  }, [children, hasNewInputs, wrapperRef]);

  useEffect(() => {
    if (autoFocus && firstOpen.current && (focusFirstElement || firstElement)) {
      setElementFocus(focusFirstElement || firstElement);
      firstOpen.current = false;
    }
  }, [autoFocus, firstElement, focusFirstElement]);

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
          if (activeElement === firstElement) {
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
  }, [firstElement, lastElement, focusableElements, bespokeTrap]);

  return children;
};

FocusTrap.propTypes = {
  children: PropTypes.node.isRequired,
  /** flag to set focus automatically on first render */
  autoFocus: PropTypes.bool,
  /** provide a custom first element to focus */
  focusFirstElement: PropTypes.shape({ current: PropTypes.any }),
  /** a custom callback that will override the default focus trap behaviour */
  bespokeTrap: PropTypes.func,
  /** a ref to the container wrapping the focusable elements */
  wrapperRef: PropTypes.shape({ current: PropTypes.any }),
};

export default FocusTrap;
