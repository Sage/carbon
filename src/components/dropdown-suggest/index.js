import React from 'react';
import Request from 'superagent';
import Input from './../../utils/input';
import InputValidation from './../../utils/input/validation';

class DropdownSuggest extends React.Component {

  /**
   * Define property types
   */
  static propTypes = {
    path: React.PropTypes.string.isRequired
  }

  /**
   * Tracks whether the scroll listener is active on the list.
   *
   * @property listeningToScroll
   * @type {Boolean}
   */
  listeningToScroll = true;

  /**
   * Default state
   */
  state = {
    /**
     * A collection of results for the list.
     *
     * @property options
     * @type {Array}
     */
    options: [],

    /**
     * Defines whether the list is open or not.
     *
     * @property open
     * @type {Boolean}
     */
    open: false,

    /**
     * The current page number for the results.
     *
     * @property page
     * @type {Integer}
     */
    page: 1,

    /**
     * The total number of pages of results.
     *
     * @property pages
     * @type {Integer}
     */
    pages: 0,

    /**
     * The ID of the highlighted item in the list.
     *
     * @property highlighted
     * @type {Integer}
     */
    highlighted: null
  }

  /**
   * Retrieves data from the server for the list.
   *
   * @method getData
   */
  getData = (page = 1) => {
    // Passes empty string to query if value has been selected
    var query = this.get(this.props.value, 'id') ? "" : this.get(this.props.value, this.props.resource_key);

    this.updateList({"items":[{"id":3,"name":"0001 - Assets - Cost","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":4,"name":"0030 - Office equipment and IT - Cost","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":5,"name":"0031 - Office equipment and IT - Accumulated Depreciation","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":6,"name":"0040 - Fixtures and fittings - Cost","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":7,"name":"0041 - Fixtures and fittings - Accumulated Depreciation","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":8,"name":"0050 - Motor Vehicles - Cost","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":9,"name":"0051 - Motor Vehicles - Accumulated Depreciation","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":10,"name":"1000 - Stock","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":11,"name":"1100 - Trade Debtors","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":12,"name":"1101 - Provision for doubtful debtors","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":13,"name":"1110 - Prepayments","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":1,"name":"1200 - Current","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":2,"name":"1210 - Cash in Hand","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":14,"name":"2100 - Trade Creditors","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":15,"name":"2101 - Accruals","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":19,"name":"2150 - Corporation Tax Liability","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":18,"name":"2200 - VAT on Sales","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":17,"name":"2201 - VAT on Purchases","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":16,"name":"2202 - VAT Liability","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":61,"name":"2203 - VAT Allocations & Adjustments","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":45,"name":"2205 - VAT on Sales - Holding Account","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":46,"name":"2206 - VAT on Purchases - Holding Account","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":47,"name":"2210 - PAYE","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":20,"name":"2211 - Other taxes to pay to HMRC","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":52,"name":"2214 - Student Loan","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":53,"name":"2215 - Attachments","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":48,"name":"2220 - Net Wages","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":54,"name":"2230 - Pension","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":21,"name":"3000 - Share capital","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":22,"name":"3100 - Profit and Loss Account","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":23,"name":"3200 - Capital introduced","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":24,"name":"3260 - Drawings - equity","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":25,"name":"4000 - Sales Type A","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":62,"name":"4009 - Sales Discounts","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":63,"name":"4200 - Sale of Assets","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":64,"name":"4400 - Late Payment Charges","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":26,"name":"4900 - Other income","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":65,"name":"4905 - Carriage on Sales","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":27,"name":"5000 - Cost of sales - goods","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":66,"name":"5009 - Purchase Discounts","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":28,"name":"5010 - Cost of sales - materials","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":29,"name":"5015 - Cost of sales - delivery","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":67,"name":"5100 - Carriage on Purchases","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":31,"name":"6200 - Marketing","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":32,"name":"7000 - Employee costs","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":49,"name":"7006 - Employers NI","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":55,"name":"7007 - Employer's Pension","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":56,"name":"7009 - Other Deductions","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":57,"name":"7010 - Statutory Sick Pay","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":58,"name":"7011 - Statutory Maternity Pay","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":59,"name":"7012 - Statutory Paternity Pay","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":60,"name":"7013 - Statutory Adoption Pay","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":33,"name":"7100 - Rent and rates","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":34,"name":"7200 - Gas and electric","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":35,"name":"7300 - Motor Expenses","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":36,"name":"7400 - Travel and Entertainment","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":51,"name":"7500 - Office costs","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":37,"name":"7600 - Legal and Professional","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":38,"name":"7610 - Insurance","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":50,"name":"7800 - Repairs and renewals","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":39,"name":"7900 - Bank charges and interest","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":40,"name":"8000 - Depreciation","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":41,"name":"8100 - Bad Debts","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":42,"name":"8200 - General Expenses","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":43,"name":"8211 - Exchange rate gain/(loss)","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":30,"name":"8900 - Dividend cost","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":68,"name":"9998 - Opening Balances Control Account","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"},{"id":44,"name":"9999 - Corrections","resource":"fuji_core_accounting/ledger_account","resource_name":"Ledger Account"
    }]});
  }

  /**
   * Sets or appends the list with new data and causes a setState.
   *
   * @method updateList
   */
  updateList = (data) => {
    var pages = Math.ceil(data.records / 10);

    if (data.page > 1) {
      var records = this.state.options.concat(data.items);
    } else {
      var records = data.items;
      this.resetScroll();
    }

    this.listeningToScroll = true;

    var highlighted = data.records ? records[0].id : null;

    this.setState({
      options: records,
      open: true,
      pages: pages,
      page: data.page,
      highlighted: highlighted
    });
  }

