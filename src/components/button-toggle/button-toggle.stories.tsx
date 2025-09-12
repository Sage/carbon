import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ButtonToggle, ButtonToggleGroup } from ".";
import Box from "../box";

const meta: Meta<typeof ButtonToggle> = {
  title: "Button Toggle",
  component: ButtonToggle,
  parameters: { themeProvider: { chromatic: { theme: "sage" } } },
};

export default meta;
type Story = StoryObj<typeof ButtonToggle>;

export const Default: Story = () => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Default example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle value="foo">Foo</ButtonToggle>
        <ButtonToggle value="bar">Bar</ButtonToggle>
        <ButtonToggle value="baz">Baz</ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
Default.storyName = "Default";

export const InputHint: Story = () => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="inputHint example"
        inputHint="Hint text"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle value="foo">Foo</ButtonToggle>
        <ButtonToggle value="bar">Bar</ButtonToggle>
        <ButtonToggle value="baz">Baz</ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
InputHint.storyName = "Input Hint";

export const AriaLabel: Story = () => {
  const [value, setValue] = useState("bar");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
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
AriaLabel.storyName = "Aria Label";

export const FullWidth: Story = () => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4}>
      <ButtonToggleGroup
        id="button-toggle-group-fullWidth-id"
        fullWidth
        label="fullWidth example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle value="foo">Foo</ButtonToggle>
        <ButtonToggle value="bar">Bar</ButtonToggle>
        <ButtonToggle value="baz">Baz</ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
FullWidth.storyName = "Full Width";

export const AllowDeselection: Story = () => {
  const [value, setValue] = useState("bar");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
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
AllowDeselection.storyName = "Allow Deselection";

export const DefaultSmallIcon: Story = () => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="300px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Small icon example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle value="foo" buttonIcon="add">
          Add
        </ButtonToggle>
        <ButtonToggle value="bar" buttonIcon="share">
          Share
        </ButtonToggle>
        <ButtonToggle value="baz" buttonIcon="tick">
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
DefaultSmallIcon.storyName = "Small Icon";

export const DefaultLargeIcon: Story = () => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="400px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Large icon example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle value="foo" buttonIcon="add" buttonIconSize="large">
          Add
        </ButtonToggle>
        <ButtonToggle value="bar" buttonIcon="share" buttonIconSize="large">
          Share
        </ButtonToggle>
        <ButtonToggle value="baz" buttonIcon="tick" buttonIconSize="large">
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
DefaultLargeIcon.storyName = "Large Icon";

export const IconOnly: Story = () => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Icon only example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle value="foo" buttonIcon="add" aria-label="add" />
        <ButtonToggle value="bar" buttonIcon="share" aria-label="share" />
        <ButtonToggle value="baz" buttonIcon="tick" aria-label="tick" />
      </ButtonToggleGroup>
    </Box>
  );
};
IconOnly.storyName = "Icon Only";

export const Small: Story = () => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Small example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle size="small" value="foo">
          Add
        </ButtonToggle>
        <ButtonToggle size="small" value="bar">
          Share
        </ButtonToggle>
        <ButtonToggle size="small" value="baz">
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
Small.storyName = "Small";

export const SmallSmallIcon: Story = () => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="300px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Small with small icon example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle size="small" value="foo" buttonIcon="add">
          Add
        </ButtonToggle>
        <ButtonToggle size="small" value="bar" buttonIcon="share">
          Share
        </ButtonToggle>
        <ButtonToggle size="small" value="baz" buttonIcon="tick">
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
SmallSmallIcon.storyName = "Small with Small Icon";

export const SmallLargeIcon: Story = () => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="300px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Small with large icon example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle
          size="small"
          value="foo"
          buttonIcon="add"
          buttonIconSize="large"
        >
          Add
        </ButtonToggle>
        <ButtonToggle
          size="small"
          value="bar"
          buttonIcon="share"
          buttonIconSize="large"
        >
          Share
        </ButtonToggle>
        <ButtonToggle
          size="small"
          value="baz"
          buttonIcon="tick"
          buttonIconSize="large"
        >
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
SmallLargeIcon.storyName = "Small with Large Icon";

export const Large: Story = () => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Large example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle size="large" value="foo">
          Add
        </ButtonToggle>
        <ButtonToggle size="large" value="bar">
          Share
        </ButtonToggle>
        <ButtonToggle size="large" value="baz">
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
Large.storyName = "Large";

export const LargeSmallIcon: Story = () => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="300px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Large with small icon example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle size="large" value="foo" buttonIcon="add">
          Add
        </ButtonToggle>
        <ButtonToggle size="large" value="bar" buttonIcon="share">
          Share
        </ButtonToggle>
        <ButtonToggle size="large" value="baz" buttonIcon="tick">
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
LargeSmallIcon.storyName = "Large with Small Icon";

export const LargeLargeIcon: Story = () => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="450px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Large with large icon example"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle
          size="large"
          value="foo"
          buttonIcon="add"
          buttonIconSize="large"
        >
          Add
        </ButtonToggle>
        <ButtonToggle
          size="large"
          value="bar"
          buttonIcon="share"
          buttonIconSize="large"
        >
          Share
        </ButtonToggle>
        <ButtonToggle
          size="large"
          value="baz"
          buttonIcon="tick"
          buttonIconSize="large"
        >
          Tick
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
LargeLargeIcon.storyName = "Large Large Icon";

export const DisabledButton: Story = () => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-id"
        label="Disabled Button"
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle value="foo" disabled>
          Foo
        </ButtonToggle>
        <ButtonToggle value="bar">Bar</ButtonToggle>
        <ButtonToggle value="baz">Baz</ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
DisabledButton.storyName = "Disabled Button";

export const DisabledGroup: Story = () => {
  const [value, setValue] = useState("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box margin={4} width="250px" display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        id="button-toggle-group-disabled-id"
        label="Disabled Group"
        inputHint="Hint text"
        disabled
        value={value}
        onChange={onChangeHandler}
      >
        <ButtonToggle value="foo">Foo</ButtonToggle>
        <ButtonToggle value="bar">Bar</ButtonToggle>
        <ButtonToggle value="baz">Baz</ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
DisabledGroup.storyName = "Disabled Group";

export const WrappedButtons: Story = () => {
  const [value, setValue] = useState("bar");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string,
  ) {
    setValue(selectedValue as string);
  }

  return (
    <Box width={"375px"} display="flex" flexWrap="nowrap">
      <ButtonToggleGroup
        m={4}
        id="button-toggle-group-wrapped-id"
        label="Wrapped Group"
        fullWidth
        value={value}
        onChange={onChangeHandler}
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
};
WrappedButtons.storyName = "Wrapped Buttons";
