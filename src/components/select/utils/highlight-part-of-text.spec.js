import React from "react";
import { shallow } from "enzyme";
import highlightPartOfText from "./highlight-part-of-text";
import MatchingText from "./matching-text.style";

describe("highlightPartOfText", () => {
  describe("when the text contains no matching parts", () => {
    it("then the returned text should not be changed", () => {
      const text = "abcdefghi";
      const partToBeHighlighted = "xyz";

      expect(highlightPartOfText(text, partToBeHighlighted)).toBe(text);
    });
  });

  describe("when the partToBeHighlighted is an empty string", () => {
    it("then the returned text should not be changed", () => {
      const text = "abcdefghi";
      const partToBeHighlighted = "";

      expect(highlightPartOfText(text, partToBeHighlighted)).toBe(text);
    });
  });

  describe("when the text contains matching part", () => {
    it("the expected part of text should be highlighted", () => {
      const text = "abcdefghi";
      const partToBeHighlighted = "def";

      const wrapper = shallow(
        <div>{highlightPartOfText(text, partToBeHighlighted)}</div>
      );

      expect(wrapper.find(MatchingText).exists()).toBe(true);
      expect(wrapper.find(MatchingText).text()).toBe(partToBeHighlighted);
    });
  });

  describe("when the text contains multiple matching parts", () => {
    it("then all these parts of text should be highlighted", () => {
      const text = "abcdefghidefjkldef";
      const partToBeHighlighted = "def";

      const wrapper = shallow(
        <div>{highlightPartOfText(text, partToBeHighlighted)}</div>
      );

      expect(wrapper.find(MatchingText)).toHaveLength(3);
      expect(wrapper.find(MatchingText).at(0).text()).toBe(partToBeHighlighted);
      expect(wrapper.find(MatchingText).at(1).text()).toBe(partToBeHighlighted);
      expect(wrapper.find(MatchingText).at(2).text()).toBe(partToBeHighlighted);
    });
  });
});
