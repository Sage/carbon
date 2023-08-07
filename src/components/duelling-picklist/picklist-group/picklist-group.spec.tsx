import React, { useState } from "react";
import { shallow, mount } from "enzyme";
import { act } from "react-dom/test-utils";

import PicklistGroup, { PicklistGroupProps } from "./picklist-group.component";
import PicklistItem from "../picklist-item/picklist-item.component";
import { StyledGroupButton } from "./picklist-group.style";
import FocusContext from "../duelling-picklist.context";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import { StyledButton } from "../picklist-item/picklist-item.style";

const setElementToFocus = jest.fn();
const index = 0;

const render = (
  props: Omit<PicklistGroupProps, "children">,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderer: any = shallow
) => {
  const defaultContextValues = {
    setElementToFocus,
    elementToFocus: {},
  };
  return renderer(
    <FocusContext.Provider value={defaultContextValues}>
      <PicklistGroup index={index} listIndex={index} {...props}>
        <PicklistItem type={props.type} onChange={() => null} item={1}>
          Item content
        </PicklistItem>
        <PicklistItem type={props.type} onChange={() => null} item={2}>
          Item content
        </PicklistItem>
      </PicklistGroup>
    </FocusContext.Provider>
  );
};

describe("PicklistGroup component", () => {
  describe("when type is 'add'", () => {
    it("should render an add icon in the button", () => {
      const wrapper = render(
        {
          type: "add",
          title: "Title",
          onChange: () => null,
        },
        mount
      );

      expect(wrapper.find(StyledGroupButton).at(0).props().iconType).toEqual(
        "add"
      );
    });
  });

  describe("when type is 'remove'", () => {
    it("should render a remove icon in the button", () => {
      const wrapper = render(
        {
          type: "remove",
          title: "Title",
          onChange: () => null,
        },
        mount
      );

      expect(wrapper.find(StyledGroupButton).at(0).props().iconType).toEqual(
        "remove"
      );
    });
  });

  describe("add/remove button", () => {
    const onChangeFn = jest.fn();

    afterEach(() => {
      onChangeFn.mockReset();
      setElementToFocus.mockReset();
    });

    describe("when clicked", () => {
      it("should call the onChange prop and the setElementToFocus context callback", () => {
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
        expect(setElementToFocus).toHaveBeenCalledWith(0, 0);
      });
    });

    describe("when enter key pressed", () => {
      it("should call the onChange prop and the setElementToFocus context callback", () => {
        const wrapper = render(
          {
            type: "remove",
            title: "Title",
            onChange: onChangeFn,
          },
          mount
        );

        wrapper.find(StyledGroupButton).simulate("keydown", { key: "Enter" });

        expect(onChangeFn).toHaveBeenCalled();
        expect(setElementToFocus).toHaveBeenCalledWith(0, 0);
      });
    });

    describe("when space key pressed", () => {
      it("should call the onChange prop and the setElementToFocus context callback", () => {
        const wrapper = render(
          {
            type: "remove",
            title: "Title",
            onChange: onChangeFn,
          },
          mount
        );

        wrapper.find(StyledGroupButton).simulate("keydown", { key: " " });

        expect(onChangeFn).toHaveBeenCalled();
        expect(setElementToFocus).toHaveBeenCalledWith(0, 0);
      });
    });

    describe("when other key pressed", () => {
      it("should not call the onChange prop or the setElementToFocus context callback", () => {
        const wrapper = render(
          {
            type: "remove",
            title: "Title",
            onChange: onChangeFn,
          },
          mount
        );

        wrapper.find(StyledGroupButton).simulate("keydown", { key: "a" });

        expect(onChangeFn).not.toHaveBeenCalled();
        expect(setElementToFocus).not.toHaveBeenCalled();
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
              background: "var(--colorsActionMajor600)",
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
              background: "var(--colorsActionMajor500)",
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
              background: "var(--colorsSemanticNegative600)",
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
              background: "var(--colorsSemanticNegative500)",
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
              background: "var(--colorsActionMajor600)",
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
              background: "var(--colorsActionMajor500)",
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
              background: "var(--colorsSemanticNegative600)",
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
              background: "var(--colorsSemanticNegative500)",
            },
            wrapper.find(PicklistItem).at(0).find(StyledButton)
          );
        });
      });
    });
  });

  describe("children", () => {
    it("does not throw when incorrect children are provided", () => {
      expect(() => {
        const defaultContextValues = {
          setElementToFocus,
          elementToFocus: {},
        };
        mount(
          <FocusContext.Provider value={defaultContextValues}>
            <PicklistGroup
              index={index}
              listIndex={index}
              title="Title"
              onChange={() => {}}
              type="add"
            >
              invalid
            </PicklistGroup>
          </FocusContext.Provider>
        );
      }).not.toThrow();
    });
  });

  describe("focus behavior", () => {
    const MockComponent = (props: Partial<PicklistGroupProps>) => {
      const [focused, setFocused] = useState({});
      const elementToFocus = (
        itemIndex?: number,
        listIndex?: number,
        groupIndex?: number
      ) => {
        setFocused({ itemIndex, listIndex, groupIndex });
        setElementToFocus(itemIndex, listIndex, groupIndex);
      };

      return (
        <FocusContext.Provider
          value={{ setElementToFocus: elementToFocus, elementToFocus: focused }}
        >
          <PicklistGroup
            title="Title"
            type="add"
            onChange={() => null}
            index={index}
            listIndex={index}
            {...props}
          >
            <PicklistItem type="add" onChange={() => null} item={1}>
              Item content
            </PicklistItem>
            <PicklistItem type="add" onChange={() => null} item={2}>
              Item content
            </PicklistItem>
          </PicklistGroup>
        </FocusContext.Provider>
      );
    };

    describe("when the first item button is clicked", () => {
      it("calls the context callback with the correct parameters", () => {
        const wrapper = mount(<MockComponent />);
        act(() => {
          wrapper.find(StyledButton).first().props().onClick();
        });

        expect(setElementToFocus).toHaveBeenCalledWith(0, 0, 0);
      });
    });

    describe("when the last item button is clicked", () => {
      it("calls the context callback with the correct parameters", () => {
        const wrapper = mount(<MockComponent />);
        act(() => {
          wrapper.find(StyledButton).last().props().onClick();
        });

        expect(setElementToFocus).toHaveBeenCalledWith(1, 0, undefined);
      });
    });
  });
});
