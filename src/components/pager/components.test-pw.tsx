import React from "react";
import Form from "../form";
import Pager, { PagerProps } from ".";
import useMediaQuery from "../../hooks/useMediaQuery";

export const records = [
  {
    id: "1",
    name: 1,
  },
  {
    id: "10",
    name: 10,
  },
  {
    id: "25",
    name: 25,
  },
  {
    id: "50",
    name: 50,
  },
  {
    id: "100",
    name: 100,
  },
];

export const PagerComponent = (props: Partial<PagerProps>) => {
  return (
    <Pager
      currentPage="1"
      onPagination={() => {}}
      pageSizeSelectionOptions={records}
      totalRecords="100"
      {...props}
    />
  );
};

export const PagerComponentResponsive = () => {
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
      pageSizeSelectionOptions={records}
    />
  );
};

export const PagerInForm = () => {
  return (
    <Form>
      <PagerComponent />
    </Form>
  );
};

export const PagerComponentRecords = (props: Partial<PagerProps>) => {
  return (
    <Pager
      currentPage="1"
      onPagination={() => {}}
      pageSizeSelectionOptions={records}
      totalRecords="100"
      showPageSizeSelection
      {...props}
    />
  );
};
