import React, { useRef } from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";

import SelectList from "./select-list.component";
import StyledSelectList from "./select-list.style";
import { baseTheme } from "../../../style/themes";
import Option from "../option/option.component";
import OptionGroupHeader from "../option-group-header/option-group-header.component";
import Portal from "../../portal";
import ListActionButton from "../list-action-button/list-action-button.component";

const escapeKeyDownEvent = new KeyboardEvent("keydown", {
  key: "Escape",
  bubbles: true,
});
const tabKeyDownEvent = new KeyboardEvent("keydown", {
  key: "Tab",
  bubbles: true,
});
const enterKeyDownEvent = new KeyboardEvent("keydown", {
  key: "Enter",
  bubbles: true,
});
const downKeyDownEvent = new KeyboardEvent("keydown", {
  key: "ArrowDown",
  bubbles: true,
});
const upKeyDownEvent = new KeyboardEvent("keydown", {
  key: "ArrowUp",
  bubbles: true,
});
const homeKeyDownEvent = new KeyboardEvent("keydown", {
  key: "Home",
  bubbles: true,
});
const endKeyDownEvent = new KeyboardEvent("keydown", {
  key: "End",
  bubbles: true,
});

describe("SelectList", () => {
  describe("when a key is pressed", () => {
    let wrapper;
    let domNode;
    let onSelectListClose;
    let onSelect;

    beforeEach(() => {
      onSelectListClose = jest.fn();
      onSelect = jest.fn();
      wrapper = mount(
        getSelectList({ onSelectListClose, onSelect, filterText: "" })
      );
      domNode = wrapper.getDOMNode();
      document.body.appendChild(domNode);
    });

    afterEach(() => {
      document.body.removeChild(domNode);
    });

    describe.each([
      ["Escape", escapeKeyDownEvent],
      ["Tab", tabKeyDownEvent],
      ["Enter", enterKeyDownEvent],
    ])("and it's the %s key", (keyName, keyEvent) => {
      it("then the onSelectListClose prop should be called", () => {
        domNode.dispatchEvent(keyEvent);
        expect(onSelectListClose).toHaveBeenCalled();
      });
    });

    describe("and it's the Enter key with an option highlighted", () => {
      it("then the onSelect prop should be called with expected data", () => {
        wrapper.setProps({ highlightedValue: "opt3" });
        domNode.dispatchEvent(enterKeyDownEvent);
        expect(onSelect).toHaveBeenCalledWith({
          selectionType: "enterKey",
          text: "blue",
          value: "opt3",
        });
      });
    });

    describe("and it's the Down key", () => {
      describe("with no option highlighted", () => {
        it("then the first Option should be highlighted", () => {
          act(() => {
            domNode.dispatchEvent(downKeyDownEvent);
          });
          expect(wrapper.update().find(Option).first()).toHaveStyleRule(
            "background-color",
            baseTheme.select.selected
          );
        });
      });

      describe("double pressed", () => {
        it("then the second Option should be highlighted", () => {
          act(() => {
            domNode.dispatchEvent(downKeyDownEvent);
          });
          act(() => {
            domNode.dispatchEvent(downKeyDownEvent);
          });
          expect(wrapper.update().find(Option).at(1)).toHaveStyleRule(
            "background-color",
            baseTheme.select.selected
          );
        });
      });

      describe("with the last option already highlighted", () => {
        it("then the first Option should be highlighted", () => {
          wrapper.setProps({ highlightedValue: "opt3" });

          act(() => {
            domNode.dispatchEvent(downKeyDownEvent);
          });

          expect(wrapper.update().find(Option).first()).toHaveStyleRule(
            "background-color",
            baseTheme.select.selected
          );
        });
      });
    });

    describe("and it's the Up key", () => {
      describe("with no option highlighted", () => {
        it("then the last Option should be highlighted", () => {
          act(() => {
            domNode.dispatchEvent(upKeyDownEvent);
          });
          expect(wrapper.update().find(Option).last()).toHaveStyleRule(
            "background-color",
            baseTheme.select.selected
          );
        });
      });

      describe("double pressed", () => {
        it("then the second Option should be highlighted", () => {
          act(() => {
            domNode.dispatchEvent(upKeyDownEvent);
          });
          act(() => {
            domNode.dispatchEvent(upKeyDownEvent);
          });
          expect(wrapper.update().find(Option).at(1)).toHaveStyleRule(
            "background-color",
            baseTheme.select.selected
          );
        });
      });

      describe("with the first option already highlighted", () => {
        it("then the last Option should be highlighted", () => {
          wrapper.setProps({ highlightedValue: "opt1" });

          act(() => {
            domNode.dispatchEvent(upKeyDownEvent);
          });

          expect(wrapper.update().find(Option).last()).toHaveStyleRule(
            "background-color",
            baseTheme.select.selected
          );
        });
      });
    });

    describe("and it's the Home key", () => {
      it("then the first Option should be highlighted", () => {
        act(() => {
          domNode.dispatchEvent(homeKeyDownEvent);
        });
        expect(wrapper.update().find(Option).first()).toHaveStyleRule(
          "background-color",
          baseTheme.select.selected
        );
      });
    });

    describe("and it's the End key", () => {
      it("then the last Option should be highlighted", () => {
        act(() => {
          domNode.dispatchEvent(endKeyDownEvent);
        });
        expect(wrapper.update().find(Option).last()).toHaveStyleRule(
          "background-color",
          baseTheme.select.selected
        );
      });
    });

    it("does not highlight any option if the other key is pressed", () => {
      act(() => {
        domNode.dispatchEvent(
          new KeyboardEvent("keydown", { key: "b", bubbles: true })
        );
      });
      const options = wrapper.find(Option);

      options.forEach((option) => {
        expect(option).toHaveStyleRule("background-color", undefined);
      });
    });
  });

  describe("when rendered", () => {
    it('then Options should have additional "isHighlighted" prop', () => {
      const onSelect = jest.fn();
      const wrapper = renderSelectList({ onSelect });

      expect(wrapper.find(Option).first().prop("isHighlighted")).toBe(false);
    });

    describe("and the first option has been clicked", () => {
      it('then the "onSelect" prop should have been called with option data and "selectionType" as "click"', () => {
        const onSelect = jest.fn();
        const wrapper = renderSelectList({ onSelect });

        wrapper.find(Option).first().simulate("click");
        expect(onSelect).toHaveBeenCalledWith({
          selectionType: "click",
          text: "red",
          value: "opt1",
        });
      });
    });
  });

  describe("when the filterText is provided", () => {
    it("then the first element with text that is matching the filter should be highlighted", () => {
      const wrapper = renderSelectList({ filterText: "g" });

      expect(wrapper.find(Option).at(1)).toHaveStyleRule(
        "background-color",
        baseTheme.select.selected
      );
    });

    describe("and it does not match the text of any option", () => {
      it('then Options should have the "isHighlighted" prop set to "false"', () => {
        const wrapper = renderSelectList({ filterText: "x" });

        wrapper
          .update()
          .find(Option)
          .forEach((option) => {
            expect(option.prop("isHighlighted")).toBe(false);
          });
      });
    });
  });

  describe("when the anchor element is provided", () => {
    let wrapper;
    let domNode;
    const onFocusFn = jest.fn();
    const mockAnchorElement = document.createElement("div");
    const mockInput = document.createElement("input");
    mockAnchorElement.appendChild(mockInput);
    const getBoundingClientRectMock = () => {
      return {
        top: 100,
        left: 100,
        width: 200,
        height: 50,
      };
    };
    mockAnchorElement.getBoundingClientRect = getBoundingClientRectMock;
    mockInput.focus = onFocusFn;

    beforeEach(() => {
      wrapper = mount(getSelectList({ anchorElement: mockAnchorElement }));
      domNode = wrapper.getDOMNode();
      document.body.appendChild(domNode);
    });

    afterEach(() => {
      document.body.removeChild(domNode);
    });

    it('then the list wrapper should have expected "top", "left" and "width" values', () => {
      const listWrapperSelector = 'div[data-element="select-list-wrapper"]';
      expect(
        wrapper.find("Portal").find(listWrapperSelector).getDOMNode().style.top
      ).toBe("150px");
      expect(
        wrapper.find("Portal").find(listWrapperSelector).getDOMNode().style.left
      ).toBe("96px");
      expect(
        wrapper.find("Portal").find(listWrapperSelector).getDOMNode().style
          .width
      ).toBe("208px");
    });

    describe.each([
      ["Up", upKeyDownEvent],
      ["Down", downKeyDownEvent],
      ["Home", homeKeyDownEvent],
      ["End", endKeyDownEvent],
    ])("and then the %s key is pressed", (key, keyEvent) => {
      it("then the focus function should have been called on the anchor element", () => {
        onFocusFn.mockClear();
        act(() => {
          domNode.dispatchEvent(keyEvent);
        });
        expect(onFocusFn).toHaveBeenCalled();
      });
    });
  });

  describe("when the listActionButton prop is provided", () => {
    it("then the ListActionButton should be rendered", () => {
      const wrapper = renderSelectList({
        listActionButton: true,
        onListAction: () => {},
      });
      expect(wrapper.find(ListActionButton).exists()).toBe(true);
      wrapper.unmount();
    });

    describe("when the anchor element is provided", () => {
      let wrapper;
      let domNode;
      const onFocusFn = jest.fn();
      const onSelectFn = jest.fn();
      const expectedSelectValue = { selectionType: "tab" };

      beforeEach(() => {
        wrapper = renderSelectList({
          listActionButton: true,
          onListAction: () => {},
          onSelect: onSelectFn,
        });
        domNode = wrapper.getDOMNode();
        document.body.appendChild(domNode);
      });

      afterEach(() => {
        document.body.removeChild(domNode);
      });

      it("then the focus function should have been called on the ListActionButton", () => {
        onFocusFn.mockClear();
        wrapper
          .find(ListActionButton)
          .find("button")
          .getDOMNode().focus = onFocusFn;
        act(() => {
          domNode.dispatchEvent(tabKeyDownEvent);
        });
        expect(onFocusFn).toHaveBeenCalled();
      });

      describe("with the ListActionButton already focused", () => {
        it("then the onSelect function prop should have been called with expected value", () => {
          onSelectFn.mockClear();
          wrapper.find(ListActionButton).find("button").getDOMNode().focus();

          act(() => {
            domNode.dispatchEvent(tabKeyDownEvent);
          });
          expect(onSelectFn).toHaveBeenCalledWith(expectedSelectValue);
        });
      });
    });
  });

  describe("portal", () => {
    it("renders SelectList as a child of portal by default", () => {
      const wrapper = renderSelectList();
      expect(wrapper.find(Portal).find(StyledSelectList).exists()).toBe(true);
    });

    it("does not render portal when disablePortal is passed", () => {
      const wrapper = renderSelectList({ disablePortal: true });
      expect(wrapper.find(Portal).exists()).toBe(false);
    });
  });

  describe("with option headings", () => {
    it("renders the select list with headings", () => {
      const wrapper = renderGroupedSelectList();
      expect(wrapper.find(OptionGroupHeader).length).toEqual(2);
    });

    describe("when the down key is pressed", () => {
      let wrapper;
      let domNode;

      beforeEach(() => {
        wrapper = renderGroupedSelectList();
        domNode = wrapper.getDOMNode();
        document.body.appendChild(domNode);
      });

      afterEach(() => {
        document.body.removeChild(domNode);
      });

      it("then the first Option should be highlighted", () => {
        act(() => {
          domNode.dispatchEvent(downKeyDownEvent);
        });
        expect(wrapper.update().find(Option).first()).toHaveStyleRule(
          "background-color",
          baseTheme.select.selected
        );
      });
    });
  });
});

