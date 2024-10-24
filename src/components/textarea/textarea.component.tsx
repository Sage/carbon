import React, {
  useRef,
  useEffect,
  useContext,
  useCallback,
  useState,
} from "react";
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
import StyledTextarea, { DEFAULT_MIN_HEIGHT } from "./textarea.style";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import useInputAccessibility from "../../hooks/__internal__/useInputAccessibility";
import NewValidationContext from "../carbon-provider/__internal__/new-validation.context";
import { ErrorBorder, StyledHintText } from "../textbox/textbox.style";
import ValidationMessage from "../../__internal__/validation-message";
import Box from "../box";
import Logger from "../../__internal__/utils/logger";
import useFormSpacing from "../../hooks/__internal__/useFormSpacing";
import { BorderRadiusType } from "../box/box.component";

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
  /** If true, the component will be disabled */
  disabled?: boolean;
  /**
   * Indicate that error has occurred.
   * Pass string to display icon, tooltip and red border.
   * Pass true boolean to only display red border.
   */
  error?: boolean | string;
  /** Allows the Textareas Height to change based on user input */
  expandable?: boolean;
  /** A hint string rendered before the input but after the label. Intended to describe the purpose or content of the input. */
  inputHint?: string;
  /** [Legacy] Help content to be displayed under an input */
  fieldHelp?: React.ReactNode;
  /** [Legacy] Aria label for rendered help component */
  helpAriaLabel?: string;
  /**
   * [Legacy] Indicate additional information.
   * Pass string to display icon, tooltip and blue border.
   * Pass true boolean to only display blue border.
   */
  info?: boolean | string;
  /**
   * <a href="https://brand.sage.com/d/NdbrveWvNheA/foundations#/icons/icons" target="_blank">List of supported icons</a>
   *
   * Icon to display inside of the Textarea
   */
  inputIcon?: IconType;
  /** [Legacy] Width of an input in percentage. Works only when labelInline is true */
  inputWidth?: number;
  /**
   * Prop for specifying the max width of the input.
   * Leaving the `maxWidth` prop with no value will default the width to '100%'
   */
  maxWidth?: string;
  /** The content of the label for the input */
  label?: string;
  /** [Legacy] Inline label alignment */
  labelAlign?: "left" | "right";
  /**
   * [Legacy] Text applied to label help tooltip. When opted into new design validations
   * it will render as a hint above the input, unless an `inputHint`
   * prop is also passed
   */
  labelHelp?: React.ReactNode;
  /** [Legacy] When true, label is placed in line an input */
  labelInline?: boolean;
  /** [Legacy] Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** [Legacy] Width of a label in percentage. Works only when labelInline is true */
  labelWidth?: number;
  /** Name of the input */
  name?: string;
  /** Callback fired when the user types in the Textarea */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Placeholder text for the component */
  placeholder?: string;
  /** Adds readOnly property */
  readOnly?: boolean;
  /** Flag to configure component as optional */
  isOptional?: boolean;
  /** The number of visible text lines for the control */
  rows?: number;
  /** [Legacy] Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  /** [Legacy] When true, validation icon will be placed on label instead of being placed on the input */
  validationOnLabel?: boolean;
  /** The value of the Textbox */
  value?: string;
  /**
   * Indicate that warning has occurred.
   * Pass string to display icon, tooltip and orange border.
   * Pass true boolean to only display orange border.
   */
  warning?: boolean | string;
  /** Specify a custom border radius for the component. Any valid border-radius design token, or an array of border-radius design tokens. */
  borderRadius?: BorderRadiusType | BorderRadiusType[];
  /** Hides the borders for the component. Please note that validation and focus styling will still be applied */
  hideBorders?: boolean;
  /** Specify the minimum height */
  minHeight?: number;
}

let deprecateUncontrolledWarnTriggered = false;
let warnBorderRadiusArrayTooLarge = false;

