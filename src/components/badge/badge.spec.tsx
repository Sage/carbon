import React from "react";
import { mount } from "enzyme";
import { ThemeProvider } from "styled-components";
import { assertStyleMatch } from "__spec_helper__/test-utils";
import Badge from "./badge.component";
import Button from "../button";
import { StyledCounter, StyledBadge } from "./badge.style";
import { baseTheme } from "../../style/themes";

const renderComponent = (props = {}) => (
  <ThemeProvider theme={baseTheme}>
    <Badge {...props}>
      <Button buttonType="primary">Button</Button>
    </Badge>
  </ThemeProvider>
);

const BADGE = '[data-component="badge"]';

describe("Badge", () => {
  it("should render correctly if counter is a number", () => {
    const wrapper = mount(renderComponent({ counter: 1 }));

    expect(wrapper.find(BADGE).exists()).toBe(true);
  });

  it("should render correctly if counter is a string", () => {
    const wrapper = mount(renderComponent({ counter: "1" }));

    expect(wrapper.find(BADGE).exists()).toBe(true);
  });

  describe("when counter is between 1 and 99", () => {
    const wrapper = mount(renderComponent({ counter: 50 }));

    it("should render delivered number", () => {
      expect(wrapper.find(StyledCounter).text()).toEqual("50");
    });
  });

  describe("when counter is higher than 99", () => {
    const wrapper = mount(renderComponent({ counter: 101 }));

    it("should render number `99`", () => {
      expect(wrapper.find(StyledCounter).text()).toEqual("99");
    });
  });

  describe("when counter is `0`", () => {
    const wrapper = mount(renderComponent({ counter: 0 }));

    it("should not render badge", () => {
      expect(wrapper.find(BADGE).exists()).toBe(false);
    });
  });

  describe("when counter is not set", () => {
    const wrapper = mount(renderComponent({}));

    it("should not render badge", () => {
      expect(wrapper.find(BADGE).exists()).toBe(false);
    });
  });

  describe("Renders correct elements", () => {
    let wrapper;

    it("should render as a button element when onClick is present", () => {
      wrapper = mount(renderComponent({ counter: 9, onClick: () => {} }));
      expect(wrapper.find(StyledBadge).exists()).toBe(true);
      expect(wrapper.find("button").exists()).toBe(true);
    });

    it("should render as a span element when onClick is not present", () => {
      wrapper = mount(renderComponent({ counter: 9 }));
      expect(wrapper.find(StyledBadge).exists()).toBe(true);
      expect(wrapper.find("span").exists()).toBe(true);
    });
  });

  describe("Accessibility", () => {
    const ariaLabelText = "Generic aria message";
    const wrapper = mount(
      renderComponent({ counter: 9, "aria-label": ariaLabelText })
    );

    it("should have the relevant aria-label when aria-label is specified", () => {
      expect(wrapper.find(Badge).first().prop("aria-label")).toBe(
        ariaLabelText
      );
    });
  });

  describe("Styles", () => {
    it("should apply the correct cursor style when onClick is not specified", () => {
      const wrapper = mount(renderComponent({ counter: 9 }));
      assertStyleMatch(
        {
          cursor: `default`,
        },
        wrapper.find(StyledBadge)
      );
    });
    it("should apply correct border radius for counter", () => {
      const wrapper = mount(renderComponent({ counter: 9 }));
      assertStyleMatch(
        {
          borderRadius: "var(--borderRadiusCircle)",
        },
        wrapper.find(StyledBadge)
      );
    });

    it("should render badge with default style when no color prop is specified", () => {
      const wrapper = mount(renderComponent({ counter: 9, onClick: () => {} }));
      assertStyleMatch(
        {
          borderColor: "var(--colorsActionMajor500)",
          color: "var(--colorsActionMajor500)",
        },
        wrapper.find(StyledBadge)
      );
    });

    it("should render badge with correct style when color prop is specified", () => {
      const wrapper = mount(
        renderComponent({
          counter: 9,
          onClick: () => {},
          color: "--colorsSemanticNegative500",
        })
      );
      assertStyleMatch(
        {
          borderColor: "var(--colorsSemanticNegative500)",
          color: "var(--colorsSemanticNegative500)",
        },
        wrapper.find(StyledBadge)
      );
    });
  });
});
