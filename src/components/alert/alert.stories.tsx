import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import allModes from "../../../.storybook/modes";
import isChromatic from "../../../.storybook/isChromatic";

import Box from "../box";
import Button from "../button";
import Alert from ".";

const defaultOpenState = isChromatic();

const meta: Meta<typeof Alert> = {
  title: "Deprecated/Alert",
  component: Alert,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    chromatic: {
      disableSnapshot: true,
      modes: {
        desktop: allModes.chromatic,
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        {defaultOpenState ? (
          <Box width="100%" height={900}>
            <Story />
          </Box>
        ) : (
          <Story />
        )}
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Alert</Button>
      <Alert
        onCancel={() => setIsOpen(false)}
        title="Title"
        disableEscKey={false}
        height=""
        subtitle="Subtitle"
        showCloseIcon
        size="extra-small"
        open={isOpen}
      >
        This is an example of an alert
      </Alert>
    </>
  );
};
Default.storyName = "Default";
