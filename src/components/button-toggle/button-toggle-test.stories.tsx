import React from "react";
import { action } from "@storybook/addon-actions";

import specialCharacters from "../../__internal__/utils/argTypes/specialCharacters";
import ButtonToggle from ".";

export default {
  title: "Button Toggle/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  argTypes: {
    childrenSpecialCharacters: specialCharacters,
  },
};

export const Default = ({
  children,
  childrenSpecialCharacters,
  ...args
}: {
  children: string;
  childrenSpecialCharacters: string;
}) => (
  <div>
    <ButtonToggle
      name="new-button-toggle"
      key="button-toggle-1"
      onChange={() => action("onChange")("foo")}
      onFocus={() => action("onFocus")("foo")}
      onBlur={() => action("onBlur")("foo")}
    >
      {childrenSpecialCharacters || children}
    </ButtonToggle>
    <ButtonToggle
      name="new-button-toggle"
      key="button-toggle-2"
      onChange={() => action("onChange")("bar")}
      onFocus={() => action("onFocus")("bar")}
      onBlur={() => action("onBlur")("bar")}
    >
      {childrenSpecialCharacters || children}
    </ButtonToggle>
    <ButtonToggle
      name="new-button-toggle"
      key="button-toggle-3"
      onChange={() => action("onChange")("baz")}
      onFocus={() => action("onFocus")("baz")}
      onBlur={() => action("onBlur")("baz")}
    >
      {childrenSpecialCharacters || children}
    </ButtonToggle>
  </div>
);

Default.storyName = "default";
Default.args = {
  children: "Options",
  childrenSpecialCharacters: undefined,
};
