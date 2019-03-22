import React from 'react';
import PropTypes from 'prop-types';
import InputDecoratorBridge from '../input-decorator-bridge';
import I18nHelper from '../../../utils/helpers/i18n';

class Decimal extends React.Component {
  static propTypes = {
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
    formattedValue: PropTypes.string
  }

  // inputWidth: PropTypes.number,
  // fieldHelp: PropTypes.number,
  // label: PropTypes.number,
  // labelInline: PropTypes.number,
  // labelWidth: PropTypes.number,
  // labelAlign: PropTypes.number,
  // labelHelp: PropTypes.number

  static defaultProps = {
    align: 'left',
    precision: 2,
    inputWidth: 100
  };

  componentDidUpdate(nextProps) {
    console.log(nextProps)
    if (nextProps.value !== this.props.value) {
      
    }
  }

  handleOnChange = (evt) => {
    console.log('TEA PARTY')

    const isValid = this.isValidDecimal(
      evt.target.value,
      this.verifiedPrecision(this.props.precision)
    );

    console.log(isValid)
    console.log(this.props)
    
    if (isValid && this.props.onChange) {
      this.props.onChange(evt, this.props);
    } else {
      evt.target.value = this.props.value || null;
      evt.target.setSelectionRange(this.selectionStart, this.selectionEnd);
    }
  };

  handleKeyDown = (ev) => {
    this.selectionStart = ev.target.selectionStart;
    this.selectionEnd = ev.target.selectionEnd;

    if (this.props.onKeyDown) {
      this.props.onKeyDown(ev, this.props);
    }
  };
  
  isValidDecimal = (value, precision) => {
    const format = I18nHelper.format();
    const del = `\\${format.delimiter}`;
    const sep = `\\${format.separator}`;
    let regex;
    if (precision > 0) {
      regex = new RegExp(`^[-]?\\d*(?:${del}?\\d?)*${sep}?\\d{0,${precision}}$`);
    } else {
      regex = new RegExp(`^[-]?\\d*(?:${del}?\\d?)*$`);
    }
    return regex.test(value);
  }

  // Caps precision at 20 to prevent browser issues
  verifiedPrecision = (precision) => {
    if (precision > 20) {
      console.info('Decimal precision must not be greater than 20.');
      return 20;
    }
    return precision;
  }


  // state = {
  //   /**
  //    * The formatted value for display
  //    *
  //    * @property visibleValue
  //    * @type {String}
  //    */
  //   visibleValue: I18nHelper.formatDecimal(this.value, this.verifiedPrecision(this.props.precision))
  // };


  // componentWillReceiveProps(newProps) {
  //   if (this._document.activeElement !== this._input) {
  //     let value = newProps.value || 0.00;
  //     if (canConvertToBigNumber(value)) {
  //       value = I18nHelper.formatDecimal(value, this.verifiedPrecision(newProps.precision));
  //     }
  //     this.setState({ visibleValue: value });
  //   }
  // }











  render() {
    return (
      <InputDecoratorBridge
        onChange={ this.handleOnChange }
        onKeyDown={ this.handleKeyDown }
        {...this.props}
      />
    );
  }
}

export default Decimal;
