import React from 'react';
import { shallow } from 'enzyme';
import { Menu, MenuItem } from '.';

describe('Menu', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Menu>
        <MenuItem>test element</MenuItem>
      </Menu>
    );
  });

  it('should render with correct data-component', () => {
    expect(wrapper.prop('data-component')).toEqual('menu');
  });

  it('should have default theme as primary', () => {
    expect(wrapper.props().menuType).toBe('light');
  });

  it('should render children correctly', () => {
    expect(wrapper.find(MenuItem).exists()).toBe(true);
  });

  it('should provide menu type to the children component', () => {
    expect(wrapper.find(MenuItem).props().menuType).toBe('light');
  });
});
