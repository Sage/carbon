import React from "react";
import { screen, render } from "@testing-library/react";
import ButtonGroup from "./button-group";

test("returns null if no children are provided", () => {
  render(<ButtonGroup namespace="test" name="test" />);
  const buttonGroup = screen.queryByRole("group");
  expect(buttonGroup).not.toBeInTheDocument();
});

test("renders a divider if the `showDivider` prop is true", () => {
  render(
    <ButtonGroup namespace="test" name="test" showDivider>
      <button type="button">Test Button</button>
    </ButtonGroup>,
  );
  const divider = screen.getByRole("separator");
  expect(divider).toBeInTheDocument();
});

test("does not render a divider if the `showDivider` prop is false", () => {
  render(
    <ButtonGroup namespace="test" name="test" showDivider={false}>
      <button type="button">Test Button</button>
    </ButtonGroup>,
  );
  const divider = screen.queryByRole("separator");
  expect(divider).not.toBeInTheDocument();
});
