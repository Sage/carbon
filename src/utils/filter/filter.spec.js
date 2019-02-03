import React from 'react';
import { shallow } from 'enzyme';
import filterChildren from './filter.util';

describe('filter', () => {
  it('filters the given children based on the value', () => {
    const ExampleComponent = ({ children, filter }) => (
      <div>{ filterChildren({ filter })(children) }</div>
    );
    const wrapper = shallow(
      <ExampleComponent filter='foo'>
        <div text='foo' />
        <div text='foo bar' />
        <div text='qux' />
        <div />
      </ExampleComponent>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.props().children.length).toEqual(2);
  });
});
