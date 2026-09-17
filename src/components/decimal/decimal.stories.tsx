import React, { useState } from "react";
import { ArgTypes, Meta, StoryObj } from "@storybook/react-vite";

import Decimal, { DecimalProps, CustomEvent } from ".";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import Box from "../box";
import { Select, Option } from "../select";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
}) as Partial<ArgTypes<DecimalProps>>;

const meta: Meta<typeof Decimal> = {
  title: "Decimal Input",
  component: Decimal,
  argTypes: {
    ...styledSystemProps,
    precision: {
      control: { type: "number" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Decimal>;

export const Playground: Story = {
  render: (args: DecimalProps) => {
    const [state, setState] = useState("0.01");
    const setValue = ({ target }: CustomEvent) => {
      setState(target.value.rawValue);
    };
    return <Decimal {...args} value={state} onChange={setValue} />;
  },
  args: {
    label: "Decimal",
    required: false,
    disabled: false,
    readOnly: false,
    size: "medium",
    prefix: "",
    suffix: "",
    precision: 2,
    inputHint: "Hint text",
    allowEmptyValue: false,
    align: "right",
    locale: "en-GB",
    inputWidth: 100,
    maxWidth: "100%",
    labelInline: false,
    error: "",
  },
};
Playground.storyName = "Playground";

export const WithPopoverContainer: Story = {
  render: (args: DecimalProps) => {
    const [state, setState] = useState("0.01");
    const [selectValue, setSelectValue] = useState("1");
    const setValue = ({ target }: CustomEvent) => {
      setState(target.value.rawValue);
    };
    return (
      <Decimal
        {...args}
        value={state}
        onChange={setValue}
        popoverContainerContent={
          <Box m="24px">
            <Select
              name="simple"
              id="simple"
              label="Select a colour"
              value={selectValue}
              onChange={(ev) => setSelectValue(ev.target.value)}
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
        }
      />
    );
  },
  args: { label: "Decimal", maxWidth: "40%" },
  name: "With Popover Container",
};
