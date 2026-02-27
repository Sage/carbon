import React from "react";
import { render } from "@testing-library/react";

import DialogFullScreen from ".";
import Logger from "../../__internal__/utils/logger";

jest.mock("../../__internal__/utils/logger");

afterEach(() => {
  jest.restoreAllMocks();
});

describe("DialogFullScreen", () => {
  it("logs a deprecation warning when DialogFullScreen is used", () => {
    const loggerSpy = jest.spyOn(Logger, "deprecate");
    render(<DialogFullScreen open />);

    expect(loggerSpy).toHaveBeenCalledWith(
      "`DialogFullscreen` has been deprecated and will soon be removed. Use `Dialog` with the `fullscreen` prop instead.",
    );
    expect(loggerSpy).toHaveBeenCalledTimes(2); // This wil not stay as 2. This is because DialogFullscreen uses Dialog and the fullscreen prop is deprecated

    loggerSpy.mockRestore();
  });
});
