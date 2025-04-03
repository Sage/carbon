import Logger from ".";

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
  consoleWarnSpy.mockReset();
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