  /**
   * Asks for the next page of data.
   *
   * @method getNextPage
   */
  getNextPage = () => {
    if (this.state.page < this.state.pages) {
      this.getData(this.state.page + 1);
    }
  }

  /**
   * Handles what happens on blur of the input.
   *
   * @method handleBlur
   */
  handleBlur = (ev) => {
    this.resetScroll();
    this.setState({ open: false });
  }

  /**
   * Handles what happens on focus of the input.
   *
   * @method handleFocus
   */
  handleFocus = () => {
    var filter = this.refs.filter;

    setTimeout(() => {
      filter.setSelectionRange(0, 9999);
    }, 0);

    if (this.get(this.props.value, 'id') || !this.state.options.length) {
      this.getData();
    } else {
      this.setState({ open: true });
    }
  }

  /**
   * Handles what happens on scroll of the list.
   *
   * @method handleScroll
   */
  handleScroll = () => {
    if (this.listeningToScroll) {
      if (this.state.page < this.state.pages) {
        var list = this.refs.list;
        var scrollTriggerPosition = list.scrollHeight - list.offsetHeight - 20;

        if (list.scrollTop > scrollTriggerPosition) {
          this.listeningToScroll = false;
          this.getNextPage();
        }
      }
    }
  }

  /**
   * Handles what happens on change of the input.
   *
   * @method handleChange
   */
  handleChange = (ev) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    var target = { textContent: ev.target.value, value: null };
    this.emitOnChangeCallback(target)

    this.timeout = setTimeout(() => {
      this.getData(1);
    }, 200);
  }

  /**
   * Handles a select action on a list item.
   *
   * @method handleSelect
   */
  handleSelect = (ev) => {
    this.emitOnChangeCallback(ev.target);
  }

  /**
   * Handles a mouse over event for list items.
   *
   * @method handleMouseOver
   */
  handleMouseOver = (ev) => {
    this.setState({
      highlighted: ev.target.value
    });
  }

  /**
   * Handles when a user keys up on input.
   *
   * @method handleKeyUp
   */
  handleKeyDown = (ev) => {
    var list = this.refs.list,
        element = list.getElementsByClassName('highlighted')[0];

    switch(ev.which) {
      case 13: // return
        if (element) {
          this.setState({ open: false });
          this.emitOnChangeCallback(element)
        }
        break;
      case 38: // up arrow
        var nextVal = list.lastChild.value;

        if (element && element.previousElementSibling) {
          nextVal = element.previousElementSibling.value;
        }

        this.setState({ highlighted: nextVal });
        break;
      case 40: // down arrow
        var nextVal = list.firstChild.value;

        if (element && element.nextElementSibling) {
          nextVal = element.nextElementSibling.value;
        }

        this.setState({ highlighted: nextVal });
        break;
    }
  }

  /**
   * Runs the callback onChange action
   *
   * @method emitOnChangeCallback
   * @param [target] input selected 
   */
  emitOnChangeCallback = (target) => {
    this.props.onChange({ target: target } , this.props);
  }


  /**
   * Resets the scroll position of the list.
   *
   * @method resetScroll
   */
  resetScroll = () => {
    this.listeningToScroll = false;
    var list = this.refs.list;
    list.scrollTop = 0;
  }

  /**
   * Sets props for input fieild.
   *
   * @method inputProps 
   */
  inputProps = (inputProps) => {
    var { ...inputProps } = this.props;

    inputProps.onFocus = this.handleFocus;
    inputProps.onBlur = this.handleBlur;
    inputProps.onChange = this.handleChange;
    inputProps.onKeyDown = this.handleKeyDown;

    inputProps.value = this.get(this.props.value, this.props.resource_key);
    
    return inputProps;
  }

  /**
   * Gets props for selected option id.
   *
   * @method hiddenFieldProps 
   */
  hiddenFieldProps = () => {
    var props = {};

    if (this.props.value) {
      props.value = this.get(this.props.value, 'id');
    }

    return props;
  }


  isImmutable = (data) => {
    return typeof data.get === 'function';
  }

  get = (data, key) => {
    if (this.isImmutable(data)) {
      return data.get(key);
    } else {
      return data[key];
    }
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    if (this.state.options.length) {
      var results = this.state.options.map((option) => {
        return <li
                  key={option.name + option.id}
                  value={option.id}
                  onMouseDown={this.handleSelect}
                  onMouseOver={this.handleMouseOver}
                  className={(this.state.highlighted == option.id) ? 'highlighted' : ''}
                >{option.name}</li>;
      });
    } else {
      var results = <li>No results</li>;
    }

    var mainClasses = 'ui-dropdown-suggest' +
        this.props.input.mainClasses() +
        this.props.validation.mainClasses();

    var inputClasses = "ui-dropdown-suggest__input" +
        this.props.input.inputClasses() +
        this.props.validation.inputClasses();

    var listClasses = "ui-dropdown-suggest__list" + 
        (this.state.open ? '' : ' hidden');

    return (
      <div className={ mainClasses } >

        <input
          className={ inputClasses }
          ref="filter"
          { ...this.inputProps() }
        />

        <input
          ref="input"
          readOnly="true"
          hidden="true"
          { ...this.hiddenFieldProps() }
        />

        <ul
          ref="list"
          className={ listClasses }
          onScroll={ this.handleScroll }
        >
          {results}
        </ul>
      </div>
    );
  }
}

export default InputValidation(Input(DropdownSuggest))
