import React from "react";
import { render, screen } from "@testing-library/react";
import { testStyledSystemSpacing } from "../../__spec_helper__/__internal__/test-utils";
import VerticalDivider from ".";
import { Menu } from "../menu";

testStyledSystemSpacing(
  (props) => <VerticalDivider {...props} />,
  () => screen.getByTestId("vertical-divider"),
);

test("should render with the default padding when no padding props are passed", () => {
  render(<VerticalDivider />);
  const verticalDividerElement = screen.getByTestId("vertical-divider");

  expect(verticalDividerElement).toHaveStyleRule(
    "padding",
    "var(--spacing300)",
  );
});

test("should apply the expected height when `h` prop is passed a value of `100`", () => {
  render(<VerticalDivider h={200} />);
  const verticalDividerElement = screen.getByTestId("vertical-divider");

  expect(verticalDividerElement).toHaveStyle("height: 200px");
});

test("should apply the expected height when `h` prop is passed a string value", () => {
  render(<VerticalDivider h="100px" />);
  const verticalDividerElement = screen.getByTestId("vertical-divider");

  expect(verticalDividerElement).toHaveStyle("height: 100px");
});

test("should apply the expected styling when `displayInline` prop is true", () => {
  render(<VerticalDivider displayInline />);
  const verticalDividerElement = screen.getByTestId("vertical-divider");

  expect(verticalDividerElement).toHaveStyle("display: inline");
});

test("should apply the expected tint when `tint` prop is passed a value of `20`", () => {
  render(<VerticalDivider tint={20} />);
  const verticalDividerElement = screen.getByTestId("divider");

  expect(verticalDividerElement).toHaveStyle("borderLeft: 1px solid #335C6D");
});

test("should apply the expected tint when `tint` prop is passed a value of `90`", () => {
  render(<VerticalDivider tint={90} />);
  const verticalDividerElement = screen.getByTestId("divider");

  expect(verticalDividerElement).toHaveStyle("borderLeft: 1px solid #E6EBED");
});

test("should render as an `li` element with `aria-hidden` when inside a Menu", () => {
  render(
    <Menu>
      <VerticalDivider />
    </Menu>,
  );
  const verticalDividerElement = screen.getByTestId("vertical-divider");

  expect(verticalDividerElement.tagName).toEqual("LI");
  expect(verticalDividerElement).toHaveAttribute("aria-hidden", "true");
});

test("should allow the `aria-hidden` attribute to be set when not in a menu", () => {
  render(<VerticalDivider aria-hidden />);
  const verticalDividerElement = screen.getByTestId("vertical-divider");

  expect(verticalDividerElement).toHaveAttribute("aria-hidden", "true");
});

test("should not allow the `aria-hidden` attribute to be overridden when in a menu", () => {
  render(
    <Menu>
      <VerticalDivider aria-hidden={false} />
    </Menu>,
  );
  const verticalDividerElement = screen.getByTestId("vertical-divider");

  expect(verticalDividerElement).toHaveAttribute("aria-hidden", "true");
});

test("should render with provided data- attributes", () => {
  render(<VerticalDivider data-role="bar" data-element="baz" />);

  expect(screen.getByTestId("bar")).toHaveAttribute("data-element", "baz");
});
