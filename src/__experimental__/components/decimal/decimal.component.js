import React from 'react';
import PropTypes from 'prop-types';
import Textbox from '../textbox';
import I18nHelper from '../../../utils/helpers/i18n';
import Logger from '../../../utils/logger';

class Decimal extends React.Component {
  input = null;

  // Create ref to document for tests
  _document = document;

  formatValue = () => {
    const { value } = this.props;
    const { input } = this;

    // Return unformatted value if component has not mounted
    if (!input) {
      return value;
    }
    // Return unformatted value if input is being used
    if (input && this._document.activeElement === input.current) {
      return value;
    }

    // Only format value if input is not active
    // Strip delimiters otherwise formatDecimal Helper goes nuts
    const format = I18nHelper.format();
    const delimiter = `\\${format.delimiter}`;
    const removeDelimiter = new RegExp(`[${delimiter}]*`, 'g');
    const noDelimiters = value.replace(removeDelimiter, '');

    return I18nHelper.formatDecimal(
      noDelimiters,
      this.validatePrecision()
    );
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

  onChange = (evt) => {
    const { target } = evt;
    const { value, selectionEnd } = evt.target;
    const isValid = this.testValue(value);

    if (isValid) {
      this.props.onChange(evt);
    } else {
      const newPosition = selectionEnd - 1;
      setTimeout(() => {
        target.setSelectionRange(newPosition, newPosition);
      });
    }
  }

  onBlur = (evt) => {
    // Call onChange to force decimal formattting
    // Alternative is to store input value in state.
    this.onChange(evt);
  }

  render() {
    return (
      <Textbox
        { ...this.props }
        onChange={ this.onChange }
        onBlur={ this.onBlur }
        value={ this.formatValue() }
        inputRef={ (input) => { this.input = input; } }
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
