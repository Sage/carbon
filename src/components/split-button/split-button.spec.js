import React from 'react';
import TestRenderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import SplitButtonWithTheme, { SplitButton } from './split-button.component';
import Icon from '../icon';
import Button from '../button';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';
import StyledSplitButton from './split-button.style';
import StyledSplitButtonChildren from './split-button-children.style';
import BaseTheme from '../../style/themes/base';
import classicTheme from '../../style/themes/classic';
import {
  assertStyleMatch,
  keyboard
} from '../../__spec_helper__/test-utils';
import 'jest-styled-components';

const render = (mainProps, childProps, renderer = shallow) => {
  const { children } = childProps;
  return renderer(
    <SplitButton
      { ...mainProps }
      data-element='bar'
      data-role='baz'
    >
      <Button { ...childProps }>
        { children }
      </Button>
    </SplitButton>
  );
};

describe('SplitButton', () => {
  let wrapper, toggle;
  const handleMainButton = jasmine.createSpy('main');
  const handleSecondButton = jasmine.createSpy('second');

  // beforeEach(() => {
  //   wrapper = render(
  //     {
  //       text: 'mainButton',
  //       onClick: handleMainButton
  //     },
  //     {
  //       onClick: handleSecondButton,
  //       children: 'Second Button'
  //     }
  //   );
  //   splitButton = wrapper.find('SplitButton');
  //   toggle = splitButton.find('[data-element="open"]').hostNodes();
  // });


  beforeEach(() => {
    wrapper = render(
      {
        text: 'mainButton',
        onClick: handleMainButton
      },
      {
        onClick: handleSecondButton,
        children: 'Second Button'
      }
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
        { text: 'mainButton', disabled: true }, { children: 'Second Button' }
      );
      const block = wrapper2.find('[data-element="open"]');
      block.simulate('mouseenter');
      expect(wrapper2.state().showAdditionalButtons).toEqual(false);
    });
  });

  describe('mouse leave split-button', () => {
    let wrapper2, toggle2, mainButton;
    beforeEach(() => {
      wrapper2 = render({ text: 'mainButton' }, { children: 'Second Button' });
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
    beforeEach(() => {
      wrapper = mount(
        <SplitButton
          text='mainButton'
          data-element='bar'
          data-role='baz'
        >
          <Button>
            Extra Button
          </Button>
          <Button>
            Extra Button
          </Button>
          <Button>
            Extra Button
          </Button>
        </SplitButton>
      );
      toggle = wrapper.find('[data-element="open"]').hostNodes();
      toggle.prop('onFocus')();
      // wrapperJSON = wrapper.toJSON;
    });

    // assert index state
    // assert style
    describe('pressing the "up" key', () => {
      // fit('adds focus to the button referenced by the index', async () => {
      //   const { additionalButtons } = wrapper.instance();
      //   toggle.prop('onFocus')();
      //   const spys = [];
      // for (let index = additionalButtons.length - 1; index >= 0; index--) {
      //   keyboard.pressUpArrow();
      //   const button = additionalButtons[index];
      //   spys.push(spyOn(button, 'focus'));
      // }
      //   await setInterval(() => spys.forEach(spy => expect(spy).not.toHaveBeenCalled(), 200));
      // });

      fit('matches the expected style for the button indexed', () => {
        const { additionalButtons } = wrapper.instance();
        for (let index = additionalButtons.length - 1; index >= 0; index--) {
          keyboard.pressUpArrow();
          const button = additionalButtons[index];
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
    });

    describe('pressing the "down" key', () => {
      // it('adds focus to the button referenced by the index', () => {
      //   toggle = wrapper.find('[data-element="open"]').hostNodes();
      //   const { additionalButtons } = wrapper.instance();
      //   toggle.prop('onFocus')();
      //   wrapper.props().children.forEach((_, index) => {
      //     keyboard.pressDownArrow();
      //     const button = additionalButtons[index];
      //     const spy = spyOn(button, 'focus');
      //     setInterval(() => expect(spy).toHaveBeenCalled(), 200);
      //   });
      // });

      it('matches the expected style for the button indexed', () => {

      });
    });
  });

  describe('button refs', () => {
    // assert main buttons have refs
    // assert additional buttons have refs
    beforeEach(() => {
      wrapper = render({ text: 'mainButton' }, { children: 'Second Button' }, mount);
    });

    it('creates and stores refs for the main and toggle buttons', () => {
      const { splitButtons } = wrapper.instance();
      expect(splitButtons.length).toEqual(2);
      splitButtons.forEach(btn => expect(btn).not.toEqual(null));
      expect(splitButtons[0]).not.toEqual(wrapper.instance().splitButtons[1]);
    });

    it('creates and stores refs for the any additonal buttons', () => {

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
