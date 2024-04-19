import React, { useRef } from "react";
import { mount, ReactWrapper } from "enzyme";
import { ThemeProvider } from "styled-components";
import { RadioButton, RadioButtonGroup } from ".";
import FieldHelpStyle from "../../__internal__/field-help/field-help.style";
import HiddenCheckableInputStyle from "../../__internal__/checkable-input/hidden-checkable-input.style";
import { StyledCheckableInput } from "../../__internal__/checkable-input/checkable-input.style";
import StyledCheckableInputSvgWrapper from "../../__internal__/checkable-input/checkable-input-svg-wrapper.style";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import guid from "../../__internal__/utils/helpers/guid";
import sageTheme from "../../style/themes/sage";
import RadioButtonStyle from "./radio-button.style";
import Tooltip from "../tooltip";
import StyledHelp from "../help/help.style";
import Logger from "../../__internal__/utils/logger";

jest.mock("../../__internal__/utils/logger");

const mockedGuid = "mocked-guid";
jest.mock("../../__internal__/utils/helpers/guid");

(guid as jest.MockedFunction<typeof guid>).mockReturnValue(mockedGuid);

function renderRadioButton(
  buttonProps = {},
  validations = {},
  theme = sageTheme,
  renderer = mount
) {
  return renderer(
    <ThemeProvider theme={theme}>
      <RadioButtonGroup name="radio-button-group" {...validations}>
        <RadioButton value="test" {...buttonProps} />
      </RadioButtonGroup>
    </ThemeProvider>
  );
}

const getRadioButton = (wrapper: ReactWrapper) => wrapper.find(RadioButton);

const validationTypes: ("error" | "warning" | "info")[] = [
  "error",
  "warning",
  "info",
];
const borderColorsByValidationTypes = {
  error: "var(--colorsSemanticNegative500)",
  warning: "var(--colorsSemanticCaution500)",
  info: "var(--colorsSemanticInfo500)",
};

describe("RadioButton", () => {
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
      mount(
        <RadioButtonGroup name="radio-button-group">
          <RadioButton value="test" />
        </RadioButtonGroup>
      );

      expect(loggerSpy).toHaveBeenCalledWith(
        "Uncontrolled behaviour in `Radio Button` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
      );

      expect(loggerSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("propTypes", () => {
    it("does not allow a children prop", () => {
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const expected =
        "This component is meant to be used as a self-closing tag. " +
        "You should probably use the label prop instead.";

      expect(() => renderRadioButton({ children: "someChildren" })).toThrow(
        expected
      );

      consoleSpy.mockRestore();
    });
  });

  it("the input ref should be forwarded", () => {
    let mockRef: React.RefObject<HTMLInputElement> | undefined;

    const WrapperComponent = () => {
      mockRef = useRef<HTMLInputElement>(null);

      return <RadioButton name="my-radio" value="test" ref={mockRef} />;
    };

    const wrapper = mount(<WrapperComponent />);

    expect(mockRef?.current).toBe(
      wrapper.find(HiddenCheckableInputStyle).getDOMNode()
    );
  });

  describe("when disabled === true", () => {
    describe("default", () => {
      const wrapper = renderRadioButton({ disabled: true });

      it("disables the input", () => {
        const radioInput = wrapper.find("input");
        expect(radioInput.getDOMNode<HTMLInputElement>().disabled).toBe(true);
      });

      it("applies the correct circle styles", () => {
        assertStyleMatch(
          { fill: "var(--colorsUtilityDisabled400)" },
          getRadioButton(wrapper),
          { modifier: "circle" }
        );
      });

      it("renders the correct checked colour", () => {
        assertStyleMatch(
          { fill: "var(--colorsUtilityDisabled600)" },
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
      const wrapper = getRadioButton(renderRadioButton({ size: "large" }));
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
          renderRadioButton({ reverse: true, size: "large" })
        );

        it("applies the correct FieldHelp styles", () => {
          assertStyleMatch({ padding: "0" }, wrapper, {
            modifier: `${FieldHelpStyle}`,
          });
        });
      });

      describe("and fieldHelpInline === true", () => {
        it("does not apply padding changes to FieldHelp", () => {
          const wrapper = renderRadioButton({
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
        const wrapper = renderRadioButton({}, { [type]: true });
        const borderWidth = type === "error" ? 2 : 1;
        assertStyleMatch(
          {
            border: `${borderWidth}px solid ${borderColorsByValidationTypes[type]}`,
          },
          wrapper.find(RadioButton).at(0),
          { modifier: "svg" }
        );
      });
    });

    describe.each(validationTypes)('%s === "string"', (type) => {
      it("show correct border on radio", () => {
        const wrapper = renderRadioButton({}, { [type]: "Message" });
        const borderWidth = type === "error" ? 2 : 1;
        assertStyleMatch(
          {
            border: `${borderWidth}px solid ${borderColorsByValidationTypes[type]}`,
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

  it("has the expected border radius styling", () => {
    const wrapper = mount(<RadioButtonStyle />);

    assertStyleMatch(
      {
        borderRadius: "var(--borderRadiusCircle)",
      },
      wrapper,
      { modifier: `${StyledCheckableInputSvgWrapper}` }
    );

    assertStyleMatch(
      {
        borderRadius: "var(--borderRadiusCircle)",
      },
      wrapper,
      { modifier: "svg" }
    );
  });
});
