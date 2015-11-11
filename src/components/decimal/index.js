import React from 'react';
import I18n from "i18n-js";
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';
import Events from './../../utils/helpers/events';

@Input
@InputLabel
@InputValidation
class Decimal extends React.Component {

  // We should not be using document here In future we should monitor which element has focus
  doc = document;

  static defaultProps = {
    defaultValue: '0.00'
  }

  state = {
    visibleValue: formatVisibleValue(this.props.value, this)
  }

  componentWillReceiveProps = (props) => {
    if (this.doc.activeElement != this.refs.visible) {
      var value = props.value || props.defaultValue;
      this.setState({ visibleValue: formatVisibleValue(value, this) });
    }
  }

  emitOnChangeCallback = (val) => {
    var hiddenField = this.refs.hidden;
    hiddenField.value = val;

    this._handleOnChange({ target: hiddenField }, false);
  }

  handleVisibleInputChange = (ev) => {
    this.setState({ visibleValue: ev.target.value });
    this.emitOnChangeCallback(formatHiddenValue(ev.target.value));
  }

  handleBlur = () => {
    this.setState({ visibleValue: formatVisibleValue(this.props.value, this) });
  }

  get inputProps() {
    var { onChange, ...props } = this.props;
    props.className = this.inputClasses;
    props.ref = "visible";
    props.onChange = this.handleVisibleInputChange;
    props.onBlur = this.handleBlur;
    props.value = this.state.visibleValue;
    props.onKeyDown = filterKeys;
    return props;
  }

  get hiddenInputProps() {
    var props = {
      ref: "hidden",
      type: "hidden",
      readOnly: true
    };

    if (this.props.value) { props.value = this.props.value; }
    if (this.props.defaultValue) { props.defaultValue = this.props.defaultValue; }

    return props;
  }

  get mainClasses() {
    return 'ui-decimal';
  }

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

function i18nFormatting() {
  return {
    delimiter: I18n.t("number.format.delimiter", { defaultValue: "," }),
    separator: I18n.t("number.format.separator", { defaultValue: "." })
  };
}

function filterKeys(ev) {
  if (Events.isValidDecimalKey(ev)) { return true; }

  ev.preventDefault();
  return false;
}

function formatHiddenValue(valueToFormat) {
  var value = valueToFormat;
  var regex = new RegExp('\\' + i18nFormatting().delimiter, "g");

  value = value.replace(regex, "", "g");
  value = value.replace(i18nFormatting().separator, ".");

  return value;
}

function formatVisibleValue(value, scope) {
  value = value || getDefaultValue(scope);

  value = I18n.toNumber(value, {
    precision: 2,
    delimiter: i18nFormatting().delimiter,
    separator: i18nFormatting().separator
  });
  return value;
}

function getDefaultValue(scope) {
  if (scope.refs.hidden) {
    return scope.refs.hidden.value;
  } else {
    return scope.props.defaultValue;
  }
}

export default Decimal;
