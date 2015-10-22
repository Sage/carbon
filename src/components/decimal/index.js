import React from 'react';
import Input from './../../utils/input';
import InputValidation from './../../utils/input/validation';
import I18n from "i18n-js";
import Events from './../../utils/helpers/events';

class Decimal extends React.Component {

  // We should not be using document here In future we should monitor which element has focus
  doc = document;

  static defaultProps = {
    defaultValue: '0.00'
  }

  i18n = () => {
    return {
      delimiter: I18n.t("number.format.delimiter", { defaultValue: "," }),
      separator: I18n.t("number.format.separator", { defaultValue: "." })
    }
  }

  /**
   * Returns an unformatted decimal value.
   *
   * @method formatHiddenValue
   */
  formatHiddenValue = (valueToFormat) => {
    var value = valueToFormat || this.props.value || this.getDefaultValue();
    var regex = new RegExp('\\' + this.i18n().delimiter, "g");

    value = value.replace(regex, "", "g");
    value = value.replace(this.i18n().separator, ".");

    return value;
  }

  /**
   * Returns a formatted decimal value.
   *
   * @method formatVisibleValue
   * @param should be interger or floating point
   */
  formatVisibleValue = (value) => {
    var value = value || this.props.value || this.getDefaultValue();

    var value = I18n.toNumber(value, {
      precision: 2,
      delimiter: this.i18n().delimiter,
      separator: this.i18n().separator
    });
    return value;
  }

  getDefaultValue = () => {
    if (this.refs.hidden) {
      return this.refs.hidden.value;
    } else {
      return this.props.defaultValue;
    }
  }

  state = {
    visibleValue: this.formatVisibleValue()
  }

  componentWillReceiveProps = (props) => {
    if (this.doc.activeElement != this.refs.visible) {
      var value = props.value || props.defaultValue;
      this.setState({
        visibleValue: this.formatVisibleValue(value)
      });
    }
  }

  /**
   * Sets the visible input to the visible value.
   *
   * @method updateVisibleValue
   */
  updateVisibleValue = () => {
    this.setState({
      visibleValue: this.formatVisibleValue()
    });
  }

  /**
   * Update the hidden input and triggers it's onChange event.
   *
   * @method handleVisibleInputChange
   */
  handleVisibleInputChange = (ev) => {
    this.setState({
      visibleValue: ev.target.value
    });
    this.emitOnChangeCallback(this.formatHiddenValue(ev.target.value));
  }

  emitOnChangeCallback = (val) => {
    var hiddenField = this.refs.hidden;
    hiddenField.value = val;
    if (this.props.onChange) {
      this.props.onChange({
        target: hiddenField
      }, this.props);
    }
  }

  handleBlur = () => {
    this.updateVisibleValue();
    this.props.validation.handleBlur();
  }

  handleFocus = () => {
    this.props.validation.handleFocus();
  }

  /**
   * Supplies further customisation for the input properties.
   *
   * @method customInputProps
   */
  customInputProps = () => {
    var inputProps = this.props.input.inputProps();
    delete inputProps.value;
    inputProps.onChange = this.handleVisibleInputChange;
    inputProps.onBlur = this.handleBlur;
    inputProps.onFocus = this.handleFocus;
    inputProps.value = this.state.visibleValue;
    inputProps.onKeyDown = this.filterKeys;
    return inputProps;
  }

  hiddenFieldProps = () => {
    var props = {};

    if (this.props.value) {
      props.value = this.props.value;
    }

    if (this.props.defaultValue) {
      props.defaultValue = this.props.defaultValue;
    }

    return props;
  }

  filterKeys = (ev) => {
    if (Events.isMetaKey(ev) ||
        Events.isEnterKey(ev) ||
        Events.isNavigationKey(ev) ||
        Events.isDeletingKey(ev) ||
        Events.isNumberKey(ev) ||
        Events.isDelimiterKey(ev)) {

        return true;
    }

    ev.preventDefault();
    return false;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    var mainClasses = 'ui-decimal' +
        this.props.input.mainClasses() +
        this.props.validation.mainClasses();

    var inputClasses = "ui-decimal__input" +
        this.props.input.inputClasses() +
        this.props.validation.inputClasses();

    return (
      <div className={ mainClasses }>

        { this.props.input.labelHTML() }

        <input
          className={ inputClasses }
          ref="visible"
          { ...this.customInputProps() }
        />

        <input
          ref="hidden"
          type="hidden"
          readOnly
          { ...this.hiddenFieldProps() }
        />

        { this.props.validation.errorMessageHTML() }

      </div>
    );
  }

};

export default InputValidation(Input(Decimal));
