import React from "react";
import PropTypes from "prop-types";
import propTypes from "@styled-system/prop-types";
import tagComponent from "../../../utils/helpers/tags";
import CheckboxStyle from "./checkbox.style";
import CheckableInput from "../../../__internal__/checkable-input/checkable-input.component";
import CheckboxSvg from "./checkbox-svg.component";
import useIsAboveBreakpoint from "../../../hooks/__internal__/useIsAboveBreakpoint";

const Checkbox = ({
  id,
  label,
  onChange,
  onBlur,
  value,
  fieldHelp,
  autoFocus,
  labelHelp,
  labelSpacing = 1,
  ml,
  adaptiveSpacingBreakpoint,
  required,
  ...props
}) => {
  const largeScreen = useIsAboveBreakpoint(adaptiveSpacingBreakpoint);

  let marginLeft = ml;
  if (adaptiveSpacingBreakpoint && !largeScreen) {
    marginLeft = "0";
  }

  const inputProps = {
    ...props,
    onChange,
    onBlur,
    labelInline: true,
    inputId: id,
    label,
    inputValue: value,
    inputType: "checkbox",
    reverse: !props.reverse,
    fieldHelp,
    autoFocus,
    labelHelp,
    labelSpacing,
    ml: marginLeft,
    required,
  };

  return (
    <CheckboxStyle
      {...tagComponent("checkbox", props)}
      {...props}
      labelSpacing={labelSpacing}
    >
      <CheckableInput {...inputProps}>
        <CheckboxSvg />
      </CheckableInput>
    </CheckboxStyle>
  );
};

Checkbox.propTypes = {
  ...propTypes.space,
  /** Set the value of the checkbox */
  checked: PropTypes.bool,
  /** Toggles disabling of input */
  disabled: PropTypes.bool,
  /** The fieldHelp content to display for the input */
  fieldHelp: PropTypes.node,
  /** Displays fieldHelp inline with the checkbox */
  fieldHelpInline: PropTypes.bool,
  /** Unique Identifier for the input. Will use a randomly generated GUID if none is provided */
  id: PropTypes.string,
  /** Sets percentage-based input width */
  inputWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** The content of the label for the input */
  label: PropTypes.string,
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing: PropTypes.oneOf([1, 2]),
  /** Sets percentage-based label width */
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Accepts a callback function which can be used to update parent state on change */
  onChange: PropTypes.func,
  /** Accepts a callback function which is triggered on blur event */
  onBlur: PropTypes.func,
  /** Reverses label and checkbox display */
  reverse: PropTypes.bool,
  /**
   * Set the size of the checkbox to 'small' (16x16 - default) or 'large' (24x24).
   * No effect when using Classic theme.
   */
  size: PropTypes.string,
  /** the value of the checkbox, passed on form submit */
  value: PropTypes.string,
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
  /** Allows component to be focused on page load */
  autoFocus: PropTypes.bool,
  /** The content for the help tooltip, to appear next to the Label */
  labelHelp: PropTypes.node,
  /** Breakpoint for adaptive spacing (left margin changes to 0). Enables the adaptive behaviour when set */
  adaptiveSpacingBreakpoint: PropTypes.number,
  /** Flag to configure component as mandatory */
  required: PropTypes.bool,
};

Checkbox.defaultProps = {
  reverse: false,
};

export default Checkbox;
