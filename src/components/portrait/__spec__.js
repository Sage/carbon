import React from 'react';
import TestUtils from 'react-dom/test-utils';
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

  describe('custom props function', () => {
    describe('src and gravatar', () => {
      beforeEach(() => {
        spyOn(console, 'error');
      });

      describe('when neither gravatar or src is passed', () => {
        it('throws a error', () => {
          instance = TestUtils.renderIntoDocument(
            <Portrait />
          );

          expect(console.error.calls.argsFor(0)[0]).toMatch(`Portrait requires a prop of 'src' OR a prop of 'gravatar'`);
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

          expect(console.error.calls.argsFor(0)[0]).toMatch(`Failed prop type: Portrait requires a prop of 'src' OR a prop of 'gravatar' but not both`);
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

    describe("more than three initials are passed", () => {
      it("returns the first three initials in uppercase", () => {
        let context = { fillText: () => {} };
        spyOn(context, 'fillText')
        instance = TestUtils.renderIntoDocument(
          <Portrait
          initials="abcde"
          src="foo"
          />
          );
      instance.applyText(context, 30);
      expect(context.fillText).toHaveBeenCalledWith("ABC", 15, 20);
      });
    });

    describe("is darkBackground is false", () => {
      it("uses a light background colour", () => {
        instance = TestUtils.renderIntoDocument(
          <Portrait
          src='foo'
          darkBackground={ false }
          />
          );
        let context = { fillRect: () => {} };
        instance.applyBackground(context);
        expect(context.fillStyle).toEqual("#D8D9DC");
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
        let base = 'https://www.gravatar.com/avatar/';
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
    it('adds a carbon-portrait classes', () => {
      expect(gravatarInstance.mainClasses).toEqual('carbon-portrait carbon-portrait--image carbon-portrait--medium carbon-portrait--standard');
    });

    it('appends additional passed classNames', () => {
      expect(instance.mainClasses).toEqual('carbon-portrait carbon-portrait--image carbon-portrait--medium carbon-portrait--standard custom-class');
    });
  });

  describe('render', () => {
    it('renders a html img', () => {
      expect(TestUtils.findRenderedDOMComponentWithTag(instance, 'img')).toBeTruthy();
    });

    describe('initialsImage', () => {
      describe('when src is passed', () => {
        it('is not rendered', () => {
          instance = TestUtils.renderIntoDocument(
            <Portrait
              src='foo'
            />
          )

          let initials = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-portrait__initials');
          expect(initials.length).toEqual(0);
        });
      });

      describe('when initials are empty', () => {
        it('is not rendered', () => {
          instance = TestUtils.renderIntoDocument(
            <Portrait
              gravatar='foo'
              initials=""
            />
          )

          let initials = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-portrait__initials');
          expect(initials.length).toEqual(0)
        });
      });

      describe('when src is not passed and initials are not empty', () => {
        it('is rendered', () => {
          instance = TestUtils.renderIntoDocument(
            <Portrait
              gravatar='foo'
              initials="foo"
            />
          )

          let initials = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-portrait__initials');
          expect(initials.length).toEqual(1)
        });
      });
    });

    describe('avatarImage', () => {
      it('returns an image', () => {
        instance = TestUtils.renderIntoDocument(
          <Portrait
            src='foo'
          />
        );

        let avatar = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-portrait__avatar')
        expect(avatar).toBeDefined();
      });
    });

    describe('sansInitialsImage', () => {
      describe('when src is passed', () => {
        it('is not rendered', () => {
          instance = TestUtils.renderIntoDocument(
            <Portrait
              src='foo'
              initials=""
            />
          );

          let pendingUser = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-portrait__sans-initials');
          expect(pendingUser.length).toEqual(0);
        });
      });

      describe('when initials are empty and src is not passed', () => {
        it('is rendered', () => {
          instance = TestUtils.renderIntoDocument(
            <Portrait
              gravatar='foo'
              initials=""
            />
          );

          let pendingUser = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-portrait__sans-initials');
          expect(pendingUser.length).toEqual(1);
        });
      });

      describe('when initials are not defined and src is not passed', () => {
        it('is rendered', () => {
          instance = TestUtils.renderIntoDocument(
            <Portrait
              gravatar='foo'
            />
          );

          let pendingUser = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-portrait__sans-initials');
          expect(pendingUser.length).toEqual(1);
        });
      });

      describe('when initials are not empty and src is not passed', () => {
        it('is not rendered', () => {
          instance = TestUtils.renderIntoDocument(
            <Portrait
              gravatar='foo'
              initials="foo"
            />
          );

          let pendingUser = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-portrait__sans-initials');
          expect(pendingUser.length).toEqual(0);
        });
      });

      describe('when src is passed and initials are not empty', () => {
        it('is rendered', () => {
          instance = TestUtils.renderIntoDocument(
            <Portrait
              src='foo'
              initials="foo"
            />
          );

          let pendingUser = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-portrait__sans-initials');
          expect(pendingUser.length).toEqual(0);
        });
      });
    });
  });
});
