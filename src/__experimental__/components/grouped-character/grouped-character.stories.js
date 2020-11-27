import React, { useState } from "react";
import { text, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import GroupedCharacter from "./grouped-character.component";
import { getCommonTextboxProps } from "../textbox/textbox.stories";

export default {
  title: "Experimental/GroupedCharacter/Test",
  component: GroupedCharacter,
  parameters: {
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

export const Default = (props) => {
  const [state, setState] = useState("");
  const groups = object("groups", [2, 2, 4]);
  const separator = text("separator", "-");
  const onChange = (ev) => {
    setState(ev.target.value.rawValue);
    action("change")(ev);
  };

  return (
    <GroupedCharacter
      {...getCommonTextboxProps()}
      groups={groups}
      separator={separator}
      value={state}
      onChange={onChange}
      {...props}
    />
  );
};

Default.story = {
  name: "default",
};
