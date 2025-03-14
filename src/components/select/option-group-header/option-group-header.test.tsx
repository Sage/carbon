import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../../../__spec_helper__/__internal__/test-utils";

import OptionGroupHeader from ".";

test("should render the `label` and `icon` when no children are provided", () => {
  render(<OptionGroupHeader label="foo" icon="shop" />);

  expect(screen.getByRole("heading", { name: "foo", level: 4 })).toBeVisible();
  expect(screen.getByTestId("icon")).toBeVisible();
});

test("should not render the `label` and `icon` when `children` are passed", () => {
  render(
    <OptionGroupHeader label="foo" icon="shop">
      <h2>bar</h2>
    </OptionGroupHeader>,
  );

  expect(screen.getByRole("heading", { name: "bar", level: 2 })).toBeVisible();
  expect(
    screen.queryByRole("heading", { name: "foo", level: 4 }),
  ).not.toBeInTheDocument();
  expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
});

test("should render with the expected `data-` attributes", () => {
  render(
    <OptionGroupHeader
      label="foo"
      icon="shop"
      data-element="bar"
      data-role="baz"
    />,
  );

  const optionGroupHeader = screen.getByTestId("baz");

  expect(optionGroupHeader).toHaveAttribute(
    "data-component",
    "option-group-header",
  );
  expect(optionGroupHeader).toHaveAttribute("data-element", "bar");
});

test("should trigger a console warning when no label or children are provided", () => {
  const spy = jest.spyOn(console, "warn").mockImplementation(() => {});
  render(<OptionGroupHeader />);

  expect(spy).toHaveBeenCalledWith(
    "OptionGroupHeader requires either a label or children to be provided",
  );
  spy.mockRestore();
});
