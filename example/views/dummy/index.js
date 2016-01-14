import React from 'react';
import { connect } from 'utils/flux';
import Form from 'components/form';
import Button from 'components/button';
import QuickCreate from './subviews/quick-create';
import Link from   'components/link';

import FinancesStore from './../../stores/finances';
import UserActions from './../../actions/user';
import FinancesActions from './../../actions/finances';

import FinancesHistory from './subviews/history';
import FinancesDetails from './subviews/details';
import FinancesChart from './subviews/chart';
import FinancesTable from './subviews/table';
import UserDialog from './subviews/user-dialog';
import Flash from 'components/flash';

class Finances extends React.Component {

  componentWillUpdate(nextProps, nextState) {
    if (this.state.financesStore.get('success')) {
      console.log('saved!');
    }
  }

  handleOnClick = (ev) => {
    ev.preventDefault();
    UserActions.userDialogOpened();
  }

  save = (ev) => {
    ev.preventDefault();
    FinancesActions.beforeSave();
    FinancesActions.financesSave();
    FinancesActions.financesFlashOpened();
  }

  handleFlashEnd = (ev) => {
    console.log('re-render')
    FinancesActions.financesFlashClosed();
  }

  render() {
    let name = this.state.financesStore.get('name');

    return (
      <div className="view-finances">
        <FinancesHistory />

        <Button onClick={ this.handleOnClick }>Edit My Details</Button>

        <QuickCreate />

        <h1 className="view-finances__title">{ name }</h1>

        <Form model="foo" saving={ this.state.financesStore.get('isSaving') } afterFormValidation={ this.save } ref="form">
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

        <Link className="home-link" href='#' disabled>Main Page</Link>

        <UserDialog />

        <Flash cancelHandler={ this.handleFlashEnd } title="Save Successful!" open={this.state.financesStore.get('displayFlash')} mode='warning' />

      </div>
    );
  }
}

export default connect(Finances, FinancesStore);
