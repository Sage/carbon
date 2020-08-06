import React from 'react';
import PropTypes from 'prop-types';

import { StyledFieldset, StyledFieldsetContent, StyledLegendContainer } from './fieldset.style';
import ValidationIcon from '../../components/validations/validation-icon.component';
import { InputGroupBehaviour, InputGroupContext } from '../input-behaviour';

const Fieldset = ({
  legend, children, inline, error, warning, info, styleOverride, ...rest
}) => (
  <InputGroupBehaviour>
    <StyledFieldset
      data-component='fieldset'
      styleOverride={ styleOverride.root }
      { ...rest }
    >
      <StyledFieldsetContent inline={ inline }>
        {legend && (
          <StyledLegendContainer
            inline={ inline }
            styleOverride={ styleOverride.legend }
          >
            <InputGroupContext.Consumer>
              {({ onMouseEnter, onMouseLeave }) => (
                <legend onMouseEnter={ onMouseEnter } onMouseLeave={ onMouseLeave }>
                  { legend }
                </legend>
              ) }
            </InputGroupContext.Consumer>
            <ValidationIcon
              error={ error }
              warning={ warning }
              info={ info }
            />
          </StyledLegendContainer>
        )}
        { children }
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
