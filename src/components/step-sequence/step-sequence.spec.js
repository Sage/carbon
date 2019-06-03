import React from 'react';
// import { shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import StepSequence from './step-sequence.component';
import StepSequenceItem from './step-sequence-item/step-sequence-item.component';
import classicTheme from '../../style/themes/classic';
import smallTheme from '../../style/themes/small';

describe('StepSequence', () => {
  const wrapper = props => (
    TestRenderer.create(
      <StepSequence { ...props }>
        <StepSequenceItem
          aria-label='Step 1 of 5'
          indicator='2'
          hiddenCompleteLabel='Complete text for non visual users'
          hiddenCurrentLabel='Current text for non visual users'
          theme={ props.theme }
        >
          Item
        </StepSequenceItem>
      </StepSequence>
    )
  );

  it('renders correctly', () => {
    expect(wrapper({ theme: smallTheme })).toMatchSnapshot();
  });

  it('renders correctly with vertical orientation', () => {
    expect(wrapper({ theme: smallTheme, orientation: 'vertical' })).toMatchSnapshot();
  });

  describe('Classic theme', () => {
    it('renders correctly', () => {
      expect(wrapper({ theme: classicTheme })).toMatchSnapshot();
    });

    it('renders correctly with vertical orientation', () => {
      expect(wrapper({ theme: classicTheme, orientation: 'vertical' })).toMatchSnapshot();
    });
  });
});
