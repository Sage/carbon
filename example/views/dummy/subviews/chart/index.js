import React from 'react';
import Immutable from 'immutable';
import Rainbow from 'components/rainbow';

class Chart extends React.Component {
  render() {
    let balanceText = "Your Balance<br /><span style='font-size: 12px; font-weight: normal;'>You have £" + this.props.balance + "</span>";

    return (
      <Rainbow title={ balanceText } data={ this.props.data } />
    );
  }
}

export default Chart;
