import React from "react";
import { screen, render } from "@testing-library/react";
import ButtonGroup from "./button-group.component";

test("returns null if no children are provided", () => {
  render(<ButtonGroup namespace="test" name="test" />);
  const buttonGroup = screen.queryByRole("group");
  expect(buttonGroup).not.toBeInTheDocument();
});

test("renders a divider if the `showDivider` prop is true", () => {
  const { container } = render(
    <ButtonGroup namespace="test" name="test" showDivider>
      <button type="button">Test Button</button>
    </ButtonGroup>,
  );

  // Because the separator is hidden via aria-hidden we need to use the container
  // to find it instead of screen.getByRole
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const divider = container.querySelector("[role='separator']");
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
