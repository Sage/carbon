import React from "react";
import { render, screen } from "@testing-library/react";
import { GAP_VALUES, Gap, getGapValue } from "style/utils/box-gap";
import FlexTileContainer from "./flex-tile-container.component";

describe("FlexTileContainer", () => {
  it.each<Gap>([...GAP_VALUES, "20px", "20%"])(
    "renders with correct column gap when columnGap prop is %s",
    (gapValue) => {
      render(
        <FlexTileContainer columnGap={gapValue}>content</FlexTileContainer>
      );
      expect(screen.getByText("content")).toHaveStyle({
        columnGap: getGapValue(gapValue),
      });
    }
  );

  it("does not render when falsy children are passed", () => {
    render(
      <FlexTileContainer data-role="flex-tile-container">
        {null}
      </FlexTileContainer>
    );

    expect(screen.queryByTestId("flex-tile-container")).not.toBeInTheDocument();
  });

  it("renders when children are passed", () => {
    render(<FlexTileContainer>Tile Content</FlexTileContainer>);

    expect(screen.getByText("Tile Content")).toBeVisible();
  });
});
