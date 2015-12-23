import React from 'react';
import { connect } from 'utils/flux';
import Alert from 'components/alert';
import UserActions from './../../../../actions/user';
import UserStore from './../../../../stores/user';

class UserDialog extends React.Component {
  render() {
    return (
      <div>
        <Alert  title="Alert"
                open={ this.state.userStore.get('alertOpen') }
                cancelDialogHandler={ UserActions.userAlertClosed }>
          Danger Will Robinson
        </Alert>
      </div>
    );
  }
}

export default connect(UserDialog, UserStore);
