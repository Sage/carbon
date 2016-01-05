import React from 'react';
import { connect } from 'utils/flux';
import Form from 'components/form';
import Button from 'components/button';
import Link from   'components/link';

import FinancesStore from './../../stores/finances';
import UserActions from './../../actions/user';

import FinancesHistory from './subviews/history';
import FinancesDetails from './subviews/details';
import FinancesChart from './subviews/chart';
import FinancesTable from './subviews/table';
import UserDialog from './subviews/user-dialog';


class Finances extends React.Component {
  handleOnClick = (ev) => {
    ev.preventDefault();
    UserActions.userDialogOpened();
  }

  render() {
    let name = this.state.financesStore.get('name');

    return (
      <div className="view-finances">
        <FinancesHistory />

        <Button onClick={ this.handleOnClick }>Edit My Details</Button>

        <h1 className="view-finances__title">{ name }</h1>

        <Form model="foo">
          <FinancesDetails
            name={ name }
            countryValue={ this.state.financesStore.getIn(['country', 'id']) }
            countryVisibleValue={ this.state.financesStore.getIn(['country', 'name']) }
            accounts={ this.state.financesStore.get('accounts') }
            foo={ this.state.financesStore.get('foo') }
            options={ this.state.financesStore.get('options') }
            discount={ this.state.financesStore.get('discount') }
            dateFrom={ this.state.financesStore.get('date_from') } />

          <FinancesChart
            data={ this.state.financesStore.get('chart_data') }
            balance={ this.state.financesStore.get('balance') } />

          <FinancesTable
            data={ this.state.financesStore.get('line_items') }
            discount={ this.state.financesStore.get('discount') }
            balance={ this.state.financesStore.get('balance') }
            discountTotal={ this.state.financesStore.get('discount_total') }
            debitTotal={ this.state.financesStore.get('debit_total') }
            creditTotal={ this.state.financesStore.get('credit_total') } />
        </Form>

        <Link className="home-link" href='#' disabled >Main Page</Link>

        <UserDialog />
      </div>
    );
  }
}

export default connect(Finances, FinancesStore);
