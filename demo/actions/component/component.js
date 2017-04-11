import Dispatcher from './../../dispatcher';
import ComponentConstants from '../../constants/component';
import Request from 'superagent';
import serialize from 'utils/helpers/serialize';
import Browser from 'utils/helpers/browser';

const ComponentActions = {
  /**
   * Updates the prop values loaded from the definition.
   * Use window in this action as it is evaluated code.
   */
  updateDefinition: (name, prop, ev) => {
    let value, visibleValue;

    if (name === 'date-range' && prop === 'value') {
      value = ev;
    } else {
      value = ev.target.value;
      visibleValue = ev.target.visibleValue;
    }

    window.Dispatcher.dispatch({
      actionType: window.ComponentConstants.UPDATE_DEFINITION,
      name,
      prop,
      value,
      visibleValue
    });
  },

  updatePagerCurrentPage: (ev) => {
    window.Dispatcher.dispatch({
      actionType: window.ComponentConstants.UPDATE_PAGER_CURRENT_PAGE,
      currentPage: ev
    });
  },

  updateSimpleColorPickerSelected: (ev) => {
    window.Dispatcher.dispatch({
      actionType: window.ComponentConstants.UPDATE_SIMPLE_COLOR_PICKER_SELECTED,
      selected: ev.target.value
    });
  },

  updateTable: (actionType, opts = {}) => {
    let pageSize = opts.pageSize || "10",
        currentPage = opts.currentPage || "1",
        query = opts.filter || {};

    if (opts.sortOrder) { query.sord = opts.sortOrder; }
    if (opts.sortedColumn) { query.sidx = opts.sortedColumn; }
    query.page = currentPage;
    query.rows = pageSize;

    window.Request.get('/countries')
      .query(query)
      .end((err, res) => {
        let data = res.body;

        window.Dispatcher.dispatch({
          actionType: window.ComponentConstants.UPDATE_TABLE,
          items: data.rows,
          records: String(data.records),
          sortOrder: opts.sortOrder,
          sortedColumn: opts.sortedColumn,
          page: String(data.current_page),
          pageSize: pageSize
        });
      });
  },

  updateTableAjax: (data) => {
    window.Dispatcher.dispatch({
      actionType: window.ComponentConstants.UPDATE_TABLE_AJAX,
      items: data.rows,
      records: String(data.records),
      page: String(data.current_page)
    });
  },

  resetOptionsUrl: (data) => {
    window.Dispatcher.dispatch({
      actionType: window.ComponentConstants.RESET_OPTIONS_URL
    });
  },

  generateOptionsUrl: (componentName, componentOptions) => {
    let options = btoa(JSON.stringify({ [componentName]: componentOptions.toJS() }));
    let basePath = Browser.getLocation().origin + Browser.getLocation().pathname;

    let url = `${ basePath }?options=${ options }`;
    window.Dispatcher.dispatch({
      actionType: window.ComponentConstants.SET_OPTIONS_URL,
      url: url
    });
  },
};

export default ComponentActions;
