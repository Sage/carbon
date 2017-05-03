import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Spinner from './spinner';
import { shallow } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';

describe('Spinner', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument( <Spinner /> );
  });

  describe('spinnerClasses', () => {
    it('returns the base class and classes with from props', () => {
      expect(instance.spinnerClasses).toEqual('carbon-spinner carbon-spinner--info carbon-spinner--medium');
    });

    describe('passing a custom as prop', () => {
      it('sets the element to the passed as prop', () => {
        instance = TestUtils.renderIntoDocument( <Spinner as='error' /> );
        expect(instance.spinnerClasses).toEqual('carbon-spinner carbon-spinner--error carbon-spinner--medium');
      });
    });

    describe('passing a custom size prop', () => {
      it('sets the modifier to the size prop', () => {
        instance = TestUtils.renderIntoDocument( <Spinner size='small' /> );
        expect(instance.spinnerClasses).toEqual('carbon-spinner carbon-spinner--info carbon-spinner--small');
      });
    });
  });

  describe('render', () => {
    it('renders a parent div with the spinner classes', () => {
      let div = TestUtils.findRenderedDOMComponentWithTag(instance, 'div')
      expect(div.className).toEqual('carbon-spinner carbon-spinner--info carbon-spinner--medium');
    });
  });

  describe("tags on component", () => {
    let wrapper = shallow(<Spinner data-element='bar' data-role='baz' />);

    it('include correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'spinner', 'bar', 'baz');
    });
  });
});
