import React from 'react';
import { connect } from 'utils/flux';
import Immutable from 'immutable';
import AppStore from './../../../stores/app';
import AppActions from './../../../actions/app';
import Example from './../../../components/example';

import Icon from 'components/icon';
import Dropdown from 'components/dropdown';
import Row from 'components/row';

class IconDemo extends React.Component {
  /**
   * @method value
   */
  value = (key) => {
    return this.state.appStore.getIn(['icon', key]);
  }

  /**
   * @method action
   */
  get action() {
    return AppActions.appValueUpdated.bind(this, 'icon');
  }

  /**
   * @method demo
   */
  get demo() {
    let type = this.value('type')
    return (
      <div className='icon-demo__icon'>
        <Icon type={ type } tooltipMessage="fsdfds" pointerAlign="left" />
      </div>
    );
  }

  /**
   * @method code
   */
  get code() {
    let html = "import Icon from 'carbon/lib/components/icon';\n\n";

    html += `<Icon type='${this.value('type')}'>`;

    return html;
  }

  /**
   * @method controls
   */
  get controls() {
    let options = Immutable.fromJS([
      { name: 'Info 0',           id: 'info' },
      { name: 'Accounts 1',       id: 'accounts' },
      { name: 'Payroll 2',        id: 'payroll' },
      { name: 'Help 3',           id: 'help' },
      { name: 'Settings 4',       id: 'settings' },
      { name: 'Logout 5',         id: 'logout' },
      { name: 'PDF 6',            id: 'pdf' },
      { name: 'CSV 7',            id: 'csv' },
      { name: 'Copy 8',           id: 'copy' },
      { name: 'Error 9',          id: 'error' },
      { name: 'Graph a',          id: 'graph' },
      { name: 'Pound b',          id: 'pound' },
      { name: 'Edit c',           id: 'edit' },
      { name: 'Piggy bank d',     id: 'piggy_bank' },
      { name: 'Person e',         id: 'person' },
      { name: 'Arrow f',          id: 'arrow' },
      { name: 'Search g',         id: 'search' },
      { name: 'Close h',          id: 'close' },
      { name: 'Settings old i',   id: 'settings_old' },
      { name: 'Go j',             id: 'go' },
      { name: 'New k',            id: 'new' },
      { name: 'True_tick l',      id: 'true_tick' },
      { name: 'Old warning m',    id: 'old_warning' },
      { name: 'Question mark n',  id: 'question_mark' },
      { name: 'Admin o',          id: 'admin' },
      { name: 'Messages p',       id: 'messages' },
      { name: 'Edit q',           id: 'edit' },
      { name: 'Print r',          id: 'print' },
      { name: 'Clock s',          id: 'clock' },
      { name: 'Euro 5',           id: 'euro' },
      { name: 'Home u',           id: 'home' },
      { name: 'Cart v',           id: 'cart' },
      { name: 'Hide w',           id: 'hide' },
      { name: 'Question y',       id: 'question' },
      { name: 'Tick z',           id: 'tick' },
      { name: 'Insert_row A',     id: 'insert_row' },
      { name: 'Plus B',           id: 'plus' },
      { name: 'Calendar C',       id: 'calendar' },
      { name: 'Book D',           id: 'book' },
      { name: 'Analysis E',       id: 'analysis' },
      { name: 'People F',         id: 'people' },
      { name: 'Bank G',           id: 'bank' },
      { name: 'Entry H',          id: 'entry' },
      { name: 'Collaborate J',    id: 'collaborate' },
      { name: 'Dropdown K',       id: 'dropdown' },
      { name: 'Add +',            id: 'add' },
      { name: 'Warning',          id: 'warning' },
      { name: 'Maintenance',      id: 'maintenance' },
      { name: 'Sort Up',          id: 'sort-up' },
      { name: 'Sort Down',        id: 'sort-down' },
      { name: 'Refresh',          id: 'refresh' },
      { name: 'Bin',              id: 'bin' },
      { name: 'Basket',           id: 'basket' },
      { name: 'Phone',            id: 'phone' },
      { name: 'Mobile',           id: 'mobile' },
      { name: 'Location',         id: 'location' },
      { name: 'Email',            id: 'email' },
      { name: 'Paperclip',        id: 'paperclip' },
      { name: 'Help',             id: 'help' },
      { name: 'Chevron',          id: 'chevron' },
      { name: 'Information',      id: 'information' },
      { name: 'Sync',             id: 'sync' },
      { name: 'Progress',         id: 'progress' },
      { name: 'Submitted',        id: 'submitted' },
      { name: 'Completed',        id: 'completed' }
    ]);

    return (
      <Dropdown
        label='Type'
        value={ this.value('type') }
        labelInline={ true }
        options={ options }
        onChange={ this.action.bind(this, 'type') }
      />
    );
  }

  /**
   * @method render
   */
  render() {
    return (
      <Example
        title='Icon'
        readme='components/icon'
        demo={ this.demo }
        code={ this.code }
        controls={ this.controls }
      />
    );
  }
}

export default connect(IconDemo, AppStore);
