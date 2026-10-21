import React from "react";
import { render, screen } from "@testing-library/react";
import FileInputValidation from ".";

test("defaults to spacing below the validation message when no position is supplied", () => {
  render(<FileInputValidation error="Choose a file" />);

  const status = screen.getByRole("status");
  expect(status).toHaveStyleRule("margin-bottom", expect.any(String));
  expect(status).not.toHaveStyleRule("margin-top");
});
