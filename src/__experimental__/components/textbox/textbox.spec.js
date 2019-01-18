import React from 'react';
import { mount } from 'enzyme';
import Textbox from '.';

/* global jest */
describe('Textbox', () => {
  let wrapper;
  const val = 'Purple';
  const fn = () => 'test';

  beforeEach(() => {
    wrapper = mount(
      <Textbox value={ val } onChange={ fn } />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders with InputPresentationContext and Input', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has a input child, with the "value" prop passed down with the expected value', () => {
    expect(wrapper.find('input.carbon-input').props().value).toEqual(val);
  });

  it('has a input child, with the "onChange" prop passed down with the expected value', () => {
    expect(wrapper.find('input.carbon-input').props().onChange).toEqual(fn);
  });

  it('has a input child, with the "onChange" prop passed down with the expected value', () => {
    expect(wrapper.find('input.carbon-input').props().fakeProp).toBeFalsy();
  });
});
