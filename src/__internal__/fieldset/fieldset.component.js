import React from "react";
import PropTypes from "prop-types";

import {
  StyledFieldset,
  StyledFieldsetContent,
  StyledLegendContainer,
} from "./fieldset.style";
import ValidationIcon from "../../components/validations/validation-icon.component";
import { InputGroupBehaviour, InputGroupContext } from "../input-behaviour";

const Fieldset = ({
  legend,
  children,
  inline,
  legendWidth,
  legendAlign = "right",
  legendSpacing = 2,
  error,
  warning,
  info,
  ml,
  mb,
  styleOverride,
  isRequired,
  ...rest
}) => (
  <InputGroupBehaviour>
    <StyledFieldset
      data-component="fieldset"
      styleOverride={styleOverride.root}
      ml={ml}
      mb={mb}
      {...rest}
    >
      <StyledFieldsetContent inline={inline}>
        {legend && (
          <StyledLegendContainer
            inline={inline}
            styleOverride={styleOverride.legend}
            width={legendWidth}
            align={legendAlign}
            rightPadding={legendSpacing}
            isRequired={isRequired}
          >
            <InputGroupContext.Consumer>
              {({ onMouseEnter, onMouseLeave }) => (
                <legend onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                  {legend}
                </legend>
              )}
            </InputGroupContext.Consumer>
            <ValidationIcon error={error} warning={warning} info={info} />
          </StyledLegendContainer>
        )}
        {children}
      </StyledFieldsetContent>
    </StyledFieldset>
  </InputGroupBehaviour>
);

Fieldset.propTypes = {
  /** Fieldset content */
  children: PropTypes.node.isRequired,
  /** The content for the Fieldset Legend */
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
  /** When true, legend is placed in line with the children */
  inline: PropTypes.bool,
  /** Percentage width of legend (only when legend is inline)  */
  legendWidth: PropTypes.number,
  /** Text alignment of legend when inline */
  legendAlign: PropTypes.oneOf(["left", "right"]),
  /** Spacing between legend and field for inline legend, number multiplied by base spacing unit (8) */
  legendSpacing: PropTypes.oneOf([1, 2]),
  /** Margin left, any valid CSS value  */
  ml: PropTypes.string,
  /** Margin bottom, given number will be multiplied by base spacing unit (8) */
  mb: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7]),
  /** Allows to override existing component styles */
  styleOverride: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    legend: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /** If true, an asterisk will be added to the label */
  isRequired: PropTypes.bool,
};

Fieldset.defaultProps = {
  inline: false,
  styleOverride: {},
};

export default Fieldset;
