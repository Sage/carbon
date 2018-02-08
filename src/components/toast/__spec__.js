import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';
import Toast from './toast';

describe('Toast', () => {
  let instance, onDismissSpy;

  describe('when toast is closed', () => {
    it('renders null', () => {
      const wrapper = mount(<Toast open={ false } as='info' className='custom' onDismiss={ () => {} }>
                              foobar
                            </Toast>);
      expect(wrapper).toMatchSnapshot();
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

    describe('on component', () => {
      let wrapper = shallow(<Toast data-element='bar' data-role='baz' />);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper.find('.carbon-toast'), 'toast', 'bar', 'baz');
      });
    });

    describe('on internal elements', () => {
      let wrapper = shallow(<Toast open={ true } onDismiss={ ()=>{} } />);
      elementsTagTest(wrapper, ['close']);
    });
  });
});
