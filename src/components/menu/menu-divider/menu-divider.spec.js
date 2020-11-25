import React from "react";
import { shallow, mount } from "enzyme";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import Divider from "./menu-divider.component";
import Menu from "../menu.component";
import { MenuItem, SubmenuBlock } from "..";
import { baseTheme } from "../../../style/themes";

describe("Divider", () => {
  let wrapper;

  it('should render data-component to be "divider"', () => {
    wrapper = shallow(<Divider />);
    expect(wrapper.prop("data-component")).toBe("menu-divider");
  });

  it("should get prop menuType from <SubmenuBlock />", () => {
    wrapper = mount(
      <Menu menuType="light">
        <MenuItem submenu="Item One">
          <SubmenuBlock>
            <Divider />
          </SubmenuBlock>
        </MenuItem>
      </Menu>
    );

    expect(wrapper.find(Divider).prop("menuType")).toBe("light");
  });

  it('should have correct styles if menuType="light"', () => {
    wrapper = mount(<Divider menuType="light" />);

    assertStyleMatch(
      {
        background: baseTheme.menu.light.divider,
        cursor: "default",
      },
      wrapper
    );
  });

  it('should have correct styles if menuType="dark"', () => {
    wrapper = mount(<Divider menuType="dark" />);

    assertStyleMatch(
      {
        background: baseTheme.menu.dark.divider,
      },
      wrapper
    );
  });

  it('should have correct styles for "default" size', () => {
    wrapper = mount(<Divider />);

    assertStyleMatch(
      {
        margin: "0px 16px",
        height: "1px",
      },
      wrapper
    );
  });

  it('should have correct styles for "large" size', () => {
    wrapper = mount(<Divider size="large" />);

    assertStyleMatch(
      {
        height: "4px",
        margin: "0px",
      },
      wrapper
    );
  });
});
