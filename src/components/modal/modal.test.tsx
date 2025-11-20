import React from "react";
import { render } from "@testing-library/react";

import Modal from ".";
import Logger from "../../__internal__/utils/logger";

test("logs deprecation warning when rendered", () => {
  const loggerSpy = jest
    .spyOn(Logger, "deprecate")
    .mockImplementation(() => {});

  const { rerender } = render(<Modal open />);
  rerender(<Modal open />);

  expect(loggerSpy).toHaveBeenCalledWith(
    "Carbon `Modal` is deprecated. Please use `Dialog` instead.",
  );
});

test("logs deprecation warning only once when rendered multiple times", () => {
  const loggerSpy = jest
    .spyOn(Logger, "deprecate")
    .mockImplementation(() => {});

  const { rerender } = render(<Modal open />);

  loggerSpy.mockClear();

  rerender(<Modal open />);

  expect(loggerSpy).not.toHaveBeenCalled();
});
