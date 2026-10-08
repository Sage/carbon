import React from "react";
import { render, screen } from "@testing-library/react";
import TileContent from "./tile-content.component";
import Tile from "../tile.component";
import {
  testStyledSystemHeight,
  testStyledSystemSpacing,
  testStyledSystemWidth,
} from "../../../__spec_helper__/__internal__/test-utils";

testStyledSystemSpacing(
  (props) => (
    <Tile>
      <TileContent data-role="tile-content" {...props}>
        Test
      </TileContent>
    </Tile>
  ),
  () => screen.getByTestId("tile-content"),
);
testStyledSystemWidth(
  (props) => (
    <Tile>
      <TileContent data-role="tile-content" {...props}>
        Test
      </TileContent>
    </Tile>
  ),
  () => screen.getByTestId("tile-content"),
);
testStyledSystemHeight(
  (props) => (
    <Tile>
      <TileContent data-role="tile-content" {...props}>
        Test
      </TileContent>
    </Tile>
  ),
  () => screen.getByTestId("tile-content"),
);

test("does not render when no children are passed", () => {
  render(
    <Tile>
      <TileContent data-role="tile-content" />
    </Tile>,
  );

  expect(screen.queryByTestId("tile-content")).not.toBeInTheDocument();
});

test("does not render when falsy children are passed", () => {
  render(
    <Tile>
      <TileContent data-role="tile-content">{null}</TileContent>
    </Tile>,
  );

  expect(screen.queryByTestId("tile-content")).not.toBeInTheDocument();
});

test("renders when children are passed", () => {
  render(
    <Tile>
      <TileContent>Tile Content</TileContent>
    </Tile>,
  );

  expect(screen.getByText("Tile Content")).toBeVisible();
});

test("has proper data attributes applied", () => {
  render(
    <Tile>
      <TileContent data-element="foo" data-role="bar">
        Tile Content
      </TileContent>
    </Tile>,
  );
  const element = screen.getByText("Tile Content");
  expect(element).toHaveAttribute("data-component", "tile-content");
  expect(element).toHaveAttribute("data-element", "foo");
  expect(element).toHaveAttribute("data-role", "bar");
});
