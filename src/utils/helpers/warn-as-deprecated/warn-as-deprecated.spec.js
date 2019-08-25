import warnAsDeprecated from './warn-as-deprecated';

describe('warnAsDeprecated', () => {
  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  it('does not call "console.warn" unless in "development" environment', () => {
    warnAsDeprecated('foo', 'foo', 'foo');
    expect(console.warn.mock.calls.length).toBe(0);
  });

  it('does not call "console.warn" unless name of replaced component provided', () => {
    warnAsDeprecated('', 'foo', 'foo');
    expect(console.warn.mock.calls.length).toBe(0);
  });

  it('does not call "console.warn" unless name of replacing component provided', () => {
    warnAsDeprecated('foo', '', 'foo');
    expect(console.warn.mock.calls.length).toBe(0);
  });

  it('calls "console.warn" when all conditions are met', () => {
    warnAsDeprecated('foo', 'foo', 'development');
    expect(console.warn.mock.calls.length).toBe(1);
  });
});
