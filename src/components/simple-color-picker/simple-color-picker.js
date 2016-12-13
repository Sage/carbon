import React from 'react';
import ColorOption from './color-option';

/**
 * A component that displays squares with color samples that
 * you can choose from.
 *
 * == How to use a SimpleColorPicker in a component:
 *
 *   import SimpleColorPicker from 'components/simple-color-picker';
 *
 *   <SimpleColorPicker
 *     availableColors={ ['transparent', '#ff0102', '#34ff01'] }
 *     selectedColor="#34ff01"
 *     name="settings[color_of_something]"
 *   />
 *
 */
class SimpleColorPicker extends React.Component {

  static propTypes = {
    // an array with all available colors that will be shown it the color picker.
    availableColors: React.PropTypes.array,
    // the value of the currently selected color.
    selectedColor: React.PropTypes.string,
    // the name of the input element.
    name: React.PropTypes.string,
    // a callback when the user changes the selected color.
    onChange: React.PropTypes.func
  }

  isOptionChecked(color) {
    return this.props.selectedColor == color;
  }

  colorOption(color) {
    let isChecked = this.isOptionChecked(color);

    return (
      <ColorOption
        name={ this.props.name }
        onChange={ this.props.onChange }
        color={ color }
        checked={ isChecked }
        key={ `color-box--${color}` }
      />
    );
  }

  get colorOptions() {
    return this.props.availableColors.map((color) => this.colorOption(color));
  }

  render() {
    return (
      <div className="simple-color-picker">
        { this.colorOptions }
      </div>
    );
  }
}

export default SimpleColorPicker;
