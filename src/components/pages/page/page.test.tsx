import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "./page.component";
import { testStyledSystemPadding } from "../../../__spec_helper__/__internal__/test-utils";

testStyledSystemPadding(
  (props) => (
    <Page
      transitionName={() => "fade"}
      title="My Title"
      data-element="carbon-page-content"
      {...props}
    >
      My Content
    </Page>
  ),
  () => screen.getByTestId("page-content"),
  { p: "30px 40px" },
);

test("renders both heading and children", () => {
  render(<Page title="My Title">My Content</Page>);
  expect(screen.getByText("My Title")).toBeInTheDocument();
  expect(screen.getByText("My Content")).toBeInTheDocument();
});

test("renders with provided data- attributes", () => {
  render(
    <Page data-role="foo" data-element="bar">
      Content
    </Page>,
  );
  expect(screen.getByTestId("foo")).toHaveAttribute("data-element", "bar");
});
