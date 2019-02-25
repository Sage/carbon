import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Select from '../select/select.component';
import Option from '../select/option.component';
import responseErrorMessage from './response-error.message';

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
 *   <SelectAsync formatRequest={ opts => ({ ...opts, withCredentials: true }) } />
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
 *   <SelectAsync formatResponse={ response => ({ ...response, data: { $items: response.myItems } }) } />
 *
 * This follows the axios response schema: https://github.com/axios/axios#response-schema
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
    formatResponse: PropTypes.func,
    itemsPerPage: PropTypes.number
  }

  static defaultProps = {
    itemsPerPage: 20
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
    const { itemsPerPage, formatRequest } = this.props;

    let opts = {
      params: {
        page,
        items_per_page: itemsPerPage,
        search
      }
    };

    if (formatRequest) opts = formatRequest(opts);

    return opts;
  }

  handleResponse(originalResponse) {
    const { formatResponse } = this;
    const response = formatResponse ? formatResponse(originalResponse) : originalResponse;

    const { data } = response;

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
    const response = await axios.get(
      this.props.endpoint,
      this.fetchOptions(page, search)
    );
    this.handleResponse(response);
  }

  fetchNextPage = () => {
    const {
      fetching, items, total, page
    } = this.state;

    if (fetching) return;
    if (items.length === total) return;
    this.fetchData({ page: page + 1 });
  }

  buildOptions(page, items) {
    return (page > 1) ? this.state.items.concat(items) : items;
  }

  renderOptions() {
    const { items } = this.state;

    if (this.props.children) return this.props.children(items);
    if (!items.length) return null;

    return items.map(item => (
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
