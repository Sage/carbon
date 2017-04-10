import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import { shallow } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/test';
import Toast from './toast';

describe('Toast', () => {
  let instance, onDismissSpy;

  describe('when toast is closed', () => {
    it('renders null', () => {
      instance = TestUtils.renderIntoDocument(
        <Toast open={ false } as='info' className='custom' onDismiss={ () => {} }>
          foobar
        </Toast>
      );

      let content = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div');
      expect(content.length).toEqual(0);
    });
  });

  describe('when toast is open with onDismiss prop', () => {
    beforeEach(() => {
      onDismissSpy = jasmine.createSpy();
      instance = TestUtils.renderIntoDocument(
        <Toast open={ true } as='info' className='custom' onDismiss={ onDismissSpy }>
          foobar
        </Toast>
      );
    });

    it('renders the component with correct classes', () => {
      let classes = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-toast').className;
      expect(classes).toEqual('carbon-toast custom carbon-toast--info toast-appear');
    });

    it('renders type div', () => {
      let icon = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-toast__type');
      expect(icon.className).toEqual('carbon-toast__type');
    });

    it('renders type icon', () => {
      let icon = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-toast__type-icon');
      expect(icon.className).toEqual('carbon-icon carbon-toast__type-icon icon-info');
    });

    it('renders child content', () => {
      let content = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-toast__content').textContent;
      expect(content).toEqual('foobar');
    })

    it('renders close icon', () => {
      let icon = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-toast__close');
      expect(icon.className).toEqual('carbon-icon carbon-toast__close icon-close');
    });

    it('calls onDismiss method when clicking close', () => {
      let icon = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-toast__close');
      TestUtils.Simulate.click(icon);
      expect(onDismissSpy).toHaveBeenCalled();
    });
  });

  describe('when toast is open without onDismiss prop', () => {
    beforeEach(() => {
      onDismissSpy = jasmine.createSpy();
      instance = TestUtils.renderIntoDocument(
        <Toast open={ true } as='info' className='custom'>
          foobar
        </Toast>
      );
    });

    it('does not renders close icon', () => {
      let icon = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-toast__close');
      expect(icon.length).toEqual(0);
    });
  });

  describe('tags', () => {
    let wrapper;

    beforeEach(() => {

    });

    describe('on component', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = shallow(
          <Toast open={ true } as='info' className='custom' onDismiss={ () => {} } data-element='bar' data-role='baz'>
            foobar
          </Toast>
        );
      });

      it('includes correct component, element and role data tags', () => {
        rootTagTest(wrapper.find('.carbon-toast'), 'toast', 'bar', 'baz');
      });
    });

    describe('on internal elements', () => {
      it("adds element tags to it's children", () => {
        elementsTagTest(wrapper, ['close']);
      });
    });
  });
});
