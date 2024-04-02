import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Select, Option } from "..";
import Box from "../../box";
import SimpleSelect from "./simple-select.component";

const meta: Meta<typeof SimpleSelect> = {
  title: "Select/Sizes",
  component: SimpleSelect,
};

export default meta;
type Story = StoryObj<typeof SimpleSelect>;

export const Small: Story = () => {
  return (
    <Box height="250px">
      <Select
        name="small"
        id="small"
        defaultValue="3"
        size="small"
        label="color"
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
        <Option text="Pink" value="7" />
        <Option text="Purple" value="8" />
        <Option text="Red" value="9" />
        <Option text="White" value="10" />
        <Option text="Yellow" value="11" />
      </Select>
    </Box>
  );
};
Small.storyName = "Small";
Small.parameters = { info: { disable: true } };

export const Medium: Story = () => {
  return (
    <Box height="250px">
      <Select
        name="medium"
        id="medium"
        defaultValue="3"
        size="medium"
        label="color"
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
        <Option text="Pink" value="7" />
        <Option text="Purple" value="8" />
        <Option text="Red" value="9" />
        <Option text="White" value="10" />
        <Option text="Yellow" value="11" />
      </Select>
    </Box>
  );
};
Medium.storyName = "Medium";
Medium.parameters = { info: { disable: true } };

export const Large: Story = () => {
  return (
    <Box height="250px">
      <Select
        name="large"
        id="large"
        defaultValue="3"
        size="large"
        label="color"
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
        <Option text="Pink" value="7" />
        <Option text="Purple" value="8" />
        <Option text="Red" value="9" />
        <Option text="White" value="10" />
        <Option text="Yellow" value="11" />
      </Select>
    </Box>
  );
};
Large.storyName = "Large";
Large.parameters = { info: { disable: true } };
