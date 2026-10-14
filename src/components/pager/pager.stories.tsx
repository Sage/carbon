import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import Pager from ".";
import Box from "../box";

const meta: Meta<typeof Pager> = {
  title: "Pager",
  component: Pager,
  argTypes: {
    totalRecords: { control: "text" },
    currentPage: { control: "text" },
    pageSize: {
      options: [1, 10, 25, 50, 100],
      control: { type: "select" },
    },
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    controls: {
      exclude: [
        "onPagination",
        "onFirst",
        "onPrevious",
        "onNext",
        "onLast",
        "hideDisabledElements",
        "showPageSizeLabelBefore",
        "showPageSizeLabelAfter",
        "showPreviousAndNextButtons",
        "showPageCount",
        "smallScreenBreakpoint",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pager>;

export const Default: Story = ({ ...args }) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage);
  const handlePagination = (
    currentPage: number,
    pageSize: number,
    origin: string,
  ) => {
    setCurrentPage(currentPage);
    action("onPagination")({
      currentPage: currentPage,
      pageSize: pageSize,
      origin: origin,
    });
  };

  return (
    <Pager
      onPagination={handlePagination}
      {...args}
      currentPage={currentPage}
    />
  );
};
Default.storyName = "Default";
Default.args = {
  totalRecords: "1000",
  currentPage: "2",
};

export const WithPageSizeSelection: Story = {
  ...Default,
  args: {
    ...Default.args,
    pageSize: 10,
    showPageSizeSelection: true,
  },
  decorators: [
    (Story) => (
      <Box mb="150px">
        <Story />
      </Box>
    ),
  ],
};

export const WithTotalRecords: Story = {
  ...Default,
  args: {
    ...Default.args,
    pageSize: 10,
    showPageSizeSelection: true,
    showTotalRecords: true,
  },
  decorators: [
    (Story) => (
      <Box mb="150px">
        <Story />
      </Box>
    ),
  ],
};

export const NonInteractivePage: Story = {
  ...Default,
  args: {
    ...Default.args,
    interactivePageNumber: false,
  },
};

export const HideFirstAndLastButtons: Story = {
  ...Default,
  args: {
    ...Default.args,
    showFirstAndLastButtons: false,
  },
};

export const AlternateVariant: Story = {
  ...WithTotalRecords,
  args: {
    ...WithTotalRecords.args,
    variant: "alternate",
  },
};

export const SmallSize: Story = {
  ...WithTotalRecords,
  args: {
    ...WithTotalRecords.args,
    size: "small",
  },
  decorators: [
    (Story) => (
      <Box mb="125px">
        <Story />
      </Box>
    ),
  ],
};

export const MediumSize: Story = {
  ...WithTotalRecords,
  args: {
    ...WithTotalRecords.args,
    size: "medium",
  },
  decorators: [
    (Story) => (
      <Box mb="150px">
        <Story />
      </Box>
    ),
  ],
};

export const RowLayouts: Story = {
  render: (args) => (
    <Box display="flex" gap={3} flexDirection="column">
      <Pager {...args} showPageSizeSelection showTotalRecords layout="single" />
      <Pager
        {...args}
        showPageSizeSelection
        showTotalRecords
        layout="two-row"
      />
      <Pager
        {...args}
        showPageSizeSelection
        showTotalRecords
        layout="three-row"
      />
    </Box>
  ),
  args: {
    totalRecords: 1000,
    currentPage: 2,
  },
  decorators: [
    (Story) => (
      <Box mb="100px" display="flex" gap={3} flexDirection="column">
        <Story />
      </Box>
    ),
  ],
};

export const Alignment: Story = {
  ...WithTotalRecords,
  args: {
    ...WithTotalRecords.args,
    alignment: "centred",
  },
  decorators: [
    (Story) => (
      <Box mb="150px">
        <Story />
      </Box>
    ),
  ],
};
