import React from 'react';
import { shallow } from 'enzyme';
import Title from './title';

describe('<Title />', () => {
  let wrapper;

  describe("basic rendering", () => {
    beforeEach(() => {
      wrapper = shallow(
        <Title
          start='This is the start'
          end='and this is the end'
        />
      );
    });

    it("renders a start section", () => {
      let start = wrapper.find('.carbon-title__start');
      expect(start.length).toEqual(1);
      expect(start.text()).toEqual('This is the start');
    });

    it("renders an end section", () => {
      let end = wrapper.find('.carbon-title__end');
      expect(end.length).toEqual(1);
      expect(end.text()).toEqual('and this is the end');
    });
  });

  it("renders a start modifier if start is highlighted", () => {
    let wrapper = shallow(<Title highlight='start' />);
    expect(wrapper.find('.carbon-title--start-highlighted').length).toEqual(1);
  });

  it("renders a end modifier if end is highlighted", () => {
    let wrapper = shallow(<Title highlight='end' />);
    expect(wrapper.find('.carbon-title--end-highlighted').length).toEqual(1);
  });
});
