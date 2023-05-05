import React, { useRef, useState } from "react";
import { act } from "react-dom/test-utils";
import { mount, ReactWrapper } from "enzyme";

import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../../__spec_helper__/test-utils";
import { FilterableSelect, Option, FilterableSelectProps } from "..";
import Textbox from "../../textbox";
import SelectList from "../select-list/select-list.component";
import StyledSelectListContainer from "../select-list/select-list-container.style";
import Button from "../../button";
import Label from "../../../__internal__/label";
import InputIconToggle from "../../../__internal__/input-icon-toggle";
import guid from "../../../__internal__/utils/helpers/guid";
import { InputPresentation } from "../../../__internal__/input";
import Logger from "../../../__internal__/utils/logger";
import StyledInput from "../../../__internal__/input/input.style";

const mockedGuid = "mocked-guid";
jest.mock("../../../__internal__/utils/logger");

jest.mock("../../../__internal__/utils/helpers/guid");

(guid as jest.MockedFunction<typeof guid>).mockReturnValue(mockedGuid);

function getSelect(props: Partial<FilterableSelectProps> = {}) {
  return (
    <FilterableSelect name="testSelect" id="testSelect" {...props}>
      <Option value="opt1" text="red" />
      <Option value="opt2" text="green" />
      <Option value="opt3" text="blue" />
      <Option value="opt4" text="black" />
    </FilterableSelect>
  );
}

function renderSelect(props = {}, renderer = mount) {
  return renderer(getSelect(props));
}

