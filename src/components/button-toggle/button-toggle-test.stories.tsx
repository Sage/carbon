import React from "react";
import { action } from "@storybook/addon-actions";

import ButtonToggle from ".";
import ButtonToggleGroup from "../button-toggle-group";

export default {
  title: "Button Toggle/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
};

export const Default = ({ children, ...args }: { children: string }) => (
  <ButtonToggleGroup id="button-toggle-group" name="button-toggle-group">
    <ButtonToggle
      name="new-button-toggle"
      key="button-toggle-1"
      onChange={() => action("onChange")("foo")}
      onFocus={() => action("onFocus")("foo")}
      onBlur={() => action("onBlur")("foo")}
      {...args}
    >
      {children}
    </ButtonToggle>
    <ButtonToggle
      name="new-button-toggle"
      key="button-toggle-2"
      onChange={() => action("onChange")("bar")}
      onFocus={() => action("onFocus")("bar")}
      onBlur={() => action("onBlur")("bar")}
      {...args}
    >
      {children}
    </ButtonToggle>
    <ButtonToggle
      name="new-button-toggle"
      key="button-toggle-3"
      onChange={() => action("onChange")("baz")}
      onFocus={() => action("onFocus")("baz")}
      onBlur={() => action("onBlur")("baz")}
      {...args}
    >
      {children}
    </ButtonToggle>
  </ButtonToggleGroup>
);

Default.storyName = "default";
Default.args = {
  children: "Options",
};
