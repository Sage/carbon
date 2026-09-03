import React from "react";
import { render, screen } from "@testing-library/react";
import TileHeader, { TileHeaderProps } from ".";
import { testStyledSystemPadding } from "../../../__spec_helper__/__internal__/test-utils";

testStyledSystemPadding(
  (props) => <TileHeader data-role="header" {...props} />,
  () => screen.getByTestId("header"),
);

test.each<[TileHeaderProps["variant"], string]>([
  ["default", "var(--colorsUtilityMajor100)"],
  ["black", "var(--colorsUtilityYin100)"],
  ["transparent", "transparent"],
  ["grey", "var(--colorsUtilityMajor025)"],
])(
  "should render correct background when variant prop is %s",
  (tileVariant, background) => {
    render(
      <TileHeader variant={tileVariant} data-role="tile-header">
        content
      </TileHeader>,
    );

    const tileHeaderElement = screen.getByTestId("tile-header");

    expect(tileHeaderElement).toHaveStyleRule("background-color", background);
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
