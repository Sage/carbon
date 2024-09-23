import React from "react";
import { render, screen } from "@testing-library/react";
import { StyledPageContent } from "./page.style";
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
  { p: "30px 40px" },
  (wrapper) => wrapper.find(StyledPageContent)
);

test("renders both heading and children", () => {
  render(<Page title="My Title">My Content</Page>);
  expect(screen.getByText("My Title")).toBeInTheDocument();
  expect(screen.getByText("My Content")).toBeInTheDocument();
});
