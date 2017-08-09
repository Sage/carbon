import React from 'react';
import { shallow } from 'enzyme';
import Column from './';

describe('Column', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Column>
        <span />
      </Column>
    );
  });

  it('renders children', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('classes', () => {
    describe('when className is passed', () => {
      it('renders a passed className', () => {
        wrapper.setProps({ className: 'myclass' });
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('when columnClasses is passed', () => {
      it('renders a passed columnClasses', () => {
        wrapper.setProps({ columnClasses: 'myColumnClasses' });
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('when className and columnClasses is passed', () => {
      it('renders both classes', () => {
        wrapper.setProps({ columnClasses: 'myColumnClasses', className: 'myClass' });
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('options', () => {
    describe('columnOffset', () => {
      it('renders a columnOffset class', () => {
        wrapper.setProps({ columnOffset: '2' });
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('columnAlign', () => {
      it('renders a columnAlign class', () => {
        wrapper.setProps({ columnAlign: 'left' });
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('columnSpan', () => {
      it('renders a columnSpan class', () => {
        wrapper.setProps({ columnSpan: '2' });
        expect(wrapper).toMatchSnapshot();
      });
    });

    describe('columnDivide', () => {
      it('renders a columnDivide class', () => {
        wrapper.setProps({ columnDivide: true });
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
