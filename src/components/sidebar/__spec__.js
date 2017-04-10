import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import { Sidebar } from './sidebar';
import Textbox from './../textbox';
import Icon from './../icon';
import { shallow } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/test';

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
    describe('when the Sidebar is open', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <Sidebar open={ true } onCancel={ spy } />
        );
      });

      it('sets up event listeners to resize and close the Sidebar', () => {
        let spy = spyOn(window, 'addEventListener');
        instance.componentDidUpdate();
        expect(spy.calls.count()).toEqual(1);
        expect(window.addEventListener).toHaveBeenCalledWith('keyup', instance.closeModal);
      });

      describe('when the Sidebar is already listening', () => {
        it('does not set up event listeners', () => {
          let spy = spyOn(window, 'addEventListener');
          instance.listening = true;
          instance.componentDidUpdate();
          expect(spy.calls.count()).toEqual(0);
          expect(window.addEventListener).not.toHaveBeenCalled();
        });
      });
    });

    describe('when the Sidebar is closed', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <Sidebar onCancel={ spy } />
        );
      });

      it('removes event listeners for resize and closing', () => {
        let spy = spyOn(window, 'removeEventListener');
        instance.componentDidUpdate();
        expect(spy.calls.count()).toEqual(1);
        expect(window.removeEventListener).toHaveBeenCalledWith('keyup', instance.closeModal);
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
