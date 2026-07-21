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
        {...args}
      />
      <ControlledPager
        totalRecords={100}
        currentPage={1}
        showPageSizeSelection
        {...args}
      />
      <ControlledPager
        totalRecords={100}
        currentPage={2}
        showPageSizeSelection
        {...args}
      />
      <ControlledPager
        totalRecords={1000}
        currentPage={10}
        showPageSizeSelection
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
        {...args}
      />
      <ControlledPager
        totalRecords={100}
        currentPage={2}
        showFirstAndLastButtons={false}
        showPageSizeSelection
        {...args}
      />
      <ControlledPager
        totalRecords={1000}
        currentPage={10}
        showFirstAndLastButtons={false}
        showPageSizeSelection
        pageSize={100}
        {...args}
      />

      <ControlledPager
        totalRecords={100}
        currentPage={2}
        showPageSizeSelection
        variant="alternate"
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

export const AllVariantsLarge: Story = {
  ...AllVariants,
  args: {
    size: "large",
  },
  parameters: {
    chromatic: { viewports: [1200, 320] },
  },
};
