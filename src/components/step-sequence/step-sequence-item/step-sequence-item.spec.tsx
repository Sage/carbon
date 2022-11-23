import React from "react";
import { mount } from "enzyme";

import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import StepSequenceItem, {
  StepSequenceItemProps,
} from "./step-sequence-item.component";
import Icon from "../../icon";
import {
  StyledStepSequenceItemHiddenLabel,
  StyledStepSequenceItemIndicator,
} from "./step-sequence-item.style";
import { StepSequenceProps } from "../step-sequence.component";

const orientations = ["horizontal", "vertical"] as const;

describe("StepSequenceItem", () => {
  const render = (
    props: Partial<StepSequenceItemProps & StepSequenceProps>,
    renderer = mount
  ) =>
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

  describe("when status is incomplete", () => {
    it.each(orientations)(
      "renders the correct styling when orientation is %s",
      (orientation) => {
        const wrapper = render({
          ...defaultProps,
          status: "incomplete",
          orientation,
        });
        const side = orientation === "vertical" ? "Left" : "Top";
        const border = `border${side}`;

        assertStyleMatch(
          {
            [border]: "var(--sizing025) dashed var(--colorsUtilityYin055)",
          },
          wrapper,
          { modifier: "::before" }
        );
      }
    );
  });

  describe("when status is complete", () => {
    it.each(orientations)(
      "renders the correct styling when orientation is %s",
      (orientation) => {
        const wrapper = render({
          ...defaultProps,
          status: "complete",
          orientation,
        });
        const side = orientation === "vertical" ? "Left" : "Top";
        const borderColor = `border${side}Color`;
        const borderStyle = `border${side}Style`;

        assertStyleMatch(
          {
            color: "var(--colorsBaseTheme,var(--colorsSemanticPositive500))",
          },
          wrapper
        );

        assertStyleMatch(
          {
            [borderColor]:
              "var( --colorsBaseTheme, var(--colorsSemanticPositive500) )",
            [borderStyle]: "solid",
          },
          wrapper,
          { modifier: "::before" }
        );
      }
    );

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
      expect(wrapper.find(StyledStepSequenceItemHiddenLabel).exists()).toBe(
        true
      );
      expect(wrapper.find(StyledStepSequenceItemHiddenLabel).text()).toEqual(
        "HiddenComplete"
      );
    });
  });

  describe("when status is current", () => {
    it.each(orientations)(
      "renders the correct styling when orientation is %s",
      (orientation) => {
        const wrapper = render({
          ...defaultProps,
          status: "current",
          orientation,
        });
        const side = orientation === "vertical" ? "Left" : "Top";
        const borderColor = `border${side}Color`;
        const borderStyle = `border${side}Style`;

        assertStyleMatch(
          {
            color: "var(--colorsUtilityYin090)",
          },
          wrapper
        );

        assertStyleMatch(
          {
            [borderColor]: "var(--colorsUtilityYin090)",
            [borderStyle]: "solid",
          },
          wrapper,
          { modifier: "::before" }
        );
      }
    );

    it("renders the hidden label", () => {
      const wrapper = render({
        ...defaultProps,
        status: "current",
      });
      expect(wrapper.find(StyledStepSequenceItemHiddenLabel).exists()).toBe(
        true
      );
      expect(wrapper.find(StyledStepSequenceItemHiddenLabel).text()).toEqual(
        "HiddenCurrent"
      );
    });

    describe("when hideIndicator is set to true", () => {
      it("doesn't render the indicator", () => {
        const wrapper = render({
          ...defaultProps,
          hideIndicator: true,
        });
        expect(wrapper.find(StyledStepSequenceItemIndicator).exists()).toBe(
          false
        );
      });
    });
  });
});
