import React from 'react';
import { connect } from 'utils/flux';
import Form from 'components/form';
import Button from 'components/button';
import QuickCreate from './subviews/quick-create';
import Link from   'components/link';
import Notification from   'components/notification';

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
    let financesStore = this.state.financesStore;

    return (
      <div>
        <Notification as="new" title="This is a title" message="This is my message." />

        <div className="view-finances">
          <FinancesHistory />

          <Button onClick={ this.handleOnClick }>Edit My Details</Button>

          <QuickCreate />

          <h1 className="view-finances__title">{ name }</h1>

          <Form model="foo">
            <FinancesDetails
              name={ name }
              countryValue={ financesStore.getIn(['country', 'id']) }
              countryVisibleValue={ financesStore.getIn(['country', 'name']) }
              accounts={ financesStore.get('accounts') }
              foo={ financesStore.get('foo') }
              options={ financesStore.get('options') }
              discount={ financesStore.get('discount') }
              dateFrom={ financesStore.get('date_from') } />

            <FinancesChart
              data={ financesStore.get('chart_data') }
              balance={ financesStore.get('balance') } />

            <FinancesTable
              data={ financesStore.get('line_items') }
              discount={ financesStore.get('discount') }
              balance={ financesStore.get('balance') }
              discountTotal={ financesStore.get('discount_total') }
              debitTotal={ financesStore.get('debit_total') }
              creditTotal={ financesStore.get('credit_total') } />
          </Form>

          <Link className="home-link" href='#' disabled>Main Page</Link>

          <UserDialog />

          <Flash cancelHandler={ this.handleFlashEnd } title="Save Successful!" open={this.state.financesStore.get('displayFlash')} mode='warning' />
        </div>
      </div>
    );
  }
}

export default connect(Finances, FinancesStore);
