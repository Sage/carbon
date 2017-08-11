import React from 'react';
import PropTypes from 'prop-types';
import I18nHelper from './../../utils/helpers/i18n';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';
import { validProps } from '../../utils/ether';
import PropTypesHelper from '../../utils/helpers/prop-types';
import tagComponent from '../../utils/helpers/tags';

/**
 * A decimal widget.
 *
 * == How to use a Decimal in a component:
 *
 * In your file
 *
 *   import Decimal from 'carbon/lib/components/decimal';
 *
 * To render the Decimal:
 *
 *   <Decimal name='myDecimal' />
 *
 * @class Decimal
 * @constructor
 * @decorators {Input,InputLabel,InputValidation}
 */
const Decimal = Input(InputLabel(InputValidation(
class Decimal extends React.Component {

  /**
   * Stores the document - allows us to override it different contexts, such as
   * when running tests.
   *
   * @property _document
   * @type {document}
   */
  _document = document;

  /**
   * Used within the onClick and onBlur method to
   * check if the current visible input value is
   * highlighted
   *
   * @property highlighted
   * @type {Boolean}
   */
  highlighted = false;

  static propTypes = {

    // NB align is used in the Input decorator. Removing the prop from here
    // causes an 'uknown prop align on input tag' error, so the
    // react/no-unused-prop-types has been disabled for this prop
    /**
     * Sets the default value alignment
     *
     * @property align
     * @type {String}
     * @default 'right'
     */
    align: PropTypes.string, // eslint-disable-line react/no-unused-prop-types

    /**
     * Callback function for when the decimal input
     * field blur event fires.
     *
     * @property onBlur
     * @type {Void}
     */
    onBlur: PropTypes.func,

    /**
     * Callback to handle keyDown events.
     *
     * @property onKeyDown
     * @type {Void}
     */
    onKeyDown: PropTypes.func,

    /**
     * Sets the pricision of the field
     *
     * @property precision
     * @type {Integer}
     * @default 2
     */
    precision: (props, propName, componentName) => {
      return PropTypesHelper.inValidRange(props, propName, componentName, 0, 20);
    },

    /**
     * The value of the Number input element
     *
     * @property value
     * @type {String}
     */
    value: PropTypes.string,

    /**
     * The name of the hidden input element
     *
     * @property name
     * @type {String}
     */
    name: PropTypes.string
  };

  static defaultProps = {
    align: 'right',
    precision: 2
  };

  state = {
    /**
     * The formatted value for display
     *
     * @property visibleValue
     * @type {String}
     */
    visibleValue: I18nHelper.formatDecimal(this.value, this.props.precision)
  };

  /**
   * A lifecycle method to update the visible value with a formatted version,
   * only when the field is not the active element.
   *
   * @method componentWillReceiveProps
   * @param {Object} newProps The new props passed down to the component
   * @return {void}
   */
  componentWillReceiveProps(newProps) {
    if (this._document.activeElement !== this._input) {
      let value = newProps.value || 0.00;
      if (canConvertToBigNumber(value)) {
        value = I18nHelper.formatDecimal(value, newProps.precision);
      }
      this.setState({ visibleValue: value });
    }
  }

  /**
   * Callback to update the hidden field on change.
   *
   * @method emitOnChangeCallback
   * @param {String} val The unformatted decimal value
   * @return {void}
   */
  emitOnChangeCallback = (val) => {
    const hiddenField = this._hiddenInput;
    hiddenField.value = val;

    this._handleOnChange({ target: hiddenField });
  }

  /**
   * Checks that visibleValue is valid decimal.
   * This is a post-processor applied after the value has been updated.
   *
   * @method isValidDecimal
   * @param {String} value new prop value
   * @param {Integer} precision decimal precision
   * @return {Boolean} true if a valid decimal
   */
  isValidDecimal = (value, precision) => {
    const format = I18nHelper.format();
    const del = `\\${format.delimiter}`;
    const sep = `\\${format.separator}`;
    let regex;
    if (precision > 0) {
      regex = new RegExp(`^[-]?\\d*(?:${del}?\\d?)*${sep}?\\d{0,${precision}}$`);
    } else {
      regex = new RegExp(`^[-]?\\d*(?:${del}?\\d?)*$`);
    }
    return regex.test(value);
  }

  /**
   * Handles Change to visible field
   *
   * @method handleVisibleInputChange
   * @param {Object} ev event
   * @return {void}
   */
  handleVisibleInputChange = (ev) => {
    if (this.isValidDecimal(ev.target.value, this.props.precision)) {
      this.setState({ visibleValue: ev.target.value });
      this.emitOnChangeCallback(I18nHelper.unformatDecimal(ev.target.value));
    } else {
      // reset the value
      ev.target.value = this.state.visibleValue;
      // reset the selection range
      ev.target.setSelectionRange(this.selectionStart, this.selectionEnd);
    }
  }

  /**
   * Updates visible value on blur
   *
   * @method handleBlur
   * @return {void}
   */
  handleBlur = () => {
    let currentValue;

    if (canConvertToBigNumber(this.value)) {
      currentValue = I18nHelper.formatDecimal(this.value, this.props.precision);
    } else {
      currentValue = this.value;
    }

    this.setState({ visibleValue: currentValue });
    this.highlighted = false;

    if (this.value === '') {
      this.emitOnChangeCallback('0');
    }

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  /*
   * Selects visible input text depending on where the user clicks
   *
   * @method handleOnClick
   * @param {Object} ev event
   * @return {void}
   */
  handleOnClick = () => {
    // if value is already highlighted then don't re-highlight it
    if (this.highlighted) {
      this.highlighted = false;
      return;
    }

    const input = this._input;
    // only do it if the selection is not within the value
    if ((input.selectionStart === 0) && (input.selectionEnd === 0)) {
      input.setSelectionRange(0, input.value.length);
      this.highlighted = true;
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
   * Returns the current value or default value.
   *
   * @method value
   * @return {String}
   */
  get value() {
    return this.props.value || getDefaultValue(this);
  }

  /**
   * A getter that combines props passed down from the input decorator with
   * textbox specific props.
   *
   * @method inputProps
   * @return {Object} props to apply to input field
   */
  get inputProps() {
    const { ...props } = validProps(this);
    props.className = this.inputClasses;
    props.name = null;
    props.onBlur = this.handleBlur;
    props.onChange = this.handleVisibleInputChange;
    props.onClick = this.handleOnClick;
    props.onKeyDown = this.handleKeyDown;
    props.value = this.state.visibleValue;
    return props;
  }

  /**
   * A getter for hidden input props.
   *
   * @method hiddenInputProps
   * @return {Object} props to apply to hidden field
   */
  get hiddenInputProps() {
    return {
      name: this.props.name,
      readOnly: true,
      type: 'hidden',
      value: this.props.value,
      'data-element': 'hidden-input'
    };
  }

  /**
   * Uses the mainClasses method provided by the decorator to add additional classes.
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    return 'carbon-decimal';
  }

  /**
   * Uses the inputClasses method provided by the decorator to add additional classes.
   *
   * @method inputClasses
   * @return {String} Input className
   */
  get inputClasses() {
    return 'carbon-decimal__input';
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <div className={ this.mainClasses } { ...tagComponent('decimal', this.props) }>

        { this.labelHTML }
        { this.inputHTML }
        <input
          ref={ (h) => { this._hiddenInput = h; } }
          { ...this.hiddenInputProps }
        />
        { this.validationHTML }
        { this.fieldHelpHTML }

      </div>
    );
  }
}
)));

// Private Methods

/**
 * Returns defaultValue for specified scope,
 *
 * @method getDefaultValue
 * @private
 * @param {Object} scope used to get default value of current scope
 * @return {String} default Value
 */
function getDefaultValue(scope) {
  if (typeof scope._hiddenInput !== 'undefined') {
    return scope._hiddenInput.value;
  }
  return scope.props.defaultValue;
}

/**
 * Returns defaultValue for specified scope,
 *
 * @method canConvertToBigNumber
 * @private
 * @param {string} string need to be coverted to BigNumber
 * @return {Boolean}
 */
function canConvertToBigNumber(value) {
  // single `-` sign will raise an exception during formatDecimal()
  // as it cannot be convert to BigNumber()
  return /^-?(\d+(\.\d+)?|\.\d+)$/.test(value);
}

export default Decimal;
