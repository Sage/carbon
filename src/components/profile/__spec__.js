import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Profile from './profile';
import Portrait from './../portrait';

describe('PortraitContainer', () => {
  let instance;

  describe('render', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Profile
          className="foo"
          name="Foo"
          email="foo@bar.com"
          initials="FB"
        />
      );
    });

    describe('classes', () => {
      it('returns the correct classes', () => {
        expect(instance.classes).toEqual('ui-profile foo');
      });

      it('renders the large class if applied', () => {
        instance = TestUtils.renderIntoDocument(
          <Profile
            className="foo"
            name="Foo"
            email="foo@bar.com"
            initials="FB"
            large={ true }
          />
        );
        expect(instance.classes).toEqual('ui-profile foo ui-profile--large');
      });
    });

    describe('initials', () => {
      it('renders the initials from the props', () => {
        expect(instance.initials).toEqual("FB");
      });

      it('calculates the initials when not provided', () => {
        instance = TestUtils.renderIntoDocument(
          <Profile
            name="Foo Bar Baz"
            email="foo@bar.com"
          />
        );
        expect(instance.initials).toEqual("FBB");
      });
    });

    describe('avatar', () => {
      it('returns the portrait component', () => {
        expect(TestUtils.isElementOfType(instance.avatar, Portrait)).toBeTruthy();
        expect(instance.avatar.props.className).toEqual("ui-profile__avatar");
      });
    });

    describe('text', () => {
      it('renders the name', () => {
        let text = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-profile__name');
        expect(text.textContent).toEqual('Foo');
      });

      it('renders the email', () => {
        let text = TestUtils.findRenderedDOMComponentWithClass(instance, 'ui-profile__email');
        expect(text.textContent).toEqual('foo@bar.com');
      });
    });
  });
});
