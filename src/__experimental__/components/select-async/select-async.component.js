import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Select from '../select/select.component';
import Option from '../select/option.component';
import Spinner from '../../../components/spinner';

class SelectAsync extends React.Component {
  static propTypes = {
    endpoint: PropTypes.string
  }

  state = {
    items: [],
    page: 0,
    total: 0,
    fetching: false,
    search: undefined
  }

  deferredFetch = undefined

  onOpen = () => {
    this.fetchData({ page: 1, search: null });
  }

  deferredFetchData = (search) => {
    clearTimeout(this.deferredFetch);
    this.deferredFetch = setTimeout(() => {
      this.fetchData({ page: 1, search });
    }, 200);
  }

  fetchData = async ({ page, search = this.state.search }) => {
    this.setState({ fetching: true });
    const { data } = await axios.get(this.props.endpoint, {
      params: {
        page,
        items_per_page: 20,
        search
      }
    });
    const items = (data.$page > 1) ? this.state.items.concat(data.$items) : data.$items;

    this.setState({
      items,
      page: data.$page,
      total: data.$total,
      fetching: false,
      search
    });
  }

  fetchNextPage = () => {
    if (this.state.fetching) return;
    if (this.state.items.length === this.state.total) return;
    this.fetchData({ page: this.state.page + 1 });
  }

  renderOptions() {
    if (this.state.items.length) {
      const items = this.state.items.map(item => (
        <Option
          key={ `a${item.id}` }
          value={ item.id }
          text={ item.displayed_as }
        />
      ));
      if (this.state.fetching) items.push(this.renderLoadingItem());
      return items;
    }

    if (this.state.fetching) return this.renderLoadingItem();

    return null;
  }

  renderLoadingItem() {
    return (
      <div
        key='spinner'
        isSelectable={ false }
        style={ { textAlign: 'center' } }
      >
        <Spinner size='small' />
      </div>
    );
  }

  render() {
    return (
      <Select
        onOpen={ this.onOpen }
        onFilter={ this.deferredFetchData }
        onLazyLoad={ this.fetchNextPage }
        { ...this.props }
      >
        { this.renderOptions() }
      </Select>
    );
  }
}

export default SelectAsync;
