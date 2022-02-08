import React from "react";
import { mount } from "enzyme";
import TestRenderer from "react-test-renderer";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import StepSequenceItem from "./step-sequence-item.component";
import mintTheme from "../../../style/themes/mint";
import Icon from "../../icon";
import StepSequenceItemHiddenLabelStyle from "./step-sequence-item-hidden-label.style";

describe("StepSequenceItem", () => {
  const render = (props, renderer = mount) =>
    renderer(<StepSequenceItem {...props}>Item</StepSequenceItem>);

  const defaultProps = {
    ariaLabel: "Step 1 of 5",
    indicator: "2",
    hiddenCompleteLabel: "HiddenComplete",
    hiddenCurrentLabel: "HiddenCurrent",
  };

  it("renders correctly", () => {
    expect(
      render({ ...defaultProps, theme: mintTheme }, TestRenderer.create)
    ).toMatchSnapshot();
  });

  describe("when complete", () => {
    it("renders the tick item", () => {
      const wrapper = render({
        ...defaultProps,
        status: "complete",
        theme: mintTheme,
      });
      expect(wrapper.find(Icon).exists()).toBe(true);
    });

    it("renders the hidden label", () => {
      const wrapper = render({
        ...defaultProps,
        status: "complete",
        theme: mintTheme,
      });
      expect(wrapper.find(StepSequenceItemHiddenLabelStyle).exists()).toBe(
        true
      );
      expect(wrapper.find(StepSequenceItemHiddenLabelStyle).text()).toEqual(
        "HiddenComplete"
      );
    });
  });

  describe("when current", () => {
    it("renders the correct styling", () => {
      const wrapper = render({
        ...defaultProps,
        status: "current",
        theme: mintTheme,
      });
      assertStyleMatch(
        {
          color: "var(--colorsUtilityYin090)",
        },
        wrapper
      );
    });

    it("renders the hidden label", () => {
      const wrapper = render({
        ...defaultProps,
        status: "current",
        theme: mintTheme,
      });
      expect(wrapper.find(StepSequenceItemHiddenLabelStyle).exists()).toBe(
        true
      );
      expect(wrapper.find(StepSequenceItemHiddenLabelStyle).text()).toEqual(
        "HiddenCurrent"
      );
    });
  });
});
