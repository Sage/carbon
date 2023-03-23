import React, { useContext } from "react";
import { MarginProps } from "styled-system";

import { filterStyledSystemMarginProps } from "../../style/utils";
import {
  Input,
  InputPresentation,
  CommonInputProps,
} from "../../__internal__/input";
import { ValidationProps } from "../../__internal__/validations";
import InputIconToggle from "../../__internal__/input-icon-toggle";
import FormField from "../../__internal__/form-field";
import { IconType } from "../icon";
import useUniqueId from "../../__internal__/utils/helpers/useUniqueId";
import { InputBehaviour } from "../../__internal__/input-behaviour";
import StyledPrefix from "./__internal__/prefix.style";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import useCharacterCount from "../../hooks/__internal__/useCharacterCount";
import useInputAccessibility from "../../hooks/__internal__/useInputAccessibility/useInputAccessibility";
import { ErrorBorder, StyledHintText } from "./textbox.style";
import ValidationMessage from "../../__internal__/validation-message";
import { NewValidationContext } from "../carbon-provider/carbon-provider.component";
import NumeralDateContext from "../numeral-date/numeral-date-context";
import Box from "../box";
import Logger from "../../__internal__/utils/logger";

export interface CommonTextboxProps
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
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint?: number;
  /** Integer to determine a timeout for the deferred callback */
  deferTimeout?: number;
  /** Help content to be displayed under an input */
  fieldHelp?: React.ReactNode;
  /**
   * An optional alternative for props.value, this is useful if the
   * real value is an ID but you want to show a human-readable version.
   */
  formattedValue?: string;
  /**
   * Unique identifier for the input.
   * Label id will be based on it, using following pattern: [id]-label.
   * Will use a randomly generated GUID if none is provided.
   */
  id?: string;
  /** Type of the icon that will be rendered next to the input */
  inputIcon?: IconType;
  /** Optional handler for click event on Textbox icon */
  iconOnClick?: (
    ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => void;
  /** Optional handler for mouse down event on Textbox icon */
  iconOnMouseDown?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Overrides the default tabindex of the component */
  iconTabIndex?: number;
  /** The width of the input as a percentage */
  inputWidth?: number;
  /**
   * Prop for specifying the max width of the input.
   * Leaving the `maxWidth` prop with no value will default the width to '100%'
   */
  maxWidth?: string;
  /** Additional child elements to display before the input */
  leftChildren?: React.ReactNode;
  /** Label content */
  label?: string;
  /** Inline label alignment */
  labelAlign?: "left" | "right";
  /** A message that the Help component will display */
  labelHelp?: React.ReactNode;
  /** When true label is inline */
  labelInline?: boolean;
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** Label width */
  labelWidth?: number;
  /** Specify a callback triggered on change */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Deferred callback to be called after the onChange event */
  onChangeDeferred?: () => void;
  /** Specify a callback triggered on click */
  onClick?: (
    ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => void;
  /** Event handler for the focus event */
  onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Event handler for the blur event */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Event handler for the mouse down event */
  onMouseDown?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Emphasized part of the displayed text */
  prefix?: string;
  /** Reverses label and input display */
  reverse?: boolean;
  /** Size of an input */
  size?: "small" | "medium" | "large";
  /** When true, validation icon will be placed on label instead of being placed on the input */
  validationOnLabel?: boolean;
  /** Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** Aria label for rendered help component */
  helpAriaLabel?: string;
}

// TODO: Change characterLimit type to number - batch with other breaking changes
export interface TextboxProps extends CommonTextboxProps {
  /** Content to be rendered next to the input */
  children?: React.ReactNode;
  /** [Legacy] Flag to configure component as optional in Form */
  isOptional?: boolean;
  /** Container for DatePicker or SelectList components */
  positionedChildren?: React.ReactNode;
  /** Character limit of the textarea */
  characterLimit?: string | number;
  /** Stop the user typing over the characterLimit */
  enforceCharacterLimit?: boolean;
  /** Whether to display the character count message in red */
  warnOverLimit?: boolean;
}

let deprecateInputRefWarnTriggered = false;

export const Textbox = React.forwardRef(
  (
    {
      "aria-labelledby": ariaLabelledBy,
      align = "left",
      autoFocus,
      children,
      disabled,
      inputIcon,
      leftChildren,
      label,
      labelAlign,
      labelHelp,
      labelInline,
      labelSpacing,
      id,
      formattedValue,
      fieldHelp,
      error,
      warning,
      info,
      name,
      reverse,
      size = "medium",
      value,
      readOnly,
      placeholder,
      inputRef,
      onBlur,
      onClick,
      onFocus,
      onChange,
      onMouseDown,
      onChangeDeferred,
      deferTimeout,
      isOptional,
      iconOnClick,
      iconOnMouseDown,
      iconTabIndex,
      validationOnLabel = false,
      labelWidth = 30,
      inputWidth,
      maxWidth,
      prefix,
      adaptiveLabelBreakpoint,
      required,
      positionedChildren,
      tooltipPosition,
      "data-component": dataComponent,
      "data-element": dataElement,
      "data-role": dataRole,
      enforceCharacterLimit = true,
      characterLimit,
      warnOverLimit = false,
      helpAriaLabel,
      ...props
    }: TextboxProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const characterCountValue = typeof value === "string" ? value : "";
    const [maxLength, characterCount] = useCharacterCount(
      characterCountValue,
      // TODO: Can be removed after the characterLimit type is changed to number
      typeof characterLimit === "string"
        ? parseInt(characterLimit, 10)
        : characterLimit,
      warnOverLimit,
      enforceCharacterLimit
    );
    const { validationRedesignOptIn } = useContext(NewValidationContext);
    const { disableErrorBorder } = useContext(NumeralDateContext);
    const computeLabelPropValues = <T,>(prop: T): undefined | T =>
      validationRedesignOptIn ? undefined : prop;

    const [uniqueId, uniqueName] = useUniqueId(id, name);

    if (!deprecateInputRefWarnTriggered && inputRef) {
      deprecateInputRefWarnTriggered = true;
      Logger.deprecate(
        "The `inputRef` prop in `Textbox` component is deprecated and will soon be removed. Please use `ref` instead."
      );
    }

    const {
      labelId,
      validationIconId,
      fieldHelpId,
      ariaDescribedBy,
    } = useInputAccessibility({
      id: uniqueId,
      error,
      warning,
      info,
      label,
      fieldHelp,
    });

    const hasIconInside = !!(
      inputIcon ||
      (validationIconId && !validationOnLabel)
    );

    const input = (
      <InputPresentation
        align={align}
        disabled={disabled}
        readOnly={readOnly}
        size={size}
        error={error}
        warning={warning}
        info={info}
        inputWidth={inputWidth || 100 - labelWidth}
        maxWidth={maxWidth}
        positionedChildren={positionedChildren}
        hasIcon={hasIconInside}
      >
        {leftChildren}
        {prefix && (
          <StyledPrefix data-element="textbox-prefix" size={size}>
            {prefix}
          </StyledPrefix>
        )}
        <Input
          {...(required && { required })}
          align={align}
          aria-invalid={!!error}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={
            validationRedesignOptIn ? undefined : ariaDescribedBy
          }
          autoFocus={autoFocus}
          deferTimeout={deferTimeout}
          disabled={disabled}
          id={uniqueId}
          inputRef={inputRef}
          ref={ref}
          name={uniqueName}
          onBlur={onBlur}
          onChange={onChange}
          onChangeDeferred={onChangeDeferred}
          onClick={onClick}
          onFocus={onFocus}
          onMouseDown={onMouseDown}
          placeholder={disabled || readOnly ? "" : placeholder}
          readOnly={readOnly}
          value={typeof formattedValue === "string" ? formattedValue : value}
          maxLength={maxLength}
          {...props}
        />
        {children}
        <InputIconToggle
          align={align}
          disabled={disabled}
          error={error}
          iconTabIndex={iconTabIndex}
          info={info}
          inputIcon={inputIcon}
          onClick={iconOnClick || onClick}
          onMouseDown={iconOnMouseDown || onMouseDown}
          readOnly={readOnly}
          size={size}
          useValidationIcon={!(validationRedesignOptIn || validationOnLabel)}
          warning={warning}
          validationIconId={
            validationRedesignOptIn ? undefined : validationIconId
          }
        />
      </InputPresentation>
    );

    return (
      <TooltipProvider
        helpAriaLabel={helpAriaLabel}
        tooltipPosition={tooltipPosition}
      >
        <InputBehaviour>
          <FormField
            disabled={disabled}
            fieldHelpId={fieldHelpId}
            fieldHelp={computeLabelPropValues(fieldHelp)}
            error={error}
            warning={warning}
            info={info}
            label={label}
            labelId={labelId}
            labelAlign={computeLabelPropValues(labelAlign)}
            labelHelp={computeLabelPropValues(labelHelp)}
            labelInline={computeLabelPropValues(labelInline)}
            labelSpacing={labelSpacing}
            labelWidth={computeLabelPropValues(labelWidth)}
            id={uniqueId}
            reverse={computeLabelPropValues(reverse)}
            isOptional={isOptional}
            useValidationIcon={computeLabelPropValues(validationOnLabel)}
            adaptiveLabelBreakpoint={adaptiveLabelBreakpoint}
            isRequired={required}
            data-component={dataComponent}
            data-role={dataRole}
            data-element={dataElement}
            validationIconId={
              validationRedesignOptIn ? undefined : validationIconId
            }
            validationRedesignOptIn={validationRedesignOptIn}
            {...filterStyledSystemMarginProps(props)}
          >
            {validationRedesignOptIn && labelHelp && (
              <StyledHintText>{labelHelp}</StyledHintText>
            )}
            {validationRedesignOptIn ? (
              <Box position="relative">
                <ValidationMessage error={error} warning={warning} />
                {!disableErrorBorder && (error || warning) && (
                  <ErrorBorder warning={!!(!error && warning)} />
                )}
                {input}
              </Box>
            ) : (
              input
            )}
          </FormField>
          {characterCount}
        </InputBehaviour>
      </TooltipProvider>
    );
  }
);

Textbox.displayName = "Textbox";

export default Textbox;
