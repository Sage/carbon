import React, { useRef, useContext } from "react";
import { SpaceProps, PaddingProps } from "styled-system";

import SidebarContext from "../sidebar/__internal__/sidebar.context";
import ModalContext from "../modal/__internal__/modal.context";
import FormSummary from "./__internal__/form-summary.component";
import {
  StyledForm,
  StyledFormContent,
  StyledFormFooter,
  StyledLeftButtons,
  StyledRightButtons,
} from "./form.style";
import { FormButtonAlignment, formSpacing } from "./form.config";
import FormSpacingProvider from "../../__internal__/form-spacing-provider";

export interface FormProps extends SpaceProps {
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
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
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
  /** Padding to be set on the form footer */
  footerPadding?: PaddingProps;
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
  footerPadding = {},
  ...rest
}: FormProps) => {
  const { isInSidebar } = useContext(SidebarContext);
  const { isInModal } = useContext(ModalContext);
  const formRef = useRef<HTMLFormElement>(null);
  const formFooterRef = useRef<HTMLDivElement>(null);
  const hasPadding = !!Object.keys(footerPadding).length;

  const renderFooter = !!(
    saveButton ||
    leftSideButtons ||
    rightSideButtons ||
    errorCount ||
    warningCount
  );

  const classNames = `${stickyFooter ? "sticky" : ""} ${
    hasPadding ? "padded" : ""
  }`.trimEnd();

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
        data-role="form-content"
        className={stickyFooter ? "sticky" : ""}
        stickyFooter={stickyFooter}
        isInModal={isInModal}
        tabIndex={-1}
      >
        <FormSpacingProvider marginBottom={formSpacing[fieldSpacing]}>
          {children}
        </FormSpacingProvider>
      </StyledFormContent>
      {renderFooter && (
        <StyledFormFooter
          data-element="form-footer"
          data-role="form-footer"
          className={classNames}
          ref={formFooterRef}
          stickyFooter={stickyFooter}
          buttonAlignment={buttonAlignment}
          fullWidthButtons={fullWidthButtons}
          isInModal={isInModal}
          {...footerPadding}
        >
          {leftSideButtons && (
            <StyledLeftButtons
              data-role="form-left-buttons"
              buttonAlignment={buttonAlignment}
            >
              {leftSideButtons}
            </StyledLeftButtons>
          )}

          <FormSummary
            fullWidth={fullWidthButtons}
            errorCount={errorCount}
            warningCount={warningCount}
          >
            {saveButton}
          </FormSummary>

          {rightSideButtons && (
            <StyledRightButtons
              data-role="form-right-buttons"
              buttonAlignment={buttonAlignment}
            >
              {rightSideButtons}
            </StyledRightButtons>
          )}
        </StyledFormFooter>
      )}
    </StyledForm>
  );
};

Form.displayName = "Form";

export default Form;
