import React from 'react';
import Presence from 'utils/validations/presence';
import Numeral from 'utils/validations/numeral';
import Textbox from 'components/textbox';
import Date from 'components/date';
import Checkbox from 'components/checkbox';
import Row from 'components/row';
import FinancesActions from './../../../../actions/finances';
import Dropdown from 'components/dropdown';
import DropdownFilter from 'components/dropdown-filter';
import DropdownFilterAjax from 'components/dropdown-filter-ajax';

class Details extends React.Component {

  render() {
    return (
      <Row>

        <Textbox
          name="name"
          value={ this.props.name }
          onChange={ FinancesActions.financesValueUpdated }
          validations={ [ Numeral({ is: 100 }) ] }
        />

        <Date
          name="date_from"
          value={ this.props.dateFrom }
          onChange={ FinancesActions.financesValueUpdated }
        />

        <Checkbox
          name="discount"
          label="Apply Discount?"
          value={ this.props.discount }
          onChange={ FinancesActions.financesValueUpdated }
        />

        <Dropdown
          name="accounts"
          options={ this.props.options }
          onChange={ FinancesActions.financesValueUpdated }
          value={ this.props.accounts }
          validations={ [Presence()] }
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
