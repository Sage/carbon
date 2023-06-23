import { mount } from "enzyme";
import React from "react";
import { assertStyleMatch } from "../../../../__spec_helper__/test-utils";
import SelectText, { SelectTextProps } from ".";

function renderSelectText(props: SelectTextProps = {}) {
  return mount(<SelectText {...props} />);
}

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
});
