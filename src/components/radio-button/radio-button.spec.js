import React, { useRef } from "react";
import { mount } from "enzyme";
import { ThemeProvider } from "styled-components";
import TestRenderer from "react-test-renderer";
import { RadioButton, RadioButtonGroup } from ".";
import FieldHelpStyle from "../../__internal__/field-help/field-help.style";
import HiddenCheckableInputStyle from "../../__internal__/checkable-input/hidden-checkable-input.style";
import { StyledCheckableInput } from "../../__internal__/checkable-input/checkable-input.style";
import StyledCheckableInputSvgWrapper from "../../__internal__/checkable-input/checkable-input-svg-wrapper.style";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import guid from "../../__internal__/utils/helpers/guid";
import baseTheme from "../../style/themes/base";
import mintTheme from "../../style/themes/mint";
import RadioButtonStyle from "./radio-button.style";
import Tooltip from "../tooltip";
import StyledHelp from "../help/help.style";

jest.mock("../../__internal__/utils/helpers/guid");
guid.mockImplementation(() => "guid-12345");

function render(props = {}, theme = mintTheme, renderer = mount) {
  const { error, info, warning, ...buttonProps } = props;
  const groupProps = {
    error,
    info,
    warning,
    name: "radio-button-name",
  };
  return renderer(
    <ThemeProvider theme={theme}>
      <RadioButtonGroup name="my-radio-group" {...groupProps}>
        <RadioButton name="my-radio" value="test" {...buttonProps} />
      </RadioButtonGroup>
    </ThemeProvider>
  );
}

const getRadioButton = (wrapper) => wrapper.find(RadioButton);

const validationTypes = ["error", "warning", "info"];

describe("RadioButton", () => {
  describe("propTypes", () => {
    it("does not allow a children prop", () => {
      spyOn(console, "error");
      render({ children: "someChildren" });
      const expected =
        "Forbidden prop `children` supplied to `RadioButton`. " +
        "This component is meant to be used as a self-closing tag. " +
        "You should probably use the label prop instead.";
      const actual = console.error.calls.argsFor(0)[0];
      expect(actual).toMatch(expected);
    });
  });

  it("the input ref should be forwarded", () => {
    let ref;
    const WrapperComponent = () => {
      ref = useRef();

      return <RadioButton name="my-radio" value="test" ref={ref} />;
    };
    const wrapper = mount(<WrapperComponent />);

    expect(ref.current).toEqual(
      wrapper.find(HiddenCheckableInputStyle).getDOMNode()
    );
  });

  describe("base", () => {
    it("renders as expected", () => {
      expect(
        render({}, mintTheme, TestRenderer.create).toJSON()
      ).toMatchSnapshot();
    });
  });

  describe("when disabled === true", () => {
    describe("default", () => {
      const wrapper = render({ disabled: true });

      it("disables the input", () => {
        const radioInput = wrapper.find("input");
        expect(radioInput.getDOMNode().disabled).toBe(true);
      });

      it("applies the correct circle styles", () => {
        assertStyleMatch(
          { fill: baseTheme.disabled.input },
          getRadioButton(wrapper),
          { modifier: "circle" }
        );
      });

      it("renders the correct checked colour", () => {
        assertStyleMatch(
          { fill: baseTheme.disabled.border },
          getRadioButton(wrapper),
          {
            modifier: `${`${HiddenCheckableInputStyle}:checked + ${StyledCheckableInputSvgWrapper} circle`}`,
          }
        );
      });
    });
  });

  describe('when size === "large"', () => {
    describe("default", () => {
      const wrapper = getRadioButton(render({ size: "large" }));
      const dimensions = { height: "24px", width: "24px" };

      it("applies the correct input styles", () => {
        assertStyleMatch({ ...dimensions }, wrapper, {
          modifier: `${StyledCheckableInput}`,
        });
      });

      it("applies the correct hidden input styles", () => {
        assertStyleMatch(dimensions, wrapper, {
          modifier: `${HiddenCheckableInputStyle}`,
        });
      });

      it("applies the correct svg wrapper styles", () => {
        assertStyleMatch(dimensions, wrapper, {
          modifier: `${StyledCheckableInputSvgWrapper}`,
        });
      });

      it("applies the correct svg styles", () => {
        assertStyleMatch(dimensions, wrapper, { modifier: "svg" });
      });

      it("applies the correct circle styles", () => {
        assertStyleMatch({ r: "3.75" }, wrapper, { modifier: "circle" });
      });
    });

    describe("and reverse === true", () => {
      describe("default", () => {
        const wrapper = getRadioButton(
          render({ reverse: true, size: "large" })
        );

        it("applies the correct FieldHelp styles", () => {
          assertStyleMatch({ padding: "0" }, wrapper, {
            modifier: `${FieldHelpStyle}`,
          });
        });
      });

      describe("and fieldHelpInline === true", () => {
        it("does not apply padding changes to FieldHelp", () => {
          const wrapper = render({
            fieldHelpInline: true,
            reverse: true,
            size: "large",
          });
          assertStyleMatch({ padding: undefined }, getRadioButton(wrapper), {
            modifier: `${FieldHelpStyle}`,
          });
        });
      });
    });
  });

  describe("validations", () => {
    describe.each(validationTypes)("%s === true", (type) => {
      it("show correct border on radio", () => {
        const wrapper = render({ [type]: true });
        const borderWidth = type === "error" ? 2 : 1;
        assertStyleMatch(
          {
            border: `${borderWidth}px solid ${baseTheme.colors[type]}`,
          },
          wrapper.find(RadioButton).at(0),
          { modifier: "svg" }
        );
      });
    });

    describe.each(validationTypes)('%s === "string"', (type) => {
      it("show correct border on radio", () => {
        const wrapper = render({ [type]: "Message" });
        const borderWidth = type === "error" ? 2 : 1;
        assertStyleMatch(
          {
            border: `${borderWidth}px solid ${baseTheme.colors[type]}`,
          },
          wrapper.find(RadioButton).at(0),
          { modifier: "svg" }
        );
      });
    });
  });

  describe("tooltipPosition", () => {
    it("overrides the default position when value is passed", () => {
      const { position } = mount(
        <RadioButton
          value="foo"
          label="foo"
          error="message"
          tooltipPosition="bottom"
        />
      )
        .find(Tooltip)
        .props();

      expect(position).toEqual("bottom");
    });
  });

  it("applies the correct Legend Container styles", () => {
    assertStyleMatch(
      {
        marginLeft: "32px",
      },
      mount(<RadioButtonStyle inline />),
      { modifier: "&:not(:first-of-type)" }
    );
  });

  describe("helpAriaLabel", () => {
    it("should set the aria-label on the Help component", () => {
      const text = "foo";

      const { "aria-label": ariaLabel } = mount(
        <RadioButton
          value="foo"
          label={text}
          labelHelp={text}
          helpAriaLabel={text}
        />
      )
        .find(StyledHelp)
        .props();

      expect(ariaLabel).toEqual(text);
    });
  });
});
