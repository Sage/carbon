import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";

import ButtonToggleGroup from ".";
import { ButtonToggle } from "..";
import Box from "../../box";

export const Default: ComponentStory<typeof ButtonToggleGroup> = () => (
  <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
    <ButtonToggleGroup
      id="button-toggle-group-default-id"
      label="Default example"
      labelHelp="help message"
      helpAriaLabel="Help"
      fieldHelp="field help message"
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
      <ButtonToggle value="baz">Baz</ButtonToggle>
    </ButtonToggleGroup>
  </Box>
);

export const Controlled: ComponentStory<typeof ButtonToggleGroup> = () => {
  const [value, setValue] = useState("bar");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string
  ) {
    setValue(selectedValue as string);
  }
  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-controlled-id"
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
    </Box>
  );
};

export const Grouped: ComponentStory<typeof ButtonToggleGroup> = () => (
  <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
    <ButtonToggleGroup
      id="button-toggle-group-grouped-id"
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
  </Box>
);

export const FullWidth: ComponentStory<typeof ButtonToggleGroup> = () => (
  <Box margin={4}>
    <ButtonToggleGroup
      id="button-toggle-group-fullWidth-id"
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
  </Box>
);

export const FieldHelp: ComponentStory<typeof ButtonToggleGroup> = () => (
  <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
    <ButtonToggleGroup
      id="button-toggle-group-help-inline-id"
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
  </Box>
);

export const LabelInline: ComponentStory<typeof ButtonToggleGroup> = () => (
  <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
    <ButtonToggleGroup
      id="button-toggle-group-label-inline-id"
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
  </Box>
);

export const AllowDeselection: ComponentStory<
  typeof ButtonToggleGroup
> = () => {
  const [value, setValue] = useState("bar");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string
  ) {
    setValue(selectedValue as string);
  }
  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-allowDeselect-id"
        label="deselection example"
        onChange={onChangeHandler}
        value={value}
        allowDeselect
        fieldHelp="Select an option, you can clear a selected option by selecting it again"
        fieldHelpInline
      >
        <ButtonToggle value="foo">Foo</ButtonToggle>
        <ButtonToggle value="bar">Bar</ButtonToggle>
        <ButtonToggle value="baz">Baz</ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};

export const AriaLabel: ComponentStory<typeof ButtonToggleGroup> = () => {
  const [value, setValue] = useState("bar");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string
  ) {
    setValue(selectedValue as string);
  }
  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-ariaLabel-id"
        aria-label="an accessible name"
        onChange={onChangeHandler}
        value={value}
        allowDeselect
      >
        <ButtonToggle value="foo">Foo</ButtonToggle>
        <ButtonToggle value="bar">Bar</ButtonToggle>
        <ButtonToggle value="baz">Baz</ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
