import React from 'react';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';
import classNames from 'classnames';
import { tagComponent } from '../../utils/helpers/tags';
import { validProps } from '../../utils/ether';

/**
 * A Checkbox widget.
 *
 * == How to use a Checkbox in a component:
 *
 * In your file:
 *
 *   import Checkbox from 'carbon/lib/components/checkbox';
 *
 * To render the Checkbox:
 *
 *   <Checkbox name='myCheckbox' />
 *
 * @class Checkbox
 * @constructor
 * @decorators {Input,InputLabel,InputValidation}
 */
const Checkbox = Input(InputLabel(InputValidation(
class Checkbox extends React.Component {

  static propTypes = {
    /**
     * Reverses label and checkbox display
     *
     * @property reverse
     * @type {Boolean}
     * @default false
     */
    reverse: React.PropTypes.bool
  }

  static defaultProps = {
    reverse: false
  }

  /**
   * Sets the value of the checkbox [true | false]
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
    return 'carbon-checkbox';
  }

  /**
   * Uses the inputClasses method provided by the decorator to add additional classes.
   *
   * @method inputClasses
   * @return {String} input className
   */
  get inputClasses() {
    return 'carbon-checkbox__input';
  }

  /**
   * A getter that combines props passed down from the input decorator with
   * checkbox specific props.
   *
   * @method inputProps
   * @return {Object} Props to be applied to the input
   */
  get inputProps() {
    let { ...props } = validProps(this);
    // React uses checked instead of value to define the state of a checkbox
    props.checked   = this.props.checked !== undefined ? this.props.checked : this.props.value;
    props.className = this.inputClasses;
    props.onChange  = this.handleOnChange;
    props.type      = 'checkbox';
    props.value     = '1';
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
      name:           this.inputProps.name,
      readOnly:       true,
      ref:            'hidden',
      type:           'hidden',
      value:          '0',
      'data-element': 'hidden-input'
    };

    return props;
  }

  /**
   * Return the svg image for the checkbox
   *
   * @return {Object} JSX svg
   */
  get checkboxSprite() {
    return(
      <svg width='15' height='15' viewBox='0 0 15 15'>
        <rect className='checkbox-outline' fill='#AFAFAF' x='0' y='0' width='15' height='15'></rect>
        <rect className='checkbox-fill' fill='#FFFFFF' x='1' y='1' width='13' height='13'></rect>
        <path d="M5.06079081,11.805307 L2.2548404,9.4508351 C1.95287351,9.19745479 1.91372172,
        8.74748731 2.16708208,8.44554418 L3.08395978,7.35285189 C3.3376225,7.05054844 3.78738919,
        7.01144632 4.08921714,7.26471004 L6.46118447,9.25502694 L11.4959248,3.25485701 C11.7492184,
        2.95299356 12.1993451,2.91365198 12.5012882,3.16701234 L13.5939805,4.08389004 C13.896284,
        4.33755276 13.9353536,4.78735811 13.6820499,5.08923375 L8.30934217,11.4921775 C8.28333213,
        11.5485068 8.24949267,11.6023543 8.20769039,11.6521724 L7.2908127,12.7448647 C7.12011041,
        12.9482997 6.86060017,13.032541 6.61713008,12.9887006 C6.48855215,12.9709764 6.36324771,
        12.9179844 6.25647356,12.8283903 L5.16378128,11.9115126 C5.12512704,11.8790778 5.09077658,
        11.8434362 5.06079081,11.805307 L5.06079081,11.805307 Z" className='checkbox-check' fill='#FFFFFF'></path>
      </svg>
    );
  }

  /**
   * Extends the input content to include the checkbox sprite
   *
   * @method additionalInputContent
   * @return {Object} JSX additional content inline with input
   */
  get additionalInputContent() {
    return this.checkboxSprite;
  }

  /**
   * Returns classes for field help.
   *
   * @method fieldHelpClasses
   * @return {String}
   */
  get fieldHelpClasses() {
    return classNames(
      'carbon-checkbox__help-text', {
        'carbon-checkbox__help-text--reverse': this.props.reverse,
        'carbon-checkbox__help-text--inline': this.props.fieldHelpInline
      }
    );
  }

  /**
   * Renders the component with props.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    let labelRight, labelLeft, fieldHelpLeft,
        fieldHelpRight = this.fieldHelpHTML;

    if (this.props.reverse) {
      labelLeft = this.labelHTML;

      if (this.props.fieldHelpInline) {
        fieldHelpLeft = this.fieldHelpHTML;
        fieldHelpRight = null;
      }
    } else {
      labelRight = this.labelHTML;
    }

    return(
      <div className={ this.mainClasses } { ...tagComponent('checkbox', this.props) }>
        { labelLeft }
        { fieldHelpLeft }
        <input { ...this.hiddenInputProps } />
        { this.inputHTML }
        { labelRight }
        { fieldHelpRight }
        { this.validationHTML }
      </div>
    );
  }
}
)));


export default Checkbox;
