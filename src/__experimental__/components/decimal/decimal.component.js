import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextBox from '../textbox';
import I18nHelper from '../../../utils/helpers/i18n';

const Decimal = (props) => {
  const [decimalValue, setDecimalValue] = useState('0.00');

  useEffect(() => {
    // Update decimalValue if precision prop changes
    const { precision } = props;
    const parts = decimalValue.split('.');
    let newDecimal = parts[1];
    const decimalLength = parts[1].length;
    let diff;

    if (precision > decimalLength) { // Precision increased
      diff = precision - decimalLength;
      for (let i = 0; i < diff; i++) {
        newDecimal = newDecimal + '0';
      }
    } else if (precision < decimalLength) { // Precision decreased
      diff = decimalLength - precision;
      newDecimal = Math.round(newDecimal / (10 * diff));
    }
    
    setDecimalValue([parts[0], '.', newDecimal].join(''));
  }, [props.precision]);

  const testValue = (value) => {
    const { precision } = props;
    const format = I18nHelper.format();
    const delimiter = `\\${format.delimiter}`;
    const seperator = `\\${format.separator}`;

    const regex = new RegExp(`^[\\d${delimiter}]*[${seperator}{1}]?\\d{0,${precision}}?$`);
    const isGoodDecimal = regex.test(value);

    return isGoodDecimal;
  }

  const handleChange = (evt) => {
    const target = evt.target;
    const { value, selectionEnd } = evt.target;
    const testString = testValue(value);
    
    if (testString) {
      setDecimalValue(value);
      props.onChange({ target: { value: value } })
      setTimeout(() => {
        target.setSelectionRange(selectionEnd, selectionEnd)
      });
    }
  }

  const handleBlur = () => {
    const addCommasRegex = /(\d)(?=(\d{3})+(?!\d))/g;
    const parts = decimalValue.split('.');
    const integer = parts[0];
    
    let newInteger = integer.replace(/,/g, '');
    newInteger = newInteger.replace(addCommasRegex, '$1,');
    let array = [newInteger];

    if (parts[1]) {
      array.push('.', parts[1]);
    }
    setDecimalValue(array.join(''));
  }

  console.log(props)
  return (
    <TextBox
      {...props}
      onChange={ handleChange }
      onBlur={ handleBlur }
      value={ decimalValue }
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
  value: PropTypes.string
}

Decimal.defaultProps = {
  align: 'left',
  precision: 2,
  inputWidth: 100
};


export default Decimal;
