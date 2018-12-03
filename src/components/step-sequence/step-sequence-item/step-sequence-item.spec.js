import React from 'react';
import { shallow } from 'enzyme';
import StepSequenceItem from './step-sequence-item';

describe('<StepSequenceItem />', () => {
  let stepSequenceItem;

  beforeAll(() => {
    stepSequenceItem = shallow(
      <StepSequenceItem
        aria-label='Step 1 of 5'
        indicator='2'
        hiddenCompleteLabel='Complete text for non visual users'
        hiddenCurrentLabel='Current text for non visual users'
      >
        bar
      </StepSequenceItem>
    );
  });

  const statusTest = status => () => {
    stepSequenceItem.setProps({ status });
    expect(stepSequenceItem).toMatchSnapshot();
  };

  test('completed render', statusTest('complete'));
  test('current render', statusTest('current'));
  test('incomplete render', statusTest('incomplete'));
});
