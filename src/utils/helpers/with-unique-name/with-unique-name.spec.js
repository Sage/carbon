import React from 'react';
import { shallow } from 'enzyme';
import withUniqueName from '.';

const MockComponent = props => <input { ...props } />;

const WithNoName = withUniqueName(() => <input />);

describe('withUniqueName HOC', () => {
  let wrapper;
  const InputComponent = withUniqueName(MockComponent);

  it('matches the snapshot when the it is passed an anonymous component with no name or display name', () => {
    wrapper = shallow(<WithNoName name='foo' />);
    expect(wrapper).toMatchSnapshot();
  });

  it('adds a name prop to a component passed as a paramater', () => {
    wrapper = shallow(<MockComponent />);
    expect(wrapper.props().name).toEqual(undefined);
    wrapper = shallow(<InputComponent />);
    expect(wrapper.props().name).not.toEqual(undefined);
  });

  it('either allows the name prop to be overriden or randomnly generates one', () => {
    wrapper = shallow(<InputComponent name='foo' />);
    expect(wrapper.props().name).toEqual('foo');
  });

  it('the generated name prop is persisted even after re-render', () => {
    wrapper = shallow(<InputComponent value='foo' />);
    const { name } = wrapper.props();
    for (let i = 0; i < 5; i++) {
      wrapper.setProps({ value: i });
      expect(wrapper.props().name).toEqual(name);
    }
  });
});
