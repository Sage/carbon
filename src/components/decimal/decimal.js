import React from 'react';
import I18n from "i18n-js";
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';

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
 *   <Decimal name="myDecimal" />
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


  static defaultProps = {
    /**
     * Sets the default value of the decimal field
     *
     * @property defaultValue
     * @type {String}
     * @default '0.00'
     */
    defaultValue: '0.00',

    /**
     * Sets the default value alignment
     *
     * @property align
     * @type {String}
     * @default 'right'
     */
    align: "right"
  }

  state = {
    /**
     * The formatted value for display
     *
     * @property visibleValue
     * @type {String}
     */
    visibleValue: formatVisibleValue(this.props.value, this)
  }

  /**
   * A lifecycle method to update the visible value with a formatted version,
   * only when the field is not the active element.
   *
   * @method componentWillReceiveProps
   * @param {Object} props The new props passed down to the component
   * @return {void}
   */
  componentWillReceiveProps(props) {
    if (this._document.activeElement != this._input) {
      let value = props.value || props.defaultValue;
      this.setState({ visibleValue: formatVisibleValue(value, this) });
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
    let hiddenField = this.refs.hidden;
    hiddenField.value = val;

    this._handleOnChange({ target: hiddenField });
  }

  /**
   * Checks that visibleValue is valid decimal.
   * This is a post-processor applied after the value has been updated.
   *
   * @method isValidDecimal
   * @param {String} value new prop value
   * @return {Boolean} true if a valid decimal
   */
  isValidDecimal = (value) => {
    let del, regex, result, sep;
    del = i18nFormatting().delimiter;
    sep = i18nFormatting().separator;
    regex = new RegExp('^[-]?[0-9]*(?:\\' + del + '?[0-9]?)*\\' + sep + '?[0-9]{0,}$');
    result = regex.test(value);

    return result;
  }

  /**
   * Handles Change to visible field
   *
   * @method handleVisibleInputChange
   * @param {Object} ev event
   * @return {void}
   */
  handleVisibleInputChange = (ev) => {
    if (this.isValidDecimal(ev.target.value)) {
      this.setState({ visibleValue: ev.target.value });
      this.emitOnChangeCallback(formatHiddenValue(ev.target.value));
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
    this.setState({ visibleValue: formatVisibleValue(this.props.value, this) });
    this.highlighted = false;
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

    let input = this._input;
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
   * A getter that combines props passed down from the input decorator with
   * textbox specific props.
   *
   * @method inputProps
   * @return {Object} props to apply to input field
   */
  get inputProps() {
    let { ...props } = this.props;
    props.className = this.inputClasses;
    props.onChange = this.handleVisibleInputChange;
    props.onClick = this.handleOnClick;
    props.name = null;
    props.onBlur = this.handleBlur;
    props.value = this.state.visibleValue;
    props.onKeyDown = this.handleKeyDown;
    return props;
  }

  /**
   * A getter for hidden input props.
   *
   * @method hiddenInputProps
   * @return {Object} props to apply to hidden field
   */
  get hiddenInputProps() {
    var props = {
      ref: "hidden",
      type: "hidden",
      readOnly: true,
      name: this.props.name
    };

    if (typeof this.props.value !== 'undefined')
      { props.value = this.props.value; }
    else
      { props.defaultValue = this.props.defaultValue; }

    return props;
  }

  /**
   * Uses the mainClasses method provided by the decorator to add additional classes.
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    let classes = 'ui-decimal';

    if (this.props.className) {
      classes += ` ${this.props.className}`;
    }

    return classes;
  }

  /**
   * Uses the inputClasses method provided by the decorator to add additional classes.
   *
   * @method inputClasses
   * @return {String} Input className
   */
  get inputClasses() {
    return 'ui-decimal__input';
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <div className={ this.mainClasses }>

        { this.labelHTML }
        { this.inputHTML }
        <input { ...this.hiddenInputProps } />
        { this.validationHTML }

      </div>
    );
  }
}
)));

// Private Methods

/**
 * Formats delimiter and separator through i18n
 *
 * @method i18nFormatting
 * @private
 * @return {Object} Delimeter and separator values
 */
function i18nFormatting() {
  return {
    delimiter: I18n.t("number.format.delimiter", { defaultValue: "," }),
    separator: I18n.t("number.format.separator", { defaultValue: "." })
  };
}

/**
 * Removes delimiters and separators from value
 *
 * @method formatHiddenValue
 * @private
 * @param {String} valueToFormat Formatted value
 * @return {String} formated hidden value
 */
function formatHiddenValue(valueToFormat) {
  let value = valueToFormat;
  let regex = new RegExp('\\' + i18nFormatting().delimiter, "g");

  value = value.replace(regex, "", "g");
  value = value.replace(i18nFormatting().separator, ".");

  return value;
}

/**
 * Adds formatting to the value
 *
 * @method formatVisibleValue
 * @private
 * @param {String} value Unformatted Value
 * @param {Object} scope used to get default value of current scope if value doesn't exist
 * @return {String} formated value
 */
function formatVisibleValue(value, scope) {
  value = value || getDefaultValue(scope);

  value = I18n.toNumber(value, {
    precision: 2,
    delimiter: i18nFormatting().delimiter,
    separator: i18nFormatting().separator
  });
  return value;
}

/**
 * Returns defaultValue for specified scope,
 *
 * @method getDefaultValue
 * @private
 * @param {Object} scope used to get default value of current scope
 * @return {String} default Value
 */
function getDefaultValue(scope) {
  if (typeof scope.refs.hidden !== 'undefined') {
    return scope.refs.hidden.value;
  } else {
    return scope.props.defaultValue;
  }
}

export default Decimal;
