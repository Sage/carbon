'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bowser = require('bowser');

var _bowser2 = _interopRequireDefault(_bowser);

var _browser = require('../browser');

var _browser2 = _interopRequireDefault(_browser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a child 'object' or document which mimics the size of the given element and is
 * able to use the browser 'resize' event listener to trigger a callback.
 *
 * Adapted from http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/
 *
 *   __resizeListenerCallbacks__ - an array of callbacks to trigger on this element when it is resized
 *   __resizeTrigger__ - the element to listen for resize events. The browser creates a fake object
 *   which supports resize events.
 */
var ElementResize = {
  /**
   * Sets up an event listener for when an element is resized.
   *
   * @method addListener
   * @param {HTMLElement} element - the html element to watch
   * @param {Function} fn - the callback
   */
  addListener: function addListener(element, callback) {
    if (!element) {
      return;
    }
    // if there is no resize listener on this element yet, create an object to apply the listener to
    if (!element.__resizeTrigger__) {
      element.__resizeListenerCallbacks__ = [];

      // ensure that the element has position relative for the child object to work properly
      if (_browser2.default.getWindow().getComputedStyle(element).position === 'static') {
        element.style.position = 'relative';
      }

      // creates an object which will support the resize event listener
      var obj = _browser2.default.getDocument().createElement('object');
      element.__resizeTrigger__ = obj;
      obj.setAttribute('style', '\n        display: block;\n        opacity: 0;\n        position: absolute;\n        top: 0;\n        left: 0;\n        height: 100%;\n        width: 100%;\n        overflow: hidden;\n        pointer-events: none;\n        z-index: -1;\n      ');
      // when the object is ready, add the event listener
      obj.onload = objectLoad(obj, element); // eslint-disable-line no-use-before-define
      obj.type = 'text/html';

      var isMS = _bowser2.default.msie || _bowser2.default.msedge;

      if (isMS) {
        element.appendChild(obj);
      }

      obj.data = 'about:blank';

      if (!isMS) {
        element.appendChild(obj);
      }
    }

    // add the callback to the array of listeners
    element.__resizeListenerCallbacks__.push(callback);
  },

  /**
   * Removes event listeners for when an element is resized.
   *
   * @method removeListener
   * @param {HTMLElement} element - the html element to watch
   * @param {Function} fn - the callback
   */
  removeListener: function removeListener(element, callback) {
    if (element.__resizeListenerCallbacks__) {
      // remove the event listener from the array
      element.__resizeListenerCallbacks__.splice(element.__resizeListenerCallbacks__.indexOf(callback), 1);

      // if there are no event listeners left, time to detach the event
      if (!element.__resizeListenerCallbacks__.length) {
        var view = ElementResize.getDefaultView(element.__resizeTrigger__);

        if (view) {
          // remove the event listener on the object
          view.removeEventListener('resize', resizeListener); // eslint-disable-line no-use-before-define
          // remove the fake object
          element.__resizeTrigger__ = !element.removeChild(element.__resizeTrigger__);
        }
      }
    }
  },

  getDefaultView: function getDefaultView(element) {
    if (element.contentDocument) {
      return element.contentDocument.defaultView;
    }

    return null;
  }
};

/**
 * The event listener to be triggered.
 */
var resizeListener = function resizeListener(ev) {
  var trigger = ev.target.__resizeTrigger__;

  // using the reference to the source element, retrieve the array of callbacks and trigger them all
  trigger.__resizeListenerCallbacks__.forEach(function (fn) {
    fn.call(trigger, ev);
  });
};

/**
 * Return a function to be triggered when the fake object has been loaded into the DOM.
 */
var objectLoad = function objectLoad(obj, element) {
  return function () {
    var view = ElementResize.getDefaultView(obj);

    if (view) {
      // assign a reference back to the source element in the new object's document
      view.__resizeTrigger__ = element;
      // apply the event listener to the new object's document
      view.addEventListener('resize', resizeListener);
    }
  };
};

exports.default = ElementResize;