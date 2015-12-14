import React from 'react';
import { connect } from 'utils/flux';
import Form from 'components/form';
import Button from 'components/button';

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
            foo={ this.state.financesStore.get('foo') }
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

        <UserDialog />
      </div>
    );
  }
}

export default connect(Finances, FinancesStore);
