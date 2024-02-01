import React from "react";
import { HTMLAttributes, mount, ReactWrapper } from "enzyme";

import GroupedCharacter, {
  GroupedCharacterProps,
} from "./grouped-character.component";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import FormFieldStyle from "../../__internal__/form-field/form-field.style";
import Label from "../../__internal__/label";
import { InputPresentation } from "../../__internal__/input";
import Logger from "../../__internal__/utils/logger";
import StyledInput from "../../__internal__/input/input.style";
import { StyledLabelContainer } from "../../__internal__/label/label.style";

jest.mock("../../__internal__/utils/logger");

const mountComponent = (props: GroupedCharacterProps) =>
  mount(<GroupedCharacter {...props} />);

function renderGroupedCharacter(
  props: Partial<GroupedCharacterProps> & React.RefAttributes<HTMLInputElement>,
  renderer = mount
) {
  return renderer(
    <GroupedCharacter groups={[2, 2, 3]} separator="-" {...props} />
  );
}

describe("GroupedCharacter", () => {
  jest.useFakeTimers();
  const basicGroupConfig = [2, 2, 4];
  const separator = "-";
  const valueString = "12345678";

  testStyledSystemMargin(
    (props) => <GroupedCharacter groups={[2, 2, 3]} separator="-" {...props} />,
    undefined,
    (wrapper) => wrapper.find(FormFieldStyle),
    { modifier: "&&&" }
  );

  let loggerSpy: jest.SpyInstance<void, [message: string]> | jest.Mock;

  describe("Deprecation warning for uncontrolled", () => {
    beforeEach(() => {
      loggerSpy = jest.spyOn(Logger, "deprecate");
    });

    afterEach(() => {
      loggerSpy.mockRestore();
    });

    afterAll(() => {
      loggerSpy.mockClear();
    });

    it("should display deprecation warning once", () => {
      mount(<GroupedCharacter groups={[2, 2, 3]} separator="-" />);

      expect(loggerSpy).toHaveBeenCalledWith(
        "Uncontrolled behaviour in `Grouped Character` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
      );

      expect(loggerSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("uncontrolled behaviour", () => {
    let instance: ReactWrapper;
    let input: ReactWrapper<HTMLAttributes>;
    let onChange: jest.Mock;
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
    let instance: ReactWrapper;
    let input: ReactWrapper<HTMLAttributes>;
    let onChange: jest.Mock;
    let onBlur: jest.Mock;

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
    const setCursorOn = (node: ReactWrapper, setSelectionRange: jest.Mock) => (
      selectionEnd: number,
      value: string
    ) =>
      node.simulate("change", {
        target: { selectionEnd, value, setSelectionRange },
      });

    const assertSelectionRangeCalled = (selectionFn: jest.Mock) => (
      position: number
    ) => expect(selectionFn).toHaveBeenCalledWith(position, position);

    let setInputCursorTo: (selectionEnd: number, value: string) => void;
    let assertInputCursorAt: (position: number) => void;
    let setSelectionRange: jest.Mock;

    let instance: ReactWrapper;
    let input: ReactWrapper;
    let onChange: jest.Mock;

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
    let wrapper: ReactWrapper;

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

  it("should add '(optional)' suffix when the isOptional prop is true", () => {
    assertStyleMatch(
      {
        content: '"(optional)"',
      },
      mount(
        <GroupedCharacter
          groups={basicGroupConfig}
          separator={separator}
          label="optional"
          isOptional
        />
      ).find(StyledLabelContainer),
      { modifier: "::after" }
    );
  });

  describe("when maxWidth is passed", () => {
    it("should be passed to InputPresentation", () => {
      const wrapper = renderGroupedCharacter({ maxWidth: "67%" });

      assertStyleMatch(
        {
          maxWidth: "67%",
        },
        wrapper.find(InputPresentation)
      );
    });

    it("renders with maxWidth as 100% when no maxWidth is specified", () => {
      const wrapper = renderGroupedCharacter({ maxWidth: "" });

      assertStyleMatch(
        {
          maxWidth: "100%",
        },
        wrapper.find(InputPresentation)
      );
    });
  });

  describe("refs", () => {
    let wrapper: ReactWrapper;

    it("should display deprecation warning when the inputRef prop is used", () => {
      const ref = () => {};

      wrapper = renderGroupedCharacter({ inputRef: ref });

      expect(loggerSpy).toHaveBeenCalledWith(
        "The `inputRef` prop in `GroupedCharacter` component is deprecated and will soon be removed. Please use `ref` instead."
      );
      expect(loggerSpy).toHaveBeenCalledTimes(2);
      // will be called twice because the prop is passed to Textbox where another deprecation warning is triggered.
      wrapper.setProps({ prop1: true });
      expect(loggerSpy).toHaveBeenCalledTimes(2);
      loggerSpy.mockRestore();
    });

    it("accepts ref as a ref object", () => {
      const ref = { current: null };
      wrapper = renderGroupedCharacter({ ref });

      expect(ref.current).toBe(wrapper.find("input").getDOMNode());
    });

    it("accepts ref as a ref callback", () => {
      const ref = jest.fn();
      wrapper = renderGroupedCharacter({ ref });

      expect(ref).toHaveBeenCalledWith(wrapper.find("input").getDOMNode());
    });

    it("sets ref to empty after unmount", () => {
      const ref = { current: null };
      wrapper = renderGroupedCharacter({ ref });

      wrapper.unmount();

      expect(ref.current).toBe(null);
    });
  });

  it("renders with the expected border radius styling", () => {
    assertStyleMatch(
      {
        borderRadius: "var(--borderRadius050)",
      },
      mount(<GroupedCharacter groups={[2, 2, 3]} separator="-" />).find(
        StyledInput
      )
    );
  });
});
