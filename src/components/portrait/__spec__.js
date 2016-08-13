import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Portrait from './portrait';
import MD5 from 'crypto-js/md5';

describe('Portrait', () => {
  let instance, gravatarInstance, initialsInstance;

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

    initialsInstance = TestUtils.renderIntoDocument(
      <Portrait
        gravatar='foo'
        initials="foo"
        size="small"
      />
    );
  });

  describe('componentWillReceiveProps', () => {
    let props;

    beforeEach(() => {
      initialsInstance.memoizeInitials = "foobar";
      props = {
        initials: "foo",
        size: "small"
      };
    });

    describe('if initials are different', () => {
      it('nulls the cache', () => {
        props.initials = "bar";
        initialsInstance.componentWillReceiveProps(props);
        expect(initialsInstance.memoizeInitials).toEqual(null);
      });
    });

    describe('if size is different', () => {
      it('nulls the cache', () => {
        props.size = "medium";
        initialsInstance.componentWillReceiveProps(props);
        expect(initialsInstance.memoizeInitials).toEqual(null);
      });
    });

    describe('if nothing changes', () => {
      it('keeps the cache', () => {
        initialsInstance.componentWillReceiveProps(props);
        expect(initialsInstance.memoizeInitials).toEqual("foobar");
      });
    });
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

  describe('generateInitials', () => {
    describe('if cached', () => {
      it('returns the cached result', () => {
        gravatarInstance.memoizeInitials = 'foo';
        expect(gravatarInstance.generateInitials).toEqual('foo');
      });
    });

    describe('if not cached', () => {
      it('returns new image', () => {
        expect(gravatarInstance.generateInitials).toMatch('data:image/png');
      });
    });

    describe('darkBackground', () => {
      it('uses a dark background color', () => {
        instance = TestUtils.renderIntoDocument(
          <Portrait
            src='foo'
            darkBackground={ true }
          />
        );
        let context = { fillRect: () => {} };
        instance.applyBackground(context);
        expect(context.fillStyle).toEqual("#4E545F");
      });
    });
  });

  describe('imgProps', () => {
    describe('when a gravatar is passed', () => {
      it('returns gravatar src', () => {
        let src = gravatarInstance.imgSrc;
        let base = 'http://www.gravatar.com/avatar/';
        let hash = MD5('foo');
        let size = '60'

        expect(src).toEqual(`${base}${hash}?s=${size}&d=blank`);
      });
    });

    describe('when a src is passed', () => {
      it('returns the passed src as the image source', () => {
        let src = instance.imgSrc;
        expect(src).toEqual('foo');
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
      expect(gravatarInstance.mainClasses).toEqual('ui-portrait ui-portrait--image ui-portrait--medium ui-portrait--standard');
    });

    it('appends additional passed classNames', () => {
      expect(instance.mainClasses).toEqual('ui-portrait ui-portrait--image ui-portrait--medium ui-portrait--standard custom-class');
    });
  });

  describe('render', () => {
    it('renders a html img', () => {
      expect(TestUtils.findRenderedDOMComponentWithTag(instance, 'img')).toBeTruthy();
    });
  });
});
