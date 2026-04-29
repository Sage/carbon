import React, { useCallback, useContext, useRef } from "react";

import { MarginProps } from "styled-system";

import Input, { InputProps } from "../../../../__internal__/input";
import ValidationMessage from "../../../../__internal__/validation-message/__next__";
import { ValidationProps } from "../../../../__internal__/validations";
import {
  filterOutStyledSystemSpacingProps,
  filterStyledSystemMarginProps,
} from "../../../../style/utils";
import useUniqueId from "../../../../hooks/__internal__/useUniqueId";
import guid from "../../../../__internal__/utils/helpers/guid";
import useInputAccessibility from "../../../../hooks/__internal__/useInputAccessibility/useInputAccessibility";
import ErrorBorder from "../../../../__internal__/error-border/error-border.style";
import { TagProps } from "../../../../__internal__/utils/helpers/tags";
import {
  StyledTextInput,
  LabelWrapper,
  InputWrapper,
} from "./text-input.style";
import HintText from "../../../../__internal__/hint-text";
import Label from "../../../../__internal__/label";
import useRegisterValidationToTabs from "../../../../hooks/__internal__/useRegisterValidationToTabs/useRegisterValidationToTabs";
import combineRefs from "../../../../__internal__/utils/helpers/combine-refs";
import FieldsetValidationContext from "../../../../__internal__/fieldset-validation-context";

export interface TextInputProps
  extends Omit<ValidationProps, "info">,
    MarginProps,
    Omit<InputProps, "size" | "error">,
    TagProps {
  /**
   * @private @internal @ignore
   * Sets the input's text alignment. Does not affect the position of the input's prefix or suffix icons.
   */
  align?: "left" | "right";
  /**
   * The ID of the element(s) that describe the input, typically used to reference the hint and/or
   * validation message(s) associated with the input. Can be a space-separated list of IDs if there
   * are multiple descriptive elements.
   */
  "aria-describedby"?: string;
  /**
   * The ID of the element that labels the input, typically used to reference the input's label when
   * the label is not properly associated with the input via the htmlFor attribute.
   */
  "aria-labelledby"?: string;
  /**
   * If true, the input will automatically receive focus when the component is mounted.
   */
  autoFocus?: boolean;
  /**
   * Unique identifier for the input.
   * Label id will be based on it, using following pattern: [id]-label.
   * Will use a randomly generated GUID if none is provided
   */
  /**
   * @private @internal @ignore
   * `data-component` attribute to be added to the component's root element for testing and tracking purposes.
   */
  "data-component"?: string;
  /**
   * @private @internal @ignore
   * `data-is-open` attribute to be added to the component's root element when rendered as part of Select.
   */
  "data-is-open"?: boolean;
  /**
   * Sets the input's id attribute, is not set a unique id will be generated and used.
   * The label's htmlFor attribute will be set to match the input's id to ensure they are properly associated.
   */
  id?: string;
  /** A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input */
  inputHint?: string;
  /**
   * @internal @private @ignore
   * An Icon to be rendered next to the input
   * */
  inputIcon?: React.ReactNode;
  /** The width of the input as a percentage (e.g., 50 for 50%) */
  inputWidth?: number;
  /** Label content */
  label: string;
  /** When true label is inline */
  labelInline?: boolean;
  /**
   * Slot to render additional content to the left of the input, such as a prefix.
   */
  leftChildren?: React.ReactNode;
  /** The maximum width of the component container */
  maxWidth?: string;
  /**
   * @param ev - React's mouse event for the input element
   * Callback called when mouse is clicked down on the input, but before it receives focus.
   */
  onMouseDown?: (ev: React.MouseEvent<HTMLElement>) => void;
  /**
   * @param ev - React's mouse event for the input element
   * Callback called when the input is clicked.
   */
  onClick?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Size of an input */
  size?: "small" | "medium" | "large";
  /**
   * The type of the input, e.g., "text", "email", "password". This prop is passed directly
   * to the underlying <input> element, so any valid HTML input type is accepted.
   * The default value is "text".
   */
  type?: string;
  /**
   * @private @internal @ignore
   * If true, the validation message will be rendered above the input, otherwise it will be rendered below.
   */
  validationMessagePositionTop?: boolean;
}

const INPUT_WIDTH = 100;
const INLINE_INPUT_WIDTH = INPUT_WIDTH - 20;

