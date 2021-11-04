import React, { useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import { InputPresentation } from "../../__internal__/input";
import FormField from "../../__internal__/form-field";
import CharacterCount from "../../__internal__/character-count";
import Input from "../../__internal__/input/input.component";
import { InputBehaviour } from "../../__internal__/input-behaviour";
import { filterStyledSystemMarginProps } from "../../style/utils";
import InputIconToggle from "../../__internal__/input-icon-toggle";
import guid from "../../__internal__/utils/helpers/guid";
import StyledTextarea from "./textarea.style";
import LocaleContext from "../../__internal__/i18n-context";
import { TooltipProvider } from "../../__internal__/tooltip-provider";

const getFormatNumber = (value, locale) =>
  new Intl.NumberFormat(locale).format(value);

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
  const locale = useContext(LocaleContext);

  const { current: id } = useRef(idProp || guid());

  const inputRef = useRef();

  const minHeight = useRef(0);

  const expandTextarea = () => {
    const textarea = inputRef.current;

    if (textarea.scrollHeight > minHeight.current) {
      // Reset height to zero - IE specific
      textarea.style.height = "0px";
      // Set the height so all content is shown
      textarea.style.height = `${Math.max(
        textarea.scrollHeight,
        minHeight.current
      )}px`;
    }
  };

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

  const isOverLimit = () => {
    return (value || "").length > parseInt(characterLimit, 10);
  };

  const characterCount = () => {
    if (!characterLimit) {
      return null;
    }

    return (
      <CharacterCount
        isOverLimit={isOverLimit() && warnOverLimit}
        value={getFormatNumber((value || "").length, locale.locale())}
        limit={getFormatNumber(characterLimit, locale.locale())}
        data-element="character-limit"
      />
    );
  };

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
          {...filterStyledSystemMarginProps(props)}
        >
          <FormField
            fieldHelp={fieldHelp}
            error={error}
            warning={warning}
            info={info}
            label={label}
            disabled={disabled}
            id={id}
            labelInline={labelInline}
            labelAlign={labelAlign}
            labelWidth={labelWidth}
            labelHelp={labelHelp}
            labelSpacing={labelSpacing}
            isRequired={props.required}
            useValidationIcon={validationOnLabel}
            adaptiveLabelBreakpoint={adaptiveLabelBreakpoint}
          >
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
              <Input
                autoFocus={autoFocus}
                name={name}
                aria-invalid={!!error}
                ref={inputRef}
                maxLength={
                  enforceCharacterLimit && characterLimit
                    ? characterLimit
                    : undefined
                }
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
                useValidationIcon={!validationOnLabel}
              />
            </InputPresentation>
          </FormField>
          {characterCount()}
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
  characterLimit: PropTypes.string,
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
