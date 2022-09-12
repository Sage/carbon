import React from "react";
import { mount } from "enzyme";

import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import StepSequenceItem, {
  StepSequenceItemProps,
} from "./step-sequence-item.component";
import Icon from "../../icon";
import {
  StepSequenceItemHiddenLabelStyle,
  StepSequenceItemIndicatorStyle,
} from "./step-sequence-item.style";

describe("StepSequenceItem", () => {
  const render = (props: Partial<StepSequenceItemProps>, renderer = mount) =>
    renderer(
      <StepSequenceItem indicator="1" {...props}>
        Item
      </StepSequenceItem>
    );

  const defaultProps = {
    ariaLabel: "Step 1 of 5",
    indicator: "2",
    hiddenCompleteLabel: "HiddenComplete",
    hiddenCurrentLabel: "HiddenCurrent",
  };

  describe("when complete", () => {
    it("renders the tick item", () => {
      const wrapper = render({
        ...defaultProps,
        status: "complete",
      });
      expect(wrapper.find(Icon).exists()).toBe(true);
    });

    it("renders the hidden label", () => {
      const wrapper = render({
        ...defaultProps,
        status: "complete",
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
      });
      expect(wrapper.find(StepSequenceItemHiddenLabelStyle).exists()).toBe(
        true
      );
      expect(wrapper.find(StepSequenceItemHiddenLabelStyle).text()).toEqual(
        "HiddenCurrent"
      );
    });

    describe("when hideIndicator is set to true", () => {
      it("doesn't render the indicator", () => {
        const wrapper = render({
          ...defaultProps,
          hideIndicator: true,
        });
        expect(wrapper.find(StepSequenceItemIndicatorStyle).exists()).toBe(
          false
        );
      });
    });
  });
});
