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

export const FullWidth: ComponentStory<typeof ButtonToggleGroup> = () => (
  <Box margin={4}>
    <ButtonToggleGroup
      id="button-toggle-group-fullWidth-id"
      fullWidth
      label="fullWidth example"
      onChange={() => {}}
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
      <ButtonToggle value="baz">Baz</ButtonToggle>
    </ButtonToggleGroup>
  </Box>
);

export const InputHint: ComponentStory<typeof ButtonToggle> = () => (
  <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
    <ButtonToggleGroup
      id="button-toggle-group-id"
      label="inputHint example"
      inputHint="Hint text"
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
        label="Deselection example"
        onChange={onChangeHandler}
        value={value}
        allowDeselect
        inputHint="Select an option, you can clear a selected option by selecting it again"
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

export const DisabledGroup: ComponentStory<typeof ButtonToggleGroup> = () => (
  <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
    <ButtonToggleGroup
      id="button-toggle-group-disabled-id"
      label="Disabled Group"
      inputHint="Hint text"
      disabled
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
      <ButtonToggle value="baz">Baz</ButtonToggle>
    </ButtonToggleGroup>
  </Box>
);

export const WrappedButtons: ComponentStory<typeof ButtonToggleGroup> = () => (
  <Box width="350px" display="flex" flexWrap="nowrap">
    <ButtonToggleGroup
      m={4}
      id="button-toggle-group-wrapped-id"
      label="Wrapped Group"
    >
      <ButtonToggle value="add" buttonIcon="add">
        Add
      </ButtonToggle>
      <ButtonToggle value="share" buttonIcon="share">
        Share
      </ButtonToggle>
      <ButtonToggle value="tick" buttonIcon="tick">
        Tick
      </ButtonToggle>
      <ButtonToggle value="email" buttonIcon="email">
        Email
      </ButtonToggle>
      <ButtonToggle value="alert" buttonIcon="alert">
        Alert
      </ButtonToggle>
      <ButtonToggle value="calendar" buttonIcon="calendar">
        Calendar
      </ButtonToggle>
    </ButtonToggleGroup>
  </Box>
);
