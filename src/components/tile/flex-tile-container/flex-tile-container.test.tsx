import React from "react";
import { render, screen } from "@testing-library/react";
import {
  getGapValue,
  GAP_VALUES,
  type Gap,
} from "../../../style/utils/box-gap";
import FlexTileContainer from "./flex-tile-container.component";

test.each<Gap>([...GAP_VALUES, "20px", "20%"])(
  "should render with correct column gap when columnGap prop is %s",
  (gapValue) => {
    render(<FlexTileContainer columnGap={gapValue}>content</FlexTileContainer>);
    expect(screen.getByText("content")).toHaveStyle({
      columnGap: getGapValue(gapValue),
    });
  },
);

test("should not render when falsy children are passed", () => {
  render(
    <FlexTileContainer data-role="flex-tile-container">
      {null}
    </FlexTileContainer>,
  );

  expect(screen.queryByTestId("flex-tile-container")).not.toBeInTheDocument();
});

test("should render when children are passed", () => {
  render(<FlexTileContainer>Tile Content</FlexTileContainer>);

  expect(screen.getByText("Tile Content")).toBeVisible();
});
