import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../../__spec_helper__/__internal__/test-utils";

import GlobalHeader from "./global-header.component";

test("should be visible with correct accessible name", () => {
  render(<GlobalHeader>foobar</GlobalHeader>);

  const globalHeader = screen.getByRole("navigation");

  expect(globalHeader).toBeVisible();
  expect(globalHeader).toHaveAccessibleName("Global Header");
});

test("should render with 'data-component' set to 'global-header'", () => {
  render(<GlobalHeader>foobar</GlobalHeader>);

  expect(screen.getByRole("navigation")).toHaveAttribute(
    "data-component",
    "global-header",
  );
});

test("should render with provided data- attributes", () => {
  render(
    <GlobalHeader data-element="bar" data-role="baz">
      foobar
    </GlobalHeader>,
  );

  expect(screen.getByRole("navigation")).toHaveAttribute("data-element", "bar");
  expect(screen.getByRole("navigation")).toHaveAttribute("data-role", "baz");
});

test("should have correct z-index", () => {
  render(<GlobalHeader>foobar</GlobalHeader>);

  expect(screen.getByRole("navigation")).toHaveStyle("z-index: 2999");
});

test("when logo prop is passed and logo is an img element, logo is visible with correct alt text", () => {
  const logo = <img src="foobar" alt="Carbon logo" />;
  render(<GlobalHeader logo={logo}>foobar</GlobalHeader>);

  expect(screen.getByRole("img")).toHaveAccessibleName("Carbon logo");
});

test("when logo prop is passed and logo is a svg element, logo is visible with correct accessible name", () => {
  const logo = <svg aria-label="Carbon logo" data-role="carbon-logo" />;
  render(<GlobalHeader logo={logo}>foobar</GlobalHeader>);

  expect(screen.getByTestId("carbon-logo")).toHaveAccessibleName("Carbon logo");
});
