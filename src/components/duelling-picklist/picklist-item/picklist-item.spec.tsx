import React from "react";
import { mount } from "enzyme";

import PicklistItem, { PicklistItemProps } from "./picklist-item.component";
import { StyledButton, StyledPicklistItem } from "./picklist-item.style";
import StyledIcon from "../../icon/icon.style";
import FocusContext from "../__internal__/duelling-picklist.context";
import { assertStyleMatch } from "../../../__spec_helper__/__internal__/test-utils";
import CarbonProvider from "../../carbon-provider/carbon-provider.component";

const setElementToFocus = jest.fn();

const render = (props: Omit<PicklistItemProps, "children">, optOut = false) => {
  return mount(
    <CarbonProvider focusRedesignOptOut={optOut}>
      <FocusContext.Provider value={{ elementToFocus: {}, setElementToFocus }}>
        <PicklistItem {...props}>Item content</PicklistItem>
      </FocusContext.Provider>
    </CarbonProvider>
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

    it("has the expected styling when the focusRedesignOptOut flag is set", () => {
      const wrapper = render(
        {
          type: "remove",
          onChange: jest.fn(),
          item: 1,
          locked: true,
        },
        true
      );

      assertStyleMatch(
        {
          outline: "2px solid var(--colorsSemanticFocus500)",
        },
        wrapper.find(StyledIcon),
        { modifier: ":focus" }
      );
    });

    it("has the expected styling when the focusRedesignOptOut flag is not set", () => {
      const wrapper = render({
        type: "remove",
        onChange: jest.fn(),
        item: 1,
        locked: true,
      });

      assertStyleMatch(
        {
          boxShadow:
            "0px 0px 0px var(--borderWidth300) var(--colorsSemanticFocus500),0px 0px 0px var(--borderWidth600) var(--colorsUtilityYin090)",
          outline: "transparent 3px solid",
        },
        wrapper.find(StyledIcon),
        { modifier: ":focus" }
      );
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

  it("renders with the expected border radius styling", () => {
    assertStyleMatch(
      {
        borderRadius: "var(--borderRadius100)",
      },
      render({ type: "remove", onChange: () => {}, item: 1 }).find(
        StyledPicklistItem
      )
    );
  });
});
