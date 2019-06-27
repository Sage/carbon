import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import classicTheme from '../../style/themes/classic';
import mediumTheme from '../../style/themes/medium';
import Browser from '../../utils/helpers/browser';
import Portrait from './portrait.component';
import { elementsTagTest, rootTagTest } from '../../utils/helpers/tags/tags-specs';
import { StyledIcon, StyledCustomImg } from './portrait.style';
import PortraitInitials from './portrait-initials.component';
import PortraitGravatar from './portrait-gravatar.component';

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

function renderDLS(element) {
  ReactTestUtils.renderIntoDocument(
    <ThemeProvider theme={ mediumTheme }>
      {element}
    </ThemeProvider>
  );
}

function renderClassic(element) {
  ReactTestUtils.renderIntoDocument(
    <ThemeProvider theme={ classicTheme }>
      {element}
    </ThemeProvider>
  );
}

function shallowDLS(element) {
  return shallow(element, { context: { theme: { mediumTheme } } });
}


describe('PortraitComponent', () => {
  beforeEach(() => {
    spyOn(Browser, 'getDocument').and.returnValue(mockDocumentWithCanvas);
  });

  describe('props validation', () => {
    beforeEach(() => {
      spyOn(console, 'error');
    });

    /* eslint-disable no-console */

    describe('size', () => {
      it('accepts a valid size', () => {
        renderDLS(<Portrait src='foo' size='small' />);
        expect(console.error).toHaveBeenCalledTimes(0);
      });

      it('rejects an invalid size', () => {
        renderDLS(<Portrait src='foo' size='bar' />);
        expect(console.error).toHaveBeenCalled();
        expect(console.error.calls.argsFor(0).length).toBe(1);
        const expected = 'Warning: Failed prop type: Invalid prop `size`';
        const actual = console.error.calls.argsFor(0)[0];
        expect(actual).toEqual(expect.stringContaining(expected));
      });
    });

    describe('shape', () => {
      it('accepts valid shapes', () => {
        renderDLS(<Portrait src='foo' shape='standard' />);
        renderDLS(<Portrait src='foo' shape='circle' />);
        renderDLS(<Portrait src='foo' shape='leaf' />);
        expect(console.error).toHaveBeenCalledTimes(0);
      });

      it('rejects an invalid shape', () => {
        renderDLS(<Portrait src='foo' shape='bar' />);
        expect(console.error).toHaveBeenCalled();
        expect(console.error.calls.argsFor(0).length).toBe(1);
        const expected = 'Warning: Failed prop type: Invalid prop `shape`';
        const actual = console.error.calls.argsFor(0)[0];
        expect(actual).toEqual(expect.stringContaining(expected));
      });
    });

    describe('gravatar and src', () => {
      it('throws an error when neither gravatar or src is passed', () => {
        renderDLS(<Portrait />);
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error.calls.argsFor(0).length).toBe(1);
        const expected = 'Warning: Failed prop type: Portrait requires a prop of "src", "gravatar" or "initials';
        const actual = console.error.calls.argsFor(0)[0];
        expect(actual).toMatch(expected);
      });

      it('throws an error when both gravatar and src are passed', () => {
        renderDLS(<Portrait gravatar='example@example.com' src='foo' />);
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error.calls.argsFor(0).length).toBe(1);
        const expected = 'Warning: Failed prop type: Portrait requires a prop of "src" or "gravatar" but not both';
        const actual = console.error.calls.argsFor(0)[0];
        expect(actual).toMatch(expected);
      });
    });

    /* eslint-enable no-console */
  });

  describe('render icon', () => {
    const styledIcon = (
      <StyledIcon
        type='individual'
        size='medium'
        shape='standard'
        darkBackground={ false }
      />
    );

    it('renders icon when supplied with Gravatar but no src or initials', () => {
      const wrapper = shallowDLS(
        <Portrait
          gravatar='example@example.com'
          size='medium'
          shape='standard'
          darkBackground={ false }
        />
      );
      expect(wrapper.contains(styledIcon)).toEqual(true);
    });

    it('renders icon when supplied with Gravatar and empty initials but no src', () => {
      const wrapper = shallowDLS(
        <Portrait
          gravatar='example@example.com'
          initials=''
          size='medium'
          shape='standard'
          darkBackground={ false }
        />
      );
      expect(wrapper.contains(styledIcon)).toEqual(true);
    });

    it("doesn't render icon when supplied with src", () => {
      const wrapper = shallowDLS(
        <Portrait src='https://example.com/example.jpg' />
      );
      expect(wrapper.contains(styledIcon)).toEqual(false);
    });

    it("doesn't render icon when supplied with initials", () => {
      const wrapper = shallowDLS(
        <Portrait initials='AB' />
      );
      expect(wrapper.contains(styledIcon)).toEqual(false);
    });

    it("doesn't render icon when supplied with src and initials", () => {
      const wrapper = shallowDLS(
        <Portrait src='https://example.com/example.jpg' initials='AB' />
      );
      expect(wrapper.contains(styledIcon)).toEqual(false);
    });

    it("doesn't render icon when supplied with Gravatar and initials", () => {
      const wrapper = shallowDLS(
        <Portrait gravatar='example@example.com' initials='AB' />
      );
      expect(wrapper.contains(styledIcon)).toEqual(false);
    });

    describe('sizes', () => {
      beforeEach(() => {
        spyOn(console, 'error');
      });

      /* eslint-disable no-console */

      it('accepts a valid size', () => {
        const styledIconDark = (
          <StyledIcon
            type='individual'
            size='small'
            darkBackground
          />
        );
        const styledIconLight = (
          <StyledIcon
            type='individual'
            size='small'
            darkBackground={ false }
          />
        );
        renderDLS(styledIconDark);
        renderDLS(styledIconLight);
        renderClassic(styledIconDark);
        renderClassic(styledIconLight);
        expect(console.error).toHaveBeenCalledTimes(0);
      });

      it('rejects an invalid size', () => {
        renderDLS(<StyledIcon
          type='individual'
          size='foo'
          darkBackground
        />);
        expect(console.error).toHaveBeenCalled();
        expect(console.error.calls.argsFor(0).length).toBe(1);
        const expected = 'Warning: Failed prop type: Invalid prop `size`';
        const actual = console.error.calls.argsFor(0)[0];
        expect(actual).toEqual(expect.stringContaining(expected));
      });

      /* eslint-enable no-console */
    });
  });

  describe('render initials', () => {
    const portraitInitials = (
      <PortraitInitials
        size='medium'
        initials='AB'
        darkBackground={ false }
        alt=''
      />
    );

    it('renders initials when supplied with Gravatar and initials but no src', () => {
      renderClassic(<Portrait gravatar='example@example.com' initials='AB' />);
      const wrapper = shallowDLS(<Portrait gravatar='example@example.com' initials='AB' />);
      expect(wrapper.contains(portraitInitials)).toEqual(true);
    });

    it('renders empty alt attribute when alt prop is empty', () => {
      const wrapper = shallowDLS(<Portrait initials='AB' alt='' />);
      expect(wrapper.contains(portraitInitials)).toEqual(true);
    });

    it('renders empty alt attribute when alt prop is not supplied', () => {
      renderDLS(<Portrait initials='AB' />);
      const wrapper = shallowDLS(<Portrait initials='AB' />);
      expect(wrapper.contains(portraitInitials)).toEqual(true);
    });

    it("doesn't render initials when supplied with src", () => {
      const wrapper = shallowDLS(<Portrait src='https://example.com/example.jpg' />);
      expect(wrapper.contains(portraitInitials)).toEqual(false);
    });

    it("doesn't render initials when supplied with Gravatar and empty initials but no src", () => {
      const wrapper = shallowDLS(<Portrait gravatar='example@example.com' initials='' />);
      expect(wrapper.contains(portraitInitials)).toEqual(false);
    });

    it('can render the DLS theme', () => {
      spyOn(console, 'error');
      const props = {
        size: 'medium', initials: 'AB', darkBackground: false, theme: mediumTheme
      };
      renderDLS(<PortraitInitials { ...props } />);
      props.darkBackground = true;
      renderDLS(<PortraitInitials { ...props } />);
      expect(console.error).toHaveBeenCalledTimes(0); // eslint-disable-line no-console
    });

    it('can render the Classic theme', () => {
      spyOn(console, 'error');
      const props = {
        size: 'medium', initials: 'AB', darkBackground: false, theme: classicTheme
      };
      renderClassic(<PortraitInitials { ...props } />);
      props.darkBackground = true;
      renderClassic(<PortraitInitials { ...props } />);
      expect(console.error).toHaveBeenCalledTimes(0); // eslint-disable-line no-console
    });
  });

  describe('render Gravatar', () => {
    const gravatarEmail = 'example@example.com';

    it('renders the Gravatar for the specified email address', () => {
      const portraitGravatar = (
        <PortraitGravatar
          gravatarEmail={ gravatarEmail }
          size='medium'
          alt='foo'
        />
      );
      const wrapper = shallowDLS(
        <Portrait gravatar={ gravatarEmail } alt='foo' />
      );
      expect(wrapper.contains(portraitGravatar)).toEqual(true);
    });

    it('can render the Classic theme', () => {
      spyOn(console, 'error');
      renderClassic(
        <PortraitGravatar
          gravatarEmail={ gravatarEmail }
          size='medium'
          alt='foo'
          theme={ classicTheme }
        />
      );
      expect(console.error).toHaveBeenCalledTimes(0); // eslint-disable-line no-console
    });
  });

  describe('render custom image', () => {
    const imageUrl = 'https://example.com/example.jpg';

    it('renders avatar when supplied with src but no Gravatar', () => {
      const styledCustomImg = (
        <StyledCustomImg
          src={ imageUrl }
          alt='foo'
          size='medium'
          data-element='user-image'
        />
      );
      const wrapper = shallowDLS(
        <Portrait src={ imageUrl } alt='foo' />
      );
      expect(wrapper.contains(styledCustomImg)).toEqual(true);
    });

    it('renders empty alt attribute when alt prop is empty', () => {
      const styledCustomImg = (
        <StyledCustomImg
          src={ imageUrl }
          alt=''
          size='medium'
          data-element='user-image'
        />
      );
      const wrapper = shallowDLS(
        <Portrait src={ imageUrl } alt='' />
      );
      expect(wrapper.contains(styledCustomImg)).toEqual(true);
    });

    it('renders empty alt attribute when alt prop is not supplied', () => {
      const styledCustomImg = (
        <StyledCustomImg
          src={ imageUrl }
          alt=''
          size='medium'
          data-element='user-image'
        />
      );
      const wrapper = shallowDLS(
        <Portrait src={ imageUrl } />
      );
      expect(wrapper.contains(styledCustomImg)).toEqual(true);
    });
  });

  describe('tags', () => {
    const imageUrl = 'https://example.com/example.jpg';

    it('includes data tags for component, element and role on Portrait component', () => {
      const wrapper = shallowDLS(
        <Portrait
          src={ imageUrl }
          data-element='bar'
          data-role='baz'
        />
      );
      rootTagTest(wrapper, 'portrait', 'bar', 'baz');
    });

    describe('includes user-image tag on internal elements when there is an image', () => {
      const wrapper = shallowDLS(<Portrait src={ imageUrl } />);
      elementsTagTest(wrapper, ['user-image']);
    });
  });
});
