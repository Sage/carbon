import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import MenuItem from './menu-item';
import Link from './../../link';

describe('MenuItem', () => {
  let instance;

  describe('no submenu', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <MenuItem className="foobar">
          foo
        </MenuItem>
      );
    });

    it('renders a link with correct classes', () => {
      let item = TestUtils.findRenderedComponentWithType(instance, Link);
      expect(item.props.className).toEqual('ui-menu-item foobar');
    });
  });

  describe('with submenu', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <MenuItem className="foobar" submenu="menu name" submenuDirection="left">
          foo
        </MenuItem>
      );
    });

    it('renders a div with correct classes', () => {
      let item = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0];
      expect(item.props.className).toEqual('ui-menu-item foobar ui-menu-item--has-submenu');
    });

    it('renders a submenu with classes', () => {
      let submenu = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[2];
      expect(submenu.props.className).toEqual('ui-menu-item__submenu ui-menu-item__submenu--left');
    });
  });

  describe('selected', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <MenuItem selected={ true }>
          foo
        </MenuItem>
      );
    });

    it('renders with selected class', () => {
      let item = TestUtils.findRenderedComponentWithType(instance, Link);
      expect(item.props.className).toEqual('ui-menu-item ui-menu-item--selected');
    });
  });

  describe('divide', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <MenuItem divide={ true }>
          foo
        </MenuItem>
      );
    });

    it('renders with divide class', () => {
      let item = TestUtils.findRenderedComponentWithType(instance, Link);
      expect(item.props.className).toEqual('ui-menu-item ui-menu-item--divide');
    });
  });
});
