import React from 'react';
import PropTypes from 'prop-types';
import Textbox from '../textbox';
import I18nHelper from '../../../utils/helpers/i18n';
import Logger from '../../../utils/logger';
import { select } from '@storybook/addon-knobs';

const Decimal = (props) => {
  // value comes:
  // onReactMount
  // onReactUpdate
  // onChange

  function formatValue() {
    const { value } = props;
    const isValid = testValue(value);
    const input = { isActive: true }
    // Only format value if input is not active
    if (input.isActive) { // TODO: Get isActive from Textbox
      return value;
    } else {
      // Strip delimiters otherwise formatDecimal Helper goes nuts
      const format = I18nHelper.format();
      const delimiter = `\\${format.delimiter}`;
      const removeDelimiter = new RegExp(`[${delimiter}]*`, 'g');
      const noDelimiters = value.replace(removeDelimiter, '');

      return I18nHelper.formatDecimal(
        noDelimiters,
        validatePrecision()
      );
    }
  }

  function stripInvalidChars() {
    const format = I18nHelper.format();
    const delimiter = `\\${format.delimiter}`;
    const seperator = `\\${format.separator}`;
    const removeCharacters = new RegExp(`[^\\d${seperator}${delimiter}]*`, 'g');

    return props.value.replace(removeCharacters, '');
  }
  
  function validatePrecision() {
    const { precision } = props;

    if (precision > 15) {
      Logger.warn('Precision cannot be greater than 15');
      return 15;
    }

    return precision;
  }

  function testValue(value) {
    const { precision } = props;
    const format = I18nHelper.format();
    const delimiter = `\\${format.delimiter}`;
    const seperator = `\\${format.separator}`;
    const isGoodDecimal = new RegExp(`^[\\d${delimiter}]*[${seperator}{1}]?\\d{0,${precision}}?$`);

    return isGoodDecimal.test(value);
  }

  function onChange (evt) {
    const { target } = evt;
    const { value, selectionEnd } = evt.target;
    const isValid = testValue(value);

    if (isValid) {
      props.onChange(evt);
    
      setTimeout(() => {
        const newPosition = testValue(value) ? selectionEnd : selectionEnd - 1;
        target.setSelectionRange(newPosition, newPosition);
      });
    }
  }

  return (
    <Textbox
      {...props}
      onChange={ onChange }
      value={ formatValue() }
    />
  )
}



class OldDecimal extends React.Component {
  constructor(props) {
    super(props);
    const { value } = this.props;
    const isValidInitVal = this.testValue(value);
    const initVal = isValidInitVal ? value : Decimal.defaultProps.value;

    if (!isValidInitVal) {
      Logger.warn('Initial value is not a valid decimal');
    }

    this.state = {
      decimalValue: initVal
    };
  }

  componentDidUpdate(prevProps) {
    const { precision } = this.props;
    if (prevProps.precision !== precision) {
      // Update decimalValue if precision prop changes
      const strippedDelimiters = this.stripDelimiters();
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        decimalValue: I18nHelper.formatDecimal(
          parseFloat(strippedDelimiters),
          this.validatePrecision()
        )
      });
    }
  }

  validatePrecision = () => {
    const { precision } = this.props;

    if (precision > 15) {
      Logger.warn('Precision cannot be greater than 15');
      return 15;
    }

    return precision;
  }

  testValue = (value) => {
    const { precision } = this.props;
    const format = I18nHelper.format();
    const delimiter = `\\${format.delimiter}`;
    const seperator = `\\${format.separator}`;
    const isGoodDecimal = new RegExp(`^[\\d${delimiter}]*[${seperator}{1}]?\\d{0,${precision}}?$`);

    return isGoodDecimal.test(value);
  }

  handleChange = (evt) => {
    const { target } = evt;
    const { value, selectionEnd } = evt.target;
    const testString = this.testValue(value);
    if (testString) {
      this.setState({
        decimalValue: value
      });
      this.props.onChange({ target: { value } });
      setTimeout(() => {
        target.setSelectionRange(selectionEnd, selectionEnd);
      });
    }
  }

  handleBlur = () => {
    const { precision } = this.props;
    const strippedDelimiters = this.stripDelimiters();

    this.setState({
      decimalValue: I18nHelper.formatDecimal(parseFloat(strippedDelimiters), precision)
    });
  }

  stripDelimiters = () => {
    const format = I18nHelper.format();
    const delimiterRegex = new RegExp(`\\${format.delimiter}`, 'g');

    return this.state.decimalValue.replace(delimiterRegex, '');
  }

  render() {
    return (
      <Textbox
        { ...this.props }
        onChange={ this.handleChange }
        onBlur={ this.handleBlur }
        value={ this.state.decimalValue }
      />
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
   * The value of the input
   */
  value: PropTypes.string,
  /**
   * Handler for change event
   */
  onChange: PropTypes.func
};

Decimal.defaultProps = {
  align: 'right',
  precision: 2,
  inputWidth: 100,
  value: '0.00'
};

export default Decimal;
