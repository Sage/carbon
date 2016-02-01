import React from 'react';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';

/*****
 * A radiobutton widget.
 *
 * == How to use a radiobutton in a component:
 *
 * In your file:
 *
 *   import radiobutton from 'carbon/lib/components/radiobutton';
 *
 * To render the radiobutton:
 *
 *  <radiobutton name='frequency' value='weekly'>Weekly</radiobutton>
 *  <radiobutton name='frequency' value='2weekly'>2 Weekly</radiobutton>
 *  <radiobutton name='frequency' value='weekly'>4 Weekly</radiobutton>
 *  <radiobutton name='frequency' value='monthly'>Monthly</radiobutton>
 *
 * For additional properties specific to this component, see propTypes.
 *
 * @class Link
 * @constructor
 */
const Radiobutton = Input(InputLabel(InputValidation(
class Radiobutton extends React.Component {

  static propTypes = {

    /**
     * The name property
     *
     * @property name
     * @type {String}
     */
    name: React.PropTypes.string.isRequired,

    /**
     * The name property
     *
     * @property reverse
     * @type {bool}
     */
    reverse: React.PropTypes.bool,

    /**
    * Sets the radiobutton default checked state.
    *
    * @property defaultChecked
    * @type {boolean}
    * @default false
    */
    defaultChecked: React.PropTypes.bool
  }

  static defaultProps = {
    defaultChecked: false,
    reverse: false
  }

    /**
   * Sets the value of the radiobutton [true | false]
   *
   * @method handleOnChange
   * @param {Object} ev event
   * @return {void}
   */
  handleOnChange = (ev) => {
    // we handle the change event manually here, as we pass the checked param
    // instead of value
    this._handleOnChange({ target: { value: ev.target.checked }});
  }
  
  /**
   * Uses the mainClasses method provided by the decorator to add additional classes.
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    return 'ui-radiobutton';
  }

  /**
   * Uses the inputClasses method provided by the decorator to add additional classes.
   *
   * @method inputClasses
   * @return {String} input className
   */
  get inputClasses() {
    return 'ui-radiobutton__input';
  }

  /**
   * A getter that combines props passed down from the input decorator with
   * radiobutton specific props.
   *
   * @method inputProps
   * @return {Object} Props to be applied to the input
   */
  get inputProps() {
    let { ...props } = this.props;
    props.className = this.inputClasses;
    props.type = "radio";
    // React uses checked instead of value to define the state of a radiobutton
    props.checked = this.props.checked || this.props.value;
    props.onChange = this.handleOnChange;
    return props;
  }

  /**
   * A getter for hidden input props.
   *
   * @method hiddenInputProps
   * @return {Object} Props to be applied to the hidden input
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
   * @return {Object} JSX
   */
  render() {
    let labelRight, labelLeft;

    if (this.props.reverse) {
      labelLeft = this.labelHTML;
    } else {
      labelRight = this.labelHTML;
    }

    return(
      <div className={ this.mainClasses }>
        { labelLeft }
        <input { ...this.hiddenInputProps } />
        { this.inputHTML }
        { labelRight }
        { this.validationHTML }
      </div>
    );
  }
}
)));

export default Radiobutton;
