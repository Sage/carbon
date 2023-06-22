import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import Search, { SearchProps } from ".";
import { SearchEvent } from "./search.component";

export default {
  title: "Search/Test",
  includeStories: ["Default"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    variant: {
      options: ["default", "dark"],
      control: {
        type: "select",
      },
    },
  },
};

export const Default = ({ placeholder, ...args }: { placeholder?: string }) => {
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
      placeholder={placeholder}
      name="search_name"
      id="search_id"
      {...args}
    />
  );
};

Default.storyName = "default";

Default.args = {
  placeholder: "Search...",
  searchButton: true,
  searchWidth: "",
  threshold: 3,
  variant: undefined,
};

export const SearchComponent = (props: SearchProps) => {
  const [value, setValue] = React.useState("");

  return (
    <Search
      placeholder="Search..."
      onChange={(e) => setValue(e.target.value)}
      value={value}
      {...props}
    />
  );
};
