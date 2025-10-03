import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ButtonMinor from ".";
import {
  testStyledSystemMargin,
  assertDeprecationWarning,
} from "../../__spec_helper__/__internal__/test-utils";

test("displays a deprecation warning if used", () => {
  assertDeprecationWarning({
    component: <ButtonMinor>foo</ButtonMinor>,
    deprecationMessage:
      "The `ButtonMinor` component is deprecated and will soon be removed.",
  });
});

test("should render with children", () => {
  render(<ButtonMinor>foo</ButtonMinor>);

  expect(screen.getByRole("button", { name: "foo" })).toBeVisible();
});

test("should render disabled button when `disabled` is true", () => {
  render(<ButtonMinor disabled>foo</ButtonMinor>);

  expect(screen.getByRole("button", { name: "foo" })).toBeDisabled();
});

// coverage
test("should render with expected styles when the button is icon only", () => {
  render(<ButtonMinor iconType="bin" />);

  expect(screen.getByTestId("icon")).toHaveStyle({ position: "absolute" });
});

// coverage
test("should render with expected styles when `buttonType` is 'primary'", () => {
  render(<ButtonMinor buttonType="primary">foo</ButtonMinor>);

  const button = screen.getByRole("button", { name: "foo" });

  expect(button).toHaveStyleRule("background", "var(--colorsActionMinor500)");
  expect(button).toHaveStyleRule(
    "border-color",
    "var(--colorsActionMinorTransparent)",
  );
  expect(button).toHaveStyleRule("color", "var(--colorsActionMinorYang100)");
});

// coverage
test("should render with expected styles when `buttonType` is 'secondary'", () => {
  render(<ButtonMinor buttonType="secondary">foo</ButtonMinor>);

  const button = screen.getByRole("button", { name: "foo" });

  expect(button).toHaveStyleRule("background", "transparent");
  expect(button).toHaveStyleRule("padding", "var(--spacing100)");
  expect(button).toHaveStyleRule("border-color", "var(--colorsActionMinor500)");
  expect(button).toHaveStyleRule("color", "var(--colorsActionMinor500)");
});

// coverage
test("should render with expected styles when `buttonType` is 'tertiary'", () => {
  render(<ButtonMinor buttonType="tertiary">foo</ButtonMinor>);

  const button = screen.getByRole("button", { name: "foo" });

  expect(button).toHaveStyleRule("background", "transparent");
  expect(button).toHaveStyleRule("padding", "var(--spacing100)");
  expect(button).toHaveStyleRule("color", "var(--colorsActionMinor500)");
});

// coverage
test("should render with expected styles when `isInPassword` is true", async () => {
  const user = userEvent.setup();
  render(<ButtonMinor isInPassword>foo</ButtonMinor>);

  await user.hover(screen.getByRole("button", { name: "foo" }));
  const hoveredButton = await screen.findByRole("button", { name: "foo" });

  expect(hoveredButton).toHaveStyleRule("color", "var(--colorsActionMinor500)");
  expect(hoveredButton).toHaveStyleRule("background", "transparent");
});

// coverage
test("should render with expected styles when `size` is 'small'", () => {
  render(<ButtonMinor size="small">foo</ButtonMinor>);

  const button = screen.getByRole("button", { name: "foo" });

  expect(button).toHaveStyleRule("min-height", "var(--sizing400)");
  expect(button).toHaveStyleRule(
    "padding",
    "var(--spacing000) var(--spacing100) var(--spacing000) var(--spacing100)",
  );
});

// coverage
test("should render with expected styles when `size` is 'medium'", () => {
  render(<ButtonMinor size="medium">foo</ButtonMinor>);

  const button = screen.getByRole("button", { name: "foo" });

  expect(button).toHaveStyleRule("padding-left", "var(--spacing150)");
  expect(button).toHaveStyleRule("padding-right", "var(--spacing150)");
});

// coverage
test("should render with expected styles when `size` is 'large'", () => {
  render(<ButtonMinor size="large">foo</ButtonMinor>);

  const button = screen.getByRole("button", { name: "foo" });

  expect(button).toHaveStyleRule("padding-left", "var(--spacing200)");
  expect(button).toHaveStyleRule("padding-right", "var(--spacing200)");
});

test("should render with `ref` when passed as an object", () => {
  const ref = { current: null };
  render(<ButtonMinor ref={ref}>foo</ButtonMinor>);

  expect(ref.current).not.toBeNull();
});

test("should render with `ref` when passed as a callback", () => {
  const ref = jest.fn();
  render(<ButtonMinor ref={ref}>foo</ButtonMinor>);

  expect(ref).toHaveBeenCalled();
});

test("should set `ref` to empty after unmount", () => {
  const ref = { current: null };
  const { unmount } = render(<ButtonMinor ref={ref}>foo</ButtonMinor>);

  unmount();

  expect(ref.current).toBeNull();
});

testStyledSystemMargin(
  (props) => <ButtonMinor {...props}>foo</ButtonMinor>,
  () => screen.getByRole("button", { name: "foo" }),
);
