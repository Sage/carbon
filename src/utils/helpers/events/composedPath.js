// A basic cross-browser implementation of Event.protoType.composedPath
// JSDOM does not suppor event bubbling
// IE does not support composedPath
// https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath
export default (ev) => {
  // When testing with enzyme, we want to trigger a listener on an element but pretend
  // that it bubbled from the enzymeTestingTarget
  // e.g. document.dispatchEvent(new MouseClick('click', {
  //   detail: {enzymeTestingTarget: document.body}
  // }))
  // In this example composedPath would show that the event started at document.body
  // but it would trigger the eventListener on document
  let element =
    (ev.detail && ev.detail.enzymeTestingTarget) || ev.target || null;

  if (!element || !element.parentElement) {
    return [];
  }

  const path = [element];
  while (element.parentElement) {
    element = element.parentElement;
    path.unshift(element);
  }

  return path;
};
