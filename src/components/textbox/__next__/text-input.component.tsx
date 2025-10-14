import React, { useContext, useRef, useState } from "react";

import { MarginProps } from "styled-system";

import FormField from "../../../__internal__/form-field";
import {
  Input,
  InputPresentation,
  CommonInputProps,
} from "../../../__internal__/input";
import { InputBehaviour } from "../../../__internal__/input-behaviour";
import InputIconToggle from "../../../__internal__/input-icon-toggle";
import ValidationMessage from "../../../__internal__/validation-message";
import { ValidationProps } from "../../../__internal__/validations";
import { filterStyledSystemMarginProps } from "../../../style/utils";
import NumeralDateContext from "../../numeral-date/__internal__/numeral-date.context";
import useCharacterCount from "../../../hooks/useCharacterCount";
import useUniqueId from "../../../hooks/__internal__/useUniqueId";
import guid from "../../../__internal__/utils/helpers/guid";
import useInputAccessibility from "../../../hooks/__internal__/useInputAccessibility/useInputAccessibility";
import ErrorBorder from ".././textbox.style";
import StyledPrefix from "../__internal__/prefix.style";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";
import InputWrapper from "./text-input.style";
export interface TextInputProps
  extends Omit<ValidationProps, "info">,
    MarginProps,
    Omit<
      CommonInputProps,
      "as" | "align" | "size" | "inputBorderRadius" | "validationIconId"
    >,
    TagProps {
  /**
   * Unique identifier for the input.
   * Label id will be based on it, using following pattern: [id]-label.
   * Will use a randomly generated GUID if none is provided.
   */
  id?: string;
  /** Label content */
  label: string;
  /** When true label is inline. */
  labelInline?: boolean;
  /** Size of an input */
  size?: "small" | "medium" | "large";
  /** Emphasized part of the displayed text */
  prefix?: string;
  /** A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. */
  inputHint?: string;
  /** Character limit of the input */
  characterLimit?: number;
  /** The width of the component container as a percentage of its parent */
  containerWidth?: number;
  /** The width of the input as a percentage of its parent */
  inputWidth?: number;
  /** When true, renders the validation message above the input */
  validationMessagePositionTop?: boolean;
}

export const TextInput = React.forwardRef(
  (
    {
      id,
      "aria-describedby": ariaDescribedByProp,
      label,
      labelInline,
      onBlur,
      disabled,
      readOnly,
      size = "medium",
      prefix,
      inputHint,
      placeholder,
      value,
      characterLimit,
      containerWidth,
      inputWidth,
      error,
      warning,
      required,
      validationMessagePositionTop = true,
      children,
      name,
      ...props
    }: TextInputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const validationState = { error, warning };

    const [uniqueId, uniqueName] = useUniqueId(id, name);

    const [characterCountAriaLive, setCharacterCountAriaLive] = useState<
      "off" | "polite"
    >("off");

    // This block of code has been covered in a Playwright test.
    // istanbul ignore next
    const handleBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
      if (characterLimit) setCharacterCountAriaLive("off");
      onBlur?.(ev);
    };

    const [characterCount, visuallyHiddenHintId] = useCharacterCount(
      typeof value === "string" ? value : "",
      characterLimit,
      characterCountAriaLive,
    );
    const { disableErrorBorder } = useContext(NumeralDateContext);

    const { labelId, validationId, ariaDescribedBy } = useInputAccessibility({
      id: uniqueId,
      error: validationState.error,
      warning: validationState.warning,
      label,
    });

    const hintId = useRef(guid());
    const inputHintId = inputHint ? hintId.current : undefined;

    const describedByArray = validationMessagePositionTop
      ? [ariaDescribedBy, inputHintId]
      : [inputHintId, ariaDescribedBy];
    const combinedAriaDescribedBy = [
      ...describedByArray,
      visuallyHiddenHintId,
      ariaDescribedByProp,
    ]
      .filter(Boolean)
      .join(" ");

    const input = (
      <InputPresentation
        size={size}
        disabled={disabled}
        readOnly={readOnly}
        prefix={prefix}
        inputWidth={!labelInline ? inputWidth : undefined}
        {...validationState}
      >
        {prefix && (
          <StyledPrefix data-element="textbox-prefix" size={size}>
            {prefix}
          </StyledPrefix>
        )}
        <Input
          id={uniqueId}
          name={uniqueName}
          aria-invalid={Boolean(validationState.error)}
          aria-describedby={combinedAriaDescribedBy}
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          placeholder={!(disabled || readOnly) ? placeholder : undefined}
          onBlur={handleBlur}
          required={required || undefined}
          ref={ref}
          {...props}
        />
        {children}
        <InputIconToggle
          size={size}
          disabled={disabled}
          readOnly={readOnly}
          {...validationState}
        />
      </InputPresentation>
    );

    const validationMessage = (
      <ValidationMessage
        validationId={validationId}
        validationMessagePositionTop={validationMessagePositionTop}
        isLarge={size === "large"}
        {...validationState}
      />
    );

    return (
      <InputBehaviour>
        <FormField
          id={uniqueId}
          size={size}
          label={label}
          labelId={labelId}
          inputHint={inputHint}
          inputHintId={inputHintId}
          labelInline={labelInline}
          isRequired={required}
          validationRedesignOptIn
          labelWidth={
            labelInline && typeof inputWidth === "number"
              ? 100 - inputWidth
              : undefined
          }
          disabled={disabled}
          {...validationState}
          {...tagComponent("text-input", props)}
          {...filterStyledSystemMarginProps(props)}
        >
          <InputWrapper size={size} labelInline={labelInline}>
            <>
              {validationMessagePositionTop && (
                <>
                  {validationMessage}
                  {!disableErrorBorder &&
                    (validationState.error || validationState.warning) && (
                      <ErrorBorder
                        warning={Boolean(
                          !validationState.error && validationState.warning,
                        )}
                      />
                    )}
                </>
              )}
              {input}
              {!validationMessagePositionTop && (
                <>
                  {validationMessage}
                  {!disableErrorBorder &&
                    (validationState.error || validationState.warning) && (
                      <ErrorBorder
                        warning={Boolean(
                          !validationState.error && validationState.warning,
                        )}
                      />
                    )}
                </>
              )}
            </>
            {characterCount}
          </InputWrapper>
        </FormField>
      </InputBehaviour>
    );
  },
);

export default TextInput;
