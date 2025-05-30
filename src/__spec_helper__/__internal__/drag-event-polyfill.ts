import "@atlaskit/pragmatic-drag-and-drop-unit-testing/drag-event-polyfill";
import "@atlaskit/pragmatic-drag-and-drop-unit-testing/dom-rect-polyfill";

// Added to avoid TypeError: Cannot read properties of undefined (reading 'pageX') due to the use of a drag-event polyfill via pragmatic-drag-and-drop
if (typeof window !== "undefined") {
  Object.defineProperties(MouseEvent.prototype, {
    pageX: {
      configurable: true,
      writable: true,
      value: 0,
    },
    pageY: {
      configurable: true,
      writable: true,
      value: 0,
    },
  });
}
