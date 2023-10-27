import React from "react";
import { mount, ReactWrapper } from "enzyme";
import TileFooter, { TileFooterProps } from ".";
import {
  assertStyleMatch,
  testStyledSystemPadding,
} from "../../../__spec_helper__/test-utils";
import StyledTileFooter from "./tile-footer.style";
import { rootTagTest } from "../../../__internal__/utils/helpers/tags/tags-specs";

describe("TileFooter", () => {
  let wrapper: ReactWrapper;

  testStyledSystemPadding((props) => <TileFooter {...props} />);

  it.each<[TileFooterProps["variant"], string]>([
    ["default", "var(--colorsUtilityMajor100)"],
    ["black", "var(--colorsUtilityYin100)"],
    ["transparent", "transparent"],
  ])(
    "should render correct background when variant prop is %s",
    (tileVariant, tileVariantToken) => {
      wrapper = mount(<TileFooter variant={tileVariant}>content</TileFooter>);

      assertStyleMatch(
        {
          background: tileVariantToken,
        },
        wrapper.find(StyledTileFooter)
      );
    }
  );

  it("has proper data attributes applied to elements", () => {
    wrapper = mount(
      <TileFooter data-element="foo" data-role="bar">
        content
      </TileFooter>
    );
    rootTagTest(wrapper.find(StyledTileFooter), "tile-footer", "foo", "bar");
  });
});
