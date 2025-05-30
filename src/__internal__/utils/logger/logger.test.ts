import Logger from ".";

afterEach(() => {
  jest.restoreAllMocks();
});

test("should not output a warning to the console when logging is disabled and a deprecation message is fired", () => {
  Logger.setEnabledState(false);
  const consoleWarnSpy = jest
    .spyOn(console, "warn")
    .mockImplementation(() => {});
  Logger.deprecate("This is a deprecation message");

  expect(consoleWarnSpy).not.toHaveBeenCalled();
});

test("should output a warning to the console with a deprecation prefix when logging is enabled", () => {
  Logger.setEnabledState(true);
  const consoleWarnSpy = jest
    .spyOn(console, "warn")
    .mockImplementation(() => {});
  Logger.deprecate("This is a deprecation message");

  expect(consoleWarnSpy).toHaveBeenCalledWith(
    "[Deprecation] This is a deprecation message",
  );
});

test("should not log an error to the console when logging is disabled and an error message is fired", () => {
  Logger.setEnabledState(false);
  const consoleErrorSpy = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});
  Logger.error("This is an error message");

  expect(consoleErrorSpy).not.toHaveBeenCalled();
});

test("should log an error to the console with an error prefix when logging is enabled", () => {
  Logger.setEnabledState(true);
  const consoleErrorSpy = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});
  Logger.error("This is an error message");

  expect(consoleErrorSpy).toHaveBeenCalledWith("This is an error message");
});

test("logs warning-level message to console, when logging is enabled and warn method is called", () => {
  Logger.setEnabledState(true);
  const consoleWarnSpy = jest
    .spyOn(console, "warn")
    .mockImplementation(() => {});
  Logger.warn("This is a warning message");

  expect(consoleWarnSpy).toHaveBeenCalledWith("This is a warning message");
});

test("does not log warning-level message to console, when logging is disabled and warn method is called", () => {
  Logger.setEnabledState(false);
  const consoleWarnSpy = jest
    .spyOn(console, "warn")
    .mockImplementation(() => {});
  Logger.warn("This is a warning message");

  expect(consoleWarnSpy).not.toHaveBeenCalled();
});
