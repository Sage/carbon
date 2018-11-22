import React from 'react';
import { shallow } from 'enzyme';
import StepSequence from './step-sequence';

describe('<StepSequence />', () => {
  let stepSequence;

  beforeAll(() => {
    stepSequence = shallow(
      <StepSequence>
        <div>Children</div>
      </StepSequence>
    );
  });

  test('basic render', () => {
    expect(stepSequence).toMatchSnapshot();
  });
});
