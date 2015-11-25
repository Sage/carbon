import React from 'react';
import { Route } from 'react-router';
import { startRouter } from '../../../lib/utils/router';
import ImmutableHelper from '../../../lib/utils/helpers/immutable';
import DropdownStore from '../stores';
import Actions from '../actions';
import { connect } from '../../../lib/utils/flux';

import DropdownList from '../components/dropdown-list';
import DropdownSuggest from '../../../src/components/dropdown-suggest';
import Textbox from '../../../src/components/textbox';


class MainView extends React.Component {

  render () {
    let displayValue = this.state.dropdownStore.get('selected');
    let data = this.state.dropdownStore;

    return(
      <div>
        <Textbox name='foo' />
        <DropdownList name="list" data={ data } onChange={ Actions.updateValue } value={ displayValue } placeholder='goo'/>
        <DropdownSuggest name="suggest" data={ data } />
      </div>
    )
  }
}

export default connect(MainView, DropdownStore);
