import React, { useEffect, useRef, useState } from "react";
import { action } from "@storybook/addon-actions";
import Pill from "../pill/pill.component";
import Box from "../box";
import Search from ".";
import { SearchEvent, SearchHandle } from "./search.component";

export default {
  title: "Search/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
    themeProvider: { chromatic: { theme: "sage" } },
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
      value={value}
      placeholder={placeholder}
      name="search_name"
      id="search_id"
      {...args}
    />
  );
};

Default.storyName = "Default";

Default.args = {
  placeholder: "Search...",
  searchButton: true,
  searchWidth: "",
  threshold: 3,
  variant: undefined,
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

export const Validation = () => {
  const [state, setState] = useState("");
  const [state2, setState2] = useState("");
  const [state3, setState3] = useState("");
  const [state4, setState4] = useState("");
  const [state5, setState5] = useState("");
  const [state6, setState6] = useState("");

  return (
    <>
      <Search
        onChange={(ev) => setState(ev.target.value)}
        value={state}
        searchButton
        error="Error Message"
        mb={2}
      />
      <Search
        onChange={(ev) => setState2(ev.target.value)}
        value={state2}
        searchButton
        warning="Warning Message"
        mb={2}
      />
      <Search
        onChange={(ev) => setState3(ev.target.value)}
        value={state3}
        searchButton
        info="Info Message"
        mb={2}
      />

      <Search
        onChange={(ev) => setState4(ev.target.value)}
        value={state4}
        searchButton
        error
        mb={2}
      />
      <Search
        onChange={(ev) => setState5(ev.target.value)}
        value={state5}
        searchButton
        warning
        mb={2}
      />
      <Search
        onChange={(ev) => setState6(ev.target.value)}
        value={state6}
        searchButton
        info
      />
    </>
  );
};
Validation.storyName = "Validation";
Validation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const HoverStyling = () => (
  <>
    <Box mb={4}>
      <Search
        placeholder="Search..."
        onChange={() => {}}
        value=""
        aria-label="Search default"
        data-role="search-default"
      />
    </Box>
    <Box width="700px" p={4} backgroundColor="#003349">
      <Search
        placeholder="Search..."
        onChange={() => {}}
        value=""
        variant="dark"
        aria-label="Search dark"
        data-role="search-dark"
      />
    </Box>
  </>
);
HoverStyling.storyName = "Hover Styling";
HoverStyling.parameters = {
  chromatic: { disableSnapshot: false },
  pseudo: {
    hover: ["[data-role='search-default']", "[data-role='search-dark']"],
  },
};

const AutoFocusSearch = (props: React.ComponentProps<typeof Search>) => {
  const ref = useRef<SearchHandle>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return <Search ref={ref} {...props} />;
};

export const FocusStyling = () => (
  <>
    <Box mb={4}>
      <AutoFocusSearch
        placeholder="Search..."
        onChange={() => {}}
        value=""
        aria-label="Search input"
      />
    </Box>
    <Box>
      <Search
        placeholder="Search..."
        onChange={() => {}}
        value=""
        searchButton
        aria-label="Search button"
        data-role="search-button-focus"
      />
    </Box>
  </>
);
FocusStyling.storyName = "Focus Styling";
FocusStyling.parameters = {
  chromatic: { disableSnapshot: false },
  pseudo: {
    focus: "[data-role='search-button-focus'] .search-button",
  },
};
