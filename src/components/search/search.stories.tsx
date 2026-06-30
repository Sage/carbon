import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Box from "../box";
import Icon from "../icon";
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

  return <Search value={value} onChange={(e) => setValue(e.target.value)} />;
};
Default.storyName = "Default";

export const WithDropdown: Story = () => {
  const minQueryLength = 2;

  const recentItems = [
    { value: "recent-term-1", labelPrefix: "Recent ", label: "term 1" },
    { value: "recent-term-2", labelPrefix: "Recent ", label: "term 2" },
    { value: "recent-term-3", labelPrefix: "Recent ", label: "term 3" },
  ];

  const suggestedItems = [
    { value: "suggested-term-1", labelPrefix: "Suggested ", label: "term 1" },
    { value: "suggested-term-2", labelPrefix: "Suggested ", label: "term 2" },
    { value: "suggested-term-3", labelPrefix: "Suggested ", label: "term 3" },
    { value: "suggested-term-4", labelPrefix: "Suggested ", label: "term 4" },
    { value: "suggested-term-5", labelPrefix: "Suggested ", label: "term 5" },
  ];

  const [value, setValue] = useState("");
  const [dismissed, setDismissed] = useState(false);

  const match = <T extends { label: string }>(items: T[]) =>
    items.filter((item) =>
      item.label.toLowerCase().includes(value.toLowerCase()),
    );

  const filteredRecent = match(recentItems);
  const filteredSuggested = match(suggestedItems);

  const listData = [
    ...(filteredRecent.length > 0
      ? [
          {
            heading: "Recent searches",
            icon: <Icon type="clock" />,
            items: filteredRecent,
          },
        ]
      : []),
    ...(filteredSuggested.length > 0
      ? [
          {
            heading: "Suggested",
            icon: <Icon type="search" />,
            items: filteredSuggested,
          },
        ]
      : []),
  ];

  const isOpen =
    value.length >= minQueryLength && listData.length > 0 && !dismissed;

  return (
    <Box height="300px" width="700px">
      <Search
        label="Search"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setDismissed(false);
        }}
        open={isOpen}
        minQueryLength={minQueryLength}
        listData={listData}
        onListItemSelect={(val) => {
          setValue(val);
          setDismissed(true);
        }}
        onClose={() => setDismissed(true)}
      />
    </Box>
  );
};
WithDropdown.storyName = "With Dropdown";

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

export const SizesWithDropdown: Story = () => {
  const items = [
    { value: "term-1", labelPrefix: "Suggested ", label: "term 1" },
    { value: "term-2", labelPrefix: "Suggested ", label: "term 2" },
    { value: "term-3", labelPrefix: "Suggested ", label: "term 3" },
  ];

  const [valueS, setValueS] = useState("");
  const [valueM, setValueM] = useState("");
  const [valueL, setValueL] = useState("");
  const [dismissedS, setDismissedS] = useState(false);
  const [dismissedM, setDismissedM] = useState(false);
  const [dismissedL, setDismissedL] = useState(false);

  const getListData = (val: string) => {
    const filtered = items.filter((item) =>
      item.label.toLowerCase().includes(val.toLowerCase()),
    );
    return filtered.length > 0
      ? [
          {
            heading: "Suggested",
            icon: <Icon type="search" />,
            items: filtered,
          },
        ]
      : [];
  };

  return (
    <Box display="flex" flexDirection="column" gap={3} height="450px">
      <Search
        label="Small"
        size="small"
        value={valueS}
        onChange={(e) => {
          setValueS(e.target.value);
          setDismissedS(false);
        }}
        open={
          valueS.length > 0 && getListData(valueS).length > 0 && !dismissedS
        }
        listData={getListData(valueS)}
        onListItemSelect={(val) => {
          setValueS(val);
          setDismissedS(true);
        }}
        onClose={() => setDismissedS(true)}
      />
      <Search
        label="Medium"
        size="medium"
        value={valueM}
        onChange={(e) => {
          setValueM(e.target.value);
          setDismissedM(false);
        }}
        open={
          valueM.length > 0 && getListData(valueM).length > 0 && !dismissedM
        }
        listData={getListData(valueM)}
        onListItemSelect={(val) => {
          setValueM(val);
          setDismissedM(true);
        }}
        onClose={() => setDismissedM(true)}
      />
      <Search
        label="Large"
        size="large"
        value={valueL}
        onChange={(e) => {
          setValueL(e.target.value);
          setDismissedL(false);
        }}
        open={
          valueL.length > 0 && getListData(valueL).length > 0 && !dismissedL
        }
        listData={getListData(valueL)}
        onListItemSelect={(val) => {
          setValueL(val);
          setDismissedL(true);
        }}
        onClose={() => setDismissedL(true)}
      />
    </Box>
  );
};
SizesWithDropdown.storyName = "Sizes with Dropdown";

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

export const LabelInline: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Search
        label="Search"
        labelInline
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <Search
        label="Search with hint"
        inputHint="Hint text (optional)."
        labelInline
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </Box>
  );
};
LabelInline.storyName = "Label Inline";
