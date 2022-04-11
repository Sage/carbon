declare function setup(): void;
declare function mockMatchMedia(
  matches?: boolean
): { removeListener: jest.Mock };

export { setup, mockMatchMedia };
