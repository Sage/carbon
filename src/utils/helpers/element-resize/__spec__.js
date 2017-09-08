import Bowser from 'bowser';
import Browser from './../browser';
import ElementResize from './element-resize';

describe('ElementResize', () => {
  let element, callback;

  beforeEach(() => {
    element = document.createElement('div'),
    callback = jasmine.createSpy('callback');
  });

  describe('addListener', () => {
    describe('no listener yet set', () => {
      it('creates an object to watch', () => {
        ElementResize.addListener(element, callback);
        expect(element.children[0].tagName).toEqual("OBJECT");
      });
    });

    describe('listener already setup', () => {
      it('adds the callback to the array', () => {
        ElementResize.addListener(element, callback);
        ElementResize.addListener(element, callback);
        expect(element.__resizeListenerCallbacks__.length).toEqual(2);
      });
    });

    describe('when position is static', () => {
      it('sets it to relative', () => {
        spyOn(Browser, 'getWindow').and.returnValue({
          getComputedStyle: (element) => {
            return { position: 'static' };
          }
        });
        ElementResize.addListener(element, callback);
        expect(element.style.position).toEqual('relative');
      });
    });

    describe('objectLoad', () => {
      it('sets the listener', () => {
        const addSpy = jasmine.createSpy('add listener');
        spyOn(ElementResize, 'getDefaultView').and.returnValue({
          addEventListener: addSpy
        });
        ElementResize.addListener(element, callback);
        element.children[0].onload();
        expect(addSpy).toHaveBeenCalled();
        expect(addSpy.calls.mostRecent().args[0]).toEqual('resize');
        expect(typeof addSpy.calls.mostRecent().args[1]).toEqual('function');
      });

      it('does not throw error if getDefaultView returns nothing', () => {
        spyOn(ElementResize, 'getDefaultView').and.returnValue(null);
        ElementResize.addListener(element, callback);
        expect(element.children[0].onload).not.toThrowError();
      });
    });

    describe('resizeListener', () => {
      it('triggers each callback', () => {
        const trigger = {
          __resizeListenerCallbacks__: [callback]
        };
        const ev = {
          target: {
            __resizeTrigger__: trigger
          }
        };
        const addSpy = jasmine.createSpy('add listener');
        spyOn(ElementResize, 'getDefaultView').and.returnValue({
          addEventListener: addSpy
        });
        ElementResize.addListener(element, callback);
        element.children[0].onload();
        addSpy.calls.mostRecent().args[1](ev);
        expect(callback).toHaveBeenCalledWith(ev);
      });
    });

    it('sets data attribute', () => {
      Bowser.msie = true;
      ElementResize.addListener(element, callback);
      expect(element.children[0].data).toEqual("about:blank");
    });
  });

  describe('removeListener', () => {
    it('does not remove callbacks if there are none', () => {
      ElementResize.removeListener(element, callback);
      expect(element.__resizeListenerCallbacks__).toBe(undefined);
    });

    it('does not throw error if getDefaultView returns nothing', () => {
      ElementResize.addListener(element, callback);
      spyOn(ElementResize, 'getDefaultView').and.returnValue(null);
      expect(() => { ElementResize.removeListener(element, callback) }).not.toThrowError();
    });

    it('removes a callback if it exists', () => {
      const removeSpy = jasmine.createSpy('remove listener');
      spyOn(ElementResize, 'getDefaultView').and.returnValue({
        removeEventListener: removeSpy
      });
      ElementResize.addListener(element, callback);
      ElementResize.addListener(element, callback);
      ElementResize.removeListener(element, callback);
      expect(element.__resizeListenerCallbacks__.length).toEqual(1);
    });

    it('removes the callback if it exists (and the listener if it was last callback)', () => {
      const removeSpy = jasmine.createSpy('remove listener');
      spyOn(ElementResize, 'getDefaultView').and.returnValue({
        removeEventListener: removeSpy
      });
      ElementResize.addListener(element, callback);
      ElementResize.removeListener(element, callback);
      expect(element.__resizeListenerCallbacks__.length).toEqual(0);
      expect(removeSpy).toHaveBeenCalled();
      expect(element.__resizeTrigger__).toBeFalsy();
    });
  });

  describe('getDefaultView with full browser support', () => {
    it('returns the defaultView of the given element', () => {
      expect(ElementResize.getDefaultView({
        contentDocument: { defaultView: 'foo' }
      })).toEqual('foo');
    })
  });

  describe('getDefaultView with partial browser support', () => {
    it('returns the defaultView of the given element', () => {
      expect(ElementResize.getDefaultView({})).toEqual(null);
    })
  });
});
