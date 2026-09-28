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
      <OptionTileGroup
        selectionType="single"
        legend="Option 1"
        aria-label="Option 1"
      >
        <OptionTile
          variant="single"
          number={1}
          title="Option 1"
          onClick={() => setSelected("option-1")}
          data-element={selected === "option-1" ? "selected" : undefined}
        />
        <OptionTile
          variant="single"
          number={2}
          title="Option 2"
          onClick={() => setSelected("option-2")}
          data-element={selected === "option-2" ? "selected" : undefined}
        />
        <OptionTile
          variant="single"
          number={3}
          title="Option 3"
          onClick={() => setSelected("option-3")}
          data-element={selected === "option-3" ? "selected" : undefined}
        />
        <OptionTile
          variant="single"
          number={4}
          title="Option 4"
          onClick={() => setSelected("option-4")}
          data-element={selected === "option-4" ? "selected" : undefined}
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
      <OptionTileGroup
        selectionType="multiple"
        legend="Option 1"
        aria-label="Option 1"
      >
        <OptionTile
          variant="multiple"
          label="Option 1"
          checked={selected.includes("option-1")}
          onChange={toggle("option-1")}
        />
        <OptionTile
          variant="multiple"
          label="Option 2"
          checked={selected.includes("option-2")}
          onChange={toggle("option-2")}
        />
        <OptionTile
          variant="multiple"
          label="Option 3"
          checked={selected.includes("option-3")}
          onChange={toggle("option-3")}
        />
      </OptionTileGroup>
    );
  },
};
