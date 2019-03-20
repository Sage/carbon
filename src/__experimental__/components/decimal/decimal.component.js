import React from 'react';
import PropTypes from 'prop-types';
import TextBox from '../textbox';

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
    inputWidth: PropTypes.number
  }

  // inputWidth: PropTypes.number,
  // fieldHelp: PropTypes.number,
  // fieldHelpInline: PropTypes.number,
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

  render() {
    return (
      <TextBox {...this.props} />
    );
  }
}

export default Decimal;
