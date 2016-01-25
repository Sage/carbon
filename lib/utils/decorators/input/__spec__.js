import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Input from './input';

class TestClassOne extends React.Component {
  get mainClasses() {
    return "testMain"
  }

  get inputClasses() {
    return "testInput"
  }

  render() {
    return <div></div>;
  }
}

class TestClassTwo extends React.Component {
  count = 0;

  shouldComponentUpdate(nextProps, nextState) {
    this.count++;
  }

  render() {
    return <div></div>;
  }
}

let ExtendedClassOne = Input(TestClassOne);
let ExtendedClassTwo = Input(TestClassTwo);

describe('Input', () => {
  let instance, instanceTwo, onChange;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(React.createElement(ExtendedClassOne, {
      name: 'foo'
    }));

    instanceTwo = TestUtils.renderIntoDocument(React.createElement(ExtendedClassTwo, {
      name: 'bar'
    }));

    onChange = jasmine.createSpy('onChange');
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
      it('calls the components function as well', () => {
        let nextProps = { name: 'bar' };
        let nextState = instance.state;

        expect(instanceTwo.shouldComponentUpdate(nextProps, nextState)).toBeTruthy;
        instance.shouldComponentUpdate(nextProps, nextState);
        expect(instanceTwo.count).toEqual(1);
      });
    });
  });

  describe('_handleOnChange', () => {
    it('calls the components onChange handler if it has one', () => {
      instance = TestUtils.renderIntoDocument(React.createElement(ExtendedClassOne, {
        onChange: onChange,
        name: 'foo'
      }));
      instance._handleOnChange('foo')
      expect(onChange).toHaveBeenCalledWith('foo', instance.props);
    });

    it('should not call the onChange handler if the component has no onChange handler', () => {
      instance._handleOnChange('foo')
      expect(onChange).not.toHaveBeenCalled()
    });
  });

  describe('mainClasses', () => {
    describe('When readOnly', () => {
      it('returns classes with readonly class', () => {
        instance = TestUtils.renderIntoDocument(React.createElement(ExtendedClassOne, {
          onChange: onChange,
          name: 'foo',
          readOnly: true
        }));
        expect(instance.mainClasses).toEqual('testMain common-input--readonly common-input');
      });
    });

    describe('When the component includes main class names', () => {
      it('returns component and additional decorated classes', () => {
        expect(instance.mainClasses).toEqual('testMain common-input');
      });
    });

    describe('When the component does not include any main class names', () => {
      it('returns the decorated class names only', () => {
        expect(instanceTwo.mainClasses).toEqual(' common-input');
      });
    });

    describe('When custom classes are added', () => {
      it('returns component and additional custom classes', () => {
        instance = TestUtils.renderIntoDocument(React.createElement(ExtendedClassOne, {
          className: 'foobar',
          name: 'foo'
        }));
        expect(instance.mainClasses).toEqual('testMain foobar common-input');
      });
    });

    describe('When an alignment is provided', () => {
      it('returns with a align class', () => {
        instance = TestUtils.renderIntoDocument(React.createElement(ExtendedClassOne, {
          align: 'right',
          name: 'foo'
        }));
        expect(instance.mainClasses).toEqual('testMain common-input--align-right common-input');
      });
    });
  });

  describe('inputClasses', () => {
    describe('When the component includes input class names', () => {
      it('returns component and additional decorated classes', () => {
        expect(instance.inputClasses).toEqual('testInput common-input__input');
      });
    });

    describe('When the component does not include any main class names', () => {
      it('returns the decorated class names only', () => {
        expect(instanceTwo.inputClasses).toEqual(' common-input__input');
      });
    });
  });

  describe('inputProps', () => {
    describe('when the component has its own onChange handler', () => {
      it('passes the change event through the Input change handler', () => {
        instanceTwo.inputProps.onChange = onChange;
        expect(instanceTwo.inputProps.onChange).toEqual(instanceTwo._handleOnChange);
      });
    });
  });

  describe('fieldProps', () => {
    it('adds a class name', () => {
      expect(instanceTwo.fieldProps.className).toEqual('common-input__field');
    });
  });
});
