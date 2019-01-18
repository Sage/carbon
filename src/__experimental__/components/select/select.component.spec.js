import React from 'react';
import { shallow, mount } from 'enzyme';
import Select from '.';

describe('Select', () => {
  let val = { val: { value: '1', label: 'foo' } };
  const fn = () => { val = { val: { value: '1', label: 'bar' } }; };

  const wrapper = mount(
    <Select
      onChange={ fn }
      value={ val }
      label='foo'
      validations={ [{}] }
    />
  );
  console.log(wrapper.instance());
  it('component has props with expected values', () => {
    expect(wrapper.props().onChange).toEqual(fn);
    expect(wrapper.props().label).toEqual('foo');
    expect(wrapper.props().value).toEqual(val);
  });

  it
});
