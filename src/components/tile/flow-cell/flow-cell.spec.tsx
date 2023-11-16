import React from "react";
import { render, screen } from "@testing-library/react";
import FlowCell from "./flow-cell.component";
import {
  testStyledSystemFlexBasis,
  testStyledSystemFlexGrow,
  testStyledSystemJustifyContent,
  testStyledSystemPadding,
} from "../../../__spec_helper__/test-utils";
import { rootTagTestRtl } from "../../../__internal__/utils/helpers/tags/tags-specs";

describe("FlowCell", () => {
  testStyledSystemPadding((props) => <FlowCell {...props}>Test</FlowCell>);
  testStyledSystemFlexBasis((props) => <FlowCell {...props}>Test</FlowCell>);
  testStyledSystemFlexGrow((props) => <FlowCell {...props}>Test</FlowCell>);
  testStyledSystemJustifyContent((props) => (
    <FlowCell {...props}>Test</FlowCell>
  ));

  it("does not render when falsy children are passed", () => {
    render(<FlowCell data-testid="responsive-cell">{null}</FlowCell>);

    expect(screen.queryByTestId("responsive-cell")).not.toBeInTheDocument();
  });

  it("renders when children are passed", () => {
    render(<FlowCell>Cell Content</FlowCell>);

    expect(screen.getByText("Cell Content")).toBeInTheDocument();
  });

  it("has proper data attributes applied", () => {
    render(
      <FlowCell
        data-testid="responsive-cell"
        data-element="foo"
        data-role="bar"
      >
        Cell Content
      </FlowCell>
    );
    const element = screen.getByText("Cell Content");
    rootTagTestRtl(element, "responsive-cell", "foo", "bar");
  });
});
