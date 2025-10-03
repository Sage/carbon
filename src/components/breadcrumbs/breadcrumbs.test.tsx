import React from "react";
import { screen, render } from "@testing-library/react";
import Breadcrumbs from "./breadcrumbs.component";
import Crumb from "./crumb/crumb.component";
import {
  testStyledSystemSpacing,
  assertDeprecationWarning,
} from "../../__spec_helper__/__internal__/test-utils";

test("displays a deprecation warning if `isDarkBackground` is used", () => {
  assertDeprecationWarning({
    component: (
      <Breadcrumbs isDarkBackground>
        <Crumb href="#">Breadcrumb 1</Crumb>
      </Breadcrumbs>
    ),
    deprecationMessage:
      "The `isDarkBackground` prop in the Breadcrumbs component is deprecated and will soon be removed. Future versions of the component will use `inverse` instead.",
  });
});

testStyledSystemSpacing(
  (props) => (
    <Breadcrumbs {...props}>
      <Crumb href="#">Breadcrumb</Crumb>
    </Breadcrumbs>
  ),
  () => screen.getByRole("navigation"),
);

test("renders children as expected", () => {
  render(
    <Breadcrumbs>
      <Crumb href="#">Breadcrumb 1</Crumb>
      <Crumb href="#">Breadcrumb 2</Crumb>
      <Crumb href="#" isCurrent>
        Breadcrumb 3
      </Crumb>
    </Breadcrumbs>,
  );

  expect(screen.getByRole("link", { name: "Breadcrumb 1" })).toBeVisible();
  expect(screen.getByRole("link", { name: "Breadcrumb 2" })).toBeVisible();
  expect(screen.getByText("Breadcrumb 3")).toBeVisible();
});

test("renders with provided data- attributes", () => {
  render(
    <Breadcrumbs data-element="bar" data-role="baz">
      <Crumb href="#">Breadcrumb 1</Crumb>
    </Breadcrumbs>,
  );

  expect(screen.getByTestId("baz")).toHaveAttribute("data-element", "bar");
});

// coverage
test("renders children with expected colour when isDarkBackground is false", () => {
  render(
    <Breadcrumbs>
      <Crumb href="#">Breadcrumb 1</Crumb>
      <Crumb href="#">Breadcrumb 2</Crumb>
      <Crumb href="#" isCurrent data-role="current-crumb">
        Breadcrumb 3
      </Crumb>
    </Breadcrumbs>,
  );

  const currentCrumb = screen.getByTestId("current-crumb");

  expect(currentCrumb).toHaveStyleRule("color", "var(--colorsUtilityYin090)", {
    modifier: "a",
  });
  expect(screen.getAllByTestId("crumb-divider")[0]).toHaveStyleRule(
    "color",
    "var(--colorsUtilityYin055)",
    { modifier: "::after" },
  );
});

// coverage
test("renders children with expected colour when isDarkBackground is true", () => {
  render(
    <Breadcrumbs isDarkBackground>
      <Crumb href="#">Breadcrumb 1</Crumb>
      <Crumb href="#">Breadcrumb 2</Crumb>
      <Crumb href="#" isCurrent data-role="current-crumb">
        Breadcrumb 3
      </Crumb>
    </Breadcrumbs>,
  );

  const currentCrumb = screen.getByTestId("current-crumb");

  expect(currentCrumb).toHaveStyleRule("color", "var(--colorsUtilityYang100)", {
    modifier: "a",
  });
  expect(screen.getAllByTestId("crumb-divider")[0]).toHaveStyleRule(
    "color",
    "var(--colorsUtilityYang100)",
    { modifier: "::after" },
  );
});
