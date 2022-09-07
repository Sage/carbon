import React from "react";

import Box from "../../box";
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

const Template = (args) => {
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

export const Default = Template.bind({});

Default.args = {
  mt: 0,
  listPlacement: undefined,
  flipEnabled: true,
};
