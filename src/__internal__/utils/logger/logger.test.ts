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
