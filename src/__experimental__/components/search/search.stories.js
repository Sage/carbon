import React, { useState } from "react";
import {
  boolean,
  text,
  number,
  select,
  withKnobs,
} from "@storybook/addon-knobs";

import { action } from "@storybook/addon-actions";
import Search from ".";

export default {
  title: "Design System/Search/Test",
  component: Search,
  decorators: [withKnobs],
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
  const [value, setValue] = useState("");

  const handleChange = (ev) => {
    setValue(ev.target.value);
    action("change")(ev);
  };

  const handleBlur = (ev) => {
    action("blur")(ev);
  };

  const handleClick = (ev) => {
    action("click")(ev);
  };

  return (
    <Search
      placeholder={text("placeholder", "Search...")}
      threshold={number("threshold", 3)}
      searchButton={boolean("searchButton", true)}
      searchWidth={text("searchWidth", undefined)}
      onChange={handleChange}
      onBlur={handleBlur}
      onClick={handleClick}
      value={value}
      variant={select("variant", ["default", "dark"])}
      name="search_name"
      id="search_id"
    />
  );
};

Default.story = {
  name: "default",
};
