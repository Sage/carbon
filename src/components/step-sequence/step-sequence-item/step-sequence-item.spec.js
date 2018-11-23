import React from 'react';
import { shallow } from 'enzyme';
import StepSequenceItem from './step-sequence-item';

describe('<StepSequenceItem />', () => {
  let stepSequenceItem;

  beforeAll(() => {
    stepSequenceItem = shallow(
      <StepSequenceItem
        indicator='2'
      >
        bar
      </StepSequenceItem>
    );
  });

  test('basic render', () => {
    expect(stepSequenceItem).toMatchSnapshot();
  });

  test('completed render', () => {
    stepSequenceItem.setProps({ status: 'complete' });
    expect(stepSequenceItem).toMatchSnapshot();
  });

  test('current render', () => {
    stepSequenceItem.setProps({ status: 'current' });
    expect(stepSequenceItem).toMatchSnapshot();
  });
});
