import React from "react";
import { render, screen, within } from "@testing-library/react";

import Icon from "../icon";
import IconButton from ".";
import { testStyledSystemSpacing } from "../../__spec_helper__/__internal__/test-utils";

jest.mock("../../__internal__/utils/logger");

test("should render with an `Icon` child", () => {
  render(
    <IconButton aria-label="icon-button">
      <Icon type="bin" />
    </IconButton>,
  );

  const iconButton = screen.getByRole("button", { name: "icon-button" });
  const icon = within(iconButton).getByTestId("icon");

  expect(iconButton).toBeVisible();
  expect(icon).toBeVisible();
});

test("sets the 'aria-label' attribute correctly when a custom value is passed to the `aria-label` prop", () => {
  render(
    <IconButton aria-label="alternative-aria-label">
      <Icon type="bin" />
    </IconButton>,
  );

  const iconButton = screen.getByRole("button", {
    name: "alternative-aria-label",
  });

  expect(iconButton).toBeVisible();
});

test("sets the 'aria-label' attribute as the `Icon` child's type, when a custom value is not passed to the `aria-label` prop", () => {
  render(
    <IconButton>
      <Icon type="bin" />
    </IconButton>,
  );

  const iconButton = screen.getByRole("button", { name: "bin" });

  expect(iconButton).toBeVisible();
});

test("should render as disabled when the `disabled` prop is true", () => {
  render(
    <IconButton disabled aria-label="icon-button">
      <Icon type="bin" />
    </IconButton>,
  );

  const iconButton = screen.getByRole("button", { name: "icon-button" });

  expect(iconButton).toBeDisabled();
});

test("accepts ref as a ref object", () => {
  const mockRef = { current: null };
  render(
    <IconButton aria-label="icon-button" ref={mockRef}>
      <Icon type="bin" />
    </IconButton>,
  );

  const button = screen.getByRole("button", { name: "icon-button" });

  expect(mockRef.current).toBe(button);
});

test("accepts ref as a ref callback", () => {
  const mockRef = jest.fn();
  render(
    <IconButton aria-label="icon-button" ref={mockRef}>
      <Icon type="bin" />
    </IconButton>,
  );

  const button = screen.getByRole("button", { name: "icon-button" });

  expect(mockRef).toHaveBeenCalledWith(button);
});

test("sets ref to empty after unmount", () => {
  const mockRef = { current: null };
  const { unmount } = render(
    <IconButton aria-label="icon-button">
      <Icon type="bin" />
    </IconButton>,
  );

  unmount();

  expect(mockRef.current).toBe(null);
});

test("renders with provided data- attributes", () => {
  render(
    <IconButton data-element="bar" data-role="baz">
      <Icon type="bin" />
    </IconButton>,
  );

  expect(screen.getByTestId("baz")).toHaveAttribute("data-element", "bar");
});

testStyledSystemSpacing(
  (props) => (
    <IconButton onClick={() => {}} {...props}>
      <Icon type="home" />
    </IconButton>
  ),
  () => screen.getByRole("button"),
  undefined,
  { modifier: "&&" },
);

test("should render with default padding when no padding props are passed", () => {
  render(
    <IconButton onClick={() => {}}>
      <Icon type="home" />
    </IconButton>,
  );

  const iconButton = screen.getByRole("button");

  expect(iconButton).toHaveStyleRule("padding", "var(--spacing000)", {
    modifier: "&&",
  });
});
