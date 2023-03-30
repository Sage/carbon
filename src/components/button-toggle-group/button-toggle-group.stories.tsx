import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";

import ButtonToggleGroup from ".";
import ButtonToggle from "../button-toggle";

export const Default: ComponentStory<typeof ButtonToggleGroup> = () => (
  <ButtonToggleGroup
    id="button-toggle-group-default-id"
    name="button-toggle-group-default"
    label="Basic example"
    labelHelp="help message"
    helpAriaLabel="Help"
    fieldHelp="field help message"
  >
    <ButtonToggle value="foo">Foo</ButtonToggle>
    <ButtonToggle value="bar">Bar</ButtonToggle>
    <ButtonToggle value="baz">Baz</ButtonToggle>
  </ButtonToggleGroup>
);

export const Controlled: ComponentStory<typeof ButtonToggleGroup> = () => {
  const [value, setValue] = useState("bar");
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
  return (
    <ButtonToggleGroup
      id="button-toggle-group-controlled-id"
      name="button-toggle-group-controlled"
      label="Controlled example"
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

export const Grouped: ComponentStory<typeof ButtonToggleGroup> = () => (
  <ButtonToggleGroup
    id="button-toggle-group-grouped-id"
    name="button-toggle-group-grouped"
    label="Grouped example"
    labelHelp="help message"
    helpAriaLabel="Help"
    fieldHelp="field help mesage"
    onChange={() => {}}
  >
    <ButtonToggle value="foo" grouped>
      Foo
    </ButtonToggle>
    <ButtonToggle value="bar" grouped>
      Bar
    </ButtonToggle>
    <ButtonToggle value="baz" grouped>
      Baz
    </ButtonToggle>
  </ButtonToggleGroup>
);

export const FullWidth: ComponentStory<typeof ButtonToggleGroup> = () => (
  <ButtonToggleGroup
    id="button-toggle-group-fullWidth-id"
    name="button-toggle-group-fullWidth"
    fullWidth
    label="fullWidth example"
    labelHelp="help message"
    helpAriaLabel="Help"
    fieldHelp="field help mesage"
    onChange={() => {}}
  >
    <ButtonToggle value="foo" grouped>
      Foo
    </ButtonToggle>
    <ButtonToggle value="bar" grouped>
      Bar
    </ButtonToggle>
    <ButtonToggle value="baz" grouped>
      Baz
    </ButtonToggle>
  </ButtonToggleGroup>
);

export const FieldHelp: ComponentStory<typeof ButtonToggleGroup> = () => (
  <ButtonToggleGroup
    id="button-toggle-group-help-inline-id"
    name="button-toggle-group-help-inline"
    label="FieldHelp inline example"
    labelHelp="help message"
    helpAriaLabel="Help"
    fieldHelp="field help mesage"
    fieldHelpInline
    onChange={() => {}}
  >
    <ButtonToggle value="foo">Foo</ButtonToggle>
    <ButtonToggle value="bar">Bar</ButtonToggle>
    <ButtonToggle value="baz">Baz</ButtonToggle>
  </ButtonToggleGroup>
);

export const LabelInline: ComponentStory<typeof ButtonToggleGroup> = () => (
  <ButtonToggleGroup
    id="button-toggle-group-label-inline-id"
    name="button-toggle-group-label-inline"
    label="Label inline example"
    labelHelp="help message"
    helpAriaLabel="Help"
    fieldHelp="field help mesage"
    labelInline
    onChange={() => {}}
  >
    <ButtonToggle value="foo">Foo</ButtonToggle>
    <ButtonToggle value="bar">Bar</ButtonToggle>
    <ButtonToggle value="baz">Baz</ButtonToggle>
  </ButtonToggleGroup>
);
