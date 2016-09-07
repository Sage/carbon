import React from 'react';
import InputIcon from './input-icon';

class TestClass extends React.Component {
  inputProps = {
    id: 'bar'
  }
}

let ExtendedClass = InputIcon(TestClass);
let klass = new ExtendedClass;

describe('InputIcon', () => {
  let instance;

  beforeEach(() => {
    instance = klass.inputIconHTML('foo');
  });

  describe('inputIconHTML', () => {
    it('contains a label with the components id', () => {
      expect(instance.props.htmlFor).toEqual('bar');
    });

    it('contains an icon with a type corresponding to the passed in icon', () => {
      expect(instance.props.children.props.type).toEqual('foo');
    });

    it('sets a default className', () => {
      expect(instance.props.children.props.className).toEqual('carbon-input-icon');
    });
  });

  describe('mainClasses', () => {
    it('returns the class', () => {
      expect(klass.mainClasses).toEqual('common-input--with-icon');
    });
  });

  describe('readOnly', () => {
    it('should return null', () => {
      klass.props = {
        readOnly: true
      };
      instance = klass.inputIconHTML('foo');
      expect(instance).toBe(null);
    });
  });

  describe('disabled', () => {
    it('should return null', () => {
      klass.props = {
        disabled: true
      };
      instance = klass.inputIconHTML('foo');
      expect(instance).toBe(null);
    });
  });
});
