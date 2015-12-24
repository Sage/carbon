import React from 'react';
import { connect } from 'utils/flux';
import Dialog from 'components/dialog';
import Row from 'components/row';
import Form from 'components/form';
import Textbox from 'components/textbox';
import Date from 'components/date';
import Textarea from 'components/textarea';
import UserActions from './../../../../actions/user';
import UserStore from './../../../../stores/user';

class UserDialog extends React.Component {
  render() {
    return (
      <Dialog
        title="Edit My Details"
        open={ this.state.userStore.get('dialogOpen') }
        cancelHandler={ UserActions.userDialogClosed }>

        <Form model="contact">
          <Row>
            <Textbox
              name="name"
              onChange={ UserActions.userValueUpdated }
              value={ this.state.userStore.get('name') } />

            <Date
              name="date_of_birth"
              onChange={ UserActions.userValueUpdated }
              value={ this.state.userStore.get('date_of_birth') } />
          </Row>

          <Row>
            <Textarea
              name="address"
              rows="4"
              onChange={ UserActions.userValueUpdated }
              value={ this.state.userStore.get('address') } />
          </Row>
        </Form>

      </Dialog>
    );
  }
}

export default connect(UserDialog, UserStore);
