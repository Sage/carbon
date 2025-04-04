import React from "react";
import { render } from "@testing-library/react";
import Logger from "../../../__internal__/utils/logger";

import Dt from "./dt.component";

test("logs warning when not used within a Dl", () => {
  const loggerSpy = jest.spyOn(Logger, "error").mockImplementation(() => {});

  render(<Dt>This is a test</Dt>);

  expect(loggerSpy).toHaveBeenCalledWith(
    expect.stringContaining(
      "Carbon DefinitionList: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    ),
  );

  loggerSpy.mockRestore();
});
