const setupResizeObserverMock = () => {
  if (typeof window === "undefined") {
    return;
  }
  window.ResizeObserver =
    window.ResizeObserver ||
    jest.fn().mockImplementation((callback: ResizeObserverCallback) => {
      let hasCalledCallback = false;
      const observer: ResizeObserver = {
        disconnect: jest.fn(),
        // observe mock needs to actually call the callback straight away, as this is what a real ResizeObserver does
        // and this behaviour is needed for the FixedNavigationBarContextProvider to work properly.
        // Note that we must only call the callback once per ResizeObserver instance, to avoid stack overflows in
        // react-virtual.
        observe: jest.fn((target: Element) => {
          if (!hasCalledCallback) {
            hasCalledCallback = true;
            callback([{ target } as ResizeObserverEntry], observer);
          }
        }),
        unobserve: jest.fn(),
      };
      return observer;
    });
};

export default setupResizeObserverMock;
