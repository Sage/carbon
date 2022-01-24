import React, { useRef, useState } from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";

import SelectList from "./select-list.component";
import { StyledSelectList, StyledPopoverContainer } from "./select-list.style";
import Option from "../option/option.component";
import OptionRow from "../option-row/option-row.component";
import OptionGroupHeader from "../option-group-header/option-group-header.component";
import ListActionButton from "../list-action-button/list-action-button.component";
import Loader from "../../loader";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import StyledSelectListContainer from "./select-list-container.style";
import Popover from "../../../__internal__/popover";

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
        ["Escape", escapeKeyDownEvent],
        ["Tab", tabKeyDownEvent],
        ["Enter", enterKeyDownEvent],
      ])("and it's the %s key", (_, keyEvent) => {
        it("then the onSelectListClose prop should be called", () => {
          testContainer.dispatchEvent(keyEvent);
          expect(onSelectListCloseFn).toHaveBeenCalled();
        });
      });

      describe("and it's the Enter key", () => {
        it("then should call a preventDefault function", () => {
          const spy = spyOn(enterKeyDownEvent, "preventDefault");
          testContainer.dispatchEvent(enterKeyDownEvent);

          expect(spy).toHaveBeenCalled();
        });

        describe("with an option highlighted", () => {
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
    }
  );

  describe.each([
    [renderSelectList, Option],
    [renderOptionRowSelectList, OptionRow],
  ])("when rendered", (listRenderer, optionType) => {
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
          selectionType: "click",
          text: "red",
          value: "opt1",
        });
      });
    });
  });

  describe.each([
    [renderSelectList, Option],
    [renderOptionRowSelectList, OptionRow],
  ])("when the filterText is provided", (listRenderer, optionType) => {
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
        { width: "200px" },
        wrapper.find(StyledPopoverContainer)
      );
    });

    describe("and screen is resized", () => {
      it("then the popover container width gets updated", () => {
        mockAnchorElement.getBoundingClientRect = () => {
          return {
            width: 400,
          };
        };
        act(() => {
          window.dispatchEvent(new Event("resize"));
        });
        wrapper.update();
        assertStyleMatch(
          { width: "400px" },
          wrapper.find(StyledPopoverContainer)
        );
      });
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
    it("then a Loader Component should be rendered as the last element of the list", () => {
      const wrapper = renderSelectList({
        isLoading: true,
        onListAction: () => {},
        loaderDataRole: "select-list-loader",
      });
      expect(wrapper.find("li").last().find(Loader).exists()).toBe(true);
      expect(wrapper.find("li").last().find(Loader).prop("data-role")).toEqual(
        "select-list-loader"
      );
    });

    it("and is in multiColum mode, then a Loader Component should be rendered as the last element of the list", () => {
      const wrapper = renderOptionRowSelectList({
        isLoading: true,
        onListAction: () => {},
      });
      expect(
        wrapper.find(StyledSelectList).children().last().find(Loader).exists()
      ).toBe(true);
    });

    describe("with empty option list", () => {
      it("then the height of the dropdown should be 150px", () => {
        const EmptySelect = () => {
          const [options] = useState([]);

          return (
            <SelectList
              value="red"
              onSelect={() => {}}
              onSelectListClose={() => {}}
              isLoading
            >
              {options}
            </SelectList>
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

    describe.each([true, false])(
      "and there is only one option",
      (multiColumn) => {
        it("that option should have the hidden prop", () => {
          const wrapper = mount(
            <SelectList
              value="red"
              onSelect={() => {}}
              onSelectListClose={() => {}}
              multiColumn={multiColumn}
              isLoading
            >
              {multiColumn ? (
                <OptionRow value="opt1" text="red">
                  <td>foo</td>
                </OptionRow>
              ) : (
                <Option value="opt1" text="red" />
              )}
            </SelectList>
          );

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

  describe("When SelectList has an option with wrapped text", () => {
    it("should correctly calculate the height of the SelectList", () => {
      const testWrapper = document.createElement("div");
      const wrapper = mount(getSelectList({}), { attachTo: testWrapper });
      const listElement = wrapper.find(StyledSelectList).getDOMNode();
      jest
        .spyOn(listElement, "clientHeight", "get")
        .mockImplementation(() => 60);

      wrapper
        .setProps({
          children: [
            <Option
              value="opt1"
              text="This is to mimic a long piece of text that could be used in the Select Component and the text could be wrapped
            but this is a virtual DOM so that will not happen"
            />,
          ],
        })
        .update();

      assertStyleMatch(
        { height: "60px" },
        wrapper.find(StyledSelectListContainer)
      );
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

    it("renders StyledSelectListContainer with bottom:0 style when placement is passed as top-start", () => {
      const wrapper = mount(
        <StyledSelectListContainer placement="top-start" />
      );
      assertStyleMatch(
        {
          bottom: "0",
        },
        wrapper
      );
    });

    it.each([
      "auto",
      "auto-start",
      "auto-end",
      "top",
      "top-start",
      "top-end",
      "bottom",
      "bottom-start",
      "bottom-end",
      "right",
      "right-start",
      "right-end",
      "left",
      "left-start",
      "left-end",
    ])("passes listPlacement prop as a placement prop", (listPlacement) => {
      const wrapper = renderSelectList({ listPlacement });

      expect(wrapper.find(Popover).prop("placement")).toBe(listPlacement);
    });
  });

  describe("when non option elements are provided as children", () => {
    it("then isHighlighted prop should not be set on them", () => {
      const wrapper = mount(
        <SelectList onSelect={() => {}} onSelectListClose={() => {}}>
          {false && ""}
          <li>not an option element</li>
        </SelectList>
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

function getOptionRowSelectList(props) {
  const defaultProps = {
    onSelect: () => {},
    onSelectListClose: () => {},
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
        <OptionRow value="opt1" text="red">
          <td>red</td>
        </OptionRow>
        <OptionRow value="opt2" text="green">
          <td>green</td>
        </OptionRow>
        <OptionRow value="opt3" text="blue">
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
