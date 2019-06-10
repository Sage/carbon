import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { OriginalProfile as Profile } from './profile';
import Portrait from '../portrait';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';
import Browser from '../../utils/helpers/browser';
import classicTheme from '../../style/themes/classic';
import { ProfileNameStyle } from './profile.style';

describe('Profile', () => {
  let instance;

  const mockCanvas = () => {
    window.HTMLCanvasElement.prototype.getContext = () => {
      return {
        font: null,
        textAlign: null,
        fillStyle: null,
        fillRect: jest.fn('fillRect'),
        fillText: jest.fn('fillText')
      };
    };
  };

  beforeAll(() => {
    spyOn(Browser, 'getDocument').and.returnValue({
      createElement: (element) => {
        return {
          getContext: (context) => {
            return {
              font: null,
              textAlign: null,
              fillStyle: null,
              fillRect: jest.fn('fillRect'),
              fillText: jest.fn('fillText')
            };
          },
          width: 10,
          height: 10,
          toDataURL: () => {
            return 'data:image/png';
          }
        };
      }
    });
  });

  describe('render', () => {
    beforeEach(() => {
      instance = TestUtils.renderIntoDocument(
        <Profile
          className='foo'
          name='Foo'
          email='foo@bar.com'
          initials='FB'
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
            className='foo'
            name='Foo'
            email='foo@bar.com'
            initials='FB'
            large
          />
        );
        expect(instance.classes).toEqual('carbon-profile foo carbon-profile--large');
      });
    });

    describe('initials', () => {
      it('renders the initials from the props', () => {
        expect(instance.initials).toEqual('FB');
      });

      it('calculates the initials when not provided', () => {
        instance = TestUtils.renderIntoDocument(
          <Profile
            name='Foo Bar Baz'
            email='foo@bar.com'
          />
        );
        expect(instance.initials).toEqual('FBB');
      });
    });

    describe('avatar', () => {
      it('returns the portrait component', () => {
        expect(TestUtils.isElementOfType(instance.avatar, Portrait)).toBeTruthy();
        expect(instance.avatar.props.className).toEqual('carbon-profile__avatar');
      });
    });

    fdescribe('text', () => {
      const wrapper = mount(<Profile name='testName testSurname' email='john@doe.com' />);
      it('renders the name', () => {
        expect(wrapper.find(ProfileNameStyle).text()).toEqual('testName testSurname');
      });

      it('renders the email', () => {
        expect(wrapper.find('span[data-element="email"]').text()).toEqual('john@doe.com');
      });
    });
  });

  describe('tags', () => {
    describe('on component', () => {
      const wrapper = shallow(<Profile
        data-element='bar' data-role='baz'
        email='bun' name='dy'
      />);

      it('include correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'profile', 'bar', 'baz');
      });
    });

    describe('on internal elements', () => {
      const wrapper = shallow(<Profile email='bun' name='dy' />);

      elementsTagTest(wrapper, [
        'email',
        'name'
      ]);
    });
  });

  describe('when classic theme provided', () => {
    const wrapper = shallow(<Profile
      initials='RR' email='john@joe.com'
      name='john' theme={ classicTheme }
    />);

    it('shouold render correct props', () => {
      expect(wrapper.find(Portrait).props().size).toEqual('medium-small');
    });
  });
});
