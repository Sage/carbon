import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Profile from './profile';
import Portrait from './../portrait';
import { shallow } from 'enzyme';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';

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
        expect(instance.classes).toEqual('carbon-profile foo');
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
        expect(instance.classes).toEqual('carbon-profile foo carbon-profile--large');
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
        expect(instance.avatar.props.className).toEqual("carbon-profile__avatar");
      });
    });

    describe('text', () => {
      it('renders the name', () => {
        let text = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-profile__name');
        expect(text.textContent).toEqual('Foo');
      });

      it('renders the email', () => {
        let text = TestUtils.findRenderedDOMComponentWithClass(instance, 'carbon-profile__email');
        expect(text.textContent).toEqual('foo@bar.com');
      });
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      let wrapper = shallow(<Profile data-element='bar' data-role='baz' email='bun' name='dy' />);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'profile', 'bar', 'baz');
      });
    });

    describe("on internal elements", () => {
      let wrapper = shallow(<Profile email='bun' name='dy' />);

      elementsTagTest(wrapper, [
        'email',
        'name'
      ]);
    });
  });
});
