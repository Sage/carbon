import React from "react";
import PropTypes from "prop-types";

import { validProps } from "../../utils/ether";
import {
  StyledCheckableInput,
  StyledCheckableInputWrapper,
} from "./checkable-input.style";
import { InputBehaviour } from "../input-behaviour";
import FormField from "../../__experimental__/components/form-field";
import HiddenCheckableInput from "./hidden-checkable-input.component";
import guid from "../../utils/helpers/guid";

class CheckableInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputId = props.inputId || guid();
  }

  render() {
    const { children, onChange, onBlur, required, label, ...rest } = this.props;
    const id = this.inputId;
    const labelId = `${id}-label`;
    const helpId = `${id}-help`;
    const isRadio = this.props.inputType === "radio";
    const formFieldProps = {
      ...validProps(this, [
        "fieldHelp",
        "fieldHelpInline",
        "labelHelp",
        "labelSpacing",
        "reverse",
        "error",
        "warning",
        "info",
        "mb",
        "labelAlign",
        "disabled",
      ]),
      labelId,
      helpId,
      label,
      labelHelpIcon: "info",
      labelInline: rest.labelInline,
      name: id,
      id,
      // We don't want an asterisk on each radio control, only the legend
      // However, we still want the input element to receive the required prop
      isRequired: isRadio ? undefined : required,
    };

    const { fieldHelp, labelHelp, ...inputProps } = {
      ...validProps(this, [
        "checked",
        "disabled",
        "inputType",
        "onChange",
        "onBlur",
        "tabindex",
      ]),
      labelId,
      helpId,
      id,
      required,
    };

    return (
      <StyledCheckableInputWrapper {...rest}>
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
  }
}

CheckableInput.propTypes = {
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
  inputId: PropTypes.string,
  /** The content for the Label to apply to the input */
  label: PropTypes.node,
  /** Sets percentage-based input width */
  inputWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
  /** Accepts a callback function which can be used to update parent state on change */
  onChange: PropTypes.func,
  /** Accepts a callback function which is triggered on blur event */
  onBlur: PropTypes.func,
  /** Reverses label and CheckableInput display */
  reverse: PropTypes.bool,
  /** Specifies input type, 'checkbox' or 'switch' */
  inputType: PropTypes.string.isRequired,
  /** Margin bottom, given number will be multiplied by base spacing unit (8) */
  mb: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 7]),
  /** Margin left, any valid CSS value */
  ml: PropTypes.string,
  /** Flag to configure component as mandatory */
  required: PropTypes.bool,
};

CheckableInput.defaultProps = {
  reverse: false,
  labelSpacing: 1,
  labelInline: true,
};

export default CheckableInput;
