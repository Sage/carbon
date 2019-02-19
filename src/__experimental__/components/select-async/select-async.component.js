import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Select from '../select/select.component';
import Option from '../select/option.component';

class SelectAsync extends React.Component {
  static propTypes = {
    endpoint: PropTypes.string
  }

  state = {
    items: [],
    page: 0,
    total: 0,
    fetching: false
  }

  select = React.createRef()

  deferredFetch = undefined

  onOpen = () => this.fetchData({ page: 1 });

  filterValue() {
    return this.select.current.state.filter;
  }

  deferredFetchData = (search) => {
    clearTimeout(this.deferredFetch);
    this.deferredFetch = setTimeout(() => {
      this.fetchData({ page: 1, search });
    }, 200);
  }

  fetchData = async ({ page, search = this.filterValue() }) => {
    this.setState({ fetching: true });

    const { data } = await axios.get(this.props.endpoint, {
      params: {
        page,
        items_per_page: 20,
        search
      }
    });

    this.setState({
      items: this.buildOptions(data.$page, data.$items),
      page: data.$page,
      total: data.$total,
      fetching: false
    });
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
    if (!this.state.items.length) {
      if (!this.deferredFetch) return <div isSelectable={ false }>Fetching...</div>;
      return null;
    }

    return this.state.items.map(item => (
      <Option
        key={ `a${item.id}` }
        value={ item.id }
        text={ item.displayed_as }
      />
    ));
  }

  render() {
    return (
      <Select
        ref={ this.select }
        onOpen={ this.onOpen }
        onFilter={ this.deferredFetchData }
        onLazyLoad={ this.fetchNextPage }
        loading={ this.state.fetching }
        { ...this.props }
      >
        { this.renderOptions() }
      </Select>
    );
  }
}

export default SelectAsync;
