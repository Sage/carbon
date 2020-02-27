import React from 'react';
import { act } from 'react-dom/test-utils';
import 'jest-styled-components';
import { shallow, mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import Icon from 'components/icon';
import Help from './help.component';
import { rootTagTest } from '../../utils/helpers/tags/tags-specs';
import classicTheme from '../../style/themes/classic';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import StyledHelp from './help.style';
import Tooltip from '../tooltip';
import StyledIcon from '../icon/icon.style';

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

    it('passes the type if provided', () => {
      const mockType = 'info';
      wrapper = renderHelp({ type: mockType });
      icon = wrapper.find(Icon);
      expect(icon.props().type).toBe(mockType);
    });

    it('check the default type if not provided', () => {
      const mockType = 'help';
      wrapper = renderHelp();
      icon = wrapper.find(Icon);
      expect(icon.props().type).toBe(mockType);
    });

    it('renders a link when the href if provided', () => {
      const mockHref = 'href';
      wrapper = renderHelp({ href: mockHref }, mount);
      expect(wrapper.find('a').exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('tags on component', () => {
    const tagsWrapper = renderHelp({ 'data-element': 'bar', 'data-role': 'baz' });

    it('include correct component, element and role data tags', () => {
      rootTagTest(tagsWrapper, 'help', 'bar', 'baz');
    });
  });

  it('calls preventDefault to prevent clicking interacting with the input', () => {
    wrapper = renderHelp({}, mount);
    const preventDefault = jest.fn();
    wrapper.simulate('click', { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
  });

  describe('when the Help component is focused', () => {
    beforeEach(() => {
      wrapper = renderHelp({}, mount);
      wrapper.find(StyledHelp).simulate('focus');
    });

    it('the tooltip should be rendered', () => {
      expect(wrapper.update().find(Tooltip).exists()).toBe(true);
    });

    describe('and then the Help component is blurred', () => {
      it('the tooltip should not be rendered', () => {
        expect(wrapper.update().find(Tooltip).exists()).toBe(true);
        wrapper.find(StyledHelp).simulate('blur');
        expect(wrapper.update().find(Tooltip).exists()).toBe(false);
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });
  });

  describe('when a key is pressed when the tooltip is open', () => {
    const escapeKeyDownEvent = new KeyboardEvent('keydown', { which: 27, bubbles: true });
    const enterKeyDownEvent = new KeyboardEvent('keydown', { which: 13, bubbles: true });
    let domNode;

    beforeEach(() => {
      act(() => {
        wrapper = mount(<div><Help>mock message</Help></div>);
      });
      domNode = wrapper.getDOMNode();
      document.body.appendChild(domNode);
      wrapper.find(StyledHelp).simulate('focus');
    });

    describe("and it's the Esc key", () => {
      it('the tooltip should not be rendered', () => {
        expect(wrapper.update().find(Tooltip).exists()).toBe(true);
        act(() => {
          domNode.dispatchEvent(escapeKeyDownEvent);
        });
        expect(wrapper.update().find(Tooltip).exists()).toBe(false);
      });
    });

    describe("and it's a key other than the Esc", () => {
      it('the tooltip should be rendered', () => {
        expect(wrapper.update().find(Tooltip).exists()).toBe(true);
        act(() => {
          domNode.dispatchEvent(enterKeyDownEvent);
        });
        expect(wrapper.update().find(Tooltip).exists()).toBe(true);
      });
    });

    afterEach(() => {
      document.body.removeChild(domNode);
    });
  });
});

describe('StyledHelp', () => {
  describe('when the Classic Theme is selected', () => {
    it('renders proper icon color', () => {
      const wrapper = mount(
        <ThemeProvider theme={ classicTheme }>
          <Help>Helpful Content</Help>
        </ThemeProvider>
      );

      assertStyleMatch({
        color: '#8099A4'
      }, wrapper.find(Help), { modifier: `${StyledIcon}` });
    });
  });
});

function renderHelp(props, renderer = shallow) {
  return renderer(<Help { ...props }>Helpful Content</Help>);
}
