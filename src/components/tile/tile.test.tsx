import React from "react";
import { render, screen } from "@testing-library/react";
import { Tile, TileContent } from ".";
import { TileProps } from "./tile.component";
import {
  testStyledSystemSpacing,
  testStyledSystemWidth,
  testStyledSystemHeight,
} from "../../__spec_helper__/__internal__/test-utils";

testStyledSystemSpacing(
  (props) => <Tile data-role="tile" {...props} />,
  () => screen.getByTestId("tile"),
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

test("should render the default padding when no padding props are passed", () => {
  render(<Tile data-role="tile">Foo</Tile>);

  expect(screen.getByTestId("tile")).toHaveStyleRule(
    "padding",
    "var(--global-space-comp-xl)",
  );
});

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

test.each<[TileProps["highlightVariant"], string]>([
  ["success", "var(--container-standard-priority-bg-positive)"],
  ["neutral", "var(--container-standard-priority-bg-neutral)"],
  ["error", "var(--container-standard-priority-bg-negative)"],
  ["warning", "var(--container-standard-priority-bg-caution)"],
  ["info", "var(--container-standard-priority-bg-info)"],
  ["important", "var(--container-standard-priority-bg-prio)"],
  ["gradient", "linear-gradient(to bottom,#00D639 0%,#00D6DE 40%,#9D60FF 90%)"],
])(
  "should render with the highlight element when `highlightVariant` is passed %s",
  (highlightVariant, backgroundColor) => {
    render(<Tile highlightVariant={highlightVariant} data-role="tile" />);

    const highlightElement = screen.getByTestId("tile-keyline");

    expect(highlightElement).toHaveStyleRule("background", backgroundColor);

    expect(highlightElement).toBeVisible();
  },
);

test.each<[TileProps["statusKeyline"], string]>([
  ["blue", "var(--container-standard-priority-bg-info)"],
  ["green", "var(--container-standard-priority-bg-positive)"],
  ["orange", "var(--container-standard-priority-bg-caution)"],
  ["red", "var(--container-standard-priority-bg-negative)"],
  ["neutral", "var(--container-standard-priority-bg-neutral)"],
  ["purple", "var(--container-standard-priority-bg-prio)"],
  ["ai", "linear-gradient(to bottom,#00D639 0%,#00D6DE 40%,#9D60FF 90%)"],
])(
  "should render with the highlight element when `statusKeyline` is passed %s",
  (statusKeyline, backgroundColor) => {
    render(<Tile statusKeyline={statusKeyline} data-role="tile" />);

    const highlightElement = screen.getByTestId("tile-keyline");

    expect(highlightElement).toHaveStyleRule("background", backgroundColor);

    expect(highlightElement).toBeVisible();
  },
);

test.each<[TileProps["statusKeyline"], string]>([
  ["blue", "var(--container-standard-priority-inverse-bg-info)"],
  ["green", "var(--container-standard-priority-inverse-bg-positive)"],
  ["orange", "var(--container-standard-priority-inverse-bg-caution)"],
  ["red", "var(--container-standard-priority-inverse-bg-negative)"],
  ["neutral", "var(--container-standard-priority-inverse-bg-neutral)"],
  ["purple", "var(--container-standard-priority-inverse-bg-prio)"],
  ["ai", "linear-gradient(to bottom,#00D639 0%,#00D6DE 40%,#9D60FF 90%)"],
])(
  "should render with the inverse highlight element when `statusKeyline` and `inverse` are passed %s",
  (statusKeyline, backgroundColor) => {
    render(<Tile statusKeyline={statusKeyline} inverse data-role="tile" />);

    const highlightElement = screen.getByTestId("tile-keyline");

    expect(highlightElement).toHaveStyleRule("background", backgroundColor);

    expect(highlightElement).toBeVisible();
  },
);

/* tests for coverage */
test('renders with expected background and border styles when variant is "active"', () => {
  render(
    <Tile variant="active" data-role="tile" outline>
      <TileContent>Child 1</TileContent>
      <TileContent>Child 2</TileContent>
    </Tile>,
  );

  const tileElement = screen.getByTestId("tile");

  expect(tileElement).toHaveStyleRule(
    "background-color",
    "var(--message-contextual-success-bg-alt)",
  );
  expect(tileElement).toHaveStyleRule(
    "border",
    "var(--global-borderwidth-xs) solid var(--message-contextual-success-border-default)",
  );
});

test('renders with expected background and border styles when variant is "grey"', () => {
  render(
    <Tile variant="grey" data-role="tile" outline>
      <TileContent>Child 1</TileContent>
      <TileContent>Child 2</TileContent>
    </Tile>,
  );

  const tileElement = screen.getByTestId("tile");

  expect(tileElement).toHaveStyleRule(
    "background-color",
    "var(--container-standard-bg-alt)",
  );
  expect(tileElement).toHaveStyleRule(
    "border",
    "var(--global-borderwidth-xs) solid var(--container-standard-border-default)",
  );
});

test('renders with expected background and border styles when variant is "alt"', () => {
  render(
    <Tile variant="alt" data-role="tile" outline>
      <TileContent>Child 1</TileContent>
      <TileContent>Child 2</TileContent>
    </Tile>,
  );

  const tileElement = screen.getByTestId("tile");

  expect(tileElement).toHaveStyleRule(
    "background-color",
    "var(--container-standard-bg-alt)",
  );
  expect(tileElement).toHaveStyleRule(
    "border",
    "var(--global-borderwidth-xs) solid var(--container-standard-border-default)",
  );
});

test('renders with expected background and border styles when `variant` is "alt" and `inverse` is "true"', () => {
  render(
    <Tile variant="alt" data-role="tile" outline inverse>
      <TileContent>Child 1</TileContent>
      <TileContent>Child 2</TileContent>
    </Tile>,
  );

  const tileElement = screen.getByTestId("tile");

  expect(tileElement).toHaveStyleRule(
    "background-color",
    "var(--container-standard-inverse-bg-alt)",
  );
  expect(tileElement).toHaveStyleRule(
    "border",
    "var(--global-borderwidth-xs) solid var(--container-standard-inverse-border-default)",
  );
});

test('renders with expected background and border styles when variant is "negative"', () => {
  render(
    <Tile variant="negative" data-role="tile" outline>
      <TileContent>Child 1</TileContent>
      <TileContent>Child 2</TileContent>
    </Tile>,
  );

  const tileElement = screen.getByTestId("tile");

  expect(tileElement).toHaveStyleRule(
    "background-color",
    "var(--message-contextual-error-bg-alt)",
  );
  expect(tileElement).toHaveStyleRule(
    "border",
    "var(--global-borderwidth-xs) solid var(--message-contextual-error-border-default)",
  );
});

test('renders with expected background and border styles when variant is "unavailable"', () => {
  render(
    <Tile variant="unavailable" data-role="tile" outline>
      <TileContent>Child 1</TileContent>
      <TileContent>Child 2</TileContent>
    </Tile>,
  );

  const tileElement = screen.getByTestId("tile");

  expect(tileElement).toHaveStyleRule(
    "background-color",
    "var(--container-action-bg-disabled)",
  );
  expect(tileElement).toHaveStyleRule(
    "border",
    "var(--global-borderwidth-xs) solid var(--container-action-border-inactive)",
  );
});

test.each([
  ["default", "var(--global-radius-container-2-xl)"],
  ["large", "var(--global-radius-container-l)"],
  ["small", "var(--global-radius-container-l)"],
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

test.each([
  ["curved", "var(--global-radius-container-2-xl)"],
  ["moderate", "var(--global-radius-container-l)"],
] as const)(
  "renders with the expected border radius when radius is %s",
  (radius, expectedBorderRadius) => {
    render(
      <Tile radius={radius} data-role="tile">
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

test('renders standard background when variant prop is "transparent"', () => {
  render(
    <Tile variant="transparent" data-role="tile">
      <TileContent>Child 1</TileContent>
      <TileContent>Child 2</TileContent>
    </Tile>,
  );

  const tileElement = screen.getByTestId("tile");

  expect(tileElement).toHaveStyle(
    "background-color: var(--container-standard-bg-default)",
  );
});
