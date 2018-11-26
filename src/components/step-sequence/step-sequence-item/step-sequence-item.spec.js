import React from 'react';
import { shallow } from 'enzyme';
import StepSequenceItem from './step-sequence-item';

describe('<StepSequenceItem />', () => {
  let stepSequenceItem;

  beforeAll(() => {
    stepSequenceItem = shallow(
      <StepSequenceItem
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

  test('without aria label fields', () => {
    stepSequenceItem.setProps({ stepNumber: undefined, totalSteps: undefined });
    expect(stepSequenceItem).toMatchSnapshot();
  });
});
