import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import tagComponent from "../../../utils/helpers/tags";
import RadioButtonStyle from "./radio-button.style";
import CheckableInput from "../../../__internal__/checkable-input/checkable-input.component";
import RadioButtonSvg from "./radio-button-svg.component";
import { filterStyledSystemMarginProps } from "../../../style/utils";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const radioButtonGroupPassedProps = {
  /** Props to be passed from RadioButtonGroup */
  inline: PropTypes.bool,
  required: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

const RadioButton = ({
  checked,
  disabled,
  fieldHelp,
  fieldHelpInline,
  id,
  inline,
  inputWidth,
  label,
  labelAlign,
  labelSpacing,
  labelWidth,
  name,
  onChange,
  onBlur,
  value,
  reverse,
  required,
  size,
  error,
  warning,
  info,
  ...props
}) => {
  const marginProps = filterStyledSystemMarginProps(props);
  const handleChange = useCallback(
    (ev) => {
      onChange(ev);
      // trigger focus, as Safari doesn't focus radioButtons on click by default
      ev.target.focus();
    },
    [onChange]
  );

  const commonProps = {
    disabled,
    fieldHelpInline,
    inputWidth,
    labelSpacing,
    error,
    warning,
    info,
  };

  const inputProps = {
    ...commonProps,
    checked,
    fieldHelp,
    name,
    onChange: handleChange,
    onBlur,
    helpTag: "span",
    labelAlign,
    labelInline: true,
    labelWidth,
    inputId: id,
    label,
    inputValue: value,
    inputType: "radio",
    /**
     * Invert the reverse prop, to ensure the FormField component renders the components
     * in the desired order (other elements which use FormField render their sub-components the
     * opposite way around by default)
     */
    reverse: !reverse,
    required,
  };

  return (
    <RadioButtonStyle
      inline={inline}
      reverse={reverse}
      size={size}
      {...commonProps}
      {...marginProps}
      {...tagComponent("radio-button", props)}
    >
      <CheckableInput {...inputProps}>
        <RadioButtonSvg />
      </CheckableInput>
    </RadioButtonStyle>
  );
};

RadioButton.propTypes = {
  ...marginPropTypes,
  /** Set the value of the radio button */
  checked: PropTypes.bool,
  /** Toggles disabling of input */
  disabled: PropTypes.bool,
  /** The fieldHelp content to display for the input */
  fieldHelp: PropTypes.node,
  /** Displays fieldHelp inline with the radio button */
  fieldHelpInline: PropTypes.bool,
  /** Unique Identifier for the input. Will use a randomly generated GUID if none is provided */
  id: PropTypes.string,
  /** Sets percentage-based input width */
  inputWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** The content of the label for the input */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /** Sets label alignment - accepted values: 'left' (default), 'right' */
  labelAlign: PropTypes.oneOf(["left", "right"]),
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing: PropTypes.oneOf([1, 2]),
  /** Sets percentage-based label width */
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** The name of the the RadioButton (can also be set via the 'name' prop of the RadioButtonGroup component) */
  name: PropTypes.string,
  /** Accepts a callback function which can be used to update parent state on change */
  onChange: PropTypes.func,
  /** Accepts a callback function which is triggered on blur event */
  onBlur: PropTypes.func,
  /** Reverses label and radio button display */
  reverse: PropTypes.bool,
  /**
   * Set the size of the radio button to 'small' (16x16 - default) or 'large' (24x24).
   * No effect when using Classic theme.
   */
  size: PropTypes.oneOf(["small", "large"]),
  /** the value of the Radio Button, passed on form submit */
  value: PropTypes.string.isRequired,
  children: (props, propName, componentName) => {
    if (props[propName]) {
      return new Error(
        `Forbidden prop \`${propName}\` supplied to \`${componentName}\`. ` +
          "This component is meant to be used as a self-closing tag. " +
          "You should probably use the label prop instead."
      );
    }
    return null;
  },
  ...radioButtonGroupPassedProps,
};

RadioButton.defaultProps = {
  reverse: false,
  labelSpacing: 1,
};

export { RadioButton as PrivateRadioButton };
export default React.memo(RadioButton);
