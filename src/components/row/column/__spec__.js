import React from 'react';
import { shallow } from 'enzyme';
import Column from './';

describe('Column', () => {

  let wrapper = shallow(
    <Column className='myclass'>
      <span />
    </Column>
  );

  it('renders children', () => {
    expect(wrapper.find('span').length).toEqual(1);
  });

  it('renders passed className', () => {
    expect(wrapper.node.props.className).toEqual('carbon-column myclass');
  });

  describe('options', () => {
    describe('columnOffset', () => {
      it('renders a columnOffset class', () => {
        wrapper.setProps({ columnOffset: 2 });
        expect(wrapper.node.props.className).toMatch('carbon-column--offset-2');
      });
    });

    describe('columnAlign', () => {
      it('renders a columnAlign class', () => {
        wrapper.setProps({ columnAlign: 2 });
        expect(wrapper.node.props.className).toMatch('carbon-column--align-2');
      });

    });

    describe('columnSpan', () => {
      it('renders a columnSpan class', () => {
        wrapper.setProps({ columnSpan: 2 });
        expect(wrapper.node.props.className).toMatch('carbon-column--span-2');
      });

    });

    describe('columnDivide', () => {
      it('renders a columnOffset class', () => {
        wrapper.setProps({ columnDivide: true });
        expect(wrapper.node.props.className).toMatch('carbon-column--column-divide');
      });
    });
  });
});
