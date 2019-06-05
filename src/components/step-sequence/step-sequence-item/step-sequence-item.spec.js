import React from 'react';
import { mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import StepSequenceItem from './step-sequence-item.component';
import classicTheme from '../../../style/themes/classic';
import smallTheme from '../../../style/themes/small';
import Icon from '../../icon';
import StepSequenceItemHiddenLabelStyle from './step-sequence-item-hidden-label.style';

describe('StepSequenceItem', () => {
  const wrapper = (props, renderer = TestRenderer.create) => (
    renderer(
      <StepSequenceItem { ...props }>
        Item
      </StepSequenceItem>
    )
  );

  const defaultProps = {
    ariaLabel: 'Step 1 of 5',
    indicator: '2',
    hiddenCompleteLabel: 'HiddenComplete',
    hiddenCurrentLabel: 'HiddenCurrent'
  };

  it('renders correctly', () => {
    expect(wrapper({ ...defaultProps, theme: smallTheme })).toMatchSnapshot();
  });

  describe('when complete', () => {
    it('renders the tick item', () => {
      const instance = wrapper({ ...defaultProps, status: 'complete', theme: smallTheme }, mount);
      expect(instance.find(Icon).exists()).toBe(true);
    });

    it('renders the hidden label', () => {
      const instance = wrapper({ ...defaultProps, status: 'complete', theme: smallTheme }, mount);
      expect(instance.find(StepSequenceItemHiddenLabelStyle).exists()).toBe(true);
      expect(instance.find(StepSequenceItemHiddenLabelStyle).text()).toEqual('HiddenComplete');
    });
  });

  describe('when cureent', () => {
    it('renders the correct styling', () => {
      const instance = wrapper({ ...defaultProps, status: 'current', theme: smallTheme });
      assertStyleMatch({
        color: smallTheme.text.color
      }, instance.toJSON());
    });

    it('renders the hidden label', () => {
      const instance = wrapper({ ...defaultProps, status: 'current', theme: smallTheme }, mount);
      expect(instance.find(StepSequenceItemHiddenLabelStyle).exists()).toBe(true);
      expect(instance.find(StepSequenceItemHiddenLabelStyle).text()).toEqual('HiddenCurrent');
    });
  });

  describe('Classic theme', () => {
    it('renders correctly', () => {
      expect(wrapper({ ...defaultProps, theme: classicTheme })).toMatchSnapshot();
    });
  });
});
