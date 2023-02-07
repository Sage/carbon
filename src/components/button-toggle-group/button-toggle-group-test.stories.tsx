import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import ButtonToggle from "../button-toggle";
import ButtonToggleGroup from ".";

export default {
  title: "Button Toggle Group/Test",
  includeStories: "DefaultStory",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
};

export const DefaultStory = () => {
  const [value, setValue] = useState("bar");
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    action("value set")(event.target.value);
  }
  return (
    <ButtonToggleGroup
      id="button-toggle-group"
      name="button-toggle-group"
      label="Button Toggle Group test"
      labelHelp="help message"
      helpAriaLabel="Help"
      fieldHelp="field help mesage"
      onChange={onChangeHandler}
      value={value}
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
      <ButtonToggle value="baz">Baz</ButtonToggle>
    </ButtonToggleGroup>
  );
};

DefaultStory.storyName = "default";

export const ButtonToggleGroupComponent = ({ ...props }) => {
  return (
    <div>
      <ButtonToggleGroup
        id="button-toggle-group-default-id"
        name="button-toggle-group-default"
        label="Default example"
        labelHelp="help message"
        helpAriaLabel="Help"
        fieldHelp="field help message"
        onChange={function noRefCheck() {
          ("");
        }}
        {...props}
      >
        <ButtonToggle key="foo" value="foo">
          Foo
        </ButtonToggle>
        <ButtonToggle key="bar" value="bar">
          Bar
        </ButtonToggle>
        <ButtonToggle key="baz" value="baz">
          Baz
        </ButtonToggle>
      </ButtonToggleGroup>
    </div>
  );
};

export const ButtonToggleGroupDefaultChecked = () => {
  return (
    <div>
      <ButtonToggleGroup
        fieldHelp="field help mesage"
        helpAriaLabel="Help"
        id="button-toggle-group-controlled-id-sage"
        label="Controlled example"
        labelHelp="help message"
        name="button-toggle-group-controlled-sage"
      >
        <ButtonToggle value="foo">Foo</ButtonToggle>
        <ButtonToggle value="bar" defaultChecked>
          Bar
        </ButtonToggle>
        <ButtonToggle value="baz">Baz</ButtonToggle>
      </ButtonToggleGroup>
    </div>
  );
};
