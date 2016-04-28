import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import SidebarHeader from './sidebar-header';
import Textbox from './../../textbox';

describe('Sidebar Header', () => {
  let instance, classInstance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <SidebarHeader>
        <Textbox />
      </SidebarHeader>
    );

    classInstance = TestUtils.renderIntoDocument(
      <SidebarHeader className='custom-class' >
        <Textbox />
      </SidebarHeader>
    );
  });

  describe('mainClasses', () => {
    it('sets the sidebar header class', () => {
      expect(instance.mainClasses).toEqual('ui-sidebar-header');
    });

    it('appends any additional passed classes', () => {
      expect(classInstance.mainClasses).toEqual('ui-sidebar-header custom-class');
    });
  });

  describe('render', () => {
    it('renders a parent div', () => {
      expect(TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-sidebar-header')).toBeTruthy();
    });

    it('renders any children passed to it', () => {
      expect(TestUtils.findRenderedComponentWithType(instance, Textbox)).toBeTruthy();
    });
  });
});
