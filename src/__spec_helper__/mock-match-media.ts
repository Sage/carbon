let mocked = false;
let _matches = false;
const removeEventListener = jest.fn();

export const setupMatchMediaMock = () => {
  if (!global.window) {
    return;
  }
  const noop = () => {};
  Object.defineProperty(global.window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: _matches,
      media: query,
      onchange: null,
      addEventListener: noop,
      removeEventListener,
      dispatchEvent: noop,
    }),
  });
  mocked = true;
};

export const mockMatchMedia = (matches: boolean) => {
  if (!mocked) {
    throw new Error(
      "window.matchMedia has not been mocked. Did you call setupMatchMediaMock()?",
    );
  }
  _matches = matches;
  return { removeEventListener };
};
