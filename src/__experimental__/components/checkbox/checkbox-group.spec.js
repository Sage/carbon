import React from "react";
import { mount } from "enzyme";
import TestRenderer from "react-test-renderer";
import CheckboxGroup from "./checkbox-group.component";
import { Checkbox } from ".";
import Icon from "../../../components/icon";
import Label from "../label";

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
  it("renders as expected", () => {
    expect(render({}, {}, TestRenderer.create)).toMatchSnapshot();
  });

  describe("group label", () => {
    it("should have the correct text", () => {
      const labelText = "My Label";
      const wrapper = render({ label: labelText });
      const label = wrapper.find(Label).first();

      expect(label.text()).toEqual(labelText);
    });
  });

  describe("group icon messsage", () => {
    it("should have the correct text", () => {
      const wrapper = render();
      const text = "Choose an option";

      wrapper.setProps({
        labelHelp: text,
      });

      const icon = wrapper.find(Icon);

      expect(icon.prop("tooltipMessage")).toEqual(text);
    });
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
});
