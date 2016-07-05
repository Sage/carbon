import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import SubmenuBlock from './submenu-block';

describe('SubmenuBlock', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <SubmenuBlock className="foobar">
        foo
      </SubmenuBlock>
    );
  });

  it('renders the children', () => {
    let div = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    expect(div.textContent).toEqual('foo');
  });

  it('renders with correct classes', () => {
    let div = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    expect(div.className).toEqual('ui-submenu-block foobar');
  });
});