export const Textarea = React.forwardRef(
  (
    {
      "aria-labelledby": ariaLabelledBy,
      autoFocus,
      inputHint,
      fieldHelp,
      label,
      children,
      characterLimit,
      onChange,
      onFocus,
      onBlur,
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
      borderRadius,
      hideBorders = false,
      required,
      isOptional,
      minHeight = DEFAULT_MIN_HEIGHT,
      ...rest
    }: TextareaProps,
    ref: React.ForwardedRef<HTMLTextAreaElement>
  ) => {
    const { validationRedesignOptIn } = useContext(NewValidationContext);

    const labelInlineWithNewValidation = validationRedesignOptIn
      ? false
      : labelInline;

    const [textareaMinHeight, setTextareaMinHeight] = useState(
      DEFAULT_MIN_HEIGHT
    );
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

    if (!deprecateUncontrolledWarnTriggered && !onChange) {
      deprecateUncontrolledWarnTriggered = true;
      Logger.deprecate(
        "Uncontrolled behaviour in `Textarea` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
      );
    }

    if (
      Array.isArray(borderRadius) &&
      borderRadius.length > 4 &&
      !warnBorderRadiusArrayTooLarge
    ) {
      // eslint-disable-next-line no-console
      console.warn(
        "The `borderRadius` prop in `Textarea` component only supports up to 4 values."
      );
      warnBorderRadiusArrayTooLarge = true;
    }

    const expandTextarea = useCallback(() => {
      const textarea = internalRef.current;

      if (
        textarea?.scrollHeight &&
        textarea?.scrollHeight > textareaMinHeight
      ) {
        // need to reset scroll position of the nearest parent which scrolls
        let scrollElement: HTMLElement | null = textarea;
        while (scrollElement && !scrollElement?.scrollTop) {
          scrollElement = scrollElement?.parentElement || null;
        }

        const scrollPosition = scrollElement?.scrollTop;

        // Reset height to allow shrinking when lines are removed
        textarea.style.height = "auto";
        // Set the height so all content is shown
        textarea.style.height = `${Math.max(
          textarea.scrollHeight,
          textareaMinHeight
        )}px`;

        if (scrollElement && scrollPosition) {
          scrollElement.scrollTop = scrollPosition;
        }
      }
    }, [textareaMinHeight]);

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

    const [characterCount, visuallyHiddenHintId] = useCharacterCount(
      value,
      characterLimit,
      characterCountAriaLive
    );

    useEffect(() => {
      if (rows) {
        setTextareaMinHeight(internalRef?.current?.scrollHeight || 0);
      } else {
        setTextareaMinHeight(
          minHeight > DEFAULT_MIN_HEIGHT ? minHeight : DEFAULT_MIN_HEIGHT
        );
      }
    }, [minHeight, rows]);

    useEffect(() => {
      if (expandable) {
        expandTextarea();
      }
    });

    useEffect(() => {
      if (expandable) {
        window.addEventListener("resize", expandTextarea);
        setTextareaMinHeight(internalRef?.current?.clientHeight || 0);
        // need to also run expandTextarea when the Sage UI font completes loading, to prevent strange scroll
        // behaviour when it only loads after the component is rendered
        document.fonts?.addEventListener("loadingdone", expandTextarea);
      }

      return () => {
        if (expandable) {
          window.removeEventListener("resize", expandTextarea);
          document.fonts?.removeEventListener("loadingdone", expandTextarea);
        }
      };
    }, [expandTextarea, expandable]);

    const hasIconInside = !!(inputIcon || (validationId && !validationOnLabel));

    const hintId = useRef(guid());
    const inputHintId = inputHint ? hintId.current : undefined;

    const combinedAriaDescribedBy = [
      ariaDescribedBy,
      inputHintId,
      visuallyHiddenHintId,
    ]
      .filter(Boolean)
      .join(" ");

    const input = (
      <InputPresentation
        disabled={disabled}
        readOnly={readOnly}
        inputWidth={
          typeof inputWidth === "number" ? inputWidth : 100 - labelWidth
        }
        maxWidth={maxWidth}
        error={error}
        warning={warning}
        info={info}
        borderRadius={borderRadius}
        hideBorders={hideBorders}
      >
        <Input
          aria-invalid={!!error}
          aria-labelledby={ariaLabelledBy}
          ariaDescribedBy={combinedAriaDescribedBy}
          autoFocus={autoFocus}
          name={name}
          value={value}
          ref={callbackRef}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={disabled ? "" : placeholder}
          rows={rows}
          id={id}
          as="textarea"
          validationIconId={validationRedesignOptIn ? undefined : validationId}
          inputBorderRadius={borderRadius}
          required={required}
          {...rest}
        />
        {children}
        <InputIconToggle
          disabled={disabled}
          readOnly={readOnly}
          inputIcon={inputIcon}
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
            labelInline={labelInlineWithNewValidation}
            data-component={dataComponent}
            data-role={dataRole}
            data-element={dataElement}
            hasIcon={hasIconInside}
            minHeight={textareaMinHeight}
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
              labelInline={computeLabelPropValues(labelInlineWithNewValidation)}
              labelAlign={computeLabelPropValues(labelAlign)}
              labelWidth={computeLabelPropValues(labelWidth)}
              labelHelp={computeLabelPropValues(labelHelp)}
              labelSpacing={labelSpacing}
              isRequired={required}
              isOptional={isOptional}
              useValidationIcon={computeLabelPropValues(validationOnLabel)}
              adaptiveLabelBreakpoint={adaptiveLabelBreakpoint}
              validationRedesignOptIn={validationRedesignOptIn}
            >
              {(inputHint || (labelHelp && validationRedesignOptIn)) && (
                <StyledHintText id={inputHintId} data-element="input-hint">
                  {inputHint || labelHelp}
                </StyledHintText>
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
