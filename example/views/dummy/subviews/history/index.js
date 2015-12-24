import React from 'react';
import { connect } from 'utils/flux';
import Row from 'components/row';
import Button from 'components/button';
import FinancesStore from './../../../../stores/finances';
import UserActions from './../../../../actions/user';
import Alert from 'components/alert';
import UserStore from './../../../../stores/user';

class History extends React.Component {
  handleReset = (ev) => {
    ev.preventDefault();
    debugger
    UserActions.userAlertOpened;
    FinancesStore.reset();
  }

  handleUndo = (ev) => {
    ev.preventDefault();
    FinancesStore.undo();
  }


  render() {
    let disabled = FinancesStore.history.length ? false : true;

    return (
      <div className="view-history">
        <Button onClick={ this.handleUndo } disabled={ disabled }>Undo</Button>
        <Button onClick={ this.handleReset } disabled={ disabled }>Reset</Button>

        <Alert  title="Alert"
                open={ this.state.userStore.get('alertOpen') }
                cancelHandler={ UserActions.userAlertClosed }>
                Are you sure you want to reset the page?
        </Alert>
      </div>
    );
  }
}

export default connect(History, UserStore);
