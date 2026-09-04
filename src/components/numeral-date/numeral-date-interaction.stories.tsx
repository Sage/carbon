import React, { useState } from "react";
import { StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import NumeralDate, { NumeralDateProps } from ".";

type Story = StoryObj<typeof NumeralDate>;

export default {
  title: "Numeral Date/Interactions",
  component: NumeralDate,
  parameters: { chromatic: { disableSnapshot: true } },
};

const ControlledNumeralDate = () => {
  const [value, setValue] = useState<NumeralDateProps["value"]>({
    dd: "long-day-value",
    mm: "Jan",
    yyyy: "2026",
  });

  return (
    <NumeralDate
      legend="Flexible date input"
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};

export const UnrestrictedEditing: Story = {
  render: () => <ControlledNumeralDate />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dayInput = canvas.getByRole<HTMLInputElement>("textbox", {
      name: "Day",
    });
    const monthInput = canvas.getByRole<HTMLInputElement>("textbox", {
      name: "Month",
    });

    await userEvent.clear(monthInput);
    await userEvent.type(monthInput, "Jan-long-raw-value");
    await expect(monthInput).toHaveValue("Jan-long-raw-value");

    dayInput.focus();
    await expect(dayInput).toHaveFocus();
    dayInput.setSelectionRange(0, dayInput.value.length);
    await expect(dayInput.selectionStart).toBe(0);
    await expect(dayInput.selectionEnd).toBe(dayInput.value.length);
    await userEvent.copy();

    monthInput.focus();
    await expect(monthInput).toHaveFocus();
    monthInput.setSelectionRange(0, monthInput.value.length);
    await expect(monthInput.selectionStart).toBe(0);
    await expect(monthInput.selectionEnd).toBe(monthInput.value.length);
    await userEvent.paste();
    await expect(monthInput).toHaveValue("long-day-value");

    monthInput.setSelectionRange(
      monthInput.value.length,
      monthInput.value.length,
    );
    await expect(monthInput.selectionStart).toBe(monthInput.value.length);
    await expect(monthInput.selectionEnd).toBe(monthInput.value.length);

    await userEvent.keyboard("{ArrowLeft}");
    await expect(monthInput.selectionStart).toBe(monthInput.value.length - 1);
    await expect(monthInput.selectionEnd).toBe(monthInput.value.length - 1);

    await userEvent.keyboard("{Home}");
    await expect(monthInput.selectionStart).toBe(0);
    await expect(monthInput.selectionEnd).toBe(0);

    await userEvent.keyboard("{Shift>}{ArrowRight}{/Shift}");
    await expect(monthInput.selectionStart).toBe(0);
    await expect(monthInput.selectionEnd).toBe(1);

    await userEvent.keyboard("{End}");
    await expect(monthInput.selectionStart).toBe(monthInput.value.length);
    await expect(monthInput.selectionEnd).toBe(monthInput.value.length);
  },
};
