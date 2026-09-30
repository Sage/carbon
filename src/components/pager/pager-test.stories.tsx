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
        totalRecords={100}
        currentPage={2}
        showPageSizeSelection
        {...args}
      />
      <ControlledPager
        totalRecords={100}
        currentPage={2}
        showTotalRecords
        {...args}
      />
      <ControlledPager
        totalRecords={10}
        currentPage={1}
        showPageSizeSelection
        showTotalRecords
        {...args}
      />
      <ControlledPager
        totalRecords={100}
        currentPage={1}
        showPageSizeSelection
        showTotalRecords
        {...args}
      />
      <ControlledPager
        totalRecords={100}
        currentPage={2}
        showPageSizeSelection
        showTotalRecords
        {...args}
      />
      <ControlledPager
        totalRecords={1000}
        currentPage={10}
        showPageSizeSelection
        showTotalRecords
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
        showTotalRecords
        {...args}
      />
      <ControlledPager
        totalRecords={100}
        currentPage={2}
        showFirstAndLastButtons={false}
        showPageSizeSelection
        showTotalRecords
        {...args}
      />
      <ControlledPager
        totalRecords={1000}
        currentPage={10}
        showFirstAndLastButtons={false}
        showPageSizeSelection
        showTotalRecords
        pageSize={100}
        {...args}
      />

      <ControlledPager
        totalRecords={100}
        currentPage={2}
        showPageSizeSelection
        showTotalRecords
        variant="alternate"
        {...args}
      />

      <ControlledPager
        totalRecords={100}
        currentPage={2}
        showPageSizeSelection
        showTotalRecords
        layout="two-row"
        {...args}
      />
      <ControlledPager
        totalRecords={100}
        currentPage={2}
        showTotalRecords
        layout="two-row"
        {...args}
      />
      <ControlledPager
        totalRecords={100}
        currentPage={2}
        showPageSizeSelection
        layout="two-row"
        {...args}
      />
      <ControlledPager
        totalRecords={100}
        currentPage={2}
        showPageSizeSelection
        showTotalRecords
        layout="three-row"
        {...args}
      />
      <ControlledPager
        totalRecords={100}
        currentPage={2}
        showPageSizeSelection
        showTotalRecords
        alignment="centred"
        {...args}
      />
    </Box>
  ),
};

export const AllVariantsSmall: Story = {
  ...AllVariants,
  args: {
    size: "small",
  },
};

export const SmallViewport: Story = {
  render: (args) => (
    <Box display="flex" gap={2} flexDirection="column">
      <ControlledPager
        showTotalRecords
        interactivePageNumber={false}
        layout="two-row"
        {...args}
      />
      <ControlledPager
        showPageSizeSelection
        interactivePageNumber={false}
        layout="two-row"
        {...args}
      />
      <ControlledPager
        showPageSizeSelection
        showTotalRecords
        layout="three-row"
        {...args}
      />
      <ControlledPager
        showFirstAndLastButtons={false}
        showTotalRecords
        interactivePageNumber={false}
        layout="two-row"
        {...args}
      />
      <ControlledPager
        showFirstAndLastButtons={false}
        showPageSizeSelection
        interactivePageNumber={false}
        layout="two-row"
        {...args}
      />
      <ControlledPager
        showFirstAndLastButtons={false}
        showPageSizeSelection
        showTotalRecords
        layout="three-row"
        {...args}
      />
    </Box>
  ),
  args: {
    totalRecords: 1000,
    currentPage: 2,
    size: "small",
  },
  parameters: {
    chromatic: { viewports: [320] },
  },
  globals: {
    viewport: {
      value: "mobile",
    },
  },
};
