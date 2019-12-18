/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import StyledWiggle from './decimal.style';
import Textbox from '../textbox';
import I18nHelper from '../../../utils/helpers/i18n';
import Events from '../../../utils/helpers/events';

class Decimal extends React.Component {
  static maxPrecision = 15

  defaultValue = this.props.allowEmptyValue ? '' : '0.00'

  constructor(props) {
    super(props);

    const isControlled = this.isControlled();
    const value = isControlled ? this.getSafeValueProp(true) : (this.props.defaultValue || this.defaultValue);

    this.state = {
      value,
      visibleValue: this.formatValue(value),
      isControlled,
      isAnimating: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const message = 'Input elements should not switch from uncontrolled to controlled (or vice versa). '
    + 'Decide between using a controlled or uncontrolled input element for the lifetime of the component';
    const isControlled = this.isControlled();
    invariant(this.state.isControlled === isControlled, message);

    if (isControlled) {
      const valueProp = this.getSafeValueProp();
      if (valueProp !== prevState.value) {
        const safeVisibleValue = valueProp === '-' ? this.formatValue(this.defaultValue) : this.formatValue(valueProp);
        this.setState({
          value: valueProp,
          visibleValue: safeVisibleValue
        });
      }
    }

    if (prevProps.precision !== this.props.precision) {
      this.setState((localPreviousState) => {
        const visibleValue = this.formatValue(localPreviousState.value);
        return {
          value: this.toStandardDecimal(visibleValue),
          visibleValue
        };
      }, () => {
        this.callOnChange();
      });
    }
  }

  startAnimation = () => {
    if (!this.props.readOnly) {
      this.setState({ isAnimating: true });
    }
  }

  stopAnimation = () => this.setState({ isAnimating: false })

  callOnChange = () => {
    if (this.props.onChange) {
      this.props.onChange(this.createEvent());
    }
  }

  onChange = (ev) => {
    const { target: { value } } = ev;
    this.setState({ value: this.toStandardDecimal(value), visibleValue: value }, () => {
      this.callOnChange();
    });
  }

  onPaste = (ev) => {
    const value = this.replace(ev);
    const isValid = this.isValidDecimal(value);
    if (!isValid) {
      ev.preventDefault();
    }
  }

  onKeyPress = (ev) => {
    // We're checking to see if the proposed change is valid, if not we block the user input
    if (!this.isValidKeyPress(ev)) {
      ev.preventDefault();
    }
    if (this.props.onKeyPress) {
      this.props.onKeyPress(ev);
    }
  }

  isValidKeyPress = (ev) => {
    const { delimiter, separator } = I18nHelper.format();

    if (Events.isNumberKey(ev) || ev.key === delimiter || ev.key === separator || Events.isDeletingKey(ev)) {
      return this.isValidDecimal(this.replace(ev));
    }

    if (ev.ctrlKey || ev.metaKey) {
      // user is doing some browser related task, we don't want to interfere with that.
      // Command is metaKey in Safari, but ctrlKey in all other browsers
      // Windows key is metaKey also
      // we do want to check paste, we do that onPaste
      return true;
    }

    if (Events.isMinusKey(ev) && ev.target.selectionStart === 0) {
      // user is entering a negative symbol at the start of the number
      return true;
    }

    this.startAnimation();
    return false;
  }

  onBlur = () => {
    let shouldCallOnChange = false;
    this.setState(({ value, visibleValue }) => {
      if (!visibleValue || visibleValue === '-') {
        shouldCallOnChange = value !== this.defaultValue;
        return {
          value: this.defaultValue,
          visibleValue: this.formatValue(this.defaultValue)
        };
      }
      return {
        visibleValue: this.formatValue(value)
      };
    }, () => {
      if (shouldCallOnChange) {
        this.callOnChange();
      }
      if (this.props.onBlur) {
        this.props.onBlur(this.createEvent());
      }
    });
  }

  createEvent = () => {
    const standardVisible = this.toStandardDecimal(this.state.visibleValue);
    const formattedValue = this.isNaN(standardVisible) ? this.state.visibleValue : this.formatValue(standardVisible);
    return {
      target: {
        name: this.props.name,
        id: this.props.id,
        value: {
          rawValue: this.state.value,
          formattedValue
        }
      }
    };
  }

  /**
   * Determine if the component is controlled at the time of call
   */
  isControlled () {
    return this.props.value !== undefined;
  }

  isNaN = (value) => {
    return Number.isNaN(Number(value));
  }

  /**
   * Validate the user input
   */
  isValidDecimal = (value) => {
    const { precision } = this.props;
    const format = I18nHelper.format();
    const delimiter = `\\${format.delimiter}`;
    const separator = `\\${format.separator}`;
    const validDecimalMatcher = new RegExp(`^[-]?[\\d${delimiter}]*[${separator}]?\\d{0,${precision}}?$`);
    const isValid = validDecimalMatcher.test(value);
    if (!isValid) {
      this.startAnimation();
    }
    return isValid;
  }

  getSafeValueProp = (isInitialValue) => {
    const { value, allowEmptyValue } = this.props;
    // We're intentionally preventing the use of number values to help prevent any unintentional rounding issues
    invariant(typeof value === 'string', 'Decimal `value` prop must be a string');

    if (isInitialValue && !allowEmptyValue) {
      invariant(value !== '', 'Decimal `value` must not be an empty string. Please use `allowEmptyValue` or `0.00`');
    }
    return value;
  }

  getSafePrecisionProp = () => {
    const {
      precision
    } = this.props;

    const lessThanOrEqual = precision <= Decimal.maxPrecision;
    const positive = precision >= 0;
    const isNumber = Number.isInteger(precision);
    invariant(isNumber, 'Decimal `precision` prop should be a number');
    invariant(lessThanOrEqual, 'Decimal `precision` prop cannot be greater than %s', Decimal.maxPrecision);
    invariant(positive, 'Decimal `precision` prop cannot be negative');

    return precision;
  }

  removeDelimiters = (value) => {
    const format = I18nHelper.format();
    const delimiter = `\\${format.delimiter}`;
    const delimiterMatcher = new RegExp(`[${delimiter}]*`, 'g');
    const noDelimiters = value.replace(delimiterMatcher, '');
    return noDelimiters;
  }

  /**
   * Format a user defined value
   */
  formatValue = (value) => {
    invariant(!this.isNaN(value), `The supplied decimal (${value}) is not a number`);
    if (value === '') {
      return value;
    }
    return I18nHelper.formatDecimal(
      value,
      this.getSafePrecisionProp()
    );
  }

  /**
   * Perform a string replacement on the input so we can see what the value will be after the change
   * This allows us to prevent the user input if it is invalid
   */
  replace = (ev) => {
    const { target: { selectionStart, selectionEnd, value }, clipboardData, type } = ev;
    let { key: change } = ev;

    if (type === 'paste') {
      change = clipboardData.getData('text/plain');
    }

    if (Events.isDeletingKey(ev)) {
      change = '';
    }
    return (
      value.substring(0, selectionStart) + change + value.substring(selectionEnd)
    );
  };

  /**
   * Convert raw input to a standard decimal format
   */
  toStandardDecimal = (i18nValue) => {
    const withoutDelimiters = this.removeDelimiters(i18nValue);
    const { separator } = I18nHelper.format();
    return withoutDelimiters.replace(new RegExp(`\\${separator}`, 'g'), '.');
  }

  render() {
    const { name, defaultValue, ...rest } = this.props;
    return (
      <StyledWiggle isAnimating={ this.state.isAnimating } onAnimationEnd={ this.stopAnimation }>
        <Textbox
          { ...rest }
          onKeyPress={ this.onKeyPress }
          onChange={ this.onChange }
          onPaste={ this.onPaste }
          onBlur={ this.onBlur }
          value={ this.state.visibleValue }
          data-component='decimal'
        />
        <input
          name={ name }
          value={ this.toStandardDecimal(this.state.visibleValue) }
          type='hidden'
          data-component='hidden-input'
        />
      </StyledWiggle>
    );
  }
}

Decimal.propTypes = {
  /**
   * The default value alignment on the input
   */
  align: PropTypes.string,
  /**
   * The decimal precision of the value in the input
   */
  precision: PropTypes.number,
  /**
   * The width of the input as a percentage
   */
  inputWidth: PropTypes.number,
  /**
   * If true, the component will be read-only
   */
  readOnly: PropTypes.bool,
  /**
   * The default value of the input if it's meant to be used as an uncontrolled component
   */
  defaultValue: PropTypes.string,
  /**
   * The value of the input if it's used as a controlled component
   */
  value: PropTypes.string,
  /**
   * Handler for change event if input is meant to be used as a controlled component
   */
  onChange: PropTypes.func,
  /**
   * Handler for blur event
   */
  onBlur: PropTypes.func,
  /**
   * Handler for key press event
   */
  onKeyPress: PropTypes.func,
  /**
   * The input name
   */
  name: PropTypes.string,
  /**
   * The input id
   */
  id: PropTypes.string,
  /**
   * Allow an empty value instead of defaulting to 0.00
   */
  allowEmptyValue: PropTypes.bool
};

Decimal.defaultProps = {
  align: 'right',
  precision: 2,
  allowEmptyValue: false
};

export default Decimal;
