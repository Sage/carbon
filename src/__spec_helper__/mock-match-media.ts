// mock-match-media.ts
let mocked = false;
let _matches = false;
let _listeners: ((e: MediaQueryListEvent) => void)[] = [];

export const setupMatchMediaMock = () => {
  if (typeof window === "undefined") {
    return;
  }

  Object.defineProperty(global.window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: _matches,
      media: query,
      onchange: null,
      addEventListener: (
        event: string,
        handler: (e: MediaQueryListEvent) => void,
      ) => {
        if (event === "change") {
          _listeners.push(handler);
        }
      },
      removeEventListener: (
        event: string,
        handler: (e: MediaQueryListEvent) => void,
      ) => {
        if (event === "change") {
          _listeners = _listeners.filter((l) => l !== handler);
        }
      },
      dispatchEvent: () => {},
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

  // Trigger change events
  const event = { matches } as MediaQueryListEvent;
  _listeners.forEach((listener) => listener(event));
};

export const clearMatchMediaListeners = () => {
  _listeners = [];
};
