import React from 'react';
import { shallow } from 'enzyme';
import Alert from './alert';

describe('Alert', () => {
  const renderShallow = () => (
    shallow(
      <Alert
        open
        onCancel={ () => {} }
        title='Alert title'
        subtitle='Alert Subtitle'
        data-element='bar'
        data-role='baz'
      />
    )
  );

  it('include correct component, element and role data tags', () => {
    expect(renderShallow()).toMatchSnapshot();
  });
});
