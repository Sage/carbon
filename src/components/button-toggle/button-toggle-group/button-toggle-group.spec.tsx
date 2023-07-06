import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
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
import StyledButtonToggleGroup from "./button-toggle-group.style";
import Label from "../../../__internal__/label";
import StyledLabel from "../../../__internal__/label/label.style";
import FieldHelp from "../../../__internal__/field-help";
import StyledHelp from "../../help/help.style";
import Logger from "../../../__internal__/utils/logger";

const mockedGuid = "guid-12345";

jest.mock("../../../__internal__/utils/helpers/guid");
(guid as jest.MockedFunction<typeof guid>).mockImplementation(() => mockedGuid);

const MockComponent = (props: Partial<ButtonToggleGroupProps> = {}) => (
  <ButtonToggleGroup id="button-toggle-group-id" {...props}>
    <ButtonToggle value="foo">Foo</ButtonToggle>
    <ButtonToggle value="bar">Bar</ButtonToggle>
  </ButtonToggleGroup>
);

function render(props: Partial<ButtonToggleGroupProps> = {}) {
  return mount(<MockComponent {...props} />);
}

describe("ButtonToggleGroup", () => {
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

  describe("accessible name", () => {
    describe("with label provided", () => {
      it("the group container has an aria-labelledby referencing the ID of the label text", () => {
        const wrapper = render({ label: "a label" });
        expect(wrapper.find(StyledLabel).getDOMNode().getAttribute("id")).toBe(
          mockedGuid
        );
        expect(
          wrapper
            .find(StyledButtonToggleGroup)
            .getDOMNode()
            .getAttribute("aria-labelledby")
        ).toBe(mockedGuid);
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

  it("there is a deprecation warning for the name prop which is triggered only once", () => {
    const loggerSpy = jest
      .spyOn(Logger, "deprecate")
      .mockImplementation(() => {});
    const wrapper = render({ name: "foo" });

    expect(loggerSpy).toHaveBeenCalledWith(
      `The \`name\` prop in \`ButtonToggleGroup\` component is deprecated and will soon be removed. It does not provide any functionality
      since the component can no longer be used in an uncontrolled fashion.`
    );

    expect(loggerSpy).toHaveBeenCalledTimes(1);

    wrapper.setProps({ prop1: true });
    expect(loggerSpy).toHaveBeenCalledTimes(1);

    loggerSpy.mockReset();
  });

  it("when onChange event handler is passed, then it should be called with the correct name and value when a toggle button is clicked", () => {
    const onChangeFn = jest.fn();
    const wrapper = render({
      onChange: onChangeFn,
      name: "button-toggle-group",
    });
    wrapper.find(ButtonToggle).first().find("button").simulate("click");
    expect(onChangeFn.mock.calls[0][1]).toBe("foo");
    expect(onChangeFn.mock.calls[0][2]).toBe("button-toggle-group");
  });

  it("when onChange event handler is passed, then it should be called with the name of the specific ButtonToggle that is clicked", () => {
    const onChangeFn = jest.fn();
    const Component = () => (
      <ButtonToggleGroup id="button-toggle-group-id" onChange={onChangeFn}>
        <ButtonToggle value="foo" name="foo-btn-name">
          Foo
        </ButtonToggle>
        <ButtonToggle value="bar" name="bar-btn-name">
          Bar
        </ButtonToggle>
      </ButtonToggleGroup>
    );
    const wrapper = mount(<Component />);
    wrapper.find(ButtonToggle).first().find("button").simulate("click");
    expect(onChangeFn.mock.calls[0][1]).toBe("foo");
    expect(onChangeFn.mock.calls[0][2]).toBe("foo-btn-name");
  });

  it("when allowDeselect prop is passed, onChange should be called with null value when the currently-pressed button is clicked", () => {
    const onChangeFn = jest.fn();
    const wrapper = render({
      onChange: onChangeFn,
      name: "button-toggle-group",
      allowDeselect: true,
      value: "foo",
    });

    wrapper.find(ButtonToggle).first().find("button").simulate("click");
    expect(onChangeFn.mock.calls[0][1]).toBe(undefined);
  });

  it("renders with the expected border radius styling", () => {
    const wrapper = render();

    assertStyleMatch(
      {
        borderRadius: "var(--borderRadius000)",
      },
      wrapper.find(StyledButtonToggleGroup),
      {
        modifier: `${StyledButtonToggle}:not(:first-of-type):not(:last-of-type)`,
      }
    );

    assertStyleMatch(
      {
        borderTopLeftRadius: "var(--borderRadius400)",
        borderBottomLeftRadius: "var(--borderRadius400)",
        borderTopRightRadius: "var(--borderRadius000)",
        borderBottomRightRadius: "var(--borderRadius000)",
      },
      wrapper.find(StyledButtonToggleGroup),
      {
        modifier: `${StyledButtonToggle}:first-of-type ${StyledButtonToggle}`,
      }
    );

    assertStyleMatch(
      {
        borderTopLeftRadius: "var(--borderRadius000)",
        borderBottomLeftRadius: "var(--borderRadius000)",
        borderTopRightRadius: "var(--borderRadius400)",
        borderBottomRightRadius: "var(--borderRadius400)",
      },
      wrapper.find(StyledButtonToggleGroup),
      {
        modifier: `${StyledButtonToggle}:last-of-type ${StyledButtonToggle}`,
      }
    );
  });

  describe("Label", () => {
    describe.each([
      ["labelHelp", "help", "label help"],
      ["labelInline", "inline", true],
      ["labelWidth", "width", 30],
      ["labelAlign", "align", "right"],
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
  });

  describe("renders with variant prop", () => {
    it("renders with variant prop, which is set to default", () => {
      const wrapper = mount(
        <ButtonToggleGroup variant="default" id="button-toggle-group-id">
          <ButtonToggle>Foo</ButtonToggle>
        </ButtonToggleGroup>
      );
      expect(wrapper.find(StyledButtonToggle).prop("variant")).toEqual(
        "default"
      );
    });

    it("renders with variant prop, which is set to minor", () => {
      const wrapper = mount(
        <ButtonToggleGroup variant="minor" id="button-toggle-group-id">
          <ButtonToggle>Foo</ButtonToggle>
        </ButtonToggleGroup>
      );
      expect(wrapper.find(StyledButtonToggle).prop("variant")).toEqual("minor");
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
        <ButtonToggleGroup id="button-toggle-group-id">
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
    });

    it("when no button is selected, only the first button is tabbable", async () => {
      expect(
        wrapper
          .find(StyledButtonToggle)
          .at(0)
          .getDOMNode()
          .getAttribute("tabindex")
      ).toBeNull();
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
      ).toBeNull();
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
    (component) => component.find(StyledButtonToggleGroup)
  );
});
