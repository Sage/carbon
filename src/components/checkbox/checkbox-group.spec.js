import React from "react";
import { mount } from "enzyme";
import CheckboxGroup from "./checkbox-group.component";
import { Checkbox } from ".";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import CheckboxStyle, { StyledCheckboxGroup } from "./checkbox.style";
import Fieldset from "../../__internal__/fieldset";
import Tooltip from "../tooltip";
import StyledFormField from "../../__internal__/form-field/form-field.style";

const checkboxValues = ["required", "optional"];
const groupName = "my-checkbox-group";

function render(props, childProps, renderer = mount) {
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
    <CheckboxGroup
      name="group-radio-buttons"
      groupName={groupName}
      label="Test CheckboxGroup Label"
      {...props}
    >
      {children}
    </CheckboxGroup>
  );
}

describe("CheckboxGroup", () => {
  testStyledSystemMargin((props) => (
    <CheckboxGroup
      name="group-radio-buttons"
      groupName={groupName}
      label="Test CheckboxGroup Label"
      {...props}
    >
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

  describe.each([
    ["legend", "foo"],
    ["required", true, "isRequired"],
    ["legendInline", true, "inline"],
    ["legendWidth", 30],
    ["legendAlign", "right"],
    ["legendSpacing", 2],
  ])("when the %s prop is set", (propName, propValue, expectedPropName) => {
    it("then it should be passed to the underlying Fieldset component", () => {
      expect(
        render({ [propName]: propValue })
          .find("Fieldset")
          .prop(expectedPropName || propName)
      ).toBe(propValue);
    });
  });

  it("should have a margin set to 0 on every Checkbox FormField", () => {
    const wrapper = render({});

    assertStyleMatch(
      {
        margin: "0",
      },
      wrapper.find(StyledCheckboxGroup),
      { modifier: `&& ${StyledFormField}` }
    );
  });

  it("should render correct styles if `legendInline` is provided", () => {
    const wrapper = render({ legendInline: true });

    assertStyleMatch(
      {
        paddingTop: "4px",
      },
      wrapper.find(StyledCheckboxGroup),
      { modifier: `${CheckboxStyle}:first-child` }
    );
  });

  describe("onChange", () => {
    it("should be called", () => {
      const fakeFunction = jest.fn();
      const wrapper = render(
        {},
        {
          onChange: fakeFunction,
        }
      );
      const checkbox = wrapper.find(Checkbox).first();

      checkbox.prop("onChange")();

      expect(fakeFunction).toBeCalledTimes(1);
    });
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
      "when %s is passed as %s it is passed as boolean to RadioButton",
      (type, value) => {
        const wrapper = render({ [type]: value });
        wrapper
          .find(Checkbox)
          .forEach((node) => expect(node.props()[type]).toBe(true));
      }
    );
  });

  it("blocks the group behaviour if no validation set on group", () => {
    const wrapper = render({});
    expect(wrapper.find(Fieldset).props().blockGroupBehaviour).toEqual(true);
  });

  describe("tooltipPosition", () => {
    it("should override the default value", () => {
      const wrapper = render(
        { legend: "foo", error: "message", tooltipPosition: "bottom" },
        mount
      );
      const { position } = wrapper.find(Tooltip).props();

      expect(position).toEqual("bottom");
    });
  });
});
