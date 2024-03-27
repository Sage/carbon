import React from "react";
import { render, screen } from "@testing-library/react";
import FlexTileCell from "./flex-tile-cell.component";
import {
  testStyledSystemFlexBox,
  testStyledSystemPadding,
} from "../../../__spec_helper__/test-utils";
import { rootTagTestRtl } from "../../../__internal__/utils/helpers/tags/tags-specs";
import FlexTileDivider from "../flex-tile-divider";

describe("FlexTileCell", () => {
  testStyledSystemPadding((props) => (
    <FlexTileCell {...props}>Test</FlexTileCell>
  ));
  testStyledSystemFlexBox((props) => (
    <FlexTileCell {...props}>Test</FlexTileCell>
  ));

  it("does not render when falsy children are passed", () => {
    render(<FlexTileCell data-role="flex-tile-cell">{null}</FlexTileCell>);

    expect(screen.queryByTestId("flex-tile-cell")).not.toBeInTheDocument();
  });

  it("renders when children are passed", () => {
    render(<FlexTileCell>Cell Content</FlexTileCell>);

    expect(screen.getByText("Cell Content")).toBeInTheDocument();
  });

  it("has proper data attributes applied", () => {
    render(
      <FlexTileCell data-element="foo" data-role="bar">
        <FlexTileDivider />
        Cell Content
      </FlexTileCell>
    );
    const element = screen.getByText("Cell Content");
    rootTagTestRtl(element, "flex-tile-cell", "foo", "bar");
  });
});
