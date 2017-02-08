import Dispatcher from './../../dispatcher';
import ComponentConstants from '../../constants/component';
import Request from 'superagent';
import serialize from 'utils/helpers/serialize';

const ComponentActions = {
  /**
   * Updates the prop values loaded from the definition.
   * Use window in this action as it is evaluated code.
   */
  updateDefinition: (name, prop, ev) => {
    window.Dispatcher.dispatch({
      actionType: window.ComponentConstants.UPDATE_DEFINITION,
      name,
      prop,
      value: ev.target.value
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
  }
};

export default ComponentActions;
