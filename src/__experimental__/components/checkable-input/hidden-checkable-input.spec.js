import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import HiddenCheckableInput from './hidden-checkbox.component';

function render(props) {
  return TestRenderer.create(<HiddenCheckableInput { ...props } />);
}

describe('HiddenCheckableInput', () => {
  it('renders as expected', () => {
    expect(render()).toMatchSnapshot();
  });
});
