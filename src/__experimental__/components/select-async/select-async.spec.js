import React from 'react';
import { mount, shallow } from 'enzyme';
import axios from 'axios';
import { SelectAsync, Option } from '.';
import responseErrorMessage from './response-error.message';

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
  headers: {
    Accept: 'application/json'
  },
  ...extra
});
const mockResponse = (response) => {
  axios.get = jest.fn((_, opts) => {
    if (response) return response;
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
      mockResponse(validResponse([]));
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

  describe('custom request', () => {
    it('allows developers to customise the request options', async () => {
      mockResponse();
      const props = { formatRequest: () => ({ customRequest: true }) };
      await openResults(render(props));
      expect(axios.get).toHaveBeenCalledWith(
        endpoint, { customRequest: true }
      );
    });
  });

  describe('custom response', () => {
    it('throws an error if the response is not supported', async () => {
      mockResponse({ data: {} });
      try {
        await render().instance().fetchData({ page: 1 });
      } catch ({ message }) {
        expect(message).toEqual(responseErrorMessage);
      }
    });

    it('allows developers to customise the response format', async () => {
      mockResponse();
      const props = {
        formatResponse: response => ({ ...response, data: { $items: [{ displayed_as: 'custom!', id: '9' }] } })
      };
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

    it('does not refetch if a fetch is already in progress', async () => {
      mockResponse();
      const wrapper = await openResults(render());
      expect(axios.get.mock.calls.length).toEqual(1);
      getNextPage(wrapper); // do not await this response so we still have a fetch in progress
      expect(axios.get.mock.calls.length).toEqual(2);
      await getNextPage(wrapper);
      expect(axios.get.mock.calls.length).toEqual(2);
    });

    it('does not refetch if total number of pages has been reached', async () => {
      mockResponse();
      const wrapper = await openResults(render());
      expect(axios.get.mock.calls.length).toEqual(1);
      await getNextPage(wrapper);
      expect(axios.get.mock.calls.length).toEqual(2);
      await getNextPage(wrapper);
      expect(axios.get.mock.calls.length).toEqual(2);
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
