import React from "react";
import { render, screen } from "@testing-library/react";
import FlexTileCell from "./flex-tile-cell.component";
import {
  testStyledSystemFlexBox,
  testStyledSystemPaddingRTL,
} from "../../../__spec_helper__/__internal__/test-utils";
import FlexTileDivider from "../flex-tile-divider";

describe("FlexTileCell", () => {
  testStyledSystemPaddingRTL(
    (props) => <FlexTileCell {...props}>Test</FlexTileCell>,
    () => screen.getByText("Test"),
  );
  testStyledSystemFlexBox(
    (props) => <FlexTileCell {...props}>Test</FlexTileCell>,
    () => screen.getByText("Test"),
  );

  it("does not render when falsy children are passed", () => {
    render(<FlexTileCell data-role="flex-tile-cell">{null}</FlexTileCell>);

    expect(screen.queryByTestId("flex-tile-cell")).not.toBeInTheDocument();
  });

  it("renders when children are passed", () => {
    render(<FlexTileCell>Cell Content</FlexTileCell>);

    expect(screen.getByText("Cell Content")).toBeVisible();
  });

  it("has proper data attributes applied", () => {
    render(
      <FlexTileCell data-element="foo" data-role="bar">
        <FlexTileDivider />
        Cell Content
      </FlexTileCell>,
    );
    const element = screen.getByText("Cell Content");
    expect(element).toHaveAttribute("data-component", "flex-tile-cell");
    expect(element).toHaveAttribute("data-element", "foo");
    expect(element).toHaveAttribute("data-role", "bar");
  });
});
