import React from "react";
import { render, screen } from "@testing-library/react";
import { Tile, TileContent } from ".";
import { TileProps } from "./tile.component";
import {
  testStyledSystemSpacing,
  testStyledSystemWidth,
  testStyledSystemHeight,
} from "../../__spec_helper__/__internal__/test-utils";
import { TILE_HIGHLIGHT_VARIANTS } from "./tile.config";

testStyledSystemSpacing(
  (props) => <Tile data-role="tile" {...props} />,
  () => screen.getByTestId("tile"),
  { p: 3 },
);

testStyledSystemWidth(
  (props) => (
    <Tile data-role="tile" {...props}>
      Test
    </Tile>
  ),
  () => screen.getByTestId("tile"),
);

testStyledSystemHeight(
  (props) => <Tile data-role="tile" {...props} />,
  () => screen.getByTestId("tile"),
);

test("renders only one TileContent when a child element returns null", () => {
  const children = [
    <TileContent key="one" data-role="tile-content">
      Child 1
    </TileContent>,
    <TileContent key="two" data-role="tile-content">
      {null}
    </TileContent>,
  ];

  render(<Tile>{children}</Tile>);

  const tileContents = screen.queryAllByTestId("tile-content");

  expect(tileContents.length).toBe(1);
});

test("has proper data attributes applied to elements", () => {
  render(
    <Tile data-element="foo" data-role="bar">
      content
    </Tile>,
  );

  const styledTile = screen.getByTestId("bar");
  expect(styledTile).toHaveAttribute("data-element", "foo");
  expect(styledTile).toHaveAttribute("data-role", "bar");
});

test.each(TILE_HIGHLIGHT_VARIANTS)(
  "should render with the highlight element when `highlightVariant` is passed %s",
  (highlightVariant) => {
    render(<Tile highlightVariant={highlightVariant} />);
    const highlightElement = screen.getByTestId(
      `tile-${highlightVariant}-highlight`,
    );

    expect(highlightElement).toBeVisible();
    expect(highlightElement).toHaveAttribute("aria-hidden");
  },
);

/* tests for coverage */
test.each<[TileProps["borderVariant"], string]>([
  ["selected", "colorsUtilityYin100"],
  ["positive", "colorsSemanticPositive500"],
  ["negative", "colorsSemanticNegative500"],
  ["caution", "colorsSemanticCaution500"],
  ["info", "colorsSemanticInfo500"],
])(
  "renders with expected border when borderVariant is set to %s",
  (borderVariant, borderVariantToken) => {
    render(
      <Tile borderVariant={borderVariant} data-role="tile">
        <TileContent>Child 1</TileContent>
        <TileContent>Child 2</TileContent>
      </Tile>,
    );

    const tileElement = screen.getByTestId("tile");

    expect(tileElement).toHaveStyleRule(
      "border",
      `var(--borderWidth100) solid var(--${borderVariantToken})`,
    );
  },
);

test('renders with expected background and border styles when variant is "active"', () => {
  render(
    <Tile variant="active" data-role="tile">
      <TileContent>Child 1</TileContent>
      <TileContent>Child 2</TileContent>
    </Tile>,
  );

  const tileElement = screen.getByTestId("tile");

  expect(tileElement).toHaveStyle({
    backgroundColor: "var(--colorsActionMajor025)",
    border: "var(--borderWidth100) solid var(--colorsActionMajor500)",
  });
});

test('renders with expected background and border styles when variant is "grey"', () => {
  render(
    <Tile variant="grey" data-role="tile">
      <TileContent>Child 1</TileContent>
      <TileContent>Child 2</TileContent>
    </Tile>,
  );

  const tileElement = screen.getByTestId("tile");

  expect(tileElement).toHaveStyleRule(
    "background-color",
    "var(--colorsUtilityMajor025)",
  );
  expect(tileElement).toHaveStyleRule(
    "border",
    "var(--borderWidth100) solid var(--colorsUtilityMajor200)",
  );
});

test.each([
  ["default", "var(--borderRadius100)"],
  ["large", "var(--borderRadius200)"],
  ["small", "var(--borderRadius050)"],
] as const)(
  "renders with the expected border radius when roundness is %s",
  (roundness, expectedBorderRadius) => {
    render(
      <Tile roundness={roundness} data-role="tile">
        <TileContent>Child 1</TileContent>
        <TileContent>Child 2</TileContent>
      </Tile>,
    );

    const tileElement = screen.getByTestId("tile");
    expect(tileElement).toHaveStyleRule("border-radius", expectedBorderRadius);
  },
);

test("sets the correct flex-direction on the main wrapper when the orientation is horizontal", () => {
  render(
    <Tile orientation="horizontal" data-role="tile">
      <TileContent>Child 1</TileContent>
      <TileContent>Child 2</TileContent>
    </Tile>,
  );

  const tileElement = screen.getByTestId("tile");

  expect(tileElement).toHaveStyle("flex-direction: row");
});

test("sets the correct flex-direction on the main wrapper when the orientation is vertical", () => {
  render(
    <Tile orientation="vertical" data-role="tile">
      <TileContent>Child 1</TileContent>
      <TileContent>Child 2</TileContent>
    </Tile>,
  );

  const tileElement = screen.getByTestId("tile");

  expect(tileElement).toHaveStyle("flex-direction: column");
});

test('renders a transparent background when variant prop is "transparent"', () => {
  render(
    <Tile variant="transparent" data-role="tile">
      <TileContent>Child 1</TileContent>
      <TileContent>Child 2</TileContent>
    </Tile>,
  );

  const tileElement = screen.getByTestId("tile");

  expect(tileElement).toHaveStyle("background-color: transparent");
});
