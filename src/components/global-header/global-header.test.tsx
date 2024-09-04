import { render, screen } from "@testing-library/react";
import React from "react";
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
    "global-header"
  );
});

test("should have correct z-index", () => {
  render(<GlobalHeader>foobar</GlobalHeader>);

  expect(screen.getByRole("navigation")).toHaveStyle("z-index: 2999");
});

describe("when logo prop is passed", () => {
  it("and logo is an img element, logo is visible with correct alt text", () => {
    const logo = <img src="foobar" alt="Carbon logo" />;
    render(<GlobalHeader logo={logo}>foobar</GlobalHeader>);

    expect(screen.getByRole("img")).toHaveAccessibleName("Carbon logo");
  });

  it("and logo is a svg element, logo is visible with correct accessible name", () => {
    const logo = <svg aria-label="Carbon logo" data-role="carbon-logo" />;
    render(<GlobalHeader logo={logo}>foobar</GlobalHeader>);

    expect(screen.getByTestId("carbon-logo")).toHaveAccessibleName(
      "Carbon logo"
    );
  });
});
