import { mount, ReactWrapper } from "enzyme";
import React from "react";
import { assertStyleMatch } from "__spec_helper__/test-utils";
import GlobalHeader, { GlobalHeaderProps } from "./global-header.component";

const GLOBAL_HEADER = "[data-component='global-header']";

function render(props?: GlobalHeaderProps) {
  return mount(<GlobalHeader {...props}>foobar</GlobalHeader>);
}

describe("Global Header", () => {
  let wrapper: ReactWrapper;

  it("should render with correct `data-component` tag", () => {
    wrapper = render();
    expect(wrapper.find(GLOBAL_HEADER).exists()).toBe(true);
  });

  it("should render with correct `aria-label`", () => {
    const label = "Global Header";
    wrapper = render();
    expect(wrapper.find(`nav[aria-label='${label}']`).exists()).toBe(true);
  });

  it("should render with correct styling", () => {
    wrapper = render();
    assertStyleMatch(
      {
        backgroundColor: "var(--colorsComponentsMenuWinterStandard500)",
        color: "var(--colorsComponentsMenuYang100)",
        position: "fixed",
      },
      wrapper.find(GLOBAL_HEADER)
    );
  });

  it("should have correct z-index", () => {
    wrapper = render();
    expect(wrapper.find(GLOBAL_HEADER)).toHaveStyleRule("z-index", "2999");
  });

  describe("when logo prop is passed", () => {
    it("should render logo wrapper with correct `data-element` tag", () => {
      const logo = <img src="foobar" alt="Carbon logo" />;
      wrapper = render({ logo });
      expect(
        wrapper.find("[data-element='global-header-logo-wrapper']").exists()
      ).toBe(true);
    });

    it("and logo is an img element, render logo correctly", () => {
      const logo = <img src="foobar" alt="Carbon logo" />;
      wrapper = render({ logo });
      expect(wrapper.find(GLOBAL_HEADER).find("img").exists()).toBe(true);
    });

    it("and logo is a svg element, render logo correctly", () => {
      const logo = <svg aria-label="Carbon logo" />;
      wrapper = render({ logo });
      expect(
        wrapper
          .find(GLOBAL_HEADER)
          .find("svg[aria-label='Carbon logo']")
          .exists()
      ).toBe(true);
    });
  });
});
