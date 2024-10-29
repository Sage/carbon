import React, { useRef } from "react";

import {
  StyledCheckableInput,
  StyledCheckableInputWrapper,
} from "./checkable-input.style";
import { InputBehaviour } from "../input-behaviour";
import FormField, { FormFieldProps } from "../form-field";
import HiddenCheckableInput, {
  CommonHiddenCheckableInputProps,
} from "./hidden-checkable-input.component";
import guid from "../utils/helpers/guid";
import useInputAccessibility from "../../hooks/__internal__/useInputAccessibility";
import { ValidationProps } from "../validations";

export interface CommonCheckableInputProps
  extends ValidationProps,
    CommonHiddenCheckableInputProps {
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** @private @ignore */
  loading?: boolean;
  /** Help content to be displayed under an input */
  fieldHelp?: React.ReactNode;
  /**
   * If true, the FieldHelp will be displayed inline
   * To be used with labelInline prop set to true
   */
  fieldHelpInline?: boolean;
  /** Unique Identifier for the input. Will use a randomly generated GUID if none is provided */
  id?: string;
  /** Sets percentage-based input width */
  inputWidth?: number;
  /** Label content */
  label?: React.ReactNode;
  /** The content for the help tooltip, to appear next to the Label */
  labelHelp?: React.ReactNode;
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** Label width */
  labelWidth?: number;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** Flag to configure component as optional. */
  isOptional?: boolean;
  /** If true the label switches position with the input */
  reverse?: boolean;
  /** Size of the component */
  size?: "small" | "large";
  /** Prop to specify the aria-labelledby attribute of the input */
  ariaLabelledBy?: string;
  /** When true, displays validation icon on label */
  validationOnLabel?: boolean;
}

export interface CheckableInputProps extends CommonCheckableInputProps {
  /** Used to set the visible aspect of the input (i.e. the checkbox sprite, input slider etc) */
  children?: React.ReactNode;
  /** HTML type attribute of the input */
  type: string;
  /** Value passed to the input */
  value?: string;
  /** When true label is inline */
  labelInline?: boolean;
}

const CheckableInput = React.forwardRef(
  (
    {
      ariaLabelledBy,
      autoFocus,
      checked,
      children,
      disabled,
      loading,
      error,
      fieldHelp,
      fieldHelpInline,
      info,
      id: inputId,
      type,
      value,
      inputWidth,
      label,
      labelHelp,
      labelInline = true,
      labelSpacing = 1,
      labelWidth,
      name,
      onBlur,
      onChange,
      onFocus,
      required,
      isOptional,
      reverse = false,
      validationOnLabel,
      warning,
      ...props
    }: CheckableInputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const { current: id } = useRef(inputId || guid());

    const { labelId, fieldHelpId, validationId, ariaDescribedBy } =
      useInputAccessibility({
        id,
        error,
        warning,
        info,
        label,
        fieldHelp,
      });

    const formFieldProps: FormFieldProps = {
      disabled,
      loading,
      error,
      fieldHelp,
      fieldHelpInline,
      fieldHelpId,
      id,
      info,
      label,
      labelHelp,
      labelHelpIcon: "info" as const,
      labelId,
      labelInline,
      labelSpacing,
      reverse,
      warning,
      validationIconId: validationId,
      // We don't want an asterisk on each radio control, only the legend
      // However, we still want the input element to receive the required prop
      isRequired: required,
      isOptional,
      useValidationIcon: validationOnLabel,
    };

    const inputProps = {
      ariaDescribedBy,
      "aria-labelledby": ariaLabelledBy,
      "aria-invalid": !!error,
      autoFocus,
      checked,
      disabled,
      id,
      type,
      value,
      name,
      onBlur,
      onChange,
      onFocus,
      required,
      ref,
      validationIconId: validationId,
      ...props,
    };

    return (
      <StyledCheckableInputWrapper
        disabled={disabled}
        fieldHelpInline={fieldHelpInline}
        inputWidth={inputWidth}
        labelWidth={labelWidth}
        labelInline={labelInline}
        reverse={reverse}
      >
        <InputBehaviour>
          <FormField {...formFieldProps} my={0}>
            <StyledCheckableInput data-role="checkable-input">
              <HiddenCheckableInput {...inputProps} />
              {children}
            </StyledCheckableInput>
          </FormField>
        </InputBehaviour>
      </StyledCheckableInputWrapper>
    );
  },
);

CheckableInput.displayName = "CheckableInput";

export default CheckableInput;
