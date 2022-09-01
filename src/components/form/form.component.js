import React, { useRef, useContext } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import { ModalContext } from "../modal/modal.component";
import { SidebarContext } from "../sidebar/sidebar.component";
import FormSummary from "./__internal__/form-summary.component";
import {
  StyledForm,
  StyledFormContent,
  StyledFormFooter,
  StyledLeftButtons,
  StyledRightButtons,
  StyledFullWidthButtons,
} from "./form.style";

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
  height,
  fullWidthButtons = false,
  ...rest
}) => {
  const { isInSidebar } = useContext(SidebarContext);
  const { isInModal } = useContext(ModalContext);
  const formRef = useRef();
  const formFooterRef = useRef();

  const renderFooter = !!(
    saveButton ||
    leftSideButtons ||
    rightSideButtons ||
    errorCount ||
    warningCount
  );

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
        className={stickyFooter ? "sticky" : ""}
        stickyFooter={stickyFooter}
        isInModal={isInModal}
      >
        {children}
      </StyledFormContent>
      {!fullWidthButtons && renderFooter && (
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
      )}
      {fullWidthButtons && renderFooter && (
        <StyledFormFooter
          data-element="form-footer"
          className={stickyFooter ? "sticky" : ""}
          ref={formFooterRef}
          stickyFooter={stickyFooter}
          buttonAlignment={buttonAlignment}
          fullWidthButtons={fullWidthButtons}
        >
          {leftSideButtons && (
            <StyledLeftButtons fullWidthButtons={fullWidthButtons}>
              {leftSideButtons}
            </StyledLeftButtons>
          )}
          {rightSideButtons && (
            <StyledRightButtons fullWidthButtons={fullWidthButtons}>
              {rightSideButtons}
            </StyledRightButtons>
          )}
          <StyledFullWidthButtons>
            <FormSummary
              fullWidth={fullWidthButtons}
              errors={errorCount}
              warnings={warningCount}
            >
              {saveButton}
            </FormSummary>
          </StyledFullWidthButtons>
        </StyledFormFooter>
      )}
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

  /** Height of the form (any valid CSS value) */
  height: PropTypes.string,

  /** Applies styling for full width buttons. Please note that you will still need to pass the `fullWidth` prop to the button you compose */
  fullWidthButtons: PropTypes.bool,
};

export default Form;
