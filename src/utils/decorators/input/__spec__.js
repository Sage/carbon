import React from 'react';
import Input from './index';

class TestClassOne {
  props = {
    name: 'foo'
  };

  context = {
    form: {
      model: 'model_1'
    }
  };

  state = [];

  get mainClasses() {
    return "testMain"
  }

  get inputClasses() {
    return "testInput"
  }
}

class TestClassTwo {
  props = {
    name: 'bar'
  };

  context = {
    form: {
      model: 'model_2'
    }
  };

  count = 0;

  shouldComponentUpdate(nextProps, nextState) {
    this.count++;
  }
}

describe('Input', () => {

  let instance, instanceTwo, onChange;

  beforeEach(() => {
    let ExtendedClassOne = Input(TestClassOne);
    instance = new ExtendedClassOne();

    let ExtendedClassTwo = Input(TestClassTwo);
    instanceTwo = new ExtendedClassTwo();

    onChange = jasmine.createSpy('onChange');
  });

  describe('shouldComponentUpdate', () => {

    beforeEach(() => {
      instanceTwo.count = 1;
    });

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
      it('calls the components function as well', () => {
        let nextProps = { name: 'bar' };
        let nextState = instance.state;

        expect(instanceTwo.shouldComponentUpdate(nextProps, nextState)).toBeTruthy;
        instance.shouldComponentUpdate(nextProps,nextState);
        expect(instanceTwo.count).toEqual(2);
      });
    });
  });

  describe('_handleOnChange', () => {
    it('calls the components onChange handler if it has one', () => {
      instance.props.onChange = onChange
      instance._handleOnChange('foo')
      expect(onChange).toHaveBeenCalledWith('foo', instance.props);
    });

    it('should not call the onChange handler if the component has no onChange handler', () => {
      instance._handleOnChange('foo')
      expect(onChange).not.toHaveBeenCalled()
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

    describe('inputProps are passed', () => {
      it('builds the name with provided inputProps', () => {
        expect(instanceTwo.inputProps.name).toEqual('model_2[bar]');
      });
    });

    describe('when the component has its own onChange handler', () => {
      it('passes the change event through the Input change handler', () => {
        instanceTwo.inputProps.onChange = onChange;
        expect(instanceTwo.inputProps.onChange).toEqual(instanceTwo._handleOnChange);
      });
    });
  });

});
