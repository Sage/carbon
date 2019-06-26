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
    const originalProps = {
      initials: 'foo', dimensions: 30, textColor: '#ffffff', bgColor: '#000000'
    };
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

    it('clears the cached initials if textColor changes', () => {
      props.textColor = '#aaaaaa';
      instance.componentWillReceiveProps(props);
      expect(instance.cachedImageDataUrl).toEqual(null);
    });

    it('clears the cached initials if bgColor changes', () => {
      props.bgColor = '#444444';
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
      instance = ReactTestUtils.renderIntoDocument(
        <PortraitInitials
          initials='abc'
          dimensions={ 30 }
          textColor='#ffffff'
          bgColor='#000000'
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
      const instance = ReactTestUtils.renderIntoDocument(
        <PortraitInitials
          initials='abcde'
          dimensions={ 30 }
          textColor='#ffffff'
          bgColor='#000000'
        />
      );
      instance.applyText(canvasContext, 30);
      expect(canvasContext.fillText).toHaveBeenCalledWith('ABC', 15, 20);
    });

    it('uses the specified text color and background color', () => {
      const textColor = '#111111';
      const bgColor = '#222222';
      const instance = ReactTestUtils.renderIntoDocument(
        <PortraitInitials
          initials='abc'
          dimensions={ 30 }
          textColor={ textColor }
          bgColor={ bgColor }
        />
      );
      instance.applyBackground(canvasContext);
      expect(canvasContext.fillStyle).toEqual(bgColor);
      instance.applyText(canvasContext);
      expect(canvasContext.fillStyle).toEqual(textColor);
    });
  });
});
