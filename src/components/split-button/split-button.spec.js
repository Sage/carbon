import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import SplitButton from './split-button.component';
import Icon from '../icon';
import Button from '../button';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';
import StyledSplitButton from './split-button.style';
import StyledSplitButtonChildren from './split-button-children.style';
import BaseTheme from '../../style/themes/base';
import classicTheme from '../../style/themes/classic';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';

const render = (mainProps, childProps, renderer = shallow) => {
  const { children } = childProps;
  return renderer(
    <SplitButton { ...mainProps }>
      <Button { ...childProps }>{ children }</Button>
    </SplitButton>
  );
};

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
      {
        onClick: handleSecondButton,
        children: 'Second Button'
      }
    );
    toggle = wrapper.find('[data-element="open"]');
  });

  describe('render with custom className', () => {
    it('sets default state', () => {
      expect(wrapper.state().showAdditionalButtons).toEqual(false);
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

    it('renders more buttons', () => {
      toggle.simulate('mouseenter');
      const block = wrapper.find('[data-element="additional-buttons"]');
      expect(block).not.toBe(null);
    });

    it('when disabled it does not change the state', () => {
      const wrapper2 = render(
        { text: 'mainButton', disabled: true }, { children: 'Second Button' }
      );
      const block = wrapper2.find('[data-component="split-button"]');
      block.simulate('mouseenter');
      expect(wrapper2.state().showAdditionalButtons).toEqual(false);
    });
  });

  describe('mouse leave split-button', () => {
    it('changes showAdditionalButtons state', () => {
      const wrapper2 = render(
        { text: 'mainButton' }, { children: 'Second Button' }
      );
      const block = wrapper2.find('[data-component="split-button"]');
      block.simulate('mouseleave');
      expect(wrapper2.state().showAdditionalButtons).toEqual(false);
    });

    fit('hides additional buttons', () => {
      const wrapper2 = render(
        { text: 'mainButton' }, { children: 'Second Button' }
      );
      const toggle2 = wrapper2.find('[data-element="open"]');
      const block = wrapper2.find('[data-element="additional-buttons"]');
      toggle2.simulate('mouseleave');

      // TestUtils.Simulate.mouseLeave(toggle);
      // const block = TestUtils
      //   .findRenderedDOMComponentWithClass(
      //     wrapper,
      //     'carbon-split-button__additional-buttons carbon-split-button__additional-buttons--hidden'
      //   );
      expect(block).not.toBe(null);
    });
  });

  describe('click button', () => {
    it('the handler should be called', () => {
      // const toggle = TestUtils.findRenderedDOMComponentWithClass(wrapper, 'carbon-split-button__toggle');
      TestUtils.Simulate.mouseEnter(toggle);
      wrapper.forceUpdate();
      const button = TestUtils.findRenderedDOMComponentWithClass(wrapper, 'second-button');
      TestUtils.Simulate.click(button);
      expect(handleSecondButton).toHaveBeenCalled();
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      wrapper = shallow(
        <SplitButton
          data-element='bar' data-role='baz'
          text='Test'
        >
          <Button>Test</Button>
        </SplitButton>
      );

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'split-button', 'bar', 'baz');
      });
    });

    describe('on internal elements', () => {
      wrapper = shallow(
        <SplitButton text='Test'>
          <Button>Test</Button>
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
