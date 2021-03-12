import React, { useRef, useState } from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";

import SelectList from "./select-list.component";
import { StyledSelectList, StyledPopoverContainer } from "./select-list.style";
import { baseTheme } from "../../../style/themes";
import Option from "../option/option.component";
import OptionGroupHeader from "../option-group-header/option-group-header.component";
import ListActionButton from "../list-action-button/list-action-button.component";
import Loader from "../../loader";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import StyledSelectListContainer from "./select-list-container.style";
import Popover from "../../../__internal__/popover";
import I18next from "../../../__spec_helper__/I18next";

function RenderWrapper({ ...props }) {
  return (
    <I18next>
      <SelectList {...props} />
    </I18next>
  );
}

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
    const testContainer = document.createElement("div");
    const onSelectListCloseFn = jest.fn();
    const onSelectFn = jest.fn();

    testContainer.id = "enzymeContainer";
    document.body.appendChild(testContainer);

    beforeEach(() => {
      onSelectFn.mockReset();
      onSelectListCloseFn.mockReset();
      wrapper = mount(
        getSelectList({
          onSelectListClose: onSelectListCloseFn,
          onSelect: onSelectFn,
          filterText: "",
        }),
        { attachTo: testContainer }
      );
    });

    afterEach(() => {
      wrapper.detach();
    });

    afterAll(() => {
      document.body.removeChild(testContainer);
    });

    describe.each([
      ["Escape", escapeKeyDownEvent],
      ["Tab", tabKeyDownEvent],
      ["Enter", enterKeyDownEvent],
    ])("and it's the %s key", (keyName, keyEvent) => {
      it("then the onSelectListClose prop should be called", () => {
        testContainer.dispatchEvent(keyEvent);
        expect(onSelectListCloseFn).toHaveBeenCalled();
      });
    });

    describe("and it's the Enter key with an option highlighted", () => {
      it("then the onSelect prop should be called with expected data", () => {
        wrapper.setProps({ highlightedValue: "opt3" });
        testContainer.dispatchEvent(enterKeyDownEvent);

        expect(onSelectFn).toHaveBeenCalledWith({
          selectionType: "enterKey",
          text: "blue",
          value: "opt3",
        });
      });
    });

    describe("and it's the Down key", () => {
      describe("with no option highlighted", () => {
        it("then the onSelect prop should be called with expected data", () => {
          act(() => {
            testContainer.dispatchEvent(downKeyDownEvent);
          });

          expect(onSelectFn).toHaveBeenCalledWith({
            selectionType: "navigationKey",
            text: "red",
            value: "opt1",
          });
        });
      });

      describe("with the last option already highlighted", () => {
        it("then the onSelect prop should be called with expected data", () => {
          wrapper.setProps({ highlightedValue: "opt3" });

          act(() => {
            testContainer.dispatchEvent(downKeyDownEvent);
          });

          expect(onSelectFn).toHaveBeenCalledWith({
            selectionType: "navigationKey",
            text: "red",
            value: "opt1",
          });
        });

        describe("and isLoading prop set to true", () => {
          it("then the onSelect prop should not have been called", () => {
            wrapper.setProps({ highlightedValue: "opt3", isLoading: true });

            act(() => {
              testContainer.dispatchEvent(downKeyDownEvent);
              testContainer.dispatchEvent(downKeyDownEvent);
            });

            expect(onSelectFn).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe("and it's the Up key", () => {
      describe("with no option highlighted", () => {
        it("then the onSelect prop should be called with expected data", () => {
          act(() => {
            testContainer.dispatchEvent(upKeyDownEvent);
          });

          expect(onSelectFn).toHaveBeenCalledWith({
            selectionType: "navigationKey",
            text: "blue",
            value: "opt3",
          });
        });
      });

      describe("with the first option already highlighted", () => {
        it("then the onSelect prop should be called with expected data", () => {
          wrapper.setProps({ highlightedValue: "opt1" });

          act(() => {
            testContainer.dispatchEvent(upKeyDownEvent);
          });

          expect(onSelectFn).toHaveBeenCalledWith({
            selectionType: "navigationKey",
            text: "blue",
            value: "opt3",
          });
        });
      });
    });

    describe("and it's the Home key", () => {
      it("then the onSelect prop should be called with expected data", () => {
        act(() => {
          testContainer.dispatchEvent(homeKeyDownEvent);
        });

        expect(onSelectFn).toHaveBeenCalledWith({
          selectionType: "navigationKey",
          text: "red",
          value: "opt1",
        });
      });
    });

    describe("and it's the End key", () => {
      it("then the onSelect prop should be called with expected data", () => {
        act(() => {
          testContainer.dispatchEvent(endKeyDownEvent);
        });

        expect(onSelectFn).toHaveBeenCalledWith({
          selectionType: "navigationKey",
          text: "blue",
          value: "opt3",
        });
      });
    });

    it("does not highlight any option if the other key is pressed", () => {
      act(() => {
        testContainer.dispatchEvent(
          new KeyboardEvent("keydown", { key: "b", bubbles: true })
        );
      });

      expect(onSelectFn).not.toHaveBeenCalled();
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
    const testContainer = document.createElement("div");
    const onFocusFn = jest.fn();
    const mockAnchorElement = document.createElement("div");
    const mockInput = document.createElement("input");
    mockAnchorElement.appendChild(mockInput);
    const getBoundingClientRectMock = () => {
      return {
        width: 200,
      };
    };
    mockAnchorElement.getBoundingClientRect = getBoundingClientRectMock;
    mockInput.focus = onFocusFn;
    testContainer.id = "enzymeContainer";
    document.body.appendChild(testContainer);

    beforeEach(() => {
      wrapper = mount(getSelectList({ anchorElement: mockAnchorElement }), {
        attachTo: testContainer,
      });
    });

    afterEach(() => {
      wrapper.detach();
    });

    afterAll(() => {
      document.body.removeChild(testContainer);
    });

    it('then the popover container should have expected "width" value', () => {
      assertStyleMatch(
        { width: "208px" },
        wrapper.find(StyledPopoverContainer)
      );
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
          testContainer.dispatchEvent(keyEvent);
        });
        expect(onFocusFn).toHaveBeenCalled();
      });
    });
  });

  describe("when the isLoading prop is provided", () => {
    it("then a Loader Component should be rendered in the last element of the list", () => {
      const wrapper = renderSelectList({
        isLoading: true,
        onListAction: () => {},
      });
      expect(wrapper.find("li").last().find(Loader).exists()).toBe(true);
    });

    describe("with empty option list", () => {
      it("then the height of the dropdown should be 150px", () => {
        const EmptySelect = () => {
          const [options] = useState([]);

          return (
            <RenderWrapper
              value="red"
              onSelect={() => {}}
              onSelectListClose={() => {}}
              isLoading
            >
              {options}
            </RenderWrapper>
          );
        };
        const wrapper = mount(<EmptySelect />);

        assertStyleMatch(
          { minHeight: "150px" },
          wrapper.find(StyledSelectList)
        );

        wrapper.unmount();
      });
    });

    describe("and there is only one option", () => {
      it("that option should have the hidden prop", () => {
        const wrapper = mount(
          <RenderWrapper
            value="red"
            onSelect={() => {}}
            onSelectListClose={() => {}}
            isLoading
          >
            <Option value="opt1" text="red" />
          </RenderWrapper>
        );

        expect(wrapper.find(Option).first().prop("hidden")).toBe(true);
      });
    });
  });

  describe("when the onListScrollBottom prop is provided", () => {
    const testContainer = document.createElement("div");
    const onListScrollBottomFn = jest.fn();
    let wrapper;
    let listElement;

    testContainer.id = "enzymeContainer";
    document.body.appendChild(testContainer);

    beforeEach(() => {
      onListScrollBottomFn.mockReset();
      wrapper = mount(
        getSelectList({
          onListScrollBottom: onListScrollBottomFn,
          onListAction: () => {},
        }),
        { attachTo: testContainer }
      );
      listElement = wrapper.find(StyledSelectList).getDOMNode();
    });

    afterEach(() => {
      wrapper.detach();
    });

    afterAll(() => {
      document.body.removeChild(testContainer);
    });

    it("it should have been called when the element is scrolled to the bottom", () => {
      jest
        .spyOn(listElement, "scrollHeight", "get")
        .mockImplementation(() => 100);
      jest.spyOn(listElement, "scrollTop", "get").mockImplementation(() => 60);
      jest
        .spyOn(listElement, "clientHeight", "get")
        .mockImplementation(() => 40);
      listElement.dispatchEvent(new Event("scroll"));

      expect(onListScrollBottomFn).toHaveBeenCalled();
    });

    it("it should not have been called when the element is scrolled but does not reach the bottom", () => {
      jest
        .spyOn(listElement, "scrollHeight", "get")
        .mockImplementation(() => 100);
      jest.spyOn(listElement, "scrollTop", "get").mockImplementation(() => 50);
      jest
        .spyOn(listElement, "clientHeight", "get")
        .mockImplementation(() => 40);
      listElement.dispatchEvent(new Event("scroll"));

      expect(onListScrollBottomFn).not.toHaveBeenCalled();
    });

    it("it should not have been called when the element is scrolled but does not reach the bottom", () => {
      jest
        .spyOn(listElement, "scrollHeight", "get")
        .mockImplementation(() => 100);
      wrapper.setProps({ highlightedValue: "opt3", isLoading: true });
      expect(listElement.scrollTop).toBe(100);
    });
  });

  describe("when the children changes in the list", () => {
    it("container height should be set to expected value", () => {
      const testContainer = document.createElement("div");
      testContainer.id = "enzymeContainer";
      document.body.appendChild(testContainer);

      const wrapper = mount(
        getSelectList({
          onListAction: () => {},
        }),
        { attachTo: testContainer }
      );
      const listElement = wrapper.find(StyledSelectList).getDOMNode();
      jest
        .spyOn(listElement, "clientHeight", "get")
        .mockImplementation(() => 100);
      wrapper
        .setProps({
          children: [
            <Option value="opt1" text="red" />,
            <Option value="opt2" text="green" />,
            <Option value="opt3" text="blue" />,
            <Option value="opt4" text="white" />,
            <Option value="opt5" text="yellow" />,
          ],
        })
        .update();

      assertStyleMatch(
        { height: "100px" },
        wrapper.find(StyledSelectListContainer)
      );

      assertStyleMatch(
        { height: "100px" },
        wrapper.find(StyledPopoverContainer)
      );

      wrapper.detach();
      document.body.removeChild(testContainer);
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
      const testContainer = document.createElement("div");
      const onFocusFn = jest.fn();
      const onSelectFn = jest.fn();
      const expectedSelectValue = { selectionType: "tab" };

      document.body.appendChild(testContainer);

      beforeEach(() => {
        wrapper = renderSelectList(
          {
            listActionButton: true,
            onListAction: () => {},
            onSelect: onSelectFn,
          },
          mount,
          { attachTo: testContainer }
        );
      });

      afterEach(() => {
        wrapper.detach();
      });

      afterAll(() => {
        document.body.removeChild(testContainer);
      });

      it("then the focus function should have been called on the ListActionButton", () => {
        onFocusFn.mockClear();
        wrapper
          .find(ListActionButton)
          .find("button")
          .getDOMNode().focus = onFocusFn;
        act(() => {
          testContainer.dispatchEvent(tabKeyDownEvent);
        });
        expect(onFocusFn).toHaveBeenCalled();
      });

      describe("with the ListActionButton already focused", () => {
        it("then the onSelect function prop should have been called with expected value", () => {
          onSelectFn.mockClear();
          wrapper.find(ListActionButton).find("button").getDOMNode().focus();

          act(() => {
            testContainer.dispatchEvent(tabKeyDownEvent);
          });
          expect(onSelectFn).toHaveBeenCalledWith(expectedSelectValue);
        });
      });
    });

    describe("and the children changes in the list", () => {
      it("container height should be set to expected value", () => {
        const testWrapper = document.createElement("div");
        const wrapper = mount(
          getSelectList({
            listActionButton: true,
            onListAction: () => {},
          }),
          { attachTo: testWrapper }
        );
        const listElement = wrapper.find(StyledSelectList).getDOMNode();
        const listActionButtonElement = wrapper
          .find(ListActionButton)
          .getDOMNode();
        jest
          .spyOn(listElement, "clientHeight", "get")
          .mockImplementation(() => 100);
        jest
          .spyOn(listActionButtonElement, "clientHeight", "get")
          .mockImplementation(() => 50);
        wrapper
          .setProps({
            children: [
              <Option value="opt1" text="red" />,
              <Option value="opt2" text="green" />,
              <Option value="opt3" text="blue" />,
              <Option value="opt4" text="white" />,
              <Option value="opt5" text="yellow" />,
            ],
          })
          .update();
        assertStyleMatch(
          { height: "150px" },
          wrapper.find(StyledSelectListContainer)
        );
      });
    });
  });

  describe("popover", () => {
    it("renders SelectList as a child of Popover with disablePortal=undefined by default", () => {
      const wrapper = renderSelectList();
      expect(wrapper.find(Popover).find(StyledSelectList).exists()).toBe(true);
      expect(wrapper.find(Popover).props().disablePortal).toBe(undefined);
    });

    it("renders SelectList as a child of Popover with disablePortal=true when disablePortal prop is passed", () => {
      const wrapper = renderSelectList({ disablePortal: true });
      expect(wrapper.find(Popover).find(StyledSelectList).exists()).toBe(true);
      expect(wrapper.find(Popover).props().disablePortal).toBe(true);
    });

    it("renders StyledSelectListContainer with bottom:0 style when placement is passed as top", () => {
      const wrapper = mount(<StyledSelectListContainer placement="top" />);
      assertStyleMatch(
        {
          bottom: "0",
        },
        wrapper
      );
    });
  });

  describe("when non option elements are provided as children", () => {
    it("then isHighlighted prop should not be set on them", () => {
      const wrapper = mount(
        <RenderWrapper onSelect={() => {}} onSelectListClose={() => {}}>
          {false && ""}
          <li>not an option element</li>
        </RenderWrapper>
      );
      expect(wrapper.find("li").props().isHighlighted).toBe(undefined);
      wrapper.unmount();
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
      const onSelectFn = jest.fn();

      beforeEach(() => {
        wrapper = renderGroupedSelectList({ onSelect: onSelectFn });
        domNode = wrapper.getDOMNode();
        document.body.appendChild(domNode);
      });

      afterEach(() => {
        document.body.removeChild(domNode);
      });

      it("then the onSelect prop should have been called with expected data", () => {
        act(() => {
          domNode.dispatchEvent(downKeyDownEvent);
        });
        expect(onSelectFn).toHaveBeenCalledWith({
          selectionType: "navigationKey",
          text: "red",
          value: "opt1",
        });
      });
    });
  });
});

function renderSelectList(props = {}, renderer = mount, enzymeOptions = {}) {
  return renderer(getSelectList(props), enzymeOptions);
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
      <RenderWrapper
        ref={mockRef}
        {...defaultProps}
        {...props}
        {...wrapperProps}
      >
        <Option value="opt1" text="red" />
        <Option value="opt2" text="green" />
        <Option value="opt3" text="blue" />
      </RenderWrapper>
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
      <RenderWrapper
        ref={mockRef}
        {...defaultProps}
        {...props}
        {...wrapperProps}
      >
        <OptionGroupHeader label="Heading one" />
        <Option value="opt1" text="red" />
        <Option value="opt2" text="green" />
        <OptionGroupHeader label="Heading two" />
        <Option value="opt3" text="blue" />
        <Option value="opt4" text="black" />
      </RenderWrapper>
    );
  };

  return <WrapperComponent />;
}
