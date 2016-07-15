import Dispatcher from './../dispatcher';
import AppConstants from './../constants/app';
import Store from 'utils/flux/store';
import ImmutableHelper from 'utils/helpers/immutable';
import Immutable from 'immutable';
import FormInputHelper from './../helpers/form-input-helper';

let data = ImmutableHelper.parseJSON({
  alert: {
    size: 'extra-small',
    title: 'Alert!'
  },
  animated_menu_button: {
    alignRight: true,
    size: 'large'
  },
  app_wrapper: {
    body: "This component contains your content within the confines of the width of your application."
  },
  button: {
    text: "Action",
    as: "secondary"
  },
  button_toggle: {
    option_one: "Option One"
  },
  carousel: {
    slideData: [{}, {}]
  },
  checkbox: {
    label: "Checkbox",
    labelHelp: "Example label help.",
    fieldHelp: "Example field help."
  },
  confirm: {
    size: 'extra-small',
    title: 'Are you sure?'
  },
  collapsible_pod: {
    title: 'Hello World!'
  },
  content: {
    title: 'Example Content',
    body: 'This is some example content\nfor the Content component.'
  },
  date: {
    label: "Date",
    labelHelp: "Example label help.",
    fieldHelp: "Example field help."
  },
  decimal: {
    label: "Decimal",
    labelHelp: "Example label help.",
    fieldHelp: "Example field help.",
    precision: 3
  },
  dialog: {
    size: 'medium',
    closeOnESCKey: false,
    showCloseIcon: true,
    closeOnBackgroundClick: false,
    open: false,
    title: 'Hello World!',
    disableBackground: true
  },
  dropdown: {
    label: "Dropdown",
    labelHelp: "Example label help.",
    fieldHelp: "Example field help."
  },
  dialog_full_screen: {
    open: false,
    title: 'Your Header Goes Here',
    disableBackground: true
  },
  flash: {
    as: "warning",
    open: true,
    text: "Sample flash notification."
  },
  form: {
    cancel: true
  },
  heading: {
    title: "Heading Example",
    content: "This is an example of the heading component.",
    help: "This is an example of help text.",
    help_link: "#",
    back_link_href: "#"
  },
  help: {
    message: "This is an example of a help tooltip."
  },
  icon: {
    type: 'info'
  },
  link: {
    text: "Sample Link"
  },
  message: {
    dismissable: true,
    open: true,
    as: "error",
    title: "Lorem ipsum dolor",
    text: "Nullam id dolor id nibh ultricies vehicula ut id elit."
  },
  multi_action_button: {
    text: 'Multi Action Button',
    as: 'secondary'
  },
  multi_step_wizard: {
    currentStep: 1,
    enableInactiveSteps: false,
    completed: false
  },
  number: {
    value: 0
  },
  pill: {
    as: 'new',
    text: 'PILL'
  },
  portrait: {
    size: 'small',
    shape: 'standard',
    email: 'Email',
    initials: 'CB'
  },
  pod: {
    border: true,
    padding: "medium",
    as: "primary"
  },
  profile: {
    name: "Andrew Tait",
    email: "andrew.tait@sage.com"
  },
  radio_button: {
    label: "Radio Button",
    labelHelp: "Example label help.",
    fieldHelp: "Example field help."
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
  sidebar: {
    open: false
  },
  spinner: {
    as: 'info',
    size: 'medium'
  },
  split_button: {
    text: "Main Action"
  },
  text: {
    content: "Example of stylised text content."
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
  textbox: {
    label: "Textbox",
    labelHelp: "Example label help.",
    fieldHelp: "Example field help."
  },
  toast: {
    dismissable: true,
    as: "warning",
    open: true,
    text: "Sample toast notification."
  },
  tooltip: {
    message: 'Some Helpful Content'
  },
  validations: {
    validator: 'presence',
    length: {
      setIs: false,
      min: 0,
      is: 5,
      max: 5
    },
    numeral: {
      integer: false,
      setIs: false,
      min: 0,
      is: 5,
      max: 10
    }
  }
});

class AppStore extends Store {
  /**
   * @method APP_VALUE_UPDATED
   */
  [AppConstants.APP_VALUE_UPDATED](action) {
    let arr = [action.component].concat(action.key);
    this.data = this.data.setIn(arr, action.value);

    if (action.component === 'dropdown_filter_ajax') {
      this.data = this.data.setIn(arr, action.visibleValue);
    }
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
