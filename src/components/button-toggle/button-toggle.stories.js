import React from "react";
import { text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import ButtonToggle from "./button-toggle.component";

export const basic = () => {
  const children = text("children", "Option");

  return (
    <div>
      <ButtonToggle
        name="new-button-toggle"
        key="button-toggle-1"
        onChange={() => action("onChange")("foo")}
        onFocus={() => action("onFocus")("foo")}
        onBlur={() => action("onBlur")("foo")}
      >
        {children}
      </ButtonToggle>
      <ButtonToggle
        name="new-button-toggle"
        key="button-toggle-2"
        onChange={() => action("onChange")("bar")}
        onFocus={() => action("onFocus")("bar")}
        onBlur={() => action("onBlur")("bar")}
      >
        {children}
      </ButtonToggle>
      <ButtonToggle
        name="new-button-toggle"
        key="button-toggle-3"
        onChange={() => action("onChange")("baz")}
        onFocus={() => action("onFocus")("baz")}
        onBlur={() => action("onBlur")("baz")}
      >
        {children}
      </ButtonToggle>
    </div>
  );
};

basic.story = {
  name: "basic",
};

export default {
  title: "Button Toggle/Test",
  component: ButtonToggle,
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: null,
    },
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
    knobs: {
      escapeHTML: false,
    },
  },
};
