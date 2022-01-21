import React from "react";
import TestRenderer from "react-test-renderer";
import { mount, shallow } from "enzyme";
import { InputPresentation } from ".";
import InputPresentationStyle, {
  StyledInputPresentationContainer,
} from "./input-presentation.style";
import sizes from "./input-sizes.style";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import { InputContext, InputGroupContext } from "../input-behaviour";

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
    describe.each(["small", "medium", "large"])("when %s provided", (size) => {
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

    describe.each([
      ["error", "var(--colorsSemanticNegative500)"],
      ["warning", "var(--colorsSemanticCaution500)"],
      ["info", "var(--colorsSemanticInfo500)"],
    ])("when %s prop is set to true", (state, token) => {
      it("has the right style", () => {
        const boxShadow = `inset 1px 1px 0 ${token},inset -1px -1px 0 ${token}`;

        assertStyleMatch(
          {
            borderColor: `${token} !important`,
            boxShadow: state === "error" ? boxShadow : undefined,
          },
          render({ [state]: true }).find(InputPresentationStyle)
        );
      });
    });

    describe.each([
      ["error", "var(--colorsSemanticNegative500)"],
      ["warning", "var(--colorsSemanticCaution500)"],
      ["info", "var(--colorsSemanticInfo500)"],
    ])("when %s prop is a string", (state, token) => {
      it("has the right style", () => {
        const boxShadow = `inset 1px 1px 0 ${token},inset -1px -1px 0 ${token}`;

        assertStyleMatch(
          {
            borderColor: `${token} !important`,
            boxShadow: state === "error" ? boxShadow : undefined,
          },
          renderWithContext({ [state]: "Message" }).find(InputPresentationStyle)
        );
      });
    });

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
            background: "var(--colorsUtilityDisabled400)",
            borderColor: "var(--colorsUtilityDisabled600)",
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
            backgroundColor: "var(--colorsUtilityReadOnly400)",
            borderColor: "var(--colorsUtilityReadOnly600)",
          },
          render({ readOnly: true }).find(InputPresentationStyle)
        );
      });
    });

    describe("hasFocus", () => {
      it("has the correct style rules", () => {
        assertStyleMatch(
          {
            outline: "3px solid var(--colorsSemanticFocus500)",
          },
          renderWithContext({}, {}, { hasFocus: true }).find(
            InputPresentationStyle
          )
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
