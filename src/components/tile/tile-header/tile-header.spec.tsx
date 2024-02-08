import React from "react";
import { mount, ReactWrapper } from "enzyme";
import TileHeader, { TileHeaderProps } from ".";
import {
  assertStyleMatch,
  testStyledSystemPadding,
} from "../../../__spec_helper__/test-utils";
import StyledTileHeader from "./tile-header.style";
import { rootTagTest } from "../../../__internal__/utils/helpers/tags/tags-specs";

describe("TileHeader", () => {
  let wrapper: ReactWrapper;

  testStyledSystemPadding((props) => <TileHeader {...props} />);

  it.each<[TileHeaderProps["variant"], string]>([
    ["default", "var(--colorsUtilityMajor100)"],
    ["black", "var(--colorsUtilityYin100)"],
    ["transparent", "transparent"],
  ])(
    "should render correct background when variant prop is %s",
    (tileVariant, tileVariantToken) => {
      wrapper = mount(<TileHeader variant={tileVariant}>content</TileHeader>);

      assertStyleMatch(
        {
          background: tileVariantToken,
        },
        wrapper.find(StyledTileHeader)
      );
    }
  );

  it("has proper data attributes applied to elements", () => {
    wrapper = mount(
      <TileHeader data-element="foo" data-role="bar">
        content
      </TileHeader>
    );
    rootTagTest(wrapper.find(StyledTileHeader), "tile-header", "foo", "bar");
  });
});
