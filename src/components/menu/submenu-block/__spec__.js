import React from 'react';
import TestUtils from 'react-dom/test-utils';
import SubmenuBlock from './submenu-block';
import { shallow } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../../utils/helpers/tags/tags-specs';

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
    let wrapper = shallow(<SubmenuBlock data-element='bar' data-role='baz'>'Menu'</SubmenuBlock>);

    it('include correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'submenu-block', 'bar', 'baz');
    });
  });
});