export const TextInput = React.forwardRef(
  (
    {
      autoFocus,
      "aria-describedby": ariaDescribedByProp,
      "aria-labelledby": ariaLabelledBy,
      children,
      "data-component": dataComponent = "text-input",
      "data-element": dataElement,
      "data-is-open": dataIsOpen,
      "data-role": dataRole,
      disabled,
      error,
      id,
      inputHint,
      inputIcon,
      inputWidth,
      label,
      labelInline = false,
      leftChildren,
      maxWidth,
      name,
      onChange,
      onClick,
      onMouseDown,
      placeholder,
      prefix,
      readOnly,
      required,
      size = "medium",
      type = "text",
      validationMessagePositionTop,
      value,
      warning,
      ...rest
    }: TextInputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const localRef = useRef<HTMLInputElement>(null);
    // TODO: FE-7649 change to imperative handleFocus method when moving this from __next__
    const combinedRef = combineRefs(ref, localRef);
    const { disableErrorBorder } = useContext(FieldsetValidationContext);
    const stateProps = { disabled, readOnly };
    const [uniqueId, uniqueName] = useUniqueId(id, name);
    const { labelId, validationId, ariaDescribedBy } = useInputAccessibility({
      id: uniqueId,
      validationRedesignOptIn: true,
      error,
      warning,
      label,
    });
    const hintId = useRef(guid());
    const inputHintId = inputHint ? hintId.current : undefined;

    const resolvedInputWidth =
      inputWidth ?? (labelInline ? INLINE_INPUT_WIDTH : INPUT_WIDTH);
    const ariaDescribedByString = [
      inputHintId,
      ariaDescribedBy,
      ariaDescribedByProp,
    ]
      .filter(Boolean)
      .join(" ");
    const hasValidationFailure = !!(error || warning);

    useRegisterValidationToTabs(!!error, !!warning, uniqueId);

    const validationMessage = hasValidationFailure && !disableErrorBorder && (
      <ValidationMessage
        id={validationId}
        isLarge={size === "large"}
        error={error}
        warning={warning}
      />
    );

    const errorBorder = hasValidationFailure && !disableErrorBorder && (
      <ErrorBorder data-role="error-border" $warning={!!(!error && warning)} />
    );

    const handleMouseDown = useCallback(
      (ev: React.MouseEvent<HTMLElement>) => {
        if (disabled || readOnly) return;
        onMouseDown?.(ev);
      },
      [onMouseDown, disabled, readOnly],
    );

    const handleClick = useCallback(
      (ev: React.MouseEvent<HTMLElement>) => {
        if (disabled || readOnly) return;
        onClick?.(ev);
      },
      [onClick, disabled, readOnly],
    );

    return (
      <StyledTextInput
        data-element={dataElement}
        data-role={dataRole}
        data-component={dataComponent}
        $size={size}
        $labelInline={labelInline}
        {...filterStyledSystemMarginProps(rest)}
      >
        {label && (
          <LabelWrapper
            data-role="label-wrapper"
            $labelInline={labelInline}
            $labelWrapperWidth={
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
          </LabelWrapper>
        )}
        <InputWrapper
          data-role="input-wrapper"
          $size={size}
          $maxWidth={maxWidth}
          $inputWidth={inputWidth}
          onClick={() => {
            if (
              !disabled &&
              !readOnly &&
              document.activeElement !== localRef.current
            ) {
              localRef.current?.focus();
            }
          }}
          data-is-open={dataIsOpen}
        >
          {validationMessagePositionTop && validationMessage}
          <Input
            id={uniqueId}
            name={uniqueName}
            aria-invalid={!!error}
            aria-describedby={ariaDescribedByString}
            aria-labelledby={ariaLabelledBy}
            value={value}
            placeholder={!(disabled || readOnly) ? placeholder : undefined}
            required={required}
            ref={combinedRef}
            autoFocus={autoFocus}
            onMouseDown={handleMouseDown}
            onClick={handleClick}
            onChange={onChange}
            error={!!error}
            inputIcon={inputIcon}
            size={size}
            prefix={prefix}
            leftChildren={leftChildren}
            type={type}
            {...stateProps}
            {...filterOutStyledSystemSpacingProps(rest)}
          >
            {children}
          </Input>
          {!validationMessagePositionTop && validationMessage}
          {errorBorder}
        </InputWrapper>
      </StyledTextInput>
    );
  },
);

export default TextInput;
