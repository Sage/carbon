import React from "react";
import { shallow, mount } from "enzyme";

import PicklistItem from "./picklist-item.component";
import { StyledButton } from "./picklist-item.style";
import StyledIcon from "../../icon/icon.style";

const index = 1;
const handleKeyboardAccessibilityFn = jest.fn();

const render = (props, renderer = shallow) => {
  return renderer(
    <PicklistItem
      index={index}
      handleKeyboardAccessibility={handleKeyboardAccessibilityFn}
      {...props}
    >
      Item content
    </PicklistItem>
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
      const wrapper = render(
        {
          type: "remove",
          onChange: jest.fn(),
          item: 1,
          locked: true,
        },
        mount
      );

      expect(wrapper.find(StyledIcon).props().type).toEqual("locked");
    });
  });
});
