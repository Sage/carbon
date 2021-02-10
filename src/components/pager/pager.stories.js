import React from "react";
import { text, boolean, select, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Pager from ".";

export default {
  title: "Design System/Pager/Test",
  component: Pager,
  decorators: [withKnobs],
  parameters: {
    info: {
      disable: true,
    },
    knobs: { escapeHTML: false },
    chromatic: {
      disable: true,
    },
  },
};

export const Default = () => {
  const handlePagination = (e) => {
    action("onPagination")(e);
  };

  const handleOnNext = (e) => {
    action("onNext")(e);
  };

  const handleOnPrevious = (e) => {
    action("onPrevious")(e);
  };

  const handleOnFirst = (e) => {
    action("onFirst")(e);
  };

  const handleOnLast = (e) => {
    action("onLast")(e);
  };

  const totalRecords = text("totalRecords", "100");
  const showPageSizeSelection = boolean("showPageSizeSelection", false);
  const pageSize = select(
    "pageSize",
    {
      1: 1,
      10: 10,
      25: 25,
      50: 50,
      100: 100,
    },
    10
  );
  const currentPage = text("currentPage", "1");
  const variant = select(
    "variant",
    {
      default: "default",
      alternate: "alternate",
    },
    "default"
  );
  const showPageSizeLabelBefore = boolean("showPageSizeLabelBefore", true);
  const showPageSizeLabelAfter = boolean("showPageSizeLabelAfter", true);
  const showTotalRecords = boolean("showTotalRecords", true);
  const showFirstAndLastButtons = boolean("showFirstAndLastButtons", true);
  const showPreviousAndNextButtons = boolean(
    "showPreviousAndNextButtons",
    true
  );
  const showPageCount = boolean("showPageCount", true);

  return (
    <Pager
      showPageSizeSelection={showPageSizeSelection}
      pageSize={pageSize}
      totalRecords={totalRecords}
      onPagination={handlePagination}
      onNext={handleOnNext}
      onPrevious={handleOnPrevious}
      onFirst={handleOnFirst}
      onLast={handleOnLast}
      currentPage={currentPage}
      pageSizeSelectionOptions={[
        { id: "1", name: 1 },
        { id: "10", name: 10 },
        { id: "25", name: 25 },
        { id: "50", name: 50 },
        { id: "100", name: 100 },
      ]}
      variant={variant}
      showPageSizeLabelBefore={showPageSizeLabelBefore}
      showPageSizeLabelAfter={showPageSizeLabelAfter}
      showTotalRecords={showTotalRecords}
      showFirstAndLastButtons={showFirstAndLastButtons}
      showPreviousAndNextButtons={showPreviousAndNextButtons}
      showPageCount={showPageCount}
    />
  );
};

Default.story = {
  name: "default",
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};
