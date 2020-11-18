import React, { useState } from "react";
import { text, boolean, object } from "@storybook/addon-knobs";
import { enableMock } from "../../../.storybook/utils/xhr/xhr-mock";
import { TableAjax, TableRow, TableCell, TableHeader } from ".";

export default {
  title: "Table Ajax/Test",
  component: TableAjax,
  parameters: {
    info: {
      disable: true,
    },
    chromatic: {
      delay: 500,
    },
    knobs: { escapeHTML: false },
  },
};

export const Default = () => {
  enableMock();

  const pageSize = text("pageSize", "5");
  const paginate = boolean("paginate", TableAjax.defaultProps.paginate);
  const customHeaders = object("customHeaders", {
    Accept: "application/json",
  });

  const [state, setState] = useState({
    sortOrder: "asc",
    sortedColumn: "",
    currentPage: "1",
    countryList: [],
  });

  const buildRows = () => (
    <>
      <TableRow key="header" as="header">
        <TableHeader sortable name="name" scope="col">
          Country
        </TableHeader>
        <TableHeader scope="col">Code</TableHeader>
      </TableRow>
      {state.countryList.map((row) => (
        <TableRow key={row.id} uniqueID={row.id}>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.value}</TableCell>
        </TableRow>
      ))}
    </>
  );

  const handleChange = (data) => {
    setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        countryList: data.data[0].items,
      }));
    }, 500);
  };

  return (
    <TableAjax
      path="/countries"
      pageSize={pageSize}
      paginate={paginate}
      getCustomHeaders={() => customHeaders}
      onChange={handleChange}
    >
      {state.countryList.length ? buildRows() : null}
    </TableAjax>
  );
};
