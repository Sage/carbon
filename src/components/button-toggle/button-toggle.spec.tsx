import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { ThemeProvider } from "styled-components";
import TestRenderer from "react-test-renderer";
import guid from "../../__internal__/utils/helpers/guid";
import { baseTheme } from "../../style/themes";
import ButtonToggle, { ButtonToggleProps } from "./button-toggle.component";
import ButtonToggleInput from "./button-toggle-input.component";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import {
  StyledButtonToggleIcon,
  StyledButtonToggleLabel,
  StyledButtonToggleInput,
  ButtonToggleIconSizes,
} from "./button-toggle.style";
import { InputGroupContext } from "../../__internal__/input-behaviour";
import { ThemeObject } from "../../style/themes/base";

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
  describe("functionality", () => {
    it("pass onChange props to input", () => {
      const onChangeMock = jest.fn();
      const wrapper = renderButtonToggleWithTheme({
        theme: baseTheme,
        onChange: onChangeMock,
      });

      wrapper.find(ButtonToggleInput).simulate("change");
      expect(onChangeMock.mock.calls.length).toBe(1);
    });

    it("pass onBlur props to input", () => {
      const onBlurMock = jest.fn();
      const wrapper = renderButtonToggleWithTheme({
        theme: baseTheme,
        onBlur: onBlurMock,
      });

      wrapper.find(ButtonToggleInput).simulate("blur");
      expect(onBlurMock.mock.calls.length).toBe(1);
    });

    it("pass onFocus props to input", () => {
      const onFocusMock = jest.fn();
      const wrapper = renderButtonToggleWithTheme({
        theme: baseTheme,
        onFocus: onFocusMock,
      });

      wrapper.find(ButtonToggleInput).simulate("focus");
      expect(onFocusMock.mock.calls.length).toBe(1);
    });
  });

  describe("when a label is clicked", () => {
    let wrapper: ReactWrapper;
    let domWrapper: HTMLDivElement;

    beforeEach(() => {
      domWrapper = document.createElement("div");
      document.body.appendChild(domWrapper);
      wrapper = mount(<ButtonToggle>Button</ButtonToggle>, {
        attachTo: domWrapper,
      });
    });

    afterEach(() => {
      wrapper.detach();
      document.body.removeChild(domWrapper);
    });

    it("then the input should be focused", () => {
      wrapper.find(StyledButtonToggleLabel).simulate("click");
      expect(wrapper.update().find(ButtonToggleInput).getDOMNode()).toEqual(
        document.activeElement
      );
    });
  });

  describe("HiddenCheckableInput", () => {
    let propOnBlur: jest.Mock;
    let groupContextOnBlur: jest.Mock;

    let groupContextOnFocus: jest.Mock;

    let groupContextOnMouseEnter: jest.Mock;

    let groupContextOnMouseLeave: jest.Mock;

    let wrapper: ReactWrapper;

    beforeEach(() => {
      propOnBlur = jest.fn();
      groupContextOnBlur = jest.fn();

      groupContextOnFocus = jest.fn();

      groupContextOnMouseEnter = jest.fn();

      groupContextOnMouseLeave = jest.fn();

      wrapper = renderButtonToggleWithContext(
        {
          onBlur: propOnBlur,
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
      wrapper.find(StyledButtonToggleInput).props().onFocus();
      expect(groupContextOnFocus).toHaveBeenCalled();
    });

    it("triggers onBlur callbacks passed from props and context", () => {
      wrapper.find(StyledButtonToggleInput).props().onBlur();
      expect(propOnBlur).toHaveBeenCalled();
      expect(groupContextOnBlur).toHaveBeenCalled();
    });

    it("triggers onMouseEnter callback passed from context", () => {
      wrapper.find(StyledButtonToggleLabel).props().onMouseEnter();
      expect(groupContextOnMouseEnter).toHaveBeenCalled();
    });

    it("triggers onMouseLeave callback passed from context", () => {
      wrapper.find(StyledButtonToggleLabel).props().onMouseLeave();
      expect(groupContextOnMouseLeave).toHaveBeenCalled();
    });

    it("does nothing if onBlur callbacks are not provided", () => {
      wrapper = renderButtonToggleWithContext();
      const inputProps = wrapper.find(StyledButtonToggleInput).props();

      inputProps.onBlur();
    });

    it("does nothing if onFocus callbacks are not provided", () => {
      wrapper = renderButtonToggleWithContext();
      const inputProps = wrapper.find(StyledButtonToggleInput).props();

      inputProps.onFocus();
    });
  });

  describe("General styling", () => {
    const heightConfig = {
      small: 32,
      medium: 40,
      large: 48,
    };

    const fontSizeConfig = {
      small: 14,
      medium: 14,
      large: 16,
    };

    const paddingConfig = {
      small: 16,
      medium: 24,
      large: 32,
    };

    const heightLargeIconConfig = {
      small: 80,
      medium: 96,
      large: 112,
    };

    const paddingLargeIconConfig = {
      small: 32,
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
            wrapper.find(StyledButtonToggleLabel)
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
            wrapper.find(StyledButtonToggleLabel)
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
          borderColor: "var(--colorsActionDisabled500)",
          color: "var(--colorsActionMinorYin030)",
        },
        wrapper.find("label"),
        { modifier: "&" }
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
      // Uses snapshot as jest/enzyme doesnt support :first-of-type
      expect(wrapper).toMatchSnapshot();
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
});
