import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Select from '../select/select.component';
import Option from '../select/option.component';

const responseErrorMessage = `The server response does not contain an $items attribute.

The SelectAsync component expects the data to be in the format of:

  $items: [Array] - required, the items to render
  $page: [Integer] - optional, for paginated responses
  $total: [Integer] - optional, for paginated responses

If your API response does not match this, you can modify it using the 'formatResponse' prop:

<SelectAsync formatResponse={ response => ({ $items: response.myItems }) } />`;

/**
 * SelectAsync renders a regular Select, but wraps it in additional functionality
 * to allow it to fetch it's options from an API endpoint.
 *
 * # The Request
 *
 * By default the component will execute a request with the following options:
 *
 *   {
 *     params: {
 *       page: 1
 *       items_per_page: 20,
 *       search: 'any filter text'
 *     }
 *   }
 *
 * This can be customised using the formatRequest prop, for example to enable withCredentials:
 *
 *   <SelectAsync formatRequest={ (opts) => { opts.withCredentials = true; return opts; } } />
 *
 * The opts object is used with axios, please see this URL for more options:
 * https://github.com/axios/axios#request-config
 *
 * # The Response
 *
 * By default the response is expected in the following format:
 *
 *   {
 *     $items: [Array] - required, the items to render
 *     $page: [Integer] - optional, for paginated responses
 *     $total: [Integer] - optional, for paginated responses
 *   }
 *
 * If your response does not match this format you can modify it using the formatResponse prop:
 *
 *   <SelectAsync formatResponse={ (response) => ({ $items: response.myItems }) } />`
 *
 * # Rendering Options
 *
 * By default options will be rendered under the assumption they have the following format:
 *
 *   {
 *     id [Integer] - the unique identifier
 *     displayed_as [String] - the human readable value
 *   }
 *
 * If your items do not match this format, or you want to have custom control over how they
 * are rendered, you can provide a function as a child:
 *
 *   <SelectAsync>
 *     {
 *       items => items.map(item => <Option>{ item.text }</Option>)
 *     }
 *   </SelectAsync>
 */
class SelectAsync extends React.Component {
  static propTypes = {
    children: PropTypes.func,
    endpoint: PropTypes.string.isRequired,
    formatRequest: PropTypes.func,
    formatResponse: PropTypes.func
  }

  state = {
    fetching: false,
    items: [],
    page: 0,
    total: 0
  }

  select = React.createRef()

  deferredFetch = undefined

  onOpen = () => this.fetchData({ page: 1 });

  filterValue() {
    return this.select.current.state.filter;
  }

  fetchOptions(page, search) {
    let opts = {
      params: {
        page,
        items_per_page: 20,
        search
      }
    };

    if (this.props.formatRequest) opts = this.props.formatRequest(opts);

    return opts;
  }

  handleResponse(responseData) {
    let data = responseData;

    if (this.props.formatResponse) data = this.props.formatResponse(data);

    if (!Object.prototype.hasOwnProperty.call(data, '$items')) {
      throw Error(responseErrorMessage);
    }

    this.setState({
      items: this.buildOptions(data.$page, data.$items),
      page: data.$page || 1,
      total: data.$total || data.$items.length,
      fetching: false
    });
  }

  deferredFetchData = (search) => {
    clearTimeout(this.deferredFetch);
    this.deferredFetch = setTimeout(() => {
      this.fetchData({ page: 1, search });
    }, 200);
  }

  fetchData = async ({ page, search = this.filterValue() }) => {
    this.setState({ fetching: true });
    const { data } = await axios.get(
      this.props.endpoint,
      this.fetchOptions(page, search)
    );
    this.handleResponse(data);
  }

  fetchNextPage = () => {
    if (this.state.fetching) return;
    if (this.state.items.length === this.state.total) return;
    this.fetchData({ page: this.state.page + 1 });
  }

  buildOptions(page, items) {
    return (page > 1) ? this.state.items.concat(items) : items;
  }

  renderOptions() {
    if (this.props.children) return this.props.children(this.state.items);

    if (!this.state.items.length) return null;

    return this.state.items.map(item => (
      <Option
        key={ item.id }
        value={ String(item.id) }
        text={ item.displayed_as }
      />
    ));
  }

  render() {
    return (
      <Select
        { ...this.props }
        ref={ this.select }
        onOpen={ this.onOpen }
        onFilter={ this.deferredFetchData }
        onLazyLoad={ this.fetchNextPage }
      >
        { this.renderOptions() }
      </Select>
    );
  }
}

export default SelectAsync;
