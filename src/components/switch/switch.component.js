import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import SwitchStyle from "./switch.style";
import CheckableInput from "../../__internal__/checkable-input";
import SwitchSlider from "./__internal__/switch-slider.component";
import useIsAboveBreakpoint from "../../hooks/__internal__/useIsAboveBreakpoint";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import { filterStyledSystemMarginProps } from "../../style/utils";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const Switch = ({
  autoFocus,
  id,
  label,
  onChange,
  onBlur,
  onFocus,
  value,
  checked,
  defaultChecked,
  disabled,
  loading,
  reverse,
  validationOnLabel,
  labelInline,
  labelSpacing,
  labelHelp,
  fieldHelpInline,
  size,
  name,
  adaptiveLabelBreakpoint,
  tooltipPosition,
  error,
  warning,
  info,
  "data-component": dataComponent,
  "data-element": dataElement,
  "data-role": dataRole,
  helpAriaLabel,
  ...rest
}) => {
  const isControlled = checked !== undefined;

  const [checkedInternal, setCheckedInternal] = useState(
    defaultChecked || false
  );

  const onChangeInternal = useCallback(
    (e) => {
      setCheckedInternal(e.target.checked);
      onChange(e);
    },
    [setCheckedInternal, onChange]
  );

  const largeScreen = useIsAboveBreakpoint(adaptiveLabelBreakpoint);
  let shouldLabelBeInline = labelInline;
  if (adaptiveLabelBreakpoint) {
    shouldLabelBeInline = largeScreen;
  }

  const shouldValidationBeOnLabel =
    labelInline && !reverse ? true : validationOnLabel;

  const switchStyleProps = {
    "data-component": dataComponent,
    "data-role": dataRole,
    "data-element": dataElement,
    checked: isControlled ? checked : checkedInternal,
    fieldHelpInline,
    labelInline: shouldLabelBeInline,
    labelSpacing,
    reverse: !reverse, // switched to preserve backward compatibility
    size,
    ...filterStyledSystemMarginProps(rest),
  };

  const switchSliderProps = {
    checked: isControlled ? checked : checkedInternal,
    disabled: disabled || loading,
    loading,
    size,
    error,
    warning,
    info,
    useValidationIcon: !shouldValidationBeOnLabel && !disabled,
  };

  const inputProps = {
    autoFocus,
    error,
    warning,
    info,
    disabled: disabled || loading,
    checked: isControlled ? checked : checkedInternal,
    fieldHelpInline,
    labelInline: shouldLabelBeInline,
    labelSpacing,
    onBlur,
    onFocus,
    onChange: isControlled ? onChange : onChangeInternal,
    id,
    name,
    label,
    labelHelp,
    value,
    type: "checkbox",
    reverse: !reverse, // switched to preserve backward compatibility
    validationOnLabel: shouldValidationBeOnLabel && !disabled,
    ...rest,
  };

  return (
    <TooltipProvider
      helpAriaLabel={helpAriaLabel}
      tooltipPosition={tooltipPosition}
    >
      <SwitchStyle {...switchStyleProps}>
        <CheckableInput {...inputProps}>
          <SwitchSlider {...switchSliderProps} />
        </CheckableInput>
      </SwitchStyle>
    </TooltipProvider>
  );
};

Switch.propTypes = {
  /** Filtered styled system margin props */
  ...marginPropTypes,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component": PropTypes.string,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element": PropTypes.string,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role": PropTypes.string,
  /** If true the Component will be focused when page load */
  autoFocus: PropTypes.bool,
  /** Set the value of the Switch if component is meant to be used as controlled */
  checked: PropTypes.bool,
  /** Set the default value of the Switch if component is meant to be used as uncontrolled */
  defaultChecked: PropTypes.bool,
  /** Toggles disabling of input */
  disabled: PropTypes.bool,
  /** Displays additional information below the input to provide help to the user. */
  fieldHelp: PropTypes.string,
  /** Displays fieldHelp inline with the checkbox */
  fieldHelpInline: PropTypes.bool,
  /** Unique Identifier for the input. Will use a randomly generated GUID if none is provided */
  id: PropTypes.string,
  /** Sets percentage-based input width */
  inputWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** The content of the label for the input */
  label: PropTypes.string,
  /** Sets label alignment - accepted values: 'left' (default), 'right' */
  labelAlign: PropTypes.oneOf(["left", "right"]),
  /** The content for the help tooltip, to appear next to the Label */
  labelHelp: PropTypes.node,
  /** Displays label inline with the Switch */
  labelInline: PropTypes.bool,
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing: PropTypes.oneOf([1, 2]),
  /** Sets percentage-based label width */
  labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** The name of the the Switch input  */
  name: PropTypes.string,
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
  /** When true, validation icon will be placed on label instead of being placed by the input */
  validationOnLabel: PropTypes.bool,
  /** Override tab index on the validation and help icon */
  helpTabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Triggers loading animation */
  loading: PropTypes.bool,
  /** Accepts a callback function which can be used to update parent state on change */
  onChange: PropTypes.func,
  /** Accepts a callback function which is triggered on blur event */
  onBlur: PropTypes.func,
  /** Accepts a callback function which is triggered on focus event */
  onFocus: PropTypes.func,
  /** Accepts a callback function which is triggered on click event */
  onClick: PropTypes.func,
  /** Reverses label and Switch display */
  reverse: PropTypes.bool,
  /**
   * Set the size of the Switch to 'small' (16x16 - default) or 'large' (24x24).
   * No effect when using Classic theme.
   */
  size: PropTypes.oneOf(["small", "large"]),
  /** the value of the checkbox, passed on form submit */
  value: PropTypes.string,
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint: PropTypes.number,
  /** Flag to configure component as mandatory */
  required: PropTypes.bool,
  /** Overrides the default tooltip position */
  tooltipPosition: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  /** Aria label for rendered help component */
  helpAriaLabel: PropTypes.string,
};

Switch.defaultProps = {
  labelInline: false,
  reverse: true,
  validationOnLabel: false,
  "data-component": "switch",
};

export { Switch as BaseSwitch };
export default Switch;
