import React from "react";
import { mount } from "enzyme";
import Number from "./number.component";
import Textbox from "../textbox";
import Label from "../../__internal__/label";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import InputPresentation from "../../__internal__/input/input-presentation.component";

function renderNumberInput(props, renderer = mount) {
  return renderer(<Number {...props} />);
}

function setTextSelection(wrapper, selectionStart, selectionEnd) {
  wrapper
    .find("input")
    .simulate("keyDown", { target: { selectionStart, selectionEnd } });
}

describe("Number Input", () => {
  let wrapper;
  let input;

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
          input.getDOMNode().value = newValue;
          input.simulate("change");
        });

        it("input value should be an empty string", () => {
          expect(input.getDOMNode().value).toBe("");
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
          input.getDOMNode().value = newValue;
          input.simulate("change");
        });

        it("does not call the onChange method", () => {
          expect(onChangeFn).not.toHaveBeenCalled();
        });

        describe("and when the value prop is defined", () => {
          it("input value is the same as in the prop", () => {
            expect(input.getDOMNode().value).toEqual(defaultInputValue);
          });

          it("input's selection start and end are the same as set in the component", () => {
            expect(input.getDOMNode().selectionStart).toBe(selectionStart);
            expect(input.getDOMNode().selectionEnd).toBe(selectionEnd);
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
});
