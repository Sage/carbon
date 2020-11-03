import React from "react";
import TestRenderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";
import { mount, shallow } from "enzyme";
import { InputPresentation } from ".";
import InputPresentationStyle, {
  StyledInputPresentationContainer,
} from "./input-presentation.style";
import baseTheme from "../../../style/themes/base";
import sizes from "./input-sizes.style";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import OptionsHelper from "../../../utils/helpers/options-helper";
import classicTheme from "../../../style/themes/classic";
import {
  InputContext,
  InputGroupContext,
} from "../../../__internal__/input-behaviour";

describe("InputPresentation", () => {
  it("renders presentational div and context provider for its children", () => {
    expect(render({}, TestRenderer.create)).toMatchSnapshot();
  });

  it("renders provided positionedChildren component as a direct child of container", () => {
    const Component = () => <div />;
    expect(
      render({ positionedChildren: <Component /> }, shallow)
        .find(StyledInputPresentationContainer)
        .childAt(0)
        .get(0)
    ).toEqual(<Component />);
  });

  describe("style", () => {
    describe("sizes", () => {
      OptionsHelper.sizesRestricted.forEach((size) => {
        it(`has the right style for ${size}-sized inputs`, () => {
          assertStyleMatch(
            {
              minHeight: sizes[size].height,
              paddingLeft: sizes[size].horizontalPadding,
              paddingRight: sizes[size].horizontalPadding,
            },
            render({ size }).find(InputPresentationStyle)
          );
        });
      });
    });

    describe("width", () => {
      it("renders correctly with a custom width", () => {
        assertStyleMatch(
          {
            flex: "0 0 54%",
          },
          render({ inputWidth: 54 })
        );
      });
    });

    describe.each([["error"], ["warning"], ["info"]])(
      "when %s prop is set to true",
      (validation) => {
        it("has the right style", () => {
          const boxShadow =
            `inset 1px 1px 0 ${baseTheme.colors[validation]},` +
            `inset -1px -1px 0 ${baseTheme.colors[validation]}`;

          assertStyleMatch(
            {
              borderColor: `${baseTheme.colors[validation]} !important`,
              boxShadow: validation === "error" ? boxShadow : undefined,
            },
            render({ [validation]: true }).find(InputPresentationStyle)
          );
        });
      }
    );

    describe.each([["error"], ["warning"], ["info"]])(
      "when %s prop is a string",
      (validation) => {
        it("has the right style", () => {
          const boxShadow =
            `inset 1px 1px 0 ${baseTheme.colors[validation]},` +
            `inset -1px -1px 0 ${baseTheme.colors[validation]}`;

          assertStyleMatch(
            {
              borderColor: `${baseTheme.colors[validation]} !important`,
              boxShadow: validation === "error" ? boxShadow : undefined,
            },
            render({ [validation]: "Message" }).find(InputPresentationStyle)
          );
        });
      }
    );

    describe('when align prop is passed as "right"', () => {
      it("has the correct style rules", () => {
        assertStyleMatch(
          { flexDirection: "row-reverse" },
          render({ align: "right" }).find(InputPresentationStyle)
        );
      });
    });

    describe("disabled", () => {
      it("has the correct style rules", () => {
        assertStyleMatch(
          {
            background: baseTheme.disabled.input,
            borderColor: baseTheme.disabled.border,
            cursor: "not-allowed",
          },
          render({ disabled: true }).find(InputPresentationStyle)
        );
      });
    });

    describe("readOnly", () => {
      it("has the correct style rules", () => {
        assertStyleMatch(
          {
            backgroundColor: baseTheme.readOnly.textboxBackground,
            borderColor: baseTheme.readOnly.textboxBorder,
          },
          render({ readOnly: true }).find(InputPresentationStyle)
        );
      });
    });

    describe("hasFocus", () => {
      it("has the correct style rules", () => {
        assertStyleMatch(
          {
            border: "1px solid #668592",
          },
          render({ readOnly: true }).find(InputPresentationStyle)
        );
      });
    });
  });

  describe("context handlers", () => {
    let contextOnMouseEnter;
    let groupContextOnMouseEnter;

    let contextOnMouseLeave;
    let groupContextOnMouseLeave;

    let wrapper;

    beforeEach(() => {
      contextOnMouseEnter = jest.fn();
      groupContextOnMouseEnter = jest.fn();

      contextOnMouseLeave = jest.fn();
      groupContextOnMouseLeave = jest.fn();

      wrapper = renderWithContext(
        {},
        {
          onMouseEnter: groupContextOnMouseEnter,
          onMouseLeave: groupContextOnMouseLeave,
        },
        {
          onMouseEnter: contextOnMouseEnter,
          onMouseLeave: contextOnMouseLeave,
        }
      );
    });

    it("triggers onMouseEnter callbacks passed from context", () => {
      wrapper.find(InputPresentationStyle).props().onMouseEnter();
      expect(contextOnMouseEnter).toHaveBeenCalled();
      expect(groupContextOnMouseEnter).toHaveBeenCalled();
    });

    it("triggers onMouseLeave callbacks passed from context", () => {
      wrapper.find(InputPresentationStyle).props().onMouseLeave();
      expect(contextOnMouseLeave).toHaveBeenCalled();
      expect(groupContextOnMouseLeave).toHaveBeenCalled();
    });

    it("does nothing if onMouseEnter or onMouseLeave callbacks are not provided", () => {
      wrapper = render();
      const inputProps = wrapper.find(InputPresentationStyle).props();
      inputProps.onMouseEnter();
      inputProps.onMouseLeave();
    });
  });

  describe("classic theme", () => {
    it("applies custom styling", () => {
      expect(
        renderWithTheme({}, classicTheme, TestRenderer.create)
      ).toMatchSnapshot();
    });

    it("applies custom border and outline on focus", () => {
      assertStyleMatch(
        {
          outline: "none",
          border: "1px solid #255bc7",
        },
        renderWithTheme({ hasFocus: true }, classicTheme).find(
          InputPresentationStyle
        ),
        {
          modifier: "&&",
        }
      );
    });

    it("applies custom background and border color on disabled", () => {
      assertStyleMatch(
        {
          background: "#d9e0e4",
          borderColor: "#d9e0e4 !important",
        },
        renderWithTheme({ disabled: true }, classicTheme).find(
          InputPresentationStyle
        )
      );
    });
  });
});

function render(props, renderer = mount) {
  return renderer(
    <InputPresentation {...props}>sample children</InputPresentation>
  );
}

function renderWithContext(
  props = {},
  inputGroupContextValue = {},
  inputContextValue = {}
) {
  return mount(
    <InputGroupContext.Provider value={inputGroupContextValue}>
      <InputContext.Provider value={inputContextValue}>
        <InputPresentation {...props}>sample children</InputPresentation>
      </InputContext.Provider>
    </InputGroupContext.Provider>
  );
}

function renderWithTheme(props, theme, renderer = mount) {
  return renderer(
    <ThemeProvider theme={theme}>
      <InputPresentation {...props}>sample children</InputPresentation>
    </ThemeProvider>
  );
}
