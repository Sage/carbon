import React, { useContext, useRef, useState } from "react";

import { MarginProps } from "styled-system";

import Box from "../box";
import { IconType } from "../icon";
import FormField from "../../__internal__/form-field";
import HintText from "../../__internal__/hint-text";
import {
  Input,
  InputPresentation,
  CommonInputProps,
} from "../../__internal__/input";
import { InputBehaviour } from "../../__internal__/input-behaviour";
import InputIconToggle from "../../__internal__/input-icon-toggle";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import ValidationMessage from "../../__internal__/validation-message";
import { ValidationProps } from "../../__internal__/validations";
import { filterStyledSystemMarginProps } from "../../style/utils";
import NewValidationContext from "../carbon-provider/__internal__/new-validation.context";
import NumeralDateContext from "../numeral-date/__internal__/numeral-date.context";
import Logger from "../../__internal__/utils/logger";
import useCharacterCount from "../../hooks/useCharacterCount";
import useUniqueId from "../../hooks/__internal__/useUniqueId";
import guid from "../../__internal__/utils/helpers/guid";
import useInputAccessibility from "../../hooks/__internal__/useInputAccessibility/useInputAccessibility";
import ErrorBorder from "./textbox.style";
import StyledPrefix from "./__internal__/prefix.style";
import { TagProps } from "../../__internal__/utils/helpers/tags";

export const ALIGN_DEFAULT = "left";
export const SIZE_DEFAULT = "medium";
export const LABEL_WIDTH_DEFAULT = 30;
export const LABEL_VALIDATION_DEFAULT = false;

