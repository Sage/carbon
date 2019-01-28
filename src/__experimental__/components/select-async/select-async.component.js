import React from 'react';
import Select from '../select/select.component';
import Option from '../select/option.component';
import axios from 'axios';

class SelectAsync extends React.Component {
  state = {
    options: [],
    page: 1
  }

  delay = undefined

  fetchOptions(filter) {
    return axios.get(this.props.action, {
      page: this.state.page,
      rows: 10,
      value: filter
    });
  }

  handleFilter = (filterValue) => {
    if (this.props.onFilter) this.props.onFilter(filterValue);

    clearTimeout(this.delay);
    this.delay = setTimeout(() => {
      const { action } = this.props;
      const manualFetch = typeof action === 'string';
      const fetch = manualFetch ? action : this.fetchOptions;

      fetch(filterValue).then(options => this.setState({ options }));
    }, 500);
  }

  renderOptions() {
    return (
      this.state.options.map(option => (
        <Option />
      ))
    );
  }

  render() {
    return (
      <Select
        { ...props }
        onFilter={ this.handleFilter }
      >
        { this.renderOptions() }
      </Select>
    );
  }
}

export default SelectAsync;