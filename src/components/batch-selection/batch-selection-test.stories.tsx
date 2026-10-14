import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import BatchSelection from ".";
import Button from "../button/__next__";
import Box from "../box";
import Icon from "../icon";
import Divider from "../divider";

const meta: Meta<typeof BatchSelection> = {
  title: "Batch Selection/Test",
  component: BatchSelection,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export default meta;
type Story = StoryObj<typeof BatchSelection>;

export const ChromaticSnapshot: Story = {
  render: (args) => (
    <Box display="flex" flexDirection="column" gap={2}>
      <BatchSelection {...args}>
        <Button variantType="subtle">
          <Icon type="check_none" />
          Select All
        </Button>
        <Divider p={0} height="40px" />
        <Button variantType="tertiary">
          <Icon type="placeholder" />
          Action 1
        </Button>
        <Button variantType="tertiary">
          <Icon type="placeholder" />
          Action 2
        </Button>
        <Button variantType="tertiary">
          <Icon type="placeholder" />
          Action 3
        </Button>
      </BatchSelection>

      <Box width="320px">
        <BatchSelection smallScreen {...args}>
          <Button variantType="subtle">
            <Icon type="check_none" />
            Select All
          </Button>
          <Button variantType="subtle">
            Actions
            <Icon type="caret_down" />
          </Button>
        </BatchSelection>
      </Box>
    </Box>
  ),
  args: {
    selectedCount: 1,
    totalItems: 10,
    onDismiss: () => {},
  },
};
