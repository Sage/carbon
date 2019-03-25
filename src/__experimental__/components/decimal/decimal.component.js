import React from 'react';
import PropTypes from 'prop-types';
import TextBox from '../textbox';
import I18nHelper from '../../../utils/helpers/i18n';

class Decimal extends React.Component {
  state = {
    value: '0.00'
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const test = this.testValue();
  //   console.log(prevState.value, this.props.value)
  //   console.log(prevState.value !== this.props.value, test)
  //   if (prevState.value !== this.props.value && test) {
  //     this.setState({
  //       value: this.props.value
  //     })
  //   }
  // }
  
  testValue = (value) => {
    const { precision } = this.props;
  
    const regex = /^[\d,]*[\.{1}]?\d{0,2}?$/;
    const isGoodDecimal = regex.test(value);
    console.log(value)
    console.log(isGoodDecimal)
    if (!isGoodDecimal) { return false; }

    return true;
  }

  handleChange = (evt) => {
    const target = evt.target;
    const { value, selectionEnd } = target;
    const testString = this.testValue(value);
    
    console.log(value)
    console.log(testString)

    if (testString) {
      this.setState({ value });
      this.props.onChange({ target: { value: value } })
      setTimeout(() => {
        target.setSelectionRange(selectionEnd, selectionEnd)
      });
    }
  }

  render() {
    return (
      <TextBox
        {...this.props}
        onChange={ this.handleChange }
        value={ this.state.value }
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
  align: 'left',
  precision: 2,
  inputWidth: 100
};


export default Decimal;
