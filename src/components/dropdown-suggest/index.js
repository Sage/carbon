import React from 'react';
import Request from 'superagent';

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

    Request
      .get(this.props.path)
      .query({
        page: page,
        rows: 10,
        value: query
      })
      .end((err, response) => {
        this.updateList(response.body.data[0]);
      });
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
    var containerCSS = {
      display: 'inline-block'
    };

    var listCSS = {
      height: '100px',
      overflowY: 'scroll'
    };

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

    return (
      <div className="ui-dropdown-suggest" style={containerCSS}>

        <input
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
          style={listCSS}
          className={this.state.open ? '' : 'hidden'}
          onScroll={this.handleScroll}
        >
          {results}
        </ul>
      </div>
    );
  }
}

export default DropdownSuggest
