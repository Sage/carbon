import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import SidebarHeader from './sidebar-header.component';
import Textbox from '../../textbox/textbox';
import { rootTagTest } from '../../../utils/helpers/tags/tags-specs/tags-specs';

describe('Sidebar Header', () => {
  let instance, classInstance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <SidebarHeader>
        <Textbox />
      </SidebarHeader>
    );

    classInstance = TestUtils.renderIntoDocument(
      <SidebarHeader className='custom-class'>
        <Textbox />
      </SidebarHeader>
    );
  });

  describe('mainClasses', () => {
    it('appends any additional passed classes', () => {
      expect(classInstance.mainClasses).toEqual('custom-class');
    });
  });

  describe('render', () => {
    it('renders any children passed to it', () => {
      expect(TestUtils.findRenderedComponentWithType(instance, Textbox)).toBeTruthy();
    });
  });

  describe('tags on component', () => {
    const wrapper = shallow(<SidebarHeader data-element='bar' data-role='baz' />);

    it('include correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'sidebar-header', 'bar', 'baz');
    });
  });
});
