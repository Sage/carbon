import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Input from './index';
import _ from 'lodash';

class TestClassOne {
  props = {
    name: 'foo'
  };

  context = {
    form: 'model_1'
  };

  state = [];

  get mainClasses() {
    return "testMain"
  }

  get inputClasses() {
    return "testInput"
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!_.isEqual(this.props, nextProps) ||
        !_.isEqual(this.state, nextState)) {
      return true;
    }
    else {
      return false;
    }
  }

}

class TestClassTwo {
  props = {
    name: 'bar'
  };

  context = {
    form: 'model_2'
  };
}

describe('Input', () => {
  let instance, instanceTwo, instanceEmpty;

  beforeEach(() => {
    let extendedClassOne = Input(TestClassOne);
    instance = new extendedClassOne();

    let extendedClassTwo = Input(TestClassTwo);
    instanceTwo = new extendedClassTwo();
  });

  describe('shouldComponentUpdate', () => {
    it('returns true if props have changed', () => {
      let nextProps = { name: 'bar' };
      let nextState = instance.state;

      expect(instance.shouldComponentUpdate(nextProps, nextState)).toBeTruthy();
    });

    it('returns true if state has changed', () => {
      let nextProps = instance.props;
      let nextState = [1,2,3];

      expect(instance.shouldComponentUpdate(nextProps, nextState)).toBeTruthy();
    });

    it('returns false if neither state nor props have changed', () => {
      let nextProps = instance.props;
      let nextState = instance.state;

      expect(instance.shouldComponentUpdate(nextProps, nextState)).toBeFalsy();
    });

    describe('when the component defines a shouldComponentUpdate function', () => {
      it('uses the components function and returns true when props have changed', () => {
        let nextProps = { name: 'bar' };
        let nextState = instance.state;

        expect(instanceTwo.shouldComponentUpdate(nextProps, nextState)).toBeTruthy();
      });
    });
  });

  describe('mainClasses', () => {

    describe('When the component includes main class names', () => {
      it('returns component and additional decorated classes', () => {
        expect(instance.mainClasses).toEqual('testMain base-input');
      });
    });

    describe('When the component does not include any main class names', () => {
      it('returns the decorated class names only', () => {
        expect(instanceTwo.mainClasses).toEqual(' base-input');
      });
    });
  });

  describe('inputClasses', () => {

    describe('When the component includes input class names', () => {
      it('returns component and additional decorated classes', () => {
        expect(instance.inputClasses).toEqual('testInput base-input__input');
      });
    });

    describe('When the component does not include any main class names', () => {
      it('returns the decorated class names only', () => {
        expect(instanceTwo.inputClasses).toEqual(' base-input__input');
      });
    });
  });

  describe('inputProps', () => {

    describe('when no inputProps are passed', () => {
      it('sets inputProps to an empty object', () => {
        expect(instanceTwo.inputProps).toMatch(/([bar])/);
      });
    });
  });

});
