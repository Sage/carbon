import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import StyledCheckboxGroup from "./checkbox-group.style";
import Fieldset from "../../__internal__/fieldset";
import { filterStyledSystemMarginProps } from "../../style/utils";
import { TooltipProvider } from "../../__internal__/tooltip-provider";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

export const CheckboxGroupContext = React.createContext({});

const CheckboxGroup = (props) => {
  const {
    children,
    legend,
    error,
    warning,
    info,
    required,
    legendInline,
    legendWidth,
    legendAlign,
    legendSpacing,
    tooltipPosition,
  } = props;

  return (
    <TooltipProvider tooltipPosition={tooltipPosition}>
      <Fieldset
        legend={legend}
        inline={legendInline}
        legendWidth={legendWidth}
        legendAlign={legendAlign}
        legendSpacing={legendSpacing}
        error={error}
        warning={warning}
        info={info}
        isRequired={required}
        {...tagComponent("checkboxgroup", props)}
        blockGroupBehaviour={!(error || warning || info)}
        {...filterStyledSystemMarginProps(props)}
      >
        <StyledCheckboxGroup
          data-component="checkbox-group"
          legendInline={legendInline}
        >
          <CheckboxGroupContext.Provider
            value={{
              error: !!error,
              warning: !!warning,
              info: !!info,
            }}
          >
            {children}
          </CheckboxGroupContext.Provider>
        </StyledCheckboxGroup>
      </Fieldset>
    </TooltipProvider>
  );
};

CheckboxGroup.propTypes = {
  /** Filtered styled system margin props */
  ...marginPropTypes,
  /** The content for the CheckboxGroup Legend */
  legend: PropTypes.string,
  /** When true, legend is placed in line with the checkboxes */
  legendInline: PropTypes.bool,
  /** Percentage width of legend (only when legend is inline)  */
  legendWidth: PropTypes.number,
  /** Text alignment of legend when inline */
  legendAlign: PropTypes.oneOf(["left", "right"]),
  /** Spacing between legend and field for inline legend, number multiplied by base spacing unit (8) */
  legendSpacing: PropTypes.oneOf([1, 2]),
  /** The Checkboxes to be rendered in the group */
  children: PropTypes.node.isRequired,
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
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing: PropTypes.oneOf([1, 2]),
  /** Flag to configure component as mandatory */
  required: PropTypes.bool,
  /** Overrides the default tooltip position */
  tooltipPosition: PropTypes.oneOf(["top", "bottom", "left", "right"]),
};

export default CheckboxGroup;
