import React from 'react';
import { Menu } from './menu';
import { shallow } from 'enzyme';

describe('Menu', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Menu className="foobar">
        foo
      </Menu>
    );
  });

  it('renders with correct classes', () => {
    expect(wrapper.hasClass('carbon-menu foobar carbon-menu--primary')).toEqual(true);
  });

  it('renders with secondary class', () => {
    wrapper = shallow(
      <Menu className="foobar" as="secondary">
        foo
      </Menu>
    );
    expect(wrapper.hasClass('carbon-menu foobar carbon-menu--secondary')).toEqual(true);
  });

});
