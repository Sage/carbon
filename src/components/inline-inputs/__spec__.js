import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import classNames from 'classnames';
import Row from './../row';
import Textbox from './../textbox';
import InlineInputs from './inline-inputs';
import { shallow } from 'enzyme';

describe('Inline Inputs', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <InlineInputs
        label='My Test Label'
        className='my-custom-class'
      >
        <Textbox />
        <Textbox />
      </ InlineInputs>
    );
  });

  it('renders with main class', () => {
    expect(wrapper.hasClass('carbon-inline-inputs')).toBeTruthy();
  });

  it('renders with custom classes', () => {
    expect(wrapper.hasClass('my-custom-class')).toBeTruthy();
  });

  it('contains a label', () => {
    let label = wrapper.find('.carbon-inline-inputs-label');
    expect(label.text()).toEqual('My Test Label');
  });

  it('contains a row', () => {
    let row = wrapper.find('.carbon-inline-inputs-wrapper');
    expect(row.length).toEqual(1);
  });

  it('renders its children', () => {
    expect(wrapper.find(Textbox).length).toEqual(2);
  });
});
