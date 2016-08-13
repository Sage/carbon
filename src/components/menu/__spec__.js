import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import { Menu } from './menu';

describe('Menu', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Menu className="foobar">
        foo
      </Menu>
    );
  });

  it('renders with correct classes', () => {
    let div = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    expect(div.className).toEqual('ui-menu foobar ui-menu--primary');
  });

  it('renders with secondary class', () => {
    instance = TestUtils.renderIntoDocument(
      <Menu className="foobar" as="secondary">
        foo
      </Menu>
    );
    let div = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    expect(div.className).toEqual('ui-menu foobar ui-menu--secondary');
  });
});
