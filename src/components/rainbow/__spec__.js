import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Immutable from 'immutable';
import { shallow, mount } from 'enzyme';
import Rainbow from './rainbow';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';

/* global jest */

describe('Rainbow', () => {
  global.Highcharts = {
    chart() {
      return {
        setTitle() {},
        series: [{ setData() {} }]
      };
    }
  };

  let wrapper, data, chart;

  function render(props = {}) {
    wrapper = mount(
    <Rainbow
      title='My Title' 
      data={ data }
      { ...props }
    />


    );
  }

  beforeEach(() => {
    data = Immutable.fromJS([
      {
        y: 30,
        name: 'First Bit',
        label: 'label for first bit',
        tooltip: 'more info about this bit'
      }, {
        y: 70,
        name: 'Second Bit',
        label: 'label for second bit',
        tooltip: 'more info about this bit'
      }
    ]);
    render();

    const instance = wrapper.instance();
    chart = instance._chart;
  });

  describe('shouldComponentUpdate', () => {
    beforeEach(() => {
      chart.setTitle = jest.fn();
      chart.series[0].setData = jest.fn();
    });

    describe('when title changes', () => {
      test('calls setTitle', () => {
        wrapper.setProps({ title: 'different title', data: wrapper.props().data });
        expect(chart.setTitle).toHaveBeenCalledWith({ text: 'different title' });
      });
    });

    describe('when data changes', () => {
      it('calls setData', () => {
        const newData = Immutable.fromJS({ foo: 'bar' });
        wrapper.setProps({ title: wrapper.props().title, data: newData });
        expect(chart.series[0].setData).toHaveBeenCalledWith(newData);
      });
    });

    describe('when nothing has changed', () => {
      it('calls neither set methods', () => {
        const theProps = wrapper.props();
        wrapper.setProps({ title: theProps.title, data: theProps.data });
        expect(chart.setTitle).not.toHaveBeenCalled();
        expect(chart.series[0].setData).not.toHaveBeenCalled();
      });
    });
  });

  describe('mainClasses', () => {
    it('returns the base class', () => {
      expect(wrapper.instance().mainClasses).toEqual('carbon-rainbow');
    });

    describe('when a custom class is passed', () => {
      it('returns base and custom class', () => {
        render({ className: 'customClass' });
        expect(wrapper.instance().mainClasses).toEqual('carbon-rainbow customClass');
      });
    });
  });

  describe('tags on component', () => {
    const wrapper = shallow(
      <Rainbow
        data-element='bar' 
        data-role='baz'
        data={ Immutable.fromJS({}) }
    />);

    it('include correct component, element and role data tags', () => {
      rootTagTest(wrapper, 'rainbow', 'bar', 'baz');
    });
  });
});
