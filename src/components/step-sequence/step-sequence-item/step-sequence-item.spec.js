import React from 'react';
// import { shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import StepSequenceItem from './step-sequence-item.component';
import classicTheme from '../../../style/themes/classic';
import smallTheme from '../../../style/themes/small';

describe('StepSequenceItem', () => {
  const wrapper = props => (
    TestRenderer.create(
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

  describe('Classic theme', () => {
    it('renders correctly', () => {
      expect(wrapper({ ...defaultProps, theme: classicTheme })).toMatchSnapshot();
    });
  });
});
