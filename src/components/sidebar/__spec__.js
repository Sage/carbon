import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import { Sidebar } from './sidebar';
import Textbox from './../textbox';
import Icon from './../icon';

describe('Sidebar', () => {
  let instance, leftInstance, spy;

  beforeEach(() => {
    spy = jasmine.createSpy();

    instance = TestUtils.renderIntoDocument(
      <Sidebar
        onClose={ spy }
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
        onClose={ spy }
        open={ true }
        position='left'
        disableBackground={ false }
      />
    );
  });

  describe('componentDidUpdate', () => {
    describe('when the Sidebar is open', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <Sidebar open={ true } onClose={ spy } />
        );
      });

      it('sets up event listeners to resize and close the Sidebar', () => {
        let spy = spyOn(window, 'addEventListener');
        instance.componentDidUpdate();
        expect(spy.calls.count()).toEqual(1);
        expect(window.addEventListener).toHaveBeenCalledWith('keyup', instance.closeSidebar);
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
          <Sidebar onClose={ spy } />
        );
      });

      it('removes event listeners for resize and closing', () => {
        let spy = spyOn(window, 'removeEventListener');
        instance.componentDidUpdate();
        expect(spy.calls.count()).toEqual(1);
        expect(window.removeEventListener).toHaveBeenCalledWith('keyup', instance.closeSidebar);
      });
    });
  });

  describe('closeSidebar', () => {
    describe('when the esc key is released', () => {
      it('calls the cancel sidebar handler', () => {
        instance.closeSidebar({ keyCode: 27 });
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('when any other key is released', () => {
      it('does not close the sidebar', () => {
        instance.closeSidebar({ keyCode: 8 });
        expect(spy).not.toHaveBeenCalled();
      });
    });
  });

  describe('sidebarClasses', () => {
    it('returns a base sidebar class', () => {
      expect(instance.sidebarClasses).toEqual('ui-sidebar__sidebar ui-sidebar__sidebar--right');
    });

    it('returns a position modifier class based on props', () => {
      expect(leftInstance.sidebarClasses).toEqual('ui-sidebar__sidebar ui-sidebar__sidebar--left');
    });
  });

  describe('mainClasses', () => {
    it('sets the sidebar class', () => {
      expect(leftInstance.mainClasses).toEqual('ui-sidebar');
    });

    it('appends any additional passed classes', () => {
      expect(instance.mainClasses).toEqual('ui-sidebar custom-class');
    });
  });

  describe('backgroundHTML', () => {
    describe('when disableBackground is true', () => {
      it('returns a background div', () => {
        expect(TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-sidebar__background')).toBeTruthy();
      });
    });

    describe('when disableBackground is false', () => {
      it('returns null', () => {
        expect(leftInstance.backgroundHTML).toBeFalsy();
      });
    });
  });

  describe('sidebarHTML', () => {
    it('returns the rendered sidebar', () => {
      expect(TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-sidebar__sidebar')).toBeTruthy();
    });

    it('renders a close icon', () => {
      let icon = TestUtils.findRenderedComponentWithType(instance, Icon);
      expect(icon.props.type).toEqual('close');
    });

    it('renders children within the sidebar', () => {
      let textboxes = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'ui-textbox');
      expect(textboxes.length).toEqual(3);
    });
  });
  
  describe('render', () => {
    describe('when sidebar is open', () => {
      it('renders a parent div', () => {
        expect(TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-sidebar')).toBeTruthy();
      });

      it('renders a background div', () => {
        expect(TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-sidebar__background')).toBeTruthy();
      });

      it('renders a sidebar', () => {
        expect(TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-sidebar__sidebar')).toBeTruthy();
      });
    });

    describe('when sidebar is closed', () => {
      beforeEach(() => {
        instance = TestUtils.renderIntoDocument(
          <Sidebar
            onClose={ spy }
            open={ false }
          >
          </Sidebar>
        );
      });

      it('renders a parent div', () => {
        expect(TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-sidebar')).toBeTruthy();
      });

      it('does not render a background div', () => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'ui-sidebar__background').length).toEqual(0);
      });

      it('does not render a sidebar', () => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'ui-sidebar__sidebar').length).toEqual(0);
      });
    });
  });

  describe('Behaviour', () => {
    describe('clicking the close icon sidebar', () => {
      it('closes the sidebar', () => {
        let icon = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-sidebar__close');
        TestUtils.Simulate.click(icon);
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
