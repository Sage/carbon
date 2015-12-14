import React from 'react';
import Presence from 'utils/validations/presence';
import Textbox from 'components/textbox';
import Date from 'components/date';
import Checkbox from 'components/checkbox';
import Row from 'components/row';
import FinancesActions from './../../../../actions/finances';
import Dropdown from 'components/dropdown';
import ImmutableHelper from 'utils/helpers/immutable';

class Details extends React.Component {
options = ImmutableHelper.parseJSON([{id: 1, name: 'Debit'}, {id: 2, name: 'Line of Credit'},
                                     {id: 3, name: 'Saver Plus'}, {id: 4, name: 'Savings'},
                                     {id: 5, name: 'Cash'}, {id: 6, name: 'Current'},
                                     {id: 7, name: 'ISA'}, {id: 8, name: 'Pension'}]);
  render() {
    return (
      <Row>
        <Textbox name="name" value={ this.props.name } onChange={ FinancesActions.financesValueUpdated } validations={ [Presence()] } />
        <Date name="date_from" value={ this.props.dateFrom } onChange={ FinancesActions.financesValueUpdated } />
        <Checkbox name="discount" label="Apply Discount?" value={ this.props.discount } onChange={ FinancesActions.financesValueUpdated } />
        <Dropdown name="accounts" options={ this.options } onChange={ FinancesActions.financesValueUpdated } value={this.props.accounts}/>
      </Row>
    );
  }
}

export default Details;
