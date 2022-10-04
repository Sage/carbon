import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import specialCharacters from "../../__internal__/utils/argTypes/specialCharacters";
import Search from ".";
import { SearchEvent } from "./search.component";

export default {
  title: "Search/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  argTypes: {
    variant: {
      options: ["default", "dark"],
      control: {
        type: "select",
      },
    },
    placeholderSpecialCharacters: specialCharacters,
  },
};

export const Default = ({
  placeholder,
  placeholderSpecialCharacters,
  ...args
}: {
  placeholder?: string;
  placeholderSpecialCharacters?: string;
}) => {
  const [value, setValue] = useState("");
  const handleChange = (event: SearchEvent) => {
    setValue(event.target.value);
    action("change")(event);
  };
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    action("blur")(event);
  };
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    action("focus")(event);
  };
  const handleClick = (event: SearchEvent) => {
    action("click")(event);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    action("keydown")(event);
  };

  return (
    <Search
      onChange={handleChange}
      onBlur={handleBlur}
      onClick={handleClick}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      value={value}
      placeholder={placeholder || placeholderSpecialCharacters}
      name="search_name"
      id="search_id"
      {...args}
    />
  );
};

Default.storyName = "default";

Default.args = {
  placeholder: "Search...",
  placeholderSpecialCharacters: undefined,
  searchButton: true,
  searchWidth: "",
  threshold: 3,
  variant: undefined,
};
