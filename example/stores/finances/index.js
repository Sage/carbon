import Dispatcher from './../../dispatcher';
import FinancesConstants from './../../constants/finances';
import Store from 'utils/flux/store';
import Immutable from 'immutable';
import ImmutableHelper from 'utils/helpers/immutable';
import BigNumber from 'bignumber.js';

// Hard code some initial data for the store
const data = ImmutableHelper.parseJSON({
  date_from: "2015-11-01",
  name: "My Finances",
  frequency: "",
  discount: false,
  displayFlash: false,
  displayToast: true,
  country: {
    id: 218,
    name: 'United Kingdom'
  },
  chart_data: [
    {
      y: 0,
      name: 'Credit',
      label: '£',
      tooltip: 'this is how much you have!'
    },
    {
      y: 0,
      name: 'Discount',
      label: '£',
      tooltip: 'this is how much discount you get!',
      color: '#FFAB00',
      visible: false
    },
    {
      y: 0,
      name: 'Debit',
      label: '£',
      tooltip: 'this is how much you owe!',
      color: '#EA433F'
    }
  ],
  line_items: [
    {
      description: "This is my first item.",
      debit: "120.99",
      credit: "32.99",
      total: "-88.00"
    },
    {
      description: "This is my second item.",
      debit: "83.21",
      credit: "2.00",
      total: "-81.21"
    }
  ],
  options: [
    {
      id: 1,
      name: 'Cash'
    },
    {
      id: 2,
      name: 'Debit'
    },
    {
      id: 3,
      name: 'Current'
    },
    {
      id: 4,
      name: 'ISA'
    },
    {
      id: 5,
      name: 'Line of Credit'
    },
    {
      id: 6,
      name: 'Pension'
    },
    {
      id: 7,
      name: 'Saver Plus'
    },
    {
      id: 8,
      name: 'Savings'
    }
  ]
});

class FinancesStore extends Store {
  constructor(name, data, Dispatcher, opts = {}) {
    super(name, data, Dispatcher, opts);

    // setup some initial calculated data for this store
    this.data = updateTotals(this.data, 'credit');
    this.data = updateTotals(this.data, 'debit');
    if (this.data.get('discount')) { this.data = updateTotals(this.data, 'discount'); }
    this.data = updateChartData(this.data);
    this.data = updateBalance(this.data);
  }

  /**
   * Subscribe this store to the following actions...
   */

  [FinancesConstants.FINANCES_VALUE_UPDATED](action) {
    // update this value in the store
    this.data = this.data.set(action.name, action.value);

    // update other data affected by this change
    if (action.name == 'discount') {
      this.data = updateTotals(this.data, 'credit');
      this.data = updateTotals(this.data, 'debit');
      this.data = updateTotals(this.data, 'discount');
      this.data = updateChartData(this.data);
      this.data = updateBalance(this.data);
    }
  }

  [FinancesConstants.FINANCES_COUNTRY_UPDATED](action) {
    this.data = this.data.setIn(['country', 'id'], action.value);
    this.data = this.data.setIn(['country', 'name'], action.visibleValue);
  }

  [FinancesConstants.FINANCES_BEFORE_SAVE](action) {
    this.data = this.data.set('isSaving', true);
  }

  [FinancesConstants.FINANCES_SAVE](action) {
    if (this.data.get('name') === 'error') {
      this.data = this.data.set('success', true);
    } else {
      this.data = this.data.set('isSaving', false);
      this.data = this.data.set('success', false);
    }
  }

  [FinancesConstants.FINANCES_LINE_ITEM_UPDATED](action) {
    // update this value in the store
    this.data = this.data.setIn(['line_items', action.index, action.name], action.value);

    // update other data affected by this change
    let name = action.name;
    if (name == 'credit' || name == 'debit' || name == 'discount') {
      this.data = updateTotals(this.data, name);
      this.data = updateChartData(this.data);
      this.data = updateBalance(this.data);
    }
  }

  [FinancesConstants.FINANCES_LINE_ITEM_DELETED](action) {
    // update this value in the store
    this.data = this.data.deleteIn(['line_items', action.index]);

    // update other data affected by this change
    this.data = updateTotals(this.data, 'credit');
    this.data = updateTotals(this.data, 'debit');
    if (this.data.get('discount')) { this.data = updateTotals(this.data, 'discount'); }
    this.data = updateChartData(this.data);
    this.data = updateBalance(this.data);
  }

  [FinancesConstants.FLASH_OPENED](action) {
    this.data = this.data.set('displayFlash', true);
  }

  [FinancesConstants.FLASH_CLOSED](action) {
    this.data = this.data.set('displayFlash', false);
  }

  [FinancesConstants.TOAST_CLOSED](action) {
    this.data = this.data.set('displayToast', false);
  }
}

/**
 * Private methods to mutate data...
 */

/**
 * Calculates the total balance
 */
function updateBalance(data) {
  let debitTotal = new BigNumber(data.get('debit_total'));
  let creditTotal = new BigNumber(data.get('credit_total'));
  let balance = creditTotal.minus(debitTotal);
  if (data.get('discount')) {
    let discountTotal = new BigNumber(data.get('discount_total'));
    balance = balance.plus(discountTotal);
  }
  return data.set('balance', balance.toFixed(2));
};

/**
 * Calculates the data to be used in the chart
 */
function updateChartData(data) {
  data = data.setIn(['chart_data', 0, 'y'], getPercentage(data, data.get('credit_total')).toNumber());
  data = data.setIn(['chart_data', 0, 'label'], '£' + data.get('credit_total'));
  data = data.setIn(['chart_data', 2, 'y'], getPercentage(data, data.get('debit_total')).toNumber());
  data = data.setIn(['chart_data', 2, 'label'], '£' + data.get('debit_total'));

  if (data.get('discount')) {
    data = data.setIn(['chart_data', 1, 'y'], getPercentage(data, data.get('discount_total')).toNumber());
    data = data.setIn(['chart_data', 1, 'label'], '£' + data.get('discount_total'));
    data = data.setIn(['chart_data', 1, 'visible'], true)
  } else {
    data = data.setIn(['chart_data', 1, 'visible'], false)
  }

  return data;
};

/**
 * Updates the totals
 */
function updateTotals(data, name) {
  let total = new BigNumber('0.00');

  data.get('line_items').forEach((line, index) => {
    if (line.get(name)) {
      let c = line.get('credit') ? line.get('credit') : "0.00";
      let d = line.get('debit') ? line.get('debit') : "0.00";
      let credit = new BigNumber(c);
      let debit = new BigNumber(d);
      let lineTotal = credit.minus(debit);

      if (data.get('discount')) {
        let d = line.get('discount') ? line.get('discount') : "0.00";
        let discount = new BigNumber(d);
        lineTotal = lineTotal.plus(discount);
      }

      data = data.setIn(['line_items', index, 'total'], lineTotal.toFixed(2));

      total = total.plus(line.get(name));
    }
  });

  return data.set(name + '_total', total.toFixed(2));
};

/**
 * Returns a percentage for the credit and debit totals
 */
function getPercentage(data, val) {
  let value = new BigNumber(val);
  let debitTotal = new BigNumber(data.get('debit_total'));
  let creditTotal = new BigNumber(data.get('credit_total'));
  let total = debitTotal.plus(creditTotal);
  if (data.get('discount')) {
    let discountTotal = new BigNumber(data.get('discount_total'));
    total = total.plus(discountTotal);
  }
  return value.dividedBy(total).times(100);
};

// init the store with a name, data, dispatcher and enabled history
export default new FinancesStore('financesStore', data, Dispatcher, { history: true });
