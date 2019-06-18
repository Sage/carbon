import React from 'react';
import PropTypes from 'prop-types';
import ColorOption from './color-option/color-option.component.js';
import tagComponent from '../../../utils/helpers/tags/tags';
import { StyledSimpleColorPicker, StyledColorOptions } from './simple-color-picker.style';
import guid from '../../../utils/helpers/guid';

class SimpleColorPicker extends React.Component {
  static propTypes = {
    /** An array of color choices to display. */
    availableColors: PropTypes.array,

    /** The currently selected color. */
    selectedColor: PropTypes.string,

    /** The name to apply to the input. */
    name: PropTypes.string,

    /** A callback triggered when a color is selected. */
    onChange: PropTypes.func
  };

  /** Returns true if the color passed as argument is currently checked. */
  _isOptionChecked(color) {
    return this.props.selectedColor === color;
  }

  /** Returns a ColorOption component for a given color */
  _colorOption(color) {
    const isChecked = this._isOptionChecked(color);
    const optionId = guid();

    return (
      <ColorOption
        name={ this.props.name }
        onChange={ this.props.onChange }
        color={ color }
        checked={ isChecked }
        key={ optionId }
        optionId={ optionId }
      />
    );
  }

  /** Returns ColorOption components for all available colors. */
  get _colorOptions() {
    return this.props.availableColors.map(color => this._colorOption(color));
  }

  /** Renders the component. */
  render() {
    return (
      <StyledSimpleColorPicker { ...tagComponent('simple-color-picker', this.props) }>
        <StyledColorOptions aria-label={ this.props.name } role='radiogroup'>
          {this._colorOptions}
        </StyledColorOptions>
      </StyledSimpleColorPicker>
    );
  }
}

export default SimpleColorPicker;
