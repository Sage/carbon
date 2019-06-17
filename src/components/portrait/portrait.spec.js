import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import MD5 from 'crypto-js/md5';

import Browser from '../../utils/helpers/browser';
import Portrait from './portrait.component';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';
import { StyledIcon, StyledInitialsImage, StyledAvatarImage } from './portrait.style';

function render(props, renderer = TestRenderer.create) {
  return renderer(<Portrait { ...props } />);
}

const mockCanvasDataURL = 'data:image/png';

const mockDocumentWithCanvas = {
  createElement: () => ({
    width: 10,
    height: 10,
    toDataURL: () => mockCanvasDataURL,
    getContext: () => ({
      font: null,
      textAlign: null,
      fillStyle: null,
      fillRect: jasmine.createSpy('fillRect'),
      fillText: jasmine.createSpy('fillText')
    })
  })
};

describe('Portrait', () => {
  beforeEach(() => {
    spyOn(Browser, 'getDocument').and.returnValue(mockDocumentWithCanvas);
  });

  describe('snapshots', () => {
    it('renders initials correctly', () => {
      const wrapper = render({ initials: 'AB' }, mount);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders src correctly', () => {
      const wrapper = render({ src: 'https://example.com/example.jpg' }, mount);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders gravatar correctly', () => {
      const wrapper = render({ gravatar: 'example@example.com' }, mount);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('componentWillReceiveProps', () => {
    const memoizedInitials = 'foobar';
    let props, instance;

    beforeEach(() => {
      const originalProps = { initials: 'foo', size: 'small' };
      const wrapper = shallow(<Portrait gravatar='foo' { ...originalProps } />);
      props = { ...originalProps };
      instance = wrapper.instance();
      instance.memoizeInitials = memoizedInitials;
    });

    it('clears the cached initials if initials change', () => {
      props.initials = 'bar';
      instance.componentWillReceiveProps(props);
      expect(instance.memoizeInitials).toEqual(null);
    });

    it('clears the cached initials if size changes', () => {
      props.size = 'medium';
      instance.componentWillReceiveProps(props);
      expect(instance.memoizeInitials).toEqual(null);
    });

    it('keeps the cached initials if nothing changes', () => {
      instance.componentWillReceiveProps(props);
      expect(instance.memoizeInitials).toEqual(memoizedInitials);
    });
  });

  describe('props validation', () => {
    beforeEach(() => {
      spyOn(console, 'error');
    });

    /* eslint-disable no-console */

    describe('size', () => {
      it('accepts a valid size', () => {
        ReactTestUtils.renderIntoDocument(<Portrait src='foo' size='small' />);
        expect(console.error).toHaveBeenCalledTimes(0);
      });

      it('rejects an invalid size', () => {
        ReactTestUtils.renderIntoDocument(<Portrait src='foo' size='bar' />);
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error.calls.argsFor(0).length).toBe(1);
        const expected = 'Warning: Failed prop type: Invalid prop `size`';
        const actual = console.error.calls.argsFor(0)[0]; // eslint-disable-line no-console
        expect(actual).toEqual(expect.stringContaining(expected));
      });
    });

    describe('shape', () => {
      it('accepts a valid shape', () => {
        ReactTestUtils.renderIntoDocument(<Portrait src='foo' shape='circle' />);
        expect(console.error).toHaveBeenCalledTimes(0);
      });

      it('rejects an invalid shape', () => {
        ReactTestUtils.renderIntoDocument(<Portrait src='foo' shape='bar' />);
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error.calls.argsFor(0).length).toBe(1);
        const expected = 'Warning: Failed prop type: Invalid prop `shape`';
        const actual = console.error.calls.argsFor(0)[0]; // eslint-disable-line no-console
        expect(actual).toEqual(expect.stringContaining(expected));
      });
    });

    describe('gravatar and src', () => {
      it('throws an error when neither gravatar or src is passed', () => {
        ReactTestUtils.renderIntoDocument(<Portrait />);
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error.calls.argsFor(0).length).toBe(1);
        const expected = 'Warning: Failed prop type: Portrait requires a prop of "src", "gravatar" or "initials';
        const actual = console.error.calls.argsFor(0)[0]; // eslint-disable-line no-console
        expect(actual).toMatch(expected);
      });

      it('throws an error when both gravatar and src are passed', () => {
        ReactTestUtils.renderIntoDocument(<Portrait gravatar='example@example.com' src='foo' />);
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error.calls.argsFor(0).length).toBe(1);
        const expected = 'Warning: Failed prop type: Portrait requires a prop of "src" or "gravatar" but not both';
        const actual = console.error.calls.argsFor(0)[0]; // eslint-disable-line no-console
        expect(actual).toMatch(expected);
      });
    });

    /* eslint-enable no-console */
  });

  describe('generateInitials caching', () => {
    let instance;

    beforeEach(() => {
      instance = ReactTestUtils.renderIntoDocument(<Portrait gravatar='example@example.com' />);
    });

    it('returns the cached result if cached', () => {
      instance.memoizeInitials = 'foo';
      expect(instance.generateInitials()).toEqual('foo');
    });

    it('returns new image if not cached', () => {
      expect(instance.generateInitials()).toMatch(mockCanvasDataURL);
    });
  });

  describe('generateInitials content', () => {
    let context;

    beforeEach(() => {
      context = { fillStyle: null, fillRect: () => {}, fillText: () => {} };
    });

    it('returns first 3 initials uppercased if more than 3 are supplied', () => {
      spyOn(context, 'fillText');
      const instance = ReactTestUtils.renderIntoDocument(<Portrait initials='abcde' src='foo' />);
      instance.applyText(context, 30);
      expect(context.fillText).toHaveBeenCalledWith('ABC', 15, 20);
    });

    it('uses light BG colour and dark text colour if darkBackground is false', () => {
      const instance = ReactTestUtils.renderIntoDocument(<Portrait src='foo' darkBackground={ false } />);
      instance.applyBackground(context);
      expect(context.fillStyle).toEqual('#D8D9DC');
      instance.applyText(context);
      expect(context.fillStyle).toEqual('#636872');
    });

    it('uses dark BG color and light text colour if darkBackground is true', () => {
      const instance = ReactTestUtils.renderIntoDocument(<Portrait src='foo' darkBackground />);
      instance.applyBackground(context);
      expect(context.fillStyle).toEqual('#8A8E95');
      instance.applyText(context);
      expect(context.fillStyle).toEqual('#FFFFFF');
    });
  });

  describe('gravatarSrc', () => {
    it('returns the correct Gravatar URL', () => {
      const email = 'example@example.com';
      const instance = ReactTestUtils.renderIntoDocument(<Portrait gravatar={ email } size='medium' />);
      const src = instance.gravatarSrc();
      const base = 'https://www.gravatar.com/avatar/';
      const hash = MD5(email);
      const size = '60';
      expect(src).toEqual(`${base}${hash}?s=${size}&d=blank`);
    });
  });

  describe('numericSizes', () => {
    it('is an object mapping size to numeric value', () => {
      expect(Portrait.numericSizes.small).toEqual('30');
    });
  });

  describe('shapes', () => {
    it('is an array of valid shapes', () => {
      expect(Portrait.shapes).toEqual(['standard', 'circle', 'leaf']);
    });
  });

  describe('render icon', () => {
    const styledIcon = (
      <StyledIcon
        type='individual'
        size='medium'
        darkBackground={ false }
      />
    );

    it('renders icon when supplied with Gravatar but no src or initials', () => {
      const wrapper = shallow(
        <Portrait
          gravatar='example@example.com'
          size='medium'
          darkBackground={ false }
        />
      );
      expect(wrapper.contains(styledIcon)).toEqual(true);
    });

    it('renders icon when supplied with Gravatar and empty initials but no src', () => {
      const wrapper = shallow(
        <Portrait
          gravatar='example@example.com'
          initials=''
          size='medium'
          darkBackground={ false }
        />
      );
      expect(wrapper.contains(styledIcon)).toEqual(true);
    });

    it("doesn't render icon when supplied with src", () => {
      const wrapper = shallow(
        <Portrait src='https://example.com/example.jpg' />
      );
      expect(wrapper.contains(styledIcon)).toEqual(false);
    });

    it("doesn't render icon when supplied with initials", () => {
      const wrapper = shallow(
        <Portrait initials='AB' />
      );
      expect(wrapper.contains(styledIcon)).toEqual(false);
    });

    it("doesn't render icon when supplied with src and initials", () => {
      const wrapper = shallow(
        <Portrait src='https://example.com/example.jpg' initials='AB' />
      );
      expect(wrapper.contains(styledIcon)).toEqual(false);
    });

    it("doesn't render icon when supplied with Gravatar and initials", () => {
      const wrapper = shallow(
        <Portrait gravatar='example@example.com' initials='AB' />
      );
      expect(wrapper.contains(styledIcon)).toEqual(false);
    });
  });

  describe('render initials', () => {
    const styledInitialsImage = (
      <StyledInitialsImage
        src={ mockCanvasDataURL }
        alt=''
        data-element='initials'
      />
    );

    it('renders initials when supplied with Gravatar and initials but no src', () => {
      const wrapper = shallow(<Portrait gravatar='example@example.com' initials='AB' />);
      expect(wrapper.contains(styledInitialsImage)).toEqual(true);
    });

    it('renders empty alt attribute when alt prop is empty', () => {
      const wrapper = shallow(<Portrait initials='AB' alt='' />);
      expect(wrapper.contains(styledInitialsImage)).toEqual(true);
    });

    it('renders empty alt attribute when alt prop is not supplied', () => {
      const wrapper = shallow(<Portrait initials='AB' />);
      expect(wrapper.contains(styledInitialsImage)).toEqual(true);
    });

    it("doesn't render initials when supplied with src", () => {
      const wrapper = shallow(<Portrait src='https://example.com/example.jpg' />);
      expect(wrapper.contains(styledInitialsImage)).toEqual(false);
    });

    it("doesn't render initials when supplied with Gravatar and empty initials but no src", () => {
      const wrapper = shallow(<Portrait gravatar='example@example.com' initials='' />);
      expect(wrapper.contains(styledInitialsImage)).toEqual(false);
    });
  });

  describe('render avatar', () => {
    const imageUrl = 'https://example.com/example.jpg';

    it('renders avatar when supplied with Gravatar', () => {
      const gravatarUrl = 'https://www.gravatar.com/avatar/23463b99b62a72f26ed677cc556c44e8?s=60&d=blank';
      const styledAvatarImage = (
        <StyledAvatarImage
          src={ gravatarUrl }
          alt='foo'
          data-element='user-image'
        />
      );
      const wrapper = shallow(
        <Portrait gravatar='example@example.com' alt='foo' />
      );
      expect(wrapper.contains(styledAvatarImage)).toEqual(true);
    });

    it('renders avatar when supplied with src but no Gravatar', () => {
      const styledAvatarImage = (
        <StyledAvatarImage
          src={ imageUrl }
          alt='foo'
          data-element='user-image'
        />
      );
      const wrapper = shallow(
        <Portrait src={ imageUrl } alt='foo' />
      );
      expect(wrapper.contains(styledAvatarImage)).toEqual(true);
    });

    it('renders empty alt attribute when alt prop is empty', () => {
      const styledAvatarImage = (
        <StyledAvatarImage
          src={ imageUrl }
          alt=''
          data-element='user-image'
        />
      );
      const wrapper = shallow(
        <Portrait src={ imageUrl } alt='' />
      );
      expect(wrapper.contains(styledAvatarImage)).toEqual(true);
    });

    it('renders empty alt attribute when alt prop is not supplied', () => {
      const styledAvatarImage = (
        <StyledAvatarImage
          src={ imageUrl }
          alt=''
          data-element='user-image'
        />
      );
      const wrapper = shallow(
        <Portrait src={ imageUrl } />
      );
      expect(wrapper.contains(styledAvatarImage)).toEqual(true);
    });
  });

  describe('tags', () => {
    const imageUrl = 'https://example.com/example.jpg';

    it('includes data tags for component, element and role on Portrait component', () => {
      const wrapper = shallow(
        <Portrait
          src={ imageUrl }
          data-element='bar'
          data-role='baz'
        />
      );
      rootTagTest(wrapper, 'portrait', 'bar', 'baz');
    });

    describe('includes user-image tag on internal elements when there is an image', () => {
      const wrapper = shallow(<Portrait src={ imageUrl } />);
      elementsTagTest(wrapper, ['user-image']);
    });

    it('includes \'data-element="initials"\' on internal elements when there are initials', () => {
      const wrapper = shallow(<Portrait gravatar='test' initials='TS' />);
      expect(wrapper.find({ 'data-element': 'initials' }).length).toEqual(1);
    });
  });
});
