import PropTypes from 'prop-types';
import React from 'react';
import baseTheme from '../../../../style/themes/base';
import tagComponent from '../../../../utils/helpers/tags';
import StyledColorOption from './style/color-option.style';
import ColorSampleBox from '../color-sample-box';
import StyledColorOptionInput from './style/color-option-input.style';

const ColorOption = (props) => {
  return (
    <StyledColorOption
      color={ props.color }
      checked={ props.checked }
      className={ props.className }
      { ...props }
      { ...tagComponent('color-option', props) }
    >
      <StyledColorOptionInput
        className={ props.className }
        onChange={ props.onChange }
        checked={ props.checked }
        name={ props.name }
        type='radio'
        value={ props.color }
      />
      <ColorSampleBox color={ props.color } checked={ props.checked } />
    </StyledColorOption>
  );
};

ColorOption.defaultProps = {
  checked: false,
  onChange: null,
  theme: baseTheme
};

ColorOption.propTypes = {
  /** the value of the color that is represented by this ColorOption */
  color: PropTypes.string,
  /** the input name */
  name: PropTypes.string,
  /** called when the user selects or deselects this color option */
  onChange: PropTypes.func,
  /** determines if this color option is selected or unselected */
  checked: PropTypes.bool,
  /** Custom className */
  className: PropTypes.string,
  theme: PropTypes.object
};

export default ColorOption;
