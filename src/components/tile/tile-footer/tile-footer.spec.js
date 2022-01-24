import React from "react";
import { mount } from "enzyme";
import TileFooter from "./tile-footer.component";
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
        background: "var(--colorsUtilityMajor025)",
      },
      wrapper.find(StyledTileFooter)
    );
  });

  it("should render correct background if `default` variant is provided", () => {
    wrapper = renderWrapper({ variant: "default" });

    assertStyleMatch(
      {
        background: "var(--colorsUtilityMajor025)",
      },
      wrapper.find(StyledTileFooter)
    );
  });

  it("should render correct background if `transparent` variant is provided", () => {
    wrapper = renderWrapper({ variant: "transparent" });
  });
});
