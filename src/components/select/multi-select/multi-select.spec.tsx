import React, { useRef, useState } from "react";
import { act } from "react-dom/test-utils";
import { mount, ReactWrapper } from "enzyme";

import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../../__spec_helper__/test-utils";
import { MultiSelect, Option, MultiSelectProps } from "..";
import Textbox from "../../textbox";
import SelectList from "../select-list/select-list.component";
import { StyledSelectList } from "../select-list/select-list.style";
import StyledSelectListContainer from "../select-list/select-list-container.style";
import Pill from "../../pill";
import Label from "../../../__internal__/label";
import InputPresentationStyle from "../../../__internal__/input/input-presentation.style";
import { InputPresentation } from "../../../__internal__/input";
import Logger from "../../../__internal__/utils/logger";
import guid from "../../../__internal__/utils/helpers/guid";

const mockedGuid = "mocked-guid";
jest.mock("../../../__internal__/utils/helpers/guid");

(guid as jest.MockedFunction<typeof guid>).mockReturnValue(mockedGuid);

function getSelect(props: Partial<MultiSelectProps> = {}) {
  return (
    <MultiSelect name="testSelect" id="testSelect" {...props}>
      <Option value="opt1" text="red" borderColor="red" fill />
      <Option value="opt2" text="green" borderColor="green" />
      <Option value="opt3" text="blue" />
    </MultiSelect>
  );
}

function renderSelect(props = {}, renderer = mount) {
  return renderer(getSelect(props));
}

jest.mock("../../../__internal__/utils/logger");

