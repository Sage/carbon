import React from "react";
import PropTypes from "prop-types";

import tagComponent from "../../../utils/helpers/tags";
import Fieldset from "../../../__internal__/fieldset";
import RadioButtonGroupStyle from "./radio-button-group.style";
import RadioButtonMapper from "./radio-button-mapper.component";
import Logger from "../../../utils/logger/logger";
import useIsAboveBreakpoint from "../../../hooks/__internal__/useIsAboveBreakpoint";

let deprecatedWarnTriggered = false;

const RadioButtonGroup = (props) => {
  if (!deprecatedWarnTriggered) {
    deprecatedWarnTriggered = true;
    // eslint-disable-next-line max-len
    Logger.deprecate(
      "`styleOverride` that is used in the `RadioButtonGroup` component is deprecated and will soon be removed."
    );
  }
  const {
    children,
    name,
    legend,
    error,
    warning,
    info,
    onBlur,
    onChange,
    value,
    inline = false,
    legendInline = false,
    legendWidth,
    legendAlign,
    legendSpacing,
    ml,
    mb,
    labelSpacing = 1,
    adaptiveLegendBreakpoint,
    adaptiveSpacingBreakpoint,
    required,
    styleOverride = {},
  } = props;

  const isAboveLegendBreakpoint = useIsAboveBreakpoint(
    adaptiveLegendBreakpoint
  );
  const isAboveSpacingBreakpoint = useIsAboveBreakpoint(
    adaptiveSpacingBreakpoint
  );

  let inlineLegend = legendInline;
  if (adaptiveLegendBreakpoint) {
    inlineLegend = isAboveLegendBreakpoint;
  }

  let marginLeft = ml;
  if (adaptiveSpacingBreakpoint && !isAboveSpacingBreakpoint) {
    marginLeft = undefined;
  }

  return (
    <Fieldset
      role="radiogroup"
      legend={legend}
      error={error}
      warning={warning}
      info={info}
      inline={inlineLegend}
      legendWidth={legendWidth}
      legendAlign={legendAlign}
      legendSpacing={legendSpacing}
      ml={marginLeft}
      mb={mb}
      styleOverride={styleOverride}
      isRequired={required}
      {...tagComponent("radiogroup", props)}
    >
      <RadioButtonGroupStyle
        data-component="radio-button-group"
        role="group"
        inline={inline}
        legendInline={legendInline}
        styleOverride={styleOverride.content}
      >
        <RadioButtonMapper
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
        >
          {React.Children.map(children, (child, i) => {
            const length = React.Children.count(children);
            const isLastChild = i === length - 1;
            const isFirstChild = i === 0;
            return React.cloneElement(child, {
              inline,
              labelSpacing,
              error: !!error,
              warning: !!warning,
              info: !!info,
              required,
              mt: !inline && isFirstChild ? "4px" : undefined,
              mb: isLastChild ? 0 : undefined,
              ...child.props,
            });
          })}
        </RadioButtonMapper>
      </RadioButtonGroupStyle>
    </Fieldset>
  );
};

RadioButtonGroup.propTypes = {
  /** The RadioButton objects to be rendered in the group */
  children: PropTypes.node.isRequired,
  /** Specifies the name prop to be applied to each button in the group */
  name: PropTypes.string.isRequired,
  /** The content for the RadioGroup Legend */
  legend: PropTypes.string,
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
  /** Callback fired when each RadioButton is blurred */
  onBlur: PropTypes.func,
  /** Callback fired when the user selects a RadioButton */
  onChange: PropTypes.func,
  /** value of the selected RadioButton */
  value: PropTypes.string,
  /** When true, RadioButtons are in line */
  inline: PropTypes.bool,
  /** When true, legend is placed in line with the radiobuttons */
  legendInline: PropTypes.bool,
  /** Percentage width of legend (only when legend is inline)  */
  legendWidth: PropTypes.number,
  /** Text alignment of legend when inline */
  legendAlign: PropTypes.oneOf(["left", "right"]),
  /** Spacing between legend and field for inline legend, number multiplied by base spacing unit (8) */
  legendSpacing: PropTypes.oneOf([1, 2]),
  /** Margin left, any valid CSS value */
  ml: PropTypes.string,
  /** Margin bottom, given number will be multiplied by base spacing unit (8) */
  mb: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7]),
  /** Spacing between labels and radio buttons, given number will be multiplied by base spacing unit (8) */
  labelSpacing: PropTypes.oneOf([1, 2]),
  /** Breakpoint for adaptive legend (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLegendBreakpoint: PropTypes.number,
  /** Breakpoint for adaptive spacing (left margin changes to 0). Enables the adaptive behaviour when set */
  adaptiveSpacingBreakpoint: PropTypes.number,
  /** Allows to override existing component styles */
  styleOverride: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    content: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    legend: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /** Flag to configure component as mandatory */
  required: PropTypes.bool,
};

export default RadioButtonGroup;
