import React from 'react';
import PropTypes from 'prop-types';
import ColorOption from './color-option';
import tagComponent from '../../utils/helpers/tags';

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
 *     selectedColor='#34ff01'
 *     name='settings[color_of_something]'
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
    availableColors: PropTypes.array,

    /**
     * the value of the currently selected color.
     *
     * @property selectedColor
     * @type {String}
     */
    selectedColor: PropTypes.string,

    /**
     * the name of the input element.
     *
     * @property name
     * @type {String}
     */
    name: PropTypes.string,

    /**
     * a callback when the user changes the selected color.
     *
     * @property onChange
     * @type {Function}
     */
    onChange: PropTypes.func
  }

  static defaultProps = {
    availableColors: [],
    selectedColor: '',
    name: '',
    onChange: null
  }

  /**
   * Returns true if the color passed as argument is currently
   * checked.
   *
   * @method isOptionChecked
   * @private
   * @return {Boolean}
   */
  _isOptionChecked(color) {
    return this.props.selectedColor === color;
  }

  /**
   * Returns a ColorOption component for a given color.
   *
   * @method colorOption
   * @private
   * @return {Object} JSX
   */
  _colorOption(color) {
    const isChecked = this._isOptionChecked(color);

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
   * @private
   * @return {Object} JSX
   */
  get _colorOptions() {
    return this.props.availableColors.map(color => this._colorOption(color));
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <div className='carbon-simple-color-picker' { ...tagComponent('simple-color-picker', this.props) }>
        <ul className='carbon-simple-color-picker__color-options'>
          { this._colorOptions }
        </ul>
      </div>
    );
  }
}

export default SimpleColorPicker;
