import React from 'react';
import { shallow, mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import SplitButton from './split-button.component';
import StyledSplitButtonChildrenContainer from './split-button-children.style';
import Icon from '../icon';
import Button from '../button';
import StyledButton from '../button/button.style';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';
import ClassicTheme from '../../style/themes/classic';
import SmallTheme from '../../style/themes/small';
import MediumTheme from '../../style/themes/medium';
import LargeTheme from '../../style/themes/large';
import {
  assertStyleMatch,
  keyboard
} from '../../__spec_helper__/test-utils';
import 'jest-styled-components';
import guid from '../../utils/helpers/guid';
import StyledSplitButtonToggle from './split-button-toggle.style';

jest.mock('../../utils/helpers/guid');
guid.mockImplementation(() => 'guid-12345');

const sizes = ['small', 'medium', 'large'];

const businessThemes = [
  ['small', SmallTheme],
  ['medium', MediumTheme],
  ['large', LargeTheme]
];

const themes = [
  ['classic', ClassicTheme],
  ...businessThemes
];

const singleButton = <Button key='testKey'>Single Button</Button>;
const multipleButtons = [
  <Button key='testKey1'>Extra Button</Button>,
  <Button key='testKey2'>Extra Button</Button>,
  <Button key='testKey3'>Extra Button</Button>
];

const render = (mainProps = {}, childButtons = singleButton, renderer = shallow) => {
  return renderer(
    <SplitButton
      { ...mainProps }
      text='Split button'
      data-element='bar'
      data-role='baz'
    >
      { childButtons }
    </SplitButton>
  );
};

const renderWithTheme = (mainProps = {}, childButtons = singleButton, renderer = shallow) => {
  return renderer(
    <ThemeProvider theme={ mainProps.carbonTheme }>
      <SplitButton
        { ...mainProps }
        text='Split button'
        data-element='bar'
        data-role='baz'
      >
        { childButtons }
      </SplitButton>
    </ThemeProvider>
  );
};

const buildSizeConfig = (name, size) => {
  const sizeObj = {};
  sizeObj.fontSizze = size === 'large' ? '16px' : '14px';
  if (size === 'small') {
    sizeObj.height = '32px';
    sizeObj.padding = '16px';
  } else if (size === 'medium') {
    sizeObj.height = '40px';
    sizeObj.padding = '24px';
  } else if (size === 'large') {
    sizeObj.height = '48px';
    sizeObj.padding = '32px';
  }
  return sizeObj;
};

describe('SplitButton', () => {
  let wrapper, toggle;

  describe('render with custom className', () => {
    beforeEach(() => {
      wrapper = render();
      toggle = wrapper.find('[data-element="toggle-button"]');
    });

    it('sets default state', () => {
      expect(wrapper.instance().state.showAdditionalButtons).toEqual(false);
    });

    it('renders dropdown icon', () => {
      expect(
        toggle.contains(
          <Icon type='dropdown' />
        )
      ).toBeTruthy();
    });

    afterEach(() => {
      wrapper.unmount();
    });
  });

  describe('keyboard accessibility of additional buttons', () => {
    describe.each(themes)(
      'when "up" key is pressed and the theme is set to "%s"',
      (name, theme) => {
        it('matches the expected style for the button indexed', () => {
          const wrapper2 = renderWithTheme({ carbonTheme: theme }, multipleButtons, mount).find(SplitButton);

          wrapper2.instance().showButtons();
          const { additionalButtons } = wrapper2.instance();

          for (let index = additionalButtons.length - 1; index >= 0; index--) {
            const button = additionalButtons[index];
            keyboard.pressUpArrow();
            expect(wrapper2.instance().isActiveElement(button)).toEqual(true);
          }
          wrapper2.instance().hideButtons();
        });
      }
    );

    describe.each(themes)(
      'when "down" key is pressed and the theme is set to "%s"',
      (_, theme) => {
        it('matches the expected style for the button indexed', () => {
          const wrapper3 = renderWithTheme({ carbonTheme: theme }, multipleButtons, mount).find(SplitButton);
          wrapper3.instance().showButtons();
          const { additionalButtons } = wrapper3.instance();

          for (let index = 0; index <= additionalButtons.length; index++) {
            keyboard.pressDownArrow();
            const button = index < additionalButtons.length ? additionalButtons[index] : additionalButtons[0];
            expect(wrapper3.instance().isActiveElement(button)).toEqual(true);
          }
          wrapper3.instance().hideButtons();
        });
      }
    );

    describe.each(themes)(
      'when "tab" key is pressed and the theme is set to "%s"',
      (_, theme) => {
        it('it calls the "hideButtons" function', () => {
          const wrapper4 = renderWithTheme({ carbonTheme: theme }, multipleButtons, mount).find(SplitButton);
          wrapper4.instance().showButtons();
          const spy = spyOn(wrapper4.instance(), 'hideButtons');
          jest.useFakeTimers();
          keyboard.pressTab();
          jest.runAllTimers();
          expect(spy).toHaveBeenCalled();
        });
      }
    );
  });

  describe.each(themes)(
    'when the theme is set to "%s"',
    (name, theme) => {
      it('has the expected style', () => {
        const themedWrapper = mount(
          <StyledSplitButtonChildrenContainer theme={ theme }>
            <StyledButton>Foo</StyledButton>
          </StyledSplitButtonChildrenContainer>
        );

        const themeColors = {
          classic: '#1e499f',
          small: '#006045',
          medium: '#005B9A',
          large: '#4F2775'
        };

        assertStyleMatch({
          backgroundColor: themeColors[name],
          border: `1px solid ${themeColors[name]}`
        }, themedWrapper, { modifier: `${StyledButton}` });
      });

      it('matches the expected style for the focused "additional button"', () => {
        const themedWrapper = mount(
          <StyledSplitButtonChildrenContainer theme={ theme }>
            <StyledButton>Foo</StyledButton>
          </StyledSplitButtonChildrenContainer>
        );

        const themeColors = {
          classic: '#163777',
          small: '#003F2E',
          medium: '#004372',
          large: '#3D1E5B'
        };

        themedWrapper.find('button').simulate('focus');
        assertStyleMatch({
          backgroundColor: themeColors[name]
        }, themedWrapper, { modifier: `${StyledButton}:focus` });
      });
    }
  );

  describe('for business themes', () => {
    it('renders styles correctly', () => {
      wrapper = render({}, singleButton, TestRenderer.create);
      expect(wrapper).toMatchSnapshot();
    });

    describe.each(businessThemes)(
      'when the theme is set to "%s"',
      (name, theme) => {
        const mockProps = { carbonTheme: theme, buttonType: 'primary' };

        it('renders Toggle Button left border as expected', () => {
          wrapper = renderWithTheme(mockProps, singleButton, mount);
          assertStyleMatch({
            borderLeftColor: theme.colors.secondary
          }, wrapper.find(StyledSplitButtonToggle));
        });
      }
    );
  });

  describe('for the classic theme', () => {
    it('renders styles correctly', () => {
      wrapper = renderWithTheme({ carbonTheme: ClassicTheme }, singleButton, TestRenderer.create);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders Toggle Button left border as expected', () => {
      const mockProps = { carbonTheme: ClassicTheme, buttonType: 'primary' };

      wrapper = renderWithTheme(mockProps, singleButton, mount);

      assertStyleMatch({
        borderLeft: '1px solid #1e499f'
      }, wrapper.find(StyledSplitButtonToggle));
    });
  });

  describe.each(sizes)(
    'when the "%s" size prop is passed',
    (size) => {
      describe.each(businessThemes)(
        'with the "%s" business theme',
        (name, theme) => {
          it('has the expected styling', () => {
            const children = [
              <StyledButton size={ size } key={ name }>Foo</StyledButton>
            ];

            const themedWrapper = mount(
              <StyledSplitButtonChildrenContainer theme={ theme }>
                { children }
              </StyledSplitButtonChildrenContainer>
            );

            const expectedStyle = buildSizeConfig(name, size);

            for (let index = 0; index < children.length - 1; index++) {
              assertStyleMatch({
                fontSize: expectedStyle.fontSize
              }, themedWrapper, { modifier: `${StyledButton}` });

              assertStyleMatch({
                height: expectedStyle.height,
                paddingLeft: expectedStyle.padding,
                paddingRight: expectedStyle.padding
              }, TestRenderer.create(children[index]).toJSON());
            }
          });
        }
      );
    }
  );

  describe.each(sizes)(
    'when the "%s" size prop is passed with a "classic" theme to the buttons',
    (size) => {
      it('matches the expected styling for a "medium" button', () => {
        const children = [
          <StyledButton size={ size } key={ size }>Foo</StyledButton>
        ];

        const themedWrapper = mount(
          <StyledSplitButtonChildrenContainer theme={ ClassicTheme }>
            { children }
          </StyledSplitButtonChildrenContainer>
        );

        for (let index = 0; index < children.length - 1; index++) {
          assertStyleMatch({
            fontSize: '14px',
            height: '31px',
            padding: '0 18px',
            textAlign: 'left'
          }, themedWrapper, { modifier: `${StyledButton}` });
        }
      });
    }
  );

  describe('button refs', () => {
    let wrapper4;
    beforeEach(() => {
      wrapper4 = render({
        text: 'mainButton',
        'data-element': 'bar',
        'data-role': 'baz'
      }, multipleButtons,
      mount);
    });

    it('creates and stores refs for the additonal buttons', () => {
      toggle = wrapper4.find('[data-element="toggle-button"]').hostNodes();
      toggle.prop('onFocus')();
      const { additionalButtons } = wrapper4.instance();
      expect(additionalButtons.length).toEqual(multipleButtons.length);
      additionalButtons.forEach(btn => expect(btn).not.toEqual(null));
    });

    afterEach(() => {
      wrapper4.unmount();
    });
  });

  describe('toggle button with mouse events', () => {
    describe('mouse enter dropdown toggle', () => {
      beforeEach(() => {
        wrapper = render(
          {
            text: 'mainButton'
          },
          <Button>
            Second Button
          </Button>
        );
        toggle = wrapper.find('[data-element="toggle-button"]');
      });

      it('changes showAdditionalButtons state', () => {
        toggle.simulate('mouseenter');
        expect(wrapper.state().showAdditionalButtons).toEqual(true);
      });

      it('when disabled it does not change the state', () => {
        wrapper = render({ disabled: true });
        toggle = wrapper.find('[data-element="toggle-button"]');
        toggle.simulate('mouseenter');
        expect(wrapper.state().showAdditionalButtons).toEqual(false);
      });

      it('when disabled it has the expected styling', () => {
        wrapper = render({ disabled: true }, singleButton, mount);

        toggle = wrapper.find('[data-element="toggle-button"]').hostNodes();
        assertStyleMatch({
          background: 'transparent',
          color: 'rgba(0,0,0,0.3)'
        }, toggle);
      });

      afterEach(() => {
        wrapper.instance().hideButtons();
        wrapper.unmount();
      });
    });

    describe('mouse leave split-button', () => {
      let mainButton;
      beforeEach(() => {
        wrapper = render();
        mainButton = wrapper.find('[data-element="main-button"]');
        toggle = wrapper.find('[data-element="toggle-button"]');
      });

      it('changes showAdditionalButtons state', () => {
        toggle.simulate('mouseenter');
        toggle.simulate('mouseenter'); // for branch coverage
        expect(wrapper.state().showAdditionalButtons).toEqual(true);
        expect(wrapper.instance().listening).toEqual(true);
        wrapper.simulate('mouseleave');
        wrapper.simulate('mouseleave'); // for branch coverage
        wrapper.instance().forceUpdate();
        expect(wrapper.state().showAdditionalButtons).toEqual(false);
        expect(wrapper.instance().listening).toEqual(false);
      });

      it('hides additional buttons', () => {
        toggle.simulate('mouseenter');
        expect(wrapper.containsMatchingElement(singleButton)).toBeTruthy();

        mainButton.simulate('mouseenter');
        wrapper.instance().forceUpdate();
        expect(wrapper.find(StyledSplitButtonChildrenContainer).exists()).toBeFalsy();
      });

      afterEach(() => {
        wrapper.unmount();
      });
    });

    describe('clicking a button', () => {
      const handleMainButton = jasmine.createSpy('main');
      const handleSecondButton = jasmine.createSpy('second');
      beforeEach(() => {
        wrapper = render(
          {
            onClick: handleMainButton
          },
          [
            <Button onClick={ handleSecondButton } key='testKey'>
              Second Button
            </Button>
          ]
        );
        toggle = wrapper.find('[data-element="toggle-button"]');
      });

      it('the handler should be called on the main button', () => {
        toggle.simulate('mouseenter');
        wrapper.instance().forceUpdate();
        const button = wrapper.find('[data-element="additional-buttons"]').find(Button);
        button.simulate('click');
        expect(handleSecondButton).toHaveBeenCalled();
      });

      afterEach(() => {
        wrapper.unmount();
      });
    });
  });

  describe.each(['click', 'touchstart'])('when the "%s" event is triggered with menu open', (eventType) => {
    const nativeInputEvent = new Event(eventType, { bubbles: true, cancelable: true });
    let domWrapper;

    beforeAll(() => {
      if (eventType === 'touchstart') {
        document.documentElement.ontouchstart = () => {};
      }
    });

    beforeEach(() => {
      domWrapper = document.createElement('div');
      document.body.appendChild(domWrapper);
      wrapper = mount(
        <SplitButton text='Split button'>
          { singleButton }
        </SplitButton>,
        { attachTo: domWrapper }
      );
      simulateFocusOnToggle(wrapper);
    });

    describe('on the Menu element', () => {
      it('then the Menu should not be closed', () => {
        expect(wrapper.find(StyledSplitButtonChildrenContainer).exists()).toBe(true);
        wrapper.find(StyledSplitButtonChildrenContainer).find(Button).getDOMNode().dispatchEvent(nativeInputEvent);
        expect(wrapper.find(StyledSplitButtonChildrenContainer).exists()).toBe(true);
      });
    });

    describe('on an external element', () => {
      describe('and focus is still on the toggle button', () => {
        it('then the Menu should not be closed', () => {
          expect(wrapper.find(StyledSplitButtonChildrenContainer).exists()).toBe(true);
          domWrapper.dispatchEvent(nativeInputEvent);
          expect(wrapper.find(StyledSplitButtonChildrenContainer).exists()).toBe(true);
        });
      });

      describe('and focus is on a button in the menu', () => {
        it('then the Menu should be closed', () => {
          expect(wrapper.find(StyledSplitButtonChildrenContainer).exists()).toBe(true);
          simulateBlurOnToggle(wrapper);
          domWrapper.dispatchEvent(nativeInputEvent);
          expect(wrapper.update().find(StyledSplitButtonChildrenContainer).exists()).toBe(false);
        });
      });
    });

    afterEach(() => {
      wrapper.detach();
      document.body.removeChild(domWrapper);
    });

    afterAll(() => {
      if (eventType === 'touchstart') {
        document.documentElement.ontouchstart = undefined;
      }
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      beforeEach(() => {
        wrapper = render();
        toggle = wrapper.find('[data-element="toggle-button"]');
      });

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'split-button', 'bar', 'baz');
      });
    });

    describe('on internal elements', () => {
      const wrapper5 = render({}, multipleButtons);
      wrapper5.setState({ showAdditionalButtons: true });

      elementsTagTest(wrapper5, [
        'additional-buttons',
        'main-button',
        'toggle-button'
      ]);
    });
  });

  describe('when focused on the toggle button', () => {
    beforeEach(() => {
      wrapper = render({}, multipleButtons, mount);
      toggle = wrapper.find(StyledSplitButtonToggle);
      toggle.simulate('focus');
    });

    describe.each([['enter', 13], ['space', 32]])('the %s key is pressed', (name, keyCode) => {
      it('then the first additional button should be focused', () => {
        toggle.simulate('keydown', { which: keyCode });
        const firstButton = wrapper.find(StyledSplitButtonChildrenContainer).find('button').at(0);

        expect(firstButton.instance()).toBe(document.activeElement);
      });
    });

    describe('the tab key is pressed', () => {
      const tabKeyCode = 9;

      it('then the first additional button should not be focused', () => {
        toggle.simulate('keydown', { which: tabKeyCode });
        const firstButton = wrapper.find(StyledSplitButtonChildrenContainer).find('button').at(0);

        expect(firstButton.instance()).not.toBe(document.activeElement);
      });
    });

    describe('and mouse leaves the Split Button', () => {
      it('then the additional buttons menu should remain open', () => {
        wrapper.simulate('mouseLeave');

        expect(wrapper.find(StyledSplitButtonChildrenContainer).exists()).toBe(true);
      });
    });

    describe('and mouse leaves the Split Button after focus is out of toggle', () => {
      it('then the additional buttons menu should be closed', () => {
        toggle.simulate('blur');
        wrapper.simulate('mouseLeave');

        expect(wrapper.find(StyledSplitButtonChildrenContainer).exists()).toBe(false);
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });
  });
});

function simulateFocusOnToggle(container) {
  const toggleButton = container.find('[data-element="toggle-button"]').at(0);

  toggleButton.simulate('focus');
}

function simulateBlurOnToggle(container) {
  const toggleButton = container.find('[data-element="toggle-button"]').at(0);

  toggleButton.simulate('blur');
}
