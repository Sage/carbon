import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import { rootTagTest } from '../../utils/helpers/tags/tags-specs';
import AppWrapper from './app-wrapper';

describe('app wrapper', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument( <AppWrapper className='foobar'>foo</AppWrapper>);
  });

  it('renders the children', () => {
    let div = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    expect(div.textContent).toEqual('foo');
  });

  it('renders with correct classes', () => {
    let div = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
    expect(div.className).toEqual('carbon-app-wrapper foobar');
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(<AppWrapper data-element='bar' data-role='baz' />);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'app-wrapper', 'bar', 'baz');
      });
    });
  });
});
