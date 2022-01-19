import React from "react";
import { shallow, mount } from "enzyme";
import { act } from "react-dom/test-utils";

import Icon from "components/icon";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import ValidationIconStyle from "../validations/validation-icon.style";
import ValidationIcon from "../validations/validation-icon.component";

import InputIconToggle from "./input-icon-toggle.component";
import InputIconToggleStyle from "./input-icon-toggle.style";

describe("InputIconToggle", () => {
  describe("when initiated with the disabled prop set to true", () => {
    it("does not render anything", () => {
      expect(render({ disabled: true }).isEmptyRender()).toBeTruthy();
    });
  });

  describe("tooltip positioning", () => {
    it.each([
      ["left", "right"],
      ["right", "left"],
    ])(
      "when align prop is passed as %s, tooltip position should be set as %s",
      (align, tooltipPosition) => {
        const wrapper = render(
          { align, useValidationIcon: true, error: "Message" },
          shallow
        );
        expect(wrapper.find(ValidationIcon).props().tooltipPosition).toBe(
          tooltipPosition
        );
      }
    );
  });

  describe.each(["error", "warning", "info"])(
    "when %s validation prop is string and useValidationIcon is true",
    (validationProp) => {
      it("it renders a validation icon", () => {
        const wrapper = render({
          [validationProp]: "Message",
          useValidationIcon: true,
        });
        const validationIcon = wrapper.find(ValidationIcon);
        expect(validationIcon.exists()).toBe(true);
      });
    }
  );

  describe.each(["error", "warning", "info"])(
    "when %s validation prop is empty string and useValidationIcon is true",
    (validationProp) => {
      let wrapper;

      beforeAll(() => {
        wrapper = render(
          {
            inputIcon: "dropdown",
            [validationProp]: "",
            useValidationIcon: true,
          },
          mount
        );
      });

      it("it does not render a validation icon", () => {
        const validationIcon = wrapper.find(ValidationIcon);
        expect(validationIcon.exists()).toBe(false);
      });

      it("renders input icon", () => {
        expect(wrapper.find(Icon).props().type).toBe("dropdown");
      });
    }
  );

  describe.each(["error", "warning", "info"])(
    "when %s validation prop is string and useValidationIcon is true and readOnly is true",
    (validationProp) => {
      it("it renders a validation icon", () => {
        const wrapper = render({
          [validationProp]: "Message",
          useValidationIcon: true,
          readOnly: true,
        });
        const validationIcon = wrapper.find(ValidationIcon);
        expect(validationIcon.exists()).toBe(true);
      });
    }
  );

  describe.each(["error", "warning", "info"])(
    "when %s validation prop is string and useValidationIcon is false",
    (validationProp) => {
      it("renders input icon instead of validation icon", () => {
        const wrapper = render(
          {
            inputIcon: "dropdown",
            [validationProp]: "Message",
            useValidationIcon: false,
          },
          mount
        );
        expect(wrapper.find(ValidationIcon).exists()).toBe(false);
        expect(wrapper.find(Icon).props().type).toBe("dropdown");
      });
    }
  );

  describe.each(["error", "warning", "info"])(
    "when %s validation prop is true",
    (validationProp) => {
      it("renders input icon instead of validation icon", () => {
        const wrapper = render(
          {
            inputIcon: "dropdown",
            [validationProp]: true,
            useValidationIcon: false,
          },
          mount
        );
        expect(wrapper.find(ValidationIcon).exists()).toBe(false);
        expect(wrapper.find(Icon).props().type).toBe("dropdown");
      });
    }
  );

  describe.each(["error", "warning", "info"])(
    "when %s validation prop is true",
    (validationProp) => {
      it("does not render an icon when disabled is also true", () => {
        const wrapper = render(
          { inputIcon: "dropdown", [validationProp]: true, disabled: true },
          mount
        );
        expect(wrapper.find(ValidationIcon).exists()).toBe(false);
        expect(wrapper.find(Icon).exists()).toBe(false);
      });
    }
  );

  describe("does not render input icon", () => {
    it("when disabled prop is true", () => {
      const wrapper = render({ inputIcon: "dropdown", disabled: true }, mount);
      expect(wrapper.find(Icon).exists()).toBe(false);
    });
    it("when readOnly prop is true", () => {
      const wrapper = render({ inputIcon: "dropdown", readOnly: true }, mount);
      expect(wrapper.find(Icon).exists()).toBe(false);
    });
  });

  describe("sizes", () => {
    [
      ["small", "var(--sizing400)"],
      ["medium", "var(--sizing500)"],
      ["large", "var(--sizing600)"],
    ].forEach((size) => {
      it(`updates the width for ${size[0]}`, () => {
        assertStyleMatch(
          {
            width: size[1],
          },
          render({ size: size[0] }, mount)
        );
      });
    });
  });

  describe("default onKeydown handler", () => {
    it.each([
      ["Enter", 13],
      [" ", 32],
    ])(
      "prevents default when pressing `%s` and onClick is set",
      (key, which) => {
        const wrapper = render(
          { inputIcon: "dropdown", onClick: () => {} },
          mount
        );
        const event = { key, which, preventDefault: jest.fn() };
        act(() => {
          wrapper.simulate("keydown", event);
        });
        expect(event.preventDefault).toHaveBeenCalled();
      }
    );

    it("does not prevent default if onClick is not set", () => {
      const wrapper = render({ inputIcon: "dropdown" }, mount);
      const event = { key: " ", which: 32, preventDefault: jest.fn() };
      act(() => {
        wrapper.simulate("keydown", event);
      });
      expect(event.preventDefault).not.toHaveBeenCalled();
    });
  });

  describe("event handlers", () => {
    describe("validation", () => {
      it("onFocus", () => {
        const mockOnFocus = jest.fn();
        const wrapper = render(
          { error: "error", onFocus: mockOnFocus, useValidationIcon: true },
          mount
        );
        act(() => {
          wrapper.find(ValidationIconStyle).props().onFocus();
        });
        expect(mockOnFocus).toHaveBeenCalled();
      });

      it("onBlur", () => {
        const mockOnBlur = jest.fn();
        const wrapper = render(
          { error: "error", onBlur: mockOnBlur, useValidationIcon: true },
          mount
        );
        act(() => {
          wrapper.find(ValidationIconStyle).props().onBlur();
        });
        expect(mockOnBlur).toHaveBeenCalled();
      });
    });

    describe("basic", () => {
      it("onFocus", () => {
        const mockOnFocus = jest.fn();
        const wrapper = render(
          { inputIcon: "dropdown", onFocus: mockOnFocus },
          mount
        );
        act(() => {
          wrapper.find(InputIconToggleStyle).props().onFocus();
        });
        expect(mockOnFocus).toHaveBeenCalled();
      });

      it("onBlur", () => {
        const mockOnBlur = jest.fn();
        const wrapper = render(
          { inputIcon: "dropdown", onBlur: mockOnBlur },
          mount
        );
        act(() => {
          wrapper.find(InputIconToggleStyle).props().onBlur();
        });
        expect(mockOnBlur).toHaveBeenCalled();
      });
    });

    describe("tooltipId", () => {
      it("passes tooltipId to Icon", () => {
        const tooltipId = "tooltip-id";
        const wrapper = render({ inputIcon: "dropdown", tooltipId }, mount);

        expect(wrapper.find(Icon).props().tooltipId).toBe(tooltipId);
      });

      it("passes tooltipId to ValidationIcon", () => {
        const tooltipId = "tooltip-id";
        const wrapper = render(
          { error: "Error", tooltipId, useValidationIcon: true },
          mount
        );

        expect(wrapper.find(ValidationIcon).props().tooltipId).toBe(tooltipId);
      });
    });
  });
});

function render(props, renderer = shallow) {
  const defaultProps = { inputIcon: "settings" };

  return renderer(<InputIconToggle {...defaultProps} {...props} />);
}
