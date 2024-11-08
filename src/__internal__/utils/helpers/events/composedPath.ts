// A basic cross-browser implementation of Event.protoType.composedPath
// JSDOM does not suppor event bubbling
// IE does not support composedPath

// https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath
export default (ev: CustomEvent): EventTarget[] => {
  // In this example composedPath would show that the event started at document.body
  // but it would trigger the eventListener on document
  let element = (ev.target as HTMLElement) || null;

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
