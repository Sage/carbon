import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import { ButtonToggle, ButtonToggleGroup } from "..";

export default {
  title: "Button Toggle/Button Toggle Group/Test",
  includeStories: ["DefaultStory"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const DefaultStory = () => {
  const [value, setValue] = useState("bar");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string
  ) {
    setValue(selectedValue as string);
    action("value set")(selectedValue);
  }
  return (
    <ButtonToggleGroup
      id="button-toggle-group"
      label="Button Toggle Group test"
      labelHelp="help message"
      helpAriaLabel="Help"
      fieldHelp="field help message"
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

export const WithOutsideButtons = () => {
  const [value, setValue] = useState<string>();
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedValue?: string
  ) {
    setValue(selectedValue);
    action("value set")(selectedValue);
  }
  return (
    <>
      <button type="button" id="button-before">
        button before
      </button>
      <ButtonToggleGroup
        id="button-toggle-group"
        label="Button Toggle Group test"
        onChange={onChangeHandler}
        value={value}
      >
        <ButtonToggle value="foo">Foo</ButtonToggle>
        <ButtonToggle value="bar">Bar</ButtonToggle>
        <ButtonToggle value="baz">Baz</ButtonToggle>
      </ButtonToggleGroup>
      <button type="button" id="button-after">
        button after
      </button>
    </>
  );
};

export const ButtonToggleGroupComponentGroupedChildren = ({ ...props }) => {
  return (
    <div>
      <ButtonToggleGroup
        id="button-toggle-group-default-id"
        label="Default example"
        labelHelp="help message"
        helpAriaLabel="Help"
        fieldHelp="field help message"
        onChange={function noRefCheck() {
          ("");
        }}
        {...props}
      >
        <ButtonToggle key="foo" value="foo" grouped>
          Foo
        </ButtonToggle>
        <ButtonToggle key="bar" value="bar" grouped>
          Bar
        </ButtonToggle>
        <ButtonToggle key="baz" value="baz" grouped>
          Baz
        </ButtonToggle>
      </ButtonToggleGroup>
    </div>
  );
};
