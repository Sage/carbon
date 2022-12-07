import React from "react";
import { mount } from "enzyme";
import guid from "../../__internal__/utils/helpers/guid";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import {
  StyledButtonToggleLabel,
  StyledButtonToggle,
} from "../button-toggle/button-toggle.style";
import Label from "../../__internal__/label";
import StyledValidationIcon from "../../__internal__/validations/validation-icon.style";
import ValidationIcon, {
  ValidationProps,
} from "../../__internal__/validations";
import ButtonToggleGroup, {
  ButtonToggleGroupProps,
} from "./button-toggle-group.component";
import ButtonToggle from "../button-toggle/button-toggle.component";
import StyledButtonToggleGroup from "./button-toggle-group.style";
import FormFieldStyle from "../../__internal__/form-field/form-field.style";
import FormField from "../../__internal__/form-field";
import StyledHelp from "../help/help.style";

jest.mock("../../__internal__/utils/helpers/guid");
(guid as jest.MockedFunction<typeof guid>).mockImplementation(
  () => "guid-12345"
);

const MockComponent = (props: Partial<ButtonToggleGroupProps> = {}) => (
  <ButtonToggleGroup
    id="button-toggle-group-id"
    name="button-toggle-group"
    {...props}
  >
    <ButtonToggle value="foo">Foo</ButtonToggle>
    <ButtonToggle value="bar">Bar</ButtonToggle>
  </ButtonToggleGroup>
);

function render(props: Partial<ButtonToggleGroupProps> = {}) {
  return mount(<MockComponent {...props} />);
}

describe("ButtonToggleGroup", () => {
  it("wraps ButtonToggle components in a FormField", () => {
    const wrapper = render();
    expect(wrapper.find(FormField).exists()).toBe(true);
    expect(wrapper.find(FormField).find(ButtonToggle).exists()).toBe(true);
  });

  it("when helpAriaLabel prop is passed, the aria-label on the Help component should be set", () => {
    const text = "foo";

    const wrapper = render({
      label: text,
      labelHelp: text,
      helpAriaLabel: text,
    });

    const ariaLabel = wrapper.find(StyledHelp).prop("aria-label");
    expect(ariaLabel).toEqual(text);
  });

  it("when inputWidth prop is passed, renders component with correct width", () => {
    const wrapper = render({ inputWidth: 48 });
    assertStyleMatch(
      {
        width: "48%",
      },
      wrapper.find(StyledButtonToggleGroup)
    );
  });

  describe("when fullWidth is true", () => {
    it("renders container with flex: auto", () => {
      const wrapper = render({ fullWidth: true });
      assertStyleMatch(
        {
          flex: "auto",
        },
        wrapper.find(StyledButtonToggleGroup),
        { modifier: `${StyledButtonToggle}` }
      );
    });
  });

  it("renders label with width: 100%", () => {
    const wrapper = render({ fullWidth: true });
    assertStyleMatch(
      {
        width: "100%",
      },
      wrapper.find(StyledButtonToggleGroup),
      { modifier: `${StyledButtonToggleLabel}` }
    );
  });

  describe("children", () => {
    it("when component has an incorrect child, an error should be raised", () => {
      const consoleSpy = jest
        .spyOn(global.console, "error")
        .mockImplementation(() => {});

      const InvalidComponent = React.forwardRef<HTMLInputElement>((_, ref) => (
        <input ref={ref} />
      ));
      InvalidComponent.displayName = "InvalidComponent";

      expect(() => {
        mount(
          <ButtonToggleGroup name="name" id="id">
            <InvalidComponent />
            <InvalidComponent />
          </ButtonToggleGroup>
        );
      }).toThrow();
      consoleSpy.mockRestore();
    });

    it("component accepts empty children", () => {
      expect(() => {
        mount(
          <ButtonToggleGroup name="name" id="id">
            {null}
            {false}
            {undefined}
          </ButtonToggleGroup>
        );
      }).not.toThrow();
    });
  });

  it("when onChange event handler is passed, then it should be called when a toggle button changes", () => {
    const onChangeFn = jest.fn();
    const wrapper = render({ onChange: onChangeFn });
    wrapper.find(ButtonToggle).first().find("input").simulate("change");
    expect(onChangeFn).toHaveBeenCalled();
  });

  it("when onBlur event handler is passed, then it should be called when a toggle button loses focus", () => {
    const onBlurFn = jest.fn();
    const wrapper = render({ onBlur: onBlurFn });
    wrapper.find(ButtonToggle).first().find("input").simulate("blur");
    expect(onBlurFn).toHaveBeenCalled();
  });

  describe.each([
    ["label", "label"],
    ["labelHelp", "label help"],
    ["fieldHelp", "field help"],
    ["labelInline", true],
    ["labelWidth", 30],
    ["labelAlign", "right"],
    ["id", "foo"],
  ])("when the %s prop is passed", (propName, propValue) => {
    it("then it should be passed to the FormField", () => {
      const wrapper = render({
        [propName]: propValue,
      });
      expect(wrapper.find(FormField).exists()).toBe(true);
      expect(wrapper.find(FormField).prop(propName)).toBe(propValue);
    });
  });

  describe("validations", () => {
    const validationTypes: (keyof ValidationProps)[] = [
      "error",
      "warning",
      "info",
    ];

    const validationStyles = {
      error: "var(--colorsSemanticNegative500)",
      warning: "var(--colorsSemanticCaution500)",
      info: "var(--colorsSemanticInfo500)",
    };

    describe.each(validationTypes)(
      "when %s prop is passed as string",
      (type) => {
        it("renders proper styles", () => {
          const boxShadow =
            type === "error"
              ? [
                  "inset 1px 1px 0 var(--colorsSemanticNegative500)",
                  "inset -1px -1px 0 var(--colorsSemanticNegative500)",
                ].join(", ")
              : undefined;
          const wrapper = render({ [type]: "Message" });
          assertStyleMatch(
            {
              boxShadow,
              borderColor: validationStyles[type],
            },
            wrapper.find(StyledButtonToggleGroup),
            { modifier: `${StyledButtonToggleLabel}` }
          );
        });

        it("renders validation icon on input", () => {
          const wrapper = render({ [type]: "Message" });
          expect(
            wrapper
              .find(StyledButtonToggleGroup)
              .find(StyledValidationIcon)
              .exists()
          ).toBe(true);

          expect(
            wrapper.find(ValidationIcon).props().tooltipFlipOverrides
          ).toEqual(["top", "bottom"]);
        });

        it("renders validation icon on label when validationOnLabel passed as true", () => {
          const wrapper = render({
            label: "Label",
            [type]: "Message",
            validationOnLabel: true,
          });
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
          const boxShadow =
            type === "error"
              ? [
                  "inset 1px 1px 0 var(--colorsSemanticNegative500)",
                  "inset -1px -1px 0 var(--colorsSemanticNegative500)",
                ].join(", ")
              : undefined;
          const wrapper = render({ [type]: true });
          assertStyleMatch(
            {
              boxShadow,
              borderColor: validationStyles[type],
            },
            wrapper.find(StyledButtonToggleGroup),
            { modifier: `${StyledButtonToggleLabel}` }
          );
        });

        it("does not render validation icon", () => {
          const wrapper = render({ [type]: true });
          expect(wrapper.find(StyledValidationIcon).exists()).toBe(false);
        });
      }
    );
  });

  testStyledSystemMargin(
    (props) => <MockComponent {...props} />,
    undefined,
    (component) => component.find(FormFieldStyle),
    { modifier: "&&&" }
  );
});
