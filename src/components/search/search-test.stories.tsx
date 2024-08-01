import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import Pill from "../pill/pill.component";
import Search, { SearchProps } from ".";
import { SearchEvent } from "./search.component";

export default {
  title: "Search/Test",
  includeStories: ["Default", "FilterOnClear"],
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
    action("change")(event.target.value);
  };
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    action("blur")(event.target.value);
  };
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    action("focus")(event.target.value);
  };
  const handleClick = (event: SearchEvent) => {
    action("click")(event.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    action("keydown")(event.target);
  };

  return (
    <Search
      onChange={handleChange}
      onBlur={handleBlur}
      onClick={handleClick}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      error="error message"
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

export const FilterOnClear = () => {
  const [value, setValue] = useState("");
  const textArray = ["test value 1", "test value 2", "test value 3"];
  const [filteredText, setFilteredText] = useState(textArray);

  const updateFilteredElements = (searchValue: string) => {
    if (searchValue === "") {
      setFilteredText(textArray);
    } else {
      setFilteredText(textArray.filter((text) => text.includes(searchValue)));
    }
  };
  return (
    <>
      <Search
        id="test"
        name="test"
        placeholder="Search..."
        triggerOnClear
        onClick={(e) => updateFilteredElements(e.target.value)}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        searchButton
      />

      <div>
        {filteredText.map((text) => (
          <Pill key={text}>{text}</Pill>
        ))}
      </div>
    </>
  );
};
FilterOnClear.storyName = "Filter on clear";
