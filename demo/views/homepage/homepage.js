import React from 'react';
import Pod from 'components/pod';
import GroupedNumber from 'components/grouped-number';
import NumeralValidator from 'utils/validations/numeral';
import LengthValidator from 'utils/validations/length';
import Presence from 'utils/validations/presence';

class Homepage extends React.Component {
  state = {
    value: ''
  };

  onChange = (ev) => {
    this.setState({ value: ev.target.value });
  }
  /**
   * @method render
   */
  render() {

    return (
      <Pod className="carbon-homepage">
          <GroupedNumber
            onChange={ this.onChange }
            label='Sortcode'
            labelInline={ true }
            groups='4'
            groupLength='4'
            value={ this.state.value }
            validations={ [new Presence, new NumeralValidator({ integer: true }), new LengthValidator({ is: 6 })] }
          />
      </Pod>
    );
  }
}

export default Homepage;
