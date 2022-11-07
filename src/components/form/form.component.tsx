import React, { useRef, useContext } from "react";
import { SpaceProps } from "styled-system";

import { SidebarContext } from "../sidebar/sidebar.component";
import { ModalContext } from "../modal/modal.component";
import { Expand } from "../../__internal__/utils/helpers/types";
import FormSummary from "./__internal__/form-summary.component";
import {
  StyledForm,
  StyledFormContent,
  StyledFormFooter,
  StyledLeftButtons,
  StyledRightButtons,
  StyledFullWidthButtons,
} from "./form.style";
import { FormButtonAlignment } from "./form.config";

export interface FormProps extends Expand<SpaceProps> {
  /** Alignment of buttons */
  buttonAlignment?: FormButtonAlignment;
  /** Child elements */
  children?: React.ReactNode;
  /** The total number of errors present in the form */
  errorCount?: number;
  /** Spacing between form fields, given number will be multiplied by base spacing unit (8) */
  fieldSpacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  /** Additional buttons rendered on the left side of the save button */
  leftSideButtons?: React.ReactNode;
  /** Disable HTML5 validation */
  noValidate?: boolean;
  /** Callback passed to the form element */
  onSubmit?: React.FormEventHandler;
  /** Additional buttons rendered on the right side of the save button */
  rightSideButtons?: React.ReactNode;
  /** Save button to be rendered */
  saveButton?: React.ReactNode;
  /** Enables the sticky footer. */
  stickyFooter?: boolean;
  /** The total number of warnings present in the form */
  warningCount?: number;
  /** Height of the form (any valid CSS value) */
  height?: string;
  /** Applies styling for full width buttons. Please note that you will still need to pass the `fullWidth` prop to the button you compose */
  fullWidthButtons?: boolean;
}

export const Form = ({
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
}: FormProps) => {
  const { isInSidebar } = useContext(SidebarContext);
  const { isInModal } = useContext(ModalContext);
  const formRef = useRef<HTMLFormElement>(null);
  const formFooterRef = useRef<HTMLDivElement>(null);

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
      isInModal={isInModal}
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
          isInModal={isInModal}
        >
          {leftSideButtons && (
            <StyledLeftButtons buttonAlignment={buttonAlignment}>
              {leftSideButtons}
            </StyledLeftButtons>
          )}

          <FormSummary errorCount={errorCount} warningCount={warningCount}>
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
              errorCount={errorCount}
              warningCount={warningCount}
            >
              {saveButton}
            </FormSummary>
          </StyledFullWidthButtons>
        </StyledFormFooter>
      )}
    </StyledForm>
  );
};

Form.displayName = "Form";

export default Form;
