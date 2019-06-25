import React from 'react';
import TestUtils from 'react-dom/test-utils';
import classNames from 'classnames';
import { Row, Column } from './../row';
import Textbox from './../textbox';
import InlineInputs from './inline-inputs.component';
import { shallow } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';

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

  describe('children', () => {
    describe('when their are multiple children', () => {
      it('renders its children', () => {
        expect(wrapper.find(Textbox).length).toEqual(2);
      });

      it('wraps all its children in a Column', () => {
        expect(wrapper.find(Column).length).toEqual(2);
      });
    });

    describe('when there is one child', () => {
      beforeEach(() => {
        wrapper.setProps({ children: <Textbox /> });
      });

      it('renders the child', () => {
        expect(wrapper.find(Textbox).length).toEqual(1);
      });

      it('wraps the child in a Column', () => {
        expect(wrapper.find(Column).length).toEqual(1);
      });
    });
  });
});
