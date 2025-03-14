import React from "react";
import { screen } from "@testing-library/react";
import {
  render,
  testStyledSystemPadding,
} from "../../../__spec_helper__/__internal__/test-utils";

import Page from "./page.component";

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
);

test("it has default padding when no padding props are passed", () => {
  render(
    <Page title="My Title" data-element="carbon-page-content">
      My Content
    </Page>,
  );
  const pageContent = screen.getByTestId("page-content");

  expect(pageContent).toHaveStyle("padding: 34px 40px;");
});

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
