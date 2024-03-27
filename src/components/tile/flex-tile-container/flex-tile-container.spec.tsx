import React from "react";
import { render, screen } from "@testing-library/react";
import { GAP_VALUES, Gap, getGapValue } from "style/utils/box-gap";
import { mount } from "enzyme";
import FlexTileContainer from "./flex-tile-container.component";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";

describe("FlexTileContainer", () => {
  it.each<Gap>([...GAP_VALUES, "20px", "20%"])(
    "has styles applied when column-gap is set to %s",
    (gapValue) => {
      const wrapper = mount(
        <FlexTileContainer columnGap={gapValue}>content</FlexTileContainer>
      );
      const columnGap = getGapValue(gapValue);
      assertStyleMatch({ columnGap }, wrapper);
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

    expect(screen.getByText("Tile Content")).toBeInTheDocument();
  });
});
