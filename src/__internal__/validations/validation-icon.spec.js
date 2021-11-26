import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import ValidationIcon from "./validation-icon.component";
import ValidationIconStyle from "./validation-icon.style";
import { InputContext, InputGroupContext } from "../input-behaviour";
import Tooltip from "../../components/tooltip";
import { testStyledSystemMargin } from "../../__spec_helper__/test-utils";

jest.mock("@tippyjs/react/headless");

describe("ValidationIcon", () => {
  testStyledSystemMargin((props) => (
    <ValidationIcon {...props} error="error" />
  ));

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

  it('tooltips "position" prop should be "right"', () => {
    const wrapper = mount(<ValidationIcon error="error" />);
    const tooltipProps = wrapper.find(Tooltip).props();
    expect(tooltipProps.position).toBe("right");
  });

  it("shows the tooltip if input context has focus", () => {
    const tooltip = renderWithInputContext({ hasFocus: true }).find(Tooltip);
    expect(tooltip.props().isVisible).toEqual(true);
  });

  it("shows the tooltip if input context has mouse over", () => {
    const tooltip = renderWithInputContext({ hasMouseOver: true }).find(
      Tooltip
    );
    expect(tooltip.props().isVisible).toEqual(true);
  });

  it("shows the tooltip if input group context has focus", () => {
    const tooltip = renderWithInputContext({}, { hasFocus: true }).find(
      Tooltip
    );
    expect(tooltip.props().isVisible).toEqual(true);
  });

  it("shows the tooltip if input group context has mouse over", () => {
    const tooltip = renderWithInputContext({}, { hasMouseOver: true }).find(
      Tooltip
    );
    expect(tooltip.props().isVisible).toEqual(true);
  });

  it("shows the Tooltip if component has mouse over event", () => {
    const wrapper = mount(<ValidationIcon error="Message" />);
    wrapper.simulate("mouseover");
    expect(wrapper.find(Tooltip).props().isVisible).toEqual(true);
  });

  it("hides the Tooltip if component has mouse leave event", () => {
    const wrapper = mount(<ValidationIcon error="Message" />);
    wrapper.simulate("mouseover");
    wrapper.simulate("mouseleave");
    expect(wrapper.find(Tooltip).props().isVisible).toEqual(false);
  });

  it("shows the Tooltip if component has focus event", () => {
    const wrapper = mount(<ValidationIcon error="Message" />);
    wrapper.simulate("focus");
    expect(wrapper.find(Tooltip).props().isVisible).toEqual(true);
  });

  it("hides the Tooltip if component has blur event", () => {
    const wrapper = mount(<ValidationIcon error="Message" />);
    wrapper.simulate("focus");
    wrapper.simulate("blur");
    expect(wrapper.find(Tooltip).props().isVisible).toEqual(false);
  });

  it("passes tooltipId to the Tooltip component", () => {
    const tooltipId = "tooltip-id";
    const wrapper = mount(
      <ValidationIcon tooltipId={tooltipId} error="Message" />
    );
    expect(wrapper.find(Tooltip).props().id).toEqual(tooltipId);
  });

  describe("event handlers", () => {
    describe("validation", () => {
      it("onFocus", () => {
        const mockOnFocus = jest.fn();
        const wrapper = mount(
          <ValidationIcon error="Message" onFocus={mockOnFocus} />
        );
        act(() => {
          wrapper.find(ValidationIconStyle).props().onFocus();
        });
        expect(mockOnFocus).toHaveBeenCalled();
      });

      it("onBlur", () => {
        const mockOnBlur = jest.fn();
        const wrapper = mount(
          <ValidationIcon error="Message" onBlur={mockOnBlur} />
        );
        act(() => {
          wrapper.find(ValidationIconStyle).props().onBlur();
        });
        expect(mockOnBlur).toHaveBeenCalled();
      });
    });
  });

  describe("tooltipFlipOverrides", () => {
    it("sets Tooltip to flip `top` and `bottom` when `isPartOfInput` and no `tooltipFlipOverrides` set", () => {
      const wrapper = mount(<ValidationIcon isPartOfInput error="Message" />);
      expect(wrapper.find(Tooltip).props().flipOverrides).toEqual([
        "top",
        "bottom",
      ]);
    });

    it("sets Tooltip to flip to given placements defined by `tooltipFlipOverrides`", () => {
      const wrapper = mount(
        <ValidationIcon
          isPartOfInput
          tooltipFlipOverrides={["left", "top"]}
          error="Message"
        />
      );
      expect(wrapper.find(Tooltip).props().flipOverrides).toEqual([
        "left",
        "top",
      ]);
    });

    it("does not throw an error if a valid array is passed", () => {
      jest.spyOn(global.console, "error").mockImplementation(() => {});
      mount(
        <ValidationIcon
          error="Message"
          tooltipFlipOverrides={["top", "bottom"]}
        />
      );

      // eslint-disable-next-line no-console
      expect(console.error).not.toHaveBeenCalled();
      global.console.error.mockReset();
    });

    it("throws an error if a invalid array is passed", () => {
      jest.spyOn(global.console, "error").mockImplementation(() => {});
      mount(
        <ValidationIcon error="Message" tooltipFlipOverrides={["foo", "bar"]} />
      );

      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalled();
      global.console.error.mockReset();
    });
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
