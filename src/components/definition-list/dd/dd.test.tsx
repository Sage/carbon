import React from "react";
import { render } from "@testing-library/react";
import Dd from "./dd.component";

test("throws an error when not used within a Dl", () => {
  const consoleErrorSpy = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});

  expect(() => render(<Dd>This is a test</Dd>)).toThrow(
    "Carbon DefinitionList: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
  );

  consoleErrorSpy.mockRestore();
});
