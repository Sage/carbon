import React, { useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import { InputPresentation } from "../../__internal__/input";
import FormField from "../../__internal__/form-field";
import useCharacterCount from "../../hooks/__internal__/useCharacterCount";

import Input from "../../__internal__/input/input.component";
import { InputBehaviour } from "../../__internal__/input-behaviour";
import { filterStyledSystemMarginProps } from "../../style/utils";
import InputIconToggle from "../../__internal__/input-icon-toggle";
import guid from "../../__internal__/utils/helpers/guid";
import StyledTextarea, { MIN_HEIGHT } from "./textarea.style";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import useInputAccessibility from "../../hooks/__internal__/useInputAccessibility";
import { NewValidationContext } from "../carbon-provider/carbon-provider.component";
import { ErrorBorder, StyledHintText } from "../textbox/textbox.style";
import ValidationMessage from "../../__internal__/validation-message";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const Textarea = ({
  autoFocus,
  fieldHelp,
  label,
  size,
  children,
  characterLimit,
  enforceCharacterLimit = true,
  warnOverLimit = false,
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
  labelWidth = 30,
  tooltipPosition,
  value,
  "data-component": dataComponent,
  "data-element": dataElement,
  "data-role": dataRole,
  helpAriaLabel,
  ...props
}) => {
  const { validationRedesignOptIn } = useContext(NewValidationContext);
  const computeLabelPropValues = (prop) =>
    validationRedesignOptIn ? undefined : prop;

  const { current: id } = useRef(idProp || guid());

  const inputRef = useRef();

  const minHeight = useRef(MIN_HEIGHT);

  const expandTextarea = () => {
    const textarea = inputRef.current;
    if (textarea.scrollHeight > minHeight.current) {
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
    validationIconId,
    fieldHelpId,
    ariaDescribedBy,
    ariaLabelledBy,
  } = useInputAccessibility({
    id,
    error,
    warning,
    info,
    label,
    fieldHelp,
  });

  const [maxLength, characterCount] = useCharacterCount(
    value,
    // TODO: Can be removed after the characterLimit type is changed to number
    typeof characterLimit === "string"
      ? parseInt(characterLimit, 10)
      : characterLimit,
    warnOverLimit,
    enforceCharacterLimit
  );

  useEffect(() => {
    if (rows) {
      minHeight.current = inputRef.current.scrollHeight;
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
      minHeight.current = inputRef.current.clientHeight;
    }

    return () => {
      if (expandable) {
        window.removeEventListener("resize", expandTextarea);
      }
    };
  }, [expandable]);

  const hasIconInside = !!(
    inputIcon ||
    (validationIconId && !validationOnLabel)
  );

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
          {...filterStyledSystemMarginProps(props)}
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
            isRequired={props.required}
            useValidationIcon={computeLabelPropValues(validationOnLabel)}
            adaptiveLabelBreakpoint={adaptiveLabelBreakpoint}
            validationRedesignOptIn={validationRedesignOptIn}
          >
            {validationRedesignOptIn && labelHelp && (
              <StyledHintText>{labelHelp}</StyledHintText>
            )}
            {validationRedesignOptIn && (
              <ValidationMessage error={error} warning={warning} />
            )}
            <InputPresentation
              size={size}
              disabled={disabled}
              readOnly={readOnly}
              inputWidth={
                typeof inputWidth === "number" ? inputWidth : 100 - labelWidth
              }
              error={error}
              warning={warning}
              info={info}
            >
              {validationRedesignOptIn && (error || warning) && (
                <ErrorBorder warning={!!(!error && warning)} />
              )}
              <Input
                aria-invalid={!!error}
                aria-labelledby={ariaLabelledBy}
                aria-describedby={
                  validationRedesignOptIn ? undefined : ariaDescribedBy
                }
                autoFocus={autoFocus}
                name={name}
                value={value}
                ref={inputRef}
                maxLength={maxLength}
                onChange={onChange}
                disabled={disabled}
                readOnly={readOnly}
                labelInline={labelInline}
                placeholder={disabled ? "" : placeholder}
                rows={rows}
                cols={cols}
                id={id}
                as="textarea"
                {...props}
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
                validationIconId={
                  validationRedesignOptIn ? undefined : validationIconId
                }
                useValidationIcon={
                  !(validationRedesignOptIn || validationOnLabel)
                }
              />
            </InputPresentation>
          </FormField>
          {characterCount}
        </StyledTextarea>
      </InputBehaviour>
    </TooltipProvider>
  );
};

Textarea.propTypes = {
  ...marginPropTypes,
  /** Automatically focus the input on component mount */
  autoFocus: PropTypes.bool,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component": PropTypes.string,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element": PropTypes.string,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role": PropTypes.string,
  /** id of the input */
  id: PropTypes.string,
  /** Character limit of the textarea */
  characterLimit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Type of the icon that will be rendered next to the input */
  children: PropTypes.node,
  /** The visible width of the text control, in average character widths */
  cols: PropTypes.number,
  /** Adds disabled property */
  disabled: PropTypes.bool,
  /** Stop the user typing over the characterLimit */
  enforceCharacterLimit: PropTypes.bool,
  /** Allows the Textareas Height to change based on user input */
  expandable: PropTypes.bool,
  /** Help content to be displayed under an input */
  fieldHelp: PropTypes.node,
  /** The content of the label for the input */
  label: PropTypes.string,
  /** Text applied to label help tooltip */
  labelHelp: PropTypes.node,
  /** Inline label alignment */
  labelAlign: PropTypes.oneOf(["left", "right"]),
  /** When true, label is placed in line with an input */
  labelInline: PropTypes.bool,
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing: PropTypes.oneOf([1, 2]),
  /** Width of a label in percentage. Works only when labelInline is true */
  labelWidth: PropTypes.number,
  /** Width of an input in percentage. Works only when labelInline is true */
  inputWidth: PropTypes.number,
  /** Name of the input */
  name: PropTypes.string,
  /** Callback fired when the user types in the Textarea */
  onChange: PropTypes.func,
  /** Placeholder text for the component */
  placeholder: PropTypes.string,
  /** Adds readOnly property */
  readOnly: PropTypes.bool,
  /** The number of visible text lines for the control */
  rows: PropTypes.number,
  /** One of type of size to apply to the textarea */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /** The value of the Textarea */
  value: PropTypes.string,
  /** Whether to display the character count message in red */
  warnOverLimit: PropTypes.bool,
  /** Indicate that error has occurred
  Pass string to display icon, tooltip and red border
  Pass true boolean to only display red border */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate that warning has occurred
  Pass string to display icon, tooltip and orange border
  Pass true boolean to only display orange border */
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate additional information
  Pass string to display icon, tooltip and blue border
  Pass true boolean to only display blue border */
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** When true, validation icon will be placed on label instead of being placed on the input */
  validationOnLabel: PropTypes.bool,
  /**
   * <a href="https://brand.sage.com/d/NdbrveWvNheA/foundations#/icons/icons" target="_blank">List of supported icons</a>
   *
   * Icon to display inside of the Textarea
   */
  inputIcon: PropTypes.string,
  /** Message to be displayed in a Tooltip when the user hovers over the help icon */
  tooltipMessage: PropTypes.string,
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint: PropTypes.number,
  /** Flag to configure component as mandatory */
  required: PropTypes.bool,
  /** Overrides the default tooltip position */
  tooltipPosition: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  /** Aria label for rendered help component */
  helpAriaLabel: PropTypes.string,
};

export { Textarea as OriginalTextarea };
export default Textarea;
