import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Sidebar from './sidebar';
import Textbox from './../textbox';
import Icon from './../icon';

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
        position='left'
        disableBackground={ false }
      />
    );
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
            onCancel={ spy }
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
