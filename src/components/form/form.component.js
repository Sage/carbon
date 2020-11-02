import React, { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import throttle from "lodash/throttle";

import ElementResize from "../../utils/helpers/element-resize";

import FormSummary from "./form-summary.component";
import {
  StyledForm,
  StyledFormFooter,
  StyledLeftButtons,
  StyledRightButtons,
} from "./form.style";

const SCROLL_THROTTLE = 100;

const Form = ({
  children,
  saveButton,
  leftSideButtons,
  rightSideButtons,
  errorCount,
  warningCount,
  onSubmit,
  buttonAlignment = "right",
  stickyFooter,
  fieldSpacing = 3,
  noValidate = true,
  ...rest
}) => {
  const [isFooterSticky, setIsFooterSticky] = useState(false);

  const formRef = useRef();

  const formFooterRef = useRef();

  const stickyListenersAddedRef = useRef(false);

  const checkStickyFooter = useCallback(
    throttle(() => {
      const footerHeight = formFooterRef.current.offsetHeight;
      const topVisibilityOffset = 40;
      const { top, bottom } = formRef.current.getBoundingClientRect();

      const isBottomBelowScreen =
        bottom - footerHeight / 2 > window.innerHeight;
      const isBottomAboveScreen =
        bottom + footerHeight / 2 < window.innerHeight;
      const isTopAboveScreen = top + topVisibilityOffset < window.innerHeight;

      if (isBottomBelowScreen && isTopAboveScreen) {
        setIsFooterSticky(true);
      } else if (isBottomAboveScreen || !isTopAboveScreen) {
        setIsFooterSticky(false);
      }
    }, SCROLL_THROTTLE),
    []
  );

  const addStickyFooterListeners = useCallback(() => {
    ElementResize.addListener(formRef.current, checkStickyFooter);
    window.addEventListener("resize", checkStickyFooter, true);
    window.addEventListener("scroll", checkStickyFooter, true);
    stickyListenersAddedRef.current = true;
  }, [checkStickyFooter]);

  const removeStickyFooterListeners = useCallback(() => {
    ElementResize.removeListener(formRef.current, checkStickyFooter);
    window.removeEventListener("resize", checkStickyFooter, true);
    window.removeEventListener("scroll", checkStickyFooter, true);
    stickyListenersAddedRef.current = false;
  }, [checkStickyFooter]);

  useEffect(() => {
    if (stickyFooter && !stickyListenersAddedRef.current) {
      addStickyFooterListeners();
      checkStickyFooter();
    }
    return () => removeStickyFooterListeners();
  }, [
    addStickyFooterListeners,
    checkStickyFooter,
    removeStickyFooterListeners,
    stickyFooter,
  ]);

  return (
    <StyledForm
      ref={formRef}
      stickyFooter={stickyFooter && isFooterSticky}
      onSubmit={onSubmit}
      data-component="form"
      fieldSpacing={fieldSpacing}
      noValidate={noValidate}
      {...rest}
    >
      {children}
      <StyledFormFooter
        data-element="form-footer"
        className={isFooterSticky ? "sticky" : ""}
        ref={formFooterRef}
        stickyFooter={isFooterSticky}
        buttonAlignment={buttonAlignment}
      >
        {leftSideButtons && (
          <StyledLeftButtons buttonAlignment={buttonAlignment}>
            {leftSideButtons}
          </StyledLeftButtons>
        )}

        <FormSummary errors={errorCount} warnings={warningCount}>
          {saveButton}
        </FormSummary>

        {rightSideButtons && (
          <StyledRightButtons buttonAlignment={buttonAlignment}>
            {rightSideButtons}
          </StyledRightButtons>
        )}
      </StyledFormFooter>
    </StyledForm>
  );
};

Form.propTypes = {
  /** Alignment of buttons */
  buttonAlignment: PropTypes.oneOf(["left", "right"]),

  /** Enables the sticky footer. */
  stickyFooter: PropTypes.bool,

  /** Additional buttons rendered on the left side of the save button */
  leftSideButtons: PropTypes.node,

  /** Additional buttons rendered on the right side of the save button */
  rightSideButtons: PropTypes.node,

  /** Callback passed to the form element */
  onSubmit: PropTypes.func,

  /** Child elements */
  children: PropTypes.node,

  /** Save button to be rendered */
  saveButton: PropTypes.node,

  /** The total number of errors present in the form */
  errorCount: PropTypes.number,

  /** The total number of warnings present in the form */
  warningCount: PropTypes.number,

  /** Spacing between form fields, given number will be multiplied by base spacing unit (8) */
  fieldSpacing: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 7]),

  /** Disable HTML5 validation */
  noValidate: PropTypes.bool,
};

export default Form;
