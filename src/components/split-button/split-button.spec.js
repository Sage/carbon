import React from 'react';
import { shallow, mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import SplitButton from './split-button.component';
import StyledSplitButtonChildContainer from './split-button-children.style';
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

const sizes = ['small', 'medium', 'large'];

const themes = [
  ['classic', ClassicTheme],
  ['small', SmallTheme],
  ['medium', MediumTheme],
  ['large', LargeTheme]
];

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
          const wrapper2 = render({
            text: 'mainButton',
            theme
          },
          [
            <Button>Extra Button</Button>,
            <Button>Extra Button</Button>,
            <Button>Extra Button</Button>
          ],
          mount);

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
          const wrapper3 = render({
            text: 'mainButton',
            theme
          },
          [
            <Button>Extra Button</Button>,
            <Button>Extra Button</Button>,
            <Button>Extra Button</Button>
          ],
          mount);
          wrapper3.instance().showButtons();
          const { additionalButtons } = wrapper3.instance();

          for (let index = 0; index < additionalButtons.length; index++) {
            keyboard.pressDownArrow();
            const button = additionalButtons[index];
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
          const wrapper4 = render({
            text: 'mainButton',
            theme
          },
          [
            <Button>Extra Button</Button>,
            <Button>Extra Button</Button>,
            <Button>Extra Button</Button>
          ],
          mount);
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
          <StyledSplitButtonChildContainer theme={ theme }>
            <StyledButton>Foo</StyledButton>
          </StyledSplitButtonChildContainer>
        );

        const themeColors = {
          classic: '#1e499f',
          small: '#006045',
          medium: '#005B9A',
          large: '#4F2775'
        };

        assertStyleMatch({
          backgroundColor: themeColors[name],
          border: `1px solid ${themeColors[name]}`,
          display: name === 'classic' ? 'block' : undefined
        }, themedWrapper, { modifier: `${StyledButton}` });
      });

      it('matches the expected style for the focused "additional button"', () => {
        const themedWrapper = mount(
          <StyledSplitButtonChildContainer theme={ theme }>
            <StyledButton>Foo</StyledButton>
          </StyledSplitButtonChildContainer>
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

  describe.each(sizes)(
    'when the "%s" size prop is passed',
    (size) => {
      describe.each([themes[1], themes[2], themes[3]])(
        'with the "%s" business theme',
        (name, theme) => {
          it('has the expected styling', () => {
            const children = [
              <StyledButton size={ size }>Foo</StyledButton>,
              <StyledButton size={ size }>Foo</StyledButton>
            ];

            const themedWrapper = mount(
              <StyledSplitButtonChildContainer theme={ theme }>
                { children }
              </StyledSplitButtonChildContainer>
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
          <StyledButton size={ size }>Foo</StyledButton>,
          <StyledButton size={ size }>Foo</StyledButton>
        ];

        const themedWrapper = mount(
          <StyledSplitButtonChildContainer theme={ ClassicTheme }>
            { children }
          </StyledSplitButtonChildContainer>
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

      it('renders additional buttons to match snapshot', () => {
        toggle.simulate('mouseenter');
        expect(wrapper).toMatchSnapshot();
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
        const block = wrapper.find('[data-element="open"]');
        block.simulate('mouseenter');
        expect(wrapper.state().showAdditionalButtons).toEqual(false);
      });

      afterEach(() => {
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
        expect(wrapper.containsMatchingElement(
          <Button>Second Button</Button>
        )).toBeFalsy();
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
