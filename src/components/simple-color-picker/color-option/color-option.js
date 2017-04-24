import React from 'react';

import Input from './../../../utils/decorators/input';
import Icon from './../../icon';
import classNames from 'classnames';
import { trim, startsWith } from 'lodash';

/**
 * A single square with a color, implemented as a radio button.
 */
const ColorOption = Input(
class ColorOption extends React.Component {

  static propTypes = {
    /**
     * the value of the color that is represented by this ColorOption.
     *
     * @property color
     * @type {String}
     */
    color: PropTypes.string,

    /**
     * the input name.
     *
     * @property name
     * @type {String}
     */
    name: PropTypes.string,

    /**
     * called when the user selects or deselects this color option.
     *
     * @property onChange
     * @type {Function}
     */
    onChange: PropTypes.func,

    /**
     * determines if this color option is selected or unselected.
     *
     * @property checked
     * @type {Boolean}
     */
    checked: PropTypes.bool
  }

  /**
   * The props used by the Input decorator when creating the input element.
   */
  get inputProps() {
    return {
      className: this.inputClasses,
      onChange: this.props.onChange,
      checked: this.props.checked,
      name: this.props.name,
      type: "radio",
      value: this.props.color
    };
  }

  get additionalInputContent() {
    return this.colorSampleBox;
  }

  /**
   * Uses the inputClasses method provided by the decorator to add additional classes.
   *
   * @method inputClasses
   * @return {String} input className
   */
  get inputClasses() {
    return 'carbon-color-option__radio-button-input';
  }

  get mainClasses() {
    return classNames (
      'carbon-color-option',
      this.props.className
    );
  }

  render() {
    return (
      <li className={ this.mainClasses }>
        { this.inputHTML }
      </li>
    );
  }

  get _colorSampleClasses() {
    let color = trim(this.props.color, '#');
    return classNames('carbon-color-option__color-sample', `carbon-color-option__color-sample--${color}`);
  }

  get _tickedIcon() {
    return <Icon type='tick' className="carbon-color-option__tick"/>;
  }

  get _colorSampleStyle() {
    return startsWith(this.props.color, '#')
      ? { backgroundColor: this.props.color }
      : {};
  }

  get colorSampleBox() {
    return (
      <div className={ this._colorSampleClasses } style={ this._colorSampleStyle }>
        { this._tickedIcon }
      </div>
    );
  }

});

export default ColorOption;
