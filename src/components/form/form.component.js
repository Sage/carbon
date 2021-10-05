import React, { useRef, useContext } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import FormSummary from "./__internal__/form-summary.component";
import {
  StyledForm,
  StyledFormContent,
  StyledFormFooter,
  StyledLeftButtons,
  StyledRightButtons,
} from "./form.style";
import { SidebarContext } from "../sidebar/sidebar.component";

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
  const { isInSidebar } = useContext(SidebarContext);
  const formRef = useRef();
  const formFooterRef = useRef();

  return (
    <StyledForm
      ref={formRef}
      stickyFooter={stickyFooter}
      onSubmit={onSubmit}
      data-component="form"
      fieldSpacing={fieldSpacing}
      noValidate={noValidate}
      isInSidebar={isInSidebar}
      height={height}
      {...rest}
    >
      <StyledFormContent
        data-element="form-content"
        stickyFooter={stickyFooter}
        className={stickyFooter ? "sticky" : ""}
      >
        {children}
      </StyledFormContent>
      <StyledFormFooter
        data-element="form-footer"
        className={stickyFooter ? "sticky" : ""}
        ref={formFooterRef}
        stickyFooter={stickyFooter}
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
