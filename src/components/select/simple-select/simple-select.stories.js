import React from "react";
import { number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Select, Option } from "..";

export default {
  title: "Design System/Select/Test",
  component: Select,
  parameters: {
    info: {
      disable: true,
    },
    knobs: { escapeHTML: false },
    chromatic: {
      disable: true,
    },
  },
};

export const Default = () => {
  return (
    <Select
      name="simple"
      id="simple"
      label="label"
      labelInline
      // this should set to 180 px to test the top position of the select list
      mt={number("mt", 0)}
      onOpen={action("onOpen")}
      onChange={action("onChange", { depth: 2 })}
      onClick={action("onClick", { depth: 2 })}
      onFocus={action("onFocus", { depth: 2 })}
      onBlur={action("onBlur", { depth: 2 })}
      onKeyDown={action("onKeyDown", { depth: 2 })}
    >
      <Option text="Amber" value="1" />
      <Option text="Black" value="2" />
      <Option text="Blue" value="3" />
      <Option text="Brown" value="4" />
      <Option text="Green" value="5" />
      <Option text="Orange" value="6" />
      <Option text="Pink" value="7" />
      <Option text="Purple" value="8" />
      <Option text="Red" value="9" />
      <Option text="White" value="10" />
      <Option text="Yellow" value="11" />
    </Select>
  );
};

Default.story = {
  name: "default",
};
