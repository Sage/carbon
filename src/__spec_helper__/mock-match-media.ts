let mocked = false;
let _matches = false;
const removeEventListener = jest.fn();
let _changeListeners: Set<() => void> = new Set();

export const setupMatchMediaMock = () => {
  if (typeof window === "undefined") {
    return;
  }
  const noop = () => {};
  Object.defineProperty(global.window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      get matches() {
        return _matches;
      },
      media: query,
      onchange: null,
      addEventListener: (_event: string, handler: () => void) => {
        _changeListeners.add(handler);
      },
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
  _changeListeners = new Set();
  return { removeEventListener };
};

/** Simulate a media query change — updates `matches` and fires captured listeners */
export const simulateMediaQueryChange = (matches: boolean) => {
  _matches = matches;
  _changeListeners.forEach((l) => l());
};
