import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from '../../utils/decorators/input';
import InputLabel from '../../utils/decorators/input-label';
import InputValidation from '../../utils/decorators/input-validation';
import { validProps } from '../../utils/ether';
import tagComponent from '../../utils/helpers/tags';

/**
 * A number widget. It only allows entering of a whole number with an
 * optional minus sign.
 *
 * == How to use a Number in a component:
 *
 * In your file
 *
 *   import Number from 'carbon-react/lib/components/number';
 *
 * To render a Number:
 *
 *   <Number name="myNumber" />
 *
 * @class Number
 * @constructor
 * @decorators {Input,InputLabel,InputValidation}
 */
const Number = Input(InputLabel(InputValidation(class Number extends React.Component {
  static propTypes = {
    /**
     * A custom class name for the component.
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string,

    /**
     * The value of the Number input element
     *
     * @property value
     * @type {String}
     */
    value: PropTypes.string,

    /**
     * Event handler for the keyDown event
     *
     * @property onKeyDown
     * @type {Function}
     */
    onKeyDown: PropTypes.func
  }

  /**
   * Main Class getter
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    return classNames(
      'carbon-number',
      this.props.className
    );
  }

  /**
   * Input class getter
   *
   * @method inputClasses
   * @return {String} Input className
   */
  get inputClasses() {
    return 'carbon-number__input';
  }

  /**
   * Handles Change to input field
   *
   * @method handleOnChange
   * @param {Object} ev event
   * @return {void}
   */
  handleOnChange = (ev) => {
    if (isValidNumber(ev.target.value)) {
      this._handleOnChange(ev);
    } else {
      // reset the value
      ev.target.value = this.props.value || null;
      // reset the selection range
      ev.target.setSelectionRange(this.selectionStart, this.selectionEnd);
    }
  }

  /*
   * Triggers on key down of the input
   *
   * @method handleKeyDown
   * @param {Object} ev event
   * @return {void}
   */
  handleKeyDown = (ev) => {
    // track the selection start and end
    this.selectionStart = ev.target.selectionStart;
    this.selectionEnd = ev.target.selectionEnd;

    if (this.props.onKeyDown) {
      // we also send the props so more information can be extracted by the action
      this.props.onKeyDown(ev, this.props);
    }
  }

  /**
   * A getter that combines props passed down from the input decorator with
   * number specific props.
   *
   * @method inputProps
   * @return {Object} props for the input
   */
  get inputProps() {
    const { ...props } = validProps(this);
    props.className = this.inputClasses;
    props.onChange = this.handleOnChange;
    props.onKeyDown = this.handleKeyDown;
    return props;
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <div className={ this.mainClasses } { ...tagComponent('number', this.props) }>

        { this.labelHTML }
        { this.inputHTML }
        { this.validationHTML }
        { this.fieldHelpHTML }

      </div>
    );
  }
})));

/**
 * Checks that the given value is valid number.
 *
 * @method isValidNumber
 * @private
 * @param {String} value number to check validity
 * @return {Boolean} true if value is valid number
 */
function isValidNumber(value) {
  const regex = new RegExp('^[-]?[0-9]*$');
  const result = regex.test(value);

  return result;
}

export default Number;
