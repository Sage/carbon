import React from "react";
import { mount, ReactWrapper } from "enzyme";
import Number, { NumberProps } from "./number.component";
import Textbox from "../textbox";
import Label from "../../__internal__/label";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import InputPresentation from "../../__internal__/input/input-presentation.component";
import Logger from "../../__internal__/utils/logger";

function renderNumberInput(
  props: NumberProps & React.RefAttributes<HTMLInputElement>
) {
  return mount(<Number {...props} />);
}

function setTextSelection(
  wrapper: ReactWrapper,
  selectionStart: number,
  selectionEnd: number
) {
  wrapper
    .find("input")
    .simulate("keyDown", { target: { selectionStart, selectionEnd } });
}

describe("Number Input", () => {
  let wrapper: ReactWrapper;
  let input: ReactWrapper;

  const onChangeFn = jest.fn();
  const onKeyDownFn = jest.fn();
  const selectionStart = 2;
  const selectionEnd = 4;
  const defaultInputValue = "123456789";

  describe("when rendered", () => {
    it("should have the Textbox component as it's child", () => {
      wrapper = renderNumberInput({});
      expect(wrapper.find(Textbox)).toHaveLength(1);
    });
  });

  describe("when it's input value is changed to", () => {
    describe.each([
      ["an integer", "123456789"],
      ["a negative integer", "-123456789"],
    ])("%s", (desc, newValue) => {
      beforeEach(() => {
        onChangeFn.mockClear();
        jest.useFakeTimers();

        wrapper = renderNumberInput({
          value: defaultInputValue,
          onChange: onChangeFn,
        });
      });

      it("calls the onChange method", () => {
        input = wrapper.find("input");
        input.simulate("change", { target: { value: newValue } });
        expect(onChangeFn).toHaveBeenCalled();
      });
    });

    describe.each(["10.5", "abc"])("a non integer like %s", (newValue) => {
      describe("with the value prop not defined", () => {
        beforeEach(() => {
          onChangeFn.mockClear();
          wrapper = renderNumberInput({});
          input = wrapper.find("input");
          input.getDOMNode<HTMLInputElement>().value = newValue;
          input.simulate("change");
        });

        it("input value should be an empty string", () => {
          expect(input.getDOMNode<HTMLInputElement>().value).toBe("");
        });
      });

      describe("with the value prop defined", () => {
        beforeEach(() => {
          onChangeFn.mockClear();
          jest.useFakeTimers();

          wrapper = renderNumberInput({
            value: defaultInputValue,
            onChange: onChangeFn,
          });

          setTextSelection(wrapper, selectionStart, selectionEnd);
          input = wrapper.find("input");
          input.getDOMNode<HTMLInputElement>().value = newValue;
          input.simulate("change");
        });

        it("does not call the onChange method", () => {
          expect(onChangeFn).not.toHaveBeenCalled();
        });

        describe("and when the value prop is defined", () => {
          it("input value is the same as in the prop", () => {
            expect(input.getDOMNode<HTMLInputElement>().value).toEqual(
              defaultInputValue
            );
          });

          it("input's selection start and end are the same as set in the component", () => {
            expect(input.getDOMNode<HTMLInputElement>().selectionStart).toBe(
              selectionStart
            );
            expect(input.getDOMNode<HTMLInputElement>().selectionEnd).toBe(
              selectionEnd
            );
          });
        });
      });
    });
  });

  describe("when a key is pressed on it's input", () => {
    const keyDownParams = { target: { selectionStart, selectionEnd } };

    beforeEach(() => {
      onKeyDownFn.mockClear();
      wrapper = renderNumberInput({
        value: defaultInputValue,
      });

      input = wrapper.find("input");
    });

    describe("and when onKeyDown prop is defined", () => {
      it("calls the onKeyDown prop method", () => {
        wrapper.setProps({ onKeyDown: onKeyDownFn });
        input.simulate("keyDown", keyDownParams);
        expect(onKeyDownFn).toHaveBeenCalled();
      });
    });
  });

  describe("required", () => {
    beforeAll(() => {
      wrapper = renderNumberInput({ label: "required", required: true });
    });

    it("the required prop is passed to the input", () => {
      input = wrapper.find("input");
      expect(input.prop("required")).toBe(true);
    });

    it("the isRequired prop is passed to the label", () => {
      const label = wrapper.find(Label);
      expect(label.prop("isRequired")).toBe(true);
    });
  });

  describe("when maxWidth is passed", () => {
    it("should be passed to InputPresentation", () => {
      wrapper = renderNumberInput({ maxWidth: "67%" });

      assertStyleMatch(
        {
          maxWidth: "67%",
        },
        wrapper.find(InputPresentation)
      );
    });

    it("renders with maxWidth as 100% when no maxWidth is specified", () => {
      wrapper = renderNumberInput({ maxWidth: "" });
      assertStyleMatch(
        {
          maxWidth: "100%",
        },
        wrapper.find(InputPresentation)
      );
    });
  });

  describe("refs", () => {
    it("should display deprecation warning when the inputRef prop is used", () => {
      const loggerSpy = jest.spyOn(Logger, "deprecate");
      const ref = () => {};

      wrapper = renderNumberInput({ inputRef: ref });

      expect(loggerSpy).toHaveBeenCalledWith(
        "The `inputRef` prop in `Number` component is deprecated and will soon be removed. Please use `ref` instead."
      );
      expect(loggerSpy).toHaveBeenCalledTimes(2);
      // will be called twice because the prop is passed to Textbox where another deprecation warning is triggered.
      wrapper.setProps({ prop1: true });
      expect(loggerSpy).toHaveBeenCalledTimes(2);
      loggerSpy.mockRestore();
    });

    it("accepts ref as a ref object", () => {
      const ref = { current: null };
      wrapper = renderNumberInput({ ref });

      expect(ref.current).toBe(wrapper.find("input").getDOMNode());
    });

    it("accepts ref as a ref callback", () => {
      const ref = jest.fn();
      wrapper = renderNumberInput({ ref });

      expect(ref).toHaveBeenCalledWith(wrapper.find("input").getDOMNode());
    });

    it("sets ref to empty after unmount", () => {
      const ref = { current: null };
      wrapper = renderNumberInput({ ref });

      wrapper.unmount();

      expect(ref.current).toBe(null);
    });
  });
});
