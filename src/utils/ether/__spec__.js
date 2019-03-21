import { append, styleElement, acronymize, validProps, insertAt, filterOutInputEvents } from './ether.js';
import React from 'react';
import PropTypes from 'prop-types';
import TestUtils from 'react-dom/test-utils';
import Pod from 'components/pod';

describe('Ether', () => {
  let element;

  beforeEach(() => {
    element = TestUtils.renderIntoDocument(
      <Pod className='ether-test'/>
    );
  });

  describe('styleElement', () => {
    it('sets the attribute style to the passed in value', () => {
      let domInstance = TestUtils.findRenderedDOMComponentWithClass(element, 'ether-test');
      expect(domInstance.style.left).toEqual('');
      styleElement(domInstance, 'left', '10px');
      expect(domInstance.style.left).toEqual('10px');
    });
  });

  describe('append', () => {
    it('returns a string value with px appended', () => {
      expect(append(20, "px")).toEqual('20px');
      expect(append("20", "%")).toEqual('20%');
    });
  });

  describe('acronymize', () => {
    it('creates an acronym', () => {
      expect(acronymize("Foo bar Baz")).toEqual("FbB");
    });

    it('does not throw an error if an empty string', () => {
      expect(acronymize('')).toEqual('');
    });

    it('does not throw an error if there are no letters', () => {
      expect(acronymize('    ')).toEqual('');
    });

    it('does not throw an error if undefined is passed', () => {
      expect(acronymize(undefined)).toEqual('');
    });
  });

  describe('validProps', () => {

    class Foo {

      constructor() {
        this.props = { foo: 'foo', bar: 'bar', quux: 'quux'};
      }

      static propTypes = {
        foo: PropTypes.bool,
        bar: PropTypes.bool
      };

      static safeProps = ['foo'];
    }

    it('creates valid props', () => {
      const instance = new Foo();
      expect(validProps(instance)).toEqual({ foo: 'foo', quux: 'quux' });
    });

    it('creates valid props with explicit safeProps', () => {
      const instance = new Foo();
      expect(validProps(instance, ['bar'])).toEqual({ bar: 'bar', quux: 'quux' });
    });
  });

  describe('insertAt', () => {
    describe('default separator', () => {
      it('returns a string formatted with dashes', () => {
        expect(insertAt('123456', {insertionIndices: [2, 5] })).toEqual('12-34-56');
      });
    });

    describe('custom separator', () => {
      it('returns a string formatted with the separator', () => {
        expect(insertAt('1234567890', {insertionIndices: [3, 7], separator:'/'})).toEqual('123/456/7890');
      });
    });

    describe('when the insertion index is beyond the value length', () => {
      it('ignores the invalid index', () => {
        expect(insertAt('1234567890', {insertionIndices: [3, 7, 15], separator:'/'})).toEqual('123/456/7890');
      });
    });
  });

  describe('filterOutInputEvents', () => {
    const props = {
      value: 'foo',
      otherProp: 'bar',
      children: <div />,
      onFocus: () => {},
      onBlur: () => {},
      onChange: () => {},
      onMouseDown: () => {},
      onMouseUp: () => {},
      onClick: () => {},
      onKeyDown: () => {},
      onKeyUp: () => {},
      onKeyPress: () => {},
    };

    const filteredProps = {
      value: props.value,
      otherProp: props.otherProp,
      children: props.children
    };

    it('returns properly filtered props', () => {
      expect(filterOutInputEvents(props)).toEqual(filteredProps);
    });
  });
});
