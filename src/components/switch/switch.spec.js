import React from "react";
import { act } from "react-dom/test-utils";
import { css, ThemeProvider } from "styled-components";
import { mount } from "enzyme";

import Switch from ".";
import CheckableInput from "../../__internal__/checkable-input";
import { StyledCheckableInput } from "../../__internal__/checkable-input/checkable-input.style";
import FieldHelpStyle from "../../__internal__/field-help/field-help.style";
import HiddenCheckableInputStyle from "../../__internal__/checkable-input/hidden-checkable-input.style";
import { StyledLabelContainer } from "../../__internal__/label/label.style";
import StyledSwitchSlider from "./__internal__/switch-slider.style";
import guid from "../../__internal__/utils/helpers/guid";
import {
  assertStyleMatch,
  carbonThemesJestTable,
  mockMatchMedia,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import StyledValidationIcon from "../../__internal__/validations/validation-icon.style";
import { baseTheme } from "../../style/themes";
import SwitchSliderPanel from "./__internal__/switch-slider-panel.style";
import SwitchStyle from "./switch.style";
import Label from "../../__internal__/label";
import I18nProvider from "../i18n-provider";
import Tooltip from "../tooltip";
import StyledHelp from "../help/help.style";

jest.mock("../../__internal__/utils/helpers/guid");
guid.mockImplementation(() => "guid-12345");

const getLabel = (wrapper) => wrapper.find(SwitchSliderPanel).text();
const wrappingComponent = (props) => (
  <I18nProvider
    {...props}
    locale={{
      locale: () => "fr-FR",
      switch: {
        on: () => "sur",
        off: () => "de",
      },
    }}
  />
);

describe("Switch", () => {
  describe("Styled System", () => {
    testStyledSystemMargin((props) => <Switch {...props} />);
  });

  describe("uncontrolled behaviour", () => {
    it("sets proper default internal state", () => {
      const wrapper = render({ defaultChecked: true }, mount);
      expect(wrapper.find(CheckableInput).prop("checked")).toBe(true);
    });

    it("changes internal state and passes event to the provided onChange prop when change is triggered", () => {
      const onChangeMock = jest.fn();
      const event = {
        target: {
          checked: true,
          name: "some_name",
        },
      };
      const wrapper = render({ onChange: onChangeMock }, mount);
      act(() => {
        wrapper.find(CheckableInput).prop("onChange")(event);
      });
      expect(onChangeMock).toHaveBeenCalledWith(event);
      wrapper.update();
      expect(wrapper.find(CheckableInput).prop("checked")).toBe(true);
    });
  });

  describe("controlled behaviour", () => {
    it("passes checked value to the CheckableInput", () => {
      const wrapper = render({ checked: true, onChange: jest.fn() }, mount);
      expect(wrapper.find(CheckableInput).prop("checked")).toBe(true);
    });

    it("reacts properly to checked prop change", () => {
      const wrapper = render({ checked: true, onChange: jest.fn() }, mount);
      expect(wrapper.find(CheckableInput).prop("checked")).toBe(true);
      act(() => {
        wrapper.setProps({ checked: false });
      });
      wrapper.update();
      expect(wrapper.find(CheckableInput).prop("checked")).toBe(false);
    });

    it("passes event to the provided onChange prop when change is triggered", () => {
      const onChangeMock = jest.fn();
      const event = {
        target: {
          checked: true,
          name: "some_name",
        },
      };
      const wrapper = render({ checked: false, onChange: onChangeMock }, mount);
      act(() => {
        wrapper.find(CheckableInput).prop("onChange")(event);
      });
      expect(onChangeMock).toHaveBeenCalledWith(event);
    });
  });

  describe("i18n", () => {
    describe("default translation", () => {
      it("has default translation for on", () => {
        const wrapper = render({ checked: true, onChange: jest.fn() }, mount);
        expect(getLabel(wrapper)).toBe("ON");
      });

      it("has default translation for off", () => {
        const wrapper = render({ checked: false, onChange: jest.fn() }, mount);
        expect(getLabel(wrapper)).toBe("OFF");
      });
    });
  });

  describe("base theme", () => {
    describe("when reverse=false", () => {
      describe("default", () => {
        const wrapper = render({ reverse: false });

        it("applies the correct Label styles", () => {
          assertStyleMatch(
            {
              marginTop: "8px",
            },
            wrapper,
            {
              modifier: css`
                ${StyledLabelContainer}
              `,
            }
          );
        });
      });

      describe("and fieldHelpInline=true", () => {
        const wrapper = render({
          reverse: false,
          fieldHelpInline: true,
        });

        it("applies the correct FieldHelp styles", () => {
          assertStyleMatch(
            {
              margin: "0",
              marginTop: "8px",
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

      describe("and labelInline=true, fieldHelpInline=false", () => {
        const wrapper = render({
          fieldHelpInline: false,
          labelInline: true,
          reverse: false,
        });

        it("applies the correct FieldHelp styles", () => {
          assertStyleMatch(
            {
              marginLeft: "60px",
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

    describe("when fieldHelpInline=true", () => {
      const wrapper = render({ fieldHelpInline: true });

      it("applies the correct FieldHelp styles", () => {
        assertStyleMatch(
          {
            margin: "0",
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

    describe("when labelInline=true", () => {
      it("applies the correct Label styles", () => {
        const wrapper = render({ labelInline: true });
        assertStyleMatch(
          {
            marginBottom: "0",
          },
          wrapper,
          {
            modifier: css`
              ${StyledLabelContainer}
            `,
          }
        );
      });

      it("applies the correct FieldHelp styles", () => {
        const wrapper = render({ labelInline: true });
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

      describe("when adaptiveLabelBreakpoint prop is set", () => {
        describe("when screen bigger than breakpoint", () => {
          beforeEach(() => {
            mockMatchMedia(true);
          });

          it("should pass labelInline to its children", () => {
            const wrapper = render(
              {
                label: "Label",
                labelInline: true,
                adaptiveLabelBreakpoint: 1000,
              },
              mount
            );

            expect(wrapper.find(SwitchStyle).props().labelInline).toEqual(true);
            expect(wrapper.find(CheckableInput).props().labelInline).toEqual(
              true
            );
          });
        });

        describe("when screen smaller than breakpoint", () => {
          beforeEach(() => {
            mockMatchMedia(false);
          });

          it("should pass labelInline as false to its children", () => {
            const wrapper = render(
              {
                label: "Label",
                labelInline: true,
                adaptiveLabelBreakpoint: 1000,
              },
              mount
            );

            expect(wrapper.find(SwitchStyle).props().labelInline).toEqual(
              false
            );
            expect(wrapper.find(CheckableInput).props().labelInline).toEqual(
              false
            );
          });
        });
      });
    });

    describe("when fieldHelpInline=true and labelInline=true", () => {
      const wrapper = render({
        fieldHelpInline: true,
        labelInline: true,
      });

      it("applies the correct CheckableInput styles", () => {
        assertStyleMatch(
          {
            marginLeft: "10px",
          },
          wrapper,
          {
            modifier: css`
              ${StyledCheckableInput}
            `,
          }
        );
      });

      it("applies the correct Label styles", () => {
        assertStyleMatch(
          {
            marginRight: "10px",
          },
          wrapper,
          {
            modifier: css`
              ${StyledLabelContainer}
            `,
          }
        );
      });

      it("applies the correct FieldHelp styles", () => {
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

    describe("when size=large", () => {
      describe("default", () => {
        const wrapper = render({ size: "large" });

        const largeSizes = {
          height: "40px",
          width: "78px",
        };

        it("applies the correct CheckableInput styles", () => {
          assertStyleMatch(largeSizes, wrapper, {
            modifier: css`
              ${StyledCheckableInput}
            `,
          });
        });

        it("applies the correct HiddenCheckableInput styles", () => {
          assertStyleMatch(largeSizes, wrapper, {
            modifier: css`
              ${HiddenCheckableInputStyle}
            `,
          });
        });

        it("applies the correct SwitchSlider styles", () => {
          assertStyleMatch(largeSizes, wrapper, {
            modifier: css`
              ${StyledSwitchSlider}
            `,
          });
        });
      });

      describe("and labelInline=true", () => {
        it("applies the correct Label styles", () => {
          const wrapper = render({ size: "large", labelInline: true });

          assertStyleMatch(
            {
              marginTop: "1px",
              paddingTop: "10px",
              paddingBottom: "10px",
            },
            wrapper,
            {
              modifier: css`
                ${StyledLabelContainer}
              `,
            }
          );
        });

        describe("and reverse=false", () => {
          const wrapper = render({
            size: "large",
            labelInline: true,
            reverse: false,
          });

          it("applies the correct FieldHelp styles", () => {
            assertStyleMatch(
              {
                marginLeft: "78px",
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
    });
  });

  describe("validations", () => {
    const wrapper = render(
      {
        label: "My Label",
        labelHelp: "Please help me?",
      },
      mount
    );
    const validationTypes = ["error", "warning", "info"];

    beforeEach(() => {
      const props = {
        error: false,
        warning: false,
        info: false,
        validationOnLabel: false,
      };

      wrapper.setProps(props);
    });

    describe.each(validationTypes)("when %s prop passed as string", (type) => {
      it(`displays ${type} icon by the input`, () => {
        wrapper.setProps({
          [type]: "Message",
        });
        expect(
          wrapper
            .find(StyledSwitchSlider)
            .find(StyledValidationIcon)
            .prop("validationType")
        ).toEqual(type);
      });

      it(`displays ${type} icon by the label when validationOnLabel is passed as true`, () => {
        wrapper.setProps({
          [type]: "Message",
          validationOnLabel: true,
        });
        expect(
          wrapper
            .find(StyledLabelContainer)
            .find(StyledValidationIcon)
            .prop("validationType")
        ).toEqual(type);
      });

      it("renders proper validation styles", () => {
        wrapper.setProps({
          [type]: "Message",
        });
        const shadowWidth = type === "error" ? 2 : 1;
        assertStyleMatch(
          {
            boxShadow: `inset 0px 0px 0px ${shadowWidth}px ${baseTheme.colors[type]}`,
          },
          wrapper.find(StyledSwitchSlider)
        );
      });
    });

    describe.each(validationTypes)(
      "when %s prop passed as true boolean",
      (type) => {
        it(`displays ${type} icon by the label when validationOnLabel is passed as true`, () => {
          wrapper.setProps({
            [type]: true,
            validationOnLabel: true,
          });
          expect(wrapper.find(StyledValidationIcon).exists()).toBe(false);
        });

        it("renders proper validation styles", () => {
          wrapper.setProps({
            [type]: true,
          });
          const shadowWidth = type === "error" ? 2 : 1;
          assertStyleMatch(
            {
              boxShadow: `inset 0px 0px 0px ${shadowWidth}px ${baseTheme.colors[type]}`,
            },
            wrapper.find(StyledSwitchSlider)
          );
        });
      }
    );

    it("forces validation icon to be displayed on label when labelInline = true and reverse = false", () => {
      wrapper.setProps({ error: "Error", labelInline: true, reverse: false });

      expect(
        wrapper.find(StyledLabelContainer).find(StyledValidationIcon).exists()
      ).toEqual(true);
      expect(
        wrapper.find(StyledSwitchSlider).find(StyledValidationIcon).exists()
      ).toEqual(false);
    });
  });

  describe("tooltipPosition", () => {
    it("overrides the default placement when icon is on input", () => {
      const { position } = render(
        {
          label: "My Label",
          labelHelp: "Please help me?",
          tooltipPosition: "top",
        },
        mount
      )
        .find(Tooltip)
        .props();

      expect(position).toEqual("top");
    });

    it("overrides the default placement when icon is on label", () => {
      const { position } = render(
        {
          label: "My Label",
          labelHelp: "Please help me?",
          tooltipPosition: "top",
          validationOnLabel: true,
        },
        mount
      )
        .find(Tooltip)
        .props();

      expect(position).toEqual("top");
    });
  });

  describe("helpAriaLabel", () => {
    it("should set the aria-label on the Help component", () => {
      const text = "foo";
      const wrapper = render(
        { label: "foo", labelHelp: text, helpAriaLabel: text },
        mount
      );
      const help = wrapper.find(StyledHelp);

      expect(help.prop("aria-label")).toEqual(text);
    });
  });

  describe.each(carbonThemesJestTable)(
    "when the theme is set to %s",
    (themeName, theme) => {
      describe("default", () => {
        const wrapper = renderWithTheme({}, theme);

        describe("and hover is applied to the element", () => {
          it("then the correct background should be rendered", () => {
            assertStyleMatch(
              {
                backgroundColor: theme.switch.offHover,
              },
              wrapper,
              {
                modifier: css`
                  ${`${HiddenCheckableInputStyle}:not([disabled]):hover + ${StyledSwitchSlider}`}
                `,
              }
            );
          });
        });

        describe("and focus is applied to the element", () => {
          it("then the correct outline should be rendered", () => {
            assertStyleMatch(
              {
                outline: `solid 3px ${theme.colors.focus}`,
              },
              wrapper,
              {
                modifier: css`
                  ${`${HiddenCheckableInputStyle}:not([disabled]):focus + ${StyledSwitchSlider}`}
                `,
              }
            );
          });
        });
      });
    }
  );

  describe("required", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = render({ required: true, label: "required" }, mount);
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

describe("translation", () => {
  it("can use i18n for on", () => {
    const wrapper = render({ checked: true }, mount, {
      wrappingComponent,
    });

    expect(getLabel(wrapper)).toBe("sur");
  });

  it("can use i18n for off", () => {
    const wrapper = render({ checked: false }, mount, {
      wrappingComponent,
    });
    expect(getLabel(wrapper)).toBe("de");
  });
});

function render(props, renderer = mount, params) {
  return renderer(
    <Switch name="my-switch" value="test" onChange={() => {}} {...props} />,
    params
  );
}

function renderWithTheme(props, theme, renderer = mount) {
  return renderer(
    <ThemeProvider theme={theme}>
      <Switch name="my-switch" value="test" onChange={() => {}} {...props} />
    </ThemeProvider>
  );
}
