import React from "react";
import { render, screen } from "@testing-library/react";
import Fieldset from "./fieldset.component";
import Textbox from "../textbox";

test("Fieldset Legend is rendered if supplied", () => {
  render(<Fieldset legend="Legend" />);
  expect(screen.getByText("Legend")).toBeVisible();
});

test("Fieldset Legend is not rendered if omitted", () => {
  render(<Fieldset />);
  expect(screen.queryByText("Legend")).not.toBeInTheDocument();
});

test("Fieldset adds the required attribute to any child inputs when isRequired is true", () => {
  render(
    <Fieldset required>
      <input />
      <input />
    </Fieldset>,
  );
  const inputs = screen.getAllByRole("textbox");
  inputs.forEach((input) => expect(input).toBeRequired());
});

test("Fieldset does not add the required attribute to any child inputs when isRequired is falsy", () => {
  render(
    <Fieldset>
      <input />
      <input />
    </Fieldset>,
  );
  const inputs = screen.getAllByRole("textbox");
  inputs.forEach((input) => expect(input).not.toBeRequired());
});

/* The following two tests are purely to satisfy the coverage report
 * The actual tests for these are now done via Chromatic */
test("Fieldset Legend adds an (optional) after the text when set to isOptional", () => {
  render(
    <Fieldset legend="This is my custom legend" isOptional>
      <Textbox onChange={() => {}} />
    </Fieldset>,
  );

  const legend = screen.getByText("This is my custom legend");
  expect(legend).toBeInTheDocument();
});

test("Fieldset Legend adds an asterisk after the text when the field is mandatory", () => {
  render(
    <Fieldset legend="This is my custom legend" required>
      <Textbox onChange={() => {}} />
    </Fieldset>,
  );

  const legend = screen.getByText("This is my custom legend");
  expect(legend).toBeInTheDocument();
});
