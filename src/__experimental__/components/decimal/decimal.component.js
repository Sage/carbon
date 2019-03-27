import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Textbox from '../textbox';
import I18nHelper from '../../../utils/helpers/i18n';

class Decimal extends React.Component {
  constructor(props) {
    super(props);
    const { value } = this.props;
    const isValidInitVal = this.testValue(value);
    const initVal = isValidInitVal ? value : Decimal.defaultProps.value;

    if (!isValidInitVal) {
      console.warn('Initial value is not a valid decimal');
    }

    this.state = {
      decimalValue: initVal
    }
  }

  componentDidUpdate(prevProps) {
    const { precision } = this.props;
    console.log('updated')
    if (prevProps.precision !== precision) {
      // Update decimalValue if precision prop changes
      this.setState({
        decimalValue: I18nHelper.formatDecimal(
          parseFloat(this.state.decimalValue),
          this.validatePrecision()
        )
      });
    }
  } 
  
  validatePrecision = () => {
    const { precision } = this.props;

    if (precision > 15) {
      console.warn('Precision cannot be greater than 15');
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
    const target = evt.target;
    const { value, selectionEnd } = evt.target;
    const testString = this.testValue(value);
    if (testString) {
      this.setState({
        decimalValue: value
      });
      this.props.onChange({ target: { value: value } })
      setTimeout(() => {
        target.setSelectionRange(selectionEnd, selectionEnd)
      });
    }
  }

  handleBlur = () => {
    const { precision } = this.props;
    const format = I18nHelper.format();
    const delimiterRegex = new RegExp(`\\${format.delimiter}`, 'g');
    let noCommas = this.state.decimalValue.replace(delimiterRegex, '');
    
    this.setState({
      decimalValue: I18nHelper.formatDecimal(parseFloat(noCommas), precision)
    })
  }

  render() {
    return (
      <Textbox
        {...this.props}
        onChange={ this.handleChange }
        onBlur={ this.handleBlur }
        value={ this.state.decimalValue }
      />
    );
  }
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
  inputWidth: 100,
  value: '0.00'
};



export default Decimal;
