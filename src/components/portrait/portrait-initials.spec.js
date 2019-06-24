import React from 'react';
import { shallow } from 'enzyme';
import ReactTestUtils from 'react-dom/test-utils';

import Browser from '../../utils/helpers/browser';
import PortraitInitials from './portrait-initials.component';

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


describe('PortraitInitials', () => {
  beforeAll(() => {
    spyOn(Browser, 'getDocument').and.returnValue(mockDocumentWithCanvas);
  });

  describe('componentWillReceiveProps', () => {
    const originalProps = { initials: 'foo', dimensions: 30, darkBackground: false };
    const cachedImageDataUrl = 'foobar';
    let props, wrapper, instance;

    beforeAll(() => {
      wrapper = shallow(<PortraitInitials { ...originalProps } />);
      instance = wrapper.instance();
    });

    beforeEach(() => {
      props = { ...originalProps };
      instance.cachedImageDataUrl = cachedImageDataUrl;
    });

    it('clears the cached initials if initials change', () => {
      props.initials = 'bar';
      instance.componentWillReceiveProps(props);
      expect(instance.cachedImageDataUrl).toEqual(null);
    });

    it('clears the cached initials if dimensions change', () => {
      props.dimensions = 40;
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
      instance = ReactTestUtils.renderIntoDocument(<PortraitInitials initials='abc' dimensions={ 30 } />);
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
      const instance = ReactTestUtils.renderIntoDocument(<PortraitInitials initials='abcde' dimensions={ 30 } />);
      instance.applyText(canvasContext, 30);
      expect(canvasContext.fillText).toHaveBeenCalledWith('ABC', 15, 20);
    });

    it('uses light BG colour and dark text colour if darkBackground is false', () => {
      const instance = ReactTestUtils.renderIntoDocument(
        <PortraitInitials
          initials='abc'
          dimensions={ 30 }
          darkBackground={ false }
        />
      );
      instance.applyBackground(canvasContext);
      expect(canvasContext.fillStyle).toEqual('#D8D9DC');
      instance.applyText(canvasContext);
      expect(canvasContext.fillStyle).toEqual('#595959');
    });

    it('uses dark BG color and light text colour if darkBackground is true', () => {
      const instance = ReactTestUtils.renderIntoDocument(
        <PortraitInitials
          initials='abc'
          dimensions={ 30 }
          darkBackground
        />
      );
      instance.applyBackground(canvasContext);
      expect(canvasContext.fillStyle).toEqual('#8A8E95');
      instance.applyText(canvasContext);
      expect(canvasContext.fillStyle).toEqual('#FFFFFF');
    });
  });
});
