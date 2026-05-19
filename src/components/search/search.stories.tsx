import React, { useEffect, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Box from "../box";
import Search, { SearchProps } from ".";
import {
  defaultSearchArgTypes,
  defaultSearchArgs,
  defaultSearchControlsInclude,
} from "./utils";

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

const DefaultStory = (args: SearchProps) => {
  const { value: initialValue = "", onChange, ...rest } = args;

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const search = (
    <Search
      {...rest}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onChange?.(e);
      }}
    />
  );

  if (rest.inverse) {
    return (
      <Box p={3} backgroundColor="#000000">
        {search}
      </Box>
    );
  }

  return search;
};

export const Default: Story = {
  parameters: {
    controls: {
      expanded: true,
      include: defaultSearchControlsInclude,
    },
  },
  argTypes: defaultSearchArgTypes,
  args: defaultSearchArgs,
  render: (args) => <DefaultStory {...args} />,
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
        label="Small"
        size="small"
        onChange={(e) => setValueS(e.target.value)}
        value={valueS}
      />
      <Search
        label="Medium"
        size="medium"
        onChange={(e) => setValueM(e.target.value)}
        value={valueM}
      />
      <Search
        label="Large"
        size="large"
        onChange={(e) => setValueL(e.target.value)}
        value={valueL}
      />
    </Box>
  );
};
Sizes.storyName = "Sizes";

export const CustomWidths: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Search
        label="searchWidth"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        inputWidth={25}
      />
      <Search
        label="maxWidth"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        maxWidth="75%"
      />
    </Box>
  );
};
CustomWidths.storyName = "Custom Widths";

export const Inverse: Story = () => {
  const [value, setValue] = useState("Here is some text");
  return (
    <Box
      width="700px"
      display="flex"
      flexDirection="column"
      p={3}
      backgroundColor="#000000"
    >
      <Search
        label="Inverse"
        inputHint="Use this prop on darker backgrounds"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        inverse
      />
    </Box>
  );
};
Inverse.storyName = "Inverse";
