import React from "react";
import { render } from "@testing-library/react";
import CarbonProvider from ".";
import Logger from "../../__internal__/utils/logger";

test("logs a deprecation warning once when the `focusRedesignOptOut` feature flag is `true`", () => {
  const loggerSpy = jest
    .spyOn(Logger, "deprecate")
    .mockImplementation(() => {});

  render(
    <>
      <CarbonProvider focusRedesignOptOut>
        <CarbonProvider>Hello World!</CarbonProvider>
      </CarbonProvider>
      <CarbonProvider focusRedesignOptOut>
        <CarbonProvider>Hello World!</CarbonProvider>
      </CarbonProvider>
    </>,
  );

  expect(loggerSpy).toHaveBeenCalledWith(
    "The `focusRedesignOptOut` feature flag has been deprecated and will soon be removed. " +
      "Along with this feature flag, the legacy focus styling will also be removed. ",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(1);
  loggerSpy.mockRestore();
});
