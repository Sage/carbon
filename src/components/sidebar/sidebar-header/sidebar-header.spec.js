import React from 'react';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components';
import SidebarHeader from './sidebar-header.component';
import SidebarHeaderStyle from './sidebar-header.style';
import Textbox from '../../textbox/textbox';
import classicTheme from '../../../style/themes/classic';

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

describe('SidebarHeaderStyle', () => {
  let wrapper;

  it('should render base sidebar header', () => {
    wrapper = mount(<SidebarHeaderStyle />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('when classic theme is provided to the component', () => {
    wrapper = mount(<SidebarHeaderStyle theme={ classicTheme } />);
    it('should render correct style', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
