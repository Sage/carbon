import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import SubmenuBlock from './submenu-block';
import { shallow } from 'enzyme';

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
    expect(div.className).toEqual('carbon-submenu-block foobar');
  });

  describe("tags on component", () => {
    let wrapper = shallow(<SubmenuBlock data-element='bar' data-role='baz' />);

    it('include correct component, element and role data tags', () => {
      window.RootTagTest.run(wrapper, 'submenu-block', 'bar', 'baz');
    });
  });
});
