import React from 'react';
import I18n from "i18n-js";
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';
import Events from './../../utils/helpers/events';

// Decorators
@Input
@InputLabel
@InputValidation
/**
 * A decimal widget.
 *
 * == How to use a Decimal in a component:
 *
 * In your file
 *
 *  import Decimal from 'carbon/lib/components/decimal';
 *
 *  In the render method:
 *
 *    <Decimal />
 *
 * This component receives its props from the decorators listed above.
 * Refer to the Input decorator for more information on required and optional props.
 *
 * @class Checkbox
 * @constructor
 **/
class Decimal extends React.Component {

  // We should not be using document here In future we should monitor which element has focus
  doc = document;

  static defaultProps = {
    /**
    * Sets the checked state of the checkbox
    *
    * @property defaultValue
    * @type { Number }
    * @default 0.00
    */
    defaultValue: '0.00'
  }

  // Private component state, it holds the formatted value for display.
  state = {
    visibleValue: formatVisibleValue(this.props.value, this)
  }

  /**
  * A lifecycle method to update the visible value with new props
  * when the field is not the active element.
  *
  * @method componentWillReceiveProps
  * @param {Object} props The new props passed down to the component
  */
  componentWillReceiveProps = (props) => {
    if (this.doc.activeElement != this.refs.visible) {
      let value = props.value || props.defaultValue;
      this.setState({ visibleValue: formatVisibleValue(value, this) });
    }
  }

  /**
  * Call back to update the hidden field on change.
  *
  *@method emitOnChangeCallback
  *@param {Number} val The unformatted decimal value
  */
  emitOnChangeCallback = (val) => {
    let hiddenField = this.refs.hidden;
    hiddenField.value = val;

    this._handleOnChange({ target: hiddenField });
  }

  /**
  * Handles Change to visible field
  *
  *@method handleVisibleInputChange
  *@param {Object} ev event
  */
  handleVisibleInputChange = (ev) => {
    this.setState({ visibleValue: ev.target.value });
    this.emitOnChangeCallback(formatHiddenValue(ev.target.value));
  }

  /**
  * Updates visible value on blur
  *
  *@method handleBlur
  */
  handleBlur = () => {
    this.setState({ visibleValue: formatVisibleValue(this.props.value, this) });
  }

  /***
   * A getter that combines props passed down from the input decorator with
   * textbox specific props.
   *
   * @method inputProps
   ***/
  get inputProps() {
    let { ...props } = this.props;
    props.className = this.inputClasses;
    props.ref = "visible";
    props.onChange = this.handleVisibleInputChange;
    props.onBlur = this.handleBlur;
    props.value = this.state.visibleValue;
    props.onKeyDown = filterKeys;
    return props;
  }

  /**
   * A getter for hidden input props.
   *
   * @method hiddenInputProps
   **/
  get hiddenInputProps() {
    var props = {
      ref: "hidden",
      type: "hidden",
      readOnly: true
    };

    if (typeof this.props.value !== 'undefined')
      { props.value = this.props.value; }
    if (typeof this.props.defaultValue !== 'undefined')
      { props.defaultValue = this.props.defaultValue; }

    return props;
  }

  /**
   * Main Class getter
   *
   * @method mainClasses Main Class getter
   */
  get mainClasses() {
    return 'ui-decimal';
  }

  /**
   * Input class getter
   *
   * @method inputClasses
   */
  get inputClasses() {
    return 'ui-decimal__input';
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
        <input { ...this.inputProps } />
        <input { ...this.hiddenInputProps } />
        { this.validationHTML }

      </div>
    );
  }
}

// Private Methods

/**
 * Formats delimiter and separator through i18n
 *
 * @method i18nFormatting
 */
function i18nFormatting() {
  return {
    delimiter: I18n.t("number.format.delimiter", { defaultValue: "," }),
    separator: I18n.t("number.format.separator", { defaultValue: "." })
  };
}

/**
 * Filters out invalid keys for decimal field
 *
 * @method filterKeys
 * @param {Object} ev event
 */
function filterKeys(ev) {
  if (Events.isValidDecimalKey(ev)) { return true; }

  ev.preventDefault();
  return false;
}

/**
 * Removes delimiters and separators from value
 *
 * @method formatHiddenValue
 * @param {Number} valueToFormat Formatted value
 */
function formatHiddenValue(valueToFormat) {
  let value = valueToFormat;
  let regex = new RegExp('\\' + i18nFormatting().delimiter, "g");

  value = value.replace(regex, "", "g");
  value = value.replace(i18nFormatting().separator, ".");

  return value;
}

/**
 * Adds delimiters to the value
 *
 * @method formatVisibleValue
 * @param {Number} value Unformatted Value
 * @param {Object} scope used to get default value of current scope if value doesn't exist
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
 * @param {Object} scope used to get default value of current scope
 */
function getDefaultValue(scope) {
  if (typeof scope.refs.hidden !== 'undefined') {
    return scope.refs.hidden.value;
  } else {
    return scope.props.defaultValue;
  }
}

export default Decimal;
