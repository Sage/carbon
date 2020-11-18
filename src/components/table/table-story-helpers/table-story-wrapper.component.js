/* eslint react/prop-types: 0 */
import React, { useState, useEffect } from "react";
import { action } from "@storybook/addon-actions";

import countriesList from "../../../../.storybook/utils/xhr/data/countries";
import Button from "../../button";
import MultiActionButton from "../../multi-action-button";
import { Table, TableCell, TableHeader, TableRow } from "..";
import TextArea from "../../../__experimental__/components/textarea";
import TextBox from "../../../__experimental__/components/textbox";
import DateInput from "../../../__experimental__/components/date";
import { getCommonTextboxProps } from "../../../__experimental__/components/textbox/textbox.stories";
import OptionsHelper from "../../../utils/helpers/options-helper/options-helper";

const pickInput = (name) => {
  const { inputTypes } = OptionsHelper;
  switch (name) {
    case inputTypes[1]:
      return <TextArea {...getCommonTextboxProps} />;
    case inputTypes[2]:
      return <DateInput {...getCommonTextboxProps} />;
    default:
      return <TextBox {...getCommonTextboxProps} />;
  }
};

const Wrapper = ({
  sortOrder,
  sortedColumn,
  pageSize = 10,
  totalRecords,
  ...props
}) => {
  const data = countriesList.toJS();
  const [state, setState] = useState({
    sortOrder,
    sortedColumn,
    currentPage: 1,
    pageSize,
  });

  useEffect(() => {
    setState((prevState) => ({ ...prevState, sortOrder }));
  }, [sortOrder]);

  useEffect(() => {
    setState((prevState) => ({ ...prevState, sortedColumn }));
  }, [sortedColumn]);

  useEffect(() => {
    setState((prevState) => ({ ...prevState, pageSize }));
  }, [pageSize]);

  const getDataToDisplay = () => {
    let records = data.slice(0, totalRecords);
    if (state.sortOrder === "desc" && state.sortedColumn.length) {
      records = records.reverse();
    }
    const start = (state.currentPage - 1) * state.pageSize;
    let end = start + state.pageSize;
    end = end > data.length ? data.length : end;
    return records.slice(start, end);
  };

  const buildRows = ({ inputType, size }) => {
    const rowsCountries = getDataToDisplay();
    return (
      <>
        <TableRow key="header" as="header" uniqueID="header">
          <TableHeader sortable name="name" scope="col">
            Country
          </TableHeader>
          <TableHeader sortable scope="col" name="code" width="200">
            Code
          </TableHeader>
        </TableRow>
        {rowsCountries.map((row) => {
          let cellContent = <TableCell>{row.name}</TableCell>;
          if (inputType) {
            cellContent = (
              <TableCell size={size}>{pickInput(inputType)}</TableCell>
            );
          }
          return (
            <TableRow key={row.id} uniqueID={row.id}>
              {cellContent}
              <TableCell>{row.value}</TableCell>
            </TableRow>
          );
        })}
      </>
    );
  };

  const handleChange = (e, tableOptions) => {
    setState((prevState) => ({
      ...prevState,
      sortOrder: tableOptions.sortOrder,
      sortedColumn: tableOptions.sortedColumn,
      currentPage: tableOptions.currentPage,
      pageSize: tableOptions.pageSize,
    }));
    action("change")(e, tableOptions);
  };

  const handleToolbarAction = () => {
    action("toolbar action")();
  };

  return (
    <Table
      {...props}
      actionToolbarChildren={(context) => {
        return [
          <Button
            disabled={context.disabled}
            key="single-action"
            onClick={handleToolbarAction}
          >
            Test Action
          </Button>,
          <MultiActionButton
            text="Actions"
            disabled={context.disabled}
            key="multi-actions"
          >
            <Button onClick={handleToolbarAction}>foo</Button>
            <Button onClick={handleToolbarAction}>bar</Button>
            <Button onClick={handleToolbarAction}>qux</Button>
          </MultiActionButton>,
        ];
      }}
      path="/countries"
      actions={{
        delete: {
          icon: "bin",
          onClick: handleToolbarAction,
        },
        settings: {
          icon: "settings",
          onClick: handleToolbarAction,
        },
      }}
      totalRecords={totalRecords}
      onChange={handleChange}
      pageSize={state.pageSize}
      sortOrder={state.sortOrder}
      sortedColumn={state.sortedColumn}
      currentPage={state.currentPage}
      onPageSizeChange={(size) =>
        setState((prevState) => ({ ...prevState, pageSize: size }))
      }
    >
      {buildRows({
        pageSize: state.pageSize,
        totalRecords: props.totalRecords,
        inputType: props.inputType,
        size: props.size,
      })}
    </Table>
  );
};

export default Wrapper;
