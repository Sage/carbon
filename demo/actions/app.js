import Dispatcher from './../dispatcher';
import AppConstants from './../constants/app';
import Request from 'superagent';

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
      items: data.items,
      component: component
    });
  },

  /**
   * @method appTableUpdated
   */
  appTableManuallyUpdated: (component, change, opts={}) => {
    let pageSize = opts.pageSize || "10";

    Request
      .get("/countries")
      .query({
        page: opts.currentPage || "1",
        value: '',
        rows: pageSize
      })
      .end((err, response) => {
        let data = response.body.data[0];

        if (!err) {
          Dispatcher.dispatch({
            actionType: AppConstants.APP_TABLE_MANUALLY_UPDATED,
            items: data.items,
            records: String(data.records),
            page: String(data.page),
            pageSize: pageSize,
            component: component
          });
        }
      });
  }
};

export default AppActions;
