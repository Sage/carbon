import React from 'react';
import TestRenderer from 'react-test-renderer';
import Browser from '../../utils/helpers/browser';
import PortraitInitials from './portrait-initials.component';
import smallTheme from '../../style/themes/small';
import mediumTheme from '../../style/themes/medium';

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

function render(component) {
  return TestRenderer.create(component).toTree().instance;
}

describe('PortraitInitials', () => {
  beforeAll(() => {
    spyOn(Browser, 'getDocument').and.returnValue(mockDocumentWithCanvas);
  });

  describe('componentWillReceiveProps', () => {
    const originalProps = {
      initials: 'foo', size: 'medium', darkBackground: false, theme: mediumTheme
    };
    const cachedImageDataUrl = 'foobar';
    let props, instance;

    beforeAll(() => {
      instance = render(<PortraitInitials { ...originalProps } />);
    });

    beforeEach(() => {
      props = { ...originalProps };
      instance.cachedImageDataUrl = cachedImageDataUrl;
    });

    it('clears the cached initials if theme changes', () => {
      props.theme = smallTheme;
      instance.componentWillReceiveProps(props);
      expect(instance.cachedImageDataUrl).toEqual(null);
    });

    it('clears the cached initials if initials change', () => {
      props.initials = 'bar';
      instance.componentWillReceiveProps(props);
      expect(instance.cachedImageDataUrl).toEqual(null);
    });

    it('clears the cached initials if size changes', () => {
      props.size = 'large';
      instance.componentWillReceiveProps(props);
      expect(instance.cachedImageDataUrl).toEqual(null);
    });

    it('clears the cached initials if darkBackground changes', () => {
      props.darkBackground = true;
      instance.componentWillReceiveProps(props);
      expect(instance.cachedImageDataUrl).toEqual(null);
    });

    it('keeps the cached initials if nothing changes', () => {
      instance.componentWillReceiveProps(props);
      expect(instance.cachedImageDataUrl).toEqual(cachedImageDataUrl);
    });
  });

  describe('generateDataUrl caching', () => {
    let instance;

    beforeEach(() => {
      instance = render(
        <PortraitInitials
          theme={ mediumTheme }
          initials='abc'
          size='medium'
        />
      );
    });

    it('returns the cached result if cached', () => {
      instance.cachedImageDataUrl = 'foo';
      expect(instance.generateDataUrl()).toEqual('foo');
    });

    it('returns new image if not cached', () => {
      expect(instance.generateDataUrl()).toMatch(mockCanvasDataURL);
    });
  });

  describe('generateDataUrl content', () => {
    let canvasContext;

    beforeEach(() => {
      canvasContext = { fillStyle: null, fillRect: () => {}, fillText: () => {} };
    });

    it('returns first 3 initials uppercased if more than 3 are supplied', () => {
      spyOn(canvasContext, 'fillText');
      const instance = render(
        <PortraitInitials
          theme={ mediumTheme }
          initials='abcde'
          size='medium'
        />
      );
      instance.applyText(canvasContext, 30);
      expect(canvasContext.fillText).toHaveBeenCalledWith('ABC', 15, 20);
    });

    it('uses the specified text color and background color', () => {
      const textColor = '#111111';
      const bgColor = '#222222';
      const instance = render(
        <PortraitInitials
          theme={ mediumTheme }
          initials='abc'
          size='medium'
        />
      );
      instance.applyBackground(canvasContext, 30, bgColor);
      expect(canvasContext.fillStyle).toEqual(bgColor);
      instance.applyText(canvasContext, 30, textColor);
      expect(canvasContext.fillStyle).toEqual(textColor);
    });
  });
});
