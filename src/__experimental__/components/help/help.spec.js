import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import Help from './help.component';

function render(props) {
  return TestRenderer.create(<Help { ...props } />);
}

describe('Help', () => {
  it('renders as expected', () => {
    expect(render()).toMatchSnapshot();
  });

  it('correctly renders different icon types', () => {
    expect(render({ type: 'info' })).toMatchSnapshot();
  });
});
