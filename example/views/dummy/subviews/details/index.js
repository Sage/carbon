import React from 'react';
import Presence from 'utils/validations/presence';
import Textbox from 'components/textbox';
import Date from 'components/date';
import Checkbox from 'components/checkbox';
import DropdownSuggest from 'components/dropdown-suggest';
import Pod from 'components/pod';
import FinancesActions from './../../../../actions/finances';

class Details extends React.Component {
  render() {
    return (
      <Pod>
        <DropdownSuggest name="name" path="/" />
        <Textbox name="name" value={ this.props.name } onChange={ FinancesActions.financesValueUpdated } validations={ [Presence] } />
        <Date name="date_from" value={ this.props.dateFrom } onChange={ FinancesActions.financesValueUpdated } />
        <Checkbox name="discount" label="Apply Discount?" value={ this.props.discount } onChange={ FinancesActions.financesValueUpdated } />
      </Pod>
    );
  }
}

export default Details;
