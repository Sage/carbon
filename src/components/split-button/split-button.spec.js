import React from 'react';
import { shallow, mount } from 'enzyme';
import SplitButtonWithTheme, { SplitButton } from './split-button.component';
import Icon from '../icon';
import Button from '../button';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';
import BaseTheme from '../../style/themes/base';
import classicTheme from '../../style/themes/classic';
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

const themes = ['classic', 'small', 'medium', 'large'];

describe('SplitButton', () => {
  let wrapper, toggle;
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

  describe('render with custom className', () => {
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
  });

  describe('mouse click dropdown toggle', () => {
    it('prevents default', () => {
      const ev = jasmine.createSpy();
      toggle.simulate('click', { preventDefault: ev });
      expect(ev).toHaveBeenCalled();
    });
  });

  describe('mouse enter dropdown toggle', () => {
    it('changes showAdditionalButtons state', () => {
      toggle.simulate('mouseenter');
      expect(wrapper.state().showAdditionalButtons).toEqual(true);
    });

    it('renders additional buttons to match snapshot', () => {
      toggle.simulate('mouseenter');
      expect(wrapper).toMatchSnapshot();
    });

    it('when disabled it does not change the state', () => {
      const wrapper2 = render(
        {
          text: 'mainButton',
          onClick: handleMainButton,
          disabled: true
        },
        [
          <Button onClick={ handleSecondButton }>
            Second Button
          </Button>
        ]
      );
      toggle = wrapper.find('[data-element="open"]');
      const block = wrapper2.find('[data-element="open"]');
      block.simulate('mouseenter');
      expect(wrapper2.state().showAdditionalButtons).toEqual(false);
    });
  });

  describe('mouse leave split-button', () => {
    let wrapper2, toggle2, mainButton;
    beforeEach(() => {
      wrapper2 = render(
        {
          text: 'mainButton'
        },
        [
          <Button>
            Second Button
          </Button>
        ]
      );
      mainButton = wrapper2.find('[data-element="main-button"]');
      toggle2 = wrapper2.find('[data-element="open"]');
    });

    it('changes showAdditionalButtons state', () => {
      toggle2.simulate('mouseenter');
      expect(wrapper2.state().showAdditionalButtons).toEqual(true);
      mainButton.simulate('mouseenter');
      wrapper2.instance().forceUpdate();
      expect(wrapper2.state().showAdditionalButtons).toEqual(false);
    });

    it('hides additional buttons', () => {
      toggle2.simulate('mouseenter');
      expect(wrapper2.containsMatchingElement(
        <Button>Second Button</Button>
      )).toBeTruthy();

      mainButton.simulate('mouseenter');
      expect(wrapper2.containsMatchingElement(
        <Button>Second Button</Button>
      )).toBeFalsy();
    });
  });

  describe('clicking a button', () => {
    it('the handler should be called on the main button', () => {
      toggle.simulate('mouseenter');
      wrapper.instance().forceUpdate();
      const button = wrapper.find('[data-element="additional-buttons"]').find(Button);
      button.simulate('click');
      expect(handleSecondButton).toHaveBeenCalled();
    });
  });

  describe('keyboard accessibility of additional buttons', () => {
    describe('pressing the "up" key', () => {
      let wrapper2;
      beforeEach(() => {
        wrapper2 = render({
          text: 'mainButton',
          'data-element': 'bar',
          'data-role': 'baz'
        },
        [
          <Button>Extra Button</Button>,
          <Button>Extra Button</Button>,
          <Button>Extra Button</Button>
        ],
        mount);
        toggle = wrapper2.find('[data-element="open"]').hostNodes();
        toggle.prop('onFocus')();
      });

      // it('adds focus to the button referenced by the index', () => {
      //   const { additionalButtons } = wrapper2.instance();
      //   for (let index = additionalButtons.length - 1; index >= 0; index--) {
      //     const button = additionalButtons[index];
      //     const spy = spyOn(button, 'focus');
      //     keyboard.pressUpArrow();
      //     expect(spy).toBeCalled();
      //   }
      //   // setInterval(() => spys.forEach(spy => expect(spy).toHaveBeenCalled(), 200));
      // });

      it('matches the expected style for the button indexed', () => {
        const { additionalButtons } = wrapper2.instance();
        for (let index = additionalButtons.length - 1; index >= 0; index--) {
          const button = additionalButtons[index];
          keyboard.pressUpArrow();
          assertStyleMatch({
            background: 'transparent',
            borderColor: BaseTheme.colors.primary,
            color: BaseTheme.colors.primary,
            fontSize: '14px',
            height: '40px',
            paddingLeft: '24px',
            paddingRight: '24px'
          }, button);
        }
      });

      afterEach(() => {
        wrapper2.unmount();
      });
    });

    describe('pressing the "down" key', () => {
      let wrapper3;
      beforeEach(() => {
        wrapper3 = render({
          text: 'mainButton',
          'data-element': 'bar',
          'data-role': 'baz'
        },
        [
          <Button>Extra Button</Button>,
          <Button>Extra Button</Button>,
          <Button>Extra Button</Button>
        ],
        mount);
        toggle = wrapper3.find('[data-element="open"]').hostNodes();
        toggle.prop('onFocus')();
      });

      it('adds focus to the button referenced by the index', () => {
        toggle = wrapper3.find('[data-element="open"]').hostNodes();
        const { additionalButtons } = wrapper3.instance();
        wrapper3.props().children.forEach((_, index) => {
          const button = additionalButtons[index];
          const spy = spyOn(button, 'focus');
          keyboard.pressDownArrow();
          expect(spy).toHaveBeenCalled();
        });
      });

      it('matches the expected style for the button indexed', () => {
        const { additionalButtons } = wrapper3.instance();
        for (let index = 0; index < additionalButtons.length; index++) {
          const button = additionalButtons[index];
          keyboard.pressDownArrow();
          assertStyleMatch({
            background: 'transparent',
            borderColor: BaseTheme.colors.primary,
            color: BaseTheme.colors.primary,
            fontSize: '14px',
            height: '40px',
            paddingLeft: '24px',
            paddingRight: '24px'
          }, button);
        }
      });

      afterEach(() => {
        wrapper3.unmount();
      });
    });
  });

  describe('button refs', () => {
    beforeEach(() => {
      wrapper = render({
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

    it('creates and stores refs for the main and toggle buttons', () => {
      const { splitButton } = wrapper.instance();
      expect(splitButton).not.toEqual(null);
    });

    it('creates and stores refs for the any additonal buttons', () => {
      toggle = wrapper.find('[data-element="open"]').hostNodes();
      toggle.prop('onFocus')();
      const { additionalButtons } = wrapper.instance();
      expect(additionalButtons.length).toEqual(2);
      additionalButtons.forEach(btn => expect(btn).not.toEqual(null));
      expect(additionalButtons[0]).not.toEqual(wrapper.instance().splitButtons[1]);
    });

    afterEach(() => {
      wrapper.unmount();
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'split-button', 'bar', 'baz');
      });
    });

    describe('on internal elements', () => {
      wrapper = shallow(
        <SplitButton text='Test'>
          <Button>Test1</Button>
          <Button>Test2</Button>
        </SplitButton>
      );
      wrapper.setState({ showAdditionalButtons: true });

      elementsTagTest(wrapper, [
        'additional-buttons',
        'main-button',
        'open'
      ]);
    });
  });
});
