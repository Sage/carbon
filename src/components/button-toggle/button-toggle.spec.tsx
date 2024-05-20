import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { ThemeProvider } from "styled-components";
import TestRenderer from "react-test-renderer";
import guid from "../../__internal__/utils/helpers/guid";
import { baseTheme } from "../../style/themes";
import { ButtonToggle, ButtonToggleGroup, ButtonToggleProps } from ".";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import {
  StyledButtonToggleIcon,
  ButtonToggleIconSizes,
  StyledButtonToggle,
  StyledButtonToggleWrapper,
} from "./button-toggle.style";
import { InputGroupContext } from "../../__internal__/input-behaviour";
import { ThemeObject } from "../../style/themes/base";
import Logger from "../../__internal__/utils/logger";

jest.mock("../../__internal__/utils/logger");

jest.mock("../../__internal__/utils/helpers/guid");
(guid as jest.MockedFunction<typeof guid>).mockImplementation(
  () => "guid-12345"
);

function renderButtonToggle(props: Partial<ButtonToggleProps> = {}) {
  return mount(<ButtonToggle {...props}>Button</ButtonToggle>);
}

function renderButtonToggleWithTheme(
  props: Partial<ButtonToggleProps & { theme: ThemeObject }> = {}
) {
  const { theme, ...componentProps } = props;

  return mount(
    <ThemeProvider theme={theme}>
      <ButtonToggle {...componentProps}>Button</ButtonToggle>
    </ThemeProvider>
  );
}

function renderButtonToggleWithContext(
  props: Partial<ButtonToggleProps> = {},
  inputGroupContextValue = {}
) {
  return mount(
    <InputGroupContext.Provider value={inputGroupContextValue}>
      <ButtonToggle {...props}>Button</ButtonToggle>
    </InputGroupContext.Provider>
  );
}

