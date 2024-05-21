import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import { render as rtlRender, screen } from "@testing-library/react";
import guid from "../../../__internal__/utils/helpers/guid";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../../__spec_helper__/test-utils";
import {
  StyledButtonToggle,
  StyledButtonToggleWrapper,
} from "../button-toggle.style";
import { ButtonToggle, ButtonToggleGroup, ButtonToggleGroupProps } from "..";
import StyledButtonToggleGroup, {
  StyledHintText,
} from "./button-toggle-group.style";
import FormFieldStyle from "../../../__internal__/form-field/form-field.style";
import Label from "../../../__internal__/label";
import Help from "../../../components/help";
import StyledLabel from "../../../__internal__/label/label.style";
import FieldHelp from "../../../__internal__/field-help";
import StyledHelp from "../../help/help.style";
import CarbonProvider from "../../carbon-provider/carbon-provider.component";

jest.mock("../../../__internal__/utils/helpers/guid");

const MockComponent = (props: Partial<ButtonToggleGroupProps> = {}) => (
  <ButtonToggleGroup id="button-toggle-group-id" onChange={() => {}} {...props}>
    <ButtonToggle value="foo">Foo</ButtonToggle>
    <ButtonToggle value="bar">Bar</ButtonToggle>
  </ButtonToggleGroup>
);

function render(props: Partial<ButtonToggleGroupProps> = {}) {
  return mount(<MockComponent {...props} />);
}

