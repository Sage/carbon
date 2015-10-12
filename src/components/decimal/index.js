import React from 'react';
import InputClass from './../../utils/input-class';
import I18n from "i18n-js";

class Decimal extends InputClass {

  i18n = () => {
    return {
      delimiter: I18n.t("number.format.delimiter", { defaultValue: "," }),
      separator: I18n.t("number.format.separator", { defaultValue: "." })
    }
  }

  /**
   * Returns an uformatted decimal value.
   *
   * @method formatHiddenValue
   */
  formatHiddenValue = (value) => {
    var value = value || this.props.value || this.getDefaultValue();
    var regex = new RegExp('\\' + this.i18n().delimiter, "g");

    value = value.replace(regex, "", "g");
    value = value.replace(this.i18n().separator, ".");

    return value;
  }

  /**
   * Returns a formatted decimal value.
   *
   * @method formatVisibleValue
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
    if (document.activeElement != this.refs.visible) {
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

  /**
   * Supplies further customisation for the input properties.
   *
   * @method customInputProps
   */
  customInputProps = (inputProps) => {
    delete inputProps.value;
    inputProps.onChange = this.handleVisibleInputChange;
    inputProps.onBlur = this.updateVisibleValue;
    inputProps.value = this.state.visibleValue;
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

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div className="ui-textbox">

        { this.labelHTML() }

        <input
          ref="visible"
          { ...this.inputProps() }
        />

        <input
          ref="hidden"
          type="hidden"
          readOnly
          { ...this.hiddenFieldProps() }
        />

      </div>
    );
  }

};

export default Decimal;
