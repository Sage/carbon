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

const render = (mainProps, childButtons, renderer = shallow) => {
  return renderer(
    <SplitButton
      { ...mainProps }
      data-element='bar'
      data-role='baz'
    >
      { childButtons }
    </SplitButton>
  );
};

const renderWithTheme = (mainProps, childButtons, renderer = shallow) => {
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
      wrapper = render(
        {
          text: 'mainButton'
        },
        [
          <Button>
            Second Button
          </Button>
        ]
      );
      toggle = wrapper.find('[data-element="open"]');
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

  describe('mouse click dropdown toggle', () => {
    beforeEach(() => {
      wrapper = render(
        {
          text: 'mainButton'
        },
        [
          <Button>
            Second Button
          </Button>
        ]
      );
      toggle = wrapper.find('[data-element="open"]');
    });

    it('prevents default', () => {
      const ev = jasmine.createSpy();
      toggle.simulate('click', { preventDefault: ev });
      expect(ev).toHaveBeenCalled();
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
          const wrapper2 = renderWithTheme({
            text: 'mainButton',
            carbonTheme: theme
          },
          [
            <Button>Extra Button</Button>,
            <Button>Extra Button</Button>,
            <Button>Extra Button</Button>
          ],
          mount).find(SplitButton);

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
          const wrapper3 = renderWithTheme({
            text: 'mainButton',
            carbonTheme: theme
          },
          [
            <Button>Extra Button</Button>,
            <Button>Extra Button</Button>,
            <Button>Extra Button</Button>
          ],
          mount).find(SplitButton);
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
          const wrapper4 = renderWithTheme({
            text: 'mainButton',
            carbonTheme: theme
          },
          [
            <Button>Extra Button</Button>,
            <Button>Extra Button</Button>,
            <Button>Extra Button</Button>
          ],
          mount).find(SplitButton);
          wrapper4.instance().showButtons();
          const spy = spyOn(wrapper4.instance(), 'hideButtons');
          keyboard.pressTab();
          expect(spy).toHaveBeenCalled();
          wrapper4.instance().hideButtons();
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
      wrapper = TestRenderer.create(<SplitButton text='Mock text'><Button /></SplitButton>);
      expect(wrapper).toMatchSnapshot();
    });

    describe.each(businessThemes)(
      'when the theme is set to "%s"',
      (name, theme) => {
        const mockProps = { carbonTheme: theme, buttonType: 'primary' };

        it('has expected left border color', () => {
          wrapper = renderWithTheme(mockProps, (<Button />), mount);
          assertStyleMatch({
            borderLeftColor: theme.colors.secondary
          }, wrapper.find(StyledSplitButtonToggle));
        });
      }
    );
  });

  describe('for the classic theme', () => {
    it('renders styles correctly', () => {
      wrapper = renderWithTheme({ carbonTheme: ClassicTheme }, [<Button />], TestRenderer.create);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders left border correctly', () => {
      const mockProps = { carbonTheme: ClassicTheme, buttonType: 'primary' };

      wrapper = renderWithTheme(mockProps, (<Button />), mount);

      assertStyleMatch({
        borderLeft: '1px solid #1e499f'
      }, wrapper.find(StyledSplitButtonToggle));
    });

    it('renders left border correctly for other themes', () => {
      const mockProps = { carbonTheme: ClassicTheme, buttonType: 'primary' };

      wrapper = renderWithTheme(mockProps, (<Button />), mount);

      assertStyleMatch({
        borderLeft: '1px solid #1e499f'
      }, wrapper.find(StyledSplitButtonToggle));
    });
  });

  describe.each(sizes)(
    'when the "%s" size prop is passed',
    (size) => {
      describe.each([themes[1], themes[2], themes[3]])(
        'with the "%s" business theme',
        (name, theme) => {
          it('has the expected styling', () => {
            const children = [
              <StyledButton size={ size }>Foo</StyledButton>
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
          <StyledButton size={ size }>Foo</StyledButton>
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
      },
      [
        <Button>Extra Button</Button>,
        <Button>Extra Button</Button>
      ],
      mount);
    });

    it('creates and stores refs for the additonal buttons', () => {
      toggle = wrapper4.find('[data-element="open"]').hostNodes();
      toggle.prop('onFocus')();
      const { additionalButtons } = wrapper4.instance();
      expect(additionalButtons.length).toEqual(2);
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
        toggle = wrapper.find('[data-element="open"]');
      });

      it('changes showAdditionalButtons state', () => {
        toggle.simulate('mouseenter');
        expect(wrapper.state().showAdditionalButtons).toEqual(true);
      });

      it('when disabled it does not change the state', () => {
        wrapper = render(
          {
            text: 'mainButton',
            disabled: true
          },
          <Button>
              Second Button
          </Button>
        );
        toggle = wrapper.find('[data-element="open"]');
        toggle.simulate('mouseenter');
        expect(wrapper.state().showAdditionalButtons).toEqual(false);
      });

      it('when disabled it has the expected styling', () => {
        wrapper = render(
          {
            text: 'mainButton',
            disabled: true
          },
          <Button>
              Second Button
          </Button>,
          mount
        );

        toggle = wrapper.find('[data-element="open"]').hostNodes();
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
        wrapper = render(
          {
            text: 'mainButton'
          },
          [
            <Button>
              Second Button
            </Button>
          ]
        );
        mainButton = wrapper.find('[data-element="main-button"]');
        toggle = wrapper.find('[data-element="open"]');
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
        expect(wrapper.containsMatchingElement(
          <Button>Second Button</Button>
        )).toBeTruthy();

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
            text: 'mainButton',
            onClick: handleMainButton
          },
          [
            <Button onClick={ handleSecondButton }>
              Second Button
            </Button>
          ]
        );
        toggle = wrapper.find('[data-element="open"]');
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

  describe('tags', () => {
    describe('on component', () => {
      beforeEach(() => {
        wrapper = render(
          {
            text: 'mainButton'
          },
          [
            <Button>
              Second Button
            </Button>
          ]
        );
        toggle = wrapper.find('[data-element="open"]');
      });

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'split-button', 'bar', 'baz');
      });
    });

    describe('on internal elements', () => {
      const wrapper5 = shallow(
        <SplitButton text='Test'>
          <Button>Test1</Button>
          <Button>Test2</Button>
        </SplitButton>
      );
      wrapper5.setState({ showAdditionalButtons: true });

      elementsTagTest(wrapper5, [
        'additional-buttons',
        'main-button',
        'open'
      ]);
    });
  });
});
