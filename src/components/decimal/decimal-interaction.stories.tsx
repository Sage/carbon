import React, { useState } from "react";
import { StoryObj, StoryFn } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";

import Decimal from "./decimal.component";
import Box from "../box";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

type Story = StoryObj<typeof Decimal>;

export default {
  title: "Decimal Input/Interactions",
  component: Decimal,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
  decorators: [
    (StoryToRender: StoryFn) => (
      <DefaultDecorator>
        <Box mb="150px">
          <StoryToRender />
        </Box>
      </DefaultDecorator>
    ),
  ],
};

const DecimalWithState = ({ initialValue = "0.03", ...props }) => {
  const [decimalValue, setDecimalValue] = useState(initialValue);

  return (
    <Decimal
      {...props}
      value={decimalValue}
      onChange={(e) => setDecimalValue(e.target.value.rawValue)}
    />
  );
};

export const DefaultExample: Story = {
  render: () => <DecimalWithState label="Decimal input" name="decimal-input" />,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const decimalInput = canvas.getByRole("textbox", {
      name: /decimal input/i,
    });

    await userEvent.click(decimalInput);
    await userEvent.keyboard("357");
    await userEvent.keyboard("{tab}");

    await expect(decimalInput).toHaveValue("357.00");
  },
};
DefaultExample.parameters = {
  chromatic: { disableSnapshot: true },
};

export const frFRLocaleExample: Story = {
  render: () => (
    <DecimalWithState
      label="Decimal input"
      name="decimal-input"
      locale="fr-FR"
    />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const decimalInput = canvas.getByRole("textbox", {
      name: /decimal input/i,
    });

    await userEvent.click(decimalInput);
    await userEvent.keyboard("442");
    await userEvent.keyboard("{tab}");

    await expect(decimalInput).toHaveValue("442,00");
  },
};
frFRLocaleExample.parameters = {
  chromatic: { disableSnapshot: true },
};

export const WithPrecisionExample: Story = {
  render: () => (
    <DecimalWithState
      label="Decimal input"
      name="decimal-input"
      precision={5}
    />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const decimalInput = canvas.getByRole("textbox", {
      name: /decimal input/i,
    });

    await userEvent.click(decimalInput);
    await userEvent.keyboard("90210");
    await userEvent.keyboard("{tab}");

    await expect(decimalInput).toHaveValue("90,210.00000");
  },
};
WithPrecisionExample.parameters = {
  chromatic: { disableSnapshot: true },
};

export const DecimalInputClearedExample: Story = {
  render: () => <DecimalWithState label="Decimal input" name="decimal-input" />,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const decimalInput = canvas.getByRole("textbox", {
      name: /decimal input/i,
    });

    await userEvent.click(decimalInput);
    await userEvent.keyboard("{selectall}{backspace}");
    await userEvent.keyboard("{tab}");

    await expect(decimalInput).toHaveValue("0.00");
  },
};
DecimalInputClearedExample.parameters = {
  chromatic: { disableSnapshot: true },
};

export const FocusedExample: Story = {
  render: () => <DecimalWithState label="Decimal input" name="decimal-input" />,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);

    const decimalInput = canvas.getByRole("textbox", {
      name: /decimal input/i,
    });

    await userEvent.click(decimalInput);

    await expect(decimalInput).toHaveFocus();
  },
};
