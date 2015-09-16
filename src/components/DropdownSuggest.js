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
  listeningToScroll = true

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
     * The filter applied to the results.
     *
     * @property filter
     * @type {String}
     */
    filter: "",

    /**
     * The currently selected item.
     *
     * @property value
     * @type {Integer}
     */
    value: null,

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
    Request
      .get(this.props.path)
      .query({
        page: page,
        rows: 10,
        value: this.state.filter
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

    this.setState({
      options: records,
      open: true,
      pages: pages,
      page: data.page,
      highlighted: records[0].id
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
    var filter = this.refs.filter.getDOMNode();

    setTimeout(() => {
      filter.setSelectionRange(0, 9999);
    }, 0);

    if (!this.state.options.length) {
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
  handleScroll = (ev) => {
    if (this.listeningToScroll) {
      if (this.state.page < this.state.pages) {
        var list = this.refs.list.getDOMNode();
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

    this.setState({ filter: ev.target.value });

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
    this.setState({
      value: ev.target.value,
      filter: ev.target.textContent
    });
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
    var list = this.refs.list.getDOMNode(),
        element = list.getElementsByClassName('highlighted')[0];

    switch(ev.which) {
      case 13:
        // return
        this.setState({
          value: element.value,
          filter: element.textContent,
          open: false
        });
        break;
      case 38:
        // up arrow
        var nextVal = list.lastChild.value;

        if (element && element.previousElementSibling) {
          nextVal = element.previousElementSibling.value;
        }

        this.setState({ highlighted: nextVal });
        break;
      case 40:
        // down arrow
        var nextVal = list.firstChild.value;

        if (element && element.nextElementSibling) {
          nextVal = element.nextElementSibling.value;
        }

        this.setState({ highlighted: nextVal });
        break;
    }
  }

  /**
   * Resets the scroll position of the list.
   *
   * @method resetScroll
   */
  resetScroll = () => {
    var list = this.refs.list.getDOMNode();
    list.scrollTop = 0;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render = () => {
    var containerCSS = {
      display: 'inline-block'
    };

    var listCSS = {
      height: '100px',
      overflowY: 'scroll'
    };

    var options = this.state.options.map((option) => {
      return <li
                value={option.id}
                onMouseDown={this.handleSelect}
                onMouseOver={this.handleMouseOver}
                key={option.id}
                className={(this.state.highlighted == option.id) ? 'highlighted' : ''}
              >{option.name}</li>;
    });

    return (
      <div className="ui-dropdown-suggest" style={containerCSS}>
        <input
          ref="input"
          hidden="true"
          value={this.state.value}
        />

        <input
          ref="filter"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          value={this.state.filter}
        />

        <ul
          ref="list"
          style={listCSS}
          className={this.state.open ? '' : 'hidden'}
          onScroll={this.handleScroll}
        >
          {options}
        </ul>
      </div>
    );
  }
}

export default DropdownSuggest
