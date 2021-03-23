import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import { boolean, number, text } from "@storybook/addon-knobs";
import DateInput from "./date.component";
import { getCommonTextboxProps } from "../textbox/textbox.stories";

export default {
  title: "Experimental/Date Input/Test",
  component: DateInput,
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
  const [state, setState] = useState("2019-04-04");
  const minDate = text("minDate", "");
  const maxDate = text("maxDate", "");
  const allowEmptyValue = boolean("allowEmptyValue", false);
  const autoFocus = boolean("autoFocus", false);

  const setValue = (ev) => {
    action("onChange")(ev);
    setState(ev.target.value.rawValue);
  };

  return (
    <DateInput
      {...getCommonTextboxProps({
        inputWidthEnabled: false,
        disablePrefix: true,
        disableInputIcon: true,
      })}
      name="dateinput"
      autoFocus={autoFocus}
      minDate={minDate}
      maxDate={maxDate}
      value={state}
      onChange={setValue}
      onBlur={(ev) => action("onBlur")(ev)}
      onKeyDown={(ev) => action("onKeyDown")(ev)}
      allowEmptyValue={allowEmptyValue}
      mt={number("mt", 0)}
      {...props}
    />
  );
};

Default.story = {
  name: "default",
};
