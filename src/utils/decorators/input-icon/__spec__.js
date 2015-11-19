import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react/lib/ReactTestUtils';
import InputIcon from './index';

describe('InputIcon', () => {
let instance, icon, inputIconInstance;


  class TestClass{
    inputProps = {
      id: 'bar'
    };
  }

  beforeEach(() => {
    let ExtendedClass = InputIcon(TestClass);

    instance = new ExtendedClass;
    icon = 'foo';
    inputIconInstance = instance.inputIconHTML(icon);
  });

  describe('inputIconHTML', () => {
    it('contains a label with the components id', () => {
      expect(inputIconInstance.props.htmlFor).toEqual('bar');
    });

    it('contains an icon with a type corresponding to the passed in icon', () => {
      expect(inputIconInstance.props.children.props.type).toEqual('foo');
    });

    it('sets a default className', () => {
      expect(inputIconInstance.props.children.props.className).toEqual('ui-input-icon');
    });
  });
});
