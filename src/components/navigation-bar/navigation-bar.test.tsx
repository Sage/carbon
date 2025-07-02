import React from "react";
import { render, screen } from "@testing-library/react";
import NavigationBar from ".";
import {
  testStyledSystemPadding,
  testStyledSystemFlexBox,
} from "../../__spec_helper__/__internal__/test-utils";

test("renders with children", () => {
  render(
    <NavigationBar>
      <div>test content</div>
    </NavigationBar>,
  );

  expect(screen.getByRole("navigation")).toHaveTextContent("test content");
  expect(screen.getByText("test content")).toBeVisible();
});

test("does not render children when `isLoading` is true", () => {
  render(
    <NavigationBar isLoading>
      <div>test content</div>
    </NavigationBar>,
  );

  expect(screen.getByRole("navigation")).not.toHaveTextContent("test content");
});

test("renders with 'data-component' set to 'navigation-bar'", () => {
  render(
    <NavigationBar>
      <div>test content</div>
    </NavigationBar>,
  );

  expect(screen.getByRole("navigation")).toHaveAttribute(
    "data-component",
    "navigation-bar",
  );
});

test("renders with provided data- attributes", () => {
  render(
    <NavigationBar data-element="bar" data-role="baz">
      <div>test content</div>
    </NavigationBar>,
  );

  expect(screen.getByRole("navigation")).toHaveAttribute("data-element", "bar");
  expect(screen.getByRole("navigation")).toHaveAttribute("data-role", "baz");
});

test("renders with provided `aria-label` as its accessible name", () => {
  render(
    <NavigationBar ariaLabel="test label">
      <div>test content</div>
    </NavigationBar>,
  );

  expect(screen.getByRole("navigation")).toHaveAccessibleName("test label");
});

test("renders `aria-label` as its accessible name when isGlobal is set and ariaLabel is set", () => {
  render(
    <NavigationBar ariaLabel="test label" isGlobal>
      <div>test content</div>
    </NavigationBar>,
  );

  expect(screen.getByRole("navigation")).toHaveAccessibleName("test label");
});

test("renders `aria-label` with default `Global Header` value when isGlobal is set and aria label is not set", () => {
  render(
    <NavigationBar isGlobal>
      <div>test content</div>
    </NavigationBar>,
  );

  expect(screen.getByRole("navigation")).toHaveAccessibleName("Global Header");
});

// coverage
test("renders with correct styles when `navigationType` is 'light'", () => {
  render(
    <NavigationBar navigationType="light">
      <div>test content</div>
    </NavigationBar>,
  );

  expect(screen.getByRole("navigation")).toHaveStyleRule(
    "background-color",
    "var(--colorsComponentsMenuSpringStandard500)",
  );
  expect(screen.getByRole("navigation")).toHaveStyleRule(
    "border-bottom",
    "var(--borderWidth100) solid var(--colorsComponentsMenuSpringChildAlt500)",
  );
});

// coverage
test("renders with correct styles when `navigationType` is 'dark'", () => {
  render(
    <NavigationBar navigationType="dark">
      <div>test content</div>
    </NavigationBar>,
  );

  expect(screen.getByRole("navigation")).toHaveStyleRule(
    "background-color",
    "var(--colorsComponentsMenuAutumnStandard500)",
  );
  expect(screen.getByRole("navigation")).toHaveStyleRule(
    "color",
    "var(--colorsComponentsMenuYang100)",
  );
});

// coverage
test("renders with correct styles when `navigationType` is 'black'", () => {
  render(
    <NavigationBar navigationType="black">
      <div>test content</div>
    </NavigationBar>,
  );

  expect(screen.getByRole("navigation")).toHaveStyleRule(
    "background-color",
    "var(--colorsComponentsMenuWinterStandard500)",
  );
  expect(screen.getByRole("navigation")).toHaveStyleRule(
    "color",
    "var(--colorsComponentsMenuYang100)",
  );
});

// coverage
test("renders with correct styles when `navigationType` is 'white'", () => {
  render(
    <NavigationBar navigationType="white">
      <div>test content</div>
    </NavigationBar>,
  );

  expect(screen.getByRole("navigation")).toHaveStyleRule(
    "background-color",
    "var(--colorsComponentsMenuSummerStandard500)",
  );
  expect(screen.getByRole("navigation")).toHaveStyleRule(
    "border-bottom",
    "var(--borderWidth100) solid var(--colorsComponentsMenuSummerChildAlt500)",
  );
});

// coverage
test("renders with correct styles when `position` is 'fixed' and `orientation` is 'top'", () => {
  render(
    <NavigationBar position="fixed" orientation="top">
      <div>test content</div>
    </NavigationBar>,
  );

  expect(screen.getByRole("navigation")).toHaveStyle({
    position: "fixed",
    top: "0px",
    boxSizing: "border-box",
    width: "100%",
  });
});

testStyledSystemPadding(
  (props) => <NavigationBar {...props}>test content</NavigationBar>,
  () => screen.getByRole("navigation"),
  { modifier: "&&" },
);

testStyledSystemFlexBox(
  (props) => <NavigationBar {...props}>test content</NavigationBar>,
  () => screen.getByRole("navigation"),
);