describe("ButtonToggleGroup", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    const mockGuid = guid as jest.MockedFunction<typeof guid>;
    mockGuid.mockImplementation(() => "guid-12345");
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

  it("renders component with hint text when inputHint prop is passed", () => {
    const wrapper = render({ inputHint: "Hint text" });

    expect(wrapper.find(StyledHintText).text()).toBe("Hint text");
  });

  describe("when disabled prop is passed", () => {
    const wrapper = render({ disabled: true, inputHint: "Hint text" });

    it("renders component with expected styles", () => {
      assertStyleMatch(
        {
          cursor: "not-allowed",
          boxShadow: "inset 0px 0px 0px 1px var(--colorsActionDisabled600)",
        },
        wrapper.find(StyledButtonToggleGroup)
      );

      assertStyleMatch(
        {
          color: "var(--colorsUtilityYin030)",
        },
        wrapper.find(StyledHintText)
      );
    });

    it("should render children as disabled", () => {
      const buttons = wrapper.find(StyledButtonToggle);
      expect(buttons.at(0).getDOMNode()).toHaveAttribute("disabled");
      expect(buttons.at(1).getDOMNode()).toHaveAttribute("disabled");
    });
  });

  describe("accessible name", () => {
    describe("with label provided", () => {
      it("the group container has an aria-labelledby referencing the ID of the label text", () => {
        const wrapper = render({ label: "a label" });
        expect(
          wrapper.find(StyledLabel).getDOMNode().getAttribute("id")
        ).toEqual("guid-12345");
        expect(
          wrapper
            .find(StyledButtonToggleGroup)
            .getDOMNode()
            .getAttribute("aria-labelledby")
        ).toEqual("guid-12345");
      });

      it("the group container has no aria-label attribute", () => {
        const wrapper = render({ label: "a label" });
        expect(
          wrapper
            .find(StyledButtonToggleGroup)
            .getDOMNode()
            .getAttribute("aria-label")
        ).toBe(null);
      });

      it("any aria-label prop is ignored", () => {
        const wrapper = render({
          label: "a label",
          "aria-label": "an ignored aria label",
        });
        expect(
          wrapper
            .find(StyledButtonToggleGroup)
            .getDOMNode()
            .getAttribute("aria-label")
        ).toBe(null);
      });
    });

    describe("with an aria-label and no label provided", () => {
      it("the group container has the aria-label specified", () => {
        const wrapper = render({ "aria-label": "an aria label" });
        expect(
          wrapper
            .find(StyledButtonToggleGroup)
            .getDOMNode()
            .getAttribute("aria-label")
        ).toBe("an aria label");
      });

      it("the group container has no aria-labelledby attribute", () => {
        const wrapper = render({ "aria-label": "an aria label" });
        expect(
          wrapper
            .find(StyledButtonToggleGroup)
            .getDOMNode()
            .getAttribute("aria-labelledby")
        ).toBe(null);
      });
    });

    it("has the accessible description for each toggle button set to the hint text, when inputHint prop is specified", () => {
      (guid as jest.MockedFunction<typeof guid>)
        .mockImplementationOnce(() => "guid-1")
        .mockImplementationOnce(() => "guid-2");

      rtlRender(
        <MockComponent
          label="Product selection"
          inputHint="Select an addon for Product A"
        />
      );

      expect(
        screen.getByRole("button", { name: "Foo" })
      ).toHaveAccessibleDescription("Select an addon for Product A");
      expect(
        screen.getByRole("button", { name: "Bar" })
      ).toHaveAccessibleDescription("Select an addon for Product A");
    });
  });

  describe("when fullWidth is true", () => {
    it("renders container with flex: auto", () => {
      const wrapper = render({ fullWidth: true });
      assertStyleMatch(
        {
          flex: "auto",
        },
        wrapper.find(StyledButtonToggleGroup),
        { modifier: `${StyledButtonToggleWrapper}` }
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
      { modifier: `${StyledButtonToggle}` }
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
          <ButtonToggleGroup id="id">
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
          <ButtonToggleGroup id="id">
            {null}
            {false}
            {undefined}
          </ButtonToggleGroup>
        );
      }).not.toThrow();
    });
  });

  it("when onChange event handler is passed, then it should be called with the correct value when a toggle button is clicked", () => {
    const onChangeFn = jest.fn();
    const wrapper = render({
      onChange: onChangeFn,
    });
    wrapper.find(ButtonToggle).first().find("button").simulate("click");
    expect(onChangeFn.mock.calls[0][1]).toBe("foo");
  });

  it("when allowDeselect prop is passed, onChange should be called with null value when the currently-pressed button is clicked", () => {
    const onChangeFn = jest.fn();
    const wrapper = render({
      onChange: onChangeFn,
      allowDeselect: true,
      value: "foo",
    });

    wrapper.find(ButtonToggle).first().find("button").simulate("click");
    expect(onChangeFn.mock.calls[0][1]).toBe(undefined);
  });

  describe("Label", () => {
    describe.each([
      ["labelHelp", "help", "label help"],
      ["labelInline", "inline", true],
      ["labelWidth", "width", 30],
    ])("when the %s prop is passed", (propName, passedPropName, propValue) => {
      it("then it should be passed to the Label component", () => {
        const wrapper = render({
          label: "label",
          [propName]: propValue,
        });
        expect(wrapper.find(Label).exists()).toBe(true);
        expect(wrapper.find(Label).prop(passedPropName)).toBe(propValue);
      });
    });

    it("should not render labelHelp tooltip when validationRedesignOptIn is true", () => {
      const wrapper = mount(
        <CarbonProvider validationRedesignOptIn>
          <ButtonToggleGroup
            id="button-toggle-group-id"
            label="test"
            labelHelp="test"
          >
            <ButtonToggle value="foo">Foo</ButtonToggle>
            <ButtonToggle value="bar">Bar</ButtonToggle>
          </ButtonToggleGroup>
        </CarbonProvider>
      );

      expect(wrapper.find(Help).exists()).toBe(false);
    });
  });

  describe("FieldHelp", () => {
    describe.each([
      ["labelInline", true],
      ["labelWidth", 30],
    ])("when the %s prop is passed", (propName, propValue) => {
      it("then it should be passed to the FieldHelp component", () => {
        const wrapper = render({
          fieldHelp: "help text",
          [propName]: propValue,
        });
        expect(wrapper.find(FieldHelp).exists()).toBe(true);
        expect(wrapper.find(FieldHelp).prop(propName)).toBe(propValue);
      });
    });

    describe("with fieldHelpInline prop", () => {
      describe.each([
        ["labelInline", true],
        ["labelWidth", 30],
      ])("when the %s prop is passed", (propName, propValue) => {
        it("then it should be passed to the FieldHelp component", () => {
          const wrapper = render({
            fieldHelp: "help text",
            fieldHelpInline: true,
            [propName]: propValue,
          });
          expect(wrapper.find(FieldHelp).exists()).toBe(true);
          expect(wrapper.find(FieldHelp).prop(propName)).toBe(propValue);
        });
      });
    });

    it("should not render fieldHelp when validationRedesignOptIn is true", () => {
      const wrapper = mount(
        <CarbonProvider validationRedesignOptIn>
          <ButtonToggleGroup
            id="button-toggle-group-id"
            label="test"
            fieldHelp="test"
          >
            <ButtonToggle value="foo">Foo</ButtonToggle>
            <ButtonToggle value="bar">Bar</ButtonToggle>
          </ButtonToggleGroup>
        </CarbonProvider>
      );

      expect(wrapper.find(FieldHelp).exists()).toBe(false);
    });
  });

  describe("keyboard navigation", () => {
    let wrapper: ReactWrapper;
    let container: HTMLElement | null;

    beforeEach(() => {
      jest.useFakeTimers();
      container = document.createElement("div");
      container.id = "enzymeContainer";
      document.body.appendChild(container);
      wrapper = mount(
        <ButtonToggleGroup id="button-toggle-group-id" onChange={() => {}}>
          <ButtonToggle value="foo">Foo</ButtonToggle>
          <ButtonToggle value="bar">Bar</ButtonToggle>
          <ButtonToggle value="baz">Baz</ButtonToggle>
        </ButtonToggleGroup>,
        { attachTo: document.getElementById("enzymeContainer") }
      );
      act(() => {
        jest.runAllTimers();
      });
    });

    afterEach(() => {
      wrapper.unmount();
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }

      container = null;

      jest.clearAllTimers();
    });

    it("when no button is selected, only the first button is tabbable", async () => {
      expect(
        wrapper
          .find(StyledButtonToggle)
          .at(0)
          .getDOMNode()
          .getAttribute("tabindex")
      ).toBe("0");
      expect(
        wrapper
          .find(StyledButtonToggle)
          .at(1)
          .getDOMNode()
          .getAttribute("tabindex")
      ).toBe("-1");
      expect(
        wrapper
          .find(StyledButtonToggle)
          .at(2)
          .getDOMNode()
          .getAttribute("tabindex")
      ).toBe("-1");
    });

    it("when a button is selected, only that button is tabbable", () => {
      act(() => {
        wrapper.find(StyledButtonToggle).at(1).simulate("click");
      });
      expect(
        wrapper
          .find(StyledButtonToggle)
          .at(0)
          .getDOMNode()
          .getAttribute("tabindex")
      ).toBe("-1");
      expect(
        wrapper
          .find(StyledButtonToggle)
          .at(1)
          .getDOMNode()
          .getAttribute("tabindex")
      ).toBe("0");
      expect(
        wrapper
          .find(StyledButtonToggle)
          .at(2)
          .getDOMNode()
          .getAttribute("tabindex")
      ).toBe("-1");
    });

    it("left arrow key focuses the previous button", () => {
      act(() => {
        (wrapper
          .find("button")
          .at(1)
          .getDOMNode() as HTMLButtonElement).focus();
      });
      wrapper
        .find(StyledButtonToggle)
        .at(1)
        .simulate("keydown", { key: "ArrowLeft" });
      expect(wrapper.find(StyledButtonToggle).at(0)).toBeFocused();
    });

    it("left arrow key focuses the last button when the first is focused", () => {
      act(() => {
        (wrapper
          .find("button")
          .at(0)
          .getDOMNode() as HTMLButtonElement).focus();
      });
      wrapper
        .find(StyledButtonToggle)
        .at(0)
        .simulate("keydown", { key: "ArrowLeft" });
      expect(wrapper.find(StyledButtonToggle).at(2)).toBeFocused();
    });

    it("right arrow key focuses the next button", () => {
      act(() => {
        (wrapper
          .find("button")
          .at(1)
          .getDOMNode() as HTMLButtonElement).focus();
      });
      wrapper
        .find(StyledButtonToggle)
        .at(1)
        .simulate("keydown", { key: "ArrowRight" });
      expect(wrapper.find(StyledButtonToggle).at(2)).toBeFocused();
    });

    it("right arrow key focuses the first button when the last is focused", () => {
      act(() => {
        (wrapper
          .find("button")
          .at(2)
          .getDOMNode() as HTMLButtonElement).focus();
      });
      wrapper
        .find(StyledButtonToggle)
        .at(2)
        .simulate("keydown", { key: "ArrowRight" });
      expect(wrapper.find(StyledButtonToggle).at(0)).toBeFocused();
    });

    it("pressing a non arrow key doesn't change focus", () => {
      act(() => {
        (wrapper
          .find("button")
          .at(1)
          .getDOMNode() as HTMLButtonElement).focus();
      });
      wrapper.find(StyledButtonToggle).at(1).simulate("keydown", { key: "a" });
      expect(wrapper.find(StyledButtonToggle).at(1)).toBeFocused();
    });
  });

  testStyledSystemMargin(
    (props) => <MockComponent {...props} />,
    undefined,
    (component) => component.find(FormFieldStyle),
    { modifier: "&&&" }
  );
});
