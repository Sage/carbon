import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
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
  const [currentPage, setCurrentPage] = useState<number | string>(
    args.currentPage ?? 1,
  );
  const handlePagination = (currentPage: number) => {
    setCurrentPage(currentPage);
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

export const WithPageSizeSelection: Story = ({ ...args }) => {
  const [currentPage, setCurrentPage] = useState<number | string>(
    args.currentPage ?? 1,
  );

  return (
    <Pager
      {...args}
      onPagination={(page) => setCurrentPage(page)}
      currentPage={currentPage}
    />
  );
};
WithPageSizeSelection.args = {
  totalRecords: "1000",
  currentPage: "2",
  pageSize: 10,
  showPageSizeSelection: true,
};
WithPageSizeSelection.decorators = [
  (Story) => (
    <Box mb="150px">
      <Story />
    </Box>
  ),
];

export const WithTotalRecords: Story = ({ ...args }) => {
  const [currentPage, setCurrentPage] = useState<number | string>(
    args.currentPage ?? 1,
  );

  return (
    <Pager {...args} onPagination={setCurrentPage} currentPage={currentPage} />
  );
};
WithTotalRecords.args = {
  totalRecords: "1000",
  currentPage: "2",
  pageSize: 10,
  showPageSizeSelection: true,
  showTotalRecords: true,
};
WithTotalRecords.decorators = [
  (Story) => (
    <Box mb="150px">
      <Story />
    </Box>
  ),
];

export const NonInteractivePage: Story = ({ ...args }) => {
  const [currentPage, setCurrentPage] = useState<number | string>(
    args.currentPage ?? 1,
  );

  return (
    <Pager {...args} onPagination={setCurrentPage} currentPage={currentPage} />
  );
};
NonInteractivePage.args = {
  totalRecords: "1000",
  currentPage: "2",
  interactivePageNumber: false,
};

export const HideFirstAndLastButtons: Story = ({ ...args }) => {
  const [currentPage, setCurrentPage] = useState<number | string>(
    args.currentPage ?? 1,
  );

  return (
    <Pager {...args} onPagination={setCurrentPage} currentPage={currentPage} />
  );
};
HideFirstAndLastButtons.args = {
  totalRecords: "1000",
  currentPage: "2",
  showFirstAndLastButtons: false,
};

export const AlternateVariant: Story = ({ ...args }) => {
  const [currentPage, setCurrentPage] = useState<number | string>(
    args.currentPage ?? 1,
  );

  return (
    <Pager {...args} onPagination={setCurrentPage} currentPage={currentPage} />
  );
};
AlternateVariant.args = {
  totalRecords: "1000",
  currentPage: "2",
  pageSize: 10,
  showPageSizeSelection: true,
  showTotalRecords: true,
  variant: "alternate",
};
AlternateVariant.decorators = [
  (Story) => (
    <Box mb="150px">
      <Story />
    </Box>
  ),
];

export const SmallSize: Story = ({ ...args }) => {
  const [currentPage, setCurrentPage] = useState<number | string>(
    args.currentPage ?? 1,
  );

  return (
    <Pager {...args} onPagination={setCurrentPage} currentPage={currentPage} />
  );
};
SmallSize.args = {
  totalRecords: "1000",
  currentPage: "2",
  pageSize: 10,
  showPageSizeSelection: true,
  showTotalRecords: true,
  size: "small",
};
SmallSize.decorators = [
  (Story) => (
    <Box mb="125px">
      <Story />
    </Box>
  ),
];

export const MediumSize: Story = ({ ...args }) => {
  const [currentPage, setCurrentPage] = useState<number | string>(
    args.currentPage ?? 1,
  );

  return (
    <Pager {...args} onPagination={setCurrentPage} currentPage={currentPage} />
  );
};
MediumSize.args = {
  totalRecords: "1000",
  currentPage: "2",
  pageSize: 10,
  showPageSizeSelection: true,
  showTotalRecords: true,
  size: "medium",
};
MediumSize.decorators = [
  (Story) => (
    <Box mb="150px">
      <Story />
    </Box>
  ),
];

export const RowLayouts: Story = ({ ...args }) => {
  const [singlePage, setSinglePage] = useState<number | string>(
    args.currentPage ?? 1,
  );
  const [twoRowPage, setTwoRowPage] = useState<number | string>(
    args.currentPage ?? 1,
  );
  const [threeRowPage, setThreeRowPage] = useState<number | string>(
    args.currentPage ?? 1,
  );

  return (
    <Box display="flex" gap={3} flexDirection="column">
      <Pager
        {...args}
        showPageSizeSelection
        showTotalRecords
        layout="single"
        onPagination={setSinglePage}
        currentPage={singlePage}
      />
      <Pager
        {...args}
        showPageSizeSelection
        showTotalRecords
        layout="two-row"
        onPagination={setTwoRowPage}
        currentPage={twoRowPage}
      />
      <Pager
        {...args}
        showPageSizeSelection
        showTotalRecords
        layout="three-row"
        onPagination={setThreeRowPage}
        currentPage={threeRowPage}
      />
    </Box>
  );
};
RowLayouts.args = {
  totalRecords: 1000,
  currentPage: 2,
};
RowLayouts.decorators = [
  (Story) => (
    <Box mb="100px" display="flex" gap={3} flexDirection="column">
      <Story />
    </Box>
  ),
];

export const Alignment: Story = ({ ...args }) => {
  const [currentPage, setCurrentPage] = useState<number | string>(
    args.currentPage ?? 1,
  );

  return (
    <Pager {...args} onPagination={setCurrentPage} currentPage={currentPage} />
  );
};
Alignment.args = {
  totalRecords: "1000",
  currentPage: "2",
  pageSize: 10,
  showPageSizeSelection: true,
  showTotalRecords: true,
  alignment: "centred",
};
Alignment.decorators = [
  (Story) => (
    <Box mb="150px">
      <Story />
    </Box>
  ),
];
