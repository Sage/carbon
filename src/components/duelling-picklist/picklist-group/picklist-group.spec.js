import React from "react";
import { shallow, mount } from "enzyme";
import { act } from "react-dom/test-utils";

import PicklistGroup from "./picklist-group.component";
import PicklistItem from "../picklist-item/picklist-item.component";
import { StyledGroupButton } from "./picklist-group.style";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import { StyledButton } from "../picklist-item/picklist-item.style";

const index = 1;
const handleKeyboardAccessibilityFn = jest.fn();

const render = (props, renderer = shallow) => {
  return renderer(
    <PicklistGroup {...props}>
      <PicklistItem
        index={index}
        handleKeyboardAccessibility={handleKeyboardAccessibilityFn}
        type={props.type}
        onChange={() => null}
        item={1}
      >
        Item content
      </PicklistItem>
      <PicklistItem
        index={index}
        handleKeyboardAccessibility={handleKeyboardAccessibilityFn}
        type={props.type}
        onChange={() => null}
        item={2}
      >
        Item content
      </PicklistItem>
    </PicklistGroup>
  );
};

describe("PicklistGroup component", () => {
  describe("when type is 'add'", () => {
    it("should render an add icon in the button", () => {
      const wrapper = render({
        type: "add",
        title: "Title",
        onChange: () => null,
      });

      expect(wrapper.find(StyledGroupButton).at(0).props().iconType).toEqual(
        "add"
      );
    });
  });

  describe("when type is 'remove'", () => {
    it("should render a remove icon in the button", () => {
      const wrapper = render({
        type: "remove",
        title: "Title",
        onChange: () => null,
      });

      expect(wrapper.find(StyledGroupButton).at(0).props().iconType).toEqual(
        "remove"
      );
    });
  });

  describe("add/remove button", () => {
    const onChangeFn = jest.fn();

    afterEach(() => {
      jest.resetAllMocks();
    });

    describe("when clicked", () => {
      it("should call the onChange prop", () => {
        const wrapper = render(
          {
            type: "remove",
            title: "Title",
            onChange: onChangeFn,
          },
          mount
        );

        wrapper.find(StyledGroupButton).props().onClick();

        expect(onChangeFn).toHaveBeenCalled();
      });
    });

    describe("when enter key pressed", () => {
      it("should call the onChange prop", () => {
        const wrapper = render(
          {
            type: "remove",
            title: "Title",
            onChange: onChangeFn,
          },
          mount
        );

        wrapper.find(StyledGroupButton).simulate("keydown", { which: 13 });

        expect(onChangeFn).toHaveBeenCalled();
      });
    });

    describe("when space key pressed", () => {
      it("should call the onChange prop", () => {
        const wrapper = render(
          {
            type: "remove",
            title: "Title",
            onChange: onChangeFn,
          },
          mount
        );

        wrapper.find(StyledGroupButton).simulate("keydown", { which: 32 });

        expect(onChangeFn).toHaveBeenCalled();
      });
    });

    describe("when other key pressed", () => {
      it("should not call the onChange prop", () => {
        const wrapper = render(
          {
            type: "remove",
            title: "Title",
            onChange: onChangeFn,
          },
          mount
        );

        wrapper.find(StyledGroupButton).simulate("keydown", { which: 70 });

        expect(onChangeFn).not.toHaveBeenCalled();
      });
    });

    describe("when hovered over", () => {
      describe("when type is 'add'", () => {
        it("should change the background colour of PicklistItem buttons in the group", () => {
          const wrapper = render(
            {
              type: "add",
              title: "Title",
              onChange: onChangeFn,
            },
            mount
          );

          act(() => {
            wrapper.find(StyledGroupButton).props().onMouseEnter();
          });

          wrapper.update();

          assertStyleMatch(
            {
              background: "#006300",
            },
            wrapper,
            { modifier: `${StyledButton}` }
          );

          act(() => {
            wrapper.find(StyledGroupButton).props().onMouseLeave();
          });

          wrapper.update();

          assertStyleMatch(
            {
              background: "#008200",
            },
            wrapper.find(PicklistItem).at(0).find(StyledButton)
          );
        });
      });

      describe("when type is 'remove'", () => {
        it("should change the background colour of PicklistItem buttons in the group", () => {
          const wrapper = render(
            {
              type: "remove",
              title: "Title",
              onChange: onChangeFn,
            },
            mount
          );

          act(() => {
            wrapper.find(StyledGroupButton).props().onMouseEnter();
          });

          wrapper.update();

          assertStyleMatch(
            {
              background: "#9F2D3F",
            },
            wrapper,
            { modifier: `${StyledButton}` }
          );

          act(() => {
            wrapper.find(StyledGroupButton).props().onMouseLeave();
          });

          wrapper.update();

          assertStyleMatch(
            {
              background: "#C7384F",
            },
            wrapper.find(PicklistItem).at(0).find(StyledButton)
          );
        });
      });
    });

    describe("when button is focused", () => {
      describe("when type is 'add'", () => {
        it("should change the background colour of PicklistItem buttons in the group", () => {
          const wrapper = render(
            {
              type: "add",
              title: "Title",
              onChange: onChangeFn,
            },
            mount
          );

          act(() => {
            wrapper.find(StyledGroupButton).props().onFocus();
          });

          wrapper.update();

          assertStyleMatch(
            {
              background: "#006300",
            },
            wrapper,
            { modifier: `${StyledButton}` }
          );

          act(() => {
            wrapper.find(StyledGroupButton).props().onBlur();
          });

          wrapper.update();

          assertStyleMatch(
            {
              background: "#008200",
            },
            wrapper.find(PicklistItem).at(0).find(StyledButton)
          );
        });
      });

      describe("when type is 'remove'", () => {
        it("should change the background colour of PicklistItem buttons in the group", () => {
          const wrapper = render(
            {
              type: "remove",
              title: "Title",
              onChange: onChangeFn,
            },
            mount
          );

          act(() => {
            wrapper.find(StyledGroupButton).props().onFocus();
          });

          wrapper.update();

          assertStyleMatch(
            {
              background: "#9F2D3F",
            },
            wrapper,
            { modifier: `${StyledButton}` }
          );

          act(() => {
            wrapper.find(StyledGroupButton).props().onBlur();
          });

          wrapper.update();

          assertStyleMatch(
            {
              background: "#C7384F",
            },
            wrapper.find(PicklistItem).at(0).find(StyledButton)
          );
        });
      });
    });
  });
});
