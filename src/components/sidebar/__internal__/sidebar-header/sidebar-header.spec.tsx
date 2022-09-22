import React from "react";
import { shallow, mount } from "enzyme";

import SidebarHeader from "./sidebar-header.component";
import SidebarHeaderStyle from "./sidebar-header.style";
import Textbox from "../../../textbox";
import { assertStyleMatch } from "../../../../__spec_helper__/test-utils";

describe("Sidebar Header", () => {
  const wrapper = shallow(
    <SidebarHeader id="id">
      <Textbox />
    </SidebarHeader>
  );

  describe("render", () => {
    it("should render child", () => {
      expect(wrapper.find(Textbox)).toBeTruthy();
    });
  });
});

describe("SidebarHeaderStyle", () => {
  it("should render base sidebar header", () => {
    const wrapper = mount(<SidebarHeaderStyle />);
    assertStyleMatch(
      {
        backgroundColor: "var(--colorsUtilityMajor025)",
        boxShadow: "inset 0 -1px 0 0 var(--colorsUtilityMajor100)",
        boxSizing: "border-box",
        padding: "27px 32px 32px 32px",
        width: "100%",
        color: "var(--colorsActionMinorYin090)",
      },
      wrapper.find("div")
    );
  });
});
