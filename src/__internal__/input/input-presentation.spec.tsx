import React from "react";
import TestRenderer from "react-test-renderer";
import { mount, shallow, ReactWrapper } from "enzyme";
import InputPresentation, {
  InputPresentationProps,
  Sizes,
} from "./input-presentation.component";
import InputPresentationStyle, {
  StyledInputPresentationContainer,
} from "./input-presentation.style";
import sizes from "./input-sizes.style";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import { InputContext, InputGroupContext } from "../input-behaviour";
import { NewValidationContext } from "../../components/carbon-provider/carbon-provider.component";

function render(props: InputPresentationProps) {
  return mount(<InputPresentation {...props} />);
}

function renderWithContext(
  props = {},
  inputGroupContextValue = {},
  inputContextValue = {},
  validationRedesignOptIn = false
) {
  return mount(
    <NewValidationContext.Provider value={{ validationRedesignOptIn }}>
      <InputGroupContext.Provider value={inputGroupContextValue}>
        <InputContext.Provider value={inputContextValue}>
          <InputPresentation {...props}>sample children</InputPresentation>
        </InputContext.Provider>
      </InputGroupContext.Provider>
    </NewValidationContext.Provider>
  );
}

describe("InputPresentation", () => {
  it("renders presentational div and context provider for its children", () => {
    expect(
      TestRenderer.create(<InputPresentation>Children</InputPresentation>)
    ).toMatchSnapshot();
  });

  it("renders provided positionedChildren component as a direct child of container", () => {
    const Component = () => <div />;
    const props = { positionedChildren: <Component />, children: "Children" };
    expect(
      shallow(<InputPresentation {...props} />)
        .find(StyledInputPresentationContainer)
        .childAt(0)
        .get(0)
    ).toEqual(<Component />);
  });

  describe("style", () => {
    describe.each(["small", "medium", "large"])(
      "when %s provided",
      (inputSize) => {
        it(`has the right style for ${inputSize}-sized inputs`, () => {
          const size = inputSize as Sizes;
          assertStyleMatch(
            {
              minHeight: sizes[inputSize].height,
              paddingLeft: sizes[inputSize].horizontalPadding,
              paddingRight: sizes[inputSize].horizontalPadding,
            },
            render({ size, children: "Children" }).find(InputPresentationStyle)
          );
        });
      }
    );

    describe("width", () => {
      it("renders correctly with a custom width", () => {
        assertStyleMatch(
          {
            flex: "0 0 54%",
          },
          render({ inputWidth: 54, children: "Children" })
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
          render({ [state]: true, children: "Children" }).find(
            InputPresentationStyle
          )
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

    describe("when new validation is set by context", () => {
      describe.each([
        ["error", "var(--colorsSemanticNegative500)"],
        ["warning", "var(--colorsUtilityMajor300)"],
        ["info", "var(--colorsSemanticInfo500)"],
      ])("when %s prop is set to true", (state, token) => {
        it("has the right style", () => {
          const boxShadow = `inset 1px 1px 0 ${token},inset -1px -1px 0 ${token}`;

          assertStyleMatch(
            {
              borderColor: `${token} !important`,
              boxShadow: state === "error" ? boxShadow : undefined,
            },
            renderWithContext({ [state]: true }, {}, {}, true).find(
              InputPresentationStyle
            )
          );
        });
      });

      describe.each([
        ["error", "var(--colorsSemanticNegative500)"],
        ["warning", "var(--colorsUtilityMajor300)"],
        ["info", "var(--colorsSemanticInfo500)"],
      ])("when %s prop is a string", (state, token) => {
        it("has the right style", () => {
          const boxShadow = `inset 1px 1px 0 ${token},inset -1px -1px 0 ${token}`;

          assertStyleMatch(
            {
              borderColor: `${token} !important`,
              boxShadow: state === "error" ? boxShadow : undefined,
            },
            renderWithContext({ [state]: "Message" }, {}, {}, true).find(
              InputPresentationStyle
            )
          );
        });
      });
    });

    describe('when align prop is passed as "right"', () => {
      it("has the correct style rules", () => {
        assertStyleMatch(
          { flexDirection: "row-reverse" },
          render({ align: "right", children: "Children" }).find(
            InputPresentationStyle
          )
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
          render({ disabled: true, children: "Children" }).find(
            InputPresentationStyle
          )
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
          render({ readOnly: true, children: "Children" }).find(
            InputPresentationStyle
          )
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
    let contextOnMouseEnter: () => void;
    let groupContextOnMouseEnter: () => void;

    let contextOnMouseLeave: () => void;
    let groupContextOnMouseLeave: () => void;

    let wrapper: ReactWrapper;

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
      wrapper = render({ children: "Children" });
      const inputProps = wrapper.find(InputPresentationStyle).props();
      inputProps.onMouseEnter();
      inputProps.onMouseLeave();
    });
  });
});
