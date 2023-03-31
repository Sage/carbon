import React, { useRef, useEffect, useContext, useCallback } from "react";
import { MarginProps } from "styled-system";

import { IconType } from "../icon";
import { ValidationProps } from "../../__internal__/validations";
import { CommonInputProps, InputPresentation } from "../../__internal__/input";
import FormField from "../../__internal__/form-field";
import useCharacterCount from "../../hooks/__internal__/useCharacterCount";

import Input from "../../__internal__/input/input.component";
import { InputBehaviour } from "../../__internal__/input-behaviour";
import InputIconToggle from "../../__internal__/input-icon-toggle";
import guid from "../../__internal__/utils/helpers/guid";
import StyledTextarea, { MIN_HEIGHT } from "./textarea.style";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import useInputAccessibility from "../../hooks/__internal__/useInputAccessibility";
import { NewValidationContext } from "../carbon-provider/carbon-provider.component";
import {
  ErrorBorder,
  StyledHintText,
  StyledInputHint,
} from "../textbox/textbox.style";
import ValidationMessage from "../../__internal__/validation-message";
import Box from "../box";
import Logger from "../../__internal__/utils/logger";
import useFormSpacing from "../../hooks/__internal__/useFormSpacing";

export interface TextareaProps
  extends ValidationProps,
    MarginProps,
    Omit<CommonInputProps, "size"> {
  /** Prop to specify the aria-labelledby property of the component */
  "aria-labelledby"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role"?: string;
  /** id of the input */
  id?: string;
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint?: number;
  /** Automatically focus the input on component mount */
  autoFocus?: boolean;
  /** Character limit of the textarea */
  characterLimit?: number;
  /** Type of the icon that will be rendered next to the input */
  children?: React.ReactNode;
  /** The visible width of the text control, in average character widths */
  cols?: number;
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** Stop the user typing over the characterLimit */
  enforceCharacterLimit?: boolean;
  /** Indicate that error has occurred
  Pass string to display icon, tooltip and red border
  Pass true boolean to only display red border */
  error?: boolean | string;
  /** Allows the Textareas Height to change based on user input */
  expandable?: boolean;
  /** A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. */
  inputHint?: string;
  /** Help content to be displayed under an input */
  fieldHelp?: React.ReactNode;
  /** Aria label for rendered help component */
  helpAriaLabel?: string;
  /** Indicate additional information
  Pass string to display icon, tooltip and blue border
  Pass true boolean to only display blue border */
  info?: boolean | string;
  /**
   * <a href="https://brand.sage.com/d/NdbrveWvNheA/foundations#/icons/icons" target="_blank">List of supported icons</a>
   *
   * Icon to display inside of the Textarea
   */
  inputIcon?: IconType;
  /** Width of an input in percentage. Works only when labelInline is true */
  inputWidth?: number;
  /**
   * Prop for specifying the max width of the input.
   * Leaving the `maxWidth` prop with no value will default the width to '100%'
   */
  maxWidth?: string;
  /** The content of the label for the input */
  label?: string;
  /** Inline label alignment */
  labelAlign?: "left" | "right";
  /** Text applied to label help tooltip */
  labelHelp?: React.ReactNode;
  /** When true, label is placed in line an input */
  labelInline?: boolean;
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** Width of a label in percentage. Works only when labelInline is true */
  labelWidth?: number;
  /** Name of the input */
  name?: string;
  /** Callback fired when the user types in the Textarea */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Placeholder text for the component */
  placeholder?: string;
  /** Adds readOnly property */
  readOnly?: boolean;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** The number of visible text lines for the control */
  rows?: number;
  /** One of type of size to apply to the textarea */
  size?: "small" | "medium" | "large";
  /** Message to be displayed in a Tooltip when the user hovers over the help icon */
  tooltipMessage?: string;
  /** Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** When true, validation icon will be placed on label instead of being placed on the input */
  validationOnLabel?: boolean;
  /** The value of the Textbox */
  value?: string;
  /** Indicate that warning has occurred
  Pass string to display icon, tooltip and orange border
  Pass true boolean to only display orange border */
  warning?: boolean | string;
}

let deprecateInputRefWarnTriggered = false;

