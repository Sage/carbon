import React from 'react';
import TestUtils from 'react-dom/test-utils';
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
    expect(div.className).toEqual('carbon-menu foobar carbon-menu--primary');
  });

  it('renders with secondary class', () => {
    instance = TestUtils.renderIntoDocument(
      <Menu className="foobar" as="secondary">
        foo
      </Menu>
    );
    let div = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    expect(div.className).toEqual('carbon-menu foobar carbon-menu--secondary');
  });
});
