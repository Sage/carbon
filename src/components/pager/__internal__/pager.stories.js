import React from "react";
import { text, boolean, select, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Pager from "..";

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

export const Basic = () => {
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
  const showPageSizeSelection = boolean(
    "showPageSizeSelection",
    Pager.defaultProps.showPageSizeSelection
  );
  const pageSize = select(
    "pageSize",
    {
      one: 1,
      10: 10,
      25: 25,
      50: 50,
      100: 100,
    },
    Pager.defaultProps.pageSize
  );
  const currentPage = text("currentPage", "1");

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
    />
  );
};

Basic.story = {
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};
