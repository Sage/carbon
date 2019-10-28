import PropTypes from 'prop-types';
import React from 'react';
import tagComponent from '../../../../utils/helpers/tags/tags';
import StyledSimpleColor from './simple-color.style';
import ColorSampleBox from '../color-sample-box';
import StyledSimpleColorInput from '../simple-color-input/simple-color-input.style';

const SimpleColor = (props) => {
  const {
    onChange, color, name, checked, className, ...rest
  } = props;
  return (
    <StyledSimpleColor
      color={ color } checked={ checked }
      className={ className } { ...tagComponent('color-option', props) }
    >
      <StyledSimpleColorInput
        onChange={ onChange }
        checked={ checked }
        name={ name }
        type='radio'
        role='radio'
        value={ color }
        aria-checked={ checked }
        { ...rest }
      />
      <ColorSampleBox color={ props.color } checked={ props.checked } />
    </StyledSimpleColor>
  );
};

SimpleColor.defaultProps = {
  checked: false,
  onChange: null
};

SimpleColor.propTypes = {
  /** the value of the color that is represented by this SimpleColor */
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

export default SimpleColor;
