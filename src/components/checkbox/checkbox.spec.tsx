import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { Checkbox, CheckboxProps } from ".";
import { StyledCheckableInput } from "../../__internal__/checkable-input/checkable-input.style";
import FieldHelpStyle from "../../__internal__/field-help/field-help.style";
import HiddenCheckableInputStyle from "../../__internal__/checkable-input/hidden-checkable-input.style";
import StyledCheckableInputSvgWrapper from "../../__internal__/checkable-input/checkable-input-svg-wrapper.style";
import guid from "../../__internal__/utils/helpers/guid";
import {
  assertStyleMatch,
  carbonThemesJestTable,
  mockMatchMedia,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import Label from "../../__internal__/label";
import Tooltip from "../tooltip";
import StyledHelp from "../help/help.style";
import Logger from "../../__internal__/utils/logger";
import CheckableInput, {
  CommonCheckableInputProps,
} from "../../__internal__/checkable-input";
import { StyledLabelContainer } from "../../__internal__/label/label.style";

jest.mock("../../__internal__/utils/logger");

jest.mock("../../__internal__/utils/helpers/guid");
(guid as jest.MockedFunction<typeof guid>).mockImplementation(
  () => "guid-12345"
);

const validationTypes = ["error", "warning", "info"];

function renderCheckbox(
  props: CheckboxProps & { ref?: React.ForwardedRef<HTMLInputElement> },
  renderer = mount,
  options = {}
) {
  return renderer(
    <Checkbox
      onChange={props.checked !== undefined ? () => {} : undefined}
      name="my-checkbox"
      value="test"
      {...props}
    />,
    options
  );
}

function getValidationBorderColor(
  validationType: typeof validationTypes[number]
) {
  switch (validationType) {
    case "error":
      return "var(--colorsSemanticNegative500)";
    case "warning":
      return "var(--colorsSemanticCaution500)";
    case "info":
      return "var(--colorsSemanticInfo500)";
    default:
      return "";
  }
}

describe("Checkbox", () => {
  let loggerSpy: jest.SpyInstance<void, [message: string]> | jest.Mock;

  beforeEach(() => {
    loggerSpy = jest.spyOn(Logger, "deprecate");
  });

  afterEach(() => {
    loggerSpy.mockRestore();
  });

  afterAll(() => {
    loggerSpy.mockClear();
  });

  describe("Deprecation warning for uncontrolled", () => {
    it("should display deprecation warning once", () => {
      mount(<Checkbox name="my-checkbox" />);

      expect(loggerSpy).toHaveBeenCalledWith(
        "Uncontrolled behaviour in `Checkbox` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
      );

      expect(loggerSpy).toHaveBeenCalledTimes(1);
    });
  });

  testStyledSystemMargin((props) => (
    <Checkbox name="my-checkbox" value="test" {...props} />
  ));

  describe("refs", () => {
    let wrapper: ReactWrapper;

    it("accepts ref as a ref object", () => {
      const ref = { current: null };
      wrapper = renderCheckbox({ ref });

      expect(ref.current).toBe(wrapper.find("input").getDOMNode());
    });

    it("accepts ref as a ref callback", () => {
      const ref = jest.fn();
      wrapper = renderCheckbox({ ref });

      expect(ref).toHaveBeenCalledWith(wrapper.find("input").getDOMNode());
    });

    it("sets ref to empty after unmount", () => {
      const ref = { current: null };
      wrapper = renderCheckbox({ ref });

      wrapper.unmount();

      expect(ref.current).toBe(null);
    });
  });

  describe("base theme", () => {
    describe("when size=large", () => {
      let wrapper: ReactWrapper;

      beforeEach(() => {
        wrapper = renderCheckbox({ size: "large" });
      });

      it("applies the appropriate input display element styles", () => {
        const styles = {
          height: "24px",
          width: "24px",
        };

        assertStyleMatch(styles, wrapper, {
          modifier: `
            ${StyledCheckableInput}
          `,
        });

        assertStyleMatch(styles, wrapper, {
          modifier: `
            ${HiddenCheckableInputStyle}
          `,
        });

        assertStyleMatch(styles, wrapper, { modifier: "svg" });

        assertStyleMatch(
          {
            height: "24px",
          },
          wrapper,
          {
            modifier: `
              ${StyledCheckableInputSvgWrapper}
            `,
          }
        );
      });

      it("applies the correct CheckboxSvgWrapper styles", () => {
        assertStyleMatch(
          {
            height: "24px",
          },
          wrapper,
          {
            modifier: `
              ${StyledCheckableInputSvgWrapper}
            `,
          }
        );
      });

      it("applies the appropriate FieldHelp styles", () => {
        assertStyleMatch(
          {
            marginLeft: "24px",
          },
          wrapper,
          {
            modifier: `
              ${FieldHelpStyle}
            `,
          }
        );
      });

      describe("when labelSpacing is 2", () => {
        it("should apply the correct fieldHelp styles", () => {
          wrapper = renderCheckbox({ labelSpacing: 2, size: "large" });
          assertStyleMatch(
            {
              paddingLeft: "var(--spacing200)",
              marginLeft: "24px",
            },
            wrapper,
            {
              modifier: `
                ${FieldHelpStyle}
              `,
            }
          );
        });
      });
    });

    describe("when size=large and fieldHelpInline=true", () => {
      const wrapper = renderCheckbox({ fieldHelpInline: true, size: "large" });

      it("applies the appropriate FieldHelp styles", () => {
        assertStyleMatch(
          {
            marginTop: "0",
          },
          wrapper,
          {
            modifier: `
              ${FieldHelpStyle}
            `,
          }
        );
      });
    });

    describe("when checkbox is checked", () => {
      it("renders the correct check colour", () => {
        const wrapper = renderCheckbox({ checked: true });

        assertStyleMatch(
          {
            fill: "var(--colorsUtilityYin090)",
          },
          wrapper,
          {
            modifier: `
              ${HiddenCheckableInputStyle}:checked ~ ${StyledCheckableInputSvgWrapper} svg path
            `,
          }
        );
      });

      describe("and disabled=true", () => {
        const wrapper = renderCheckbox({ checked: true, disabled: true });

        it("renders the correct check colour", () => {
          assertStyleMatch(
            {
              fill: "var(--colorsUtilityYin030)",
            },
            wrapper,
            {
              modifier: `
                ${HiddenCheckableInputStyle}:checked ~ ${StyledCheckableInputSvgWrapper} svg path
              `,
            }
          );
        });
      });
    });

    describe("when disabled=true", () => {
      const wrapper = renderCheckbox({ disabled: true });

      it("applies the appropriate svg wrapper styles", () => {
        assertStyleMatch(
          {
            backgroundColor: "var(--colorsUtilityDisabled400)",
            border: `1px solid var(--colorsUtilityDisabled600)`,
          },
          wrapper,
          { modifier: "svg" }
        );
      });

      it("applies the appropriate check styles", () => {
        assertStyleMatch(
          {
            fill: "var(--colorsUtilityDisabled400)",
          },
          wrapper,
          { modifier: "svg path" }
        );
      });

      describe("and hover / focus is applied", () => {
        const hoverFocusStyles = {
          outline: "none",
          cursor: "not-allowed",
        };

        it("applies the appropriate svg hover styles", () => {
          assertStyleMatch(hoverFocusStyles, wrapper, {
            modifier: `
              ${`${StyledCheckableInputSvgWrapper}:hover`}
            `,
          });
        });

        it("applies the appropriate svg focus styles", () => {
          assertStyleMatch(hoverFocusStyles, wrapper, {
            modifier: `
              ${`${StyledCheckableInputSvgWrapper}:focus`}
            `,
          });
        });
      });
    });

    describe("with a left margin", () => {
      describe("when adaptiveSpacingBreakpoint prop is set", () => {
        describe("when screen bigger than breakpoint", () => {
          beforeEach(() => {
            mockMatchMedia(true);
          });

          it("should set the correct margin", () => {
            const wrapper = renderCheckbox(
              {
                label: "Label",
                adaptiveSpacingBreakpoint: 1000,
                ml: "10%",
              },
              mount
            );

            assertStyleMatch({ marginLeft: "10%" }, wrapper);
          });
        });

        describe("when screen smaller than breakpoint", () => {
          beforeEach(() => {
            mockMatchMedia(false);
          });

          it('should set margin-left "0"', () => {
            const wrapper = renderCheckbox(
              {
                label: "Label",
                adaptiveSpacingBreakpoint: 1000,
                ml: "10%",
              },
              mount
            );

            assertStyleMatch({ marginLeft: "0" }, wrapper);
          });
        });
      });
    });

    describe("when using validation props", () => {
      let wrapper: ReactWrapper;

      beforeEach(() => {
        wrapper = mount(<Checkbox name="checkbox-warning" value="my-value" />);
      });

      describe.each(validationTypes)("when %s is true", (type) => {
        it("show correct border on radio", () => {
          wrapper.setProps({ [type]: true });
          const borderWidth = type === "error" ? 2 : 1;
          assertStyleMatch(
            {
              border: `${borderWidth}px solid ${getValidationBorderColor(
                type
              )}`,
            },
            wrapper,
            { modifier: "svg" }
          );
        });
      });

      describe.each(validationTypes)('when %s is "string', (type) => {
        it("show correct border on radio", () => {
          wrapper.setProps({ [type]: "Message" });
          const borderWidth = type === "error" ? 2 : 1;
          assertStyleMatch(
            {
              border: `${borderWidth}px solid ${getValidationBorderColor(
                type
              )}`,
            },
            wrapper,
            { modifier: "svg" }
          );
        });
      });

      describe("when error is true", () => {
        it("render correct color for errors", () => {
          wrapper.setProps({
            error: true,
          });

          assertStyleMatch(
            {
              border: `2px solid var(--colorsSemanticNegative500)`,
            },
            wrapper,
            { modifier: "svg" }
          );
        });
      });

      describe("when warning is true", () => {
        it("render correct color for warnings", () => {
          wrapper.setProps({
            warning: true,
          });

          assertStyleMatch(
            {
              border: `1px solid var(--colorsSemanticCaution500)`,
            },
            wrapper,
            { modifier: "svg" }
          );
        });
      });

      describe("when info is true", () => {
        it("render correct color for info", () => {
          wrapper.setProps({
            info: true,
          });

          assertStyleMatch(
            {
              border: `1px solid var(--colorsSemanticInfo500)`,
            },
            wrapper,
            { modifier: "svg" }
          );
        });
      });
    });

    describe("when fieldHelpInline is true", () => {
      it("renders the correct FieldHelp styles", () => {
        const wrapper = renderCheckbox({ fieldHelpInline: true });

        assertStyleMatch({ marginLeft: "0" }, wrapper, {
          modifier: `
            ${FieldHelpStyle}
          `,
        });
      });
    });

    describe("when setting a custom inputWidth", () => {
      describe("default", () => {
        const wrapper = renderCheckbox({ inputWidth: 50 });

        it("renders the correct FieldHelp styles", () => {
          assertStyleMatch(
            {
              marginLeft: "50% !important",
            },
            wrapper,
            {
              modifier: `
                ${FieldHelpStyle}
              `,
            }
          );
        });
      });

      describe("reversed", () => {
        it("renders the correct FieldHelp styles", () => {
          const wrapper = renderCheckbox({ inputWidth: 50, reverse: true });

          assertStyleMatch(
            {
              marginRight: "50% !important",
            },
            wrapper,
            {
              modifier: `
                ${FieldHelpStyle}
              `,
            }
          );
        });
      });
    });

    describe("when reverse is true", () => {
      describe("default", () => {
        const wrapper = renderCheckbox({ reverse: true });

        it("renders the correct FieldHelp styles", () => {
          assertStyleMatch(
            {
              marginLeft: "0",
            },
            wrapper,
            {
              modifier: `
                ${FieldHelpStyle}
              `,
            }
          );
        });
      });

      describe("and fieldHelpInline is true", () => {
        const wrapper = renderCheckbox({
          reverse: true,
          fieldHelpInline: true,
        });

        it("renders the correct CheckableInput styles", () => {
          assertStyleMatch(
            {
              marginRight: "8px",
            },
            wrapper,
            {
              modifier: `
                ${StyledCheckableInput}
              `,
            }
          );
        });
      });
    });

    describe("when labelSpacing is 2", () => {
      const wrapper = renderCheckbox({ labelSpacing: 2 });
      assertStyleMatch(
        {
          paddingLeft: "var(--spacing200)",
          marginLeft: "16px",
        },
        wrapper,
        {
          modifier: `
            ${FieldHelpStyle}
          `,
        }
      );
    });
  });

  describe.each(carbonThemesJestTable)("when the theme is set to %s", () => {
    it("sets the appropriate check colour", () => {
      const wrapper = renderCheckbox({ checked: true });

      assertStyleMatch(
        {
          fill: "var(--colorsUtilityYin090)",
        },
        wrapper,
        {
          modifier: `
            ${HiddenCheckableInputStyle}:checked ~ ${StyledCheckableInputSvgWrapper} svg path
          `,
        }
      );
    });
  });

  describe("required", () => {
    let wrapper: ReactWrapper;

    beforeAll(() => {
      wrapper = mount(<Checkbox value="foo" label="Required" required />);
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

  it("should append '(optional)' content on the label when the isOptional prop is true", () => {
    assertStyleMatch(
      {
        content: '"(optional)"',
      },
      mount(<Checkbox value="foo" label="Optional" isOptional />).find(
        StyledLabelContainer
      ),
      { modifier: "::after" }
    );
  });

  describe("labelHelp text", () => {
    it("should be displayed in tooltip message", () => {
      const text = "foo";
      const wrapper = renderCheckbox({ label: "foo", labelHelp: text }, mount);
      const tooltip = wrapper.find(Tooltip);

      expect(tooltip.prop("message")).toEqual(text);
    });
  });

  describe("helpAriaLabel", () => {
    it("should set the aria-label on the Help component", () => {
      const text = "foo";
      const wrapper = renderCheckbox(
        { label: "foo", labelHelp: text, helpAriaLabel: text },
        mount
      );
      const help = wrapper.find(StyledHelp);

      expect(help.prop("aria-label")).toEqual(text);
    });
  });

  describe("aria-labelledby", () => {
    it("should be passed down to the CheckableInput", () => {
      const labelId = "foo";
      const wrapper = renderCheckbox({ "aria-labelledby": labelId });

      expect(wrapper.find(CheckableInput).prop("ariaLabelledBy")).toBe(labelId);
    });
  });

  describe("tooltipPosition", () => {
    it("should override the default value", () => {
      const wrapper = renderCheckbox(
        { label: "foo", error: "message", tooltipPosition: "bottom" },
        mount
      );
      const { position } = wrapper.find(Tooltip).props();

      expect(position).toEqual("bottom");
    });
  });

  it.each<CommonCheckableInputProps["size"]>(["small", "large"])(
    "renders with the expected border radius styling when size is %s",
    (size) => {
      const wrapper = renderCheckbox({ size }, mount);

      assertStyleMatch(
        {
          borderRadius: `var(--borderRadius${
            size === "small" ? "025" : "050"
          })`,
        },
        wrapper,
        { modifier: `${StyledCheckableInput}` }
      );

      assertStyleMatch(
        {
          borderRadius: `var(--borderRadius${
            size === "small" ? "025" : "050"
          })`,
        },
        wrapper,
        { modifier: `${StyledCheckableInput}` }
      );

      assertStyleMatch(
        {
          borderRadius: `var(--borderRadius${
            size === "small" ? "025" : "050"
          })`,
        },
        wrapper,
        { modifier: `${StyledCheckableInputSvgWrapper}` }
      );

      assertStyleMatch(
        {
          borderRadius: `var(--borderRadius${
            size === "small" ? "025" : "050"
          })`,
        },
        wrapper,
        { modifier: "svg" }
      );
    }
  );
});
