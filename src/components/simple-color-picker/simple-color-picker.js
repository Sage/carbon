import React from 'react';
import PropTypes from 'prop-types';
import ColorOption from './color-option';
import tagComponent from '../../utils/helpers/tags';
import './simple-color-picker.scss';

class SimpleColorPicker extends React.Component {
  static propTypes = {
    /**
     * An array of color choices to display.
     */
    availableColors: PropTypes.array,

    /**
     * The currently selected color.
     */
    selectedColor: PropTypes.string,

    /**
     * The name to apply to the input.
     */
    name: PropTypes.string,

    /**
     * A callback triggered when a color is selected.
     */
    onChange: PropTypes.func
  };

  /**
   * Returns true if the color passed as argument is currently
   * checked
   *
   * @method isOptionChecked
   * @private
   * @return {Boolean}
   */
  _isOptionChecked(color) {
    return this.props.selectedColor === color;
  }

  /**
   * Returns a ColorOption component for a given color
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
        <ul className='carbon-simple-color-picker__color-options'>{this._colorOptions}</ul>
      </div>
    );
  }
}

export default SimpleColorPicker;
