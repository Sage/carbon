import React from 'react';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';

// Decorators
@Input
@InputLabel
@InputValidation
/**
 * A checkbox widget.
 *
 * == How to use a Checkbox in a component:
 *
 * In your file
 *
 *  import Checkbox from 'carbon/lib/components/checkbox';
 *
 *  In the render method:
 *
 *    <Checkbox />
 *
 * This component receives its props from the decorators listed above.
 * Refer to the Input decorator for more information on required and optional props.
 *
 * @class Checkbox
 * @constructor
 **/
class Checkbox extends React.Component {

  /**
  * Sets the checked state of the checkbox
  *
  * @property defaultChecked
  * @type { Boolean }
  * @default false
  */
  static defaultProps = {
    defaultChecked: false
  }

  /**
   * Sets the value of the checkbox [true | false]
   * @method handleOnChange
   * @param { Object } ev
   */
  handleOnChange = (ev) => {
    /**
     * The change event
     *
     * @param { Object } ev
     */
    this._handleOnChange({ target: { value: ev.target.checked }});
  }

  /**
   * Main Class getter
   *
   * @method mainClasses Main Class getter
   */
  get mainClasses() {
    return 'ui-checkbox';
  }

  /**
   * Input class getter
   *
   * @method inputClasses
   */
  get inputClasses() {
    return 'ui-checkbox__input';
  }

  /***
   * A getter that combines props passed down from the input decorator with
   * checkbox specific props.
   *
   * @method inputProps
   ***/
  get inputProps() {
    let { ...props } = this.props;
    props.className = this.inputClasses;
    props.type = "checkbox";
    //React uses checked instead of value to define the state of a checkbox
    props.checked = this.props.checked || this.props.value;
    props.value = "1";
    props.onChange = this.handleOnChange;
    return props;
  }

  /**
   * A getter for hidden input props.
   *
   * @method hiddenInputProps
   **/
  get hiddenInputProps() {
    let props = {
      ref: "hidden",
      type: "hidden",
      value: "0",
      name: this.inputProps.name,
      readOnly: true
    }

    return props;
  }

  /**
   * Renders the component with props.
   *
   * @method render
   */
  render() {
    return(
      <div className={ this.mainClasses }>

        { this.labelHTML }
        <input { ...this.inputProps } />
        <input { ...this.hiddenInputProps } />
        { this.validationHTML }

      </div>
    );
  }
}

export default Checkbox;
