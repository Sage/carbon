import React from 'react';
import { shallow } from 'enzyme';
import Wizard from './wizard';

describe('<Wizard />', () => {
  let wizard;

  beforeAll(() => {
    wizard = shallow(
      <Wizard
        steps={ [
          { label: 'foo', state: 'complete' },
          { label: 'bar', state: 'current' },
          { label: 'baz', state: 'incomplete' }
        ] }
        current='1'
      >
        <div>Step 1</div>
        <div>Step 2</div>
        <div>Step 3</div>
      </Wizard>
    );
  });

  test('basic render', () => {
    expect(wizard).toMatchSnapshot();
  });
});
