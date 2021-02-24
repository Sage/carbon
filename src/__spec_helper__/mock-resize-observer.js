const setupResizeObserverMock = () => {
  if (!global.window) {
    return;
  }
  global.window.ResizeObserver =
    global.window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
      disconnect: jest.fn(),
      observe: jest.fn(),
      unobserve: jest.fn(),
    }));
};

export default setupResizeObserverMock;
