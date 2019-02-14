import React from 'react';
import { shallow } from 'enzyme';
import Option from './option.component';

describe('Option', () => {
  const renderWrapper = props => shallow(
    <Option { ...props } />
  );

  it('renders with the given children', () => {
    const props = { value: '1', text: 'foo' };
    expect(renderWrapper(props)).toMatchSnapshot();
  });

  it('renders with the text if no children are provided', () => {
    const props = { value: '1', text: 'foo', children: 'bar' };
    expect(renderWrapper(props)).toMatchSnapshot();
  });
});
