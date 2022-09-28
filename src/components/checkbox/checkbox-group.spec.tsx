import React from "react";
import { mount } from "enzyme";
import CheckboxGroup, { CheckboxGroupProps } from "./checkbox-group.component";
import { Checkbox } from ".";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import StyledCheckbox from "./checkbox.style";
import StyledCheckboxGroup from "./checkbox-group.style";
import Fieldset from "../../__internal__/fieldset";
import Tooltip from "../tooltip";
import StyledFormField from "../../__internal__/form-field/form-field.style";

const checkboxValues = ["required", "optional"];

function renderCheckboxGroup(
  props: Partial<CheckboxGroupProps>,
  childProps = {},
  renderer = mount
) {
  const children = checkboxValues.map((value) => (
    <Checkbox
      id={`cId-${value}`}
      key={`cKey-${value}`}
      name={`check-${value}`}
      onChange={jest.fn()}
      value={value}
      {...childProps}
    />
  ));

  return renderer(
    <CheckboxGroup legend="Test CheckboxGroup Label" {...props}>
      {children}
    </CheckboxGroup>
  );
}

describe("CheckboxGroup", () => {
  testStyledSystemMargin((props) => (
    <CheckboxGroup legend="Test CheckboxGroup Label" {...props}>
      {checkboxValues.map((value) => (
        <Checkbox
          id={`cId-${value}`}
          key={`cKey-${value}`}
          name={`check-${value}`}
          onChange={jest.fn()}
          value={value}
        />
      ))}
    </CheckboxGroup>
  ));

  type TestConfig = [string, string | boolean | number, string][];

  describe.each([
    ["legend", "foo"],
    ["required", true, "isRequired"],
    ["legendInline", true, "inline"],
    ["legendWidth", 30],
    ["legendAlign", "right"],
    ["legendSpacing", 2],
  ] as TestConfig)(
    "when the %s prop is set",
    (propName, propValue, expectedPropName) => {
      it("then it should be passed to the underlying Fieldset component", () => {
        expect(
          renderCheckboxGroup({
            [propName]: propValue,
          } as Partial<CheckboxGroupProps>)
            .find("Fieldset")
            .prop(expectedPropName || propName)
        ).toBe(propValue);
      });
    }
  );

  it("should have a margin set to 0 on every Checkbox FormField", () => {
    const wrapper = renderCheckboxGroup({});

    assertStyleMatch(
      {
        margin: "0",
      },
      wrapper.find(StyledCheckboxGroup),
      { modifier: `&& ${StyledFormField}` }
    );
  });

  it("should render correct styles if `legendInline` is provided", () => {
    const wrapper = renderCheckboxGroup({ legendInline: true });

    assertStyleMatch(
      {
        paddingTop: "4px",
      },
      wrapper.find(StyledCheckboxGroup),
      { modifier: `${StyledCheckbox}:first-child` }
    );
  });

  describe("validations", () => {
    it.each([
      ["error", "string"],
      ["error", true],
      ["warning", "string"],
      ["warning", true],
      ["info", "string"],
      ["info", true],
    ])(
      "when %s is passed as %s it is passed as boolean to CheckBox",
      (type, value) => {
        const wrapper = renderCheckboxGroup({ [type]: value });
        wrapper
          .find(StyledCheckbox)
          .forEach((node) => expect(node.props()[type]).toBe(true));
      }
    );
  });

  it("blocks the group behaviour if no validation set on group", () => {
    const wrapper = renderCheckboxGroup({});
    expect(wrapper.find(Fieldset).props().blockGroupBehaviour).toEqual(true);
  });

  describe("tooltipPosition", () => {
    it("should override the default value", () => {
      const wrapper = renderCheckboxGroup(
        { legend: "foo", error: "message", tooltipPosition: "bottom" },
        mount
      );
      const { position } = wrapper.find(Tooltip).props();

      expect(position).toEqual("bottom");
    });
  });
});
