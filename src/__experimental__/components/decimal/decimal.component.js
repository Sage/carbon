import React from 'react';
import TextBox from '../textbox';
import PropTypes from 'prop-types';

class Decimal extends React.Component {
  static propTypes = {
    align: PropTypes.string,
    precision: PropTypes.number
  }

  static defaultProps = {
    align: 'right',
    precision: 2
  };

  render() {
    return <TextBox {...this.props} />
  }
}

export default Decimal;
