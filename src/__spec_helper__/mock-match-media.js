let mocked = false;
let _matches = false;
const removeListener = jest.fn();

export const setup = () => {
  if (!global.window) {
    return;
  }
  const noop = () => {};
  Object.defineProperty(global.window, "matchMedia", {
    writable: true,
    value: (query) => ({
      matches: _matches,
      media: query,
      onchange: null,
      addListener: noop,
      removeListener,
      dispatchEvent: noop,
    }),
  });
  mocked = true;
};

export const mockMatchMedia = (matches) => {
  if (!mocked) {
    throw new Error(
      "window.matchMedia has not been mocked. Did you call setup()?"
    );
  }
  _matches = matches;
  return { removeListener };
};
