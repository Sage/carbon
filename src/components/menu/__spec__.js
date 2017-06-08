import React from 'react';
import { Menu } from './menu';
import { shallow } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';

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

  it('renders with a <nav> tag as the root element', () => {
    expect(wrapper.is('nav')).toEqual(true);
  });

  describe("tags on component", () => {
    let wrapper = shallow(<Menu data-element='bar' data-role='baz'>Test</Menu>);

    it('include correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'menu', 'bar', 'baz');
    });
  });
});
