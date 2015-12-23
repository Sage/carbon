import React from 'react';
import Presence from 'utils/validations/presence';
import Textbox from 'components/textbox';
import Date from 'components/date';
import Checkbox from 'components/checkbox';
import Row from 'components/row';
import Dropdown from 'components/dropdown';
import DropdownFilter from 'components/dropdown-filter';
import DropdownAjax from 'components/dropdown-ajax';
import FinancesActions from './../../../../actions/finances';

class Details extends React.Component {

  render() {
    return (
      <Row>
        <Textbox name="name" value={ this.props.name } onChange={ FinancesActions.financesValueUpdated } validations={ [Presence()] } />

        <Date name="date_from" value={ this.props.dateFrom } onChange={ FinancesActions.financesValueUpdated } />

        <Dropdown name="accounts" options={ this.props.options } onChange={ FinancesActions.financesValueUpdated } value={ this.props.accounts } />

        <DropdownFilter name="foo" options={ this.props.options } onChange={ FinancesActions.financesValueUpdated } value={ this.props.foo } />

        <DropdownAjax
          name="country"
          path="/countries"
          onChange={ FinancesActions.financesCountryUpdated }
          value={ this.props.countryValue }
          visibleValue={ this.props.countryVisibleValue } />

        <Checkbox name="discount" label="Apply Discount?" value={ this.props.discount } onChange={ FinancesActions.financesValueUpdated } />
      </Row>
    );
  }
}

export default Details;
