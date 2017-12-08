import React from 'react';
import { shallow } from 'enzyme';

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
    let iconWrapper,
        icon;

    describe("when not an error", () => {
      beforeEach(() => {
        iconWrapper = shallow(klass.inputIconHTML('foo')).find('label');
      });
      it("returns a label wrapper with the correct id in the HTML for", () => {
        expect(iconWrapper.length).toEqual(1);
        expect(iconWrapper.props().htmlFor).toEqual('bar');
      });
      it("contains a carbon-input-icon with the icon value in from the call", () => {
        icon = iconWrapper.find('.carbon-input-icon');
        expect(icon.length).toEqual(1);
        expect(icon.props().type).toEqual('foo');
      });
    });

    describe("when is an error", () => {
      beforeEach(() => {
        iconWrapper = shallow(klass.inputIconHTML('error')).find('label');
      });
      it("contains a carbon-input-icon--error container", () => {
        let icon = iconWrapper.find('.carbon-input-icon--error');
        expect(icon.length).toEqual(1);
      });
    });

    describe("when is an warning", () => {
      beforeEach(() => {
        iconWrapper = shallow(klass.inputIconHTML('warning')).find('label');
      });
      it("contains a carbon-input-icon--warning container", () => {
        let icon = iconWrapper.find('.carbon-input-icon--warning');
        expect(icon.length).toEqual(1);
      });
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

  describe('displayName', () => {
    class Foo extends React.Component { // eslint-disable-line react/no-multi-comp
      bar = () => {
        return 'bar';
      }
    }

    const displayName = 'FooClass';

    describe('when ComposedComponent.displayName is defined', () => {
      beforeEach(() => {
        Foo.displayName = displayName;
      });
      afterEach(() => {
        Foo.displayName = undefined;
      });

      it('sets Component.displayName to ComposedComponent.displayName', () => {
        const DecoratedComponent = InputIcon(Foo);
        expect(DecoratedComponent.displayName).toBe(displayName);
      });
    });

    describe('when ComposedComponent.displayName is undefined', () => {
      it('sets Component.displayName to ComposedComponent.name', () => {
        const DecoratedComponent = InputIcon(Foo);
        expect(DecoratedComponent.displayName).toBe('Foo');
      });
    });
  });
});
