import React from 'react';
import 'jest-styled-components';
import { shallow, mount } from 'enzyme';
import Icon from 'components/icon';
import Help from './help.component';
import { rootTagTest } from '../../utils/helpers/tags/tags-specs';
import classicTheme from '../../style/themes/classic';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import StyledHelp from './help.style';

describe('Help', () => {
  let wrapper;

  describe('when custom classes are passed', () => {
    it('adds the custom classes', () => {
      wrapper = renderHelp({ className: 'fancy-pants' });
      expect(wrapper.hasClass('fancy-pants')).toBe(true);
    });
  });

  describe('render', () => {
    let icon;

    it('renders an icon with "help" type', () => {
      wrapper = renderHelp();
      icon = wrapper.find(Icon);
      expect(icon.props().type).toBe('help');
    });

    it('passes the children as a prop', () => {
      const mockMessage = 'Help Message';
      wrapper = shallow(<Help>{ mockMessage }</Help>);
      icon = wrapper.find(Icon);
      expect(icon.props().tooltipMessage).toBe(mockMessage);
    });

    it('passes the tooltipPosition if provided', () => {
      const mockPosition = 'right';
      wrapper = renderHelp({ tooltipPosition: mockPosition });
      icon = wrapper.find(Icon);
      expect(icon.props().tooltipPosition).toBe(mockPosition);
    });

    it('passes the pointerAlign if provided', () => {
      const mockAlignment = 'left';
      wrapper = renderHelp({ tooltipAlign: mockAlignment });
      icon = wrapper.find(Icon);
      expect(icon.props().tooltipAlign).toBe(mockAlignment);
    });

    it('renders a link when the href if provided', () => {
      const mockHref = 'href';
      wrapper = renderHelp({ href: mockHref }, mount);
      expect(wrapper.find('a').exists()).toBe(true);
    });
  });

  describe('tags on component', () => {
    const tagsWrapper = renderHelp({ 'data-element': 'bar', 'data-role': 'baz' });

    it('include correct component, element and role data tags', () => {
      rootTagTest(tagsWrapper, 'help', 'bar', 'baz');
    });
  });
});

describe('StyledHelp', () => {
  describe('when the Classic Theme is selected', () => {
    it('renders proper icon color', () => {
      const wrapper = mount(<StyledHelp theme={ classicTheme } />);

      assertStyleMatch({
        color: 'rgba(0,0,0,0.85)'
      }, wrapper);
    });
  });
});

function renderHelp(props, renderer = shallow) {
  return renderer(<Help { ...props }>Helpful Content</Help>);
}
