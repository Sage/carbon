import { append, styleElement, acronymize, validProps, insertAt } from './ether.js';
import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
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
  });

  describe('validProps', () => {

    class Foo {

      constructor() {
        this.props = { foo: 'foo', bar: 'bar', quux: 'quux'};
      }

      static propTypes = {
        foo: React.PropTypes.bool,
        bar: React.PropTypes.bool
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
        expect(insertAt('123456', {interval: 2})).toEqual('12-34-56');
      });
    });

    describe('custom separator', () => {
      it('returns a string formatted with the separator', () => {
        expect(insertAt('123456789', {interval: 3, separator:'/'})).toEqual('123/456/789');
      });
    });

    describe('an invalid interval', () => {
      beforeAll(() => {
        spyOn(console, 'warn');
      });

      it('returns a warning', () => {
        insertAt('123456', {interval: 7});
        expect(console.warn).toHaveBeenCalledWith('The interval cannot be greater than the string length');
      });
    });
  });
});
