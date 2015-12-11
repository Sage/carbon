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
options = ImmutableHelper.parseJSON([{id: 1, name: 'foo'}, {id: 2, name: 'bar'},
                                     {id: 3, name: 'goo'}, {id: 4, name: 'gar'},
                                     {id: 5, name: 'far'}, {id: 6, name: 'boo'},
                                     {id: 7, name: 'gar'}, {id: 8, name: 'goo'}]);
  render() {
    return (
      <Row>
        <Textbox name="name" value={ this.props.name } onChange={ FinancesActions.financesValueUpdated } validations={ [Presence()] } />
        <Date name="date_from" value={ this.props.dateFrom } onChange={ FinancesActions.financesValueUpdated } />
        <Checkbox name="discount" label="Apply Discount?" value={ this.props.discount } onChange={ FinancesActions.financesValueUpdated } />
        <Dropdown name="foo" options={ this.options } onChange={ FinancesActions.financesValueUpdated } value={this.props.foo}/>
      </Row>
    );
  }
}

export default Details;
