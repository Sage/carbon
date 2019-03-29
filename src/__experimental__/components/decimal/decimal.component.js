import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Textbox from '../textbox';
import I18nHelper from '../../../utils/helpers/i18n';
import Logger from '../../../utils/logger';

const Decimal = (props) => {
  const [input, setInput] = useState(null);

  function formatValue() {
    const { value } = props;
    // Only format value if input is not active
    if (input && document.activeElement === input.current) {
      return value;
    }

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
        target.setSelectionRange(selectionEnd, selectionEnd);
      });
    }
  }

  function onBlur (evt) {
    // Call onChange to force decimal formattting
    // Alternative is to store input value in state.
    onChange(evt);
  }

  return (
    <Textbox
      { ...props }
      onChange={ onChange }
      onBlur={ onBlur }
      value={ formatValue() }
      inputRef={ (inputRef) => { setInput(inputRef); } }
    />
  );
};

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