export interface CommonTextboxProps
  extends ValidationProps,
    MarginProps,
    Omit<CommonInputProps, "size" | "inputBorderRadius">,
    TagProps {
  /** Prop to specify the aria-labelledby property of the component */
  "aria-labelledby"?: string;
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint?: number;
  /** Integer to determine a timeout for the deferred callback */
  deferTimeout?: number;
  /** A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. */
  inputHint?: string;
  /** [Legacy] Help content to be displayed under an input. */
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
    ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
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
  /** Label alignment */
  labelAlign?: "left" | "right";
  /**
   * [Legacy] Text applied to label help tooltip. When opted into new design validations
   * it will render as a hint above the input, unless an `inputHint`
   * prop is also passed.
   */
  labelHelp?: React.ReactNode;
  /** [Legacy] When true label is inline. */
  labelInline?: boolean;
  /** [Legacy] Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8). */
  labelSpacing?: 1 | 2;
  /** [Legacy] Label width as a percentage when label is inline. */
  labelWidth?: number;
  /** Specify a callback triggered on change */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Deferred callback to be called after the onChange event */
  onChangeDeferred?: () => void;
  /** Specify a callback triggered on click */
  onClick?: (
    ev: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
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
  /** [Legacy] When true, validation icon will be placed on label instead of being placed on the input. */
  validationOnLabel?: boolean;
  /** [Legacy] Overrides the default tooltip position. */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** [Legacy] Aria label for rendered help component. */
  helpAriaLabel?: string;
  /** The id attribute for the validation tooltip */
  tooltipId?: string;
  /** @private @internal @ignore */
  "data-component"?: string;
  /** Render the ValidationMessage above the Textbox input when validationRedesignOptIn flag is set */
  validationMessagePositionTop?: boolean;
}

export interface TextboxProps extends CommonTextboxProps {
  /** Content to be rendered next to the input */
  children?: React.ReactNode;
  /** Container for DatePicker or SelectList components */
  positionedChildren?: React.ReactNode;
  /** Character limit of the textarea */
  characterLimit?: number;
}

let deprecatedAriaDescribedByWarnTriggered = false;
let deprecateUncontrolledWarnTriggered = false;

export const Textbox = React.forwardRef(
  (
    {
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedByProp,
      ariaDescribedBy: ariaDescribedByDeprecated,
      align = ALIGN_DEFAULT,
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
      inputHint,
      fieldHelp,
      error,
      warning,
      info,
      name,
      reverse,
      size = SIZE_DEFAULT,
      value,
      readOnly,
      placeholder,
      onBlur,
      onClick,
      onFocus,
      onChange,
      onMouseDown,
      onChangeDeferred,
      deferTimeout,
      iconOnClick,
      iconOnMouseDown,
      iconTabIndex,
      validationOnLabel = LABEL_VALIDATION_DEFAULT,
      labelWidth = LABEL_WIDTH_DEFAULT,
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
      characterLimit,
      helpAriaLabel,
      tooltipId,
      validationMessagePositionTop = true,
      ...props
    }: TextboxProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const characterCountValue = typeof value === "string" ? value : "";

    const [uniqueId, uniqueName] = useUniqueId(id, name);

    const [characterCountAriaLive, setCharacterCountAriaLive] = useState<
      "off" | "polite"
    >("off");

    // This block of code has been covered in a Playwright test.
    // istanbul ignore next
    const handleFocus = (ev: React.FocusEvent<HTMLInputElement>) => {
      if (characterLimit) setCharacterCountAriaLive("polite");
      onFocus?.(ev);
    };

    // This block of code has been covered in a Playwright test.
    // istanbul ignore next
    const handleBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
      if (characterLimit) setCharacterCountAriaLive("off");
      onBlur?.(ev);
    };

    const [characterCount, visuallyHiddenHintId] = useCharacterCount(
      characterCountValue,
      characterLimit,
      characterCountAriaLive,
    );
    const { validationRedesignOptIn } = useContext(NewValidationContext);
    const { disableErrorBorder } = useContext(NumeralDateContext);
    const computeLabelPropValues = <T,>(prop: T): undefined | T =>
      validationRedesignOptIn ? undefined : prop;

    if (!deprecateUncontrolledWarnTriggered && !onChange) {
      deprecateUncontrolledWarnTriggered = true;
      Logger.deprecate(
        "Uncontrolled behaviour in `Textbox` is deprecated and support will soon be removed. Please make sure all your inputs are controlled.",
      );
    }

    if (!deprecatedAriaDescribedByWarnTriggered && ariaDescribedByDeprecated) {
      deprecatedAriaDescribedByWarnTriggered = true;
      Logger.deprecate(
        "The `ariaDescribedBy` prop in `Textbox` is deprecated and will soon be removed, please use `aria-describedby` instead.",
      );
    }

    const { labelId, validationId, fieldHelpId, ariaDescribedBy } =
      useInputAccessibility({
        id: uniqueId,
        validationRedesignOptIn,
        error,
        warning,
        info,
        label,
        fieldHelp,
      });

    const hintId = useRef(guid());
    const inputHintId = inputHint ? hintId.current : undefined;

    const describedByArray =
      validationRedesignOptIn && validationMessagePositionTop
        ? [ariaDescribedBy, inputHintId]
        : [inputHintId, ariaDescribedBy];
    const combinedAriaDescribedBy = [
      ...describedByArray,
      visuallyHiddenHintId,
      ariaDescribedByProp || ariaDescribedByDeprecated,
    ]
      .filter(Boolean)
      .join(" ");

    const hasIconInside = !!(inputIcon || (validationId && !validationOnLabel));

    const input = (
      <InputPresentation
        align={align}
        disabled={disabled}
        readOnly={readOnly}
        size={size}
        error={error}
        warning={warning}
        info={info}
        prefix={prefix}
        inputWidth={inputWidth || 100 - labelWidth}
        maxWidth={labelInline || labelAlign !== "right" ? maxWidth : undefined}
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
          aria-describedby={combinedAriaDescribedBy}
          autoFocus={autoFocus}
          deferTimeout={deferTimeout}
          disabled={disabled}
          id={uniqueId}
          ref={ref}
          name={uniqueName}
          onBlur={handleBlur}
          onChange={onChange}
          onChangeDeferred={onChangeDeferred}
          onClick={disabled || readOnly ? undefined : onClick}
          onFocus={handleFocus}
          onMouseDown={disabled || readOnly ? undefined : onMouseDown}
          placeholder={disabled || readOnly ? "" : placeholder}
          readOnly={readOnly}
          value={typeof formattedValue === "string" ? formattedValue : value}
          validationIconId={
            validationRedesignOptIn ? undefined : tooltipId || validationId
          }
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
          onClick={disabled || readOnly ? undefined : iconOnClick || onClick}
          onMouseDown={
            disabled || readOnly ? undefined : iconOnMouseDown || onMouseDown
          }
          readOnly={readOnly}
          size={size}
          useValidationIcon={!(validationRedesignOptIn || validationOnLabel)}
          warning={warning}
          validationIconId={
            validationRedesignOptIn ? undefined : tooltipId || validationId
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
            maxWidth={
              !labelInline && labelAlign === "right" ? maxWidth : undefined
            }
            disabled={disabled}
            fieldHelpId={fieldHelpId}
            fieldHelp={computeLabelPropValues(fieldHelp)}
            error={error}
            warning={warning}
            info={info}
            label={label}
            labelId={labelId}
            labelAlign={labelAlign}
            labelHelp={computeLabelPropValues(labelHelp)}
            labelInline={computeLabelPropValues(labelInline)}
            labelSpacing={labelSpacing}
            labelWidth={computeLabelPropValues(labelWidth)}
            id={uniqueId}
            reverse={computeLabelPropValues(reverse)}
            useValidationIcon={computeLabelPropValues(validationOnLabel)}
            adaptiveLabelBreakpoint={adaptiveLabelBreakpoint}
            isRequired={required}
            data-component={dataComponent}
            data-role={dataRole}
            data-element={dataElement}
            validationIconId={
              validationRedesignOptIn ? undefined : validationId
            }
            validationRedesignOptIn={validationRedesignOptIn}
            {...filterStyledSystemMarginProps(props)}
          >
            {(inputHint || (labelHelp && validationRedesignOptIn)) && (
              <HintText
                align={labelAlign}
                data-element="input-hint"
                id={inputHintId}
                isComponentInline={labelInline}
              >
                {inputHint || labelHelp}
              </HintText>
            )}
            {validationRedesignOptIn ? (
              <Box position="relative">
                {validationMessagePositionTop && (
                  <>
                    <ValidationMessage
                      error={error}
                      validationId={validationId}
                      warning={warning}
                      validationMessagePositionTop={
                        validationMessagePositionTop
                      }
                    />
                    {!disableErrorBorder && (error || warning) && (
                      <ErrorBorder warning={!!(!error && warning)} />
                    )}
                  </>
                )}
                {input}
                {!validationMessagePositionTop && (
                  <>
                    <ValidationMessage
                      error={error}
                      validationId={validationId}
                      warning={warning}
                      validationMessagePositionTop={
                        validationMessagePositionTop
                      }
                    />
                    {!disableErrorBorder && (error || warning) && (
                      <ErrorBorder warning={!!(!error && warning)} />
                    )}
                  </>
                )}
              </Box>
            ) : (
              input
            )}
            {characterCount}
          </FormField>
        </InputBehaviour>
      </TooltipProvider>
    );
  },
);

Textbox.displayName = "Textbox";

export default Textbox;