export const Textarea = React.forwardRef(
  (
    {
      "aria-labelledby": ariaLabelledBy,
      autoFocus,
      inputHint,
      fieldHelp,
      label,
      size,
      children,
      characterLimit,
      enforceCharacterLimit = true,
      onChange,
      disabled = false,
      labelInline,
      labelAlign,
      labelHelp,
      labelSpacing,
      inputIcon,
      id: idProp,
      error,
      warning,
      info,
      name,
      readOnly = false,
      placeholder,
      expandable = false,
      rows,
      cols,
      validationOnLabel = false,
      adaptiveLabelBreakpoint,
      inputWidth,
      maxWidth,
      labelWidth = 30,
      tooltipPosition,
      value,
      "data-component": dataComponent,
      "data-element": dataElement,
      "data-role": dataRole,
      helpAriaLabel,
      inputRef,
      ...rest
    }: TextareaProps,
    ref: React.ForwardedRef<HTMLTextAreaElement>
  ) => {
    const { validationRedesignOptIn } = useContext(NewValidationContext);
    const computeLabelPropValues = <T,>(prop: T): undefined | T =>
      validationRedesignOptIn ? undefined : prop;

    const { current: id } = useRef(idProp || guid());

    const internalRef = useRef<HTMLTextAreaElement | null>(null);

    const callbackRef = useCallback(
      (inputElement: HTMLTextAreaElement | null) => {
        internalRef.current = inputElement;

        if (!ref) {
          return;
        }

        if ("current" in ref) {
          ref.current = inputElement;
        } else {
          ref(inputElement);
        }
      },
      [ref]
    );

    if (!deprecateInputRefWarnTriggered && inputRef) {
      deprecateInputRefWarnTriggered = true;
      Logger.deprecate(
        "The `inputRef` prop in `Textarea` component is deprecated and will soon be removed. Please use `ref` instead."
      );
    }

    const minHeight = useRef(MIN_HEIGHT);

    const expandTextarea = () => {
      const textarea = internalRef.current;

      if (
        textarea?.scrollHeight &&
        textarea?.scrollHeight > minHeight.current
      ) {
        textarea.style.height = "0px";
        // Set the height so all content is shown
        textarea.style.height = `${Math.max(
          textarea.scrollHeight,
          minHeight.current
        )}px`;
      }
    };

    const {
      labelId,
      validationId,
      fieldHelpId,
      ariaDescribedBy,
    } = useInputAccessibility({
      id,
      validationRedesignOptIn,
      error,
      warning,
      info,
      label,
      fieldHelp,
    });

    const [
      maxLength,
      characterCount,
      characterCountHintId,
      characterCountHint,
    ] = useCharacterCount(value, characterLimit, enforceCharacterLimit);

    useEffect(() => {
      if (rows) {
        minHeight.current = internalRef?.current?.scrollHeight || 0;
      }
    }, [rows]);

    useEffect(() => {
      if (expandable) {
        expandTextarea();
      }
    });

    useEffect(() => {
      if (expandable) {
        window.addEventListener("resize", expandTextarea);
        minHeight.current = internalRef?.current?.clientHeight || 0;
      }

      return () => {
        if (expandable) {
          window.removeEventListener("resize", expandTextarea);
        }
      };
    }, [expandable]);

    const hasIconInside = !!(inputIcon || (validationId && !validationOnLabel));

    const hintId = useRef(guid());

    const characterCountHintIdValue = characterCount
      ? characterCountHintId
      : undefined;

    const inputHintIdValue = inputHint ? hintId.current : undefined;

    const hintIdValue = characterLimit
      ? characterCountHintIdValue
      : inputHintIdValue;

    const combinedAriaDescribedBy = [ariaDescribedBy, hintIdValue]
      .filter(Boolean)
      .join(" ");

    const input = (
      <InputPresentation
        size={size}
        disabled={disabled}
        readOnly={readOnly}
        inputWidth={
          typeof inputWidth === "number" ? inputWidth : 100 - labelWidth
        }
        maxWidth={maxWidth}
        error={error}
        warning={warning}
        info={info}
      >
        <Input
          aria-invalid={!!error}
          aria-labelledby={ariaLabelledBy}
          ariaDescribedBy={combinedAriaDescribedBy}
          autoFocus={autoFocus}
          name={name}
          value={value}
          ref={callbackRef}
          maxLength={maxLength}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={disabled ? "" : placeholder}
          rows={rows}
          cols={cols}
          id={id}
          as="textarea"
          inputRef={inputRef}
          validationIconId={validationRedesignOptIn ? undefined : validationId}
          {...rest}
        />
        {children}
        <InputIconToggle
          disabled={disabled}
          readOnly={readOnly}
          inputIcon={inputIcon}
          size={size}
          error={error}
          warning={warning}
          info={info}
          validationIconId={validationRedesignOptIn ? undefined : validationId}
          useValidationIcon={!(validationRedesignOptIn || validationOnLabel)}
        />
      </InputPresentation>
    );

    const marginProps = useFormSpacing(rest);

    return (
      <TooltipProvider
        tooltipPosition={tooltipPosition}
        helpAriaLabel={helpAriaLabel}
      >
        <InputBehaviour>
          <StyledTextarea
            labelInline={labelInline}
            data-component={dataComponent}
            data-role={dataRole}
            data-element={dataElement}
            hasIcon={hasIconInside}
            {...marginProps}
          >
            <FormField
              fieldHelp={computeLabelPropValues(fieldHelp)}
              fieldHelpId={fieldHelpId}
              error={error}
              warning={warning}
              info={info}
              label={label}
              labelId={labelId}
              disabled={disabled}
              id={id}
              labelInline={computeLabelPropValues(labelInline)}
              labelAlign={computeLabelPropValues(labelAlign)}
              labelWidth={computeLabelPropValues(labelWidth)}
              labelHelp={computeLabelPropValues(labelHelp)}
              labelSpacing={labelSpacing}
              isRequired={rest.required}
              useValidationIcon={computeLabelPropValues(validationOnLabel)}
              adaptiveLabelBreakpoint={adaptiveLabelBreakpoint}
              validationRedesignOptIn={validationRedesignOptIn}
            >
              {characterLimit || inputHint ? (
                <StyledInputHint id={hintIdValue} data-element="input-hint">
                  {characterCountHint || inputHint}
                </StyledInputHint>
              ) : null}
              {validationRedesignOptIn && labelHelp && (
                <StyledHintText>{labelHelp}</StyledHintText>
              )}
              {validationRedesignOptIn ? (
                <Box position="relative">
                  <ValidationMessage
                    error={error}
                    validationId={validationId}
                    warning={warning}
                  />
                  {(error || warning) && (
                    <ErrorBorder warning={!!(!error && warning)} />
                  )}
                  {input}
                </Box>
              ) : (
                input
              )}
            </FormField>
            {characterCount}
          </StyledTextarea>
        </InputBehaviour>
      </TooltipProvider>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea as OriginalTextarea };
export default Textarea;
