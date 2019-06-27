import PropTypes from 'prop-types';
import React from 'react';
import tagComponent from '../../../../utils/helpers/tags';
import StyledColorOption from './style/color-option.style';
import ColorSampleBox from '../color-sample-box';
import StyledColorOptionInput from '../color-option-input/style/color-option-input.style';

const ColorOption = (props) => {
  const { onChange, ...rest } = props;
  return (
    <StyledColorOption
      color={ props.color }
      checked={ props.checked }
      className={ props.className }
      aria-checked={ props.checked }
      role='radio'
      { ...rest }
      { ...tagComponent('color-option', props) }
    >
      <StyledColorOptionInput
        className={ props.className }
        onChange={ onChange }
        checked={ props.checked }
        name={ props.name }
        type='radio'
        value={ props.color }
        id={ props.color }
        aria-label={ props.name }
      />
      <ColorSampleBox color={ props.color } checked={ props.checked } />
    </StyledColorOption>
  );
};

ColorOption.defaultProps = {
  checked: false,
  onChange: null
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
  /** [Legacy] Custom classname */
  className: PropTypes.string
};

export default ColorOption;
