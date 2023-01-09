import React from "react";
import { action } from "@storybook/addon-actions";

import specialCharacters from "../../__internal__/utils/argTypes/specialCharacters";
import Pager, { PagerProps } from ".";

export default {
  title: "Pager/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
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
    totalRecordsSpecialCharacters: specialCharacters,
  },
};

export const Default = ({
  totalRecords,
  totalRecordsSpecialCharacters,
  ...args
}: Partial<PagerProps> & {
  totalRecordsSpecialCharacters: string;
}) => {
  const handlePagination = (
    pageSize: number,
    currentPage: number,
    origin: string
  ) => {
    action("onPagination")(pageSize, currentPage, origin);
  };
  const handleOnNext = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    action("onNext")(e);
  };
  const handleOnPrevious = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    action("onPrevious")(e);
  };
  const handleOnFirst = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    action("onFirst")(e);
  };
  const handleOnLast = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
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
      totalRecords={totalRecords || totalRecordsSpecialCharacters}
      {...args}
    />
  );
};

Default.storyName = "default";
Default.args = {
  totalRecords: "100",
  totalRecordsSpecialCharacters: undefined,
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
};
