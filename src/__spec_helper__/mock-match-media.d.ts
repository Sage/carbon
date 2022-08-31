declare function setupMatchMediaMock(): void;
declare function mockMatchMedia(
  matches?: boolean
): {
  removeListener: jest.Mock;
};

export { setupMatchMediaMock, mockMatchMedia };
