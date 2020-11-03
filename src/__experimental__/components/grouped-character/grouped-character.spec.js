import React from "react";
import { mount } from "enzyme";
import GroupedCharacter from "./grouped-character.component";
import Label from "../label";

const mountComponent = (props) => mount(<GroupedCharacter {...props} />);

describe("GroupedCharacter", () => {
  jest.useFakeTimers();
  const basicGroupConfig = [2, 2, 4];
  const separator = "-";
  const valueString = "12345678";

  describe("uncontrolled behaviour", () => {
    let instance, input, onChange;
    beforeEach(() => {
      onChange = jest.fn();

      instance = mountComponent({
        separator,
        defaultValue: "aabbcccc",
        groups: basicGroupConfig,
        onChange,
      });
      input = instance.find("input");
    });

    it("sets default input value same as defaultValue provided", () => {
      expect(input.props().value).toEqual("aa-bb-cccc");
    });

    it("invokes provided onChange handler with proper value", () => {
      input.simulate("change", {
        target: { value: "cc-aa-aabb", setSelectionRange: () => {} },
      });
      expect(onChange.mock.calls[0][0].target.value).toEqual({
        formattedValue: "cc-aa-aabb",
        rawValue: "ccaaaabb",
      });
    });
  });

  describe("functionality", () => {
    let instance, input, onChange, onBlur;
    beforeEach(() => {
      onChange = jest.fn();
      onBlur = jest.fn();

      instance = mountComponent({
        separator,
        groups: basicGroupConfig,
        value: valueString,
        onChange,
        onBlur,
      });
      input = instance.find("input");
    });

    it("takes configuration for how text should be grouped", () => {
      expect(input.props().value).toEqual("12-34-5678");
    });

    it("emits a formatted string on change event", () => {
      input.simulate("change", {
        target: { value: "123456", setSelectionRange: () => {} },
      });
      jest.runAllTimers();

      expect(onChange.mock.calls[0][0].target.value).toEqual({
        formattedValue: "12-34-56",
        rawValue: "123456",
      });
    });

    it("invokes provided onChange handler with proper event target name and id if those are provided", () => {
      input.simulate("change", {
        target: {
          value: "cc-aa-aabb",
          id: "unique_id",
          name: "nice_name",
          setSelectionRange: () => {},
        },
      });
      expect(onChange.mock.calls[0][0].target.id).toBe("unique_id");
      expect(onChange.mock.calls[0][0].target.name).toBe("nice_name");
    });

    it("emits a formatted string on blur event", () => {
      input.simulate("blur", { target: { value: "123456" } });
      expect(onBlur.mock.calls[0][0].target.value).toEqual({
        formattedValue: "12-34-56",
        rawValue: "123456",
      });
    });

    it("does nothing if onBlur is not provided", () => {
      instance.setProps({ onBlur: undefined });
      input.simulate("blur", { target: { value: "123456" } });
      expect(onBlur.mock.calls[1]).toBe(undefined);
    });

    it("does not allow a separator string containing multiple characters", () => {
      spyOn(console, "error");
      instance = mountComponent({
        separator: "-=",
        groups: basicGroupConfig,
        value: valueString,
        onChange,
      });
      const expected =
        "Warning: Failed prop type: Invalid prop separator supplied " +
        "to GroupedCharacter. Must be string of length 1.";
      const actual = console.error.calls.argsFor(0)[0];
      expect(actual).toMatch(expected);
      input = instance.find("input");
      expect(input.props().value).toEqual("12-34-5678");
    });

    it("does not allow values of length greater than that allowed by the group config", () => {
      instance = mountComponent({
        separator,
        groups: basicGroupConfig,
        value: "1234567890",
        onChange,
      });
      input = instance.find("input");
      expect(input.props().value).toEqual("12-34-5678");
    });
    it("prevents default when value string at max length", () => {
      const preventDefault = jest.fn();
      input.simulate("keypress", { preventDefault });
      expect(preventDefault).toHaveBeenCalled();
    });
    it("does not prevent default when value string  less than max length", () => {
      const preventDefault = jest.fn();
      instance = mountComponent({
        separator,
        groups: basicGroupConfig,
        value: "123",
        onChange,
      });
      input = instance.find("input");
      input.simulate("keypress", { preventDefault });
      expect(preventDefault).not.toHaveBeenCalled();
    });
  });

  describe("keydown events", () => {
    const setCursorOn = (node, setSelectionRange) => (selectionEnd, value) =>
      node.simulate("change", {
        target: { selectionEnd, value, setSelectionRange },
      });

    const assertSelectionRangeCalled = (selectionFn) => (position) =>
      expect(selectionFn).toHaveBeenCalledWith(position, position);

    let setInputCursorTo,
      assertInputCursorAt,
      setSelectionRange,
      instance,
      input,
      onChange;

    beforeEach(() => {
      onChange = jest.fn();
      setSelectionRange = jest.fn();

      instance = mountComponent({
        separator,
        groups: basicGroupConfig,
        value: valueString,
        onChange,
      });
      input = instance.find("input");
      setInputCursorTo = setCursorOn(input, setSelectionRange);
      assertInputCursorAt = assertSelectionRangeCalled(setSelectionRange);
    });

    describe("cursor positioned at the end of input", () => {
      it("pressing a character at the point where a separator should appear moves cursor forward", () => {
        setInputCursorTo(3, "123");
        jest.runAllTimers();
        assertInputCursorAt(4);

        setInputCursorTo(6, "12-345");
        jest.runAllTimers();
        assertInputCursorAt(7);
      });

      it("pressing backspace after a separating character moves cursor backwards", () => {
        setInputCursorTo(6, "12-34-");
        jest.runAllTimers();
        assertInputCursorAt(5);

        setInputCursorTo(3, "12-");
        jest.runAllTimers();
        assertInputCursorAt(2);
      });
    });

    describe("cursor positioned in the middle of input value", () => {
      it("pressing a character at the point where a separator should appear moves cursor forward", () => {
        instance.setProps({ value: "1222212" });
        setInputCursorTo(6, "12-223-212");
        jest.runAllTimers();
        assertInputCursorAt(7);
      });

      it("pressing backspace after a separating character moves cursor backwards", () => {
        instance.setProps({ value: "122122" });
        setInputCursorTo(3, "12-2-12");
        jest.runAllTimers();
        assertInputCursorAt(2);
      });
    });
  });

  describe("required", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mountComponent({
        label: "required",
        required: true,
        separator,
        groups: basicGroupConfig,
        value: "",
      });
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
});
