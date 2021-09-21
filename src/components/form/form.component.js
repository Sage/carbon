import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from "react";
import PropTypes from "prop-types";
import throttle from "lodash/throttle";
import styledSystemPropTypes from "@styled-system/prop-types";

import useResizeObserver from "../../hooks/__internal__/useResizeObserver";
import FormSummary from "./__internal__/form-summary.component";
import {
  StyledForm,
  StyledFormFooter,
  StyledLeftButtons,
  StyledRightButtons,
} from "./form.style";
import { SidebarContext } from "../sidebar/sidebar.component";

const SCROLL_THROTTLE = 50;

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
  dialogRef,
  fieldSpacing = 3,
  noValidate = true,
  height,
  ...rest
}) => {
  const [isFooterSticky, setIsFooterSticky] = useState(false);
  const { isInSidebar } = useContext(SidebarContext);
  const formRef = useRef();
  const formFooterRef = useRef();
  const stickyListenersAddedRef = useRef(false);
  const checkStickyFooter = useCallback(
    throttle(() => {
      const { bottom } = formRef.current.getBoundingClientRect();
      let isBottomBelowScreen;

      if (dialogRef) {
        isBottomBelowScreen =
          bottom > dialogRef.current.getBoundingClientRect().bottom;
      } else {
        isBottomBelowScreen = bottom > window.innerHeight;
      }

      if (isBottomBelowScreen) {
        setIsFooterSticky(true);
      } else {
        setIsFooterSticky(false);
      }
    }, SCROLL_THROTTLE),
    []
  );

  useResizeObserver(formRef, checkStickyFooter, !stickyFooter);

  const addStickyFooterListeners = useCallback(() => {
    window.addEventListener("resize", checkStickyFooter, true);
    window.addEventListener("scroll", checkStickyFooter, true);
    stickyListenersAddedRef.current = true;
  }, [checkStickyFooter]);

  const removeStickyFooterListeners = useCallback(() => {
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
      isInSidebar={isInSidebar}
      height={height}
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
  ...styledSystemPropTypes.space,
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
  /**
   * @private
   * @ignore
   * Used to detect if FormFooter should be sticky when used in Dialog component
   */
  dialogRef: PropTypes.shape({ current: PropTypes.any }),

  /** Height of the form (any valid CSS value) */
  height: PropTypes.string,
};

export default Form;
