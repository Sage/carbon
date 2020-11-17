import React from "react";
import { shallow, mount } from "enzyme";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import Title from "./menu-segment-title.component";
import Menu from "../menu.component";
import { MenuItem, SubmenuBlock } from "..";
import { baseTheme } from "../../../style/themes";

describe("Title", () => {
  let wrapper;

  it('should render data-component to be "menu-segment-title"', () => {
    wrapper = shallow(<Title>foo</Title>);
    expect(wrapper.prop("data-component")).toBe("menu-segment-title");
  });

  it("should get prop menuType from <SubmenuBlock />", () => {
    wrapper = mount(
      <Menu menuType="light">
        <MenuItem submenu="Item One">
          <SubmenuBlock>
            <Title>foo</Title>
          </SubmenuBlock>
        </MenuItem>
      </Menu>
    );

    expect(wrapper.find(Title).prop("menuType")).toBe("light");
  });

  it("should get prop menuType from <SubmenuBlock /> when children are an array", () => {
    wrapper = mount(
      <Menu menuType="light">
        <MenuItem submenu="Item One">
          <SubmenuBlock>{[<Title>foo</Title>]}</SubmenuBlock>
        </MenuItem>
      </Menu>
    );

    expect(wrapper.find(Title).prop("menuType")).toBe("light");
  });

  it("should have correct styles as default", () => {
    wrapper = mount(<Title menuType="light">foo</Title>);

    assertStyleMatch(
      {
        padding: "16px 16px 8px",
        fontSize: "12px",
        fontWeight: "700",
        textTransform: "uppercase",
        lineHeight: "12px",
        cursor: "default",
      },
      wrapper
    );
  });

  it('should have correct styles if menuType="light"', () => {
    wrapper = mount(<Title menuType="light">foo</Title>);

    assertStyleMatch(
      {
        color: baseTheme.menu.light.title,
      },
      wrapper
    );
  });

  it('should have correct styles if menuType="light" and "alternate" variant', () => {
    wrapper = mount(
      <Title menuType="light" variant="alternate">
        foo
      </Title>
    );

    assertStyleMatch(
      {
        color: baseTheme.menu.light.title,
        background: baseTheme.menu.light.background,
      },
      wrapper
    );
  });

  it('should have correct styles if menuType="dark"', () => {
    wrapper = mount(<Title menuType="dark">foo</Title>);

    assertStyleMatch(
      {
        color: baseTheme.menu.dark.title,
      },
      wrapper
    );
  });

  it('should have correct styles if menuType="dark"  and "alternate" variant', () => {
    wrapper = mount(
      <Title menuType="dark" variant="alternate">
        foo
      </Title>
    );

    assertStyleMatch(
      {
        color: baseTheme.menu.dark.title,
        background: baseTheme.colors.slate,
      },
      wrapper
    );
  });
});
