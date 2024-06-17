import { mount } from "enzyme";
import React from "react";
import { assertStyleMatch } from "../../../../__spec_helper__/__internal__/test-utils";
import SelectText, { SelectTextProps } from ".";
import { StyledSelectTextChildrenWrapper } from "./select-text.style";

function renderSelectText(props: SelectTextProps = {}) {
  return mount(<SelectText {...props} />);
}

describe("SelectText", () => {
  it("renders span that is hidden from screen readers", () => {
    const wrapper = renderSelectText();

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

  it("should have proper styling applied to the children wrapper to ensure truncation is displayed", () => {
    const wrapper = renderSelectText({});

    assertStyleMatch(
      {
        display: "block",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
      wrapper.find(StyledSelectTextChildrenWrapper)
    );
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
      },
      wrapper
    );
  });
});
