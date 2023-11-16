import React from "react";
import { render, screen } from "@testing-library/react";
import { mount } from "enzyme";
import { Gap } from "../../box/box.component";
import FlowTileContainer from "./flow-tile-container.component";
import {
  assertStyleMatch,
  getGapValue,
} from "../../../__spec_helper__/test-utils";

const GAP_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;

describe("FlowTileContainer", () => {
  it.each<Gap>([...GAP_VALUES, "20px", "20%"])(
    "has styles applied when column-gap is set to %s",
    (gapValue) => {
      const wrapper = mount(
        <FlowTileContainer columnGap={gapValue}>content</FlowTileContainer>
      );
      const columnGap = getGapValue(gapValue);
      assertStyleMatch({ columnGap }, wrapper);
    }
  );

  it("does not render when falsy children are passed", () => {
    render(
      <FlowTileContainer data-testid="responsive-tile-container">
        {null}
      </FlowTileContainer>
    );

    expect(
      screen.queryByTestId("responsive-tile-container")
    ).not.toBeInTheDocument();
  });

  it("renders when children are passed", () => {
    render(<FlowTileContainer>Tile Content</FlowTileContainer>);

    expect(screen.getByText("Tile Content")).toBeInTheDocument();
  });
});
