import React from "react";
import { mount, ReactWrapper } from "enzyme";
import TileFooter, { TileFooterProps } from ".";
import {
  assertStyleMatch,
  testStyledSystemPadding,
} from "../../../__spec_helper__/test-utils";
import StyledTileFooter from "./tile-footer.style";

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
});
