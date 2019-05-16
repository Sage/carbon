import React from 'react';
import { mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { assertStyleMatch } from '../../../__spec_helper__/test-utils';
import StepSequenceItem from './step-sequence-item.component';
import classicTheme from '../../../style/themes/classic';
import smallTheme from '../../../style/themes/small';
import Icon from '../../icon';

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
    hiddenCompleteLabel: 'Complete text for non visual users',
    hiddenCurrentLabel: 'Current text for non visual users'
  };

  it('renders correctly', () => {
    expect(wrapper({ ...defaultProps, theme: smallTheme })).toMatchSnapshot();
  });

  it('renders the tick item when complete', () => {
    const instance = wrapper({ ...defaultProps, status: 'complete', theme: smallTheme }, mount);
    expect(instance.find(Icon).exists()).toBe(true);
  });

  it('renders the correct styling when current', () => {
    const instance = wrapper({ ...defaultProps, status: 'current', theme: smallTheme });
    assertStyleMatch({
      color: smallTheme.text.color
    }, instance.toJSON());
  });

  describe('Classic theme', () => {
    it('renders correctly', () => {
      expect(wrapper({ ...defaultProps, theme: classicTheme })).toMatchSnapshot();
    });
  });
});
