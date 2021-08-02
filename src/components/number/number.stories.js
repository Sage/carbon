import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import { boolean, number } from "@storybook/addon-knobs";

import Number from "./number.component";
import { getCommonTextboxProps } from "../textbox/textbox.stories";

export default {
  title: "Number Input/Test",
  component: Number,
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

export const Default = () => {
  const [state, setState] = useState("");
  const onChangeDeferredEnabled = boolean("onChangeDeferred", false);
  const onKeyDownEnabled = boolean("onKeyDown", false);
  const deferTimeout = onChangeDeferredEnabled
    ? number("deferTimeout")
    : undefined;
  const setValue = (ev) => {
    action("onChange")(ev);
    setState(ev.target.value);
  };

  return (
    <Number
      {...getCommonTextboxProps()}
      value={state}
      onChange={setValue}
      onKeyDown={onKeyDownEnabled ? action("onKeyDown") : undefined}
      onChangeDeferred={
        onChangeDeferredEnabled ? action("onChangeDeferred") : undefined
      }
      deferTimeout={deferTimeout}
    />
  );
};

Default.story = {
  name: "default",
};
