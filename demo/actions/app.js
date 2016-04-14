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

  appTableCellUpdated: (index, key, component, event) => {
    console.log(event.target.value);
    Dispatcher.dispatch({
      actionType: AppConstants.APP_TABLE_CELL_VALUE_UPDATED,
      component: component,
      index: index,
      value: event.target.value,
      key: key
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
  }
};

export default AppActions;
