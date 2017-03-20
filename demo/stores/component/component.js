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
global.tableAjaxData = ImmutableHelper.parseJSON([]);

class ComponentStore extends Store {
  [ComponentConstants.UPDATE_DEFINITION](data) {
    let value = data.value;

    if (data.name === 'date-range' && data.prop === 'value') {
      value = JSON.stringify(value);
    }

    this.data = this.data.setIn([data.name, 'propValues', data.prop], value);
    if (data.name === 'dropdown-filter-ajax' && data.visibleValue) {
      this.data = this.data.setIn([data.name, 'propValues', 'visibleValue'], data.visibleValue);
    }

    if (data.name === "table") {
      ComponentActions.updateTable('manual', this.data.getIn(['table', 'propValues']).toJS());
    }
  }

  [ComponentConstants.UPDATE_PAGER_CURRENT_PAGE](action) {
    this.data = this.data.setIn(['pager', 'propValues', 'currentPage'], action.currentPage);
  }

  [ComponentConstants.UPDATE_SIMPLE_COLOR_PICKER_SELECTED](action) {
    this.data = this.data.setIn(['simple-color-picker', 'propValues', 'selectedColor'], action.selected);
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

  [ComponentConstants.UPDATE_TABLE_AJAX](action) {
    let data = ImmutableHelper.parseJSON(action.items);
    this.data = this.data.setIn(['table', 'data'], data);
    this.data = this.data.setIn(['table', 'propValues', 'currentPage'], action.page);
    this.data = this.data.setIn(['table', 'propValues', "totalRecords"], action.records);

    // update the global object
    global.tableAjaxData = data;
  }
}

export default new ComponentStore('componentStore', data, Dispatcher);
