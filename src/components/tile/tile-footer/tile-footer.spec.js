import React from "react";
import { mount } from "enzyme";
import TileFooter from "./tile-footer.component";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import StyledTileFooter from "./tile-footer.style";
import { baseTheme } from "../../../style/themes";

const renderWrapper = (props, renderType = mount) => {
  return renderType(<TileFooter {...props}>content</TileFooter>);
};

describe("TileFooter", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = renderWrapper();
  });

  it("should render correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should render correct background as default", () => {
    assertStyleMatch(
      {
        background: baseTheme.tile.footerBackground,
      },
      wrapper.find(StyledTileFooter)
    );
  });

  it("should render correct background if `default` variant is provided", () => {
    wrapper = renderWrapper({ variant: "default" });

    assertStyleMatch(
      {
        background: baseTheme.tile.footerBackground,
      },
      wrapper.find(StyledTileFooter)
    );
  });

  it("should render correct background if `transparent` variant is provied", () => {
    wrapper = renderWrapper({ variant: "transparent" });
  });
});
