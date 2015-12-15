import React from 'react';
import Input from './../../utils/decorators/input';
import Event from './../../utils/helpers/events';
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
 *   <Numbername="myNumber" />
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

  handleKeyUp = (ev) => {
    let value = ev.target.value;
    let negative = false;

    if (value.indexOf("-") == 0) {
      negative = true;
    }

    value = value.replace(/[^\d]/g, '');

    if (negative) {
      value = "-" + value;
    }

    ev.target.value = value;
  }

  handleKeyDown = (ev) => {
    if (Event.isValidNumberFieldKey(ev)) { return true; }

    ev.preventDefault();
    return false;
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
    props.onKeyDown = this.handleKeyDown;
    props.onKeyUp = this.handleKeyUp;
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

export default Number;
