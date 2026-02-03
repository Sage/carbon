import React from "react";
import { screen, render } from "@testing-library/react";
import Breadcrumbs from "./breadcrumbs.component";
import Crumb from "./crumb/crumb.component";
import { testStyledSystemSpacing } from "../../__spec_helper__/__internal__/test-utils";
import Logger from "../../__internal__/utils/logger";

test("logs deprecation warning when using isDarkBackground prop", () => {
  const loggerSpy = jest
    .spyOn(Logger, "deprecate")
    .mockImplementation(() => {});

  render(
    <Breadcrumbs isDarkBackground>
      <Crumb href="#">Breadcrumb 1</Crumb>
    </Breadcrumbs>,
  );

  expect(loggerSpy).toHaveBeenCalledWith(
    "The 'isDarkBackground' prop in Breadcrumbs is deprecated and will soon be removed. Please use the 'inverse' prop instead.",
  );

  loggerSpy.mockRestore();
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

test("renders with provided aria-label", () => {
  render(
    <Breadcrumbs aria-label="Custom aria label">
      <Crumb href="#">Breadcrumb 1</Crumb>
    </Breadcrumbs>,
  );

  expect(screen.getByRole("navigation")).toHaveAccessibleName(
    "Custom aria label",
  );
});

// coverage
test("renders children with expected colour when inverse is true", () => {
  render(
    <Breadcrumbs inverse>
      <Crumb href="#">Breadcrumb 1</Crumb>
      <Crumb href="#">Breadcrumb 2</Crumb>
      <Crumb href="#" isCurrent data-role="current-crumb">
        Breadcrumb 3
      </Crumb>
    </Breadcrumbs>,
  );

  const currentCrumb = screen.getByTestId("current-crumb");

  expect(currentCrumb).toHaveStyleRule(
    "color",
    "var(--container-standard-inverse-txt-alt)",
    {
      modifier: "a",
    },
  );
  expect(screen.getAllByTestId("crumb-divider")[0]).toHaveStyleRule(
    "color",
    "var(--container-standard-inverse-txt-alt)",
    { modifier: "::after" },
  );
});