function renderSelectList(props = {}, renderer = mount) {
  return renderer(getSelectList(props));
}

function renderGroupedSelectList(props = {}, renderer = mount) {
  return renderer(getGroupedSelectList(props));
}

function getSelectList(props) {
  const defaultProps = {
    onSelect: () => {},
    onSelectListClose: () => {},
  };

  const WrapperComponent = (wrapperProps) => {
    const mockRef = useRef();

    return (
      <SelectList ref={mockRef} {...defaultProps} {...props} {...wrapperProps}>
        <Option value="opt1" text="red" />
        <Option value="opt2" text="green" />
        <Option value="opt3" text="blue" />
      </SelectList>
    );
  };

  return <WrapperComponent />;
}

function getGroupedSelectList(props) {
  const defaultProps = {
    onSelect: () => {},
    onSelectListClose: () => {},
  };

  const WrapperComponent = (wrapperProps) => {
    const mockRef = useRef();

    return (
      <SelectList ref={mockRef} {...defaultProps} {...props} {...wrapperProps}>
        <OptionGroupHeader label="Heading one" />
        <Option value="opt1" text="red" />
        <Option value="opt2" text="green" />
        <OptionGroupHeader label="Heading two" />
        <Option value="opt3" text="blue" />
        <Option value="opt4" text="black" />
      </SelectList>
    );
  };

  return <WrapperComponent />;
}
