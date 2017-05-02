import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import SidebarHeader from './sidebar-header';
import Textbox from './../../textbox';
import { shallow } from 'enzyme';
import { rootTagTest } from '../../../utils/helpers/tags/tags-specs';

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
      expect(instance.mainClasses).toEqual('carbon-sidebar-header');
    });

    it('appends any additional passed classes', () => {
      expect(classInstance.mainClasses).toEqual('carbon-sidebar-header custom-class');
    });
  });

  describe('render', () => {
    it('renders a parent div', () => {
      expect(TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-sidebar-header')).toBeTruthy();
    });

    it('renders any children passed to it', () => {
      expect(TestUtils.findRenderedComponentWithType(instance, Textbox)).toBeTruthy();
    });
  });

  describe("tags on component", () => {
    let wrapper = shallow(<SidebarHeader data-element='bar' data-role='baz' />);

    it('include correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'sidebar-header', 'bar', 'baz');
    });
  });
});
