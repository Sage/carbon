import React from "react";
import { ComponentStory } from "@storybook/react";

import Pager, { PagerProps } from ".";
import useMediaQuery from "../../hooks/useMediaQuery";

export const Default: ComponentStory<typeof Pager> = (args: PagerProps) => (
  <Pager {...args} />
);

Default.args = {
  totalRecords: "100",
  showPageSizeSelection: false,
  currentPage: "1",
  pageSizeSelectionOptions: [
    { id: "1", name: 1 },
    { id: "10", name: 10 },
    { id: "25", name: 25 },
    { id: "50", name: 50 },
    { id: "100", name: 100 },
  ],
};
Default.argTypes = {
  pageSize: {
    options: [1, 10, 25, 50, 100],
    control: {
      type: "select",
    },
  },
};

export const InteractivePageNumber: ComponentStory<typeof Pager> = (
  args: PagerProps
) => <Pager {...args} />;

InteractivePageNumber.args = {
  totalRecords: "100",
  interactivePageNumber: false,
  showPageSizeSelection: false,
  currentPage: "1",
  pageSizeSelectionOptions: [
    { id: "1", name: 1 },
    { id: "10", name: 10 },
    { id: "25", name: 25 },
    { id: "50", name: 50 },
    { id: "100", name: 100 },
  ],
};

InteractivePageNumber.argTypes = {
  pageSize: {
    options: [1, 10, 25, 50, 100],
    control: {
      type: "select",
    },
  },
};

export const HideDisabledElements: ComponentStory<typeof Pager> = (
  args: PagerProps
) => <Pager {...args} />;

HideDisabledElements.args = {
  totalRecords: "100",
  hideDisabledElements: true,
  showPageSizeSelection: false,
  currentPage: "1",
  pageSizeSelectionOptions: [
    { id: "1", name: 1 },
    { id: "10", name: 10 },
    { id: "25", name: 25 },
    { id: "50", name: 50 },
    { id: "100", name: 100 },
  ],
};

HideDisabledElements.argTypes = {
  pageSize: {
    options: [1, 10, 25, 50, 100],
    control: {
      type: "select",
    },
  },
};

export const DisabledPageSize = Default.bind({});
DisabledPageSize.parameters = { chromatic: { disableSnapshot: true } };
DisabledPageSize.args = {
  totalRecords: "100",
  onPagination: () => {},
};

export const HidingPagerElements = Default.bind({});
HidingPagerElements.args = {
  totalRecords: "100",
  onPagination: () => {},
  showFirstAndLastButtons: false,
  showTotalRecords: false,
  showPageSizeSelection: true,
};

export const SmartFunctionality = () => {
  return (
    <>
      <Pager totalRecords={10} onPagination={() => {}} />
      <br />
      <Pager totalRecords={20} onPagination={() => {}} />
    </>
  );
};

export const LoadingState = Default.bind({});
LoadingState.args = {
  onPagination: () => {},
};

export const PageSizeSelectionOptions = Default.bind({});
PageSizeSelectionOptions.parameters = { chromatic: { disableSnapshot: true } };
PageSizeSelectionOptions.args = {
  onPagination: () => {},
  totalRecords: 100,
  showPageSizeSelection: true,
  pageSizeSelectionOptions: [
    { id: "15", name: 15 },
    { id: "30", name: 30 },
    { id: "60", name: 60 },
  ],
  pageSize: 15,
};

export const CurrentPageLastPage = Default.bind({});
CurrentPageLastPage.parameters = { chromatic: { disableSnapshot: true } };
CurrentPageLastPage.args = {
  onPagination: () => {},
  totalRecords: 100,
  showPageSizeSelection: true,
  currentPage: 10,
};

export const CurrentPage = Default.bind({});
CurrentPage.parameters = { chromatic: { disableSnapshot: true } };
CurrentPage.args = {
  onPagination: () => {},
  totalRecords: 100,
  showPageSizeSelection: true,
  currentPage: 5,
};

export const UsingCustomResponsiveSettings = () => {
  const query1 = useMediaQuery("(max-width: 1000px)");
  const query2 = useMediaQuery("(max-width: 900px)");
  const query3 = useMediaQuery("(max-width: 800px)");
  const query4 = useMediaQuery("(max-width: 700px)");
  const query5 = useMediaQuery("(max-width: 600px)");
  const responsiveProps = () => {
    if (query5) {
      return {
        showPageSizeSelection: false,
        showTotalRecords: false,
        showFirstAndLastButtons: false,
      };
    }
    if (query4) {
      return {
        showFirstAndLastButtons: false,
        showTotalRecords: false,
        showPageSizeLabelBefore: false,
        showPageSizeLabelAfter: false,
      };
    }
    if (query3) {
      return {
        showFirstAndLastButtons: false,
        showTotalRecords: false,
        showPageSizeLabelBefore: false,
        showPageSizeLabelAfter: false,
      };
    }
    if (query2) {
      return {
        showFirstAndLastButtons: false,
        showTotalRecords: false,
      };
    }
    if (query1) {
      return {
        showPageSizeSelection: true,
        showFirstAndLastButtons: false,
      };
    }
    return {
      showPageSizeSelection: true,
    };
  };
  return (
    <Pager
      totalRecords={1000}
      pageSize={10}
      currentPage={1}
      onPagination={() => {}}
      {...responsiveProps()}
      pageSizeSelectionOptions={[
        { id: "10", name: 10 },
        { id: "25", name: 25 },
        { id: "50", name: 50 },
        { id: "100", name: 100 },
      ]}
    />
  );
};
UsingCustomResponsiveSettings.parameters = {
  chromatic: { disableSnapshot: true },
};
