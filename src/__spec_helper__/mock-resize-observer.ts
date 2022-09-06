const setupResizeObserverMock = () => {
  if (!window) {
    return;
  }
  window.ResizeObserver =
    window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
      disconnect: jest.fn(),
      observe: jest.fn(),
      unobserve: jest.fn(),
    }));
};

export default setupResizeObserverMock;
