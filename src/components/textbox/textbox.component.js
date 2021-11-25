import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import { filterStyledSystemMarginProps } from "../../style/utils";
import { Input, InputPresentation } from "../../__internal__/input";
import InputIconToggle from "../../__internal__/input-icon-toggle";
import FormField from "../../__internal__/form-field";
import withUniqueIdProps from "../../__internal__/utils/helpers/with-unique-id-props";
import { InputBehaviour } from "../../__internal__/input-behaviour";
import StyledPrefix from "./__internal__/prefix.style";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import useCharacterCount from "../../hooks/__internal__/useCharacterCount";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const Textbox = ({
  align,
  autoFocus,
  children,
  disabled,
  inputIcon,
  leftChildren,
  labelId,
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
  size,
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
  validationOnLabel,
  labelWidth,
  inputWidth,
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
}) => {
  const [maxLength, characterCount] = useCharacterCount(
    value,
    characterLimit,
    warnOverLimit,
    enforceCharacterLimit
  );

  return (
    <TooltipProvider
      helpAriaLabel={helpAriaLabel}
      tooltipPosition={tooltipPosition}
    >
      <InputBehaviour>
        <FormField
          disabled={disabled}
          fieldHelp={fieldHelp}
          error={error}
          warning={warning}
          info={info}
          label={label}
          labelId={labelId}
          labelAlign={labelAlign}
          labelHelp={labelHelp}
          labelInline={labelInline}
          labelSpacing={labelSpacing}
          labelWidth={labelWidth}
          id={id}
          reverse={reverse}
          isOptional={isOptional}
          useValidationIcon={validationOnLabel}
          adaptiveLabelBreakpoint={adaptiveLabelBreakpoint}
          isRequired={required}
          data-component={dataComponent}
          data-role={dataRole}
          data-element={dataElement}
          {...filterStyledSystemMarginProps(props)}
        >
          <InputPresentation
            align={align}
            disabled={disabled}
            readOnly={readOnly}
            size={size}
            error={error}
            warning={warning}
            info={info}
            inputWidth={inputWidth || 100 - labelWidth}
            positionedChildren={positionedChildren}
          >
            {leftChildren}
            {prefix ? (
              <StyledPrefix data-element="textbox-prefix">
                {prefix}
              </StyledPrefix>
            ) : null}
            <Input
              {...(required && { required })}
              align={align}
              aria-invalid={!!error}
              autoFocus={autoFocus}
              deferTimeout={deferTimeout}
              disabled={disabled}
              id={id}
              inputRef={inputRef}
              name={name}
              onBlur={onBlur}
              onChange={onChange}
              onChangeDeferred={onChangeDeferred}
              onClick={onClick}
              onFocus={onFocus}
              onMouseDown={onMouseDown}
              placeholder={disabled || readOnly ? "" : placeholder}
              readOnly={readOnly}
              value={visibleValue(value, formattedValue)}
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
              useValidationIcon={!validationOnLabel}
              warning={warning}
            />
          </InputPresentation>
        </FormField>
        {characterCount}
      </InputBehaviour>
    </TooltipProvider>
  );
};

function visibleValue(value, formattedValue) {
  return typeof formattedValue === "string" ? formattedValue : value;
}

Textbox.propTypes = {
  /** Filtered styled system margin props */
  ...marginPropTypes,
  /** Automatically focus the input on component mount */
  autoFocus: PropTypes.bool,
  /* The default value alignment on the input */
  align: PropTypes.oneOf(["right", "left"]),
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component": PropTypes.string,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element": PropTypes.string,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role": PropTypes.string,
  /**
   * An optional alternative for props.value, this is useful if the
   * real value is an ID but you want to show a human-readable version.
   */
  formattedValue: PropTypes.string,
  /** The value of the Textbox */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array, // Allows the textbox to be used in the Multi-Select component
  ]),
  /** The unformatted value  */
  rawValue: PropTypes.string,
  /** If true, the component will be disabled */
  disabled: PropTypes.bool,
  /** If true, the component will be read-only */
  readOnly: PropTypes.bool,
  /** Event handler for the change event */
  onChange: PropTypes.func,
  /** Event handler for the focus event */
  onFocus: PropTypes.func,
  /** Event handler for the blur event */
  onBlur: PropTypes.func,
  /** Event handler for the mouse down event */
  onMouseDown: PropTypes.func,
  /** Deferred callback called after the onChange event */
  onChangeDeferred: PropTypes.func,
  /** Integer to determine timeout for deferred callback */
  deferTimeout: PropTypes.number,
  /** Unique identifier for the input. Will use a randomly generated GUID if none is provided */
  id: PropTypes.string,
  /** Label */
  label: PropTypes.string,
  /** Inline label alignment */
  labelAlign: PropTypes.oneOf(["left", "right"]),
  /** Text applied to label help tooltip */
  labelHelp: PropTypes.node,
  /** When true, label is placed in line an input */
  labelInline: PropTypes.bool,
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing: PropTypes.oneOf([1, 2]),
  /** Width of a label in percentage. Works only when labelInline is true */
  labelWidth: PropTypes.number,
  /** Width of an input in percentage. Works only when labelInline is true */
  inputWidth: PropTypes.number,
  /** Input name */
  name: PropTypes.string,
  /** Help content to be displayed under an input */
  fieldHelp: PropTypes.node,
  /** Type of the icon that will be rendered next to the input */
  children: PropTypes.node,
  /**
   * <a href="https://brand.sage.com/d/NdbrveWvNheA/foundations#/icons/icons" target="_blank">List of supported icons</a>
   *
   * Icon to display inside of the Textbox
   * */
  inputIcon: PropTypes.string,
  /** Additional child elements to display before the input */
  leftChildren: PropTypes.node,
  /** [Legacy] Flag to configure component as optional in Form */
  isOptional: PropTypes.bool,
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
  /** Size of an input */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /** Placeholder string to be displayed in input */
  placeholder: PropTypes.string,
  /**
   * Container for DatePicker or SelectList components
   * @private
   * @ignore
   *
   */
  positionedChildren: PropTypes.node,
  /**
   * Label id passed from Select component
   * @private
   * @ignore
   *
   */
  labelId: PropTypes.string,
  /** Optional handler for click event on Textbox icon */
  iconOnClick: PropTypes.func,
  /** Optional handler for mousedown event on Textbox icon */
  iconOnMouseDown: PropTypes.func,
  /** Overrides the default tabindex of the component */
  iconTabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Handler for onClick events */
  onClick: PropTypes.func,
  /** Emphasized part of the displayed text */
  prefix: PropTypes.string,
  /** Reverses label and input display */
  reverse: PropTypes.bool,
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint: PropTypes.number,
  /** Flag to configure component as required */
  required: PropTypes.bool,
  /** A callback to retrieve the input reference */
  inputRef: PropTypes.func,
  /** Overrides the default tooltip position */
  tooltipPosition: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  /** Stop the user typing over the characterLimit */
  enforceCharacterLimit: PropTypes.bool,
  /** Character limit of the textarea */
  characterLimit: PropTypes.string,
  /** Whether to display the character count message in red */
  warnOverLimit: PropTypes.bool,
  /** Aria label for rendered help component */
  helpAriaLabel: PropTypes.string,
};

Textbox.defaultProps = {
  labelWidth: 30,
  size: "medium",
  validationOnLabel: false,
};

export { Textbox as OriginalTextbox };
export default withUniqueIdProps(Textbox);
