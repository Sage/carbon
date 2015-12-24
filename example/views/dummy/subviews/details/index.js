import React from 'react';
import Presence from 'utils/validations/presence';
import Textbox from 'components/textbox';
import Date from 'components/date';
import Checkbox from 'components/checkbox';
import Row from 'components/row';
import Dropdown from 'components/dropdown';
import DropdownFilter from 'components/dropdown-filter';
import DropdownFilterAjax from 'components/dropdown-filter-ajax';
import FinancesActions from './../../../../actions/finances';

class Details extends React.Component {

  foo = (ev, component) => {
    debugger
  }

  render() {
    return (
      <Row>

        <Dropdown name="foo" options={ this.props.options } onChange={ FinancesActions.financesValueUpdated } value={ this.props.foo } />

        <DropdownFilter
          name="accounts"
          options={ this.props.options }
          onChange={ FinancesActions.financesValueUpdated }
          value={ this.props.accounts }
          create={ true }
        />

        <DropdownFilterAjax
          name="country"
          path="/countries"
          onChange={ FinancesActions.financesCountryUpdated }
          value={ this.props.countryValue }
          visibleValue={ this.props.countryVisibleValue }
        />

      </Row>
    );
  }
}

export default Details;
