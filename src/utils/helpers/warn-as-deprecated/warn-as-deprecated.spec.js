import warnAsDeprecated from "./warn-as-deprecated";

describe("warnAsDeprecated", () => {
  beforeEach(() => {
    jest.spyOn(console, "warn").mockImplementation(() => {});
    process.env.NODE_ENV = "development";
  });

  afterEach(() => {
    delete process.env.NODE_ENV;
  });

  it('does not call "console.warn" unless in "development" environment', () => {
    process.env.NODE_ENV = "production";
    warnAsDeprecated("foo", "foo");
    expect(console.warn.mock.calls.length).toBe(0);
  });

  it('does not call "console.warn" unless name of replaced component provided', () => {
    warnAsDeprecated("", "foo", "foo");
    expect(console.warn.mock.calls.length).toBe(0);
  });

  it('does not call "console.warn" unless name of replacing component provided', () => {
    warnAsDeprecated("foo", "", "foo");
    expect(console.warn.mock.calls.length).toBe(0);
  });

  it('calls "console.warn" when all conditions are met', () => {
    warnAsDeprecated("foo", "foo");
    expect(console.warn.mock.calls.length).toBe(1);
  });
});
