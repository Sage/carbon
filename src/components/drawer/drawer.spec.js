import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount as enzymeMount, shallow } from 'enzyme';
import Drawer from './drawer.component';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import guid from '../../utils/helpers/guid';
import {
  StyledDrawerSidebar,
  StyledDrawerContent,
  StyledDrawerChildren,
  StyledButton
} from './drawer.style';
import { noThemeSnapshot } from '../../__spec_helper__/enzyme-snapshot-helper';

jest.mock('../../utils/helpers/guid');
guid.mockImplementation(() => 'guid-123');

let container = null;

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

const mount = (jsx) => {
  return enzymeMount(jsx, { attachTo: container });
};

const render = (props, renderer = mount) => {
  return renderer(
    <Drawer { ...props }>
      content body content body content body content body content body content body content body
    </Drawer>
  );
};

const getElements = (wrapper) => {
  const cw = wrapper;

  if (!cw) {
    return {};
  }

  return {
    drawer: cw.find(Drawer),
    sidebar: cw.find(StyledDrawerSidebar),
    content: cw.find(StyledDrawerContent),
    children: cw.find(StyledDrawerChildren),
    button: cw.find(StyledButton)
  };
};

describe('Drawer', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    jest.useFakeTimers();
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  describe('uncontrolled', () => {
    it('matches snapshot', () => {
      const wrapper = render(defaultProps, shallow);
      expect(noThemeSnapshot(wrapper)).toMatchSnapshot();
    });

    it('cleans ups timers on unmount', () => {
      const wrapper = render();
      wrapper.unmount();
      expect(clearTimeout).toHaveBeenCalled();
    });

    it('correctly sets aria attribute', () => {
      const ariaLabel = 'test';
      const wrapper = render({ 'aria-label': ariaLabel });
      const { drawer } = getElements(wrapper);
      expect(drawer.prop('aria-label')).toBe(ariaLabel);
    });

    it('renders drawer component correctly', () => {
      const dataAttr = 'drawer';
      const wrapper = render({ 'data-component': dataAttr });
      const { drawer } = getElements(wrapper);
      expect(drawer.prop('data-component')).toBe(dataAttr);
    });

    it('Drawer Sidebar should render as expected', () => {
      const wrapper = render();
      const { sidebar } = getElements(wrapper);
      assertStyleMatch({
        overflow: 'auto'
      }, sidebar);
    });

    it('Drawer Content should render as expected', () => {
      const wrapper = render();
      const { children } = getElements(wrapper);
      assertStyleMatch({
        flex: '1',
        overflow: 'auto'
      }, children);
    });

    it('opens sidebar to specific width matching expandedWidth prop', () => {
      const expandedWidth = '50%';
      const wrapper = render({ expandedWidth });
      const { button, content } = getElements(wrapper);
      button.simulate('click');

      assertStyleMatch({
        width: expandedWidth
      }, content.childAt(0), { modifier: '&.open' });
    });

    it('one click on button opens drawer sidebar', () => {
      const wrapper = render();
      const { button } = getElements(wrapper);
      button.simulate('click');
      const { content } = getElements(wrapper);
      expect(content.childAt(0).hasClass('open')).toBeTruthy();
    });

    it('two clicks on button opens and then closes drawer sidebar', () => {
      const wrapper = render();
      let { button } = getElements(wrapper);
      button.simulate('click');
      let { content } = getElements(wrapper);
      expect(content.childAt(0).hasClass('open')).toBeTruthy();
      button = getElements(wrapper).button;
      button.simulate('click');
      content = getElements(wrapper).content;
      expect(content.childAt(0).hasClass('closed')).toBeTruthy();
    });

    it('sets class `open` on drawer that opened', () => {
      const wrapper = render();
      const { button } = getElements(wrapper);
      act(() => {
        button.simulate('click');
        jest.runAllTimers();
      });
      wrapper.update();
      const { content } = getElements(wrapper);
      expect(content.childAt(0).hasClass('open')).toBeTruthy();
    });

    it('sets class `closed` on drawer that closed', () => {
      const wrapper = render();
      const { button } = getElements(wrapper);
      act(() => {
        button.simulate('click');
        jest.runAllTimers();
      });
      wrapper.update();
      let { content } = getElements(wrapper);
      expect(content.childAt(0).hasClass('open')).toBeTruthy();

      act(() => {
        button.simulate('click');
        jest.runAllTimers();
      });
      wrapper.update();
      content = getElements(wrapper).content;
      expect(content.childAt(0).hasClass('closed')).toBeTruthy();
    });

    it('correctly renders opened drawer if defaultExpanded prop is true', () => {
      const defaultExpanded = true;
      const wrapper = render({ defaultExpanded });
      const { content } = getElements(wrapper);
      expect(content.childAt(0).hasClass('open')).toBeTruthy();
    });

    describe('invariant', () => {
      beforeEach(() => {
        jest.spyOn(global.console, 'error').mockImplementation(() => {});
      });

      afterEach(() => {
        global.console.error.mockReset();
      });

      it('throws if Drawer is changed from uncontrolled to controlled', () => {
        expect(() => {
          const wrapper = render({ expanded: undefined });
          wrapper.setProps({ expanded: true });
          wrapper.update();
        }).toThrow(
          'Drawer should not switch from uncontrolled to controlled (or vice versa). Decide between'
          + ' using a controlled or uncontrolled Drawer element for the lifetime of the component'
        );
      });
    });
  });

  describe('controlled', () => {
    it('sidebar is open when expanded prop is provided', () => {
      const wrapper = render({ expanded: true });
      const { content } = getElements(wrapper);
      assertStyleMatch({
        width: '40%'
      }, content.childAt(0), { modifier: '&.open' });
    });

    it('drawer changes to closed when button is clicked', () => {
      const wrapper = render({ expanded: true });
      const { button } = getElements(wrapper);
      button.simulate('click');
      const { content } = getElements(wrapper);

      assertStyleMatch({
        width: undefined
      }, content.childAt(0), { modifier: '&.closed' });
    });

    it('drawer changes to open when button is clicked', () => {
      const onChange = jest.fn();
      const wrapper = render({ expanded: false, onChange });
      const { button } = getElements(wrapper);
      button.simulate('click');
      const { content } = getElements(wrapper);

      assertStyleMatch({
        width: '40%'
      }, content.childAt(0), { modifier: '&.open' });
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('drawer opening sets timeout class', () => {
      const wrapper = render({ expanded: false, animationDuration: '500ms' });
      const { button } = getElements(wrapper);
      button.simulate('click');
      const { content } = getElements(wrapper);
      expect(content.childAt(0).hasClass('opening')).toBeTruthy();
    });

    it('sets `closing` class on drawer when close icon was clicked', () => {
      const wrapper = render({ expanded: true, animationDuration: '0.5s' });
      const { button } = getElements(wrapper);
      button.simulate('click');
      const { content } = getElements(wrapper);
      expect(content.childAt(0).hasClass('closing')).toBeTruthy();
    });

    it('sets animation speed to two seconds when string `numeric` value is given as a string', () => {
      const animationDuration = '2000';
      const wrapper = render({ expanded: true, animationDuration });
      const { button } = getElements(wrapper);
      button.simulate('click');
      const { content } = getElements(wrapper);
      expect(content.childAt(0).prop('animationDuration')).toBe(animationDuration);
    });

    it('sets animation speed to two seconds when string `ms` value is given as a string', () => {
      const animationDuration = '2000ms';
      const wrapper = render({ expanded: true, animationDuration });
      const { button } = getElements(wrapper);
      button.simulate('click');
      const { content } = getElements(wrapper);
      expect(content.childAt(0).prop('animationDuration')).toBe(animationDuration);
    });

    it('sets animation speed to two seconds when string `seconds` value is given as a string', () => {
      const animationDuration = '0.5s';
      const wrapper = render({ expanded: true, animationDuration });
      const { button } = getElements(wrapper);
      button.simulate('click');
      const { content } = getElements(wrapper);
      expect(content.childAt(0).prop('animationDuration')).toBe(animationDuration);
    });

    describe('invariant', () => {
      beforeEach(() => {
        jest.spyOn(global.console, 'error').mockImplementation(() => {});
      });

      afterEach(() => {
        global.console.error.mockReset();
      });

      it('throws if Drawer is changed from controlled to uncontrolled', () => {
        expect(() => {
          const wrapper = render({ expanded: true });
          wrapper.setProps({ expanded: undefined });
          wrapper.update();
        }).toThrow(
          'Drawer should not switch from uncontrolled to controlled (or vice versa). Decide between'
          + ' using a controlled or uncontrolled Drawer element for the lifetime of the component'
        );
      });
    });
  });
});
