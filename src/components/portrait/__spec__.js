import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Portrait from './portrait';
import MD5 from 'crypto-js/md5';

describe('Portrait', () => {
  let instance, gravatarInstance;

  beforeEach(() => {
    instance = TestUtils.renderIntoDocument(
      <Portrait
        src='foo'
        alt='bla'
        className='custom-class'
      />
    );

    gravatarInstance = TestUtils.renderIntoDocument(
      <Portrait
        gravatar='foo'
      />
    );
  });

  describe('custome props function', () => {
    describe('src and gravatar', () => {
      beforeEach(() => {
        spyOn(console, 'error');
      });

      describe('when neither gravatar or src is passed', () => {
        it('throws a error', () => {
          instance = TestUtils.renderIntoDocument(
            <Portrait />
          );

          expect(console.error).toHaveBeenCalledWith(
            "Warning: Failed propType: Portrait requires a prop of 'src' OR a prop of 'gravatar'"
          );
        });
      });

      describe('when both gravatar and src are passed', () => {
        it('throws a error', () => {
          instance = TestUtils.renderIntoDocument(
            <Portrait
              gravatar='foo'
              src='foo'
            />
          );

          expect(console.error).toHaveBeenCalledWith(
            "Warning: Failed propType: Portrait requires a prop of 'src' OR a prop of 'gravatar' but not both"
          );
        });
      });
    });
  });

  describe('imgProps', () => {
    describe('when a gravatar is passed', () => {
      it('returns gravatar props', () => {
        let props = gravatarInstance.imgProps;
        let base = 'http://www.gravatar.com/avatar/';
        let hash = MD5('foo');
        let size = '70'

        expect(props.src).toEqual(`${base}${hash}?s=${size}`);
      });
    });

    describe('when a src is passed', () => {
      it('returns the passed src as the image source', () => {
        let props = instance.imgProps;
        expect(props.src).toEqual('foo');
      });
    });
  });

  describe('numericSizes', () => {
    it('returns a object mapping size to numeric value', () => {
      expect(instance.numericSizes.small).toEqual('30');
    });
  });

  describe('mainClasses', () => {
    it('adds a ui-portrait classes', () => {
      expect(gravatarInstance.mainClasses).toEqual('ui-portrait ui-portrait--lmed ui-portrait--standard');
    });

    it('appends additional passed classNames', () => {
      expect(instance.mainClasses).toEqual('ui-portrait ui-portrait--lmed ui-portrait--standard custom-class');
    });
  });

  describe('render', () => {
    it('renders a html img', () => {
      expect(TestUtils.findRenderedDOMComponentWithTag(instance, 'img')).toBeTruthy();
    });
  });
});
