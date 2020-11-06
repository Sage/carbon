import React from "react";
import { shallow, mount } from "enzyme";
import NavigationBar from "./navigation-bar.component";
import {
  assertStyleMatch,
  testStyledSystemSpacing,
} from "../../__spec_helper__/test-utils";
import { baseTheme } from "../../style/themes";
import StyledNavigationBar from "./navigation-bar.style";

describe("NavigationBar", () => {
  let wrapper;

  describe("style overrides", () => {
    testStyledSystemSpacing((props) => (
      <NavigationBar {...props}>test content</NavigationBar>
    ));
  });

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
      <StyledNavigationBar>
        <div>test content</div>
      </StyledNavigationBar>
    );

    assertStyleMatch(
      {
        minHeight: "40px",
        backgroundColor: baseTheme.navigationBar.light.background,
        borderBottom: `1px solid ${baseTheme.navigationBar.light.borderBottom}`,
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
        backgroundColor: baseTheme.navigationBar.dark.background,
        color: baseTheme.colors.white,
      },
      wrapper
    );
  });
});
