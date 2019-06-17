import React from 'react';
import { shallow } from 'enzyme';
import { Row, Column } from '../row';
import Label from '../../__experimental__/components/label';
import Textbox from '../../__experimental__/components/textbox';
import InlineInputs from './inline-inputs.component';

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
      </InlineInputs>
    );
  });

  it('renders with main class', () => {
    expect(['my-custom-class'].every(c => wrapper.hasClass(c))).toBeTruthy();
  });

  describe('when a label prop is passed in', () => {
    it('contains a label', () => {
      const label = wrapper.find(Label);
      expect(label.props().children).toEqual('My Test Label');
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
        </InlineInputs>
      );
    });

    it('does not contain a label', () => {
      const label = wrapper.find(Label);

      expect(label.exists()).toBe(false);
    });
  });

  it('contains a row', () => {
    const row = wrapper.find(Row);
    expect(row.exists()).toBe(true);
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
