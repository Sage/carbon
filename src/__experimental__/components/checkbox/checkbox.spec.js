import React from "react";
import TestRenderer from "react-test-renderer";
import { mount } from "enzyme";
import "jest-styled-components";
import { css } from "styled-components";
import Checkbox from "./checkbox.component";
import CheckableInput from "../checkable-input/checkable-input.component";
import { StyledCheckableInput } from "../checkable-input/checkable-input.style";
import FieldHelpStyle from "../field-help/field-help.style";
import HiddenCheckableInputStyle from "../checkable-input/hidden-checkable-input.style";
import StyledCheckableInputSvgWrapper from "../checkable-input/checkable-input-svg-wrapper.style";
import guid from "../../../utils/helpers/guid";
import { baseTheme } from "../../../style/themes";
import {
  assertStyleMatch,
  carbonThemesJestTable,
  mockMatchMedia,
} from "../../../__spec_helper__/test-utils";
import Label from "../label";

jest.mock("../../../utils/helpers/guid");
guid.mockImplementation(() => "guid-12345");

function render(props, renderer = TestRenderer.create, options = {}) {
  return renderer(
    <Checkbox name="my-checkbox" value="test" {...props} />,
    options
  );
}

describe("Checkbox", () => {
  describe("base theme", () => {
    it("renders as expected", () => {
      expect(render({})).toMatchSnapshot();
    });

    describe("when size=large", () => {
      let wrapper;

      beforeEach(() => {
        wrapper = render({ size: "large" }).toJSON();
      });

      it("applies the appropriate input display element styles", () => {
        const styles = {
          height: "24px",
          width: "24px",
        };

        assertStyleMatch(styles, wrapper, {
          modifier: css`
            ${StyledCheckableInput}
          `,
        });

        assertStyleMatch(styles, wrapper, {
          modifier: css`
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
            modifier: css`
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
            modifier: css`
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
            modifier: css`
              ${FieldHelpStyle}
            `,
          }
        );
      });

      describe("when labelSpacing is 2", () => {
        it("should apply the correct fieldHelp styles", () => {
          wrapper = render({ labelSpacing: 2, size: "large" }).toJSON();
          assertStyleMatch(
            {
              paddingLeft: "16px",
              marginLeft: "24px",
            },
            wrapper,
            {
              modifier: css`
                ${FieldHelpStyle}
              `,
            }
          );
        });
      });
    });

    describe("when size=large and fieldHelpInline=true", () => {
      const wrapper = render({ fieldHelpInline: true, size: "large" }).toJSON();

      it("applies the appropriate FieldHelp styles", () => {
        assertStyleMatch(
          {
            marginTop: "0",
          },
          wrapper,
          {
            modifier: css`
              ${FieldHelpStyle}
            `,
          }
        );
      });
    });

    describe("when checkbox is checked", () => {
      it("renders the correct check colour", () => {
        const wrapper = render({ checked: true }).toJSON();

        assertStyleMatch(
          {
            fill: baseTheme.checkable.checked,
          },
          wrapper,
          {
            modifier: css`
              ${HiddenCheckableInputStyle}:checked ~ ${StyledCheckableInputSvgWrapper} svg path
            `,
          }
        );
      });

      describe("and disabled=true", () => {
        const wrapper = render({ checked: true, disabled: true }).toJSON();

        it("renders the correct check colour", () => {
          assertStyleMatch(
            {
              fill: baseTheme.disabled.border,
            },
            wrapper,
            {
              modifier: css`
                ${HiddenCheckableInputStyle}:checked ~ ${StyledCheckableInputSvgWrapper} svg path
              `,
            }
          );
        });
      });
    });

    describe("when disabled=true", () => {
      const wrapper = render({ disabled: true }).toJSON();

      it("applies the appropriate svg wrapper styles", () => {
        assertStyleMatch(
          {
            backgroundColor: baseTheme.disabled.input,
            border: `1px solid ${baseTheme.disabled.border}`,
          },
          wrapper,
          { modifier: "svg" }
        );
      });

      it("applies the appropriate check styles", () => {
        assertStyleMatch(
          {
            fill: baseTheme.disabled.input,
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
            modifier: css`
              ${`${StyledCheckableInputSvgWrapper}:hover`}
            `,
          });
        });

        it("applies the appropriate svg focus styles", () => {
          assertStyleMatch(hoverFocusStyles, wrapper, {
            modifier: css`
              ${`${StyledCheckableInputSvgWrapper}:focus`}
            `,
          });
        });
      });
    });

    describe("with a left margin (ml prop)", () => {
      describe("when adaptiveSpacingBreakpoint prop is set", () => {
        describe("when screen bigger than breakpoint", () => {
          beforeEach(() => {
            mockMatchMedia(true);
          });

          it("should pass the correct margin to CheckableInput", () => {
            const wrapper = render(
              {
                label: "Label",
                adaptiveSpacingBreakpoint: 1000,
                ml: "10%",
              },
              mount
            );

            expect(wrapper.find(CheckableInput).props().ml).toEqual("10%");
          });
        });

        describe("when screen smaller than breakpoint", () => {
          beforeEach(() => {
            mockMatchMedia(false);
          });

          it('should pass "0" to CheckableInput', () => {
            const wrapper = render(
              {
                label: "Label",
                adaptiveSpacingBreakpoint: 1000,
                ml: "10%",
              },
              mount
            );

            expect(wrapper.find(CheckableInput).props().ml).toEqual("0");
          });
        });
      });
    });

    describe("when using validation props", () => {
      let wrapper;

      beforeEach(() => {
        wrapper = mount(<Checkbox name="checkbox-warning" value="my-value" />);
      });

      describe.each(["error", "warning", "info"])("when %s is true", (type) => {
        it("show correct border on radio", () => {
          wrapper.setProps({ [type]: true });
          const borderWidth = type === "error" ? 2 : 1;
          assertStyleMatch(
            {
              border: `${borderWidth}px solid ${baseTheme.colors[type]}`,
            },
            wrapper,
            { modifier: "svg" }
          );
        });
      });

      describe.each(["error", "warning", "info"])(
        'when %s is "string',
        (type) => {
          it("show correct border on radio", () => {
            wrapper.setProps({ [type]: "Message" });
            const borderWidth = type === "error" ? 2 : 1;
            assertStyleMatch(
              {
                border: `${borderWidth}px solid ${baseTheme.colors[type]}`,
              },
              wrapper,
              { modifier: "svg" }
            );
          });
        }
      );

      describe("when error is true", () => {
        it("render correct color for errors", () => {
          wrapper.setProps({
            error: true,
          });

          assertStyleMatch(
            {
              border: `2px solid ${baseTheme.colors.error}`,
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
              border: `1px solid ${baseTheme.colors.warning}`,
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
              border: `1px solid ${baseTheme.colors.info}`,
            },
            wrapper,
            { modifier: "svg" }
          );
        });
      });
    });

    describe("when fieldHelpInline is true", () => {
      it("renders the correct FieldHelp styles", () => {
        const wrapper = render({ fieldHelpInline: true }).toJSON();

        assertStyleMatch({ marginLeft: "0" }, wrapper, {
          modifier: css`
            ${FieldHelpStyle}
          `,
        });
      });
    });

    describe("when setting a custom inputWidth", () => {
      describe("default", () => {
        const wrapper = render({ inputWidth: 50 }).toJSON();

        it("renders the correct FieldHelp styles", () => {
          assertStyleMatch(
            {
              marginLeft: "50% !important",
            },
            wrapper,
            {
              modifier: css`
                ${FieldHelpStyle}
              `,
            }
          );
        });
      });

      describe("reversed", () => {
        it("renders the correct FieldHelp styles", () => {
          const wrapper = render({ inputWidth: 50, reverse: true }).toJSON();

          assertStyleMatch(
            {
              marginRight: "50% !important",
            },
            wrapper,
            {
              modifier: css`
                ${FieldHelpStyle}
              `,
            }
          );
        });
      });
    });

    describe("when reverse is true", () => {
      describe("default", () => {
        const wrapper = render({ reverse: true }).toJSON();

        it("renders the correct FieldHelp styles", () => {
          assertStyleMatch(
            {
              marginLeft: "0",
            },
            wrapper,
            {
              modifier: css`
                ${FieldHelpStyle}
              `,
            }
          );
        });
      });

      describe("and fieldHelpInline is true", () => {
        const wrapper = render({
          reverse: true,
          fieldHelpInline: true,
        }).toJSON();

        it("renders the correct CheckableInput styles", () => {
          assertStyleMatch(
            {
              marginRight: "8px",
            },
            wrapper,
            {
              modifier: css`
                ${StyledCheckableInput}
              `,
            }
          );
        });
      });
    });

    describe("when labelSpacing is 2", () => {
      const wrapper = render({ labelSpacing: 2 }).toJSON();
      assertStyleMatch(
        {
          paddingLeft: "16px",
          marginLeft: "16px",
        },
        wrapper,
        {
          modifier: css`
            ${FieldHelpStyle}
          `,
        }
      );
    });
  });

  describe.each(carbonThemesJestTable)(
    "when the theme is set to %s",
    (themeName, theme) => {
      it("sets the appropriate check colour", () => {
        const wrapper = render({ theme, checked: true }).toJSON();

        assertStyleMatch(
          {
            fill: theme.checkable.checked,
          },
          wrapper,
          {
            modifier: css`
              ${HiddenCheckableInputStyle}:checked ~ ${StyledCheckableInputSvgWrapper} svg path
            `,
          }
        );
      });
    }
  );

  describe("required", () => {
    let wrapper;

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
});
