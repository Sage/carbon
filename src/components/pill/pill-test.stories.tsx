import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import Pill, { PillProps } from "./pill.component";
import Box from "../box";
import { MultiSelect, Option } from "../select";

export default {
  title: "Pill/Test",
  component: Pill,
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    onDelete: {
      control: {
        type: "boolean",
      },
    },
  },
};

type PillStoryArgs = {
  children: string;
  onDelete: boolean;
};

export const Default = ({ children, onDelete, ...args }: PillStoryArgs) => {
  return (
    <Pill onDelete={onDelete ? action("delete") : undefined} {...args}>
      {children}
    </Pill>
  );
};
Default.story = {
  name: "default",
  args: {
    children: "Pill",
    borderColor: undefined,
    fill: false,
    onDelete: false,
    size: "M",
    pillRole: "tag",
    colorVariant: "neutral",
  },
};

export const StatusDarkBackground = ({
  children,
  onDelete,
  ...args
}: PillStoryArgs) => {
  return (
    <Box backgroundColor="#262626" p={2} width="100px">
      <Pill
        isDarkBackground
        onDelete={onDelete ? action("delete") : undefined}
        {...args}
      >
        {children}
      </Pill>
    </Box>
  );
};

StatusDarkBackground.story = {
  argTypes: {
    colorVariant: {
      options: [
        "neutral",
        "negative",
        "positive",
        "warning",
        "information",
        "neutralWhite",
      ],
      control: {
        type: "select",
      },
    },
  },
  args: {
    children: "Pill",
    fill: true,
    onDelete: true,
    size: "M",
    pillRole: "status",
    colorVariant: "neutral",
  },
};

export const WithCustomAriaLabels = ({ ...args }: PillProps) => {
  const noop = () => action("delete");

  const [selectedPills, setSelectedPills] = useState(["1", "4"]);
  const handleActivityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPills(event.target.value as unknown as string[]);
  };

  return (
    <>
      <Pill onDelete={noop} {...args}>
        Localised
      </Pill>
      <Pill
        ariaLabelOfRemoveButton="Remove the pill with a custom ARIA label value"
        onDelete={noop}
        {...args}
      >
        This should not be read out
      </Pill>

      <Pill ariaLabelOfRemoveButton="remove pill" onDelete={noop} {...args}>
        Prop passed but with default value
      </Pill>
      <br />
      <br />
      <MultiSelect
        name="multi-select-with-pills"
        value={selectedPills}
        onChange={handleActivityChange}
        onOpen={action("onOpen")}
        onClick={action("onClick")}
        onFilterChange={action("onFilterChange")}
        onFocus={action("onFocus")}
        onBlur={action("onBlur")}
        onKeyDown={action("onKeyDown")}
        openOnFocus
        label="Multi-Select with Pills"
        placeholder=" "
      >
        <Option value="1" text="One" />
        <Option value="2" text="Two" />
        <Option value="3" text="Three" />
        <Option value="4" text="Four" />
        <Option value="5" text="Five" />
        <Option value="6" text="Six" />
        <Option value="7" text="Seven" />
        <Option value="8" text="Eight" />
        <Option value="9" text="Nine" />
        <Option value="10" text="Ten" />
      </MultiSelect>
    </>
  );
};

export const LongWordThatWraps = {
  render: ({ children, ...args }: PillProps) => (
    <Pill {...args}>{children}</Pill>
  ),
  args: {
    children: "ThisIsAVeryLongWordThatShouldWrap",
    onDelete: false,
    wrapText: true,
    maxWidth: "100px",
  },
};
