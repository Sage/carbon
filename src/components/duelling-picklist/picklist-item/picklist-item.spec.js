import React from "react";
import { mount } from "enzyme";

import PicklistItem from "./picklist-item.component";
import { StyledButton } from "./picklist-item.style";
import StyledIcon from "../../icon/icon.style";
import FocusContext from "../duelling-picklist.context";

const handleKeyboardAccessibilityFn = jest.fn();
const setElementToFocus = jest.fn();

const render = (props) => {
  return mount(
    <FocusContext.Provider value={{ setElementToFocus }}>
      <PicklistItem
        handleKeyboardAccessibility={handleKeyboardAccessibilityFn}
        {...props}
      >
        Item content
      </PicklistItem>
    </FocusContext.Provider>
  );
};

describe("PicklistItem component", () => {
  describe("when type is 'add'", () => {
    it("should render an add icon in the button", () => {
      const wrapper = render({ type: "add", onChange: jest.fn(), item: 1 });

      expect(wrapper.find(StyledButton).props().iconType).toEqual("add");
    });
  });

  describe("when type is 'remove'", () => {
    it("should render a remove icon in the button", () => {
      const wrapper = render({ type: "remove", onChange: jest.fn(), item: 1 });

      expect(wrapper.find(StyledButton).props().iconType).toEqual("remove");
    });
  });

  describe("when locked prop is true'", () => {
    it("should render a locked icon", () => {
      const wrapper = render({
        type: "remove",
        onChange: jest.fn(),
        item: 1,
        locked: true,
      });

      expect(wrapper.find(StyledIcon).props().type).toEqual("locked");
    });
  });

  describe("when item button is clicked", () => {
    it("call the context with the expected arguments when isLastItem and isLastGroup", () => {
      const wrapper = render({
        type: "remove",
        onChange: jest.fn(),
        item: 1,
        listIndex: 1,
        groupIndex: 0,
        index: 1,
      });

      wrapper.find(StyledButton).props().onClick();

      expect(setElementToFocus).toHaveBeenCalledWith(1, 1, 0);
    });

    it("call the context with the expected arguments when isLastItem and isLastGroup are true", () => {
      const wrapper = render({
        type: "remove",
        onChange: jest.fn(),
        item: 1,
        listIndex: 1,
        groupIndex: 0,
        index: 1,
        isLastGroup: true,
        isLastItem: true,
      });

      wrapper.find(StyledButton).props().onClick();

      expect(setElementToFocus).toHaveBeenCalledWith(0, 0, undefined);
    });

    it("call the context with the expected arguments when isLastItem is true and isLastGroup is falsy", () => {
      const wrapper = render({
        type: "remove",
        onChange: jest.fn(),
        item: 1,
        listIndex: 1,
        groupIndex: 0,
        index: 0,
        isLastItem: true,
      });

      wrapper.find(StyledButton).props().onClick();

      expect(setElementToFocus).toHaveBeenCalledWith(0, 0, undefined);
    });
  });
});
