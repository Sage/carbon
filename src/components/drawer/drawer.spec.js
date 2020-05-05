import React from 'react';
import { mount } from 'enzyme';
import Drawer from './drawer.component';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import {
  StyledDrawerSidebar,
  StyledDrawerContent,
  StyledDrawerChildren,
  StyledButton
} from './drawer.style';

const defaultProps = {
  expandedWidth: '20%',
  animationDuration: '0.5s',
  sidebar: (
    <ul>
      <li>link a</li>
      <li>link b</li>
      <li>link c</li>
    </ul>
  )
};

const render = (props, renderer = mount) => {
  return renderer(
    <Drawer { ...props }>
      content body content body content body content body content body content body content body
    </Drawer>
  );
};

describe('Drawer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(defaultProps);
  });

  describe('uncontrolled', () => {
    it('Drawer Sidebar should render as expected', () => {
      assertStyleMatch({
        overflow: 'auto'
      }, wrapper.find(StyledDrawerSidebar));
    });

    it('Drawer Content should render as expected', () => {
      assertStyleMatch({
        flex: '1',
        overflow: 'auto'
      }, wrapper.find(StyledDrawerChildren));
    });

    it('opens sidebar to specific width matching expandedWidth prop', () => {
      const expandedWidth = '50%';
      wrapper = render({ expandedWidth });

      wrapper.find(StyledButton).simulate('click');

      assertStyleMatch({
        width: expandedWidth
      }, wrapper.find(StyledDrawerContent).childAt(0), { modifier: '&.open' });
    });

    it('one click on button opens drawer sidebar', () => {
      wrapper.find(StyledButton).simulate('click');
      expect(wrapper.find(StyledDrawerContent).childAt(0).hasClass('open')).toBeTruthy();
    });

    it('two clicks on button opens and then closes drawer sidebar', () => {
      wrapper.find(StyledButton).simulate('click');
      expect(wrapper.find(StyledDrawerContent).childAt(0).hasClass('open')).toBeTruthy();
      wrapper.find(StyledButton).simulate('click');
      expect(wrapper.find(StyledDrawerContent).childAt(0).hasClass('closed')).toBeTruthy();
    });
  });

  describe('controlled', () => {
    it('sidebar is open when expanded prop is provided', () => {
      wrapper = render({ expanded: true });

      assertStyleMatch({
        width: '40%'
      }, wrapper.find(StyledDrawerContent).childAt(0), { modifier: '&.open' });
    });

    it('drawer changes to closed when button is clicked', () => {
      wrapper = render({ expanded: true });

      wrapper.find(StyledButton).simulate('click');

      assertStyleMatch({
        width: undefined
      }, wrapper.find(StyledDrawerContent).childAt(0), { modifier: '&.closed' });
    });

    it('drawer changes to open when button is clicked', () => {
      const onChange = jest.fn();
      wrapper = render({ expanded: false, onChange });

      wrapper.find(StyledButton).simulate('click');

      assertStyleMatch({
        width: '40%'
      }, wrapper.find(StyledDrawerContent).childAt(0), { modifier: '&.open' });
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });
});
