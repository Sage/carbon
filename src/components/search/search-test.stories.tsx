import React, { useEffect, useRef, useState } from "react";
import { action } from "@storybook/addon-actions";
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
  searchWidth: "",
  threshold: 3,
  variant: undefined,
};

export const HoverStyling = () => (
  <>
    <Box mb={4} width="700px" p={4}>
      <Search
        placeholder="Search..."
        onChange={() => {}}
        value=""
        aria-label="Search default"
        data-role="search-default"
      />
    </Box>
    <Box width="700px" p={4} backgroundColor="#000000">
      <Search
        placeholder="Search..."
        onChange={() => {}}
        value=""
        inverse
        aria-label="Search inverse"
        data-role="search-inverse"
      />
    </Box>
  </>
);
HoverStyling.storyName = "Hover Styling";
HoverStyling.parameters = {
  chromatic: { disableSnapshot: false },
  pseudo: {
    hover: [
      "[data-role='search-default'] .search-button",
      "[data-role='search-inverse'] .search-button",
    ],
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
    <Box mb={4} width="700px" p={4}>
      <AutoFocusSearch
        placeholder="Search..."
        onChange={() => {}}
        value=""
        aria-label="Search input"
      />
    </Box>
    <Box width="700px" p={4}>
      <Search
        placeholder="Search..."
        onChange={() => {}}
        value=""
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

export const RegressionMatrix = () => (
  <>
    <Box mb={3} width="700px" p={4}>
      <Search
        onChange={() => {}}
        value=""
        placeholder="Default configuration"
        aria-label="Default configuration"
      />
    </Box>

    <Box mb={3} width="700px" p={4} backgroundColor="#000000">
      <Search
        onChange={() => {}}
        value=""
        inverse
        placeholder="Inverse configuration"
        aria-label="Inverse configuration"
      />
    </Box>

    <Box mb={3} width="700px" p={4}>
      <Search
        onChange={() => {}}
        value=""
        label="Search"
        inputHint="Input hint"
        placeholder="Default with label and input hint"
        aria-label="Default with label and input hint"
      />
    </Box>

    <Box mb={3} width="700px" p={4} backgroundColor="#000000">
      <Search
        onChange={() => {}}
        value=""
        inverse
        label="Search"
        inputHint="Input hint"
        placeholder="Inverse with label and input hint"
        aria-label="Inverse with label and input hint"
      />
    </Box>

    <Box mb={3} width="700px" p={4}>
      <Search
        onChange={() => {}}
        value=""
        label="Search"
        inputHint="Input hint"
        error="Error message"
        placeholder="Default with label, input hint and error"
        aria-label="Default with label, input hint and error"
      />
    </Box>

    <Box mb={3} width="700px" p={4} backgroundColor="#000000">
      <Search
        onChange={() => {}}
        value=""
        inverse
        label="Search"
        inputHint="Input hint"
        error="Error message"
        placeholder="Inverse with label, input hint and error"
        aria-label="Inverse with label, input hint and error"
      />
    </Box>

    <Box mb={3} width="700px" p={4}>
      <Search
        onChange={() => {}}
        value=""
        label="Search"
        inputHint="Input hint"
        warning="Warning message"
        placeholder="Default with label, input hint and warning"
        aria-label="Default with label, input hint and warning"
      />
    </Box>

    <Box width="700px" p={4} backgroundColor="#000000">
      <Search
        onChange={() => {}}
        value=""
        inverse
        label="Search"
        inputHint="Input hint"
        warning="Warning message"
        placeholder="Inverse with label, input hint and warning"
        aria-label="Inverse with label, input hint and warning"
      />
    </Box>
  </>
);
RegressionMatrix.storyName = "Regression Matrix";
RegressionMatrix.parameters = {
  chromatic: { disableSnapshot: false },
};
