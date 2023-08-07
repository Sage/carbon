import React from "react";
import { act } from "react-dom/test-utils";
import { shallow, mount, ReactWrapper } from "enzyme";

import Help from "../../components/help";
import Label, { LabelProps } from ".";
import StyledLabel, { StyledLabelContainer } from "./label.style";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import { noThemeSnapshot } from "../../__spec_helper__/enzyme-snapshot-helper";
import ValidationIcon from "../validations/validation-icon.component";
import IconWrapperStyle from "./icon-wrapper.style";
import { InputContext, InputGroupContext } from "../input-behaviour";

const validationTypes = ["error", "warning", "info"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function render(props?: LabelProps, renderer: any = mount) {
  return renderer(<Label {...props}>Name:</Label>);
}

function renderWithContext(
  props: LabelProps = {},
  inputGroupContextValue = {},
  inputContextValue = {}
) {
  return mount(
    <InputGroupContext.Provider value={inputGroupContextValue}>
      <InputContext.Provider value={inputContextValue}>
        <Label {...props}>Name:</Label>
      </InputContext.Provider>
    </InputGroupContext.Provider>
  );
}

describe("Label", () => {
  it("renders the label", () => {
    expect(noThemeSnapshot(render({}, shallow))).toMatchSnapshot();
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
      wrapper.find(StyledLabel).props().onMouseEnter();
      expect(contextOnMouseEnter).toHaveBeenCalled();
      expect(groupContextOnMouseEnter).toHaveBeenCalled();
    });

    it("triggers onMouseLeave callbacks passed from context", () => {
      wrapper.find(StyledLabel).props().onMouseLeave();
      expect(contextOnMouseLeave).toHaveBeenCalled();
      expect(groupContextOnMouseLeave).toHaveBeenCalled();
    });

    it("does nothing if onMouseEnter or onMouseLeave callbacks are not provided", () => {
      wrapper = render();
      const inputProps = wrapper.find(StyledLabel).props();
      inputProps.onMouseEnter();
      inputProps.onMouseLeave();
    });
  });

  describe("when initiated with the help prop", () => {
    it("contains Help component with the content specified in that prop", () => {
      const wrapper = render({ help: "Help me!" }, shallow);
      expect(wrapper.find(Help).contains("Help me!")).toBe(true);
    });

    it("passes tooltipId prop if provided", () => {
      const tooltipId = "tooltip-test";
      const wrapper = render({ help: "Help me!", tooltipId }, shallow);
      expect(wrapper.find(Help).props().tooltipId).toBe(tooltipId);
    });
  });

  describe("when inline", () => {
    it("applies styling for an inline label", () => {
      const wrapper = render({ inline: true });
      assertStyleMatch(
        {
          boxSizing: "border-box",
          marginBottom: "0",
          justifyContent: "flex-end",
          width: "30%",
        },
        wrapper.find(StyledLabelContainer)
      );
    });

    it("applies correct styling for inline label with 0 width", () => {
      const wrapper = render({ inline: true, width: 0 });
      assertStyleMatch(
        {
          width: "30%",
        },
        wrapper.find(StyledLabelContainer)
      );
    });

    it('applies styling for an inline "optional" label', () => {
      const wrapper = render({
        inline: true,
        optional: true,
      });

      assertStyleMatch(
        {
          content: '"(optional)"',
          fontWeight: "350",
          marginLeft: "4px",
        },
        wrapper.find(StyledLabelContainer),
        { modifier: "::after" }
      );
    });

    it("applies styling when pr prop set", () => {
      assertStyleMatch(
        {
          paddingRight: "var(--spacing200)",
        },
        render({ inline: true, pr: 2 })
      );
    });

    it("applies styling when pl prop set", () => {
      assertStyleMatch(
        {
          paddingLeft: "var(--spacing200)",
        },
        render({ inline: true, pl: 2 })
      );
    });

    it('applies styling for an inline "isRequired" label', () => {
      const wrapper = render({
        inline: true,
        isRequired: true,
      });

      assertStyleMatch(
        {
          content: '"*"',
          color: "var(--colorsSemanticNegative500)",
          fontWeight: "700",
          marginLeft: "var(--spacing100)",
        },
        wrapper.find(StyledLabel),
        { modifier: "::after" }
      );
    });
  });

  describe("when left aligned", () => {
    it("aligns the label correctly", () => {
      const wrapper = render({ inline: true, align: "left" });
      assertStyleMatch(
        {
          justifyContent: "flex-start",
        },
        wrapper.find(StyledLabelContainer)
      );
    });
  });

  describe("when disabled", () => {
    it("applies disabled color", () => {
      const wrapper = render({ disabled: true });

      assertStyleMatch(
        {
          color: "var(--colorsUtilityYin030)",
        },
        wrapper.find(StyledLabel)
      );
    });
  });

  describe("with disabled and error", () => {
    it("applies disabled color", () => {
      const wrapper = render({ error: true, disabled: true });

      assertStyleMatch(
        {
          color: "var(--colorsUtilityYin030)",
        },
        wrapper.find(StyledLabel)
      );
    });
  });

  describe("when the help icon is focused", () => {
    it("then the IconWrapper outline should have the expected value", () => {
      const wrapper = render({ help: "help message" }).find(IconWrapperStyle);
      wrapper.simulate("focus");

      assertStyleMatch(
        {
          outline: `2px solid var(--colorsSemanticFocus500)`,
        },
        wrapper,
        { modifier: ":focus" }
      );
    });
  });

  describe("when attached to child of form", () => {
    describe("when IconWrapperStyle", () => {
      let wrapper: ReactWrapper;

      beforeEach(() => {
        wrapper = render(
          {
            help: "Message",
          },
          mount
        );
      });

      describe("will run `onFocus` event", () => {
        it("should change `isFocused` to be true", () => {
          act(() => {
            wrapper.find(IconWrapperStyle).simulate("focus");
          });
          wrapper.update();

          expect(wrapper.find(Help).props().isFocused).toBe(true);
        });
      });

      describe("will run `onBlur` event", () => {
        it("should change `isFocused` to be false", () => {
          act(() => {
            wrapper.find(IconWrapperStyle).simulate("blur");
          });

          wrapper.update();

          expect(wrapper.find(Help).props().isFocused).toBe(false);
        });
      });
    });
  });

  describe.each(validationTypes)(
    "when %s prop is passed as string",
    (vType) => {
      it("show validation icon", () => {
        const wrapper = render(
          { [vType]: "Message", useValidationIcon: true },
          mount
        );
        const icon = wrapper.find(ValidationIcon);

        expect(icon.exists()).toEqual(true);
      });

      it("passes tooltipId prop if provided", () => {
        const validationIconId = "tooltip-test";
        const wrapper = render(
          { [vType]: "Message", useValidationIcon: true, validationIconId },
          mount
        );
        expect(wrapper.find(ValidationIcon).props().tooltipId).toBe(
          validationIconId
        );
      });
    }
  );

  describe.each(validationTypes)(
    "when %s prop is passed as true boolean",
    (vType) => {
      it("do not show validation icon", () => {
        const wrapper = render(
          { [vType]: true, useValidationIcon: true },
          mount
        );
        const icon = wrapper.find(ValidationIcon);

        expect(icon.exists()).toEqual(false);
      });
    }
  );

  describe.each(validationTypes)(
    "when %s prop is passed as string and label is inline",
    (vType) => {
      it('tooltip should render in position "top"', () => {
        const wrapper = render(
          { [vType]: "Message", useValidationIcon: true, inline: true },
          mount
        );
        const icon = wrapper.find(ValidationIcon);
        expect(icon.prop("tooltipPosition")).toBe("top");
      });
    }
  );

  describe.each(validationTypes)(
    "when %s prop is passed as string and label is not inline",
    (vType) => {
      it('tooltip should render in position "right"', () => {
        const wrapper = render(
          { [vType]: "Message", useValidationIcon: true },
          mount
        );
        const icon = wrapper.find(ValidationIcon);
        expect(icon.prop("tooltipPosition")).toBe("right");
      });
    }
  );
});
