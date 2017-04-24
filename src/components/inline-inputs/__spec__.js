import React from 'react';
import PropTypes from 'prop-types';
import TestUtils from 'react-dom/test-utils';
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
    expect(['carbon-inline-inputs', 'my-custom-class'].every(c => wrapper.hasClass(c))).toBeTruthy();
  });

  describe('when a label prop is passed in', () => {
    it('contains a label', () => {
      let label = wrapper.find('.carbon-inline-inputs__label');
      expect(label.text()).toEqual('My Test Label');
    });
  });

  describe('when a label prop is not passed in', () => {
    beforeEach(() => {
      wrapper = shallow(
        <InlineInputs
          className='my-custom-class'
        >
          <Textbox />
          <Textbox />
        </ InlineInputs>
      );
    });

    it('does not contain a label', () => {
      let label = wrapper.find('.carbon-inline-inputs__label');
      expect(label.length).toEqual(0);
    });
  });

  it('contains a row', () => {
    let row = wrapper.find('.carbon-inline-inputs__inputs');
    expect(row.length).toEqual(1);
  });

  it('renders its children', () => {
    expect(wrapper.find(Textbox).length).toEqual(2);
  });
});
