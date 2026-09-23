import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import Pager, { PagerProps } from ".";
import Box from "../box";

const meta: Meta<typeof Pager> = {
  title: "Pager/Test",
  component: Pager,
  argTypes: {
    totalRecords: { control: "text" },
    currentPage: { control: "text" },
    pageSize: {
      options: [1, 10, 25, 50, 100],
      control: { type: "select" },
    },
    size: {
      options: ["small", "medium"],
      control: { type: "select" },
    },
  },
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
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
        "showTotalRecords",
        "showPreviousAndNextButtons",
        "showPageCount",
        "smallScreenBreakpoint",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pager>;

const ControlledPager = ({ ...args }: PagerProps) => {
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
      {...args}
      onPagination={handlePagination}
      currentPage={currentPage}
    />
  );
};

export const AllVariants: Story = {
  render: (args) => (
    <Box display="flex" gap={2} flexDirection="column">
      <ControlledPager totalRecords={0} currentPage={1} {...args} />
      <ControlledPager totalRecords={10} currentPage={1} {...args} />
      <ControlledPager totalRecords={100} currentPage={1} {...args} />
      <ControlledPager totalRecords={100} currentPage={2} {...args} />
      <ControlledPager totalRecords={100} currentPage={10} {...args} />

      <ControlledPager
        totalRecords={10}
        currentPage={1}
        showPageSizeSelection
        showNumberOfItems
        {...args}
      />
      <ControlledPager
        totalRecords={100}
        currentPage={1}
        showPageSizeSelection
        showNumberOfItems
        {...args}
      />
      <ControlledPager
        totalRecords={100}
        currentPage={2}
        showPageSizeSelection
        showNumberOfItems
        {...args}
      />
      <ControlledPager
        totalRecords={1000}
        currentPage={10}
        showPageSizeSelection
        showNumberOfItems
        pageSize={100}
        {...args}
      />

      <ControlledPager
        totalRecords={100}
        currentPage={1}
        showFirstAndLastButtons={false}
        {...args}
      />
      <ControlledPager
        totalRecords={100}
        currentPage={2}
        showFirstAndLastButtons={false}
        {...args}
      />
      <ControlledPager
        totalRecords={100}
        currentPage={10}
        showFirstAndLastButtons={false}
        {...args}
      />

      <ControlledPager
        totalRecords={100}
        currentPage={1}
        showFirstAndLastButtons={false}
        showPageSizeSelection
        showNumberOfItems
        {...args}
      />
      <ControlledPager
        totalRecords={100}
        currentPage={2}
        showFirstAndLastButtons={false}
        showPageSizeSelection
        showNumberOfItems
        {...args}
      />
      <ControlledPager
        totalRecords={1000}
        currentPage={10}
        showFirstAndLastButtons={false}
        showPageSizeSelection
        showNumberOfItems
        pageSize={100}
        {...args}
      />

      <ControlledPager
        totalRecords={100}
        currentPage={2}
        showPageSizeSelection
        showNumberOfItems
        variant="alternate"
        {...args}
      />

      <ControlledPager
        totalRecords={100}
        currentPage={2}
        showPageSizeSelection
        showNumberOfItems
        layout="two-row"
        {...args}
      />
      <ControlledPager
        totalRecords={100}
        currentPage={2}
        showPageSizeSelection
        showNumberOfItems
        layout="three-row"
        {...args}
      />
      <ControlledPager
        totalRecords={100}
        currentPage={2}
        showNumberOfItems
        alignment="centred"
        {...args}
      />
    </Box>
  ),
  parameters: {
    chromatic: { viewports: [1200, 320] },
  },
};

export const AllVariantsSmall: Story = {
  ...AllVariants,
  args: {
    size: "small",
  },
  parameters: {
    chromatic: { viewports: [1200, 320] },
  },
};

export const LayoutExamples: Story = {
  render: (args) => (
    <Box display="flex" gap={2} flexDirection="column">
      <ControlledPager
        totalRecords={100}
        currentPage={2}
        showPageSizeSelection
        showNumberOfItems
        layout="single"
        {...args}
      />
      <ControlledPager
        totalRecords={100}
        currentPage={2}
        showPageSizeSelection
        showNumberOfItems
        layout="two-row"
        {...args}
      />
      <ControlledPager
        totalRecords={100}
        currentPage={2}
        showPageSizeSelection
        showNumberOfItems
        layout="three-row"
        {...args}
      />
      <ControlledPager
        totalRecords={100}
        currentPage={2}
        showNumberOfItems
        alignment="centred"
        {...args}
      />
    </Box>
  ),
  parameters: {
    chromatic: { viewports: [1200, 320] },
  },
};
