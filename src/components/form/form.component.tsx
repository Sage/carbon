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
import SidebarContext from "../sidebar/__internal__/sidebar.context";

export interface FormProps extends SpaceProps, TagProps {
  /** Alignment of buttons */
  buttonAlignment?: FormButtonAlignment;
  /** The id attribute of the underlying form element */
  id?: string;
  /** Child elements */
  children?: React.ReactNode;
  /**
   * The total number of errors present in the form. Do not combine it with a composed error Message summary,
   * or the errors are summarised twice.
   * @deprecated Compose error Message components as the first Form children instead.
   */
  errorCount?: number;
  /**
   * @deprecated Apply spacing through the composed content blocks instead.
   */
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
  // Revisit when the deprecated sticky footer is removed: footerChildren then does nothing that children can't
  /** Custom content to render in the form's footer */
  footerChildren?: React.ReactNode;
  /**
   * @deprecated Compose actions in the Form content instead.
   */
  stickyFooter?: boolean;
  /**
   * @deprecated Sticky Form footer behavior is deprecated; compose actions in the Form content instead.
   */
  disableStickyOnSmallScreen?: boolean;
  /**
   * @deprecated Sticky Form footer behavior is deprecated; compose actions in the Form content instead.
   */
  stickyFooterVariant?: "light" | "grey";
  /**
   * The total number of warnings present in the form. Do not combine it with a composed warning Message summary,
   * or the warnings are summarised twice.
   * @deprecated Compose warning Message components as the first Form children instead.
   */
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
  disableStickyOnSmallScreen = false,
  fieldSpacing = 3,
  noValidate = true,
  height,
  fullWidthButtons = false,
  footerPadding = {},
  id,
  ...rest
}: FormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const formFooterRef = useRef<HTMLDivElement>(null);
  const { isInModal } = useContext(ModalContext);
  const { isStickyContentFocusable } = useContext(SidebarContext);

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
      id={id}
      className={stickyFooter ? "sticky" : ""}
      $stickyFooter={stickyFooter}
      onSubmit={onSubmit}
      data-component="form"
      noValidate={noValidate}
      $height={height}
      $isInModal={isInModal}
      {...rest}
      {...tagComponent("form", rest)}
    >
      <StyledFormContent
        data-element="form-content"
        data-role="form-content"
        $stickyFooter={stickyFooter}
        tabIndex={stickyFooter && isStickyContentFocusable ? 0 : -1}
        $isInModal={isInModal}
        $fieldSpacing={formSpacing[fieldSpacing]}
      >
        {children}
      </StyledFormContent>
      {renderFooter && (
        <StyledFormFooter
          data-element="form-footer"
          data-role="form-footer"
          ref={formFooterRef}
          $hasFooterChildren={!!footerChildren}
          $stickyFooter={stickyFooter}
          {...(stickyFooter && { $stickyFooterVariant: stickyFooterVariant })}
          $disableStickyOnSmallScreen={disableStickyOnSmallScreen}
          $buttonAlignment={buttonAlignment}
          $fullWidthButtons={fullWidthButtons}
          {...footerPadding}
        >
          {footerChildren || (
            <>
              {leftSideButtons && (
                <StyledLeftButtons
                  data-role="form-left-buttons"
                  $buttonAlignment={buttonAlignment}
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
                  $buttonAlignment={buttonAlignment}
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