describe("ButtonToggle", () => {
  describe("Deprecation warnings", () => {
    let loggerSpy: jest.SpyInstance<void, [message: string]> | jest.Mock;

    beforeEach(() => {
      loggerSpy = jest.spyOn(Logger, "deprecate").mockImplementation(() => {});
    });

    afterEach(() => {
      loggerSpy.mockRestore();
    });

    afterAll(() => {
      loggerSpy.mockClear();
    });

    it("should display a deprecation warning for uncontrolled behaviour which is triggered only once", () => {
      renderButtonToggle();

      expect(loggerSpy).toHaveBeenCalledWith(
        "Uncontrolled behaviour in `Button Toggle` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
      );

      expect(loggerSpy).toHaveBeenCalledTimes(1);
    });

    it("should display a deprecation warning for the name prop which is triggered only once", () => {
      const wrapper = renderButtonToggle({ name: "foo" });

      expect(loggerSpy).toHaveBeenCalledWith(
        `The \`name\` prop in \`ButtonToggle\` component is deprecated and will soon be removed. It does not provide any functionality
      since the component can no longer be used in an uncontrolled fashion.`
      );

      expect(loggerSpy).toHaveBeenCalledTimes(1);

      wrapper.setProps({ prop1: true });
      expect(loggerSpy).toHaveBeenCalledTimes(1);
    });

    it("should display a deprecation warning for the grouped prop which is triggered only once", () => {
      const wrapper = renderButtonToggle({ grouped: true });

      expect(loggerSpy).toHaveBeenCalledWith(
        "The `grouped` prop in `ButtonToggle` component is deprecated and will soon be removed. Spacing between buttons is no longer no removed."
      );

      expect(loggerSpy).toHaveBeenCalledTimes(1);

      wrapper.setProps({ prop1: true });
      expect(loggerSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("functionality", () => {
    it("pass onBlur props to button", () => {
      const onBlurMock = jest.fn();
      const wrapper = renderButtonToggleWithTheme({
        theme: baseTheme,
        onBlur: onBlurMock,
      });

      wrapper.find(StyledButtonToggle).simulate("blur");
      expect(onBlurMock.mock.calls.length).toBe(1);
    });

    it("pass onFocus props to button", () => {
      const onFocusMock = jest.fn();
      const wrapper = renderButtonToggleWithTheme({
        theme: baseTheme,
        onFocus: onFocusMock,
      });

      wrapper.find(StyledButtonToggle).simulate("focus");
      expect(onFocusMock.mock.calls.length).toBe(1);
    });

    it("onClick prop is executed when the button is clicked", () => {
      const onClickMock = jest.fn();
      const wrapper = renderButtonToggle({ onClick: onClickMock });

      wrapper.find(StyledButtonToggle).simulate("click");
      expect(onClickMock.mock.calls.length).toBe(1);
    });

    it("the pressed prop sets the aria-pressed attribute to its value when present, and false when not present", () => {
      const wrapper = renderButtonToggle();
      expect(
        wrapper
          .find(StyledButtonToggle)
          .getDOMNode()
          .getAttribute("aria-pressed")
      ).toBe("false");

      wrapper.setProps({ pressed: true });
      expect(
        wrapper
          .find(StyledButtonToggle)
          .getDOMNode()
          .getAttribute("aria-pressed")
      ).toBe("true");

      wrapper.setProps({ pressed: false });
      expect(
        wrapper
          .find(StyledButtonToggle)
          .getDOMNode()
          .getAttribute("aria-pressed")
      ).toBe("false");
    });
  });

  describe("event handlers", () => {
    let propOnBlur: jest.Mock;
    let propOnFocus: jest.Mock;

    let groupContextOnBlur: jest.Mock;

    let groupContextOnFocus: jest.Mock;

    let groupContextOnMouseEnter: jest.Mock;

    let groupContextOnMouseLeave: jest.Mock;

    let wrapper: ReactWrapper;

    beforeEach(() => {
      propOnBlur = jest.fn();
      propOnFocus = jest.fn();

      groupContextOnBlur = jest.fn();

      groupContextOnFocus = jest.fn();

      groupContextOnMouseEnter = jest.fn();

      groupContextOnMouseLeave = jest.fn();

      wrapper = renderButtonToggleWithContext(
        {
          onBlur: propOnBlur,
          onFocus: propOnFocus,
        },
        {
          onBlur: groupContextOnBlur,
          onFocus: groupContextOnFocus,
          onMouseEnter: groupContextOnMouseEnter,
          onMouseLeave: groupContextOnMouseLeave,
        }
      );
    });

    it("triggers onFocus callbacks passed from props and context", () => {
      wrapper.find(StyledButtonToggle).props().onFocus();
      expect(propOnFocus).toHaveBeenCalled();
      expect(groupContextOnFocus).toHaveBeenCalled();
    });

    it("triggers onBlur callbacks passed from props and context", () => {
      wrapper.find(StyledButtonToggle).props().onBlur();
      expect(propOnBlur).toHaveBeenCalled();
      expect(groupContextOnBlur).toHaveBeenCalled();
    });

    it("triggers onMouseEnter callback passed from context", () => {
      wrapper.find(StyledButtonToggle).props().onMouseEnter();
      expect(groupContextOnMouseEnter).toHaveBeenCalled();
    });

    it("triggers onMouseLeave callback passed from context", () => {
      wrapper.find(StyledButtonToggle).props().onMouseLeave();
      expect(groupContextOnMouseLeave).toHaveBeenCalled();
    });

    it("does nothing if onBlur callbacks are not provided", () => {
      wrapper = renderButtonToggleWithContext();
      const inputProps = wrapper.find(StyledButtonToggle).props();

      inputProps.onBlur();
    });

    it("does nothing if onFocus callbacks are not provided", () => {
      wrapper = renderButtonToggleWithContext();
      const inputProps = wrapper.find(StyledButtonToggle).props();

      inputProps.onFocus();
    });
  });

  describe("General styling", () => {
    const heightConfig = {
      small: 24,
      medium: 32,
      large: 40,
    };

    const fontSizeConfig = {
      small: 14,
      medium: 14,
      large: 16,
    };

    const paddingConfig = {
      small: 8,
      medium: 8,
      large: 12,
    };

    const heightLargeIconConfig = {
      small: 72,
      medium: 88,
      large: 120,
    };

    const paddingLargeIconConfig = {
      small: 24,
      medium: 40,
      large: 48,
    };

    describe.each(["small", "medium", "large"] as ButtonToggleIconSizes[])(
      "renders correct styles for %s size",
      (size) => {
        it("without icon", () => {
          const wrapper = renderButtonToggle({
            size,
            buttonIcon: "add",
            buttonIconSize: "large",
          });

          assertStyleMatch(
            {
              height: `${heightLargeIconConfig[size]}px`,
              padding: `0 ${paddingLargeIconConfig[size]}px`,
              fontSize: `${fontSizeConfig[size]}px`,
            },
            wrapper.find(StyledButtonToggle)
          );
        });

        it("with large icon", () => {
          const wrapper = renderButtonToggle({
            size,
          });

          assertStyleMatch(
            {
              height: `${heightConfig[size]}px`,
              padding: `0 ${paddingConfig[size]}px`,
              fontSize: `${fontSizeConfig[size]}px`,
            },
            wrapper.find(StyledButtonToggle)
          );
        });
      }
    );

    it("renders correctly when disabled", () => {
      const wrapper = renderButtonToggle({
        disabled: true,
      });
      assertStyleMatch(
        {
          color: "var(--colorsActionMinorYin030)",
        },
        wrapper.find(StyledButtonToggle),
        { modifier: "&" }
      );

      assertStyleMatch(
        {
          backgroundColor: "var(--colorsActionMinorYin030)",
          color: "var(--colorsActionMinorYang100)",
        },
        wrapper.find(StyledButtonToggle),
        { modifier: '&[aria-pressed="true"]' }
      );
    });

    it("renders correctly with small icon", () => {
      const wrapper = renderButtonToggle({
        buttonIcon: "add",
        buttonIconSize: "small",
      });
      assertStyleMatch(
        {
          marginRight: "8px",
        },
        wrapper.find(StyledButtonToggleIcon)
      );
    });

    it("renders correctly when grouped", () => {
      const props = {
        grouped: true,
        children: "Text",
      };
      const wrapper = TestRenderer.create(
        <div>
          <ButtonToggle {...props} />
          <ButtonToggle {...props} />
        </div>
      );
      // Uses snapshot as jest/enzyme doesn't support :first-of-type
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("cursor styles", () => {
    it("the cursor is a pointer over an unpressed button", () => {
      const wrapper = renderButtonToggle();
      assertStyleMatch({ cursor: "pointer" }, wrapper.find(StyledButtonToggle));
    });

    it("the cursor has normal styling over a pressed button", () => {
      const wrapper = renderButtonToggle();
      assertStyleMatch({ cursor: "auto" }, wrapper.find(StyledButtonToggle), {
        modifier: '&[aria-pressed="true"]',
      });
    });

    it("when allowDeselect is set on the parent group, the cursor is a pointer over a selected button", () => {
      const wrapper = mount(
        <ButtonToggleGroup id="group" allowDeselect>
          <ButtonToggle>Button</ButtonToggle>
        </ButtonToggleGroup>
      );
      assertStyleMatch(
        { cursor: undefined },
        wrapper.find(StyledButtonToggle),
        { modifier: '&[aria-pressed="true"]' }
      );
    });
  });

  it("an error is thrown when neither children or the buttonIcon prop are specified", () => {
    const mockGlobal = jest
      .spyOn(global.console, "error")
      .mockImplementation(() => undefined);

    const error =
      "Either prop `buttonIcon` must be defined, or this node must have children";

    expect(() => {
      mount(<ButtonToggle />);
    }).toThrow(error);

    mockGlobal.mockReset();
  });

  describe("coverage filler for else path", () => {
    mount(<ButtonToggle buttonIcon="add">toggle</ButtonToggle>);
  });

  it("renders with the expected border radius styling", () => {
    assertStyleMatch(
      {
        borderRadius: "var(--borderRadius050)",
      },
      mount(<ButtonToggle>toggle</ButtonToggle>).find(
        StyledButtonToggleWrapper
      ),
      { modifier: `&&&& ${StyledButtonToggle}` }
    );
  });
});
