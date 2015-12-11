import Dispatcher from './../../dispatcher';
import FinancesConstants from './../../constants/finances';
import Immutable from 'immutable';

let FinancesActions = {
  financesValueUpdated: (ev, props) => {
    Dispatcher.dispatch({
      actionType: FinancesConstants.FINANCES_VALUE_UPDATED,
      value: ev.target.value,
      name: props.name
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
  }
};

export default FinancesActions;