describe("FilterableSelect", () => {
  let loggerSpy: jest.SpyInstance<void, [message: string]> | jest.Mock;

  describe("Deprecation warning for uncontrolled", () => {
    beforeEach(() => {
      loggerSpy = jest.spyOn(Logger, "deprecate");
      jest.restoreAllMocks();
    });

    afterEach(() => {
      loggerSpy.mockRestore();
    });

    afterAll(() => {
      loggerSpy.mockClear();
    });

    it("should display deprecation warning once", () => {
      renderSelect({ defaultValue: "opt1" });

      expect(loggerSpy).toHaveBeenCalledWith(
        "Uncontrolled behaviour in `Filterable Select` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
      );

      expect(loggerSpy).toHaveBeenCalledTimes(1);
    });
  });

  testStyledSystemMargin((props) => getSelect(props));

  it('the Textbox should have type of "text"', () => {
    const wrapper = renderSelect();

    expect(wrapper.find(Textbox).prop("type")).toBe("text");
  });

  describe("with a ref", () => {
    it("the input ref should be forwarded", () => {
      let mockRef = { current: null };

      const WrapperComponent = () => {
        mockRef = useRef(null);

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

    it("the input callback ref should be called with the DOM element", () => {
      let mockRef;

      const WrapperComponent = () => {
        mockRef = jest.fn();

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

      expect(mockRef).toHaveBeenCalledWith(wrapper.find("input").getDOMNode());
    });
  });

  describe("when the id prop is set", () => {
    const mockId = "foo";
    const wrapper = renderSelect({ id: mockId, label: "bar" });

    it("then it should be passed to the Textbox component", () => {
      expect(wrapper.find(Textbox).prop("id")).toBe(mockId);
    });

    it("then a label id based on that prop should be passed to the SelectList component", () => {
      expect(wrapper.find(SelectList).prop("labelId")).toBe(`${mockId}-label`);
    });

    it("then a label id based on that prop should be passed to the Textbox component", () => {
      expect(wrapper.find(Textbox).prop("labelId")).toBe(`${mockId}-label`);
    });
  });

  describe("when the id prop is not set", () => {
    const wrapper = renderSelect({ id: undefined, label: "bar" });

    it("then a randomly generated id should be passed to the Textbox component", () => {
      expect(wrapper.find(Textbox).prop("id")).toBe(mockedGuid);
    });

    it("then a label id based on randomly generated id should be passed to the SelectList component", () => {
      expect(wrapper.find(SelectList).prop("labelId")).toBe(
        `${mockedGuid}-label`
      );
    });

    it("then a label id based on a randomly generated id should be passed to the Textbox component", () => {
      expect(wrapper.find(Textbox).prop("labelId")).toBe(`${mockedGuid}-label`);
    });
  });

  describe("when listMaxHeight prop is provided", () => {
    it("overrides default list max-height", () => {
      mount(getSelect());
      const wrapper = renderSelect({ listMaxHeight: 120, openOnFocus: true });

      wrapper.find(Textbox).find('[type="dropdown"]').first().simulate("click");
      assertStyleMatch(
        { maxHeight: "120px" },
        wrapper.find(StyledSelectListContainer)
      );
    });
  });

  it("when text is passed in placeholder prop, input element in textbox uses it as placeholder text", () => {
    const placeholder = "foobaz";
    const wrapper = renderSelect({ placeholder });
    expect(
      wrapper.find("input[data-element='input']").prop("placeholder")
    ).toBe(placeholder);
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
    it("should display deprecation warning when the inputRef prop is used", () => {
      const inputRefFn = jest.fn();
      const wrapper = renderSelect({ inputRef: inputRefFn });

      expect(loggerSpy.mock.calls).toEqual([
        [
          "The `inputRef` prop in `Filterable Select` component is deprecated and will soon be removed. Please use `ref` instead.",
        ],
        [
          "The `inputRef` prop in `Textbox` component is deprecated and will soon be removed. Please use `ref` instead.",
        ],
      ]);
      expect(loggerSpy).toHaveBeenCalledTimes(2);
      // will be called twice because the prop is passed to Textbox where another deprecation warning is triggered.
      wrapper.setProps({ prop1: true });
      expect(loggerSpy).toHaveBeenCalledTimes(2);
    });

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
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = renderSelect();
    });

    it("the SelectList should not be rendered", () => {
      wrapper.find("input").simulate("focus");
      wrapper
        .find(Option)
        .forEach((option) => expect(option.getDOMNode()).not.toBeVisible());
    });

    describe.each(["ArrowDown", "ArrowUp", "Home", "End"])(
      "and %s key has been pressed",
      (key) => {
        it("the SelectList should be rendered", () => {
          wrapper.find("input").simulate("keydown", { key });
          wrapper
            .find(Option)
            .forEach((option) => expect(option.getDOMNode()).toBeVisible());
        });

        describe("with readOnly prop set to true", () => {
          it("then the SelectList should not be rendered", () => {
            wrapper.setProps({ readOnly: true });
            wrapper.update().find("input").simulate("keydown", { key });
            wrapper
              .find(Option)
              .forEach((option) =>
                expect(option.getDOMNode()).not.toBeVisible()
              );
          });
        });
      }
    );

    describe("and the Enter key has been pressed", () => {
      it("the SelectList should not be rendered", () => {
        wrapper.find("input").simulate("keydown", { key: "Enter" });
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).not.toBeVisible());
      });

      describe("with readOnly prop set to true", () => {
        it("then the SelectList should not be rendered", () => {
          wrapper.setProps({ readOnly: true });
          wrapper.update().find("input").simulate("keydown", { key: "Enter" });
          wrapper
            .find(Option)
            .forEach((option) => expect(option.getDOMNode()).not.toBeVisible());
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
      wrapper
        .find(Option)
        .forEach((option) => expect(option.getDOMNode()).not.toBeVisible());
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
          wrapper
            .find(Option)
            .forEach((option) => expect(option.getDOMNode()).not.toBeVisible());
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
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).toBeVisible());
      });

      it.each(["top", "bottom", "right", "left"])(
        "the listPlacement prop should be passed",
        (listPlacement) => {
          const wrapper = renderSelect({ listPlacement });

          wrapper
            .find(Textbox)
            .find('[type="dropdown"]')
            .first()
            .simulate("click");
          expect(wrapper.find(SelectList).prop("listPlacement")).toBe(
            listPlacement
          );
        }
      );

      it("the flipEnabled prop should be passed", () => {
        const wrapper = renderSelect({ flipEnabled: false });

        wrapper
          .find(Textbox)
          .find('[type="dropdown"]')
          .first()
          .simulate("click");
        expect(wrapper.find(SelectList).prop("flipEnabled")).toBe(false);
        wrapper.setProps({ flipEnabled: true });
        expect(wrapper.find(SelectList).prop("flipEnabled")).toBe(true);
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
          wrapper
            .find(Option)
            .forEach((option) => expect(option.getDOMNode()).not.toBeVisible());
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

  describe("when the filter text is part of the text value", () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = renderSelect({ defaultValue: "opt1" });
    });

    it("then that text should be selected", () => {
      const changeEventObject = { target: { value: "gre" } };

      wrapper.find("input").simulate("click");
      wrapper.find("input").simulate("change", changeEventObject);
      act(() => {
        wrapper.find(SelectList).prop("onSelectListClose")();
      });

      expect(
        (wrapper.find("input").getDOMNode() as HTMLInputElement).selectionStart
      ).toBe(3);
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
    const expectedDeleteEventObject = {
      target: {
        ...textboxProps,
        value: "",
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
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).toBeVisible());
        act(() => {
          wrapper.find(SelectList).prop("onSelect")(clickOptionObject);
        });
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).not.toBeVisible());
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
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).toBeVisible());
        act(() => {
          wrapper.find(SelectList).prop("onSelect")(navigationKeyOptionObject);
        });
        wrapper.update();
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).toBeVisible());
        expect(wrapper.find(Textbox).prop("value")).toBe("Foo");
        expect(wrapper.find(Textbox).prop("formattedValue")).toBe("Bar");
      });
    });

    describe("and the onChange prop is passed", () => {
      const onChangeFn = jest.fn();
      let wrapper: ReactWrapper;

      beforeEach(() => {
        onChangeFn.mockClear();
        wrapper = renderSelect({ ...textboxProps, onChange: onChangeFn });
      });

      it("then that prop should be called with the same value", () => {
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

      it("then should be called when value is deleted", () => {
        act(() => {
          wrapper.find("input").simulate("change", {
            target: { value: "" },
            nativeEvent: { inputType: "delete" },
          });
        });

        expect(onChangeFn).toHaveBeenCalledWith(expectedDeleteEventObject);
      });

      it("then should be called when value is not matched", () => {
        act(() => {
          wrapper.find("input").simulate("change", {
            target: { value: "aaaaa" },
          });
        });

        expect(onChangeFn).toHaveBeenCalledWith(expectedDeleteEventObject);
      });
    });
  });

  describe("when the onSelectListClose is called in the open SelectList", () => {
    it("the SelectList should be closed", () => {
      const wrapper = renderSelect();

      wrapper.find(Textbox).find('[type="dropdown"]').first().simulate("click");
      wrapper
        .find(Option)
        .forEach((option) => expect(option.getDOMNode()).toBeVisible());
      act(() => {
        wrapper.find(SelectList).prop("onSelectListClose")();
      });
      wrapper
        .find(Option)
        .forEach((option) => expect(option.getDOMNode()).not.toBeVisible());
    });
  });

  describe("when an HTML element is clicked when the SelectList is open", () => {
    let wrapper: ReactWrapper;
    let domNode: HTMLElement;

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
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).toBeVisible());
        act(() => {
          wrapper
            .find("input")
            .getDOMNode()
            .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).toBeVisible());
      });
    });

    describe("and that element is not part of the Select", () => {
      it("then the SelectList should be closed", () => {
        wrapper
          .find(Textbox)
          .find('[type="dropdown"]')
          .first()
          .simulate("click");
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).toBeVisible());
        act(() => {
          document.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).not.toBeVisible());
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
    let wrapper: ReactWrapper;
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
      it("then the onListAction prop should have been called", () => {
        onListActionFn.mockClear();
        act(() => {
          wrapper.find(SelectList).props().onListAction?.();
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
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).toBeVisible());
        expect(wrapper.find(SelectList).find("button").getDOMNode()).toBe(
          document.activeElement
        );
      });

      describe("with the rendered button already focused", () => {
        beforeEach(() => {
          act(() => {
            (wrapper.find("button").getDOMNode() as HTMLButtonElement).focus();
            document.body.dispatchEvent(tabKeyDownEvent);
          });
        });

        it("then the SelectList should be closed", () => {
          wrapper
            .find(Option)
            .forEach((option) => expect(option.getDOMNode()).not.toBeVisible());
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
    let wrapper: ReactWrapper;
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
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).toBeVisible());
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
          it("then the textbox value should be cleared", () => {
            expect(wrapper.find(Textbox).props().value).toBe("opt1");
            wrapper.setProps({ value: "" });
            expect(wrapper.update().find(Textbox).props().value).toBe("");
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

  describe("when parent re-renders", () => {
    const WrapperComponent = () => {
      const mockRef = useRef();

      return (
        <div>
          <FilterableSelect name="testSelect" id="testSelect" ref={mockRef}>
            <Option value="opt1" text="red" />
            <Option value="opt2" text="green" />
            <Option value="opt3" text="blue" />
            <Option value="opt4" text="black" />
          </FilterableSelect>
        </div>
      );
    };

    it("should persist the input value", () => {
      const wrapper = mount(<WrapperComponent />);
      wrapper.find(Textbox).find('[type="dropdown"]').first().simulate("click");
      act(() => {
        wrapper.find(Option).first().simulate("click");
      });
      expect(wrapper.update().find(Textbox).props().formattedValue).toBe("red");
      wrapper.setProps({ change: "bar" });
      expect(wrapper.update().find(Textbox).props().formattedValue).toBe("red");
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
    it("renders SelectList with a disablePortal prop assigned", () => {
      const wrapper = renderSelect({ disablePortal: true });

      wrapper.find(Textbox).find('[type="dropdown"]').first().simulate("click");
      expect(wrapper.find(SelectList).props().disablePortal).toBe(true);
    });
  });

  describe('when the "onBlur" prop has been passed and the input has been blurred', () => {
    it("then that prop should be called", () => {
      const onBlurFn = jest.fn();
      const wrapper = renderSelect({ onBlur: onBlurFn });

      wrapper.find("input").simulate("blur");
      expect(onBlurFn).toHaveBeenCalled();
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

  describe('when the "onFilterChange" prop has been passed', () => {
    it("then that prop should be invoked when the input text has changed", () => {
      const filterText = "foo";
      const onFilterChangeFn = jest.fn();
      const wrapper = renderSelect({ onFilterChange: onFilterChangeFn });

      wrapper
        .find("input")
        .simulate("change", { target: { value: filterText } });
      expect(onFilterChangeFn).toHaveBeenCalledWith(filterText);
    });

    it("then it should not be invoked when the component rerenders", () => {
      const Component = () => {
        const [onFilterChangeCalled, setOnFilterChangeCalled] = useState(false);

        return (
          <>
            <div id="on-filter-called">
              {onFilterChangeCalled ? "true" : "false"}
            </div>
            <FilterableSelect
              name="testSelect"
              id="testSelect"
              onFilterChange={() => setOnFilterChangeCalled(true)}
            >
              <Option value="opt1" text="red" />
              <Option value="opt2" text="green" />
              <Option value="opt3" text="blue" />
              <Option value="opt4" text="black" />
            </FilterableSelect>
          </>
        );
      };

      const wrapper = mount(<Component />);
      expect(wrapper.find("#on-filter-called").text()).toBe("false");
      wrapper.setProps({});
      expect(wrapper.find("#on-filter-called").text()).toBe("false");
    });
  });

  describe('when the "openOnFocus" prop is set', () => {
    describe("and the Textbox Input is focused", () => {
      it("the SelectList should be rendered", () => {
        const wrapper = renderSelect({ openOnFocus: true });

        wrapper.find("input").simulate("focus");
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).toBeVisible());
      });

      describe.each(["readOnly", "disabled"])(
        'with the "%s" prop passed',
        (prop) => {
          it("the SelectList should not be rendered", () => {
            const obj = { [prop]: true, openOnFocus: true };
            const wrapper = renderSelect(obj);

            wrapper.find("input").simulate("focus");
            wrapper
              .find(Option)
              .forEach((option) =>
                expect(option.getDOMNode()).not.toBeVisible()
              );
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
        let wrapper: ReactWrapper;
        let onOpenFn: jest.MockedFunction<
          Required<FilterableSelectProps>["onOpen"]
        >;

        beforeEach(() => {
          onOpenFn = jest.fn();
          wrapper = renderSelect({ onOpen: onOpenFn, openOnFocus: true });
        });

        it("then that prop should have been called", () => {
          wrapper.find("input").simulate("focus");
          expect(onOpenFn).toHaveBeenCalled();
        });

        it("then it should not be invoked when the component rerenders", () => {
          const Component = () => {
            const [callCounter, setCallCounter] = useState(0);

            return (
              <>
                <div id="call-counter">{callCounter}</div>
                <FilterableSelect
                  name="testSelect"
                  id="testSelect"
                  openOnFocus
                  onOpen={() => {
                    if (callCounter < 2) {
                      setCallCounter(callCounter + 1);
                    }
                  }}
                >
                  <Option value="opt1" text="red" />
                  <Option value="opt2" text="green" />
                  <Option value="opt3" text="blue" />
                  <Option value="opt4" text="black" />
                </FilterableSelect>
              </>
            );
          };

          wrapper = mount(<Component />);
          expect(wrapper.find("#call-counter").text()).toBe("0");
          wrapper.find("input").simulate("focus");
          expect(wrapper.find("#call-counter").text()).toBe("1");
          wrapper.setProps({});
          expect(wrapper.find("#call-counter").text()).toBe("1");
        });

        describe("and with the SelectList already open", () => {
          it("then that prop should not be called", () => {
            wrapper.find("input").simulate("focus");
            onOpenFn.mockReset();
            wrapper
              .find(Option)
              .forEach((option) => expect(option.getDOMNode()).toBeVisible());
            wrapper.find("input").simulate("focus");
            expect(onOpenFn).not.toHaveBeenCalled();
          });
        });

        describe("and the focus triggered by mouseDown on the input", () => {
          it("then that prop should have been called", () => {
            wrapper.find("input").simulate("mousedown");
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
        it("then that prop should not have been called", () => {
          wrapper
            .find(Textbox)
            .find('[type="dropdown"]')
            .first()
            .simulate("mousedown");
          wrapper.find("input").simulate("focus");
          expect(onOpenFn).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe("ARIA", () => {
    describe("when label is passed", () => {
      let wrapper: ReactWrapper;
      let labelId: string | undefined;

      beforeEach(() => {
        wrapper = renderSelect({ label: "color" });
        labelId = wrapper.find(Label).prop("labelId");
      });

      it("Textbox is passed the id of the label", () => {
        expect(wrapper.find(Textbox).prop("labelId")).toBe(labelId);
      });

      it("when opened, SelectList is passed the id of the label", () => {
        wrapper.find(InputIconToggle).simulate("click");
        expect(wrapper.find(SelectList).prop("labelId")).toBe(labelId);
      });
    });

    describe("when label is undefined", () => {
      let wrapper: ReactWrapper;

      beforeEach(() => {
        wrapper = renderSelect({ label: undefined });
      });
      it("Textbox isn't passed an id of a non-existent label", () => {
        expect(wrapper.find(Textbox).prop("labelId")).toBe(undefined);
      });
      it("when opened, SelectList isn't passed an id of a non-existent label", () => {
        wrapper.find(InputIconToggle).simulate("click");
        expect(wrapper.find(SelectList).prop("labelId")).toBe(undefined);
      });
    });
  });

  it("has the expected border radius styling", () => {
    const wrapper = renderSelect({});
    assertStyleMatch(
      { borderRadius: "var(--borderRadius050)" },
      wrapper.find(StyledInput)
    );

    assertStyleMatch(
      { borderRadius: "var(--borderRadius050)" },
      wrapper.find(StyledSelectListContainer)
    );
  });
});

describe("coverage filler for else path", () => {
  const wrapper = renderSelect();
  wrapper.find("input").simulate("blur");
});

describe("when maxWidth is passed", () => {
  it("should be passed to InputPresentation", () => {
    const wrapper = renderSelect({ maxWidth: "67%" });

    assertStyleMatch(
      {
        maxWidth: "67%",
      },
      wrapper.find(InputPresentation)
    );
  });

  it("renders with maxWidth as 100% when no maxWidth is specified", () => {
    const wrapper = renderSelect({ maxWidth: "" });

    assertStyleMatch(
      {
        maxWidth: "100%",
      },
      wrapper.find(InputPresentation)
    );
  });
});
