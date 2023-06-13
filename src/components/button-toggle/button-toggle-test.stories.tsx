import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import { ButtonToggle, ButtonToggleGroup, ButtonToggleProps } from ".";

export default {
  title: "Button Toggle/Test",
  includeStories: ["DefaultStory", "WithoutGroup"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const DefaultStory = () => {
  const [value, setValue] = useState<string | undefined>("bar");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedButtonValue?: string
  ) {
    setValue(selectedButtonValue);
    action("value set")(selectedButtonValue);
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

export const WithoutGroup = (args: Partial<ButtonToggleProps>) => (
  <div>
    <ButtonToggle
      name="new-button-toggle"
      key="button-toggle-1"
      onFocus={() => action("onFocus")("foo")}
      onBlur={() => action("onBlur")("foo")}
      {...args}
    >
      Foo
    </ButtonToggle>
    <ButtonToggle
      name="new-button-toggle"
      key="button-toggle-2"
      onFocus={() => action("onFocus")("bar")}
      onBlur={() => action("onBlur")("bar")}
      {...args}
    >
      Bar
    </ButtonToggle>
    <ButtonToggle
      name="new-button-toggle"
      key="button-toggle-3"
      onFocus={() => action("onFocus")("baz")}
      onBlur={() => action("onBlur")("baz")}
      {...args}
    >
      Baz
    </ButtonToggle>
  </div>
);

WithoutGroup.storyName = "without group";

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

export const ButtonToggleComponent = ({
  // eslint-disable-next-line react/prop-types
  children = "This is an example of an alert",
  ...props
}: ButtonToggleProps) => {
  return (
    <div>
      <ButtonToggle
        name="button-toggle-one"
        onBlur={function noRefCheck() {
          ("");
        }}
        onFocus={function noRefCheck() {
          ("");
        }}
        {...props}
      >
        {children}
      </ButtonToggle>
      <ButtonToggle
        name="button-toggle-two"
        onBlur={function noRefCheck() {
          ("");
        }}
        onFocus={function noRefCheck() {
          ("");
        }}
        {...props}
      >
        Second
      </ButtonToggle>
      <ButtonToggle
        name="button-toggle-three"
        onBlur={function noRefCheck() {
          ("");
        }}
        onFocus={function noRefCheck() {
          ("");
        }}
        {...props}
      >
        Third
      </ButtonToggle>
    </div>
  );
};
