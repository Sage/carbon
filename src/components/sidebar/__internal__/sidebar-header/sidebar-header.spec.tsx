import React from "react";
import { shallow, mount } from "enzyme";

import SidebarHeader from "./sidebar-header.component";
import StyledSidebarHeader from "./sidebar-header.style";
import Textbox from "../../../textbox";
import StyledIconButton from "../../../icon-button/icon-button.style";
import {
  assertStyleMatch,
  testStyledSystemPadding,
} from "../../../../__spec_helper__/__internal__/test-utils";

describe("Sidebar Header", () => {
  testStyledSystemPadding((props) => <SidebarHeader id="foo" {...props} />, {
    p: "27px 32px 32px",
  });

  describe("render", () => {
    it("should render child", () => {
      const wrapper = shallow(
        <SidebarHeader id="id">
          <Textbox />
        </SidebarHeader>
      );
      expect(wrapper.find(Textbox)).toBeTruthy();
    });

    it("should apply the expected styles when closeIcon is rendered", () => {
      const wrapper = mount(
        <SidebarHeader id="id" closeIcon={<span>mock close icon</span>} />
      );
      assertStyleMatch(
        {
          display: "flex",
          justifyContent: "space-between",
        },
        wrapper
      );

      assertStyleMatch(
        {
          position: "absolute",
          zIndex: "1",
          right: "25px",
        },
        wrapper,
        { modifier: `> ${StyledIconButton}:first-of-type` }
      );
    });
  });
});

describe("StyledSidebarHeader", () => {
  it("should render base sidebar header", () => {
    const wrapper = mount(<StyledSidebarHeader />);
    assertStyleMatch(
      {
        backgroundColor: "var(--colorsUtilityYang100)",
        boxShadow: "inset 0 -1px 0 0 var(--colorsUtilityMajor100)",
        boxSizing: "border-box",
        width: "100%",
        color: "var(--colorsActionMinorYin090)",
      },
      wrapper.find("div")
    );
  });
});
