import React from "react";
import { mount } from "enzyme";
import { ThemeProvider } from "styled-components";
import TestRenderer from "react-test-renderer";
import guid from "../../utils/helpers/guid";
import { baseTheme } from "../../style/themes";
import ButtonToggle from "./button-toggle.component";
import ButtonToggleInput from "./button-toggle-input.component";
import {
  assertStyleMatch,
  carbonThemesJestTable,
} from "../../__spec_helper__/test-utils";
import {
  StyledButtonToggleIcon,
  StyledButtonToggleLabel,
  StyledButtonToggleInput,
} from "./button-toggle.style";
import { InputGroupContext } from "../../__internal__/input-behaviour";

jest.mock("../../utils/helpers/guid");
guid.mockImplementation(() => "guid-12345");

describe("ButtonToggle", () => {
  describe("functionality", () => {
    it("pass onChange props to input", () => {
      const onChangeMock = jest.fn();
      const wrapper = renderWithTheme({
        theme: baseTheme,
        onChange: onChangeMock,
      });

      wrapper.find(ButtonToggleInput).prop("onChange")();
      expect(onChangeMock.mock.calls.length).toBe(1);
    });

    it("pass onBlur props to input", () => {
      const onBlurMock = jest.fn();
      const wrapper = renderWithTheme({
        theme: baseTheme,
        onBlur: onBlurMock,
      });

      wrapper.find(ButtonToggleInput).prop("onBlur")();
      expect(onBlurMock.mock.calls.length).toBe(1);
    });

    it("pass onFocus props to input", () => {
      const onFocusMock = jest.fn();
      const wrapper = renderWithTheme({
        theme: baseTheme,
        onFocus: onFocusMock,
      });

      wrapper.find(ButtonToggleInput).simulate("focus");
      expect(onFocusMock.mock.calls.length).toBe(1);
    });
  });

  describe("when a label is clicked", () => {
    const onClickMock = jest.fn();
    let wrapper;
    let domWrapper;

    beforeEach(() => {
      domWrapper = document.createElement("div");
      document.body.appendChild(domWrapper);
      wrapper = mount(
        <ButtonToggle onClick={onClickMock}>Button</ButtonToggle>,
        { attachTo: domWrapper }
      );
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
    let propOnBlur;
    let groupContextOnBlur;

    let groupContextOnFocus;

    let groupContextOnMouseEnter;

    let groupContextOnMouseLeave;

    let wrapper;

    beforeEach(() => {
      propOnBlur = jest.fn();
      groupContextOnBlur = jest.fn();

      groupContextOnFocus = jest.fn();

      groupContextOnMouseEnter = jest.fn();

      groupContextOnMouseLeave = jest.fn();

      wrapper = renderWithContext(
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
      wrapper = renderWithContext();
      const inputProps = wrapper.find(StyledButtonToggleInput).props();

      inputProps.onBlur();
    });

    it("does nothing if onFocus callbacks are not provided", () => {
      wrapper = renderWithContext();
      const inputProps = wrapper.find(StyledButtonToggleInput).props();

      inputProps.onFocus();
    });
  });

  describe.each(carbonThemesJestTable)(
    "when the %s theme is set",
    (themeName, theme) => {
      it("renders correct styles", () => {
        const wrapper = renderWithTheme(
          {
            theme,
          },
          TestRenderer.create
        );
        expect(wrapper).toMatchSnapshot();
      });
      it("renders correct styles for a large icon", () => {
        const wrapper = renderWithTheme({
          theme,
          buttonIcon: "add",
          buttonIconSize: "large",
        });
        assertStyleMatch(
          {
            minWidth: "104px",
            height: "102px",
            padding: "0 16px",
          },
          wrapper.find("label")
        );
      });
    }
  );

  describe("General styling", () => {
    it("renders correctly when disabled", () => {
      const wrapper = render({
        disabled: true,
      });
      assertStyleMatch(
        {
          backgroundColor: "#E6EBED",
          borderColor: "#E6EBED",
          color: "rgba(0,0,0,.2)",
        },
        wrapper.find("label"),
        { modifier: "&" }
      );
    });
    it("renders correctly with small icon", () => {
      const wrapper = render({
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
});

function render(props = {}, renderer = mount) {
  return renderer(<ButtonToggle {...props}>Button</ButtonToggle>);
}

function renderWithTheme(props = {}, renderer = mount) {
  const { theme, ...componentProps } = props;

  return renderer(
    <ThemeProvider theme={theme}>
      <ButtonToggle {...componentProps}>Button</ButtonToggle>
    </ThemeProvider>
  );
}

function renderWithContext(props = {}, inputGroupContextValue = {}) {
  return mount(
    <InputGroupContext.Provider value={inputGroupContextValue}>
      <ButtonToggle {...props}>Button</ButtonToggle>
    </InputGroupContext.Provider>
  );
}
