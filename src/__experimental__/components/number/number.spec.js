import React from "react";
import { mount } from "enzyme";
import Number from "./number.component";
import Textbox from "../textbox";
import Label from "../label";

describe("Number Input", () => {
  let wrapper, input, onChangeFn, onKeyDownFn;
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
        onChangeFn = jest.fn();
        jest.useFakeTimers();

        wrapper = renderNumberInput({
          value: defaultInputValue,
          onChange: onChangeFn,
        });
      });

      it("calls the onChange method", () => {
        simulateInputChange(wrapper, newValue);
        expect(onChangeFn).toHaveBeenCalled();
      });
    });

    describe.each(["10.5", "abc"])("a non integer like %s", (newValue) => {
      let inputInstance;

      describe("with the value prop not defined", () => {
        beforeEach(() => {
          onChangeFn = jest.fn();
          wrapper = renderNumberInput({});
          input = wrapper.find("input");
          inputInstance = input.instance();
          inputInstance.value = newValue;
          input.simulate("change");
        });

        it("input value should be an empty string", () => {
          expect(inputInstance.value).toBe("");
        });
      });

      describe("with the value prop defined", () => {
        beforeEach(() => {
          onChangeFn = jest.fn();
          jest.useFakeTimers();

          wrapper = renderNumberInput({
            value: defaultInputValue,
            onChange: onChangeFn,
          });

          setTextSelection(wrapper, selectionStart, selectionEnd);
          input = wrapper.find("input");
          inputInstance = input.instance();
          inputInstance.value = newValue;
          input.simulate("change");
        });

        it("does not call the onChange method", () => {
          expect(onChangeFn).not.toHaveBeenCalled();
        });

        describe("and when the value prop is defined", () => {
          it("input value is the same as in the prop", () => {
            expect(inputInstance.value).toEqual(defaultInputValue);
          });

          it("input's selection start and end are the same as set in the component", () => {
            expect(inputInstance.selectionStart).toBe(selectionStart);
            expect(inputInstance.selectionEnd).toBe(selectionEnd);
          });
        });
      });
    });
  });

  describe("when a key is pressed on it's input", () => {
    const keyDownParams = { target: { selectionStart: 2, selectionEnd: 4 } };
    let wrapperInstance;

    beforeEach(() => {
      onKeyDownFn = jest.fn();
      wrapper = renderNumberInput({
        value: defaultInputValue,
      });
      wrapperInstance = wrapper.instance();
      input = wrapper.find("input");
    });

    it("component's selection start and end should mirror the input ones", () => {
      input.simulate("keyDown", keyDownParams);
      expect(wrapperInstance.selectionStart).toBe(selectionStart);
      expect(wrapperInstance.selectionEnd).toBe(selectionEnd);
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
});

function renderNumberInput(props, renderer = mount) {
  return renderer(<Number {...props} />);
}

function simulateInputChange(wrapper, value) {
  const input = wrapper.find("input");
  input.instance().value = value;
  input.simulate("change");
}

function setTextSelection(wrapper, selectionStart, selectionEnd) {
  wrapper
    .find("input")
    .simulate("keyDown", { target: { selectionStart, selectionEnd } });
}
