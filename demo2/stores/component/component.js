// Carbon
import Dispatcher from '../../dispatcher';
import Store from 'utils/flux/store';
import ImmutableHelper from 'utils/helpers/immutable';

// Flux
import ComponentActions from './../../actions/component';
import ComponentConstants from './../../constants/component';

import definitions from './../../definitions';

let data = ImmutableHelper.parseJSON(definitions);

// expose tableData for the table component demo
global.tableData = ImmutableHelper.parseJSON([]);

class ComponentStore extends Store {
  [ComponentConstants.UPDATE_DEFINITION](data) {
    this.data = this.data.setIn([data.name, 'propValues', data.prop], data.value);

    if (data.name === "table") {
      ComponentActions.updateTable('manual', this.data.getIn(['table', 'propValues']).toJS());
    }
  }

  [ComponentConstants.UPDATE_TABLE](action) {
    let data = ImmutableHelper.parseJSON(action.items);
    this.data = this.data.setIn(['table', 'data'], data);
    this.data = this.data.setIn(['table', 'propValues', 'currentPage'], action.page);
    this.data = this.data.setIn(['table', 'propValues', "totalRecords"], action.records);
    this.data = this.data.setIn(['table', 'propValues', "pageSize"], action.pageSize);
    if (action.sortOrder) { this.data = this.data.setIn(['table', 'propValues', "sortOrder"], action.sortOrder); }
    if (action.sortedColumn) { this.data = this.data.setIn(['table', 'propValues', "sortedColumn"], action.sortedColumn); }

    // update the global object
    global.tableData = data;
  }
}

export default new ComponentStore('componentStore', data, Dispatcher);
