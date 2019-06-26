import React from 'react';
import PropTypes from 'prop-types';
import ColorOption from './color-option/color-option.component.js';
import tagComponent from '../../../utils/helpers/tags/tags';
import { StyledSimpleColorPicker, StyledColorOptions } from './simple-color-picker.style';

class SimpleColorPicker extends React.Component {
  isOptionChecked(color) {
    return this.props.selectedColor === color;
  }

  getSingleOption(color) {
    const isChecked = this.isOptionChecked(color);

    return (
      <ColorOption
        name={ this.props.name }
        onChange={ this.props.onChange }
        color={ color }
        checked={ isChecked }
        key={ color }
      />
    );
  }

  getColorOptions() {
    return this.props.availableColors.map(color => this.getSingleOption(color));
  }

  render() {
    return (
      <StyledSimpleColorPicker { ...tagComponent('simple-color-picker', this.props) }>
        <StyledColorOptions aria-label={ this.props.name } role='radiogroup'>
          {this.getColorOptions()}
        </StyledColorOptions>
      </StyledSimpleColorPicker>
    );
  }
}

SimpleColorPicker.propTypes = {
  /** An array of color choices to display. */
  availableColors: PropTypes.arrayOf(PropTypes.string),
  /** The currently selected color. */
  selectedColor: PropTypes.string,
  /** The name to apply to the input. */
  name: PropTypes.string,
  /** A callback triggered when a color is selected. */
  onChange: PropTypes.func
};

export default SimpleColorPicker;
