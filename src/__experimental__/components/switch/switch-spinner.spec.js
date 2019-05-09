import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import SwitchSpinner from './switch-spinner.component';

function render(props) {
  return TestRenderer.create(<SwitchSpinner { ...props } />);
}

describe('SwitchSpinner', () => {
  it('renders as expected', () => {
    expect(render()).toMatchSnapshot();
  });
});