describe("MultiSelect", () => {
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
      renderSelect({ defaultValue: ["opt2", "opt1"] });

      expect(loggerSpy).toHaveBeenCalledWith(
        "Uncontrolled behaviour in `Multi Select` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
      );

      expect(loggerSpy).toHaveBeenCalledTimes(1);
    });
  });

  testStyledSystemMargin((props) => getSelect(props));

  it("when text is passed in placeholder prop, input element in textbox uses it as placeholder text", () => {
    const placeholder = "foobaz";
    const wrapper = renderSelect({ placeholder });
    expect(
      wrapper.find("input[data-element='input']").prop("placeholder")
    ).toBe(placeholder);
  });

  describe("when an HTML element is clicked", () => {
    let wrapper: ReactWrapper;
    let domNode: HTMLElement;

    beforeEach(() => {
      wrapper = mount(getSelect({ openOnFocus: true }));
      domNode = wrapper.getDOMNode();
      document.body.appendChild(domNode);
    });

    describe("and that element is part of the Select", () => {
      it("then the SelectList should be open", () => {
        wrapper.find("input").simulate("focus");
        wrapper
          .find(Option)
          .forEach((option) => expect(option.getDOMNode()).toBeVisible());
        act(() => {
          wrapper
            .find(StyledSelectList)
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
        wrapper.find("input").simulate("focus");
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

  describe("with a ref", () => {
    it("the input ref should be forwarded", () => {
      let mockRef = { current: null };

      const WrapperComponent = () => {
        mockRef = useRef(null);

        return (
          <MultiSelect name="testSelect" id="testSelect" ref={mockRef}>
            <Option value="opt1" text="red" />
            <Option value="opt2" text="green" />
            <Option value="opt3" text="blue" />
            <Option value="opt4" text="black" />
          </MultiSelect>
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
          <MultiSelect name="testSelect" id="testSelect" ref={mockRef}>
            <Option value="opt1" text="red" />
            <Option value="opt2" text="green" />
            <Option value="opt3" text="blue" />
            <Option value="opt4" text="black" />
          </MultiSelect>
        );
      };

      const wrapper = mount(<WrapperComponent />);

      expect(mockRef).toHaveBeenCalledWith(wrapper.find("input").getDOMNode());
    });
  });

  describe("when the inputRef function prop is specified", () => {
    it("should display deprecation warning when the inputRef prop is used", () => {
      const inputRefFn = jest.fn();
      const wrapper = renderSelect({ inputRef: inputRefFn });

      expect(loggerSpy.mock.calls).toEqual([
        [
          "The `inputRef` prop in `Multi Select` component is deprecated and will soon be removed. Please use `ref` instead.",
        ],
        [
          "The `inputRef` prop in `Textbox` component is deprecated and will soon be removed. Please use `ref` instead.",
        ],
      ]);
      expect(loggerSpy).toHaveBeenCalledTimes(2);
      // will be called twice because the prop is passed to Textbox where another deprecation warning is triggered.
      wrapper.setProps({ prop1: true });
      expect(loggerSpy).toHaveBeenCalledTimes(2);
      loggerSpy.mockRestore();
    });

    it("then the input reference should be returned on call", () => {
      const inputRefFn = jest.fn();
      const wrapper = renderSelect({ inputRef: inputRefFn });

      expect(inputRefFn).toHaveBeenCalledWith({
        current: wrapper.find("input").getDOMNode(),
      });
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

  describe("disablePortal", () => {
    it("renders SelectList with a disablePortal prop assigned", () => {
      const wrapper = renderSelect({ disablePortal: true });

      wrapper.find(Textbox).find('[type="dropdown"]').first().simulate("click");
      expect(wrapper.find(SelectList).props().disablePortal).toBe(true);
    });
  });

  it.each(["top", "bottom", "right", "left"])(
    "the listPlacement prop should be passed",
    (listPlacement) => {
      const wrapper = renderSelect({ listPlacement });

      wrapper.find(Textbox).find('[type="dropdown"]').first().simulate("click");
      expect(wrapper.find(SelectList).prop("listPlacement")).toBe(
        listPlacement
      );
    }
  );

  it("the flipEnabled prop should be passed", () => {
    const wrapper = renderSelect({ flipEnabled: false });

    wrapper.find(Textbox).find('[type="dropdown"]').first().simulate("click");
    expect(wrapper.find(SelectList).prop("flipEnabled")).toBe(false);
    wrapper.setProps({ flipEnabled: true });
    expect(wrapper.find(SelectList).prop("flipEnabled")).toBe(true);
  });

  it.each([
    ["small", "var(--sizing400)"],
    ["medium", "var(--sizing500)"],
    ["large", "var(--sizing600)"],
  ])("the input toggle icon should have proper left margin", (a, expected) => {
    const wrapper = renderSelect({ size: a });
    assertStyleMatch(
      {
        paddingRight: expected,
        position: "relative",
      },
      wrapper,
      { modifier: `${InputPresentationStyle}` }
    );
  });

  describe('when the "value" prop is passed', () => {
    it("then Pills should be rendered with corresponding titles", () => {
      const wrapper = renderSelect({
        value: ["opt1", "opt2"],
        onChange: jest.fn(),
      });

      expect(wrapper.find(Pill).at(0).prop("title")).toBe("red");
      expect(wrapper.find(Pill).at(1).prop("title")).toBe("green");
    });

    it("then Pills should be rendered with proper borderColor and fill props", () => {
      const wrapper = renderSelect({
        value: ["opt1", "opt2"],
        onChange: jest.fn(),
      });

      expect(wrapper.find(Pill).at(0).prop("borderColor")).toBe("red");
      expect(wrapper.find(Pill).at(0).prop("fill")).toBe(true);
      expect(wrapper.find(Pill).at(1).prop("borderColor")).toBe("green");
    });

    it("does not throw when no matching option found", () => {
      expect(() => {
        renderSelect({
          value: ["opt10"],
          onChange: jest.fn(),
        });
      }).not.toThrow();
    });
  });

  describe('when the "onFocus" prop has been passed and the input has been focused', () => {
    it("then that prop should be called", () => {
      const onFocusFn = jest.fn();
      const wrapper = renderSelect({ onFocus: onFocusFn });

      wrapper.find("input").simulate("focus");
      expect(onFocusFn).toHaveBeenCalled();
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
      'and "%s" key has been pressed',
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

    describe('and the "Enter" key has been pressed', () => {
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
  });

  describe('when the "onKeyDown" prop is passed', () => {
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

  describe.each(["Backspace", "Delete"])(
    'when a "%s" key has been pressed',
    (key) => {
      const keyDownEventObject = {
        key,
      };

      describe("and there is no filter text", () => {
        it("then the last value should be removed", () => {
          const wrapper = renderSelect({ defaultValue: ["opt2", "opt1"] });

          expect(wrapper.find(Pill)).toHaveLength(2);
          wrapper.find("input").simulate("keyDown", keyDownEventObject);
          expect(wrapper.find(Pill)).toHaveLength(1);
          expect(wrapper.find(Pill).props().title).toBe("green");
        });

        it("then the onChange prop should have been called", () => {
          const onChangeFn = jest.fn();
          const wrapper = renderSelect({
            defaultValue: ["opt2", "opt1"],
            onChange: onChangeFn,
          });

          onChangeFn.mockReset();
          wrapper.find("input").simulate("keyDown", keyDownEventObject);
          expect(onChangeFn).toHaveBeenCalled();
        });

        describe("with the value list already empty", () => {
          it("then the onChange prop should not have been called", () => {
            const onChangeFn = jest.fn();
            const wrapper = renderSelect({
              defaultValue: [],
              onChange: onChangeFn,
            });

            onChangeFn.mockReset();
            wrapper.find("input").simulate("keyDown", keyDownEventObject);
            expect(onChangeFn).not.toHaveBeenCalled();
          });
        });
      });

      describe("and the text in the Textbox is cleared after selection", () => {
        const mockOptionObject = {
          value: "opt3",
          text: "blue",
          selectionType: "enter",
        };
        const changeEventObject = { target: { value: "b" } };

        it("then the last value should be removed", () => {
          const wrapper = renderSelect({ defaultValue: ["opt2", "opt1"] });
          wrapper.find("input").simulate("change", changeEventObject);

          act(() => {
            wrapper.find(SelectList).prop("onSelect")(mockOptionObject);
          });
          expect(wrapper.update().find(Pill)).toHaveLength(3);
          wrapper.find("input").simulate("keyDown", keyDownEventObject);
          expect(wrapper.find(Pill)).toHaveLength(2);
        });
      });
    }
  );

  describe('when the "onDelete" prop has been called on a pill', () => {
    it("then a corresponding value should be removed from the Textbox value", () => {
      const wrapper = renderSelect({ defaultValue: ["opt1", "opt2", "opt3"] });

      act(() => {
        wrapper.find(Pill).at(0).props().onDelete?.();
      });

      expect(wrapper.update().find(Textbox).props().value).toEqual([
        "opt2",
        "opt3",
      ]);
    });
  });

  describe.each(["readOnly", "disabled"])(
    'when the "%s" prop is set in the Component',
    (prop) => {
      it('then there should not be the "onDelete" prop on a Pill', () => {
        const wrapper = renderSelect({
          defaultValue: ["opt1", "opt2", "opt3"],
          [prop]: true,
        });

        expect(wrapper.find(Pill).at(0).props().onDelete).toBe(undefined);
      });
    }
  );

  describe("when the Textbox Input is clicked", () => {
    it("the SelectList should not be rendered", () => {
      const wrapper = renderSelect();

      wrapper.find("input").simulate("click");
      wrapper
        .find(Option)
        .forEach((option) => expect(option.getDOMNode()).not.toBeVisible());
    });

    describe('and the "onClick" prop is passed', () => {
      it("then that prop should be called", () => {
        const onClickFn = jest.fn();
        const wrapper = renderSelect({ onClick: onClickFn });

        wrapper.find("input").simulate("click");
        expect(onClickFn).toHaveBeenCalled();
      });
    });

    describe('and the "onOpen" prop is passed', () => {
      it("then that prop should not be called", () => {
        const onOpenFn = jest.fn();
        const wrapper = renderSelect({ onOpen: onOpenFn });

        wrapper.find("input").simulate("click");
        expect(onOpenFn).not.toHaveBeenCalled();
      });

      describe("and the focus triggered by mouseDown on the input", () => {
        it("then that prop should not have been called", () => {
          const onOpenFn = jest.fn();
          const wrapper = renderSelect({ onOpen: onOpenFn });

          wrapper.find("input").simulate("mouseDown");
          wrapper.find("input").simulate("focus");
          expect(onOpenFn).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe("when the Dropdown Icon in the Textbox has been clicked", () => {
    it("the SelectList should be rendered", () => {
      const wrapper = renderSelect();

      wrapper.find(Textbox).find('[type="dropdown"]').first().simulate("click");
      wrapper
        .find(Option)
        .forEach((option) => expect(option.getDOMNode()).toBeVisible());
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

    describe('and the "onOpen" prop is passed', () => {
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

    describe('and the "onClick" prop is passed', () => {
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
        let onOpenFn: jest.MockedFunction<() => void>;

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
            wrapper
              .find(Option)
              .forEach((option) => expect(option.getDOMNode()).toBeVisible());
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

  describe("when a printable character has been typed in the Textbox", () => {
    it('the SelectList should have the "filterText" prop the same as the value', () => {
      const changeEventObject = { target: { value: "Foo" } };
      const wrapper = renderSelect();

      wrapper.find("input").simulate("click");
      wrapper.find("input").simulate("change", changeEventObject);
      expect(wrapper.update().find(SelectList).prop("filterText")).toBe("Foo");
    });

    describe('with the "onOpen" prop passed', () => {
      it("then that prop should be called", () => {
        const onOpenFn = jest.fn();
        const wrapper = renderSelect({ onOpen: onOpenFn });

        wrapper.find("input").simulate("change", { target: { value: "b" } });

        expect(onOpenFn).toHaveBeenCalled();
      });
    });
  });

  describe('when the "onSelect" is called in the SelectList', () => {
    const mockOptionObject = {
      value: "opt1",
      text: "red",
      selectionType: "enter",
    };
    const mockNavigationKeyOptionObject = {
      value: "opt1",
      text: "red",
      selectionType: "navigationKey",
    };
    const textboxProps = {
      name: "testName",
      id: "testId",
    };
    const expectedEventObject = {
      target: {
        ...textboxProps,
        value: ["opt1"],
      },
    };

    it("the SelectList should not be closed", () => {
      const wrapper = renderSelect({ openOnFocus: true });

      wrapper.find("input").simulate("focus");
      wrapper
        .find(Option)
        .forEach((option) => expect(option.getDOMNode()).toBeVisible());
      act(() => {
        wrapper.find(SelectList).prop("onSelect")(mockOptionObject);
      });
      wrapper
        .find(Option)
        .forEach((option) => expect(option.getDOMNode()).toBeVisible());
    });

    describe('and the "onChange" prop is passed', () => {
      it("then that prop should be called with the same value in a list", () => {
        const onChangeFn = jest.fn();
        const wrapper = renderSelect({
          ...textboxProps,
          onChange: onChangeFn,
          openOnFocus: true,
        });

        wrapper.find("input").simulate("focus");
        act(() => {
          wrapper.find(SelectList).prop("onSelect")(mockOptionObject);
        });
        expect(onChangeFn).toHaveBeenCalledWith(expectedEventObject);
      });

      describe('with the "selectionType" set to "navigationKey"', () => {
        it("sets correct highlighted element", () => {
          const onChangeFn = jest.fn();
          const wrapper = renderSelect({
            ...textboxProps,
            onChange: onChangeFn,
            openOnFocus: true,
          });

          wrapper.find("input").simulate("focus");
          onChangeFn.mockReset();
          act(() => {
            wrapper.find(SelectList).prop("onSelect")(
              mockNavigationKeyOptionObject
            );
          });

          wrapper.update();
          expect(wrapper.find(SelectList).prop("highlightedValue")).toBe(
            mockNavigationKeyOptionObject.value
          );
        });

        it("then that prop should not be called", () => {
          const onChangeFn = jest.fn();
          const wrapper = renderSelect({
            ...textboxProps,
            onChange: onChangeFn,
            openOnFocus: true,
          });

          wrapper.find("input").simulate("focus");
          onChangeFn.mockReset();
          act(() => {
            wrapper.find(SelectList).prop("onSelect")(
              mockNavigationKeyOptionObject
            );
          });
          expect(onChangeFn).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe("when an Option has been clicked", () => {
    it("then the SelectList should not be closed", () => {
      const wrapper = renderSelect({ openOnFocus: true });

      wrapper.find("input").simulate("focus");
      act(() => {
        wrapper.find(Option).first().simulate("click");
      });
      wrapper
        .find(Option)
        .forEach((option) => expect(option.getDOMNode()).toBeVisible());
    });

    describe('with the "onChange" prop passed', () => {
      describe("and that Option is already selected", () => {
        it("then that prop should not be called", () => {
          const onChangeFn = jest.fn();
          const wrapper = renderSelect({
            openOnFocus: true,
            defaultValue: ["opt1"],
          });

          wrapper.find("input").simulate("focus");
          act(() => {
            wrapper.find(Option).first().simulate("click");
          });
          expect(onChangeFn).not.toHaveBeenCalled();
        });
      });

      describe("and that Option value is an object and it is already selected", () => {
        it("then that prop should not be called", () => {
          const onChangeFn = jest.fn();
          const wrapper = mount(
            <MultiSelect
              name="testSelect"
              id="testSelect"
              openOnFocus
              defaultValue={[{ id: "id1", value: "opt1" }]}
            >
              <Option value={{ id: "id1", value: "opt1" }} text="red" />
              <Option value={{ id: "id2", value: "opt2" }} text="green" />
              <Option value={{ id: "id3", value: "opt3" }} text="blue" />
            </MultiSelect>
          );

          wrapper.find("input").simulate("focus");
          act(() => {
            wrapper.find(Option).first().simulate("click");
          });
          expect(onChangeFn).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('when the "onFilter" prop has been passed', () => {
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
            <MultiSelect
              name="testSelect"
              id="testSelect"
              onFilterChange={() => setOnFilterChangeCalled(true)}
            >
              <Option value="opt1" text="red" />
              <Option value="opt2" text="green" />
              <Option value="opt3" text="blue" />
              <Option value="opt4" text="black" />
            </MultiSelect>
          </>
        );
      };

      const wrapper = mount(<Component />);
      expect(wrapper.find("#on-filter-called").text()).toBe("false");
      wrapper.setProps({});
      expect(wrapper.find("#on-filter-called").text()).toBe("false");
    });
  });

  describe('when the "onSelectListClose" is called in the SelectList', () => {
    it("the SelectList should be closed", () => {
      const wrapper = renderSelect({ openOnFocus: true });

      wrapper.find("input").simulate("focus");
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

  describe("when the component is controlled", () => {
    const expectedObject = {
      target: {
        id: "testSelect",
        name: "testSelect",
        value: ["opt1", "opt2"],
      },
    };

    const clickOptionObject = {
      value: "opt2",
      text: "black",
      selectionType: "click",
    };

    describe("and an option is selected", () => {
      it("then the onChange prop should be called once with expected value", () => {
        const onChangeFn = jest.fn();
        const wrapper = renderSelect({ value: ["opt1"], onChange: onChangeFn });

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
        expect(onChangeFn).toHaveBeenCalledTimes(1);
        expect(onChangeFn).toHaveBeenCalledWith(expectedObject);
      });
    });

    describe.each(["Backspace", "Delete"])(
      'when a "%s" key has been pressed and there is no filter text',
      (key) => {
        const keyDownEventObject = {
          key,
        };

        it("then the onChange prop should have been called without the last option", () => {
          const onChangeFn = jest.fn();
          const wrapper = renderSelect({
            value: ["opt1", "opt2", "opt3"],
            onChange: onChangeFn,
          });

          onChangeFn.mockReset();
          wrapper.find("input").simulate("keyDown", keyDownEventObject);
          expect(onChangeFn).toHaveBeenCalledWith(expectedObject);
        });
      }
    );
  });

  describe("when parent re-renders", () => {
    const WrapperComponent = () => {
      const mockRef = useRef();

      return (
        <MultiSelect
          openOnFocus
          name="testSelect"
          id="testSelect"
          ref={mockRef}
        >
          <Option value="opt1" text="red" />
          <Option value="opt2" text="green" />
          <Option value="opt3" text="blue" />
          <Option value="opt4" text="black" />
        </MultiSelect>
      );
    };

    it("should persist the input value", () => {
      const wrapper = mount(<WrapperComponent />);
      wrapper.find("input").simulate("focus");
      act(() => {
        wrapper.find(Option).first().simulate("click");
      });
      expect(wrapper.update().find(Textbox).props().value).toEqual(["opt1"]);
      wrapper.setProps({ prop1: "bar" });
      expect(wrapper.update().find(Textbox).props().value).toEqual(["opt1"]);
    });
  });

  describe("required", () => {
    let wrapper: ReactWrapper;

    beforeAll(() => {
      wrapper = renderSelect({ label: "required", required: true });
    });

    it("the required prop is passed to the input", () => {
      const input = wrapper.find("input");
      expect(input.prop("required")).toBe(true);
    });

    it("the isRequired prop is passed to the label", () => {
      const label = wrapper.find(Label);
      expect(label.prop("isRequired")).toBe(true);
    });
  });

  describe("uncontrolled", () => {
    const onChangeFn = jest.fn();
    const mockOptionObject = {
      value: "opt1",
      text: "red",
      selectionType: "enter",
    };
    const textboxProps = {
      name: "testName",
      id: "testId",
    };
    const expectedEventObject = {
      target: {
        ...textboxProps,
        value: ["opt1"],
      },
    };
    const wrapper = renderSelect({
      ...textboxProps,
      onChange: onChangeFn,
      openOnFocus: true,
    });

    it("does not call the onChange callback on first render", () => {
      expect(onChangeFn).not.toHaveBeenCalled();
    });

    it("calls the onChange callback when an update occurs after first render", () => {
      wrapper.find("input").simulate("focus");
      act(() => {
        wrapper.find(SelectList).prop("onSelect")(mockOptionObject);
      });
      expect(onChangeFn).toHaveBeenCalledWith(expectedEventObject);
    });
  });

  describe("wrapPillText", () => {
    it("sets the allowTextWrap prop on the pills and overrides truncate value if true", () => {
      const pill = renderSelect({
        name: "testName",
        id: "testId",
        wrapPillText: true,
        truncatePillText: true,
        value: ["opt1"],
        onChange: jest.fn(),
      }).find(Pill);

      expect(pill.prop("wrapText")).toBe(true);
    });
  });
});

describe("aria-selected attribute for options", () => {
  let wrapper: ReactWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  describe("when controlled", () => {
    beforeEach(() => {
      wrapper = renderSelect({ value: ["opt1", "opt2"], onChange: () => {} });
    });

    it("the selected options have aria-selected=true", () => {
      expect(
        wrapper.find(Option).at(0).getDOMNode().getAttribute("aria-selected")
      ).toBe("true");

      expect(
        wrapper.find(Option).at(1).getDOMNode().getAttribute("aria-selected")
      ).toBe("true");
    });

    it("the not selected options have aria-selected=false", () => {
      expect(
        wrapper.find(Option).at(2).getDOMNode().getAttribute("aria-selected")
      ).toBe("false");
    });
  });

  describe("when uncontrolled", () => {
    beforeEach(() => {
      wrapper = renderSelect({ openOnFocus: true });
      wrapper.find("input").simulate("focus");
      act(() => {
        wrapper.find(Option).first().simulate("click");
        wrapper.find(Option).at(1).simulate("click");
      });
    });

    it("the selected options have aria-selected=true", () => {
      expect(
        wrapper.find(Option).at(0).getDOMNode().getAttribute("aria-selected")
      ).toBe("true");

      expect(
        wrapper.find(Option).at(1).getDOMNode().getAttribute("aria-selected")
      ).toBe("true");
    });

    it("the not selected options have aria-selected=false", () => {
      expect(
        wrapper.find(Option).at(2).getDOMNode().getAttribute("aria-selected")
      ).toBe("false");
    });
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
