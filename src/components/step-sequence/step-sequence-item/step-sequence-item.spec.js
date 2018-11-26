import React from 'react';
import { shallow } from 'enzyme';
import StepSequenceItem from './step-sequence-item';

describe('<StepSequenceItem />', () => {
  let stepSequenceItem;

  beforeAll(() => {
    stepSequenceItem = shallow(
      <StepSequenceItem
        ariaLabel='Step 1 of 5'
        indicator='2'
        stepNumber={ 1 }
        totalSteps={ 5 }
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

  test('without ariaLabel field', () => {
    stepSequenceItem.setProps({ ariaLabel: undefined });
    expect(stepSequenceItem).toMatchSnapshot();
  });
});
