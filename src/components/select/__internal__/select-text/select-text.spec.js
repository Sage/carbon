import { mount } from "enzyme";
import React from "react";
import { assertStyleMatch } from "../../../../__spec_helper__/test-utils";
import SelectText from "./select-text.component";
import { InputContext } from "../../../../__internal__/input-behaviour";

const mockInputContextValue = {
  onFocus: jest.fn(),
  onBlur: jest.fn(),
};

describe("SelectText", () => {
  it("renders span that has a role of 'button' and is hidden from screen readers", () => {
    const wrapper = renderSelectText();
    expect(wrapper.find("span[data-element='select-text']").prop("role")).toBe(
      "button"
    );
    expect(
      wrapper.find("span[data-element='select-text']").prop("aria-hidden")
    ).toBe(true);
  });

  it("should contain the text passed in formattedValue prop", () => {
    const formattedValue = "foo";
    const wrapper = renderSelectText({ formattedValue });

    expect(wrapper.text()).toBe(formattedValue);
  });

  it("should contain placeholder text when formattedValue is empty", () => {
    const placeholder = "foobaz";
    const wrapper = renderSelectText({ placeholder });
    expect(wrapper.text()).toBe(placeholder);
  });

  it("should have proper styling when disabled", () => {
    const wrapper = renderSelectText({ disabled: true });

    assertStyleMatch(
      {
        cursor: "not-allowed",
        color: "var(--colorsUtilityYin030)",
        textShadow: "none",
      },
      wrapper
    );
  });

  it("should have proper styling when readOnly", () => {
    const wrapper = renderSelectText({ readOnly: true });

    assertStyleMatch(
      {
        cursor: "default",
        color: "var(--colorsUtilityYin065)",
        textShadow: "none",
      },
      wrapper
    );
  });

  it("should have proper styling when transparent is set", () => {
    const wrapper = renderSelectText({
      transparent: true,
      formattedValue: "foo",
    });

    assertStyleMatch(
      {
        textAlign: "right",
        fontWeight: "900",
        flexDirection: "row-reverse",
      },
      wrapper
    );
  });

  describe("when the element is focused", () => {
    it("then the onFocus method in the InputContext should have been called", () => {
      const wrapper = mount(
        <InputContext.Provider value={mockInputContextValue}>
          <SelectText />
        </InputContext.Provider>
      );

      wrapper.simulate("focus");

      expect(mockInputContextValue.onFocus).toHaveBeenCalled();
    });

    it("then the onFocus method should have been called", () => {
      const onFocusFn = jest.fn();
      const wrapper = mount(
        <InputContext.Provider value={mockInputContextValue}>
          <SelectText onFocus={onFocusFn} />
        </InputContext.Provider>
      );
      wrapper.simulate("focus");

      expect(onFocusFn).toHaveBeenCalled();
    });
  });

  describe("when the element is blurred", () => {
    it("then the onFocus method in the InputContext should have been called", () => {
      const wrapper = mount(
        <InputContext.Provider value={mockInputContextValue}>
          <SelectText />
        </InputContext.Provider>
      );

      wrapper.simulate("blur");

      expect(mockInputContextValue.onBlur).toHaveBeenCalled();
    });

    it("then the onFocus method should have been called", () => {
      const onBlurFn = jest.fn();
      const wrapper = mount(
        <InputContext.Provider value={mockInputContextValue}>
          <SelectText onBlur={onBlurFn} />
        </InputContext.Provider>
      );
      wrapper.simulate("blur");

      expect(onBlurFn).toHaveBeenCalled();
    });
  });
});

function renderSelectText(props) {
  return mount(<SelectText {...props} />);
}
