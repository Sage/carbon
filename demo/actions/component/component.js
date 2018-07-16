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
    const pageSize = opts.pageSize || '10',
        currentPage = opts.currentPage || '1',
        query = opts.filter || {};

    if (opts.sortOrder) { query.sord = opts.sortOrder; }
    if (opts.sortedColumn) { query.sidx = opts.sortedColumn; }
    query.page = currentPage;
    query.rows = pageSize;

    window.Request.get('/countries')
      .query(query)
      .end((err, res) => {
        const data = res.body;
        const rows = data ? data.rows : []
        const records = data ? data.records : 0
        const currentPage = data ? data.current_page : 1

        window.Dispatcher.dispatch({
          actionType: window.ComponentConstants.UPDATE_TABLE,
          items: rows,
          records: String(records),
          sortOrder: opts.sortOrder,
          sortedColumn: opts.sortedColumn,
          page: String(currentPage),
          pageSize
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

  updateDndData: (dragIndex, hoverIndex) => {
    window.Dispatcher.dispatch({
      actionType: window.ComponentConstants.UPDATE_TABLE_DND,
      dragIndex,
      hoverIndex,
    });
  },

  updateConfigurableItemsData: (dragIndex, hoverIndex) => {
    window.Dispatcher.dispatch({
      actionType: window.ComponentConstants.UPDATE_CONFIGURABLE_ITEMS,
      dragIndex,
      hoverIndex,
    });
  },

  updateConfigurableItem: (rowIndex) => {
    window.Dispatcher.dispatch({
      actionType: window.ComponentConstants.UPDATE_CONFIGURABLE_ITEM,
      rowIndex
    });
  },

  resetConfigurableItemsData: () => {
    window.Dispatcher.dispatch({
      actionType: window.ComponentConstants.RESET_CONFIGURABLE_ITEM_DATA
    });
  }
};

// required for dnd demo:
global.updateDndData = ComponentActions.updateDndData;
global.updateConfigurableItemsData = ComponentActions.updateConfigurableItemsData;
global.updateConfigurableItem = ComponentActions.updateConfigurableItem;
global.resetConfigurableItemsData = ComponentActions.resetConfigurableItemsData;

export default ComponentActions;
