import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import CheckboxStyle from "./checkbox.style";
import CheckableInput from "../../__internal__/checkable-input/checkable-input.component";
import CheckboxSvg from "./checkbox-svg.component";
import useIsAboveBreakpoint from "../../hooks/__internal__/useIsAboveBreakpoint";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { TooltipProvider } from "../../__internal__/tooltip-provider";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const Checkbox = ({
  id,
  label,
  onChange,
  name,
  /* FIXME: FE-4102 */
  onClick,
  onBlur,
  onFocus,
  value,
  fieldHelp,
  autoFocus,
  labelHelp,
  labelSpacing = 1,
  labelWidth,
  adaptiveSpacingBreakpoint,
  required,
  error,
  warning,
  info,
  fieldHelpInline,
  reverse,
  checked,
  disabled,
  inputWidth,
  size,
  tooltipPosition,
  "data-component": dataComponent,
  "data-element": dataElement,
  "data-role": dataRole,
  helpAriaLabel,
  ...props
}) => {
  const largeScreen = useIsAboveBreakpoint(adaptiveSpacingBreakpoint);
  const adaptiveSpacingSmallScreen = !!(
    adaptiveSpacingBreakpoint && !largeScreen
  );

  const inputProps = {
    onClick,
    onChange,
    onBlur,
    onFocus,
    labelInline: true,
    id,
    label,
    value,
    type: "checkbox",
    name,
    reverse: !reverse,
    fieldHelp,
    autoFocus,
    labelHelp,
    labelSpacing,
    required,
    error,
    warning,
    info,
    fieldHelpInline,
    checked,
    disabled,
    inputWidth,
    labelWidth,
    tooltipPosition,
    ...props,
  };

  return (
    <TooltipProvider
      helpAriaLabel={helpAriaLabel}
      tooltipPosition={tooltipPosition}
    >
      <CheckboxStyle
        data-component={dataComponent}
        data-role={dataRole}
        data-element={dataElement}
        disabled={disabled}
        labelSpacing={labelSpacing}
        inputWidth={inputWidth}
        adaptiveSpacingSmallScreen={adaptiveSpacingSmallScreen}
        error={error}
        warning={warning}
        info={info}
        fieldHelpInline={fieldHelpInline}
        reverse={reverse}
        size={size}
        {...filterStyledSystemMarginProps(props)}
      >
        <CheckableInput {...inputProps}>
          <CheckboxSvg />
        </CheckableInput>
      </CheckboxStyle>
    </TooltipProvider>
  );
};

Checkbox.propTypes = {
  /** Filtered styled system margin props */
  ...marginPropTypes,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component": PropTypes.string,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element": PropTypes.string,
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role": PropTypes.string,
  /** Checked state of the input */
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
  /** The name of the the Checkbox input  */
  name: PropTypes.string,
  /** Accepts a callback function which can be used to update parent state on change */
  onChange: PropTypes.func,
  /** Accepts a callback function which is triggered on blur event */
  onBlur: PropTypes.func,
  /** Accepts a callback function which is triggered on focus event */
  onFocus: PropTypes.func,
  /** Accepts a callback function which is triggered on click event */
  onClick: PropTypes.func,
  /** Reverses label and checkbox display */
  reverse: PropTypes.bool,
  /**
   * Set the size of the checkbox to 'small' (16x16 - default) or 'large' (24x24).
   * No effect when using Classic theme.
   */
  size: PropTypes.oneOf(["small", "large"]),
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
  /** If true the Component will be focused when page load */
  autoFocus: PropTypes.bool,
  /** The content for the help tooltip, to appear next to the Label */
  labelHelp: PropTypes.node,
  /** Breakpoint for adaptive spacing (left margin changes to 0). Enables the adaptive behaviour when set */
  adaptiveSpacingBreakpoint: PropTypes.number,
  /** Flag to configure component as mandatory */
  required: PropTypes.bool,
  /** Overrides the default tooltip position */
  tooltipPosition: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  /** Aria label for rendered help component */
  helpAriaLabel: PropTypes.string,
};

Checkbox.defaultProps = {
  reverse: false,
  "data-component": "checkbox",
};

export default Checkbox;
