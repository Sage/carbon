import React from 'react';
import { shallow } from 'enzyme';
import StepSequenceItem from './step-sequence-item';

describe('<StepSequenceItem />', () => {
  let stepSequenceItem;

  beforeAll(() => {
    stepSequenceItem = shallow(
      <StepSequenceItem
        state='foo'
        label='bar'
        stepNumber={ 2 }
      />
    );
  });

  test('basic render', () => {
    expect(stepSequenceItem).toMatchSnapshot();
  });

  test('completed render', () => {
    stepSequenceItem.setProps({ state: 'complete' });
    expect(stepSequenceItem).toMatchSnapshot();
  });
});
