import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Textbox from '../textbox';
import I18nHelper from '../../../utils/helpers/i18n';

const Decimal = (props) => {
  const [decimalValue, setDecimalValue] = useState(props.value);

  useEffect(() => {
    // Update decimalValue if precision prop changes
    const { precision } = props;

    setDecimalValue(I18nHelper.formatDecimal(parseFloat(decimalValue), precision));
  }, [props.precision]);

  const testValue = (value) => {
    const { precision } = props;
    const format = I18nHelper.format();
    const delimiter = `\\${format.delimiter}`;
    const seperator = `\\${format.separator}`;
    const isGoodDecimal = new RegExp(`^[\\d${delimiter}]*[${seperator}{1}]?\\d{0,${precision}}?$`);
    
    return isGoodDecimal.test(value);
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
    const { precision } = props;
    let noCommas = decimalValue.replace(/,/g, '');
    
    setDecimalValue(I18nHelper.formatDecimal(parseFloat(noCommas), precision));
  }

  return (
    <Textbox
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
  align: 'right',
  precision: 2,
  inputWidth: 100
};


export default Decimal;
