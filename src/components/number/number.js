import React from 'react';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';

/**
 * A number widget. It only allows entering of a whole number with an
 * optional minus sign.
 *
 * == How to use a Number in a component:
 *
 * In your file
 *
 *   import Number from 'carbon/lib/components/number';
 *
 * To render a Number:
 *
 *   <Number name="myNumber" />
 *
 * @class Number
 * @constructor
 * @decorators {Input,InputLabel,InputValidation}
 */
const Number = Input(InputLabel(InputValidation(
class Number extends React.Component {

  /**
   * Main Class getter
   *
   * @method mainClasses Main Class getter
   */
  get mainClasses() {
    return 'ui-number';
  }

  /**
   * Input class getter
   *
   * @method inputClasses
   */
  get inputClasses() {
    return 'ui-number__input';
  }

  /**
   * Handles Change to input field
   *
   * @method handleOnChange
   * @param {Object} ev event
   */
  handleOnChange = (ev) => {
    if (isValidNumber(ev.target.value)) {
      this._handleOnChange(ev);
    } else {
      // reset the value
      ev.target.value = this.props.value;
      // reset the selection range
      ev.target.setSelectionRange(this.selectionStart, this.selectionEnd);
    }
  }

  /*
   * Triggers on key down of the input
   *
   * @method handleKeyDown
   * @param {Object} ev event
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
   */
  get inputProps() {
    let { ...props } = this.props;
    props.className = this.inputClasses;
    props.onChange = this.handleOnChange;
    props.onKeyDown = this.handleKeyDown;
    return props;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div className={ this.mainClasses }>

        { this.labelHTML }
        { this.inputHTML }
        { this.validationHTML }

      </div>
    );
  }
}
)));

/**
 * Checks that the given value is valid number.
 *
 * @method isValidNumber
 * @private
 * @param {String} value
 */
function isValidNumber(value) {
  let regex, result;
  regex = new RegExp('^[-]?[0-9]*$');
  result = regex.test(value);

  return result;
}

export default Number;
