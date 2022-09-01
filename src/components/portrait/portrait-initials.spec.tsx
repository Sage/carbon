import React from "react";
import { mount } from "enzyme";
import PortraitInitials from "./portrait-initials.component";

describe("PortraitInitials", () => {
  it("renders correctly", () => {
    const wrapper = mount(<PortraitInitials initials="abcde" size="XXL" />);
    expect(wrapper.find("img").exists()).toBeTruthy();
  });
});
