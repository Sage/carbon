import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import CharacterCount from ".";
import {
  StyledCharacterCount,
  VisuallyHiddenCharacterCount,
  VisuallyHiddenHint,
} from "../character-count/character-count.style";

describe("CharacterCount", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <CharacterCount value={5} limit={10} isOverLimit={false} />
    );
  });

  describe("when rendered", () => {
    it("should render default", () => {
      assertStyleMatch(
        {
          textAlign: "left",
          fontSize: "12px",
          marginTop: "4px",
          marginBottom: "4px",
          color: "var(--colorsUtilityYin055)",
        },
        wrapper.find(StyledCharacterCount)
      );
    });

    it("character counter has aria-hidden attribute", () => {
      expect(wrapper.find(StyledCharacterCount).prop("aria-hidden")).toBe(
        "true"
      );
    });

    it("character counter has correct count", () => {
      expect(wrapper.find(StyledCharacterCount).text()).toBe(
        "5 characters left"
      );
    });

    it("visually hidden character counter has aria-live='polite'", () => {
      expect(wrapper.find(VisuallyHiddenCharacterCount).prop("aria-live")).toBe(
        "polite"
      );
    });

    it("visually hidden character counter has the same count message as visual character counter", () => {
      expect(wrapper.find(VisuallyHiddenCharacterCount).text()).toBe(
        "5 characters left"
      );
    });

    it("visually hidden character counter has css properties to visually hide it from view", () => {
      assertStyleMatch(
        {
          border: "0",
          height: "1px",
          margin: "-1px",
          overflow: "hidden",
          padding: "0",
          position: "absolute",
          width: "1px",
          whiteSpace: "nowrap",
        },
        wrapper.find(VisuallyHiddenCharacterCount)
      );
    });

    it("visually hidden hint has correct message based on 'characterLimit", () => {
      expect(wrapper.find(VisuallyHiddenHint).text()).toBe(
        "You can enter up to 10 characters"
      );
    });

    it("visually hidden hint has css properties to visually hide it from view", () => {
      assertStyleMatch(
        {
          border: "0",
          height: "1px",
          margin: "-1px",
          overflow: "hidden",
          padding: "0",
          position: "absolute",
          width: "1px",
          whiteSpace: "nowrap",
        },
        wrapper.find(VisuallyHiddenHint)
      );
    });
  });

  describe("when isOverLimit prop is true", () => {
    it("should be styled for warn over limit", () => {
      wrapper.setProps({ isOverLimit: true });
      assertStyleMatch(
        {
          fontWeight: "700",
          color: "var(--colorsSemanticNegative500)",
        },
        wrapper.find(StyledCharacterCount)
      );
    });

    it("character count string should be correct", () => {
      wrapper = mount(<CharacterCount value={4} limit={3} isOverLimit />);
      expect(wrapper.find(StyledCharacterCount).text()).toBe(
        "1 character too many"
      );
    });
  });

  describe("when isOverLimit prop is false", () => {
    it("character count string should be correct", () => {
      wrapper = mount(
        <CharacterCount value={2} limit={3} isOverLimit={false} />
      );
      expect(wrapper.find(StyledCharacterCount).text()).toBe(
        "1 character left"
      );
    });
  });
});
