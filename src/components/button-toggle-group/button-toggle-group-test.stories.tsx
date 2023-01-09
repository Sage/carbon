import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import ButtonToggle from "../button-toggle";
import ButtonToggleGroup from ".";

export default {
  title: "Button Toggle Group/Test",
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
