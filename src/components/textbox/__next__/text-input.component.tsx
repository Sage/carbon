import React, { useRef } from "react";

import { MarginProps } from "styled-system";

import Input, { InputProps } from "./__internal__/input";
import { IconType } from "../../icon";
import ValidationMessage from "../../../__internal__/validation-message/__next__";
import { ValidationProps } from "../../../__internal__/validations";
import { filterStyledSystemMarginProps } from "../../../style/utils";
import useUniqueId from "../../../hooks/__internal__/useUniqueId";
import guid from "../../../__internal__/utils/helpers/guid";
import useInputAccessibility from "../../../hooks/__internal__/useInputAccessibility/useInputAccessibility";
import ErrorBorder from "./__internal__/error-border/error-border.style";
import { TagProps } from "../../../__internal__/utils/helpers/tags";
import { StyledTextInput, LabelSet, InputSet } from "./text-input.style";
import HintText from "./__internal__/hint-text";
import Label from "./__internal__/label";

export interface TextInputProps
  extends Omit<ValidationProps, "info">,
    MarginProps,
    Omit<InputProps, "size" | "error">,
    TagProps {
  /**
   * Unique identifier for the input.
   * Label id will be based on it, using following pattern: [id]-label.
   * Will use a randomly generated GUID if none is provided
   */
  id?: string;
  /** Label content */
  label: string;
  /** When true label is inline */
  labelInline?: boolean;
  /** Size of an input */
  size?: "small" | "medium" | "large";
  /** A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input */
  inputHint?: string;
  /** Type of the icon that will be rendered next to the input */
  inputIcon?: IconType;
  /** The width of the component container as a percentage (e.g., 50 for 50%) */
  containerWidth?: number;
  /** The width of the input as a percentage (e.g., 50 for 50%) */
  inputWidth?: number;
}

const labelInlineDefault = false;

export const TextInput = React.forwardRef(
  (
    {
      id,
      label,
      labelInline = labelInlineDefault,
      disabled,
      readOnly,
      size = "medium",
      prefix,
      inputHint,
      inputIcon,
      placeholder,
      value,
      containerWidth = 100,
      inputWidth,
      error,
      warning,
      required,
      name,
      "data-element": dataElement,
      "data-role": dataRole,
      ...props
    }: TextInputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const validationState = { error, warning };
    const stateProps = { disabled, readOnly };

    const [uniqueId, uniqueName] = useUniqueId(id, name);

    const { labelId, validationId, ariaDescribedBy } = useInputAccessibility({
      id: uniqueId,
      validationRedesignOptIn: true,
      error: validationState.error,
      warning: validationState.warning,
      label,
    });

    const hintId = useRef(guid());
    const inputHintId = inputHint ? hintId.current : undefined;

    const defaultInlineInputWidth = 80;
    const defaultNonInlineInputWidth = 100;
    const resolvedInputWidth =
      inputWidth ??
      (labelInline ? defaultInlineInputWidth : defaultNonInlineInputWidth);

    const ariaDescribedByString = [inputHintId, ariaDescribedBy]
      .filter(Boolean)
      .join(" ");

    const validationMessage = (
      <ValidationMessage
        id={validationId}
        isLarge={size === "large"}
        {...validationState}
      />
    );

    const errorBorder = (validationState.error || validationState.warning) && (
      <ErrorBorder
        data-role="error-border"
        warning={Boolean(!validationState.error && validationState.warning)}
      />
    );

    return (
      <StyledTextInput
        data-element={dataElement}
        data-role={dataRole}
        data-component="text-input"
        size={size}
        containerWidth={containerWidth}
        labelInline={labelInline}
        {...filterStyledSystemMarginProps(props)}
      >
        <LabelSet
          data-role="label-set"
          labelInline={labelInline}
          labelSetWidth={
            labelInline && typeof resolvedInputWidth === "number"
              ? 100 - resolvedInputWidth
              : undefined
          }
        >
          <Label
            id={labelId}
            htmlFor={uniqueId}
            isLarge={size === "large"}
            isRequired={required}
            {...stateProps}
          >
            {label}
          </Label>
          {inputHint && (
            <HintText
              id={inputHintId}
              isLarge={size === "large"}
              {...stateProps}
            >
              {inputHint}
            </HintText>
          )}
        </LabelSet>
        <InputSet
          data-role="input-set"
          inputWidth={resolvedInputWidth}
          size={size}
        >
          <Input
            id={uniqueId}
            name={uniqueName}
            aria-invalid={Boolean(validationState.error)}
            aria-describedby={ariaDescribedByString}
            value={value}
            placeholder={!(disabled || readOnly) ? placeholder : undefined}
            required={required}
            ref={ref}
            error={Boolean(validationState.error)}
            inputIcon={inputIcon}
            size={size}
            {...stateProps}
            {...props}
          />
          {validationMessage}
          {errorBorder}
        </InputSet>
      </StyledTextInput>
    );
  },
);

export default TextInput;
