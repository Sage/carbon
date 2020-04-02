import React from 'react';
import PropTypes from 'prop-types';

import tagComponent from '../../../utils/helpers/tags';
import RadioButtonFieldsetStyle from './radio-button-fieldset.style';
import RadioButtonGroupStyle from './radio-button-group.style';
import RadioButtonMapper from './radio-button-mapper.component';
import withValidation from '../../../components/validations/with-validation.hoc';

const RadioButtonGroup = (props) => {
  const {
    children, name, legend, hasError, hasWarning, hasInfo, onBlur,
    onChange, value, tooltipMessage, inline, labelInline, styleOverride
  } = props;

  const groupLabelId = `${name}-label`;

  const renderChildren = () => {
    return React.Children.map(children, child => React.cloneElement(child, { inline }));
  };

  return (
    <RadioButtonFieldsetStyle
      aria-labelledby={ groupLabelId }
      role='radiogroup'
      legend={ legend }
      hasError={ hasError }
      hasWarning={ hasWarning }
      hasInfo={ hasInfo }
      tooltipMessage={ tooltipMessage }
      inline={ labelInline }
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
          {renderChildren()}
        </RadioButtonMapper>
      </RadioButtonGroupStyle>
    </RadioButtonFieldsetStyle>
  );
};

RadioButtonGroup.propTypes = {
  /** The RadioButton objects to be rendered in the group */
  children: PropTypes.node.isRequired,
  /** Specifies the name prop to be applied to each button in the group */
  name: PropTypes.string.isRequired,
  /** The content for the RadioGroup Legend */
  legend: PropTypes.string.isRequired,
  /** Help text */
  labelHelp: PropTypes.string,
  /** Prop to indicate that an error has occurred */
  hasError: PropTypes.bool,
  /** Prop to indicate that a warning has occurred */
  hasWarning: PropTypes.bool,
  /** Prop to indicate additional information  */
  hasInfo: PropTypes.bool,
  /** Callback fired when each RadioButton is blurred */
  onBlur: PropTypes.func,
  /** Callback fired when the user selects a RadioButton */
  onChange: PropTypes.func,
  /** value of the selected RadioButton */
  value: PropTypes.string,
  /** Message to be displayed in a Tooltip when the user hovers over the help icon */
  tooltipMessage: PropTypes.string,
  /** When true, radiobutton is placed in line */
  inline: PropTypes.bool,
  /** When true, legend is placed in line with an radiobutton */
  labelInline: PropTypes.bool,
  /** Allows to override existing component styles */
  styleOverride: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    content: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    legend: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  })
};

RadioButtonGroup.defaultProps = {
  hasError: false,
  hasWarning: false,
  hasInfo: false,
  inline: false,
  labelInline: false,
  styleOverride: {}
};

export default withValidation(RadioButtonGroup, { unblockValidation: true });
