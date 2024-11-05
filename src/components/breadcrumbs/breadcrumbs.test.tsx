import React from "react";
import { screen, render } from "@testing-library/react";
import Breadcrumbs from "./breadcrumbs.component";
import Crumb from "./crumb/crumb.component";
import { testStyledSystemSpacing } from "../../__spec_helper__/__internal__/test-utils";

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
