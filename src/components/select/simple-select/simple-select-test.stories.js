import React, { useState } from "react";
import Box from "../../box";
import Icon from "../../icon";
import Dialog from "../../dialog";

import { Select, Option } from "..";

export default {
  component: Select,
  title: "Select/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  argTypes: {
    value: { table: { disable: true }, control: false },
    disablePortal: { table: { disable: true }, control: false },
    defaultValue: { table: { disable: true }, control: false },
    children: { table: { disable: true }, control: false },
    openOnFocus: { table: { disable: true }, control: false },
    transparent: { table: { disable: true }, control: false },
    tableHeader: { table: { disable: true }, control: false },
    multiColumn: { table: { disable: true }, control: false },
    isLoading: { table: { disable: true }, control: false },
    onListScrollBottom: { table: { disable: true }, control: false },
    tooltipPosition: { table: { disable: true }, control: false },
    "data-component": { table: { disable: true }, control: false },
    "data-element": { table: { disable: true }, control: false },
    "data-role": { table: { disable: true }, control: false },
    listPlacement: {
      options: [
        "auto",
        "auto-start",
        "auto-end",
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "right",
        "right-start",
        "right-end",
        "left",
        "left-start",
        "left-end",
      ],
      control: {
        type: "select",
      },
    },
    onOpen: {
      action: "onOpen",
      table: { disable: true },
      control: false,
    },
    onChange: {
      action: "onChange",
      table: { disable: true },
      control: false,
    },
    onClick: {
      action: "onClick",
      table: { disable: true },
      control: false,
    },
    onFocus: {
      action: "onFocus",
      table: { disable: true },
      control: false,
    },
    onBlur: {
      action: "onBlur",
      table: { disable: true },
      control: false,
    },
    onKeyDown: {
      action: "onKeyDown",
      table: { disable: true },
      control: false,
    },
  },
};

export const Default = (args) => {
  return (
    <Box width={400}>
      <Select name="simple" id="simple" label="label" labelInline {...args}>
        <Option
          text="Like a lot of intelligent animals, most crows are quite social. 
          For instance, American crows spend most of the year living in pairs or small family groups.
          During the winter months, they will congregate with hundreds or even thousands of their peers to sleep together at night."
          value="1"
        />
      </Select>
    </Box>
  );
};

Default.args = {
  mt: 0,
  listPlacement: undefined,
  flipEnabled: true,
};

export const DelayedReposition = () => {
  const [displayContent, setDisplayContent] = useState(false);

  const onOpenWithTimeOut = () => {
    setTimeout(() => {
      setDisplayContent(!displayContent);
    }, 500);
  };

  const onOpen = () => {
    setDisplayContent(!displayContent);
  };
  return (
    <Dialog size="medium" open title="Title">
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="stretch"
        margin="25px"
      >
        <Box width="50%">
          <Select
            label="noTimeOut"
            name="noTimeOut"
            id="noTimeOut"
            onOpen={onOpen}
          >
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
          </Select>
        </Box>
        <Box width="50%">
          <Select
            label="timeOut"
            name="timeOut"
            id="timeOut"
            onOpen={onOpenWithTimeOut}
          >
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
          </Select>
        </Box>
      </Box>
      {displayContent && (
        <Box mb={1} display="flex" alignItems="center">
          <Icon type="error" color="errorRed" />
          Error displayed
        </Box>
      )}
    </Dialog>
  );
};
