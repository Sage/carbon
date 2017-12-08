import React from 'react';
import TestUtils from 'react-dom/test-utils';
import ShouldComponentUpdateDecorator from './should-component-update';

class TestClassOne extends React.Component {

  render() {
    return <div></div>;
  }
}

let ExtendedClassOne = ShouldComponentUpdateDecorator(TestClassOne);

describe('Should Component Update Decorator', () => {
  let instance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(React.createElement(ExtendedClassOne, {
      name: 'foo'
    }));
  });

  describe('when props have changed', () => {
    it('returns true', () => {
      let nextProps = { name: 'change' },
          nextState = instance.state;
      expect(instance.shouldComponentUpdate(instance, nextProps, nextState)).toBeTruthy();
    });
  });

  describe('when props and state have not changed', () => {
    it('returns false', () => {
      let nextProps = instance.props,
          nextState = instance.state;
      expect(instance.shouldComponentUpdate(instance, nextProps, nextState)).toBeTruthy();
    });
  });

  describe('when state has changed', () => {
    it('returns true', () => {
      let nextState = { name: 'change' },
          nextProps = instance.props;
      expect(instance.shouldComponentUpdate(instance, nextProps, nextState)).toBeTruthy();
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
        const DecoratedComponent = ShouldComponentUpdateDecorator(Foo);
        expect(DecoratedComponent.displayName).toBe(displayName);
      });
    });

    describe('when ComposedComponent.displayName is undefined', () => {
      it('sets Component.displayName to ComposedComponent.name', () => {
        const DecoratedComponent = ShouldComponentUpdateDecorator(Foo);
        expect(DecoratedComponent.displayName).toBe('Foo');
      });
    });
  });
});
