import Dispatcher from './../dispatcher';
import AppConstants from './../constants/app';
import Store from 'utils/flux/store';
import ImmutableHelper from 'utils/helpers/immutable';
import Immutable from 'immutable';
import FormInputHelper from './../helpers/form-input-helper';

let data = ImmutableHelper.parseJSON({
  button: {
    text: "Action"
  },
  collapsible_pod: {
    title: 'Hello World!'
  },
  content: {
    title: 'Example Content',
    body: 'This is some example content\nfor the Content component.'
  },
  dialog: {
    open: false,
    title: 'Hello World!',
    disableBackground: true
  },
  flash: {
    as: "warning",
    open: true,
    text: "Sample flash notification."
  },
  icon: {
    type: 'info'
  },
  link: {
    text: "Sample Link"
  },
  message: {
    as: "error",
    title: "Lorem ipsum dolor",
    text: "Nullam id dolor id nibh ultricies vehicula ut id elit."
  },
  pill: {
    as: 'new',
    text: 'PILL'
  },
  portrait: {
    size: 'lmed',
    shape: 'standard',
    email: 'Email'
  },
  pod: {
    border: true,
    padding: "medium",
    as: "primary"
  },
  radio_button: {
    columnData: [
      { name: 'access', value: 'full', label: 'Full Access'},
      { name: 'access', value: 'limited', label: 'Limited Access'},
      { name: 'access', value: 'no-access', label: 'No Access'}
    ]
  },
  rainbow: {
    data: [{
      y: "50",
      name: "First Bit",
      label: "bit 1!",
      tooltip: "more info about the first bit"
    }, {
      y: "50",
      name: "Second Bit",
      label: "bit 2!",
      tooltip: "more info about the second bit"
    }],
    title: "A Rainbow Chart"
  },
  row: {
    columnData: [{}, {}, {}, {}]
  },
  spinner: {
    as: 'info',
    size: 'lmed'
  },
  split_button: {
    text: "Main Action"
  },
  table: {
    current_page: "1",
    data: [],
    filter: {},
    paginate: false,
    page_size: "10",
    show_page_size_selection: false,
    sort_order: "asc",
    sorted_column: "name",
    total_records: "0"
  },
  table_ajax: {
    data: [],
    enable_filter: true,
    filter: {
      name: "ar"
    },
    paginate: true,
    page_size: "10",
    show_page_size_selection: false,
    sortable: true
  },
  tabs: {
    tabData: [{}, {}]
  },
  toast: {
    as: "warning",
    open: true,
    text: "Sample toast notification."
  }
});

class AppStore extends Store {
  /**
   * @method APP_VALUE_UPDATED
   */
  [AppConstants.APP_VALUE_UPDATED](action) {
    let arr = [action.component].concat(action.key);
    this.data = this.data.setIn(arr, action.value);
  }

  /**
   * @method APP_DELETE_ROW
   */
  [AppConstants.APP_DELETE_ROW](action) {
    this.data = this.data.deleteIn(action.key);
  }

  /**
   * @method APP_TABLE_UPDATED
   */
  [AppConstants.APP_TABLE_UPDATED](action) {
    let data = ImmutableHelper.parseJSON(action.items);
    this.data = this.data.setIn([action.component, "data"], data);
  }

  /**
   * @method APP_TABLE_MANUALLY_UPDATED
   */
  [AppConstants.APP_TABLE_MANUALLY_UPDATED](action) {
    let data = ImmutableHelper.parseJSON(action.items);
    this.data = this.data.setIn([action.component, "data"], data);
    this.data = this.data.setIn([action.component, "current_page"], action.page);
    this.data = this.data.setIn([action.component, "total_records"], action.records);
    this.data = this.data.setIn([action.component, "page_size"], action.pageSize);
    if (action.sortOrder) { this.data = this.data.setIn([action.component, "sort_order"], action.sortOrder); }
    if (action.sortedColumn) { this.data = this.data.setIn([action.component, "sorted_column"], action.sortedColumn); }
  }
}

export default new AppStore('appStore', data, Dispatcher);
