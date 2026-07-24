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
    { value: "recent-term-1", label: "Recent term 1" },
    { value: "recent-term-2", label: "Recent term 2" },
    { value: "recent-term-3", label: "Recent term 3" },
  ];

  const suggestedItems = [
    { value: "suggested-term-1", label: "Suggested term 1" },
    { value: "suggested-term-2", label: "Suggested term 2" },
    { value: "suggested-term-3", label: "Suggested term 3" },
    { value: "suggested-term-4", label: "Suggested term 4" },
    { value: "suggested-term-5", label: "Suggested term 5" },
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
            icon: <Icon type="refresh_clock" />,
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
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setValue("");
            setDismissed(true);
          }
        }}
        onFocus={() => setDismissed(false)}
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
  const minQueryLength = 2;

  const recentItems = [
    { value: "recent-term-1", label: "Recent term 1" },
    { value: "recent-term-2", label: "Recent term 2" },
    { value: "recent-term-3", label: "Recent term 3" },
  ];

  const suggestedItems = [
    {
      value: "suggested-term-1",
      label: "Suggested term 1",
    },
    {
      value: "suggested-term-2",
      label: "Suggested term 2",
    },
    {
      value: "suggested-term-3",
      label: "Suggested term 3",
    },
    {
      value: "suggested-term-4",
      label: "Suggested term 4",
    },
    {
      value: "suggested-term-5",
      label: "Suggested term 5",
    },
  ];

  const [valueS, setValueS] = useState("");
  const [valueM, setValueM] = useState("");
  const [valueL, setValueL] = useState("");
  const [dismissedS, setDismissedS] = useState(false);
  const [dismissedM, setDismissedM] = useState(false);
  const [dismissedL, setDismissedL] = useState(false);

  const getListData = (val: string) => {
    const filteredRecent = recentItems.filter((item) =>
      item.label.toLowerCase().includes(val.toLowerCase()),
    );
    const filteredSuggested = suggestedItems.filter((item) =>
      item.label.toLowerCase().includes(val.toLowerCase()),
    );

    return [
      ...(filteredRecent.length > 0
        ? [
            {
              heading: "Recent searches",
              icon: <Icon type="refresh_clock" />,
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
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setValueS("");
            setDismissedS(true);
          }
        }}
        onFocus={() => setDismissedS(false)}
        open={
          valueS.length >= minQueryLength &&
          getListData(valueS).length > 0 &&
          !dismissedS
        }
        minQueryLength={minQueryLength}
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
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setValueM("");
            setDismissedM(true);
          }
        }}
        onFocus={() => setDismissedM(false)}
        open={
          valueM.length >= minQueryLength &&
          getListData(valueM).length > 0 &&
          !dismissedM
        }
        minQueryLength={minQueryLength}
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
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setValueL("");
            setDismissedL(true);
          }
        }}
        onFocus={() => setDismissedL(false)}
        open={
          valueL.length >= minQueryLength &&
          getListData(valueL).length > 0 &&
          !dismissedL
        }
        minQueryLength={minQueryLength}
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
