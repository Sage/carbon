import { mount } from "enzyme";
import React from "react";
import { assertStyleMatch } from "../../../../__spec_helper__/test-utils";
import SelectText from "./select-text.component";
import Translation from "../../../../locales/en-gb";
import { InputContext } from "../../../../__internal__/input-behaviour";

const mockInputContextValue = {
  onFocus: jest.fn(),
  onBlur: jest.fn(),
};

describe("SelectText", () => {
  it("should contain the text passed in formattedValue prop", () => {
    const formattedValue = "foo";
    const wrapper = renderSelectText({ formattedValue });

    expect(wrapper.text()).toBe(formattedValue);
  });

  it("should contain translation placeholder text if the formattedValue prop is empty", () => {
    const wrapper = renderSelectText({});

    expect(wrapper.text()).toBe(Translation.select.placeholder());
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
        color: "var(--colorsYin065)",
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
