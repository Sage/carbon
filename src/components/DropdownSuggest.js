import React from 'react';
import Request from 'superagent';
import _ from 'underscore';

class DropdownSuggest extends React.Component {

  /**
   * Setup default properties
   */
  static propTypes = {
    path: React.PropTypes.string.isRequired
  }

  /**
   * Setup default state
   */
  state = {
    options: [],
    open: false,
    page: 1,
    pages: 0,
    value: ""
  }

  /**
   * Retrieves data from the server for the list.
   *
   * @method getData
   */
  getData = (val = "", page = 1) => {
    Request
      .get(this.props.path)
      .query({
        page: page,
        rows: 10,
        value: val
      })
      .end((err, response) => {
        this.updateList(response.body.data[0], val);
      });
  }

  /**
   * Sets or appends the list with new data and causes a setState.
   *
   * @method updateList
   */
  updateList = (data, val = "") => {
    var pages = Math.ceil(data.records / 10);

    if (data.page > 1) {
      var records = this.state.options.concat(data.items);
    } else {
      var records = data.items;
      this.resetScroll();
    }

    this.setState({
      options: records,
      open: true,
      pages: pages,
      page: data.page,
      value: val
    });
  }

  /**
   * Asks for the next page of data.
   *
   * @method getNextPage
   */
  getNextPage = () => {
    if (this.state.page < this.state.pages) {
      this.getData(this.state.value, this.state.page + 1);
    }
  }

  /**
   * Handles what happens on blur of the input.
   *
   * @method handleBlur
   */
  handleBlur = () => {
    this.resetScroll();
    this.setState({ open: false });
  }

  /**
   * Handles what happens on focus of the input.
   *
   * @method handleFocus
   */
  handleFocus = () => {
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
    if (this.state.page < this.state.pages) {
      var list = this.refs.list.getDOMNode();
      var scrollTriggerPosition = list.scrollHeight - list.offsetHeight - 20;

      if (list.scrollTop > scrollTriggerPosition) {
        this.getNextPage();
      }
    }
  }

  /**
   * Handles what happens on change of the input.
   *
   * @method handleChange
   */
  handleChange = (ev) => {
    this.getData(ev.target.value, 1);
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
      return <li>{option.name}</li>;
    });

    // throttle the scroll events so they don't trigger rapidly
    var scrollThrottle = _.throttle(this.handleScroll, 200);

    return (
      <div className="ui-dropdown-suggest" style={containerCSS}>
        <input
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          value={this.value}
        />

        <ul
          ref="list"
          style={listCSS}
          className={this.state.open ? '' : 'hidden'}
          onScroll={scrollThrottle}
        >
          {options}
        </ul>
      </div>
    );
  }
}

export default DropdownSuggest
