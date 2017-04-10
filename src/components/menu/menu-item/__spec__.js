import React from 'react';
import { shallow } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../../utils/helpers/test';
import MenuItem from './menu-item';
import Link from './../../link';

describe('MenuItem', () => {
  let wrapper;

  describe('no submenu', () => {
    beforeEach(() => {
      wrapper = shallow(
        <MenuItem className="foobar">
          foo
        </MenuItem>
      );
    });

    it('renders a single Link with the correct class', () => {
      let submenuItem = wrapper.find(Link);
      expect(submenuItem.length).toEqual(1);
      expect(submenuItem.hasClass('carbon-menu-item')).toEqual(true);
      expect(submenuItem.hasClass('foobar')).toEqual(true);
    });
  });

  describe('with submenu', () => {
    beforeEach(() => {
      wrapper = shallow(
        <MenuItem className="foobar" submenu="menu name" submenuDirection="left">
          foo
        </MenuItem>
      );
    });

    it('renders a submenu with a title', () => {
      expect(wrapper.find('.carbon-menu-item--has-submenu').length).toEqual(1);
      expect(wrapper.find('.carbon-menu-item__submenu-title').length).toEqual(1);
    });
  });

  describe('Boolean props', () => {
    beforeEach(() => {
      wrapper = shallow(
        <MenuItem selected={ true } divide={ true } alternate={ true }>
          foo
        </MenuItem>
      );
    });

    it('selected, divide and alternate', () => {
      let submenuItem = wrapper.find(Link);
      expect(submenuItem.hasClass('carbon-menu-item--divide')).toEqual(true);
      expect(submenuItem.hasClass('carbon-menu-item--selected')).toEqual(true);
      expect(submenuItem.hasClass('carbon-menu-item--alternate')).toEqual(true);
    });

    it("alternate-off if 'alternate' Boolean is not set", () => {
      wrapper = shallow(<MenuItem>foo</MenuItem>);
      let submenuItem = wrapper.find(Link);
      expect(submenuItem.hasClass('carbon-menu-item--alternate-off')).toEqual(true);
    })
  });

  describe("tags on component", () => {
    let wrapper = shallow(<MenuItem data-element='bar' data-role='baz'>Test</MenuItem>);

    it('include correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'menu-item', 'bar', 'baz');
    });
  });
});
