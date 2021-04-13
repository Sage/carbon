import React, { useRef } from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";

import { testStyledSystemMargin } from "../../../__spec_helper__/test-utils";
import SelectTextbox from "../select-textbox/select-textbox.component";
import FilterableSelect from "./filterable-select.component";
import Textbox from "../../../__experimental__/components/textbox";
import Option from "../option/option.component";
import SelectList from "../select-list/select-list.component";
import Button from "../../button";
import Label from "../../../__experimental__/components/label";

describe("FilterableSelect", () => {
  testStyledSystemMargin((props) => getSelect(props));

  it('the Textbox should have type of "text"', () => {
    const wrapper = renderSelect();

    expect(wrapper.find(Textbox).prop("type")).toBe("text");
  });

  it("the input ref should be forwarded", () => {
    let mockRef;

    const WrapperComponent = () => {
      mockRef = useRef();

      return (
        <FilterableSelect name="testSelect" id="testSelect" ref={mockRef}>
          <Option value="opt1" text="red" />
          <Option value="opt2" text="green" />
          <Option value="opt3" text="blue" />
          <Option value="opt4" text="black" />
        </FilterableSelect>
      );
    };

    const wrapper = mount(<WrapperComponent />);

    expect(mockRef.current).toBe(wrapper.find("input").getDOMNode());
  });

  describe("when the value prop has been passed", () => {
    it("then the formatted value should be set to corresponding option text", () => {
      const wrapper = renderSelect({ value: "opt2", onChange: jest.fn() });

      expect(wrapper.find(Textbox).prop("formattedValue")).toBe("green");
    });

    describe("without available matching option", () => {
      it("then the formatted value should be set to corresponding option text when it's available", () => {
        const wrapper = mount(
          <FilterableSelect
            name="testSelect"
            id="testSelect"
            defaultValue="opt2"
          >
            <Option value="opt1" text="blue" key="blue" />
          </FilterableSelect>
        );

        wrapper.setProps({
          children: [<Option value="opt2" text="red" key="red" />],
        });
        wrapper.update();

        expect(wrapper.find(Textbox).prop("formattedValue")).toBe("red");
      });
    });
  });

  describe("when the inputRef function prop is specified", () => {
    it("then the input reference should be returned on call", () => {
      const inputRefFn = jest.fn();
      const wrapper = renderSelect({ inputRef: inputRefFn });

      expect(inputRefFn).toHaveBeenCalledWith({
        current: wrapper.find("input").getDOMNode(),
      });
    });
  });

  describe("when the onFocus prop has been passed and the input has been focused", () => {
    it("then that prop should be called", () => {
      const onFocusFn = jest.fn();
      const wrapper = renderSelect({ onFocus: onFocusFn });

      wrapper.find("input").simulate("focus");
      expect(onFocusFn).toHaveBeenCalled();
    });
  });

  describe("when the Textbox Input is focused", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = renderSelect();
    });

    it("the SelectList should not be rendered", () => {
      wrapper.find("input").simulate("focus");
      expect(wrapper.find(SelectList).exists()).toBe(false);
    });

    describe.each(["ArrowDown", "ArrowUp", "Home", "End"])(
      "and %s key has been pressed",
      (key) => {
        it("the SelectList should be rendered", () => {
          wrapper.find("input").simulate("keydown", { key });
          expect(wrapper.update().find(SelectList).exists()).toBe(true);
        });

        describe("with readOnly prop set to true", () => {
          it("then the SelectList should not be rendered", () => {
            wrapper.setProps({ readOnly: true });
            wrapper.update().find("input").simulate("keydown", { key });
            expect(wrapper.find(SelectList).exists()).toBe(false);
          });
        });
      }
    );

    describe("and the Enter key has been pressed", () => {
      it("the SelectList should not be rendered", () => {
        wrapper.find("input").simulate("keydown", { key: "Enter" });
        expect(wrapper.find(SelectList).exists()).toBe(false);
      });

      describe("with readOnly prop set to true", () => {
        it("then the SelectList should not be rendered", () => {
          wrapper.setProps({ readOnly: true });
          wrapper.update().find("input").simulate("keydown", { key: "Enter" });
          expect(wrapper.find(SelectList).exists()).toBe(false);
        });
      });
    });

    describe("and a key that matches the last character has been pressed", () => {
      it("the filterText prop in the SelectList should match the formattedValue in the Textbox", () => {
        wrapper.find("input").simulate("change", { target: { value: "blu" } });
        wrapper.find("input").simulate("keydown", { key: "e" });

        const selectList = wrapper.find(SelectList);
        const textbox = wrapper.find(Textbox);
        expect(selectList.prop("filterText")).toBe(
          textbox.prop("formattedValue")
        );
      });
    });

    describe.each(["deleteContentBackward", "deleteContentForward", "delete"])(
      'and the "%s" change event is a delete event type',
      (deleteEventType) => {
        const mockChangeEvent = {
          target: { value: "blue" },
          nativeEvent: { inputType: deleteEventType },
        };
        const mockDeleteEvent = {
          target: { value: "blu" },
          nativeEvent: { inputType: deleteEventType },
        };
        const mockClearEvent = {
          target: { value: "" },
          nativeEvent: { inputType: deleteEventType },
        };

        it("the value should not be changed", () => {
          wrapper.find("input").simulate("focus");
          wrapper.find("input").simulate("change", mockChangeEvent);
          expect(wrapper.find(Textbox).prop("value")).toBe("opt3");
          wrapper.find("input").simulate("change", mockDeleteEvent);
          expect(wrapper.find(Textbox).prop("value")).toBe("opt3");
        });

        describe("and the filter is cleared", () => {
          it("the value should also be cleared", () => {
            wrapper.find("input").simulate("focus");
            wrapper.find("input").simulate("change", mockChangeEvent);
            expect(wrapper.find(Textbox).prop("value")).toBe("opt3");
            wrapper.find("input").simulate("change", mockClearEvent);
            expect(wrapper.find(Textbox).prop("value")).toBe("");
          });
        });
      }
    );
  });

  describe("when the Textbox Input has been clicked", () => {
    it("the SelectList should not be rendered", () => {
      const wrapper = renderSelect();

      wrapper.find("input").simulate("click");
      expect(wrapper.find(SelectList).exists()).toBe(false);
    });

    describe.each(["disabled", "readOnly"])(
      "and the %s prop is set to true",
      (prop) => {
        it('then the "onClick" prop should not be called', () => {
          const onClickFn = jest.fn();
          const wrapper = renderSelect({ onClick: onClickFn, [prop]: true });

          wrapper.find("input").simulate("click");
          expect(onClickFn).not.toHaveBeenCalled();
        });

        it("then the SelectList should not be rendered", () => {
          const wrapper = renderSelect({ [prop]: true });

          wrapper.find("input").simulate("click");
          expect(wrapper.find(SelectList).exists()).toBe(false);
        });
      }
    );

    describe("and the onClick prop is passed", () => {
      it("then that prop should be called", () => {
        const onClickFn = jest.fn();
        const wrapper = renderSelect({ onClick: onClickFn });

        wrapper.find("input").simulate("click");
        expect(onClickFn).toHaveBeenCalled();
      });
    });

    describe("when the Dropdown Icon in the Textbox has been clicked", () => {
      it("the SelectList should be rendered", () => {
        const wrapper = renderSelect();

        wrapper
          .find(Textbox)
          .find('[type="dropdown"]')
          .first()
          .simulate("click");
        expect(wrapper.find(SelectList).exists()).toBe(true);
      });

      describe("twice", () => {
        it("the SelectList should not be rendered", () => {
          const wrapper = renderSelect();
          const dropdown = wrapper
            .find(Textbox)
            .find('[type="dropdown"]')
            .first();
          dropdown.simulate("click");
          dropdown.simulate("click");
          expect(wrapper.find(SelectList).exists()).toBe(false);
        });
      });

      describe("and the onOpen prop is passed", () => {
        it("then that prop should be called", () => {
          const onOpenFn = jest.fn();
          const wrapper = renderSelect({ onOpen: onOpenFn });

          wrapper
            .find(Textbox)
            .find('[type="dropdown"]')
            .first()
            .simulate("click");
          expect(onOpenFn).toHaveBeenCalled();
        });
      });

      describe("and the onClick prop is passed", () => {
        it("then that prop should be called", () => {
          const onClickFn = jest.fn();
          const wrapper = renderSelect({ onClick: onClickFn });

          wrapper
            .find(Textbox)
            .find('[type="dropdown"]')
            .first()
            .simulate("click");
          expect(onClickFn).toHaveBeenCalled();
        });
      });
    });
  });

  describe("when a printable character has been typed in the Textbox", () => {
    describe("and the first filtered option starts with that character", () => {
      it("then the visible value should be changed to that option text", () => {
        const wrapper = renderSelect();

        wrapper.find("input").simulate("change", { target: { value: "r" } });
        wrapper.update();
        expect(wrapper.find(Textbox).prop("formattedValue")).toBe("red");
        wrapper.unmount();
      });
    });

    describe("and the first filtered option does not start with that character", () => {
      it("then the Textbox visible value should be changed to that character", () => {
        const wrapper = renderSelect();

        wrapper.find("input").simulate("change", { target: { value: "l" } });
        wrapper.update();
        expect(wrapper.find(Textbox).prop("formattedValue")).toBe("l");
        wrapper.unmount();
      });

      it("then the Textbox value should be the value of the first option containing that character", () => {
        const wrapper = renderSelect();

        wrapper.find("input").simulate("change", { target: { value: "l" } });
        wrapper.update();
        expect(wrapper.find(Textbox).prop("value")).toBe("opt3");
        wrapper.unmount();
      });
    });

    it("the SelectList should have the filterText prop the same as the value", () => {
      const changeEventObject = { target: { value: "Foo" } };
      const wrapper = renderSelect();

      wrapper.find("input").simulate("click");
      wrapper.find("input").simulate("change", changeEventObject);
      expect(wrapper.update().find(SelectList).prop("filterText")).toBe("Foo");
    });

    describe("and the SelectList is closed and opened again", () => {
      it("then the filterText prop in SelectList should have been cleared", () => {
        const changeEventObject = { target: { value: "Foo" } };
        const wrapper = renderSelect();

        wrapper.find("input").simulate("click");
        wrapper.find("input").simulate("change", changeEventObject);
        act(() => {
          wrapper.find(SelectList).prop("onSelectListClose")();
        });
        wrapper
          .find(Textbox)
          .find('[type="dropdown"]')
          .first()
          .simulate("click");
        expect(wrapper.update().find(SelectList).prop("filterText")).toBe("");
      });
    });

    describe("with the onOpen prop passed", () => {
      it("then that prop should be called", () => {
        const onOpenFn = jest.fn();
        const wrapper = renderSelect({ onOpen: onOpenFn });

        wrapper.find("input").simulate("change", { target: { value: "b" } });

        expect(onOpenFn).toHaveBeenCalled();
      });
    });
  });

  describe("when the onSelect is called in the open SelectList", () => {
    const navigationKeyOptionObject = {
      value: "Foo",
      text: "Bar",
      selectionType: "navigationKey",
    };
    const clickOptionObject = {
      value: "Foo",
      text: "Bar",
      selectionType: "click",
    };
    const textboxProps = {
      name: "testName",
      id: "testId",
    };
    const expectedEventObject = {
      target: {
        ...textboxProps,
        value: "Foo",
      },
    };

    describe('with "selectionType" as "click"', () => {
      it("the SelectList should be closed", () => {
        const wrapper = renderSelect();

        wrapper
          .find(Textbox)
          .find('[type="dropdown"]')
          .first()
          .simulate("click");
        expect(wrapper.find(SelectList).exists()).toBe(true);
        act(() => {
          wrapper.find(SelectList).prop("onSelect")(clickOptionObject);
        });
        expect(wrapper.update().find(SelectList).exists()).toBe(false);
      });
    });

    describe('with "selectionType" as "navigationKey"', () => {
      it("the SelectList should be open and the value should be selected", () => {
        const wrapper = renderSelect();

        wrapper
          .find(Textbox)
          .find('[type="dropdown"]')
          .first()
          .simulate("click");
        expect(wrapper.find(SelectList).exists()).toBe(true);
        act(() => {
          wrapper.find(SelectList).prop("onSelect")(navigationKeyOptionObject);
        });
        wrapper.update();
        expect(wrapper.find(SelectList).exists()).toBe(true);
        expect(wrapper.find(Textbox).prop("value")).toBe("Foo");
        expect(wrapper.find(Textbox).prop("formattedValue")).toBe("Bar");
      });
    });

    describe("and the onChange prop is passed", () => {
      it("then that prop should be called with the same value", () => {
        const onChangeFn = jest.fn();
        const wrapper = renderSelect({ ...textboxProps, onChange: onChangeFn });

        wrapper
          .find(Textbox)
          .find('[type="dropdown"]')
          .first()
          .simulate("click");
        act(() => {
          wrapper.find(SelectList).prop("onSelect")(clickOptionObject);
        });
        expect(onChangeFn).toHaveBeenCalledWith(expectedEventObject);
      });
    });
  });

  describe("when the onSelectListClose is called in the open SelectList", () => {
    it("the SelectList should be closed", () => {
      const wrapper = renderSelect();

      wrapper.find(Textbox).find('[type="dropdown"]').first().simulate("click");
      expect(wrapper.find(SelectList).exists()).toBe(true);
      act(() => {
        wrapper.find(SelectList).prop("onSelectListClose")();
      });
      expect(wrapper.update().find(SelectList).exists()).toBe(false);
    });

    describe("and the changed visible text is not matching any option", () => {
      it("then the formattedValue prop in Textbox should be cleared", () => {
        const selectedOptionTextValue = "green";
        const onChangeFn = jest.fn();
        const wrapper = renderSelect({
          onChange: onChangeFn,
          defaultValue: "opt2",
        });
        const changeEventObject = { target: { value: "Foo" } };

        wrapper
          .find(Textbox)
          .find('[type="dropdown"]')
          .first()
          .simulate("click");
        expect(wrapper.find(Textbox).prop("formattedValue")).toBe(
          selectedOptionTextValue
        );
        wrapper.find("input").simulate("change", changeEventObject);
        expect(wrapper.find(Textbox).prop("formattedValue")).toBe("Foo");
        act(() => {
          wrapper.find(SelectList).prop("onSelectListClose")();
        });
        expect(wrapper.update().find(Textbox).prop("formattedValue")).toBe("");
      });
    });
  });

  describe("when an HTML element is clicked when the SelectList is open", () => {
    let wrapper;
    let domNode;

    beforeEach(() => {
      wrapper = mount(getSelect());
      domNode = wrapper.getDOMNode();
      document.body.appendChild(domNode);
    });

    describe("and that element is the input", () => {
      it("then the SelectList should stay open", () => {
        wrapper
          .find(Textbox)
          .find('[type="dropdown"]')
          .first()
          .simulate("click");
        expect(wrapper.find(SelectList).exists()).toBe(true);
        act(() => {
          wrapper
            .find("input")
            .getDOMNode()
            .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(wrapper.update().find(SelectList).exists()).toBe(true);
      });
    });

    describe("and that element is not part of the Select", () => {
      it("then the SelectList should be closed", () => {
        wrapper
          .find(Textbox)
          .find('[type="dropdown"]')
          .first()
          .simulate("click");
        expect(wrapper.find(SelectList).exists()).toBe(true);
        act(() => {
          document.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(wrapper.update().find(SelectList).exists()).toBe(false);
      });
    });

    afterEach(() => {
      document.body.removeChild(domNode);
    });
  });

  describe("when the onKeyDown prop is passed", () => {
    const expectedEventObject = {
      key: "ArrowDown",
    };

    it("then when a key is pressed, that prop should be called with expected values", () => {
      const onKeyDownFn = jest.fn();
      const wrapper = renderSelect({ onKeyDown: onKeyDownFn });

      wrapper.find("input").simulate("keyDown", expectedEventObject);

      expect(onKeyDownFn).toHaveBeenCalledWith(
        expect.objectContaining({
          ...expectedEventObject,
        })
      );
    });
  });

  describe("when the listActionButton prop is provided", () => {
    let wrapper;
    const testWrapper = document.createElement("div");
    const onListActionFn = jest.fn();
    const mockButton = <Button>mock button</Button>;

    document.body.appendChild(testWrapper);

    beforeEach(() => {
      wrapper = mount(
        getSelect({
          listActionButton: mockButton,
          onListAction: onListActionFn,
        }),
        { attachTo: testWrapper }
      );
      wrapper.find(Textbox).find('[type="dropdown"]').first().simulate("click");
    });

    afterEach(() => {
      wrapper.detach();
    });

    it("then that prop should be passed down to the SelectList component", () => {
      expect(wrapper.find(SelectList).props().listActionButton).toEqual(
        mockButton
      );
      wrapper.unmount();
    });

    describe("and onListAction has been called in the SelectList", () => {
      it("then the onlistAction prop should have been called", () => {
        onListActionFn.mockClear();
        act(() => {
          wrapper.find(SelectList).props().onListAction();
        });
        expect(onListActionFn).toHaveBeenCalled();
        wrapper.unmount();
      });
    });

    describe("and the Tab key has been pressed", () => {
      const tabKeyDownEvent = new KeyboardEvent("keydown", {
        key: "Tab",
        bubbles: true,
      });

      it("then the rendered button should be focused", () => {
        act(() => {
          document.body.dispatchEvent(tabKeyDownEvent);
        });
        expect(wrapper.update().find(SelectList).exists()).toBe(true);
        expect(wrapper.find(SelectList).find("button").getDOMNode()).toBe(
          document.activeElement
        );
      });

      describe("with the rendered button already focused", () => {
        beforeEach(() => {
          act(() => {
            wrapper.find("button").getDOMNode().focus();
            document.body.dispatchEvent(tabKeyDownEvent);
          });
        });

        it("then the SelectList should be closed", () => {
          expect(wrapper.update().find(SelectList).exists()).toBe(false);
        });

        it("then the select input should be focused", () => {
          expect(wrapper.find("input").getDOMNode()).toBe(
            document.activeElement
          );
        });
      });
    });
  });

  describe("when the component is controlled", () => {
    const onChangeFn = jest.fn();
    let wrapper;
    const expectedObject = {
      target: {
        id: "testSelect",
        name: "testSelect",
        value: "opt3",
      },
    };

    const clickOptionObject = {
      value: "opt3",
      text: "black",
      selectionType: "click",
    };

    beforeEach(() => {
      onChangeFn.mockClear();
      wrapper = renderSelect({ onChange: onChangeFn, value: "opt1" });
    });

    describe("and an option is selected", () => {
      it("then the onChange prop should be called with expected value", () => {
        wrapper
          .find(Textbox)
          .find('[type="dropdown"]')
          .first()
          .simulate("click");
        expect(wrapper.find(SelectList).exists()).toBe(true);
        act(() => {
          wrapper.find(SelectList).prop("onSelect")(clickOptionObject);
        });
        expect(onChangeFn).toHaveBeenCalledWith(expectedObject);
      });
    });

    describe("when a printable character has been typed in the Textbox", () => {
      describe("and the first filtered option starts with that character", () => {
        beforeEach(() => {
          wrapper.find("input").simulate("change", { target: { value: "b" } });
          wrapper.update();
        });

        it("then the onChange function should have been called with with the expected value", () => {
          expect(onChangeFn).toHaveBeenCalledWith(expectedObject);
        });

        describe("and an an empty value has been passed", () => {
          it("then the textbox displayed value should be cleared", () => {
            expect(wrapper.find(Textbox).props().formattedValue).toBe("blue");
            wrapper.setProps({ value: "" });
            expect(wrapper.update().find(Textbox).props().formattedValue).toBe(
              ""
            );
          });

          it("then the textbox value should be cleared", () => {
            expect(wrapper.find(Textbox).props().value).toBe("opt1");
            wrapper.setProps({ value: "" });
            expect(wrapper.update().find(Textbox).props().value).toBe(
              undefined
            );
          });
        });
      });

      describe("and the first filtered option does not start with that character", () => {
        beforeEach(() => {
          wrapper.find("input").simulate("change", { target: { value: "l" } });
          wrapper.update();
        });

        it("then the onChange function should have been called with with the expected value", () => {
          expect(onChangeFn).toHaveBeenCalledWith(expectedObject);
        });

        it("then the Textbox visible value should be changed to that character", () => {
          expect(wrapper.find(Textbox).prop("formattedValue")).toBe("l");
          wrapper.unmount();
        });

        describe("and the value changes without changing the filter text", () => {
          it("then the Textbox visible value should still be set to that character", () => {
            wrapper.setProps({ value: "opt3" });
            expect(wrapper.find(Textbox).prop("formattedValue")).toBe("l");
            wrapper.unmount();
          });
        });
      });
    });
  });

  describe("required", () => {
    const wrapper = renderSelect({ label: "required", required: true });

    it("the required prop is passed to the input", () => {
      const input = wrapper.find("input");
      expect(input.prop("required")).toBe(true);
    });

    it("the isRequired prop is passed to the label", () => {
      const label = wrapper.find(Label);
      expect(label.prop("isRequired")).toBe(true);
    });
  });

  describe("disablePortal", () => {
    it("renders SelectList as a content of positionedChildren prop on Textbox when disablePortal is true", () => {
      const wrapper = renderSelect({ disablePortal: true });

      wrapper.find(Textbox).find('[type="dropdown"]').first().simulate("click");
      const positionedChildren = mount(
        wrapper.find(SelectTextbox).props().positionedChildren
      );
      expect(positionedChildren.find(SelectList).exists()).toBe(true);
    });

    it("renders SelectList as a direct children of StyledSimpleSelect by default", () => {
      const wrapper = renderSelect();

      wrapper.find(Textbox).find('[type="dropdown"]').first().simulate("click");
      expect(wrapper.find(SelectTextbox).props().positionedChildren).toBe(
        undefined
      );
      expect(wrapper.find(SelectList).exists()).toBe(true);
    });
  });

  describe('when the "onBlur" prop has been passed and the input has been blurred', () => {
    it("then that prop should be called", () => {
      const onBlurFn = jest.fn();
      const wrapper = renderSelect({ onBlur: onBlurFn });

      wrapper.find("input").simulate("blur");
      expect(onBlurFn).toHaveBeenCalled();
    });

    it("then SelectList shouldn't exist", () => {
      const onBlurFn = jest.fn();
      const wrapper = renderSelect({ onBlur: onBlurFn, openOnFocus: true });

      wrapper.find("input").simulate("focus");
      expect(wrapper.find(SelectList).exists()).toBe(true);

      wrapper.find("input").simulate("blur");
      expect(wrapper.find(SelectList).exists()).toBe(false);
    });

    describe("and there is a mouseDown reported on open list", () => {
      it("then that prop should not be called", () => {
        const onBlurFn = jest.fn();
        const wrapper = renderSelect({ onBlur: onBlurFn, openOnFocus: true });

        wrapper.find("input").simulate("focus");
        wrapper.find(Option).first().simulate("mousedown");
        wrapper.find("input").simulate("blur");
        expect(onBlurFn).not.toHaveBeenCalled();
      });
    });
  });

  describe('when the "openOnFocus" prop is set', () => {
    describe("and the Textbox Input is focused", () => {
      it("the SelectList should be rendered", () => {
        const wrapper = renderSelect({ openOnFocus: true });

        wrapper.find("input").simulate("focus");
        expect(wrapper.find(SelectList).exists()).toBe(true);
      });

      describe.each(["readOnly", "disabled"])(
        'with the "%s" prop passed',
        (prop) => {
          it("the SelectList should not be rendered", () => {
            const obj = { [prop]: true, openOnFocus: true };
            const wrapper = renderSelect(obj);

            wrapper.find("input").simulate("focus");
            expect(wrapper.find(SelectList).exists()).toBe(false);
          });
        }
      );

      describe('with the "onFocus" prop passed', () => {
        it("then that prop should be called", () => {
          const onFocusFn = jest.fn();
          const wrapper = renderSelect({
            onFocus: onFocusFn,
            openOnFocus: true,
          });

          wrapper.find("input").simulate("focus");
          expect(onFocusFn).toHaveBeenCalled();
        });
      });

      describe('with the "onOpen" prop passed', () => {
        let wrapper;
        let onOpenFn;

        beforeEach(() => {
          onOpenFn = jest.fn();
          wrapper = renderSelect({ onOpen: onOpenFn, openOnFocus: true });
        });

        it("then that prop should have been called", () => {
          wrapper.find("input").simulate("focus");
          expect(onOpenFn).toHaveBeenCalled();
        });

        describe("and with the SelectList already open", () => {
          it("then that prop should not be called", () => {
            wrapper.find("input").simulate("focus");
            onOpenFn.mockReset();
            expect(wrapper.find(SelectList).exists()).toBe(true);
            wrapper.find("input").simulate("focus");
            expect(onOpenFn).not.toHaveBeenCalled();
          });
        });

        describe("and the focus triggered by mouseDown on the input", () => {
          it("then that prop should have been called", () => {
            wrapper.find("input").simulate("mouseDown");
            wrapper.find("input").simulate("focus");
            expect(onOpenFn).toHaveBeenCalled();
          });
        });
      });
    });

    describe("and the focus triggered by mouseDown on the Dropdown Icon", () => {
      describe('with the "onOpen" prop passed', () => {
        const onOpenFn = jest.fn();
        const wrapper = renderSelect({ onOpen: onOpenFn, openOnFocus: true });

        it("then that prop should have been called", () => {
          wrapper
            .find(Textbox)
            .find('[type="dropdown"]')
            .first()
            .simulate("mouseDown");
          wrapper.find("input").simulate("focus");
          expect(onOpenFn).toHaveBeenCalled();
        });
      });
    });
  });
});

describe("coverage filler for else path", () => {
  const wrapper = renderSelect();
  wrapper.find("input").simulate("blur");
});

function renderSelect(props = {}, renderer = mount) {
  return renderer(getSelect(props));
}

function getSelect(props) {
  return (
    <FilterableSelect name="testSelect" id="testSelect" {...props}>
      <Option value="opt1" text="red" />
      <Option value="opt2" text="green" />
      <Option value="opt3" text="blue" />
      <Option value="opt4" text="black" />
    </FilterableSelect>
  );
}
