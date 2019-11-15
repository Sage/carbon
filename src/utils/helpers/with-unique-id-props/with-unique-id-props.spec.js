import React from 'react';
import { shallow, mount } from 'enzyme';
import withUniqueIdProps from '.';

const MockComponent = props => <input { ...props } />;

const WithNoProp = withUniqueIdProps(() => <input />);

describe('withUniqueIdProps HOC', () => {
  let wrapper;
  const InputComponent = withUniqueIdProps(MockComponent);

  it('matches the snapshot when the it is passed an anonymous component with no name or display name', () => {
    wrapper = shallow(<WithNoProp name='foo' />);
    expect(wrapper).toMatchSnapshot();
  });

  it('adds a name prop to a component passed as a paramater', () => {
    wrapper = shallow(<MockComponent />);
    expect(wrapper.props().name).toEqual(undefined);
    wrapper = mount(<InputComponent />);
    expect(
      wrapper.find(InputComponent).first().childAt(0).childAt(0)
        .props().name
    ).not.toEqual(undefined);
  });

  it('either allows the name prop to be overriden or randomnly generates one', () => {
    wrapper = shallow(<InputComponent name='foo' />);
    expect(wrapper.props().name).toEqual('foo');
  });

  it('the generated name prop is persisted even after re-render', () => {
    wrapper = shallow(<InputComponent value='foo' />);
    const wrapper2 = mount(<InputComponent value='foo' />);
    expect(
      wrapper2.find(InputComponent).first().childAt(0).childAt(0)
        .props().name
    ).not.toEqual(wrapper.props().name);

    const { name } = wrapper.props();
    for (let i = 0; i < 5; i++) {
      wrapper.setProps({ value: i });
      expect(wrapper.props().name).toEqual(name);
    }
  });
});
