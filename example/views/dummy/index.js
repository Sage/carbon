import React from 'react';
import { connect } from 'utils/flux';
import Form from 'components/form';
import Button from 'components/button';
import QuickCreate from './subviews/quick-create';
import Radiobutton from 'components/radiobutton';     
import Link from 'components/link';
import Pill from 'components/pill';
import Banner from 'components/banner';
import Toast from 'components/toast';
import SplitButton from 'components/split-button';

import FinancesStore from './../../stores/finances';
import UserActions from './../../actions/user';
import FinancesActions from './../../actions/finances';

import FinancesHistory from './subviews/history';
import FinancesDetails from './subviews/details';
import FinancesChart from './subviews/chart';
import FinancesTable from './subviews/grid';
import UserDialog from './subviews/user-dialog';
import Flash from 'components/flash';
import Message from 'components/message';

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

  splitMainButton = (ev) => {
    console.log('main')
  }

  splitFirstButton = (ev) => {
    console.log('first')
  }

  splitSecondButton = (ev) => {
    console.log('second')
  }

  render() {
    let name = this.state.financesStore.get('name');
    let financesStore = this.state.financesStore;

    return (
      <div>
        <Banner as="warning" title="This is a title" message="This is my message." buttonAction={ function() {console.log('clicked')}}/>

        <div className="view-finances">
          <FinancesHistory />

          <Button onClick={ this.handleOnClick }>Edit My Details</Button>

          <Pill as='warning'>Warning Pill</Pill>
          <Pill as='info'>Info Pill</Pill>
          <Pill as='new'>New Pill</Pill>

          <SplitButton text="Split" onClick={ this.splitMainButton }>
            <Button onClick={ this.splitFirstButton }>Foo</Button>
            <Button onClick={ this.splitSecondButton }>Bar</Button>
          </SplitButton>

          <QuickCreate />

          <h1 className="view-finances__title">{ name }</h1>

          <Form model="foo" afterFormValidation={ this.save } >
            <FinancesDetails
              name={ name }
              countryValue={ financesStore.getIn(['country', 'id']) }
              countryVisibleValue={ financesStore.getIn(['country', 'name']) }
              accounts={ financesStore.get('accounts') }
              options={ financesStore.get('options') }
              discount={ financesStore.get('discount') }
              data={ financesStore.get('line_items') }
              dateFrom={ financesStore.get('date_from') } />

            <FinancesChart
              data={ financesStore.get('chart_data') }
              balance={ financesStore.get('balance') } />

            <Message>This is an example of a message.</Message>

            <FinancesTable
              data={ financesStore.get('line_items') }
              discount={ financesStore.get('discount') }
              balance={ financesStore.get('balance') }
              discountTotal={ financesStore.get('discount_total') }
              debitTotal={ financesStore.get('debit_total') }
              creditTotal={ financesStore.get('credit_total') } />
          </Form>
          
          <Radiobutton name='frequency' defaultChecked label='Weekly' />
          <Radiobutton name='frequency' label='Monthly' />
          
          
          <Link className="home-link" href='#' disabled>Main Page</Link>

          <UserDialog />

          <Flash onDismiss={ FinancesActions.dismissFlash } message="Save Successful!" open={this.state.financesStore.get('displayFlash')} as="success" />
        </div>

        <Toast as="new" onDismiss={ FinancesActions.dismissToast } open={ this.state.financesStore.get('displayToast') }>
          <strong>New Features</strong><br />
          We have introduced new features, please see the <Link href="https://github.com/Sage/carbon/blob/master/CHANGELOG.md" target="_blank">changelog</Link> for more information.
        </Toast>
      </div>
    );
  }
}

export default connect(Finances, FinancesStore);