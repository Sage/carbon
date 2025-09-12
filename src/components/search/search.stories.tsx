import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Box from "../box";
import Search from ".";
import I18nProvider from "../i18n-provider/i18n-provider.component";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Search> = {
  title: "Search",
  component: Search,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Default: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Search
      placeholder="Search..."
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
};
Default.storyName = "Default";

export const WithSearchButton: Story = () => {
  const [value, setValue] = useState("Here is some text");
  return (
    <Box m={1}>
      <Search
        onChange={(e) => setValue(e.target.value)}
        value={value}
        searchButton
        searchButtonAriaLabel="search button aria label"
      />
    </Box>
  );
};
WithSearchButton.storyName = "With Search Button";

export const WithSearchButtonPropTextOverride: Story = () => {
  const [value, setValue] = useState("Here is some text");
  return (
    <Box m={1}>
      <Search
        onChange={(e) => setValue(e.target.value)}
        value={value}
        searchButton="Find"
      />
    </Box>
  );
};
WithSearchButtonPropTextOverride.storyName =
  "With Search Button text override via prop";

export const WithSearchButtonLocaleOverride: Story = () => {
  const [value, setValue] = useState("Here is some text");
  return (
    <Box m={1}>
      <I18nProvider locale={{ search: { searchButtonText: () => "Find" } }}>
        <Search
          onChange={(e) => setValue(e.target.value)}
          value={value}
          searchButton
        />
      </I18nProvider>
    </Box>
  );
};
WithSearchButtonLocaleOverride.storyName =
  "With Search Button text override via locale";

export const CustomWidth: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Search
      placeholder="Search..."
      onChange={(e) => setValue(e.target.value)}
      value={value}
      searchWidth="375px"
    />
  );
};
CustomWidth.storyName = "Custom Width";

export const WithCustomMaxWidth: Story = () => {
  const [value, setValue] = useState("Here is some text");
  return (
    <Box m={1}>
      <Search
        onChange={(e) => setValue(e.target.value)}
        value={value}
        searchButton
        maxWidth="50%"
      />
    </Box>
  );
};
WithCustomMaxWidth.storyName = "Custom Max Width";

export const WithAltStyling: Story = () => {
  const [value, setValue] = useState("Here is some text");
  return (
    <Box width="700px" height="108px" p={4} backgroundColor="#000000">
      <Search
        placeholder="Search..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
        variant="dark"
        mb={2}
      />
      <Search
        placeholder="Search..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
        searchButton
        variant="dark"
      />
    </Box>
  );
};
WithAltStyling.storyName = "Dark Background variant";

export const TriggerOnClear: Story = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <Search
        id="test"
        name="test"
        placeholder="Search..."
        triggerOnClear
        onChange={(e) => setValue(e.target.value)}
        value={value}
        searchButton
      />
    </>
  );
};
TriggerOnClear.storyName = "Trigger on Clear";
TriggerOnClear.parameters = {
  chromatic: { disableSnapshot: true },
};
