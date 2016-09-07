import Dispatcher from './../dispatcher';
import AppConstants from './../constants/app';
import Request from 'superagent';
import serialize from 'utils/helpers/serialize';

let AppActions = {
  /**
   * @method appValueUpdated
   */
  appValueUpdated: (component, key, ev) => {
    Dispatcher.dispatch({
      actionType: AppConstants.APP_VALUE_UPDATED,
      value: ev.target.value,
      visibleValue: ev.target.visibleValue,
      key: key,
      component: component
    });
  },

  /**
   * @method appDeleteRow
   */
  appDeleteRow: (key, ev) => {
    Dispatcher.dispatch({
      actionType: AppConstants.APP_DELETE_ROW,
      key: key
    });
  },

  /**
   * @method appTableUpdated
   */
  appTableUpdated: (component, data) => {
    Dispatcher.dispatch({
      actionType: AppConstants.APP_TABLE_UPDATED,
      items: data.rows,
      component: component
    });
  },

  /**
   * @method appTableUpdated
   */
  appTableManuallyUpdated: (component, change, opts={}) => {
    let pageSize = opts.pageSize || "10",
        currentPage = opts.currentPage || "1",
        query = opts.filter || {};

    if (opts.sortOrder) { query.sord = opts.sortOrder; }
    if (opts.sortedColumn) { query.sidx = opts.sortedColumn; }
    query.page = currentPage;
    query.rows = pageSize;

    Request
      .get("/countries")
      .query(serialize(query))
      .end((err, response) => {
        let data = response.body;

        if (!err) {
          Dispatcher.dispatch({
            actionType: AppConstants.APP_TABLE_MANUALLY_UPDATED,
            items: data.rows,
            records: String(data.records),
            sortOrder: opts.sortOrder,
            sortedColumn: opts.sortedColumn,
            page: String(data.current_page),
            pageSize: pageSize,
            component: component
          });
        }
      });
  },

  editContent: (component) => {
    Dispatcher.dispatch({
      actionType: AppConstants.APP_EDIT_CONTENT,
      component: component
    });
  },

  saveEditedContent: (component) => {
    Dispatcher.dispatch({
      actionType: AppConstants.APP_SAVE_EDITED_CONTENT,
      component: component
    });
  }
};

export default AppActions;
