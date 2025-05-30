import Logger from ".";
import getNodeEnv from "./get-node-env";

jest.mock("./get-node-env");
const mockGetNodeEnv = jest.mocked(getNodeEnv);

afterEach(() => {
  jest.restoreAllMocks();
});

test("calling deprecate method does not log warning level message to the console in a production environment", () => {
  mockGetNodeEnv.mockReturnValue("production");

  const consoleWarnSpy = jest
    .spyOn(console, "warn")
    .mockImplementation(() => {});

  Logger.deprecate("This is a deprecation message");

  expect(consoleWarnSpy).not.toHaveBeenCalled();
});

test("calling deprecate method logs warning level message to the console in a development environment", () => {
  mockGetNodeEnv.mockReturnValue("development");

  const consoleWarnSpy = jest
    .spyOn(console, "warn")
    .mockImplementation(() => {});

  Logger.deprecate("This is a deprecation message");

  expect(consoleWarnSpy).toHaveBeenCalledWith(
    "[Deprecation] This is a deprecation message",
  );
});

test("calling error method does not log error level message to the console in a production environment", () => {
  mockGetNodeEnv.mockReturnValue("production");

  const consoleErrorSpy = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});

  Logger.error("This is an error message");

  expect(consoleErrorSpy).not.toHaveBeenCalled();
});

test("calling error method logs error level message to the console in a development environment", () => {
  mockGetNodeEnv.mockReturnValue("development");

  const consoleErrorSpy = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});

  Logger.error("This is an error message");

  expect(consoleErrorSpy).toHaveBeenCalledWith("This is an error message");
});

test("calling warn method does not log warning level message to the console in a production environment", () => {
  mockGetNodeEnv.mockReturnValue("production");

  const consoleWarnSpy = jest
    .spyOn(console, "warn")
    .mockImplementation(() => {});

  Logger.warn("This is a warning message");

  expect(consoleWarnSpy).not.toHaveBeenCalled();
});

test("calling warn method logs warning level message to the console in a development environment", () => {
  mockGetNodeEnv.mockReturnValue("development");

  const consoleWarnSpy = jest
    .spyOn(console, "warn")
    .mockImplementation(() => {});

  Logger.warn("This is a warning message");

  expect(consoleWarnSpy).toHaveBeenCalledWith("This is a warning message");
});
