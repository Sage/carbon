import React from "react";
import { mount, ReactWrapper } from "enzyme";
import TileFooter, { TileFooterProps } from ".";
import {
  assertStyleMatch,
  testStyledSystemPadding,
} from "../../../__spec_helper__/__internal__/test-utils";
import StyledTileFooter from "./tile-footer.style";
import { rootTagTest } from "../../../__internal__/utils/helpers/tags/tags-specs";

describe("TileFooter", () => {
  let wrapper: ReactWrapper;

  testStyledSystemPadding((props) => <TileFooter {...props} />);

  it.each<[TileFooterProps["variant"], string, string]>([
    ["default", "var(--colorsUtilityMajor100)", "var(--colorsUtilityMajor100)"],
    ["black", "var(--colorsUtilityYin100)", "var(--colorsUtilityMajor100)"],
    ["transparent", "transparent", "var(--colorsUtilityMajor100)"],
    ["grey", "var(--colorsUtilityMajor025)", "var(--colorsUtilityMajor200)"],
  ])(
    "should render correct background and border-top when variant prop is %s",
    (tileVariant, background, borderTopColor) => {
      wrapper = mount(<TileFooter variant={tileVariant}>content</TileFooter>);

      assertStyleMatch(
        {
          background,
          borderTop: `1px solid ${borderTopColor}`,
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
