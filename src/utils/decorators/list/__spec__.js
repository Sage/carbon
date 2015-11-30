import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import List from './index';
import ImmutableHelper from './../../helpers/immutable';
import ReactDOM from 'react-dom';

class Dummy extends React.Component {
  props = {
    name: 'baz',
    value: 1
  }
  emitOnChangeCallback() {}
}

class DummyTwo extends React.Component {
  props = {
    name: 'baz',
    value: 1
  }
  onBlur() {
    return 'foo'
  }
  get inputProps() {
    return {
      onBlur: this.onBlur
    }
  }
}

describe('List', () => {
  let instance, instanceTwo, input;

  beforeEach(() => {
    let ComposedList = List(Dummy);
    instance = new ComposedList();

    let ComposedListTwo = List(DummyTwo);
    instanceTwo = new ComposedListTwo();
  });

  describe('_handleSelect', () => {
    describe('when the component lacks a select handler', () => {
      it('calls emitOnChangeCallback with the selected value', () => {
        spyOn(instance, 'emitOnChangeCallback');
        let ev = { target: { value: 'bar' }};
        instance._handleSelect(ev);
        debugger
        expect(instance.emitOnChangeCallback).toHaveBeenCalledWith(ev.target.value);
      });
    });
  });

  describe('inputProps', () => {
    describe('when the component has its own inputProps', () => {
      it('merges inputProps with those of the component', () => {
        debugger
        spyOn(instanceTwo, '_handleBlur');
        spyOn(instanceTwo, 'onBlur');
        instanceTwo.inputProps.onBlur();
        expect(instanceTwo._handleBlur).toHaveBeenCalled();
        expect(instanceTwo.onBlur).toHaveBeenCalled();
      });
    });

    describe('when the component does not have its own inputProps', () => {
      it('sets inputProps to an object with an onBlur handler', () => {
        spyOn(instance, 'setState');
        instance.inputProps.onBlur();
        expect(instance.setState).toHaveBeenCalledWith({ open: false });
      });
    });
  });

});
