import React, { useRef, useState } from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";

import SelectList from "./select-list.component";
import {
  StyledSelectList,
  StyledSelectListTableHeader,
} from "./select-list.style";
import StyledSelectListContainer from "./select-list-container.style";
import Option from "../option/option.component";
import OptionRow from "../option-row/option-row.component";
import OptionGroupHeader from "../option-group-header/option-group-header.component";
import ListActionButton from "../list-action-button/list-action-button.component";
import Loader from "../../loader";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import Popover from "../../../__internal__/popover";
import * as guidModule from "../../../__internal__/utils/helpers/guid";
import StyledOption from "../option/option.style";
import StyledOptionRow from "../option-row/option-row.style";

const mockedGuid = "guid-12345";
const guidSpy = jest.spyOn(guidModule, "default");
guidSpy.mockImplementation(() => "guid-12345");

const escapeKeyUpEvent = new KeyboardEvent("keyup", {
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
const spaceKeyUpEvent = new KeyboardEvent("keyup", {
  key: "Space",
  bubbles: true,
});

describe("SelectList", () => {
  describe.each([getSelectList, getOptionRowSelectList])(
    "when a key is pressed",
    (listGetter) => {
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
          listGetter({
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
        ["Escape", escapeKeyUpEvent],
        ["Tab", tabKeyDownEvent],
        ["Enter", enterKeyDownEvent],
      ])("and it's the %s key", (_, keyEvent) => {
        it("then the onSelectListClose prop should be called", () => {
          testContainer.dispatchEvent(keyEvent);
          expect(onSelectListCloseFn).toHaveBeenCalled();
        });
      });

      describe("and it's a Space key", () => {
        it("then the onSelectListClose prop should not be called", () => {
          testContainer.dispatchEvent(spaceKeyUpEvent);
          expect(onSelectListCloseFn).not.toHaveBeenCalled();
        });
      });

      describe("and it's the Enter key", () => {
        it("then should call a preventDefault function", () => {
          const spy = jest.spyOn(enterKeyDownEvent, "preventDefault");
          testContainer.dispatchEvent(enterKeyDownEvent);

          expect(spy).toHaveBeenCalled();
        });

        describe("with an option highlighted", () => {
          it("then the onSelect prop should be called with expected data", () => {
            wrapper.setProps({ highlightedValue: "opt3" });
            testContainer.dispatchEvent(enterKeyDownEvent);

            expect(onSelectFn).toHaveBeenCalledWith({
              id: mockedGuid,
              selectionType: "enterKey",
              text: "blue",
              value: "opt3",
            });
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
              id: mockedGuid,
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
              id: mockedGuid,
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
              id: mockedGuid,
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
              id: mockedGuid,
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
            id: mockedGuid,
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
            id: mockedGuid,
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
    }
  );

  describe.each([
    ["Option", renderSelectList, StyledOption],
    ["OptionRow", renderOptionRowSelectList, StyledOptionRow],
  ])("when %s is rendered", (component, listRenderer, optionType) => {
    it('then Options should have additional "isHighlighted" prop', () => {
      const onSelect = jest.fn();
      const wrapper = listRenderer({ onSelect });

      expect(wrapper.find(optionType).first().prop("isHighlighted")).toBe(
        false
      );
    });

    describe("and the first option has been clicked", () => {
      it('then the "onSelect" prop should have been called with option data and "selectionType" as "click"', () => {
        const onSelect = jest.fn();
        const wrapper = listRenderer({ onSelect });

        wrapper.find(optionType).first().simulate("click");
        expect(onSelect).toHaveBeenCalledWith({
          id: mockedGuid,
          selectionType: "click",
          text: "red",
          value: "opt1",
        });
      });
    });
  });

  describe.each([
    ["Option", renderSelectList, StyledOption],
    ["OptionRow", renderOptionRowSelectList, StyledOptionRow],
  ])(
    "when the filterText is provided in a list of %s components",
    (component, listRenderer, optionType) => {
      it("then the first element with text that is matching the filter should be highlighted", () => {
        const wrapper = listRenderer({ filterText: "g" });

        expect(wrapper.find(optionType).at(1)).toHaveStyleRule(
          "background-color",
          "var(--colorsUtilityMajor200)"
        );
      });

      describe("and it does not match the text of any option", () => {
        it('then Options should have the "isHighlighted" prop set to "false"', () => {
          const wrapper = listRenderer({ filterText: "x" });

          wrapper
            .update()
            .find(optionType)
            .forEach((option) => {
              expect(option.prop("isHighlighted")).toBe(false);
            });
        });
      });
    }
  );

  describe("when the anchor element is provided", () => {
    let wrapper;
    const testContainer = document.createElement("div");
    const onFocusFn = jest.fn();
    const mockAnchorElement = document.createElement("div");
    const mockInput = document.createElement("input");
    mockAnchorElement.appendChild(mockInput);

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

  describe("when the options list is empty and a highlightedValue is passed", () => {
    let wrapper;
    const renderWrapper = () => {
      const emptySelect = getLoadingSelectList({
        highlightedValue: "opt2",
        isLoading: true,
      });
      wrapper = mount(emptySelect);
    };

    afterEach(() => {
      wrapper.unmount();
    });

    it("should not crash", () => {
      expect(renderWrapper).not.toThrow();
    });

    it("should highlight the correct value if the children are later updated", () => {
      renderWrapper();
      wrapper.setProps({ isLoading: false });
      wrapper.update();
      expect(wrapper.find(StyledOption).at(1).props().isHighlighted).toBe(true);
    });
  });

  describe("when the isLoading prop is provided", () => {
    it("then a Loader Component should be rendered", () => {
      const wrapper = renderSelectList({
        isLoading: true,
        onListAction: () => {},
        loaderDataRole: "select-list-loader",
      });
      expect(wrapper.find(Loader).exists()).toBe(true);
      expect(wrapper.find(Loader).prop("data-role")).toEqual(
        "select-list-loader"
      );
    });

    it("and is in multiColum mode, then a Loader Component should be rendered", () => {
      const wrapper = renderOptionRowSelectList({
        isLoading: true,
        onListAction: () => {},
      });
      expect(wrapper.find(Loader).exists()).toBe(true);
    });

    describe("with empty option list", () => {
      it("then the height of the dropdown should be 150px", () => {
        const EmptySelect = () => {
          const [options] = useState([]);
          const ref = useRef();

          return (
            <SelectList
              value="red"
              onSelect={() => {}}
              onSelectListClose={() => {}}
              isLoading
              isOpen
              ref={ref}
            >
              {options}
            </SelectList>
          );
        };
        const wrapper = mount(<EmptySelect />);

        assertStyleMatch(
          { minHeight: "150px" },
          wrapper.find(StyledSelectListContainer)
        );

        wrapper.unmount();
      });
    });

    describe.each([true, false])(
      "and there is only one option",
      (multiColumn) => {
        it("that option should have the hidden prop", () => {
          const SelectWithOneOption = () => {
            const ref = useRef();
            return (
              <SelectList
                value="red"
                onSelect={() => {}}
                onSelectListClose={() => {}}
                multiColumn={multiColumn}
                isLoading
                isOpen
                ref={ref}
              >
                {multiColumn ? (
                  <OptionRow id="1" value="opt1" text="red">
                    <td>foo</td>
                  </OptionRow>
                ) : (
                  <Option value="opt1" text="red" />
                )}
              </SelectList>
            );
          };

          const wrapper = mount(<SelectWithOneOption />);

          expect(
            wrapper
              .find(multiColumn ? OptionRow : Option)
              .first()
              .prop("hidden")
          ).toBe(true);
        });
      }
    );
  });

  describe("when the onListScrollBottom prop is provided", () => {
    const testContainer = document.createElement("div");
    const onListScrollBottomFn = jest.fn();
    let wrapper;
    let listWrapperElement;

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
      listWrapperElement = wrapper.find(StyledSelectListContainer).getDOMNode();
    });

    afterEach(() => {
      wrapper.detach();
    });

    afterAll(() => {
      document.body.removeChild(testContainer);
    });

    it("it should have been called when the element is scrolled to the bottom", () => {
      jest
        .spyOn(listWrapperElement, "scrollHeight", "get")
        .mockImplementation(() => 100);
      jest
        .spyOn(listWrapperElement, "scrollTop", "get")
        .mockImplementation(() => 60);
      jest
        .spyOn(listWrapperElement, "clientHeight", "get")
        .mockImplementation(() => 40);

      listWrapperElement.dispatchEvent(new Event("scroll"));

      expect(onListScrollBottomFn).toHaveBeenCalled();
    });

    it("it should not have been called when the element is scrolled but does not reach the bottom", () => {
      jest
        .spyOn(listWrapperElement, "scrollHeight", "get")
        .mockImplementation(() => 100);
      jest
        .spyOn(listWrapperElement, "scrollTop", "get")
        .mockImplementation(() => 50);
      jest
        .spyOn(listWrapperElement, "clientHeight", "get")
        .mockImplementation(() => 40);
      listWrapperElement.dispatchEvent(new Event("scroll"));

      expect(onListScrollBottomFn).not.toHaveBeenCalled();
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
  });

  describe("popover", () => {
    it("renders Popover with correct props", () => {
      const wrapper = renderSelectList();

      expect(wrapper.find(Popover).props().disableBackgroundUI).toBe(true);
      expect(wrapper.find(Popover).props().animationFrame).toBe(true);
      expect(wrapper.find(Popover).props().middleware[0]).toMatchObject({
        name: "offset",
        options: 3,
      });
      expect(wrapper.find(Popover).props().middleware[1]).toMatchObject({
        name: "size",
      });
      expect(wrapper.find(Popover).props().middleware[2]).toMatchObject({
        name: "flip",
      });
    });
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

    it.each(["top", "bottom", "right", "left"])(
      "passes listPlacement prop as a placement prop",
      (listPlacement) => {
        const wrapper = renderSelectList({ listPlacement });

        expect(wrapper.find(Popover).prop("placement")).toBe(listPlacement);
      }
    );
  });

  describe("when non option elements are provided as children", () => {
    it("then isHighlighted prop should not be set on them", () => {
      const SelectWithNonOptionChildren = () => {
        const ref = useRef();
        return (
          <SelectList
            onSelect={() => {}}
            onSelectListClose={() => {}}
            isOpen
            ref={ref}
          >
            {false && ""}
            <li>not an option element</li>
          </SelectList>
        );
      };
      const wrapper = mount(<SelectWithNonOptionChildren />);
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
          id: mockedGuid,
          selectionType: "navigationKey",
          text: "red",
          value: "opt1",
        });
      });
    });
  });

  describe("multiColumn mode", () => {
    const originalOffsetWidth = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "offsetWidth"
    );
    const originalClientWidth = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "clientWidth"
    );

    afterAll(() => {
      if (originalOffsetWidth) {
        Object.defineProperty(
          HTMLElement.prototype,
          "offsetWidth",
          originalOffsetWidth
        );
      }

      if (originalClientWidth) {
        Object.defineProperty(
          HTMLElement.prototype,
          "clientWidth",
          originalClientWidth
        );
      }
    });

    it("aligns the column if needed", () => {
      Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
        configurable: true,
        value: 20,
      });
      Object.defineProperty(HTMLElement.prototype, "clientWidth", {
        configurable: true,
        value: 10,
      });

      const wrapper = renderOptionRowSelectList();
      assertStyleMatch(
        {
          width: "calc(100% - 10px)",
        },
        wrapper.find(StyledSelectListTableHeader),
        {
          modifier: "tr",
        }
      );
    });
  });

  describe("ARIA", () => {
    describe("when labelId prop is provided", () => {
      guidSpy.mockImplementationOnce(() => "labelId-guid");
      const labelId = guidSpy();

      it("set aria-labelledby to it", () => {
        const wrapper = renderSelectList({ labelId });
        const ariaLabelledBy = wrapper
          .find(StyledSelectList)
          .prop("aria-labelledby");
        expect(ariaLabelledBy).toEqual(labelId);
      });
    });

    describe("when labelId is undefined", () => {
      it("do not set aria-labelledby", () => {
        const wrapper = renderSelectList({ labelId: undefined });
        const ariaLabelledBy = wrapper
          .find(StyledSelectList)
          .prop("aria-labelledby");
        expect(ariaLabelledBy).toEqual(undefined);
      });
    });

    describe("aria-posinset and aria-setsize", () => {
      let wrapper;

      beforeEach(() => {
        wrapper = renderWithVirtualScrollAndGroupHeaders();
      });

      afterEach(() => {
        wrapper.unmount();
      });

      it("are set on the Option children, with aria-posinset going up in sequence", () => {
        const totalOptions = "10000";
        const optionChildren = wrapper.find(Option);
        const ninthOption = optionChildren.at(8).getDOMNode();
        expect(ninthOption.getAttribute("aria-setsize")).toBe(totalOptions);
        expect(ninthOption.getAttribute("aria-posinset")).toBe("9");
        const twelfthOption = optionChildren.at(11).getDOMNode();
        expect(twelfthOption.getAttribute("aria-setsize")).toBe(totalOptions);
        expect(twelfthOption.getAttribute("aria-posinset")).toBe("12");
      });

      it("are not set on the other children", () => {
        const groupHeader = wrapper.find(OptionGroupHeader).at(0).getDOMNode();
        expect(groupHeader.getAttribute("aria-setsize")).toBe(null);
        expect(groupHeader.getAttribute("aria-posinset")).toBe(null);
      });
    });
  });

  describe("virtual scrolling", () => {
    let wrapper;

    afterEach(() => {
      wrapper.unmount();
    });

    it("when enableVirtualScroll prop is not set, all options are rendered", () => {
      wrapper = renderWithVirtualScroll(200, false, undefined);
      const optionChildren = wrapper.find(Option);
      expect(optionChildren.length).toBe(200);
    });

    it("when enableVirtualScroll and virtualScrollOverscan props are both set, only the specified number of options are rendered", () => {
      wrapper = renderWithVirtualScroll(10000, true, 20);
      const optionChildren = wrapper.find(Option);
      // can't predict the exact number rendered as the 20 is a buffer either side of the visible ones
      // - so just check the total is between 20 and 30
      expect(optionChildren.length).toBeGreaterThanOrEqual(20);
      expect(optionChildren.length).toBeLessThan(30);
    });

    it("when enableVirtualScroll prop is set and virtualScrollOverscan is not, the overscan defaults to 5", () => {
      wrapper = renderWithVirtualScroll(10000, true, undefined);
      const optionChildren = wrapper.find(Option);
      // can't predict the exact number rendered as the 5 is a buffer either side of the visible ones
      // - so just check the total is between 5 and 10
      expect(optionChildren.length).toBeGreaterThanOrEqual(5);
      expect(optionChildren.length).toBeLessThan(10);
    });
  });

  describe("IDs are stable over the component's lifecycle", () => {
    let wrapper;
    let optionIds;

    beforeEach(() => {
      guidSpy.mockRestore();
      wrapper = renderSelectList({ isOpen: false });
      optionIds = wrapper
        .find(Option)
        .map((option) => option.getDOMNode().getAttribute("id"));
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("when the list is opened for the first time", () => {
      wrapper.setProps({ open: true });
      wrapper.update();
      const currentOptionIds = wrapper
        .find(Option)
        .map((option) => option.getDOMNode().getAttribute("id"));
      expect(currentOptionIds).toEqual(optionIds);
    });

    it("when the list is opened and then closed", () => {
      wrapper.setProps({ open: true });
      wrapper.update();
      wrapper.setProps({ open: false });
      wrapper.update();
      const currentOptionIds = wrapper
        .find(Option)
        .map((option) => option.getDOMNode().getAttribute("id"));
      expect(currentOptionIds).toEqual(optionIds);
    });

    it("when the list is opened, closed and then re-opened", () => {
      wrapper.setProps({ open: true });
      wrapper.update();
      wrapper.setProps({ open: false });
      wrapper.update();
      wrapper.setProps({ open: true });
      wrapper.update();
      const currentOptionIds = wrapper
        .find(Option)
        .map((option) => option.getDOMNode().getAttribute("id"));
      expect(currentOptionIds).toEqual(optionIds);
    });
  });
});

function renderSelectList(props = {}, renderer = mount, enzymeOptions = {}) {
  return renderer(getSelectList(props), enzymeOptions);
}

function renderOptionRowSelectList(
  props = {},
  renderer = mount,
  enzymeOptions = {}
) {
  return renderer(getOptionRowSelectList(props), enzymeOptions);
}

function renderGroupedSelectList(props = {}, renderer = mount) {
  return renderer(getGroupedSelectList(props));
}

function renderWithVirtualScroll(totalItems, enableVirtualScroll, overscan) {
  const options = Array(totalItems)
    .fill()
    .map((_, index) => (
      <Option key={index} value={`${index}`} text={`Option ${index + 1}`} />
    ));
  const SelectListWithManyOptions = () => {
    const mockRef = useRef();

    return (
      <SelectList
        ref={mockRef}
        open
        enableVirtualScroll={enableVirtualScroll}
        virtualScrollOverscan={overscan}
      >
        {options}
      </SelectList>
    );
  };
  return mount(<SelectListWithManyOptions />);
}

function renderWithVirtualScrollAndGroupHeaders() {
  const children = Array(11000)
    .fill()
    .map((_, index) =>
      index % 11 === 0 ? (
        <OptionGroupHeader
          key={index}
          label={`Group ${index / 11 + 1}`}
          icon="individual"
        />
      ) : (
        <Option
          key={index}
          value={`${index}`}
          text={`Option ${index - Math.floor(index / 11)}`}
        />
      )
    );

  const SelectListWithManyOptions = () => {
    const mockRef = useRef();

    return (
      <SelectList
        ref={mockRef}
        open
        enableVirtualScroll
        virtualScrollOverscan={20}
      >
        {children}
      </SelectList>
    );
  };
  return mount(<SelectListWithManyOptions />);
}

function getSelectList(props) {
  const defaultProps = {
    onSelect: () => {},
    onSelectListClose: () => {},
    isOpen: true,
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

function getOptionRowSelectList(props) {
  const defaultProps = {
    onSelect: () => {},
    onSelectListClose: () => {},
    isOpen: true,
  };

  const WrapperComponent = (wrapperProps) => {
    const mockRef = useRef();

    return (
      <SelectList
        multiColumn
        ref={mockRef}
        {...defaultProps}
        {...props}
        {...wrapperProps}
      >
        <OptionRow id="1" value="opt1" text="red">
          <td>red</td>
        </OptionRow>
        <OptionRow id="2" value="opt2" text="green">
          <td>green</td>
        </OptionRow>
        <OptionRow id="3" value="opt3" text="blue">
          <td>blue</td>
        </OptionRow>
      </SelectList>
    );
  };

  return <WrapperComponent />;
}

function getGroupedSelectList(props) {
  const defaultProps = {
    onSelect: () => {},
    onSelectListClose: () => {},
    isOpen: true,
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

function getLoadingSelectList(props) {
  const defaultProps = {
    onSelect: () => {},
    onSelectListClose: () => {},
    isOpen: true,
  };

  // eslint-disable-next-line react/prop-types
  const WrapperComponent = ({ isLoading, ...wrapperProps }) => {
    const mockRef = useRef();
    const children = isLoading
      ? []
      : [
          <Option value="opt1" text="red" />,
          <Option value="opt2" text="green" />,
          <Option value="opt3" text="blue" />,
        ];

    return (
      <SelectList ref={mockRef} {...defaultProps} {...wrapperProps}>
        {children}
      </SelectList>
    );
  };

  return <WrapperComponent {...props} />;
}
