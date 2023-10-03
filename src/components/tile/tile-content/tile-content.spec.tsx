import React from "react";
import { render, screen } from "@testing-library/react";
import { PaddingProps } from "styled-system";
import TileContent from "./tile-content.component";
import {
  testStyledSystemHeight,
  testStyledSystemSpacing,
  testStyledSystemWidth,
} from "../../../__spec_helper__/test-utils";
import TileContext from "../__internal__/tile-context";
import { rootTagTestRtl } from "../../../__internal__/utils/helpers/tags/tags-specs";

describe("TileContent", () => {
  testStyledSystemSpacing((props) => (
    <TileContent {...props}>Test</TileContent>
  ));
  testStyledSystemWidth((props) => <TileContent {...props}>Test</TileContent>);
  testStyledSystemHeight((props) => <TileContent {...props}>Test</TileContent>);

  it("does not render when no children are passed", () => {
    render(<TileContent data-testid="tile-content" />);

    expect(screen.queryByTestId("tile-content")).not.toBeInTheDocument();
  });

  it("does not render when falsy children are passed", () => {
    render(<TileContent data-testid="tile-content">{null}</TileContent>);

    expect(screen.queryByTestId("tile-content")).not.toBeInTheDocument();
  });

  it("renders when children are passed", () => {
    render(<TileContent>Tile Content</TileContent>);

    expect(screen.getByText("Tile Content")).toBeInTheDocument();
  });

  it.each([
    [{}, "var(--spacing300)", undefined],
    [{ p: 2 }, "var(--spacing200)", undefined],
    [{ pl: 2, p: 1 }, "var(--spacing200)", "var(--spacing100)"],
    [{ pr: 2, p: 1 }, "var(--spacing100)", "var(--spacing200)"],
    [{ px: 2, p: 1 }, "var(--spacing200)", undefined],
  ] as [PaddingProps, string, string | undefined][])(
    "applies the expected padding values when %s passed and in horizontal orientation",
    (paddingPropsFromTile, leftValue, rightValue) => {
      render(
        <>
          <TileContext.Provider
            value={{ isHorizontal: true, paddingPropsFromTile }}
          >
            <TileContent>Tile Content 1</TileContent>
            <TileContent>Tile Content 2</TileContent>
            <TileContent>Tile Content 3</TileContent>
          </TileContext.Provider>
        </>
      );

      expect(screen.getByText("Tile Content 1")).toHaveStyle({
        "padding-left": "0px",
        "padding-right": rightValue || leftValue,
      });

      expect(screen.getByText("Tile Content 2")).toHaveStyle({
        "padding-left": leftValue,
        "padding-right": rightValue || leftValue,
      });

      expect(screen.getByText("Tile Content 3")).toHaveStyle({
        "padding-left": leftValue,
        "padding-right": "0px",
      });
    }
  );

  it.each([
    [{}, "var(--spacing300)", undefined],
    [{ p: 2 }, "var(--spacing200)", undefined],
    [{ pt: 2, p: 1 }, "var(--spacing200)", "var(--spacing100)"],
    [{ pb: 2, p: 1 }, "var(--spacing100)", "var(--spacing200)"],
    [{ py: 2, p: 1 }, "var(--spacing200)", undefined],
  ] as [PaddingProps, string, string | undefined][])(
    "applies the expected padding values when %s passed and in vertical orientation",
    (paddingPropsFromTile, topValue, bottomValue) => {
      render(
        <>
          <TileContext.Provider
            value={{ isHorizontal: false, paddingPropsFromTile }}
          >
            <TileContent>Tile Content 1</TileContent>
            <TileContent>Tile Content 2</TileContent>
            <TileContent>Tile Content 3</TileContent>
          </TileContext.Provider>
        </>
      );

      expect(screen.getByText("Tile Content 1")).toHaveStyle({
        "padding-top": "0px",
        "padding-bottom": bottomValue || topValue,
      });

      expect(screen.getByText("Tile Content 2")).toHaveStyle({
        "padding-top": topValue,
        "padding-bottom": bottomValue || topValue,
      });

      expect(screen.getByText("Tile Content 3")).toHaveStyle({
        "padding-top": topValue,
        "padding-bottom": "0px",
      });
    }
  );

  it("has proper data attributes applied", () => {
    render(
      <TileContent
        data-testid="tile-content"
        data-element="foo"
        data-role="bar"
      >
        Tile Content
      </TileContent>
    );
    const element = screen.getByText("Tile Content");
    rootTagTestRtl(element, "tile-content", "foo", "bar");
  });
});
