import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";

const defaultFocusableSelectors =
  'button:not([disabled]), [href], input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]';

const FocusTrap = ({
  children,
  autoFocus = true,
  focusFirstElement,
  bespokeTrap,
}) => {
  const ref = useRef();
  const firstOpen = useRef(true);
  const [focusableElements, setFocusableElements] = useState();
  const [firstElement, setFirstElement] = useState();
  const [lastElement, setLastElement] = useState();

  function setElementFocus(element) {
    if (typeof element === "function") {
      element();
    } else {
      const el = element.current || element;
      el.focus();
    }
  }

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
    const elements = Array.from(
      ref.current.querySelectorAll(defaultFocusableSelectors)
    ).filter((el) => Number(el.tabIndex) !== -1);

    if (hasNewInputs(elements)) {
      setFocusableElements(Array.from(elements));
      setFirstElement(elements[0]);
      setLastElement(elements[elements.length - 1]);
    }
  }, [children, hasNewInputs]);

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

      if (ev.key === "Tab") {
        if (!focusableElements.length) {
          /* Block the trap */
          ev.preventDefault();
        } else if (ev.shiftKey) {
          /* shift + tab */
          if (document.activeElement === firstElement) {
            lastElement.focus();
            ev.preventDefault();
          }
        } else if (document.activeElement === lastElement) {
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

  return <div ref={ref}>{children}</div>;
};

FocusTrap.propTypes = {
  children: PropTypes.node.isRequired,
  /** flag to set focus automatically on first render */
  autoFocus: PropTypes.bool,
  /** provide a custom first element to focus */
  focusFirstElement: PropTypes.oneOfType([
    PropTypes.shape({ current: PropTypes.any }),
    PropTypes.func,
  ]),
  /** a custom callback that will override the default focus trap behaviour */
  bespokeTrap: PropTypes.func,
};

export default FocusTrap;
