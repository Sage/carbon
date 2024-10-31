import React from "react";
import { render, screen } from "@testing-library/react";
import Page from "./page.component";
import { testStyledSystemPaddingRTL } from "../../../__spec_helper__/__internal__/test-utils";

testStyledSystemPaddingRTL(
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
