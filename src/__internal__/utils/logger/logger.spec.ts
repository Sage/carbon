import Logger from ".";
import { expectConsoleOutput } from "../../../__spec_helper__/__internal__/test-utils";

const message = "Hello World!";

describe("Logger", () => {
  beforeEach(() => {
    Logger.setEnabledState(true);
  });

  it("does not output to the console when enabled is false", () => {
    Logger.setEnabledState(false);
    jest.spyOn(console, "warn");
    Logger.deprecate(message);
    // eslint-disable-next-line no-console
    expect(console.warn).not.toHaveBeenCalled();
  });

  it("ouputs an warn to the console with a deprecation prefix", () => {
    const assert = expectConsoleOutput(`[Deprecation]${message}`, "warn");
    Logger.deprecate(`[Deprecation]${message}`);
    assert();
  });
});
