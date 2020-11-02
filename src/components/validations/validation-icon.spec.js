import React from "react";
import TestRenderer from "react-test-renderer";
import { mount } from "enzyme";
import ValidationIcon from "./validation-icon.component";
import ValidationIconStyle from "./validation-icon.style";
import {
  InputContext,
  InputGroupContext,
} from "../../__internal__/input-behaviour";
import ClassicTheme from "../../style/themes/classic";
import "jest-styled-components";
import Icon from "../icon";

describe("ValidationIcon", () => {
  it.each([
    [{ error: "Message" }, "error"],
    [{ warning: "Message" }, "warning"],
    [{ info: "Message" }, "info"],
  ])(
    "renders with a proper icon if validation prop is passed as string",
    (validation, iconType) => {
      const wrapper = mount(<ValidationIcon {...validation} />);
      expect(wrapper.find(ValidationIconStyle).prop("validationType")).toEqual(
        iconType
      );
    }
  );

  it.each([[{ error: true }], [{ warning: true }], [{ info: true }]])(
    "does not render any icon if validation prop is a string",
    (validation) => {
      const wrapper = mount(<ValidationIcon {...validation} />);
      expect(wrapper.find(ValidationIconStyle).exists()).toBe(false);
    }
  );

  it("renders with an icon with classic styling", () => {
    const wrapper = TestRenderer.create(
      <ValidationIconStyle theme={ClassicTheme} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('"tooltipPosition" and "tooltipAlign" props in its icon should be "right" and "center" respectively', () => {
    const wrapper = mount(<ValidationIcon error="error" />);
    const iconProps = wrapper.find(Icon).props();
    expect(iconProps.tooltipPosition).toBe("right");
    expect(iconProps.tooltipAlign).toBe("center");
  });

  it('does not pass "tooltipPosition" and "tooltipAlign" props to its icon for the classic theme', () => {
    const wrapper = mount(
      <ValidationIcon error="error" theme={ClassicTheme} />
    );
    const iconProps = wrapper.find(Icon).props();
    expect(iconProps.tooltipPosition).toBe(undefined);
    expect(iconProps.tooltipAlign).toBe(undefined);
  });

  it("shows the tooltip if input context has focus", () => {
    const icon = renderWithInputContext({ hasFocus: true }).find("Icon");
    expect(icon.props().tooltipVisible).toEqual(true);
  });

  it("shows the tooltip if input context has mouse over", () => {
    const icon = renderWithInputContext({ hasMouseOver: true }).find("Icon");
    expect(icon.props().tooltipVisible).toEqual(true);
  });

  it("shows the tooltip if input group context has focus", () => {
    const icon = renderWithInputContext({}, { hasFocus: true }).find("Icon");
    expect(icon.props().tooltipVisible).toEqual(true);
  });

  it("shows the tooltip if input group context has mouse over", () => {
    const icon = renderWithInputContext({}, { hasMouseOver: true }).find(
      "Icon"
    );
    expect(icon.props().tooltipVisible).toEqual(true);
  });
});

function renderWithInputContext(
  inputContextValue = {},
  inputGroupContextValue = {}
) {
  return mount(
    <InputContext.Provider value={inputContextValue}>
      <InputGroupContext.Provider value={inputGroupContextValue}>
        <ValidationIcon error="Message" />
      </InputGroupContext.Provider>
    </InputContext.Provider>
  );
}
