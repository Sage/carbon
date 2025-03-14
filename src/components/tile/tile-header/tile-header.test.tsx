import React from "react";
import { screen } from "@testing-library/react";
import {
  render,
  testStyledSystemPadding,
} from "../../../__spec_helper__/__internal__/test-utils";

import TileHeader, { TileHeaderProps } from ".";

testStyledSystemPadding(
  (props) => <TileHeader data-role="header" {...props} />,
  () => screen.getByTestId("header"),
);

test.each<[TileHeaderProps["variant"], string, string]>([
  ["default", "var(--colorsUtilityMajor100)", "var(--colorsUtilityMajor100)"],
  ["black", "var(--colorsUtilityYin100)", "var(--colorsUtilityMajor100)"],
  ["transparent", "transparent", "var(--colorsUtilityMajor100)"],
  ["grey", "var(--colorsUtilityMajor025)", "var(--colorsUtilityMajor200)"],
])(
  "should render correct background and border-bottom when variant prop is %s",
  (tileVariant, background, borderBottomColor) => {
    render(
      <TileHeader variant={tileVariant} data-role="tile-header">
        content
      </TileHeader>,
    );

    const tileHeaderElement = screen.getByTestId("tile-header");

    expect(tileHeaderElement).toHaveStyleRule("background", background);
    expect(tileHeaderElement).toHaveStyleRule(
      "border-bottom",
      `1px solid ${borderBottomColor}`,
    );
  },
);

test("has proper data attributes applied to elements", () => {
  render(
    <TileHeader data-element="foo" data-role="tile-header">
      content
    </TileHeader>,
  );

  const tileHeaderElement = screen.getByTestId("tile-header");

  expect(tileHeaderElement).toHaveAttribute("data-element", "foo");
  expect(tileHeaderElement).toHaveAttribute("data-role", "tile-header");
});
