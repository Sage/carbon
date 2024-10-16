import React from "react";
import { render, screen } from "@testing-library/react";
import TileContent from "./tile-content.component";
import {
  testStyledSystemHeightRTL,
  testStyledSystemSpacingRTL,
  testStyledSystemWidthRTL,
} from "../../../__spec_helper__/__internal__/test-utils";

testStyledSystemSpacingRTL(
  (props) => (
    <TileContent data-role="tile-content" {...props}>
      Test
    </TileContent>
  ),
  () => screen.getByTestId("tile-content")
);
testStyledSystemWidthRTL(
  (props) => (
    <TileContent data-role="tile-content" {...props}>
      Test
    </TileContent>
  ),
  () => screen.getByTestId("tile-content")
);
testStyledSystemHeightRTL(
  (props) => (
    <TileContent data-role="tile-content" {...props}>
      Test
    </TileContent>
  ),
  () => screen.getByTestId("tile-content")
);

test("does not render when no children are passed", () => {
  render(<TileContent data-role="tile-content" />);

  expect(screen.queryByTestId("tile-content")).not.toBeInTheDocument();
});

test("does not render when falsy children are passed", () => {
  render(<TileContent data-role="tile-content">{null}</TileContent>);

  expect(screen.queryByTestId("tile-content")).not.toBeInTheDocument();
});

test("renders when children are passed", () => {
  render(<TileContent>Tile Content</TileContent>);

  expect(screen.getByText("Tile Content")).toBeVisible();
});

test("has proper data attributes applied", () => {
  render(
    <TileContent data-element="foo" data-role="bar">
      Tile Content
    </TileContent>
  );
  const element = screen.getByText("Tile Content");
  expect(element).toHaveAttribute("data-component", "tile-content");
  expect(element).toHaveAttribute("data-element", "foo");
  expect(element).toHaveAttribute("data-role", "bar");
});
