import React from 'react';
import { shallow } from 'enzyme';
import SidebarHeader from './sidebar-header.component';
import Textbox from '../../textbox/textbox';

describe('Sidebar Header', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <SidebarHeader>
        <Textbox />
      </SidebarHeader>
    );
  });

  describe('render', () => {
    it('should render child', () => {
      expect(wrapper.find(Textbox)).toBeTruthy();
    });
  });

  describe('tags on component', () => {
    it('include correct component, element and role data tags', () => {
      wrapper.setProps({ 'data-element': 'bar', 'data-role': 'baz' });
    });
  });
});
