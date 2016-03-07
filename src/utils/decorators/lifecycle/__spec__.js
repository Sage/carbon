import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import LifecycleDecorator from './lifecycle';

class TestClassOne extends React.Component {

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

let ExtendedClassOne = LifecycleDecorator(TestClassOne);
let ExtendedClassTwo = LifecycleDecorator(TestClassTwo);

fdescribe('Lifecycle Decorator', () => {
  let instance, instanceTwo;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(React.createElement(ExtendedClassOne, {
      name: 'foo'
    }));

    instanceTwo = TestUtils.renderIntoDocument(React.createElement(ExtendedClassTwo, {
      name: 'bar'
    }));
  });

  describe('shouldComponentUpdate', () => {
    describe('when Composed Component does not have a shouldComponentUpdate method', () => {
      it('calls impements the decorators method', () => {
        let nextProps = { name: 'change' },
            nextState = instance.state;
        expect(instance.shouldComponentUpdate(nextProps, nextState)).toBeTruthy();
      });
    });

    describe('when Composed Component has a shouldComponentUpdate method', () => {
      it('calls its own method', () => {
        let nextProps = { name: 'change' },
            nextState = instance.state;
        instanceTwo.shouldComponentUpdate(nextProps, nextState)
        expect(instanceTwo.count).toEqual(1);
      });
    });
  });
});
