import React from 'react';
import TestUtils from 'react-dom/test-utils';
import MD5 from 'crypto-js/md5';
import { shallow } from 'enzyme';
import Portrait from './portrait';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';
import Browser from '../../utils/helpers/browser';

describe('Portrait', () => {
  let instance, gravatarInstance, wrapper;

  beforeEach(() => {
    spyOn(Browser, 'getDocument').and.returnValue({
      createElement: (element) => {
        return {
          getContext: (context) => {
            return {
              font: null,
              textAlign: null,
              fillStyle: null,
              fillRect: jasmine.createSpy('fillRect'),
              fillText: jasmine.createSpy('fillText')
            };
          },
          width: 10,
          height: 10,
          toDataURL: () => {
            return 'data:image/png';
          }
        }
      }
    });

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

    wrapper = shallow(
      <Portrait
        gravatar='foo'
        initials='foo'
        size='small'
      />
    );
  });

  describe('componentWillReceiveProps', () => {
    let props;

    beforeEach(() => {
      wrapper.instance().memoizeInitials = 'foobar';
      props = {
        initials: 'foo',
        size: 'small'
      };
    });

    describe('if initials are different', () => {
      it('nulls the cache', () => {
        const instance = wrapper.instance();
        props.initials = 'bar';
        instance.componentWillReceiveProps(props);
        expect(instance.memoizeInitials).toEqual(null);
      });
    });

    describe('if size is different', () => {
      it('nulls the cache', () => {
        props.size = 'medium';
        wrapper.instance().componentWillReceiveProps(props);
        expect(wrapper.instance().memoizeInitials).toEqual(null);
      });
    });

    describe('if nothing changes', () => {
      it('keeps the cache', () => {
        wrapper.instance().componentWillReceiveProps(props);
        expect(wrapper.instance().memoizeInitials).toEqual('foobar');
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

          const expected =
            'Warning: Failed prop type: Portrait requires a prop of "src" OR a prop of "gravatar"\n    in Portrait';
          const actual = console.error.calls.argsFor(0)[0]; // eslint-disable-line no-console

          expect(actual).toMatch(expected);
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

          const expected =
            'Warning: Failed prop type: Portrait requires a prop of "src" OR a prop of "gravatar" but not both\n    in Portrait';
          const actual = console.error.calls.argsFor(0)[0]; // eslint-disable-line no-console
          expect(actual).toMatch(expected);
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

    describe('more than three initials are passed', () => {
      it('returns the first three initials in uppercase', () => {
        const context = { fillText: () => {} };
        spyOn(context, 'fillText');
        instance = TestUtils.renderIntoDocument(
          <Portrait
            initials='abcde'
            src='foo'
          />
          );
        instance.applyText(context, 30);
        expect(context.fillText).toHaveBeenCalledWith('ABC', 15, 20);
      });
    });

    describe('is darkBackground is false', () => {
      it('uses a light background colour', () => {
        instance = TestUtils.renderIntoDocument(
          <Portrait
            src='foo'
            darkBackground={ false }
          />
          );
        const context = { fillRect: () => {} };
        instance.applyBackground(context);
        expect(context.fillStyle).toEqual('#D8D9DC');
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
        const context = { fillRect: () => {} };
        instance.applyBackground(context);
        expect(context.fillStyle).toEqual('#4E545F');
      });
    });
  });

  describe('imgProps', () => {
    describe('when a gravatar is passed', () => {
      it('returns gravatar src', () => {
        const src = gravatarInstance.imgSrc;
        const base = 'https://www.gravatar.com/avatar/';
        const hash = MD5('foo');
        const size = '60';

        expect(src).toEqual(`${base}${hash}?s=${size}&d=blank`);
      });
    });

    describe('when a src is passed', () => {
      it('returns the passed src as the image source', () => {
        const src = instance.imgSrc;
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
          );

          const initials = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-portrait__initials');
          expect(initials.length).toEqual(0);
        });
      });

      describe('when initials are empty', () => {
        it('is not rendered', () => {
          instance = TestUtils.renderIntoDocument(
            <Portrait
              gravatar='foo'
              initials=''
            />
          );

          const initials = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-portrait__initials');
          expect(initials.length).toEqual(0);
        });
      });

      describe('when src is not passed and initials are not empty', () => {
        it('is rendered', () => {
          instance = TestUtils.renderIntoDocument(
            <Portrait
              gravatar='foo'
              initials='foo'
            />
          );

          const initials = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-portrait__initials');
          expect(initials.length).toEqual(1);
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

        const avatar = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-portrait__avatar');
        expect(avatar).toBeDefined();
      });
    });

    describe('sansInitialsImage', () => {
      describe('when src is passed', () => {
        it('is not rendered', () => {
          instance = TestUtils.renderIntoDocument(
            <Portrait
              src='foo'
              initials=''
            />
          );

          const pendingUser = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-portrait__sans-initials');
          expect(pendingUser.length).toEqual(0);
        });
      });

      describe('when initials are empty and src is not passed', () => {
        it('is rendered', () => {
          instance = TestUtils.renderIntoDocument(
            <Portrait
              gravatar='foo'
              initials=''
            />
          );

          const pendingUser = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-portrait__sans-initials');
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

          const pendingUser = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-portrait__sans-initials');
          expect(pendingUser.length).toEqual(1);
        });
      });

      describe('when initials are not empty and src is not passed', () => {
        it('is not rendered', () => {
          instance = TestUtils.renderIntoDocument(
            <Portrait
              gravatar='foo'
              initials='foo'
            />
          );

          const pendingUser = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-portrait__sans-initials');
          expect(pendingUser.length).toEqual(0);
        });
      });

      describe('when src is passed and initials are not empty', () => {
        it('is rendered', () => {
          instance = TestUtils.renderIntoDocument(
            <Portrait
              src='foo'
              initials='foo'
            />
          );

          const pendingUser = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'carbon-portrait__sans-initials');
          expect(pendingUser.length).toEqual(0);
        });
      });
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      const wrapper = shallow(<Portrait data-element='bar' data-role='baz' src='test' />);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'portrait', 'bar', 'baz');
      });
    });

    describe('on internal elements when there is an image', () => {
      const wrapper = shallow(<Portrait src='test' />);

      elementsTagTest(wrapper, [
        'user-image'
      ]);
    });

    describe('on internal elements when there are initials', () => {
      it(`include 'data-element="initials"'`, () => {
        // Moved out of function due to needing beforeEach to spy
        const wrapper = shallow(<Portrait gravatar='test' initials='TS' />);
        expect(wrapper.find({ 'data-element': 'initials' }).length).toEqual(1);
      });
    });
  });
});
