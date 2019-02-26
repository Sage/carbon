import React, { Component } from 'react';
import { shallow } from 'enzyme';
import withUniqueName from './with-unique-name.hoc';

describe('withUniqueName HOC', () => {
  let wrapper;
  it('adds a name prop to a component passed as a paramater', () => {
    wrapper = shallow(React.createElement('div', [], []));
    expect(wrapper.props().name).toEqual(undefined);
    const InputComponent = withUniqueName(React.createElement('div', [], []));
    wrapper = shallow(<InputComponent />);
    expect(wrapper.props().name).not.toEqual(undefined);
  });

  it('either allows the name prop to be overriden or randomnly generates one', () => {
    const InputComponent = withUniqueName(Component);
    wrapper = shallow(<InputComponent name='foo' />);
    expect(wrapper.props().name).toEqual('foo');
    wrapper = shallow(<InputComponent />);
    const { name } = wrapper.props();
    expect(wrapper.props().name).toEqual(name);
  });

  it('the generated name prop is persisted even after re-render', () => {
    const InputComponent = withUniqueName(Component);
    wrapper = shallow(<InputComponent />);
    const { name } = wrapper.props();
    for (let i = 0; i < 5; i++) {
      wrapper.update();
      expect(wrapper.props().name).toEqual(name);
    }
  });
});
