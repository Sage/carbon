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

  financesLineItemUpdated: (index, ev, props) => {
    Dispatcher.dispatch({
      actionType: FinancesConstants.FINANCES_LINE_ITEM_UPDATED,
      value: ev.target.value,
      name: props.name,
      index: index
    });
  },

  financesLineItemDeleted: (index, ev, props) => {
    Dispatcher.dispatch({
      actionType: FinancesConstants.FINANCES_LINE_ITEM_DELETED,
      index: index
    });
  },

  beforeSave: (ev, props) => {
    Dispatcher.dispatch({
      actionType: FinancesConstants.FINANCES_BEFORE_SAVE
    });
  },

  financesFlashOpened: (ev, props) => {
    Dispatcher.dispatch({
      actionType: FinancesConstants.FLASH_OPENED
    });
  },

  dismissFlash: (ev, props) => {
    Dispatcher.dispatch({
      actionType: FinancesConstants.FLASH_CLOSED
    });
  },

  dismissToast: (ev, props) => {
    Dispatcher.dispatch({
      actionType: FinancesConstants.TOAST_CLOSED
    });
  },

  financesSave: (ev, props) => {
    setTimeout(() => {
      Dispatcher.dispatch({
        actionType: FinancesConstants.FINANCES_SAVE
      });
    }, 3000);
  }
};

export default FinancesActions;
