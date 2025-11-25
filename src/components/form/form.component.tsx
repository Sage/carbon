import React, { useContext, useRef } from "react";
import { SpaceProps, PaddingProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

import FormSummary from "./__internal__/form-summary.component";
import {
  StyledForm,
  StyledFormContent,
  StyledFormFooter,
  StyledLeftButtons,
  StyledRightButtons,
} from "./form.style";
import { FormButtonAlignment, formSpacing } from "./form.config";
import ModalContext from "../../__internal__/modal/modal.context";

export interface FormProps extends SpaceProps, TagProps {
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
  /** Custom content to render in the form's footer */
  footerChildren?: React.ReactNode;
  /** Enables the sticky footer. */
  stickyFooter?: boolean;
  /** Background variant for the sticky footer. */
  stickyFooterVariant?: "light" | "grey";
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
  footerChildren,
  stickyFooter,
  stickyFooterVariant = "light",
  fieldSpacing = 3,
  noValidate = true,
  height,
  fullWidthButtons = false,
  footerPadding = {},
  ...rest
}: FormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const formFooterRef = useRef<HTMLDivElement>(null);
  const { isInModal } = useContext(ModalContext);

  const renderFooter = !!(
    footerChildren ||
    saveButton ||
    leftSideButtons ||
    rightSideButtons ||
    errorCount ||
    warningCount
  );

  return (
    <StyledForm
      ref={formRef}
      className={stickyFooter ? "sticky" : ""}
      stickyFooter={stickyFooter}
      onSubmit={onSubmit}
      data-component="form"
      noValidate={noValidate}
      height={height}
      isInModal={isInModal}
      {...rest}
      {...tagComponent("form", rest)}
    >
      <StyledFormContent
        data-element="form-content"
        data-role="form-content"
        stickyFooter={stickyFooter}
        tabIndex={-1}
        isInModal={isInModal}
        fieldSpacing={formSpacing[fieldSpacing]}
      >
        {children}
      </StyledFormContent>
      {renderFooter && (
        <StyledFormFooter
          data-element="form-footer"
          data-role="form-footer"
          ref={formFooterRef}
          hasFooterChildren={!!footerChildren}
          stickyFooter={stickyFooter}
          {...(stickyFooter && { stickyFooterVariant })}
          buttonAlignment={buttonAlignment}
          fullWidthButtons={fullWidthButtons}
          {...footerPadding}
        >
          {footerChildren || (
            <>
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
            </>
          )}
        </StyledFormFooter>
      )}
    </StyledForm>
  );
};

Form.displayName = "Form";

export default Form;
