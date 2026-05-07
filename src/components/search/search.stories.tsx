import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Box from "../box";
import Search from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Search> = {
  title: "Search",
  component: Search,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Default: Story = () => {
  const [value, setValue] = useState("");
  return <Search onChange={(e) => setValue(e.target.value)} value={value} />;
};
Default.storyName = "Default";

export const WithLabelAndInputHint: Story = () => {
  const [value, setValue] = useState("Here is some text");
  return (
    <Search
      label="Search"
      inputHint="Hint text (optional)."
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
};
WithLabelAndInputHint.storyName = "With Label and Input Hint";

export const Sizes: Story = () => {
  const [valueS, setValueS] = useState("");
  const [valueM, setValueM] = useState("");
  const [valueL, setValueL] = useState("");
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Search
        size="S"
        placeholder="Small (S)..."
        onChange={(e) => setValueS(e.target.value)}
        value={valueS}
        searchButton
      />
      <Search
        size="M"
        placeholder="Medium (M)..."
        onChange={(e) => setValueM(e.target.value)}
        value={valueM}
        searchButton
      />
      <Search
        size="L"
        placeholder="Large (L)..."
        onChange={(e) => setValueL(e.target.value)}
        value={valueL}
        searchButton
      />
    </Box>
  );
};
Sizes.storyName = "Sizes";

export const CustomWidth: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Search
        onChange={(e) => setValue(e.target.value)}
        value={value}
        searchWidth="275px"
      />
      <Search
        onChange={(e) => setValue(e.target.value)}
        value={value}
        maxWidth="375px"
      />
    </Box>
  );
};
CustomWidth.storyName = "Custom Width";

export const WithCustomMaxWidth: Story = () => {
  const [value, setValue] = useState("Here is some text");
  return (
    <Search
      onChange={(e) => setValue(e.target.value)}
      value={value}
      searchButton
      maxWidth="50%"
    />
  );
};
WithCustomMaxWidth.storyName = "Custom Max Width";

export const Inverse: Story = () => {
  const [value, setValue] = useState("Here is some text");
  return (
    <Box
      width="700px"
      height="100px"
      display="flex"
      flexDirection="column"
      gap={3}
      p={3}
      m={3}
      backgroundColor="#000000"
    >
      <Search
        placeholder="Search..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
        inverse
        mb={2}
      />
      <Search
        placeholder="Search..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
        searchButton
        inverse
      />
    </Box>
  );
};
Inverse.storyName = "Inverse";
