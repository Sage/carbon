import React from "react";
import { mount } from "enzyme";
import TestRenderer from "react-test-renderer";
import "jest-styled-components";
import { ThemeProvider } from "styled-components";
import guid from "../../utils/helpers/guid";
import { baseTheme, mintTheme } from "../../style/themes";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import { StyledButtonToggleLabel } from "../button-toggle/button-toggle.style";
import StyledValidationIcon from "../validations/validation-icon.style";
import Label from "../../__experimental__/components/label";

import ButtonToggleGroup from "./button-toggle-group.component";
import ButtonToggle from "../button-toggle/button-toggle.component";
import ButtonToggleGroupStyle from "./button-toggle-group.style";
import FormField from "../../__experimental__/components/form-field";

jest.mock("../../utils/helpers/guid");
guid.mockImplementation(() => "guid-12345");

const formFieldProps = [
  ["label", "label"],
  ["labelHelp", "label help"],
  ["fieldHelp", "field help"],
  ["labelInline", true],
  ["labelWidth", 30],
  ["labelAlign", "right"],
];

describe("ButtonToggleGroup", () => {
  it("wraps ButtonToggle components in a FormField", () => {
    const wrapper = renderWithTheme({ theme: baseTheme }, mount);
    expect(wrapper.find(FormField).exists()).toBe(true);
    expect(wrapper.find(FormField).find(ButtonToggle).exists()).toBe(true);
  });

  describe.each(formFieldProps)(
    "when the %s prop is set in the main component",
    (propName, propValue) => {
      it("then it should be passed to the FormField", () => {
        const wrapper = renderWithTheme(
          { theme: baseTheme, [propName]: propValue },
          mount
        );
        expect(wrapper.find(FormField).exists()).toBe(true);
        expect(wrapper.find(FormField).prop(propName)).toBe(propValue);
      });
    }
  );

  describe("when the onChange function prop is set on the main component", () => {
    it("then it should be called on single input change", () => {
      const onChangeFn = jest.fn();
      const wrapper = renderWithTheme(
        { theme: baseTheme, onChange: onChangeFn },
        mount
      );
      wrapper.find(ButtonToggle).first().find("input").simulate("change");
      expect(onChangeFn).toHaveBeenCalled();
    });
  });

  describe("when the onBlur function prop is set on the main component", () => {
    it("then it should be called when a single input has been blurred", () => {
      const onBlurFn = jest.fn();
      const wrapper = renderWithTheme(
        { theme: baseTheme, onBlur: onBlurFn },
        mount
      );
      wrapper.find(ButtonToggle).first().find("input").simulate("blur");
      expect(onBlurFn).toHaveBeenCalled();
    });
  });

  describe("Modern theme", () => {
    it("renders correctly with default settings", () => {
      const wrapper = renderWithTheme({ theme: mintTheme });
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe("Style props", () => {
    it("renders with the correct width", () => {
      const wrapper = renderWithTheme(
        { theme: baseTheme, labelInline: true, inputWidth: 48 },
        mount
      );
      assertStyleMatch(
        {
          width: "48%",
        },
        wrapper.find(ButtonToggleGroupStyle)
      );
    });
  });

  describe("validations", () => {
    const validationTypes = ["error", "warning", "info"];
    describe.each(validationTypes)(
      "when %s prop is passed as string",
      (type) => {
        it("renders proper styles", () => {
          // eslint-disable-next-line max-len
          const boxShadow =
            type === "error"
              ? `inset 1px 1px 0 ${baseTheme.colors.error}, inset -1px -1px 0 ${baseTheme.colors.error}`
              : undefined;
          const wrapper = renderWithTheme(
            { theme: baseTheme, [type]: "Message" },
            mount
          );
          assertStyleMatch(
            {
              boxShadow,
              borderColor: baseTheme.colors[type],
            },
            wrapper.find(ButtonToggleGroupStyle),
            { modifier: `${StyledButtonToggleLabel}` }
          );
        });
        it("renders validation icon on input", () => {
          const wrapper = renderWithTheme(
            { theme: baseTheme, [type]: "Message" },
            mount
          );
          expect(
            wrapper
              .find(ButtonToggleGroupStyle)
              .find(StyledValidationIcon)
              .exists()
          ).toBe(true);
        });
        it("renders validation icon on label when validationOnLabel passed as true", () => {
          const wrapper = renderWithTheme(
            {
              label: "Label",
              theme: baseTheme,
              [type]: "Message",
              validationOnLabel: true,
            },
            mount
          );
          expect(wrapper.find(Label).find(StyledValidationIcon).exists()).toBe(
            true
          );
        });
      }
    );

    describe.each(validationTypes)(
      "when %s prop is passed as boolean",
      (type) => {
        it("renders proper styles", () => {
          // eslint-disable-next-line max-len
          const boxShadow =
            type === "error"
              ? `inset 1px 1px 0 ${baseTheme.colors.error}, inset -1px -1px 0 ${baseTheme.colors.error}`
              : undefined;
          const wrapper = renderWithTheme(
            { theme: baseTheme, [type]: true },
            mount
          );
          assertStyleMatch(
            {
              boxShadow,
              borderColor: baseTheme.colors[type],
            },
            wrapper.find(ButtonToggleGroupStyle),
            { modifier: `${StyledButtonToggleLabel}` }
          );
        });

        it("does not render validation icon", () => {
          const wrapper = renderWithTheme(
            { theme: baseTheme, [type]: true },
            mount
          );
          expect(wrapper.find(StyledValidationIcon).exists()).toBe(false);
        });
      }
    );
  });
});

function renderWithTheme(props = {}, renderer = TestRenderer.create) {
  const { theme, ...componentProps } = props;

  return renderer(
    <ThemeProvider theme={theme}>
      <ButtonToggleGroup
        id="button-toggle-group-id"
        name="button-toggle-group"
        {...componentProps}
      >
        <ButtonToggle id="foo" value="foo">
          Foo
        </ButtonToggle>
        <ButtonToggle id="bar" value="bar">
          Bar
        </ButtonToggle>
      </ButtonToggleGroup>
    </ThemeProvider>
  );
}
