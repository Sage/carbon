import React from "react";
import { StoryObj, StoryFn } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";

import Box from "../../box";
import { Tab, Tabs, TabList, TabPanel } from ".";

import { allowInteractions } from "../../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../../.storybook/utils/default-decorator";

type Story = StoryObj<typeof Tabs>;

export default {
  title: "Tabs/Interactions",
  component: Tabs,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
  decorators: [
    (StoryToRender: StoryFn) => (
      <DefaultDecorator>
        <Box backgroundColor="#ddd" p={3} width="500px">
          <StoryToRender />
        </Box>
      </DefaultDecorator>
    ),
  ],
};

export const MouseAndKeyboard: Story = {
  render: ({ ...args }) => (
    <Box width="500px" height="60px">
      <Tabs {...args}>
        <TabList ariaLabel="Sample Tabs">
          <Tab
            id="tab-1"
            controls="tab-panel-1"
            label="Default"
            data-role="target"
          />
          <Tab
            id="tab-2"
            controls="tab-panel-2"
            label="Info"
            info
            data-role="target"
          />
          <Tab
            id="tab-3"
            controls="tab-panel-3"
            label="Warning"
            warning
            data-role="target"
          />
          <Tab
            id="tab-4"
            controls="tab-panel-4"
            label="Error"
            error
            data-role="target"
          />
          <Tab
            id="tab-5"
            controls="tab-panel-5"
            label="Default 3"
            data-role="target"
          />
          <Tab
            id="tab-6"
            controls="tab-panel-6"
            label="Default 4"
            data-role="target"
          />
        </TabList>
        <TabPanel id="tab-panel-1" tabId={"tab-1"}>
          Content1
        </TabPanel>

        <TabPanel id="tab-panel-2" tabId={"tab-2"}>
          Content 2
        </TabPanel>

        <TabPanel id="tab-panel-3" tabId={"tab-3"}>
          Content 3
        </TabPanel>

        <TabPanel id="tab-panel-4" tabId={"tab-4"}>
          Content 4
        </TabPanel>

        <TabPanel id="tab-panel-5" tabId={"tab-5"}>
          Content 5
        </TabPanel>

        <TabPanel id="tab-panel-6" tabId={"tab-6"}>
          Content 6
        </TabPanel>
      </Tabs>
      <br></br>
      <Tabs {...args}>
        <TabList ariaLabel="Sample Tabs">
          <Tab id="tab-7" controls="tab-panel-1" label="Error" error />
        </TabList>
      </Tabs>
      <Tabs {...args}>
        <TabList ariaLabel="Sample Tabs">
          <Tab id="tab-8" controls="tab-panel-1" label="Info" info />
        </TabList>
      </Tabs>
      <Tabs {...args}>
        <TabList ariaLabel="Sample Tabs">
          <Tab id="tab-9" controls="tab-panel-1" label="Warning" warning />
        </TabList>
      </Tabs>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const navButton = canvas.getAllByRole("button");

    await userEvent.tab();
    await userEvent.keyboard("[ArrowRight]");
    await userEvent.keyboard("[ArrowRight]");
    await userEvent.keyboard("[ArrowRight]");
    await userEvent.keyboard("[ArrowRight]");
    await userEvent.keyboard("[ArrowRight]");
    await userEvent.keyboard(" ");
    await expect(canvas.getByText("Content 6")).toBeVisible();
    await userEvent.click(navButton[0]);
    const defaultButton = canvas.getByRole("tab", { name: "Default 3" });
    await userEvent.click(defaultButton);
    await expect(canvas.getByText("Content 5")).toBeVisible();
  },
};
MouseAndKeyboard.storyName = "Mouse and Keyboard";
MouseAndKeyboard.parameters = {
  pseudo: {
    hover: '[role="tab"],[data-role="target"]',
    focus: "#tab-7, #tab-8, #tab-9",
  },
};
