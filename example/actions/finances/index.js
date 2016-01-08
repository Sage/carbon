import Dispatcher from './../../dispatcher';
import FinancesConstants from './../../constants/finances';

let FinancesActions = {
  financesValueUpdated: (ev, props) => {
    Dispatcher.dispatch({
      actionType: FinancesConstants.FINANCES_VALUE_UPDATED,
      value: ev.target.value,
      name: props.name
    });
  },

  financesCountryUpdated: (data, props) => {
    Dispatcher.dispatch({
      actionType: FinancesConstants.FINANCES_COUNTRY_UPDATED,
      value: data.target.value,
      visibleValue: data.target.visibleValue
    });
  },

  financesLineItemUpdated: (ev, props) => {
    Dispatcher.dispatch({
      actionType: FinancesConstants.FINANCES_LINE_ITEM_UPDATED,
      value: ev.target.value,
      name: props.name,
      row_id: props.row_id
    });
  },

  financesLineItemDeleted: (ev, props) => {
    Dispatcher.dispatch({
      actionType: FinancesConstants.FINANCES_LINE_ITEM_DELETED,
      row_id: props.row_id
    });
  },

  financesSave: (ev, props) => {
    Dispatcher.dispatch({
      actionType: FinancesConstants.FINANCES_SAVE
    });
  }
};

export default FinancesActions;
