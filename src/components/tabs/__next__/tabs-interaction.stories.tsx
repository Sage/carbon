import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, expect } from "storybook/test";

import { Tabs, Tab, TabList, TabPanel } from ".";
import Box from "../../box";
import Typography from "../../typography";

import { allowInteractions } from "../../../../.storybook/interaction-toggle/reduced-motion";

const meta: Meta<typeof Tabs> = {
  title: "Tabs/Interactions",
  component: Tabs,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
  decorators: [
    (StoryToRender) => (
      <Box backgroundColor="var(--container-standard-bg-alt)" p={3}>
        <StoryToRender />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const tabCount = 10;
export const ScrollToFocus: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList ariaLabel="Sample Tabs">
        {Array.from({ length: tabCount }, (_, index) => (
          <Tab
            key={`tab-${index + 1}--overflow`}
            id={`tab-${index + 1}--overflow`}
            controls={`tab-panel-${index + 1}--overflow`}
            label={`Tab ${index + 1}`}
          />
        ))}
      </TabList>
      {Array.from({ length: tabCount }, (_, index) => (
        <TabPanel
          key={`tab-panel-${index + 1}--overflow`}
          id={`tab-panel-${index + 1}--overflow`}
          tabId={`tab-${index + 1}--overflow`}
        >
          <Typography>{`Content ${index + 1}`}</Typography>
        </TabPanel>
      ))}
    </Tabs>
  ),
  play: async ({ canvas }) => {
    if (!allowInteractions()) {
      return;
    }

    await userEvent.click(canvas.getByRole("tab", { name: "Tab 1" }));
    await userEvent.keyboard("{ArrowRight}");
    await userEvent.keyboard("{ArrowRight}");

    expect(canvas.getByRole("tab", { name: "Tab 3" })).toHaveFocus();
  },
  parameters: {
    chromatic: { viewports: [320] },
  },
  globals: {
    viewport: { value: "mobile" },
  },
};
