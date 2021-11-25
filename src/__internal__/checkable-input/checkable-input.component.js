import React, { useRef } from "react";
import PropTypes from "prop-types";

import {
  StyledCheckableInput,
  StyledCheckableInputWrapper,
} from "./checkable-input.style";
import { InputBehaviour } from "../input-behaviour";
import FormField from "../form-field";
import HiddenCheckableInput from "./hidden-checkable-input.component";
import guid from "../utils/helpers/guid";

const CheckableInput = ({
  autoFocus,
  checked,
  children,
  disabled,
  error,
  fieldHelp,
  fieldHelpInline,
  info,
  id: inputId,
  inputRef,
  type,
  value,
  inputWidth,
  label,
  labelAlign,
  labelHelp,
  labelInline,
  labelSpacing,
  labelWidth,
  name,
  onBlur,
  onChange,
  onFocus,
  required,
  reverse,
  validationOnLabel,
  warning,
  ...props
}) => {
  const { current: id } = useRef(inputId || guid());
  const labelId = label ? `${id}-label` : undefined;
  const helpId = [error, warning, info, labelHelp].filter(
    (validation) => typeof validation === "string"
  ).length
    ? `${id}-help`
    : undefined;
  const fieldHelpId = fieldHelp ? `${id}-field-help` : undefined;
  const isRadio = type === "radio";

  const formFieldProps = {
    disabled,
    error,
    fieldHelp,
    fieldHelpInline,
    helpId,
    fieldHelpId,
    id,
    info,
    label,
    labelAlign,
    labelHelp,
    labelHelpIcon: "info",
    labelId,
    labelInline,
    labelSpacing,
    name: id,
    reverse,
    warning,
    // We don't want an asterisk on each radio control, only the legend
    // However, we still want the input element to receive the required prop
    isRequired: isRadio ? undefined : required,
    useValidationIcon: validationOnLabel,
  };

  const inputProps = {
    autoFocus,
    checked,
    disabled,
    helpId,
    fieldHelpId,
    id,
    inputRef,
    type,
    value,
    labelId,
    name,
    onBlur,
    onChange,
    onFocus,
    required,
    ...props,
  };

  return (
    <StyledCheckableInputWrapper
      disabled={disabled}
      fieldHelpInline={fieldHelpInline}
      inputWidth={inputWidth}
      labelWidth={labelWidth}
      labelInline={labelInline}
      reverse={reverse}
    >
      <InputBehaviour>
        <FormField {...formFieldProps}>
          <StyledCheckableInput>
            <HiddenCheckableInput {...inputProps} />
            {children}
          </StyledCheckableInput>
        </FormField>
      </InputBehaviour>
    </StyledCheckableInputWrapper>
  );
};

CheckableInput.propTypes = {
  /** If true the Component will be focused when page load */
  autoFocus: PropTypes.bool,
  /** Set the value of the CheckableInput */
  checked: PropTypes.bool,
  /** Used to set the visible aspect of the input (i.e. the checkbox sprite, input slider etc) */
  children: PropTypes.node,
  /** Toggles disabling of input */
  disabled: PropTypes.bool,
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
  /** The fieldHelp content to display for the input */
  fieldHelp: PropTypes.node,
  /** Displays fieldHelp inline with the CheckableInput */
  fieldHelpInline: PropTypes.bool,
  /** Unique Identifier for the input. Will use a randomly generated GUID if none is provided */
  id: PropTypes.string,
  /** Specifies input type, 'checkbox' or 'radio' */
  type: PropTypes.string.isRequired,
  /** Value passed to the input */
  value: PropTypes.string,
  /** Sets percentage-based input width */
  inputWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** The content for the Label to apply to the input */
  label: PropTypes.node,
  /** When true, label is placed in line an input */
  labelInline: PropTypes.bool,
  /** Sets label alignment - accepted values: 'left' (default), 'right' */
  labelAlign: PropTypes.string,
  /** The content for the help tooltip, to appear next to the Label */
  labelHelp: PropTypes.node,
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing: PropTypes.oneOf([1, 2]),
  /** Sets percentage-based label width */
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Input name */
  name: PropTypes.string,
  /** Accepts a callback function which can be used to update parent state on change */
  onChange: PropTypes.func,
  /** Accepts a callback function which is triggered on focus event */
  onFocus: PropTypes.func,
  /** Accepts a callback function which is triggered on blur event */
  onBlur: PropTypes.func,
  /** Reverses label and CheckableInput display */
  reverse: PropTypes.bool,
  /** Flag to configure component as mandatory */
  required: PropTypes.bool,
  /** A callback to retrieve the input reference */
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  /** When true, displays validation icon on label */
  validationOnLabel: PropTypes.bool,
};

CheckableInput.defaultProps = {
  reverse: false,
  labelSpacing: 1,
  labelInline: true,
};

export default CheckableInput;
