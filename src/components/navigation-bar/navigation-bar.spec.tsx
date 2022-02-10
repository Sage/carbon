import React from "react";
import { shallow, mount } from "enzyme";
import NavigationBar, {
  NavigationBarProps,
  StickyPosition,
} from "./navigation-bar.component";
import {
  assertStyleMatch,
  testStyledSystemPadding,
  testStyledSystemFlexBox,
} from "../../__spec_helper__/test-utils";
import StyledNavigationBar from "./navigation-bar.style";

describe("NavigationBar", () => {
  let wrapper;

  testStyledSystemPadding(
    (props: NavigationBarProps) => (
      <NavigationBar {...props}>test content</NavigationBar>
    ),
    undefined,
    undefined,
    { modifier: "&&" }
  );

  testStyledSystemFlexBox((props: NavigationBarProps) => (
    <NavigationBar {...props}>test content</NavigationBar>
  ));

  it("should render child correctly", () => {
    wrapper = shallow(
      <NavigationBar>
        <div>test content</div>
      </NavigationBar>
    );

    expect(wrapper.find("div").text()).toBe("test content");
  });

  it("should not render a child if `isLoading={true}`", () => {
    wrapper = shallow(
      <NavigationBar isLoading>
        <div>test content</div>
      </NavigationBar>
    );

    expect(wrapper.find("div").exists()).toBe(false);
  });

  it('should render `data-component="navigation-bar"` by default', () => {
    wrapper = shallow(
      <NavigationBar>
        <div>test content</div>
      </NavigationBar>
    );

    expect(wrapper.prop("data-component")).toBe("navigation-bar");
  });

  it("should provide ariaLabel correctly", () => {
    wrapper = shallow(
      <NavigationBar ariaLabel="my aria label">
        <div>test content</div>
      </NavigationBar>
    );

    expect(wrapper.prop("aria-label")).toBe("my aria label");
  });

  it("should render `light` scheme as default", () => {
    wrapper = shallow(
      <NavigationBar>
        <div>test content</div>
      </NavigationBar>
    );

    expect(wrapper.props().navigationType).toBe("light");
  });

  it("should render correct styles in `light` scheme", () => {
    wrapper = mount(
      <StyledNavigationBar navigationType="light">
        <div>test content</div>
      </StyledNavigationBar>
    );

    assertStyleMatch(
      {
        minHeight: "40px",
        backgroundColor: "var(--colorsComponentsMenuSpringStandard500)",
        borderBottom:
          "var(--borderWidth100) solid var(--colorsComponentsMenuSpringChildAlt500)",
        zIndex: "2999",
      },
      wrapper
    );
  });

  it("should render correct styles in `dark` scheme", () => {
    wrapper = mount(
      <StyledNavigationBar navigationType="dark">
        <div>test content</div>
      </StyledNavigationBar>
    );

    assertStyleMatch(
      {
        backgroundColor: "var(--colorsComponentsMenuAutumnStandard500)",
        color: "var(--colorsComponentsMenuYang100)",
        zIndex: "2999",
      },
      wrapper
    );
  });

  it("should render correct styles in `white` scheme", () => {
    wrapper = mount(
      <StyledNavigationBar navigationType="white">
        <div>test content</div>
      </StyledNavigationBar>
    );

    assertStyleMatch(
      {
        backgroundColor: "var(--colorsComponentsMenuSummerStandard500)",
        borderBottom:
          "var(--borderWidth100) solid var(--colorsComponentsMenuSummerChildAlt500)",
        zIndex: "2999",
      },
      wrapper
    );
  });

  it("should render correct styles in `black` scheme", () => {
    wrapper = mount(
      <StyledNavigationBar navigationType="black">
        <div>test content</div>
      </StyledNavigationBar>
    );

    assertStyleMatch(
      {
        backgroundColor: "var(--colorsComponentsMenuWinterStandard500)",
        color: "var(--colorsComponentsMenuYang100)",
        zIndex: "2999",
      },
      wrapper
    );
  });

  it.each([
    ["only screen and (max-width: 599px)", "0 16px"],
    ["only screen and (max-width: 959px)", "0 24px"],
    ["only screen and (max-width: 1259px)", "0 32px"],
  ])("should set correct padding on media queries", (query, value) => {
    wrapper = mount(
      <StyledNavigationBar>
        <div>test content</div>
      </StyledNavigationBar>
    );

    assertStyleMatch(
      {
        padding: value,
      },
      wrapper,
      { media: query }
    );
  });

  it.each<[StickyPosition, string | undefined]>([
    ["top", undefined],
    ["top", "10px"],
    ["bottom", undefined],
    ["bottom", "10px"],
  ])("should set correct sticky offset", (position, offset) => {
    wrapper = mount(
      <NavigationBar stickyPosition={position} stickyOffset={offset}>
        <div>test content</div>
      </NavigationBar>
    );
    assertStyleMatch(
      {
        position: "sticky",
        [position]: offset || "0",
      },
      wrapper
    );
  });
});
