import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { ThemeProvider } from 'styled-components';
import TestRenderer from 'react-test-renderer';
import { mount as enzymeMount } from 'enzyme';
import { simulate, assertStyleMatch } from '../../__spec_helper__/test-utils';
import mintTheme from '../../style/themes/mint';
import classic from '../../style/themes/classic';
import { noThemeSnapshot } from '../../__spec_helper__/enzyme-snapshot-helper';

import {
  ActionPopover, ActionPopoverDivider, ActionPopoverItem, ActionPopoverMenu
} from './index';
import {
  MenuButton, MenuItemFactory, Menu, SubMenuItemIcon
} from './action-popover.style';
import { rootTagTest } from '../../utils/helpers/tags/tags-specs';
import Icon from '../icon';
import guid from '../../utils/helpers/guid';

jest.mock('../../utils/helpers/guid');
guid.mockImplementation(() => 'guid-12345');
jest.useFakeTimers();

describe('ActionPopover', () => {
  const container = { current: null };
  const wrapper = { current: null };

  const mount = (jsx) => {
    wrapper.current = enzymeMount(jsx, { attachTo: container.current });
  };

  const DOM = (jsx) => {
    ReactDOM.render(jsx, container.current);
  };

  const onClick = jest.fn();
  const onOpen = jest.fn();
  const onClose = jest.fn();
  const onClickWrapper = arg => () => onClick(arg);

  function render(props = {}, renderer = mount) {
    const defaultProps = {
      children: [
        <ActionPopoverItem
          icon='pdf'
          { ...{ onClick: onClickWrapper('pdf') } }
          disabled
        >
          Download PDF
        </ActionPopoverItem>,
        <ActionPopoverItem icon='email' { ...{ onClick: onClickWrapper('email') } }>Email Invoice</ActionPopoverItem>,
        <ActionPopoverItem icon='print' { ...{ onClick: onClickWrapper('print') } }>Print Invoice</ActionPopoverItem>,
        <ActionPopoverDivider />,
        <ActionPopoverItem icon='csv' { ...{ onClick: onClickWrapper('csv') } }>Download CSV</ActionPopoverItem>,
        null,
        undefined
      ],
      onOpen,
      onClose,
      ...props
    };

    renderer(
      <ThemeProvider theme={ mintTheme }>
        <React.Fragment>
          <input id='before' />
          <ActionPopover { ...defaultProps } { ...props } />
          <input id='after' />
        </React.Fragment>
      </ThemeProvider>
    );
  }

  function renderWithSubmenu(props = {}, renderer = mount) {
    const submenu = (
      <ActionPopoverMenu>
        <ActionPopoverItem
          key='0'
          { ...{ onClick: onClickWrapper('sub menu 1') } }
        >
          Sub Menu 1
        </ActionPopoverItem>
        <ActionPopoverItem
          key='1'
          { ...{ onClick: onClickWrapper('sub menu 2') } }
        >
          Sub Menu 2
        </ActionPopoverItem>
      </ActionPopoverMenu>
    );

    const defaultProps = {
      children: [
        <ActionPopoverItem
          disabled
          icon='pdf'
          { ...{ onClick: onClickWrapper('pdf') } }
        >
          Download PDF
        </ActionPopoverItem>,
        <ActionPopoverItem
          icon='email'
          submenu={ submenu }
          { ...{ onClick: onClickWrapper('email') } }
        >
          Email Invoice
        </ActionPopoverItem>,
        <ActionPopoverItem icon='print' { ...{ onClick: onClickWrapper('print') } }>Print Invoice</ActionPopoverItem>,
        <ActionPopoverDivider />,
        <ActionPopoverItem
          icon='csv'
          { ...{ onClick: onClickWrapper('csv') } }
        >Download CSV
        </ActionPopoverItem>,
        null,
        undefined
      ],
      ...props
    };

    renderer(
      <ThemeProvider theme={ mintTheme }>
        <React.Fragment>
          <input id='before' />
          <ActionPopover { ...defaultProps } { ...props } />
          <input id='after' />
        </React.Fragment>
      </ThemeProvider>
    );
  }

  function getElements() {
    const cw = wrapper.current;
    if (cw) {
      return {
        items: cw.find(ActionPopoverItem),
        menubutton: cw.find(MenuButton),
        menu: cw.find(Menu),
        divider: cw.find(ActionPopoverDivider)
      };
    }
    const button = document.querySelector('div[id^=ActionPopoverButton]');
    const icon = button.querySelector('span[data-component=icon');
    return { button, icon };
  }

  beforeEach(() => {
    container.current = document.createElement('div');
    document.body.appendChild(container.current);
    onClick.mockReset();
    onOpen.mockReset();
    onClose.mockReset();
  });


  afterEach(() => {
    document.body.removeChild(container.current);
    container.current = null;
    if (wrapper.current) {
      wrapper.current.unmount();
      wrapper.current = null;
    }
  });

  it('renders in ReactDOM', () => {
    render(null, DOM);
  });

  it('displays the horizontal ellipsis icon as the menu button', () => {
    render();
    const { menubutton } = getElements();
    const icon = menubutton.find(Icon).first();
    expect(icon.prop('type')).toBe('ellipsis_vertical');
  });

  it('has proper data attributes applied to elements', () => {
    render();
    const { menubutton, menu, divider } = getElements();
    rootTagTest(menubutton, 'action-popover-button');
    rootTagTest(menu, 'action-popover');
    expect(divider.getDOMNode().getAttribute('data-element')).toBe('action-popover-divider');
  });

  it('has a default aria-label', () => {
    render();
    const { menubutton } = getElements();
    expect(menubutton.prop('aria-label')).toBe('actions');
  });

  it('renders with the menu closed by default', () => {
    render();
    const { menu } = getElements();
    assertStyleMatch({
      visibility: 'hidden'
    }, menu);
    expect(onOpen).not.toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalledTimes(1);
  });

  it('renders when there is no onOpen, onClose provided', () => {
    expect(() => {
      render({ onOpen: undefined, onClose: undefined });
      const { menubutton } = getElements();
      menubutton.simulate('click');
      menubutton.simulate('click');
    }).not.toThrow();
  });

  describe.each([
    ['Click handlers', 'Clicking', item => item.simulate('click')],
    ['Keypress handlers', 'Pressing Enter', item => simulate.keydown.pressEnter(item)]
  ])('%s', (group, prefix, mutator) => {
    beforeEach(() => {
      render();
      const { menubutton } = getElements();

      menubutton.simulate('click');
    });
    describe('MenuItem', () => {
      beforeEach(() => {
        const { items } = getElements();

        mutator(items.at(2));
      });
      it(`${prefix} calls the onClick handler`, () => {
        expect(onClick).toHaveBeenCalledWith('print');
      });

      it(`${prefix} closes the menu`, () => {
        const { menu } = getElements();

        assertStyleMatch({
          visibility: 'hidden'
        }, menu);
        expect(onClose).toHaveBeenCalledTimes(1);
      });

      it(`${prefix} focuses the Menubutton`, () => {
        const { menubutton } = getElements();

        expect(menubutton).toBeFocused();
      });
    });
    describe('MenuItem (disabled)', () => {
      beforeEach(() => {
        const { items } = getElements();

        mutator(items.at(0));
      });
      it(`${prefix} does not call the onClick handler`, () => {
        expect(onClick).not.toHaveBeenCalled();
      });

      it(`${prefix} does not close the menu`, () => {
        const { menu } = getElements();

        assertStyleMatch({
          display: 'block'
        }, menu);
        expect(onClose).not.toHaveBeenCalled();
      });

      it(`${prefix} does not focus the Menubutton`, () => {
        const { menubutton } = getElements();

        expect(menubutton).not.toBeFocused();
      });
    });
  });

  describe('Click handlers', () => {
    describe('MenuButton', () => {
      let stopPropagation;
      beforeEach(() => {
        render();
        const { menubutton } = getElements();
        stopPropagation = jest.fn();
        menubutton.simulate('click', { stopPropagation });
      });
      it('Clicking opens the menu', () => {
        const { menu } = getElements();
        assertStyleMatch({
          display: 'block'
        }, menu);
        expect(onOpen).toHaveBeenCalledTimes(1);
      });

      it('Clicking on menu button does not allow for further event propagation ', () => {
        expect(stopPropagation).toHaveBeenCalled();
      });

      it('Clicking focuses the first element', () => {
        const { items } = getElements();

        expect(items.at(0)).toBeFocused();
      });

      it('Clicking closes the menu', () => {
        const { menubutton } = getElements();
        act(() => {
          menubutton.simulate('click');
        });

        act(() => {
          wrapper.current.update();
        });
        const { menu } = getElements();
        assertStyleMatch({
          visibility: 'hidden'
        }, menu);
        expect(onClose).toHaveBeenCalledTimes(1);
      });
    });

    describe('document', () => {
      it('Clicking on the component does not close the menu using the document listener', () => {
        // This test doesn't really replicate the functionality but it is useful to check that the document listener
        // is filtering based on what element is clicked
        // In a normal situation the React SyntheticEvent will bubble and trigger a handler which will close the menu
        // This triggers a DOMEvent bypassing the SyntheticEvent listeners
        render();
        const { menubutton, items } = getElements();

        menubutton.simulate('click');

        act(() => {
          document.dispatchEvent(new CustomEvent('click', {
            detail: {
              enzymeTestingTarget: items.first().getDOMNode()
            }
          }));
        });

        act(() => {
          wrapper.current.update();
        });

        const { menu } = getElements();
        assertStyleMatch({
          display: 'block'
        }, menu);
        expect(onClose).toHaveBeenCalledTimes(0);
      });

      it('Clicking elsewhere on the document closes the menu', () => {
        render();
        const { menubutton } = getElements();

        menubutton.simulate('click');

        act(() => {
          document.dispatchEvent(new CustomEvent('click', {
            detail: {
              enzymeTestingTarget: document.body
            }
          }));
        });

        act(() => {
          wrapper.current.update();
        });

        const { menu } = getElements();
        assertStyleMatch({
          visibility: 'hidden'
        }, menu);
        expect(onClose).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Keypress handlers', () => {
    describe('MenuButton', () => {
      it.each(
        ['DownArrow', 'Space', 'Enter', 'UpArrow']
      )('Pressing %s key opens the menu', (key) => {
        render();
        const { menubutton } = getElements();

        simulate.keydown[`press${key}`](menubutton);

        const { menu } = getElements();
        assertStyleMatch({
          display: 'block'
        }, menu);
        expect(onOpen).toHaveBeenCalledTimes(1);
      });

      it.each(
        ['DownArrow', 'Space', 'Enter']
      )('Pressing %s key selects the first item', (key) => {
        render();
        const { menubutton, items } = getElements();

        simulate.keydown[`press${key}`](menubutton);

        expect(items.first()).toBeFocused();
      });

      it('Pressing UpArrow selects the last item', () => {
        render();
        const { menubutton, items } = getElements();

        simulate.keydown.pressUpArrow(menubutton);

        expect(items.last()).toBeFocused();
      });
    });

    describe('MenuItem', () => {
      it.each([
        ['Tab', item => simulate.keydown.pressTab(item)],
        ['Shift+Tab', (item) => {
          simulate.keydown.pressTab(item, { shiftKey: true });

          act(() => {
            jest.runAllTimers();
          });

          act(() => {
            wrapper.current.update();
          });
        }],
        ['Escape', item => simulate.keydown.pressEscape(item)]
      ])('Pressing %s key closes the menu', (key, mutator) => {
        render();
        const { menubutton } = getElements();
        simulate.keydown.pressDownArrow(menubutton);
        const { items } = getElements();

        mutator(items.first());

        const { menu } = getElements();

        assertStyleMatch({
          visibility: 'hidden'
        }, menu);
        expect(onClose).toHaveBeenCalledTimes(1);
        // FIXME: Test pressing Tab moves focus to the next element
        // FIXME: Test pressing Shift+Tab moves focus to the previous element
        // It's not possible to test this in enzyme because JSDOM does not support user events. It's also not
        // possible to test it in cypress because cypress uses synthetic events. We should add a test for this when
        // support for native events is implemented in cypress https://github.com/cypress-io/cypress/issues/311
      });

      it('Pressing Escape focuses the MenuButton', () => {
        render();
        const { menubutton } = getElements();
        simulate.keydown.pressDownArrow(menubutton);
        const { items } = getElements();

        simulate.keydown.pressEscape(items.first());

        expect(menubutton).toBeFocused();
      });

      it.each([
        ['Down', 'next', '', (items) => {
          simulate.keydown.pressDownArrow(items.first());
          expect(items.at(1)).toBeFocused();

          simulate.keydown.pressDownArrow(items.at(1));
          expect(items.at(2)).toBeFocused();

          simulate.keydown.pressDownArrow(items.at(2));
          expect(items.at(3)).toBeFocused();

          simulate.keydown.pressDownArrow(items.at(3));
          expect(items.at(0)).toBeFocused();
          // we're checking that we can focus the disabled item, this is intentional behaviour
          expect(items.at(0).prop('disabled')).toBe(true);
          expect(items.at(0).getDOMNode().getAttribute('aria-disabled')).toBe('true');
        }],
        ['Down', 'first', 'if the focus on the last item', (items) => {
          simulate.keydown.pressEnd(items.first());
          expect(items.last()).toBeFocused();

          simulate.keydown.pressDownArrow(items.last());
          expect(items.first()).toBeFocused();
        }],
        ['Up', 'previous', '', (items) => {
          simulate.keydown.pressDownArrow(items.first());
          simulate.keydown.pressDownArrow(items.at(1));
          simulate.keydown.pressDownArrow(items.at(2));

          simulate.keydown.pressUpArrow(items.at(3));
          expect(items.at(2)).toBeFocused();

          simulate.keydown.pressUpArrow(items.at(2));
          expect(items.at(1)).toBeFocused();

          simulate.keydown.pressUpArrow(items.at(1));
          expect(items.first()).toBeFocused();
        }],
        ['Up', 'last', 'if the focus is on the first item', (items) => {
          simulate.keydown.pressUpArrow(items.first());

          expect(items.last()).toBeFocused();
        }],
        ['Home', 'first', '', (items) => {
          simulate.keydown.pressDownArrow(items.first());

          simulate.keydown.pressHome(items.at(1));

          expect(items.first()).toBeFocused();
        }],
        ['End', 'first', '', (items) => {
          simulate.keydown.pressEnd(items.first());

          expect(items.last()).toBeFocused();
        }]
      ])('Pressing %s focuses the %s item %s', (key, direction, condition, mutator) => {
        render();
        const { menubutton } = getElements();
        simulate.keydown.pressDownArrow(menubutton);
        const { items } = getElements();

        mutator(items);
      });

      it('Pressing Space does nothing', () => {
        render();
        const { menubutton } = getElements();
        simulate.keydown.pressDownArrow(menubutton);
        const { items } = getElements();

        simulate.keydown.pressSpace(items.at(0));

        const { menu } = getElements();
        expect(items.at(0)).toBeFocused();
        assertStyleMatch({
          display: 'block'
        }, menu);
      });

      it('Pressing a-z selects the next item in the list starting with the letter that was pressed', () => {
        render();
        const { menubutton } = getElements();
        simulate.keydown.pressDownArrow(menubutton);
        const { items } = getElements();

        // moves to first element starting with P
        simulate.keydown.pressP(items.first());
        expect(items.at(2)).toBeFocused();

        // moves to first element starting with D
        simulate.keydown.pressD(items.at(2));
        expect(items.at(3)).toBeFocused();


        // moves to next element starting with D, it loops to the start
        // we're checking that we can focus the disabled item, this is intentional behaviour
        simulate.keydown.pressD(items.at(3));
        expect(items.at(0)).toBeFocused();
        expect(items.at(0).prop('disabled')).toBe(true);
        expect(items.at(0).getDOMNode().getAttribute('aria-disabled')).toBe('true');

        // does nothing when there are no matches
        simulate.keydown.pressZ(items.at(0));
        expect(items.at(0)).toBeFocused();

        // does nothing when a number key is pressed
        simulate.keydown.press1(items.at(0));
        expect(items.at(0)).toBeFocused();
      });
    });
  });

  describe('styles', () => {
    it('renders the button with a white background when the menu is open', () => {
      render();

      const { menubutton } = getElements();

      expect(menubutton).not.toHaveStyleRule('background-color');

      simulate.keydown.pressDownArrow(menubutton);

      expect(getElements().menubutton).toHaveStyleRule('background-color', mintTheme.colors.white);
    });

    it('renders correctly for the "classic" theme', () => {
      const MenuStyle = TestRenderer.create(<Menu theme={ classic } />);
      expect(MenuStyle).toMatchSnapshot();

      const MenuItem = MenuItemFactory(({ className }) => <div className={ className } />);
      const MenuItemStyle = TestRenderer.create(<MenuItem theme={ classic } />);
      expect(MenuItemStyle).toMatchSnapshot();

      const MenuButtonStyle = TestRenderer.create(<MenuButton theme={ classic } />);
      expect(MenuButtonStyle).toMatchSnapshot();
    });

    it('MenuButton has proper color when open on "classic" theme', () => {
      const MenuButtonStyle = TestRenderer.create(<MenuButton theme={ classic } isOpen />);
      assertStyleMatch(
        { color: '#255BC7' },
        MenuButtonStyle.toJSON(),
        { modifier: '> span' }
      );
    });

    it.each(['chevron_left', 'chevron_right'])(
      'MenuButton has proper color when open on "classic" theme', (type) => {
        const StyledSubMenuIcon = TestRenderer.create(<SubMenuItemIcon theme={ classic } type={ type } />);
        const key = type === 'chevron_left' ? 'left' : 'right';
        assertStyleMatch(
          { [key]: '-6px' },
          StyledSubMenuIcon.toJSON(),
        );
      }
    );
  });

  describe('submenu', () => {
    describe('left aligned', () => {
      beforeEach(() => renderWithSubmenu());

      it('renders an icon to indicate when a item has a submenu and is left aligned', () => {
        const { items } = getElements();
        const item = items.at(1);
        const submenuIcon = item.find(SubMenuItemIcon);
        assertStyleMatch({
          left: '0px'
        }, submenuIcon);
        expect(submenuIcon.props().type).toEqual('chevron_left');
      });

      it('opens the submenu on mouseenter', () => {
        const { items } = getElements();
        const item = items.at(1);
        act(() => {
          item.simulate('mouseenter');
          jest.runAllTimers();
        });
        expect(noThemeSnapshot(item.find(ActionPopoverMenu))).toMatchSnapshot();
      });

      it('closes the submenu on mouseleave event', () => {
        const { items } = getElements();
        const item = items.at(1);
        act(() => {
          item.simulate('mouseenter');
          item.simulate('mouseleave');
          jest.runAllTimers();
        });
        expect(noThemeSnapshot(item.find(ActionPopoverMenu))).toMatchSnapshot();
      });

      it('opens the submenu when left key is pressed', () => {
        const { items } = getElements();
        const item = items.at(1);
        act(() => { simulate.keydown.pressLeftArrow(item); });
        expect(noThemeSnapshot(item.find(ActionPopoverMenu))).toMatchSnapshot();
      });

      it('closes the submenu when right key is pressed', () => {
        const { items } = getElements();
        const item = items.at(1);
        act(() => {
          simulate.keydown.pressLeftArrow(item);
          simulate.keydown.pressRightArrow(item);
        });
        expect(noThemeSnapshot(item.find(ActionPopoverMenu))).toMatchSnapshot();
      });

      it('does not call the onClick prop if an item has a submenu and enter key pressed', () => {
        const { items } = getElements();
        const item = items.at(1);
        act(() => { simulate.keydown.pressEnter(item); });
        expect(onClick).not.toHaveBeenCalled();
      });

      it('does not call the onClick prop if an item has a submenu and item clicked', () => {
        const { items } = getElements();
        const item = items.at(1);
        act(() => { item.simulate('click'); });
        expect(onClick).not.toHaveBeenCalled();
      });

      it('closes the submenu when a submenu item is clicked', () => {
        const { items } = getElements();
        const item = items.at(1);
        const submenu = item.find(ActionPopoverMenu);
        act(() => { submenu.props().onClick(); });
        assertStyleMatch({
          visibility: 'hidden'
        }, submenu);
        expect(submenu.props().isOpen).toEqual(false);
      });

      it('closes the submenu when the escape key is pressed', () => {
        const { items } = getElements();
        const item = items.at(1);
        const submenu = item.find(ActionPopoverMenu);
        const submenuItem = submenu.find(ActionPopoverItem).at(0);
        act(() => {
          simulate.keydown.pressLeftArrow(item);
          simulate.keydown.pressEscape(submenuItem);
        });
        assertStyleMatch({
          visibility: 'hidden'
        }, submenu);
        expect(submenu.props().isOpen).toEqual(false);
      });
    });

    describe('right aligned', () => {
      beforeEach(() => {
        act(() => {
          // Mock the parent boundingRect
          Element.prototype.getBoundingClientRect = jest.fn(() => ({ left: -100, right: 200, top: 100 }));
          // Trigger the window resize event.
          global.dispatchEvent(new Event('resize'));
        });
        renderWithSubmenu();
      });

      it('renders an icon to indicate when a item has a submenu and is right aligned', () => {
        const { items } = getElements();
        const item = items.at(1);
        const submenuIcon = item.find(SubMenuItemIcon);
        assertStyleMatch({
          right: '0px'
        }, submenuIcon);
        expect(submenuIcon.props().type).toEqual('chevron_right');
      });

      it('opens the submenu when right key is pressed', () => {
        const { items } = getElements();
        const item = items.at(1);
        act(() => { simulate.keydown.pressRightArrow(item); });
        expect(noThemeSnapshot(item.find(ActionPopoverMenu))).toMatchSnapshot();
      });

      it('closes the submenu when left key is pressed', () => {
        const { items } = getElements();
        const item = items.at(1);
        act(() => {
          simulate.keydown.pressRightArrow(item);
          simulate.keydown.pressLeftArrow(item);
        });
        expect(noThemeSnapshot(item.find(ActionPopoverMenu))).toMatchSnapshot();
      });
    });

    it('validates the submenu prop', () => {
      jest.spyOn(global.console, 'error').mockImplementation(() => {});
      ReactDOM.render(
        <ThemeProvider theme={ mintTheme }>
          <ActionPopover>
            <ActionPopoverItem
              submenu={ <p>foo</p> } icon='pdf'
              onClick={ jest.fn() }
            >item
            </ActionPopoverItem>
          </ActionPopover>
        </ThemeProvider>, container.current
      );
      expect(console.error).toHaveBeenCalledWith('Warning: Failed prop type: `WithTheme(ActionPopoverItem)` only'
      + ' accepts submenu of type `ActionPopoverMenu`\n    in WithTheme(ActionPopoverItem)');
      global.console.error.mockReset();
    });
  });

  it('validates the children prop', () => {
    jest.spyOn(global.console, 'error').mockImplementation(() => {});
    ReactDOM.render(
      <ThemeProvider theme={ mintTheme }>
        <ActionPopover><p>invalid children</p></ActionPopover>
      </ThemeProvider>, container.current
    );
    expect(console.error).toHaveBeenCalledWith('Warning: Failed prop type: `ActionPopover` only accepts children of'
    + ' type `WithTheme(ActionPopoverItem)` and `ActionPopoverDivider`.\n    in ActionPopover');
    global.console.error.mockReset();
  });
});
