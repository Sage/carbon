import React from 'react';
import PropTypes from 'prop-types';
import ColorOption from './color-option';
import tagComponent from '../../utils/helpers/tags';
import './simple-color-picker.scss';

class SimpleColorPicker extends React.Component {
  static propTypes = {
    /**
     * an array with all available colors that will be shown it the color picker
     *
     */
    availableColors: PropTypes.array,

    /**
     * the value of the currently selected color
     *
     */
    selectedColor: PropTypes.string,

    /**
     * the name of the input element
     *
     */
    name: PropTypes.string,

    /**
     * a callback when the user changes the selected color
     *
     */
    onChange: PropTypes.func
  }

  static defaultProps = {
    onChange: null
  }

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
        <ul className='carbon-simple-color-picker__color-options'>
          { this._colorOptions }
        </ul>
      </div>
    );
  }
}

export default SimpleColorPicker;
