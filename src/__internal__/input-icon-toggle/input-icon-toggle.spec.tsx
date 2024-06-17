import React from "react";
import { shallow, mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";

import { assertStyleMatch } from "../../__spec_helper__/__internal__/test-utils";
import ValidationIconStyle from "../validations/validation-icon.style";
import ValidationIcon from "../validations/validation-icon.component";
import Icon, { IconType } from "../../components/icon";

import InputIconToggle, { InputIconToggleProps } from ".";
import InputIconToggleStyle from "./input-icon-toggle.style";

function renderInputIconToggle(props: InputIconToggleProps) {
  const defaultProps = { inputIcon: "settings" as IconType };

  return <InputIconToggle {...defaultProps} {...props} />;
}

describe("InputIconToggle", () => {
  describe("tooltip positioning", () => {
    const testCases: [InputIconToggleProps["align"], string][] = [
      ["left", "right"],
      ["right", "left"],
    ];
    it.each(testCases)(
      "when align prop is passed as %s, tooltip position should be set as %s",
      (tooltipAlign, tooltipPosition) => {
        const wrapper = shallow(
          renderInputIconToggle({
            align: tooltipAlign,
            useValidationIcon: true,
            error: "Message",
          })
        );

        expect(wrapper.find(ValidationIcon).props().tooltipPosition).toBe(
          tooltipPosition
        );
      }
    );
  });

  describe.each(["error", "warning", "info"])(
    "when %s validation prop is set",
    (validationProp) => {
      describe("as a string and useValidationIcon is true", () => {
        it("renders a validation icon", () => {
          const wrapper = shallow(
            renderInputIconToggle({
              [validationProp]: "Message",
              useValidationIcon: true,
            })
          );
          const validationIcon = wrapper.find(ValidationIcon);
          expect(validationIcon.exists()).toBe(true);
        });

        describe("with disabled prop", () => {
          it("does render an icon", () => {
            const wrapper = mount(
              renderInputIconToggle({
                [validationProp]: "Message",
                useValidationIcon: true,
                disabled: true,
              })
            );
            expect(wrapper.find(ValidationIcon).exists()).toBe(false);
            expect(wrapper.find(Icon).exists()).toBe(true);
          });
        });

        describe("with readonly prop", () => {
          it("renders a validation icon", () => {
            const wrapper = shallow(
              renderInputIconToggle({
                [validationProp]: "Message",
                useValidationIcon: true,
                readOnly: true,
              })
            );
            expect(wrapper.find(ValidationIcon).exists()).toBe(true);
            expect(wrapper.find(Icon).exists()).toBe(false);
          });
        });
      });

      describe("as an empty string with useValidationIcon set to true", () => {
        let wrapper: ReactWrapper;

        beforeAll(() => {
          wrapper = mount(
            renderInputIconToggle({
              inputIcon: "dropdown",
              [validationProp]: "",
              useValidationIcon: true,
            })
          );
        });

        it("does not render a validation icon", () => {
          const validationIcon = wrapper.find(ValidationIcon);
          expect(validationIcon.exists()).toBe(false);
        });

        it("renders input icon", () => {
          expect(wrapper.find(Icon).props().type).toBe("dropdown");
        });
      });

      describe("as a boolean with useValidationIcon set to true", () => {
        let wrapper: ReactWrapper;

        beforeAll(() => {
          wrapper = mount(
            renderInputIconToggle({
              inputIcon: "dropdown",
              [validationProp]: true,
              useValidationIcon: true,
            })
          );
        });

        it("does not render a validation icon", () => {
          const validationIcon = wrapper.find(ValidationIcon);
          expect(validationIcon.exists()).toBe(false);
        });

        it("renders input icon", () => {
          expect(wrapper.find(Icon).props().type).toBe("dropdown");
        });
      });

      describe("as a string with useValidationIcon prop set to false", () => {
        it("renders input icon instead of validation icon", () => {
          const wrapper = mount(
            renderInputIconToggle({
              inputIcon: "dropdown",
              [validationProp]: "Message",
              useValidationIcon: false,
            })
          );
          expect(wrapper.find(ValidationIcon).exists()).toBe(false);
          expect(wrapper.find(Icon).props().type).toBe("dropdown");
        });
      });
    }
  );

  describe("renders input icon", () => {
    it("when disabled prop is true", () => {
      const wrapper = mount(
        renderInputIconToggle({ inputIcon: "dropdown", disabled: true })
      );
      expect(wrapper.find(Icon).exists()).toBe(true);
      expect(wrapper.find(Icon).prop("disabled")).toBe(true);
      assertStyleMatch(
        {
          cursor: "not-allowed",
        },
        wrapper.find(InputIconToggleStyle)
      );
    });
    it("when readOnly prop is true", () => {
      const wrapper = mount(
        renderInputIconToggle({ inputIcon: "dropdown", readOnly: true })
      );

      expect(wrapper.find(Icon).exists()).toBe(true);
      expect(wrapper.find(Icon).prop("disabled")).toBe(true);
      assertStyleMatch(
        {
          cursor: "default",
        },
        wrapper.find(InputIconToggleStyle)
      );
    });
  });

  describe.each([
    ["small", "var(--sizing400)"],
    ["medium", "var(--sizing500)"],
    ["large", "var(--sizing600)"],
  ])("sizes", (iconSize, width) => {
    it("updates the width for %s", () => {
      assertStyleMatch(
        {
          width,
        },
        mount(
          renderInputIconToggle({
            size: iconSize as InputIconToggleProps["size"],
          })
        )
      );
    });
  });

  describe("default onKeydown handler", () => {
    it.each([
      ["Enter", "Enter"],
      ["Space", " "],
    ])(
      "prevents default when pressing `%s` and onClick is set",
      (keyname, key) => {
        const wrapper = mount(
          renderInputIconToggle({ inputIcon: "dropdown", onClick: () => {} })
        );
        const event = { key, preventDefault: jest.fn() };
        act(() => {
          wrapper.simulate("keydown", event);
        });
        expect(event.preventDefault).toHaveBeenCalled();
      }
    );

    it("does not prevent default if onClick is not set", () => {
      const wrapper = mount(renderInputIconToggle({ inputIcon: "dropdown" }));
      const event = { key: " ", preventDefault: jest.fn() };
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
        const wrapper = mount(
          renderInputIconToggle({
            error: "error",
            onFocus: mockOnFocus,
            useValidationIcon: true,
          })
        );
        act(() => {
          wrapper.find(ValidationIconStyle).props().onFocus();
        });
        expect(mockOnFocus).toHaveBeenCalled();
      });

      it("onBlur", () => {
        const mockOnBlur = jest.fn();
        const wrapper = mount(
          renderInputIconToggle({
            error: "error",
            onBlur: mockOnBlur,
            useValidationIcon: true,
          })
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
        const wrapper = mount(
          renderInputIconToggle({ inputIcon: "dropdown", onFocus: mockOnFocus })
        );
        act(() => {
          wrapper.find(InputIconToggleStyle).props().onFocus();
        });
        expect(mockOnFocus).toHaveBeenCalled();
      });

      it("onBlur", () => {
        const mockOnBlur = jest.fn();
        const wrapper = mount(
          renderInputIconToggle({ inputIcon: "dropdown", onBlur: mockOnBlur })
        );
        act(() => {
          wrapper.find(InputIconToggleStyle).props().onBlur();
        });
        expect(mockOnBlur).toHaveBeenCalled();
      });
    });

    describe("validationIconId", () => {
      it("passes tooltipId to ValidationIcon", () => {
        const validationIconId = "validation-id";
        const wrapper = mount(
          renderInputIconToggle({
            error: "Error",
            validationIconId,
            useValidationIcon: true,
          })
        );

        expect(wrapper.find(ValidationIcon).props().tooltipId).toBe(
          validationIconId
        );
      });
    });
  });
});
