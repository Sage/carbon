import PropTypes from 'prop-types';
import React from 'react';
import { withTheme } from 'styled-components';
import baseTheme from '../../../../style/themes/base';

import tagComponent from '../../../../utils/helpers/tags';
import StyledColorOption from './style/color-option.style';
import StyledColorSampleBox from './style/color-sample-box.style';
import StyledTickIcon from './style/tick-icon.style';
import StyledColorOptionInput from './style/color-option-input.style';

/** A single square with a color, implemented as a radio button. */
// eslint-disable-next-line react/prefer-stateless-function
class ColorOption extends React.Component {
  render() {
    const tickIcon = this.props.theme.name === 'classic' ? <StyledTickIcon type='tick' /> : null;
    return (
      <StyledColorOption
        color={ this.props.color }
        checked={ this.props.checked }
        className={ this.props.className }
        { ...tagComponent('color-option', this.props) }
      >
        <StyledColorOptionInput
          className={ this.props.className }
          onChange={ this.props.onChange }
          checked={ this.props.checked }
          name={ this.props.name }
          type='radio'
          value={ this.props.color }
        />
        <StyledColorSampleBox color={ this.props.color }>{tickIcon}</StyledColorSampleBox>
      </StyledColorOption>
    );
  }
}

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

export default withTheme(ColorOption);
export { ColorOption };
