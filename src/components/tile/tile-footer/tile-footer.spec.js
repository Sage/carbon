import React from "react";
import { mount } from "enzyme";
import TileFooter from ".";
import {
  assertStyleMatch,
  testStyledSystemPadding,
} from "../../../__spec_helper__/test-utils";
import StyledTileFooter from "./tile-footer.style";

const renderWrapper = (props, renderType = mount) => {
  return renderType(<TileFooter {...props}>content</TileFooter>);
};

describe("TileFooter", () => {
  let wrapper;

  testStyledSystemPadding((props) => <TileFooter {...props} />);

  beforeEach(() => {
    wrapper = renderWrapper();
  });

  it("should render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should render correct background as default", () => {
    assertStyleMatch(
      {
        background: "var(--colorsUtilityMajor100)",
      },
      wrapper.find(StyledTileFooter)
    );
  });

  it.each([
    ["default", "var(--colorsUtilityMajor100)"],
    ["black", "var(--colorsUtilityYin100)"],
    ["transparent", "transparent"],
  ])(
    "should render correct background when variant prop is %s",
    (tileVariant, tileVariantToken) => {
      wrapper = renderWrapper({ variant: tileVariant });

      assertStyleMatch(
        {
          background: tileVariantToken,
        },
        wrapper.find(StyledTileFooter)
      );
    }
  );
});
