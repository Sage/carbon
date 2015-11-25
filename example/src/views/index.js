import React from 'react';
import { Route } from 'react-router';
import { startRouter } from '../../../lib/utils/router';
import ImmutableHelper from '../../../lib/utils/helpers/immutable';
import DropdownStore from '../stores';
import Actions from '../actions';
import { connect } from '../../../lib/utils/flux';

import DropdownList from '../../../lib/components/dropdown-list';
import DropdownSuggest from '../../../lib/components/dropdown-suggest';
import Textbox from '../../../lib/components/textbox';


class MainView extends React.Component {

  render () {
    let displayValue = this.state.dropdownStore.get('name');
    let items =  this.state.dropdownStore;

    return(
      <div>
        <Textbox name='foo' />
        <DropdownList name="list" data={ items.toJS() } onChange={ Actions.updateValue } value={displayValue}/>
        <DropdownSuggest name="suggest" data={ items } />
      </div>
    )
  }
}

export default connect(MainView, DropdownStore);
