import React from 'react';
import ColorOption from './color-option';

/**
 * A component that displays squares with color samples that
 * you can choose from.
 *
 * == How to use a SimpleColorPicker in a component:
 *
 *   import SimpleColorPicker from 'carbon/lib/components/simple-color-picker';
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
    /**
     * an array with all available colors that will be shown it the color picker.
     *
     * @property availableColors
     * @type {Array}
     */
    availableColors: React.PropTypes.array,

    /**
     * the value of the currently selected color.
     *
     * @property selectedColor
     * @type {String}
     */
    selectedColor: React.PropTypes.string,

    /**
     * the name of the input element.
     *
     * @property name
     * @type {String}
     */
    name: React.PropTypes.string,

    /**
     * a callback when the user changes the selected color.
     *
     * @property onChange
     * @type {Function}
     */
    onChange: React.PropTypes.func
  }

  /**
   * Returns true if the color passed as argument is currently
   * checked.
   *
   * @method isOptionChecked
   * @return {Boolean}
   */
  isOptionChecked(color) {
    return this.props.selectedColor === color;
  }

  /**
   * Returns a ColorOption component for a given color.
   *
   * @method colorOption
   * @return {Object} JSX
   */
  colorOption(color) {
    let isChecked = this.isOptionChecked(color);

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

  /**
   * Returns ColorOption components for all available colors.
   *
   * @method colorOptions
   * @return {Object} JSX
   */
  get colorOptions() {
    return this.props.availableColors.map((color) => this.colorOption(color));
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <div className="carbon-simple-color-picker">
        <ul className="carbon-simple-color-picker__color-options">
          { this.colorOptions }
        </ul>
      </div>
    );
  }
}

export default SimpleColorPicker;
