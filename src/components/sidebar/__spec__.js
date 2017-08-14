import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import Browser from '../../utils/helpers/browser';
import { Sidebar } from './sidebar';
import Textbox from './../textbox';
import Icon from './../icon';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';

describe('Sidebar', () => {
  let instance, leftInstance, spy;

  beforeEach(() => {
    spy = jasmine.createSpy();

    instance = TestUtils.renderIntoDocument(
      <Sidebar
        onCancel={ spy }
        open={ true }
        className='custom-class'
      >
        <Textbox />
        <Textbox />
        <Textbox />
      </Sidebar>
    );

    leftInstance = TestUtils.renderIntoDocument(
      <Sidebar
        onCancel={ spy }
        open={ true }
        size='small'
        position='left'
        enableBackgroundUI={ true }
      />
    );
  });

  describe('componentDidUpdate', () => {
    let mockWindow;
    let wrapper;
    let instance;

    beforeEach(() => {
      mockWindow = {
        addEventListener() {},
        removeEventListener() {}
      };

      spyOn(Browser, 'getWindow').and.returnValue(mockWindow);
    });

    describe('when the Sidebar is open', () => {
      beforeEach(() => {
        wrapper = mount(
          <Sidebar open={ true } onCancel={ spy } />
        );
        instance = wrapper.instance();
      });

      it('sets up event listeners to resize and close the Sidebar', () => {
        spyOn(mockWindow, 'addEventListener');
        wrapper.setProps({ title: 'Sidebar title' });

        expect(mockWindow.addEventListener.calls.count()).toEqual(1);
        expect(mockWindow.addEventListener).toHaveBeenCalledWith('keyup', instance.closeModal);
      });

      describe('when the Sidebar is already listening', () => {
        it('does not set up event listeners', () => {
          spyOn(mockWindow, 'addEventListener');
          instance.listening = true;
          wrapper.setProps({ title: 'Already listening' });

          expect(mockWindow.addEventListener.calls.count()).toEqual(0);
          expect(mockWindow.addEventListener).not.toHaveBeenCalled();
        });
      });
    });

    describe('when the Sidebar is closed', () => {
      beforeEach(() => {
        wrapper = mount(
          <Sidebar onCancel={ spy } />
        );
        instance = wrapper.instance();
        instance.listening = true;
      });

      it('removes event listeners for resize and closing', () => {
        spyOn(mockWindow, 'removeEventListener');
        wrapper.setProps({ title: 'Remove event handlers' });
        expect(mockWindow.removeEventListener.calls.count()).toEqual(1);
        expect(mockWindow.removeEventListener).toHaveBeenCalledWith('keyup', instance.closeModal);
      });
    });
  });

  describe('sidebarClasses', () => {
    it('returns a base sidebar class', () => {
      expect(instance.sidebarClasses).toMatch('carbon-sidebar__sidebar carbon-sidebar__sidebar--right carbon-sidebar__sidebar--medium');
    });

    it('returns a position modifier class based on props', () => {
      expect(leftInstance.sidebarClasses).toMatch('carbon-sidebar__sidebar--left');
    });

    it('returns a size modifier class based on props', () => {
      expect(leftInstance.sidebarClasses).toMatch('carbon-sidebar__sidebar--small');
    });
  });

  describe('mainClasses', () => {
    it('sets the sidebar class', () => {
      expect(leftInstance.mainClasses).toEqual('carbon-sidebar');
    });

    it('appends any additional passed classes', () => {
      expect(instance.mainClasses).toEqual('carbon-sidebar custom-class');
    });
  });

  describe('sidebarHTML', () => {
    it('returns the rendered sidebar', () => {
      expect(TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-sidebar__sidebar')).toBeTruthy();
    });

    it('renders a close icon', () => {
      let icon = TestUtils.findRenderedComponentWithType(instance, Icon);
      expect(icon.props.type).toEqual('close');
    });

    it('renders children within the sidebar', () => {
      let textboxes = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-textbox');
      expect(textboxes.length).toEqual(3);
    });
  });

  describe('render', () => {
    describe('when sidebar is open', () => {
      it('renders a parent div', () => {
        expect(TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-sidebar')).toBeTruthy();
      });

      it('renders a background div', () => {
        expect(TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-modal__background')).toBeTruthy();
      });

      it('renders a sidebar', () => {
        expect(TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-sidebar__sidebar')).toBeTruthy();
      });
    });

    describe('when sidebar is closed', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <Sidebar
            onCancel={ spy }
            open={ false }
          >
          </Sidebar>
        );
      });

      it('renders a parent div', () => {
        expect(TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-sidebar')).toBeTruthy();
      });

      it('does not render a background div', () => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-sidebar__background').length).toEqual(0);
      });

      it('does not render a sidebar', () => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-sidebar__sidebar').length).toEqual(0);
      });
    });
  });

  describe('Behaviour', () => {
    describe('clicking the close icon sidebar', () => {
      it('closes the sidebar', () => {
        let icon = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-sidebar__close-icon');
        TestUtils.Simulate.click(icon);
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('when there is no onCancel prop', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <Sidebar open={ true }>
            <Textbox />
          </Sidebar>
        );
      });

      it('does not render a close icon', () => {
        let icon = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-sidebar__close-icon');
        expect(icon.length).toEqual(0);
      });
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(
        <Sidebar
          data-element='bar'
          onCancel={ () => {} }
          onConfirm={ () => {} }
          data-role='baz'
        />
      );

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'sidebar', 'bar', 'baz');
      });
    });

    describe("on internal elements", () => {
      let wrapper = shallow(
        <Sidebar
          open={ true }
          title='Test'
          onCancel={ () => {} }
          onConfirm={ () => {} }
        />
      );

      elementsTagTest(wrapper, [
        'close'
      ]);
    });
  });
});
