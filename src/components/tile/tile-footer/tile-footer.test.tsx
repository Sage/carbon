import React from "react";
import { render, screen } from "@testing-library/react";
import TileFooter, { TileFooterProps } from ".";
import Tile from "../tile.component";
import { testStyledSystemPadding } from "../../../__spec_helper__/__internal__/test-utils";

testStyledSystemPadding(
  (props) => (
    <Tile>
      <TileFooter data-role="footer" {...props} />
    </Tile>
  ),
  () => screen.getByTestId("footer"),
);

test.each<[TileFooterProps["variant"], string, string]>([
  ["black", "var(--container-action-bg-footer-active)", "transparent"],
  ["selected", "var(--container-action-bg-footer-active)", "transparent"],
  ["active", "var(--container-action-bg-footer-activated)", "transparent"],
  [undefined, "transparent", "var(--container-standard-border-default)"],
])(
  "should render correct background and border-top when variant prop is %s",
  (tileVariant, background, borderTopColor) => {
    render(
      <Tile>
        <TileFooter variant={tileVariant} data-role="tile-footer">
          content
        </TileFooter>
        ,
      </Tile>,
    );

    const tileFooterElement = screen.getByTestId("tile-footer");

    expect(tileFooterElement).toHaveStyleRule("background", background);
    expect(tileFooterElement).toHaveStyleRule(
      "border-top",
      `1px solid ${borderTopColor}`,
    );
  },
);

test("has proper data attributes applied to elements", () => {
  render(
    <Tile>
      <TileFooter data-element="foo" data-role="tile-footer">
        content
      </TileFooter>
      ,
    </Tile>,
  );

  const tileFooterElement = screen.getByTestId("tile-footer");

  expect(tileFooterElement).toHaveAttribute("data-element", "foo");
  expect(tileFooterElement).toHaveAttribute("data-role", "tile-footer");
});
