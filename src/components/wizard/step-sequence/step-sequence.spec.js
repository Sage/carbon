import React from 'react';
import { shallow } from 'enzyme';
import StepSequence from './step-sequence';

describe('<StepSequence />', () => {
  let stepSequence;

  beforeAll(() => {
    stepSequence = shallow(
      <StepSequence
        current='1'
        steps={ [
          { label: 'foo', state: 'complete' },
          { label: 'bar', state: 'current' },
          { label: 'baz', state: 'incomplete' }
        ] }
      />
    );
  });

  test('basic render', () => {
    expect(stepSequence).toMatchSnapshot();
  });
});
