import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import Fieldset from "../../__internal__/fieldset";
import RadioButtonGroupStyle from "./radio-button-group.style";
import RadioButtonMapper from "./radio-button-mapper.component";
import useIsAboveBreakpoint from "../../hooks/__internal__/useIsAboveBreakpoint";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { TooltipProvider } from "../../__internal__/tooltip-provider";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const RadioButtonGroup = (props) => {
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
    labelSpacing = 1,
    adaptiveLegendBreakpoint,
    adaptiveSpacingBreakpoint,
    required,
    tooltipPosition,
  } = props;

  const marginProps = filterStyledSystemMarginProps(props);

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

  let marginLeft = marginProps.ml;
  if (adaptiveSpacingBreakpoint && !isAboveSpacingBreakpoint) {
    marginLeft = undefined;
  }

  return (
    <TooltipProvider tooltipPosition={tooltipPosition}>
      <Fieldset
        legend={legend}
        error={error}
        warning={warning}
        info={info}
        inline={inlineLegend}
        legendWidth={legendWidth}
        legendAlign={legendAlign}
        legendSpacing={legendSpacing}
        isRequired={required}
        {...tagComponent("radiogroup", props)}
        {...marginProps}
        ml={marginLeft}
        blockGroupBehaviour={!(error || warning || info)}
      >
        <RadioButtonGroupStyle
          data-component="radio-button-group"
          role="radiogroup"
          inline={inline}
          legendInline={inlineLegend}
        >
          <RadioButtonMapper
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
          >
            {React.Children.map(children, (child) => {
              return React.cloneElement(child, {
                inline,
                labelSpacing,
                error: !!error,
                warning: !!warning,
                info: !!info,
                required,
                ...child.props,
              });
            })}
          </RadioButtonMapper>
        </RadioButtonGroupStyle>
      </Fieldset>
    </TooltipProvider>
  );
};

RadioButtonGroup.propTypes = {
  ...marginPropTypes,
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
  /** Spacing between labels and radio buttons, given number will be multiplied by base spacing unit (8) */
  labelSpacing: PropTypes.oneOf([1, 2]),
  /** Breakpoint for adaptive legend (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLegendBreakpoint: PropTypes.number,
  /** Breakpoint for adaptive spacing (left margin changes to 0). Enables the adaptive behaviour when set */
  adaptiveSpacingBreakpoint: PropTypes.number,
  /** Flag to configure component as mandatory */
  required: PropTypes.bool,
  /** Overrides the default tooltip position */
  tooltipPosition: PropTypes.oneOf(["top", "bottom", "left", "right"]),
};

export default RadioButtonGroup;
