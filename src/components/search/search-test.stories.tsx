import React, { useEffect, useRef } from "react";
import Box from "../box";
import Search from ".";
import { SearchHandle } from "./search.component";

export default {
  title: "Search/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: false,
    },
    themeProvider: { chromatic: { theme: "sage" } },
  },
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
  pseudo: {
    focus: "[data-role='search-button-focus'] .search-button",
  },
};

export const RegressionMatrix = () => (
  <Box
    width="820px"
    display="grid"
    gridTemplateColumns="repeat(2, minmax(0, 1fr))"
    gap={3}
  >
    <Box p={4}>
      <Search
        onChange={() => {}}
        value="Default configuration"
        aria-label="Default configuration"
      />
    </Box>

    <Box p={4} backgroundColor="#000000">
      <Search
        onChange={() => {}}
        value="Inverse configuration"
        inverse
        aria-label="Inverse configuration"
      />
    </Box>

    <Box p={4}>
      <Search
        onChange={() => {}}
        value="Default with label and input hint"
        label="Search"
        inputHint="Input hint"
        aria-label="Default with label and input hint"
      />
    </Box>

    <Box p={4} backgroundColor="#000000">
      <Search
        onChange={() => {}}
        value="Inverse with label and input hint"
        inverse
        label="Search"
        inputHint="Input hint"
        aria-label="Inverse with label and input hint"
      />
    </Box>

    <Box p={4}>
      <Search
        onChange={() => {}}
        value="Default with label, input hint and error"
        label="Search"
        inputHint="Input hint"
        error="Error message"
        aria-label="Default with label, input hint and error"
      />
    </Box>

    <Box p={4} backgroundColor="#000000">
      <Search
        onChange={() => {}}
        value="Inverse with label, input hint and error"
        inverse
        label="Search"
        inputHint="Input hint"
        error="Error message"
        aria-label="Inverse with label, input hint and error"
      />
    </Box>

    <Box p={4}>
      <Search
        onChange={() => {}}
        value="Default with label, input hint and warning"
        label="Search"
        inputHint="Input hint"
        warning="Warning message"
        aria-label="Default with label, input hint and warning"
      />
    </Box>

    <Box p={4} backgroundColor="#000000">
      <Search
        onChange={() => {}}
        value="Inverse with label, input hint and warning"
        inverse
        label="Search"
        inputHint="Input hint"
        warning="Warning message"
        aria-label="Inverse with label, input hint and warning"
      />
    </Box>
  </Box>
);
RegressionMatrix.storyName = "Regression Matrix";