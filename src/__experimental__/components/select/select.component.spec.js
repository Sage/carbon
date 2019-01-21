import React from 'react';
import TestUtils from 'react-dom/test-utils';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Select from '.';

describe('Select', () => {
  const value = { val: { value: '1', label: 'foo' } };
  const ev1 = { target: { value: '2', label: 'bar' } };
  const fn = (x) => {
    x.setState({ val: ev1.target });
  };

  const wrapper = mount(
    <Select
      onChange={ fn }
      value={ value }
      label='foo'
      validations={ [{}] }
    />
  );
  describe('single value', () => {
    it('component has props with expected values', () => {
      expect(wrapper.props().onChange).toEqual(fn);
      expect(wrapper.props().label).toEqual('foo');
      expect(wrapper.props().value).toEqual(value);
    });
  });

  describe('multiple values', () => {
    let wrapper2;
    const values = {
      val: [
        { value: '1', label: 'foo' },
        { value: '2', label: 'bar' },
        { value: '3', label: 'wiz' }
      ]
    };
    const ev3 = { target: { value: '4', label: 'new!' } };
    const fn2 = (x) => {
      x.instance().setState({ val: ev3.target });
    };

    beforeEach(() => {
      wrapper2 = mount(
        <Select
          onChange={ fn2 }
          value={ values }
          label='foo'
          validations={ [{}] }
        />
      );
    });

    it('component has props with expected values', () => {
      expect(wrapper2.props().onChange).toEqual(fn);
      expect(wrapper2.props().label).toEqual('foo');
      expect(wrapper2.props().value).toEqual(values);
    });

    it('component has value prop with multiple elements', () => {
      expect(wrapper2.prop('value').val.length).toEqual(3);
      expect(wrapper2.prop('value').val[0].value).toEqual('1');
      expect(wrapper2.prop('value').val[0].label).toEqual('foo');
      expect(wrapper2.prop('value').val[1].value).toEqual('2');
      expect(wrapper2.prop('value').val[1].label).toEqual('bar');
      expect(wrapper2.prop('value').val[2].value).toEqual('3');
      expect(wrapper2.prop('value').val[2].label).toEqual('wiz');
    });

    it('to have single InputPresentation and Input components as children', () => {
      const pres = wrapper2.find('InputPresentation');
      const input = wrapper2.find('Input');
      expect(pres.exists()).toBeTruthy();
      expect(input.exists()).toBeTruthy();
      expect(pres.length).toEqual(1);
      expect(input.length).toEqual(1);
    });

    // probs test in separate describe block
    it('calls renderMultiValues', () => {
      const wrapper3 = shallow(
        <Select
          onChange={ fn }
          value={ [
            { value: '1', label: 'foo' },
            { value: '2', label: 'bar' },
            { value: '3', label: 'wiz' }
          ] }
          label='foo'
          validations={ [{}] }
        />
      );
      const fnCall = spyOn(wrapper3.instance(), 'renderMultiValues');
      wrapper3.update();
      expect(fnCall).toBeTruthy();
      expect(fnCall).toBeCalled();
    });

    it('renders the multiple values as Pill components', () => {
      const multiValsElems = shallow(wrapper2.instance().renderMultiValues(values.val));
      const pills = multiValsElems.find('Pill');
      expect(pills.exists()).toBeTruthy();
      expect(pills.length).toEqual(3);
      expect(pills.at(0).props().children).toEqual(values.val[0].label);
      expect(pills.at(1).props().children).toEqual(values.val[1].label);
      expect(pills.at(2).props().children).toEqual(values.val[2].label);
    });

    it('updates filter state', () => {
      const mockedEvent = { target: { value: 'foo' } };
      console.log(wrapper2.find('input'));
      wrapper2.find('input').simulate('change', mockedEvent);
      spyOn(wrapper2.instance(), 'updateFilter');
      // wrapper2.simulate(wrapper2.instance().updateFilter(ev2.target.value));
      expect(wrapper2.instance().updatesFilter).toBeCalled();
    });
  });

  describe('handleFocus', () => {
    describe('if focus is not blocked', () => {
      const instance = TestUtils.renderIntoDocument(
        <Select
          onChange={ fn }
          value={ { value: '1', label: 'foo' } }
          label='foo'
          validations={ [{}] }
        />
      );
      it('calls setState', () => {
        // console.log(instance._input);
        spyOn(instance, 'setState');
        // console.log(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'Input'));
        // eslint-disable-next-line react/no-find-dom-node
        TestUtils.Simulate.focus(ReactDOM.findDOMNode(instance._input));
        expect(instance.setState).toBeCalled();
      });
    });
  });
});
