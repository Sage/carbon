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
    selectedValue?: string,
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
      inputHint="hint message"
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
      <ButtonToggle value="baz">Baz</ButtonToggle>
    </ButtonToggleGroup>
  );
};

DefaultStory.storyName = "default";
