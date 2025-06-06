import React from "react";
import { action } from "storybook/actions";
import Pager, { PagerProps } from ".";

export default {
  title: "Pager/Test",
  includeStories: ["Default"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    pageSize: {
      options: [1, 10, 25, 50, 100],
      control: {
        type: "select",
      },
    },
    variant: {
      options: ["default", "alternate"],
      control: {
        type: "select",
      },
    },
  },
};

export const Default = ({ totalRecords, ...args }: Partial<PagerProps>) => {
  const handlePagination = (
    pageSize: number,
    currentPage: number,
    origin: string,
  ) => {
    action("onPagination")(pageSize, currentPage, origin);
  };
  const handleOnNext = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    action("onNext")(e);
  };
  const handleOnPrevious = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    action("onPrevious")(e);
  };
  const handleOnFirst = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    action("onFirst")(e);
  };
  const handleOnLast = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    action("onLast")(e);
  };
  return (
    <Pager
      pageSizeSelectionOptions={[
        { id: "1", name: 1 },
        { id: "10", name: 10 },
        { id: "25", name: 25 },
        { id: "50", name: 50 },
        { id: "100", name: 100 },
      ]}
      onPagination={handlePagination}
      onNext={handleOnNext}
      onPrevious={handleOnPrevious}
      onFirst={handleOnFirst}
      onLast={handleOnLast}
      totalRecords={totalRecords}
      {...args}
    />
  );
};

Default.storyName = "default";
Default.args = {
  totalRecords: "100",
  showPageSizeSelection: false,
  pageSize: 10,
  currentPage: "1",
  variant: "default",
  showPageSizeLabelBefore: true,
  showPageSizeLabelAfter: true,
  showTotalRecords: true,
  showFirstAndLastButtons: true,
  showPreviousAndNextButtons: true,
  showPageCount: true,
  smallScreenBreakpoint: "500px",
};
