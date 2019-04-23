import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import HiddenCheckbox from './hidden-checkbox.component';

function render(props) {
  return TestRenderer.create(<HiddenCheckbox { ...props } />);
}

describe('HiddenCheckbox', () => {
  it('renders as expected', () => {
    expect(render()).toMatchSnapshot();
  });
});
