import React from 'react';
import { mount, shallow } from 'enzyme';
import axios from 'axios';
import { SelectAsync, Option } from '.';

const endpoint = '/endpoint';
const pageOne = [
  { displayed_as: 'Item 1', id: 1 },
  { displayed_as: 'Item 2', id: 2 }
];
const pageTwo = [
  { displayed_as: 'Item 3', id: 3 },
  { displayed_as: 'Item 4', id: 4 }
];
const validResponse = (items = pageOne, page = 1) => ({
  data: {
    $items: items,
    $page: page,
    $total: 4
  }
});
const validRequest = ({ search, page, extra }) => ({
  params: {
    items_per_page: 20,
    page,
    search
  },
  ...extra
});
const mockResponse = (response) => {
  axios.get = jest.fn((_, opts) => {
    if (response) return validResponse(response);
    switch (opts.params.page) {
      case 2:
        return validResponse(pageTwo, 2);
      default:
        return validResponse(pageOne);
    }
  });
};
const openResults = (wrapper) => {
  wrapper.find('input').simulate('focus');
  return wrapper;
};
const findResults = wrapper => wrapper.update().find('Option');
const getNextPage = wrapper => wrapper.find('Select').props().onLazyLoad();
const filterResults = (wrapper, filter) => {
  const select = wrapper.find('Select');
  select.setState({ filter });
  select.props().onFilter();
};

describe('SelectAsync', () => {
  const render = (props, renderer = mount) => (
    renderer(<SelectAsync endpoint={ endpoint } { ...props } />)
  );

  it('renders a Select component', () => {
    expect(render(undefined, shallow)).toMatchSnapshot();
  });

  describe('on open', () => {
    it('fetches data for the first page of results', async () => {
      mockResponse();
      const wrapper = await openResults(render());
      expect(axios.get).toHaveBeenCalledWith(
        endpoint, validRequest({ page: 1 })
      );
      expect(findResults(wrapper)).toMatchSnapshot();
    });
  });

  describe('no results', () => {
    it('it renders with null', async () => {
      mockResponse([]);
      const wrapper = await openResults(render());
      expect(findResults(wrapper)).toMatchSnapshot();
    });
  });

  describe('custom children render', () => {
    it('uses a custom method to render the children', async () => {
      mockResponse();
      const props = { children: items => items.map(() => <Option>custom!</Option>) };
      const wrapper = await openResults(render(props));
      expect(findResults(wrapper)).toMatchSnapshot();
    });
  });

  describe('pagination', () => {
    it('adds the next page results to the list', async () => {
      mockResponse();
      const wrapper = await openResults(render());
      await getNextPage(wrapper);
      expect(findResults(wrapper)).toMatchSnapshot();
    });
  });

  describe('filtering', () => {
    it('triggers a new fetch with the search param after 200ms', async () => {
      jest.useFakeTimers();
      mockResponse();
      const wrapper = await openResults(render());
      await filterResults(wrapper, 'foo');
      jest.advanceTimersByTime(200);
      expect(axios.get).toHaveBeenCalledWith(
        endpoint, validRequest({ page: 1, search: 'foo' })
      );
    });
  });
});
