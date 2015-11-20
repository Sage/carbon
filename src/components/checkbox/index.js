import React from 'react';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';

/**
 * A checkbox widget.
 *
 * == How to use a Checkbox in a component:
 *
 * In your file:
 *
 *   import Checkbox from 'carbon/lib/components/checkbox';
 *
 * To render the Checkbox:
 *
 *   <Checkbox name="myCheckbox" />
 *
 * @class Checkbox
 * @constructor
 * @decorators {Input,InputLabel,InputValidation}
 */
const Checkbox = Input(InputLabel(InputValidation(
class Checkbox extends React.Component {

  static propTypes = {
    /**
     * Sets the checked state of the checkbox
     *
     * @property defaultChecked
     * @type {Boolean}
     * @default false
     */
    defaultChecked: React.PropTypes.bool
  }

  static defaultProps = {
    defaultChecked: false
  }

  /**
   * Sets the value of the checkbox [true | false]
   *
   * @method handleOnChange
   * @param {Object} ev event
   */
  handleOnChange = (ev) => {
    // we handle the change event manually here, as we pass the checked param
    // instead of value
    this._handleOnChange({ target: { value: ev.target.checked }});
  }

  /**
   * Main Class getter
   *
   * @method mainClasses
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

  /**
   * A getter that combines props passed down from the input decorator with
   * checkbox specific props.
   *
   * @method inputProps
   */
  get inputProps() {
    let { ...props } = this.props;
    props.className = this.inputClasses;
    props.type = "checkbox";
    // React uses checked instead of value to define the state of a checkbox
    props.checked = this.props.checked || this.props.value;
    props.value = "1";
    props.onChange = this.handleOnChange;
    return props;
  }

  /**
   * A getter for hidden input props.
   *
   * @method hiddenInputProps
   */
  get hiddenInputProps() {
    let props = {
      ref: "hidden",
      type: "hidden",
      value: "0",
      name: this.inputProps.name,
      readOnly: true
    };

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
)));

export default Checkbox;
