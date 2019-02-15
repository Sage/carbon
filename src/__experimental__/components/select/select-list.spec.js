import React from 'react';
import { shallow, mount } from 'enzyme';
import SelectList from './select-list.component';

describe('SelectList', () => {
  const defaultOptions = [{
    value: '1',
    text: 'Orange',
    options: { additional: true }
  }, {
    value: '2',
    text: 'Blue',
    options: { additional: true }
  }, {
    value: '3',
    text: 'Red',
    options: { additional: true }
  }];

  const fakeTarget = {
    getBoundingClientRect: () => ({
      top: 100,
      height: 200,
      pageYOffset: 300,
      width: 400,
      left: 500
    })
  };

  const renderWrapper = ({
    props,
    options = defaultOptions,
    type = shallow
  } = {}) => type(
    <SelectList { ...props }>
      {
        options.map(item => <div { ...item } />)
      }
    </SelectList>
  );

  it('renders a ScrollableList inside of a Portal', () => {
    expect(renderWrapper()).toMatchSnapshot();
  });

  it('filters the items based on the filter value', () => {
    const wrapper = renderWrapper();
    expect(wrapper.find('ScrollableList').children().length).toEqual(3);
    wrapper.setProps({ filterValue: 'orange' });
    expect(wrapper.find('ScrollableList').children().length).toEqual(1);
  });

  it('renders a no results item if filter removed all children', () => {
    const props = { filterValue: 'x' };
    const wrapper = renderWrapper({ props });
    expect(wrapper.find('ScrollableList').children()).toMatchSnapshot();
  });

  it('renders a no results item if no childen are provided', () => {
    const wrapper = renderWrapper({ options: [] });
    expect(wrapper.find('ScrollableList').children()).toMatchSnapshot();
  });

  it('supports mouse events', () => {
    const events = {
      onMouseLeave: 'mouseLeave',
      onMouseEnter: 'mouseEnter',
      onMouseDown: 'mouseDown'
    };
    Object.keys(events).forEach((event) => {
      const props = { [event]: jest.fn() };
      const wrapper = renderWrapper({ props });
      wrapper.find('div').first().simulate(events[event]);
      expect(props[event]).toHaveBeenCalled();
    });
  });

  it('positions the list based on the target', () => {
    const props = { target: fakeTarget };
    const wrapper = renderWrapper({ props, type: mount });
    const style = 'left: 500px; top: 300px; width: 400px; position: absolute;';
    expect(wrapper.find('div').first().instance().getAttribute('style')).toEqual(style);
  });
});
