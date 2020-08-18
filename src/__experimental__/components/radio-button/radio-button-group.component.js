import React from 'react';
import PropTypes from 'prop-types';

import tagComponent from '../../../utils/helpers/tags';
import Fieldset from '../../../__internal__/fieldset';
import RadioButtonGroupStyle from './radio-button-group.style';
import RadioButtonMapper from './radio-button-mapper.component';
import Logger from '../../../utils/logger/logger';

let deprecatedWarnTriggered = false;

const RadioButtonGroup = (props) => {
  if (!deprecatedWarnTriggered) {
    deprecatedWarnTriggered = true;
    // eslint-disable-next-line max-len
    Logger.deprecate('`styleOverride` that is used in the `RadioButtonGroup` component is deprecated and will soon be removed.');
  }
  const {
    children, name, legend, error, warning, info, onBlur,
    onChange, value, inline, legendInline, legendWidth, legendAlign,
    legendSpacing, ml, labelSpacing = 1, styleOverride
  } = props;

  return (
    <Fieldset
      role='radiogroup'
      legend={ legend }
      error={ error }
      warning={ warning }
      info={ info }
      inline={ legendInline }
      legendWidth={ legendWidth }
      legendAlign={ legendAlign }
      legendSpacing={ legendSpacing }
      ml={ ml }
      styleOverride={ styleOverride }
      { ...tagComponent('radiogroup', props) }
    >
      <RadioButtonGroupStyle
        data-component='radio-button-group'
        role='group'
        inline={ inline }
        styleOverride={ styleOverride.content }
      >
        <RadioButtonMapper
          name={ name }
          onBlur={ onBlur }
          onChange={ onChange }
          value={ value }
        >
          {React.Children.map(children, child => React.cloneElement(child, {
            inline,
            labelSpacing,
            error: !!error,
            warning: !!warning,
            info: !!info,
            ...child.props
          }))}
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
  legendAlign: PropTypes.oneOf(['left', 'right']),
  /** Spacing between legend and field for inline legend, number multiplied by base spacing unit (8) */
  legendSpacing: PropTypes.oneOf([1, 2]),
  /** Margin left, any valid CSS value */
  ml: PropTypes.string,
  /** Spacing between labels and radio buttons, given number will be multiplied by base spacing unit (8) */
  labelSpacing: PropTypes.oneOf([1, 2]),
  /** Allows to override existing component styles */
  styleOverride: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    content: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    legend: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  })
};

RadioButtonGroup.defaultProps = {
  inline: false,
  legendInline: false,
  styleOverride: {}
};

export default RadioButtonGroup;
