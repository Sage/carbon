import Browser from './../browser';
import Bowser from 'bowser';

/**
 * Creates a child 'object' or document which mimics the size of the given element and is
 * able to use the browser 'resize' event listener to trigger a callback.
 *
 * Adapted from http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/
 *
 *   __resizeListenerCallbacks__ - an array of callbacks to trigger on this element when it is resized
 *   __resizeTrigger__ - the element to listen for resize events. If the browser supports 'attachEvent' then
 *   this will be the original element. If the browser does not support 'attachEvent' then this will be a
 *   fake object element which supports resize events.
 *
 * NOTE: requestAnimationFrame is used for performance (runs the callback less frequently) - https://www.html5rocks.com/en/tutorials/speed/rendering/
 */

/**
 * Sets up an event listener for when an element is resized.
 *
 * @method addResizeListener
 * @param {HTMLElement} element - the html element to watch
 * @param {Function} fn - the callback
 */
const addResizeListener = (element, callback) => {
  // if there is no resize listener on this element yet, create an object to apply the listener to
  if (!element.__resizeListenerCallbacks__) {
    element.__resizeListenerCallbacks__ = [];

    if (attachEvent) {
      // if browser supports 'attachEvent' then use it's API (IE10 and below)
      element.__resizeTrigger__ = element;
      element.attachEvent('onresize', resizeListener);
    } else {
      // ensure that the element has position relative for the child object to work properly
      if (getComputedStyle(element).position == 'static') {
        element.style.position = 'relative';
      }

      // creates an object which will support the resize event listener
      const obj = element.__resizeTrigger__ = document.createElement('object'); 
      obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;');
      // when the object is ready, add the event listener
      obj.onload = objectLoad(obj, element);
      obj.type = 'text/html';

      if (isIE) {
        element.appendChild(obj);
      }

      obj.data = 'about:blank';

      if (!isIE) {
        element.appendChild(obj);
      }
    }
  }

  // add the callback to the array of listeners
  element.__resizeListenerCallbacks__.push(callback);
};

const removeResizeListener = (element, callback) => {
  // remove the event listener from the array
  element.__resizeListenerCallbacks__.splice(element.__resizeListenerCallbacks__.indexOf(callback), 1);

  // if there are no event listeners left, time to detach the event
  if (!element.__resizeListenerCallbacks__.length) {
    if (attachEvent) {
      // if the browser supports 'attachEvent' then use it's API (IE 10 and below)
      element.detachEvent('onresize', resizeListener);
    } else {
      // remove the event listener on the object
      element.__resizeTrigger__.contentDocument.defaultView.removeEventListener('resize', resizeListener);
      // remove the fake object
      element.__resizeTrigger__ = !element.removeChild(element.__resizeTrigger__);
    }
  }
}

const _document = Browser.getDocument(),
      _window = Browser.getWindow(),
      attachEvent = _document.attachEvent,
      isIE = Bowser.msie;

/**
 * Returns a supported requestAnimationFrame for the current browser.
 */
const requestFrame = (() => {
  const rafFake = (fn) => _window.setTimeout(fn, 20),
        raf = _window.requestAnimationFrame ||
              _window.mozRequestAnimationFrame ||
              _window.webkitRequestAnimationFrame ||
              rafFake;

  return (fn) => { return raf(fn); };
})();

/**
 * Returns a supported cancelAnimationFrame for the current browser.
 */
const cancelFrame = (() => {
  const cancel = _window.cancelAnimationFrame || _window.mozCancelAnimationFrame || _window.webkitCancelAnimationFrame || _window.clearTimeout;

  return (id) => { return cancel(id); };
})();

/**
 * The event listener to be triggered.
 */
const resizeListener = (e) => {
  const win = e.target || e.srcElement;

  if (win.__resizeRAF__) {
    // if there is an animation frame in progress then cancel it
    cancelFrame(win.__resizeRAF__);
  }

  // create a new animation frame which will trigger each resize listener currently assigned
  win.__resizeRAF__ = requestFrame(() => {
    // using the reference to the source element, retrieve the array of callbacks and trigger them all
    win.__resizeTrigger__.__resizeListenerCallbacks__.forEach((fn) => {
      fn.call(win.__resizeTrigger__, e);
    });
  });
}

/**
 * Return a function to be triggered when the fake object has been loaded into the DOM.
 */
const objectLoad = (obj, element) => {
  return (e) => {
    // assign a reference back to the source element in the new object's document
    obj.contentDocument.defaultView.__resizeTrigger__ = element;
    // apply the event listener to the new object's document
    obj.contentDocument.defaultView.addEventListener('resize', resizeListener);
  }
}

export {
  addResizeListener,
  removeResizeListener
}
