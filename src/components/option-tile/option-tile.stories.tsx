import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { OptionTile, OptionTileGroup } from ".";

const meta: Meta<typeof OptionTile> = {
  title: "Option Tile",
  component: OptionTile,
  parameters: {
    chromatic: { disableSnapshot: false },
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export default meta;
type Story = StoryObj<typeof OptionTile>;

export const Single: Story = {
  render: () => (
    <OptionTile
      variant="single"
      number={1}
      title="Continue with existing plan"
    />
  ),
};

export const Custom: Story = {
  render: () => {
    const [customValue, setCustomValue] = useState("");

    return (
      <OptionTile
        variant="custom"
        title="Something else"
        inputAriaLabel="Custom option value"
        inputPlaceholder="Type a custom value"
        customValue={customValue}
        onCustomValueChange={setCustomValue}
      />
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const [selected, setSelected] = useState(false);

    return (
      <OptionTile
        variant="multiple"
        label="Enable recurring billing"
        checked={selected}
        onChange={setSelected}
      />
    );
  },
};

export const SingleSelectGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    const [customValue, setCustomValue] = useState("");

    return (
      <OptionTileGroup selectionType="single" aria-label="Payment options">
        <OptionTile
          variant="single"
          number={1}
          title="Pay now"
          onClick={() => setSelected("pay-now")}
          data-element={selected === "pay-now" ? "selected" : undefined}
        />
        <OptionTile
          variant="single"
          number={2}
          title="Pay later"
          onClick={() => setSelected("pay-later")}
          data-element={selected === "pay-later" ? "selected" : undefined}
        />
        <OptionTile
          variant="custom"
          title="Something else"
          inputAriaLabel="Custom amount"
          inputPlaceholder="Type amount"
          customValue={customValue}
          onCustomValueChange={setCustomValue}
        />
      </OptionTileGroup>
    );
  },
};

export const MultiSelectGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    const toggle = (option: string) => (checked: boolean) =>
      setSelected((previous) =>
        checked
          ? [...previous, option]
          : previous.filter((item) => item !== option),
      );

    return (
      <OptionTileGroup selectionType="multiple" aria-label="Delivery options">
        <OptionTile
          variant="multiple"
          label="Email receipt"
          checked={selected.includes("email")}
          onChange={toggle("email")}
        />
        <OptionTile
          variant="multiple"
          label="SMS updates"
          checked={selected.includes("sms")}
          onChange={toggle("sms")}
        />
        <OptionTile
          variant="multiple"
          label="Printed statement"
          checked={selected.includes("print")}
          onChange={toggle("print")}
        />
      </OptionTileGroup>
    );
  },
};
