import React from "react";
import { render, screen } from "@testing-library/react";
import TileFooter, { TileFooterProps } from ".";
import { testStyledSystemPaddingRTL } from "../../../__spec_helper__/__internal__/test-utils";

testStyledSystemPaddingRTL(
  (props) => <TileFooter data-role="footer" {...props} />,
  () => screen.getByTestId("footer"),
);

test.each<[TileFooterProps["variant"], string, string]>([
  ["default", "var(--colorsUtilityMajor100)", "var(--colorsUtilityMajor100)"],
  ["black", "var(--colorsUtilityYin100)", "var(--colorsUtilityMajor100)"],
  ["transparent", "transparent", "var(--colorsUtilityMajor100)"],
  ["grey", "var(--colorsUtilityMajor025)", "var(--colorsUtilityMajor200)"],
])(
  "should render correct background and border-top when variant prop is %s",
  (tileVariant, background, borderTopColor) => {
    render(
      <TileFooter variant={tileVariant} data-role="tile-footer">
        content
      </TileFooter>,
    );

    const tileFooterElement = screen.getByTestId("tile-footer");

    expect(tileFooterElement).toHaveStyle({
      background,
      borderTop: `1px solid ${borderTopColor}`,
    });
  },
);

test("has proper data attributes applied to elements", () => {
  render(
    <TileFooter data-element="foo" data-role="tile-footer">
      content
    </TileFooter>,
  );

  const tileFooterElement = screen.getByTestId("tile-footer");

  expect(tileFooterElement).toHaveAttribute("data-element", "foo");
  expect(tileFooterElement).toHaveAttribute("data-role", "tile-footer");
});
