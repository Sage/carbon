import React from 'react';
import PropTypes from 'prop-types';

import { StyledFieldset, StyledFieldsetContent, StyledLegendContainer } from './fieldset.style';
import ValidationIcon from '../../components/validations/validation-icon.component';

const Fieldset = ({
  legend, children, inline, legendWidth, legendAlign, legendSpacing = 2, error,
  warning, info, ml, styleOverride, ...rest
}) => {
  const legendTextAlign = inline ? (legendAlign || 'right') : legendAlign;

  return (
    <StyledFieldset
      data-component='fieldset'
      styleOverride={ styleOverride.root }
      ml={ ml }
      { ...rest }
    >
      <StyledFieldsetContent inline={ inline }>
        {legend && (
          <StyledLegendContainer
            inline={ inline }
            styleOverride={ styleOverride.legend }
            width={ legendWidth }
            align={ legendTextAlign }
            rightPadding={ legendSpacing }
          >
            <legend>
              { legend }
            </legend>
            <ValidationIcon
              error={ error }
              warning={ warning }
              info={ info }
              tabIndex={ 0 }
            />
          </StyledLegendContainer>
        )}
        { children }
      </StyledFieldsetContent>
    </StyledFieldset>
  );
};

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
  legendAlign: PropTypes.oneOf(['left', 'right']),
  /** Spacing between legend and field for inline legend, number multiplied by base spacing unit (8) */
  legendSpacing: PropTypes.oneOf([1, 2]),
  /** Margin left as a percentage */
  ml: PropTypes.number,
  /** Allows to override existing component styles */
  styleOverride: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    legend: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  })
};

Fieldset.defaultProps = {
  inline: false,
  styleOverride: {}
};

export default Fieldset;
